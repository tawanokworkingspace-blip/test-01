import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import LiquidGlassSegmentedButton from './LiquidGlassSegmentedButton';
import type { Segment } from './LiquidGlassSegmentedButton';

const SEGMENTS: Segment[] = [
  { id: 'a', label: 'Alpha', icon: '🅐' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma', disabled: true },
];

describe('LiquidGlassSegmentedButton', () => {
  it('renders N segments', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={SEGMENTS}
        selectedId="a"
        onSelect={vi.fn()}
        ariaLabel="Test group"
      />,
    );
    expect(screen.getByTestId('lgb-seg-a')).toBeInTheDocument();
    expect(screen.getByTestId('lgb-seg-b')).toBeInTheDocument();
    expect(screen.getByTestId('lgb-seg-c')).toBeInTheDocument();
  });

  it('only selectedId segment has aria-pressed="true"', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={SEGMENTS}
        selectedId="b"
        onSelect={vi.fn()}
        ariaLabel="Test group"
      />,
    );
    expect(screen.getByTestId('lgb-seg-a')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getByTestId('lgb-seg-b')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('lgb-seg-c')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('calls onSelect with correct id on click', async () => {
    const user = userEvent.setup();
    const fn = vi.fn();
    render(
      <LiquidGlassSegmentedButton
        segments={SEGMENTS}
        selectedId="a"
        onSelect={fn}
        ariaLabel="Test group"
      />,
    );
    await user.click(screen.getByTestId('lgb-seg-b'));
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('does not call onSelect when clicking disabled segment', async () => {
    const user = userEvent.setup();
    const fn = vi.fn();
    render(
      <LiquidGlassSegmentedButton
        segments={SEGMENTS}
        selectedId="a"
        onSelect={fn}
        ariaLabel="Test group"
      />,
    );
    await user.click(screen.getByTestId('lgb-seg-c'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('has role="group" with aria-label', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={SEGMENTS}
        selectedId="a"
        onSelect={vi.fn()}
        ariaLabel="Navigation tabs"
      />,
    );
    const group = screen.getByRole('group', { name: 'Navigation tabs' });
    expect(group).toBeInTheDocument();
  });

  it('each segment is individually focusable', () => {
    render(
      <LiquidGlassSegmentedButton
        segments={SEGMENTS}
        selectedId="a"
        onSelect={vi.fn()}
        ariaLabel="Test group"
      />,
    );
    expect(screen.getByTestId('lgb-seg-a').tagName).toBe('BUTTON');
    expect(screen.getByTestId('lgb-seg-b').tagName).toBe('BUTTON');
  });
});
