/**
 * Unit tests for LiquidGlassButton
 * AC2  — frosted capsule with backdrop-filter (visual; verified via CSS module class presence)
 * AC3  — icon + label layout when icon provided; label-only otherwise
 * AC4  — aria-pressed / data-selected reflect selected state
 * AC5  — onClick fires on click / Enter / Space; disabled suppresses onClick
 * AC6  — native <button> (keyboard-focusable); ariaLabel as accessible name
 * AC9  — hover/focus/active/selected states present (class presence)
 * AC10 — @supports fallback (CSS; class structure asserted here as a smoke check)
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LiquidGlassButton from '../LiquidGlassButton'

// ---------------------------------------------------------------------------
// AC3 — label rendering
// ---------------------------------------------------------------------------
describe('AC3: label and icon rendering', () => {
  it('renders its label as the button accessible name', () => {
    render(<LiquidGlassButton label="Command" />)
    expect(screen.getByRole('button', { name: 'Command' })).toBeInTheDocument()
  })

  it('renders the icon wrapper when an icon is provided', () => {
    render(
      <LiquidGlassButton
        label="Command"
        icon={<svg aria-hidden="true" data-testid="raw-icon" />}
      />
    )
    expect(screen.getByTestId('lgb-icon')).toBeInTheDocument()
  })

  it('renders the label wrapper alongside the icon when both are provided', () => {
    render(
      <LiquidGlassButton
        label="Command"
        icon={<svg aria-hidden="true" />}
      />
    )
    expect(screen.getByTestId('lgb-label')).toBeInTheDocument()
  })

  it('does NOT render an icon wrapper when no icon prop is supplied', () => {
    render(<LiquidGlassButton label="Command" />)
    expect(screen.queryByTestId('lgb-icon')).not.toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC4 — selected state: aria-pressed and data-selected
// ---------------------------------------------------------------------------
describe('AC4: selected state', () => {
  it('sets aria-pressed="true" when selected={true}', () => {
    render(<LiquidGlassButton label="Inbox" selected={true} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('sets aria-pressed="false" when selected={false}', () => {
    render(<LiquidGlassButton label="Inbox" selected={false} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('sets aria-pressed="false" when selected is omitted', () => {
    render(<LiquidGlassButton label="Inbox" />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('sets data-selected="true" on the button when selected', () => {
    render(<LiquidGlassButton label="Inbox" selected={true} />)
    expect(screen.getByTestId('liquid-glass-button')).toHaveAttribute(
      'data-selected',
      'true'
    )
  })

  it('sets data-selected="false" on the button when not selected', () => {
    render(<LiquidGlassButton label="Inbox" selected={false} />)
    expect(screen.getByTestId('liquid-glass-button')).toHaveAttribute(
      'data-selected',
      'false'
    )
  })
})

// ---------------------------------------------------------------------------
// AC5 — onClick interactions and disabled behaviour
// ---------------------------------------------------------------------------
describe('AC5: click, keyboard activation, and disabled state', () => {
  it('calls onClick exactly once when the button is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LiquidGlassButton label="Command" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick exactly once when Enter is pressed while the button is focused', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LiquidGlassButton label="Command" onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick exactly once when Space is pressed while the button is focused', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LiquidGlassButton label="Command" onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does NOT call onClick when the button is disabled and clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LiquidGlassButton label="Command" onClick={onClick} disabled={true} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders the native disabled attribute when disabled={true}', () => {
    render(<LiquidGlassButton label="Command" disabled={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('sets aria-disabled="true" when disabled', () => {
    render(<LiquidGlassButton label="Command" disabled={true} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })
})

// ---------------------------------------------------------------------------
// AC6 — keyboard accessibility and screen-reader friendly name
// ---------------------------------------------------------------------------
describe('AC6: keyboard accessibility and accessible name', () => {
  it('renders a native <button> element so it is focusable by keyboard', () => {
    render(<LiquidGlassButton label="Command" />)
    expect(screen.getByRole('button').tagName).toBe('BUTTON')
  })

  it('uses ariaLabel as the accessible name when provided', () => {
    render(<LiquidGlassButton label="⌘" ariaLabel="Command" />)
    expect(screen.getByRole('button', { name: 'Command' })).toBeInTheDocument()
  })

  it('falls back to label as the accessible name when ariaLabel is omitted', () => {
    render(<LiquidGlassButton label="Settings" />)
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC9 — state classes present (hover/focus/active/selected)
// The component must expose CSS-module class bindings for these states so
// the stylesheet can target them. We verify selected state adds a class
// attribute containing CSS-module generated class names (non-empty string).
// ---------------------------------------------------------------------------
describe('AC9: visual state class bindings', () => {
  it('button has a className attribute (CSS module classes applied)', () => {
    render(<LiquidGlassButton label="Command" />)
    const btn = screen.getByTestId('liquid-glass-button')
    expect(btn.className).toBeTruthy()
  })

  it('selected button has a different className than unselected (selected CSS class applied)', () => {
    const { rerender } = render(<LiquidGlassButton label="Command" selected={false} />)
    const unselectedClass = screen.getByTestId('liquid-glass-button').className

    rerender(<LiquidGlassButton label="Command" selected={true} />)
    const selectedClass = screen.getByTestId('liquid-glass-button').className

    expect(selectedClass).not.toBe(unselectedClass)
  })
})
