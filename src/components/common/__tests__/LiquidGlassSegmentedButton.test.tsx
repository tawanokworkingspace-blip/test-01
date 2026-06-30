/**
 * Unit tests for LiquidGlassSegmentedButton
 * AC7  — N segments rendered; exactly one carries aria-pressed="true" (the selectedId);
 *         clicking a segment calls onSelect(id) with the correct id
 * AC8  — root has role="group" + aria-label; each segment is an individually focusable button
 * AC9  — selected segment has a distinct className (CSS class applied)
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LiquidGlassSegmentedButton from '../LiquidGlassSegmentedButton'

const THREE_SEGMENTS = [
  { id: 'cmd', label: 'Command' },
  { id: 'inbox', label: 'Inbox' },
  { id: 'settings', label: 'Settings' },
]

// ---------------------------------------------------------------------------
// AC7 — segment rendering and selection
// ---------------------------------------------------------------------------
describe('AC7: segment rendering and selection', () => {
  it('renders one button per segment supplied in the segments array', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={() => {}}
        ariaLabel="Navigation"
      />
    )
    expect(screen.getAllByRole('button')).toHaveLength(3)
    expect(screen.getByRole('button', { name: 'Command' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Inbox' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument()
  })

  it('marks only the segment matching selectedId with aria-pressed="true"', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="inbox"
        onSelect={() => {}}
        ariaLabel="Navigation"
      />
    )
    expect(screen.getByRole('button', { name: 'Command' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
    expect(screen.getByRole('button', { name: 'Inbox' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })

  it('sets data-selected="true" only on the segment matching selectedId', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="settings"
        onSelect={() => {}}
        ariaLabel="Navigation"
      />
    )
    expect(screen.getByTestId('lgb-seg-cmd')).toHaveAttribute('data-selected', 'false')
    expect(screen.getByTestId('lgb-seg-inbox')).toHaveAttribute('data-selected', 'false')
    expect(screen.getByTestId('lgb-seg-settings')).toHaveAttribute('data-selected', 'true')
  })

  it('calls onSelect with the clicked segment id when a non-selected segment is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />
    )
    await user.click(screen.getByRole('button', { name: 'Inbox' }))
    expect(onSelect).toHaveBeenCalledWith('inbox')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('calls onSelect with the correct id when different segments are clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />
    )
    await user.click(screen.getByRole('button', { name: 'Settings' }))
    expect(onSelect).toHaveBeenCalledWith('settings')
  })

  it('does NOT call onSelect when a disabled segment is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const segmentsWithDisabled = [
      { id: 'cmd', label: 'Command' },
      { id: 'inbox', label: 'Inbox', disabled: true },
    ]
    render(
      <LiquidGlassSegmentedButton
        segments={segmentsWithDisabled}
        selectedId="cmd"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />
    )
    await user.click(screen.getByRole('button', { name: 'Inbox' }))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('renders icon when a segment provides one', () => {
    const segmentsWithIcons = [
      { id: 'cmd', label: 'Command', icon: <svg data-testid="cmd-icon" aria-hidden="true" /> },
      { id: 'inbox', label: 'Inbox' },
    ]
    render(
      <LiquidGlassSegmentedButton
        segments={segmentsWithIcons}
        selectedId="cmd"
        onSelect={() => {}}
        ariaLabel="Navigation"
      />
    )
    expect(screen.getByTestId('cmd-icon')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC8 — group role, accessible name, and individual focusability
// ---------------------------------------------------------------------------
describe('AC8: group role and keyboard accessibility', () => {
  it('wraps all segments in an element with role="group"', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={() => {}}
        ariaLabel="Navigation"
      />
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('exposes ariaLabel as the group accessible name', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={() => {}}
        ariaLabel="View options"
      />
    )
    expect(screen.getByRole('group', { name: 'View options' })).toBeInTheDocument()
  })

  it('renders each segment as a native <button> element for individual focusability', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={() => {}}
        ariaLabel="Navigation"
      />
    )
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn.tagName).toBe('BUTTON')
    })
  })

  it('root container carries data-testid="liquid-glass-segmented"', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={() => {}}
        ariaLabel="Navigation"
      />
    )
    expect(screen.getByTestId('liquid-glass-segmented')).toBeInTheDocument()
  })

  it('each segment button carries data-testid matching lgb-seg-{id}', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={() => {}}
        ariaLabel="Navigation"
      />
    )
    expect(screen.getByTestId('lgb-seg-cmd')).toBeInTheDocument()
    expect(screen.getByTestId('lgb-seg-inbox')).toBeInTheDocument()
    expect(screen.getByTestId('lgb-seg-settings')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC8 (keyboard) — Enter and Space activate segments; disabled segments are guarded
// ---------------------------------------------------------------------------
describe('AC8: keyboard activation of segments', () => {
  it('calls onSelect with segment id when Enter is pressed on a focused segment', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />
    )
    screen.getByRole('button', { name: 'Inbox' }).focus()
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith('inbox')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('calls onSelect with segment id when Space is pressed on a focused segment', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />
    )
    screen.getByRole('button', { name: 'Inbox' }).focus()
    await user.keyboard(' ')
    expect(onSelect).toHaveBeenCalledWith('inbox')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('does NOT call onSelect when Enter is pressed on a disabled segment', () => {
    const onSelect = vi.fn()
    const segsWithDisabled = [
      { id: 'cmd', label: 'Command' },
      { id: 'inbox', label: 'Inbox', disabled: true },
    ]
    render(
      <LiquidGlassSegmentedButton
        segments={segsWithDisabled}
        selectedId="cmd"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />
    )
    fireEvent.keyDown(screen.getByTestId('lgb-seg-inbox'), { key: 'Enter' })
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('does NOT call onSelect when Space is pressed on a disabled segment', () => {
    const onSelect = vi.fn()
    const segsWithDisabled = [
      { id: 'cmd', label: 'Command' },
      { id: 'inbox', label: 'Inbox', disabled: true },
    ]
    render(
      <LiquidGlassSegmentedButton
        segments={segsWithDisabled}
        selectedId="cmd"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />
    )
    fireEvent.keyDown(screen.getByTestId('lgb-seg-inbox'), { key: ' ' })
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('does NOT call onSelect for non-activation keys (e.g. ArrowRight)', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />
    )
    screen.getByRole('button', { name: 'Inbox' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(onSelect).not.toHaveBeenCalled()
  })
})

// ---------------------------------------------------------------------------
// AC9 — selected segment has distinct className
// ---------------------------------------------------------------------------
describe('AC9: selected state CSS class binding', () => {
  it('selected segment has a different className than an unselected one', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={THREE_SEGMENTS}
        selectedId="cmd"
        onSelect={() => {}}
        ariaLabel="Navigation"
      />
    )
    const selectedClass = screen.getByTestId('lgb-seg-cmd').className
    const unselectedClass = screen.getByTestId('lgb-seg-inbox').className
    expect(selectedClass).not.toBe(unselectedClass)
  })
})
