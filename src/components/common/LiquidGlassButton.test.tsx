import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import LiquidGlassButton from './LiquidGlassButton';

describe('LiquidGlassButton', () => {
  it('renders label', () => {
    render(<LiquidGlassButton label="Hello" />);
    expect(screen.getByTestId('lgb-label')).toHaveTextContent('Hello');
  });

  it('renders icon when icon prop provided', () => {
    render(<LiquidGlassButton label="Hello" icon="⌘" />);
    expect(screen.getByTestId('lgb-icon')).toBeInTheDocument();
  });

  it('does not render icon wrapper when icon not provided', () => {
    render(<LiquidGlassButton label="Hello" />);
    expect(screen.queryByTestId('lgb-icon')).not.toBeInTheDocument();
  });

  it('sets aria-pressed="true" when selected', () => {
    render(<LiquidGlassButton label="Hello" selected />);
    expect(screen.getByTestId('liquid-glass-button')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('sets aria-pressed="false" when not selected', () => {
    render(<LiquidGlassButton label="Hello" selected={false} />);
    expect(screen.getByTestId('liquid-glass-button')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('calls onClick on click', async () => {
    const user = userEvent.setup();
    const fn = vi.fn();
    render(<LiquidGlassButton label="Hello" onClick={fn} />);
    await user.click(screen.getByTestId('liquid-glass-button'));
    expect(fn).toHaveBeenCalledOnce();
  });

  it('calls onClick on Enter key', () => {
    const fn = vi.fn();
    render(<LiquidGlassButton label="Hello" onClick={fn} />);
    fireEvent.keyDown(screen.getByTestId('liquid-glass-button'), {
      key: 'Enter',
    });
    expect(fn).toHaveBeenCalledOnce();
  });

  it('calls onClick on Space key', () => {
    const fn = vi.fn();
    render(<LiquidGlassButton label="Hello" onClick={fn} />);
    fireEvent.keyDown(screen.getByTestId('liquid-glass-button'), { key: ' ' });
    expect(fn).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const fn = vi.fn();
    render(<LiquidGlassButton label="Hello" disabled onClick={fn} />);
    await user.click(screen.getByTestId('liquid-glass-button'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('sets disabled attribute when disabled', () => {
    render(<LiquidGlassButton label="Hello" disabled />);
    expect(screen.getByTestId('liquid-glass-button')).toBeDisabled();
  });

  it('sets aria-disabled="true" when disabled', () => {
    render(<LiquidGlassButton label="Hello" disabled />);
    expect(screen.getByTestId('liquid-glass-button')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('uses ariaLabel as accessible name when provided', () => {
    render(<LiquidGlassButton label="📥" ariaLabel="Inbox" />);
    expect(screen.getByTestId('liquid-glass-button')).toHaveAttribute(
      'aria-label',
      'Inbox',
    );
  });

  it('uses label as accessible name when ariaLabel not provided', () => {
    render(<LiquidGlassButton label="Hello" />);
    expect(screen.getByTestId('liquid-glass-button')).toHaveAttribute(
      'aria-label',
      'Hello',
    );
  });
});
