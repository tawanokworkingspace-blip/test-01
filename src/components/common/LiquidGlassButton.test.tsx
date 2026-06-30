import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LiquidGlassButton from '@/components/common/LiquidGlassButton';
import type { LiquidGlassOption } from '@/components/common/LiquidGlassButton';

const CommandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="8" y="8" width="8" height="8" />
  </svg>
);

const InboxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
  </svg>
);

const segmentedOptions: LiquidGlassOption[] = [
  { value: 'command', label: 'Command', icon: <CommandIcon /> },
  { value: 'inbox', label: 'Inbox', icon: <InboxIcon /> },
];

// ─── Single variant ────────────────────────────────────────────────────────────

describe('LiquidGlassButton — single variant', () => {
  it('renders exactly one button element', () => {
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('button accessible name equals label text', () => {
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} />);
    expect(screen.getByRole('button', { name: 'Command' })).toBeInTheDocument();
  });

  it('icon container is aria-hidden', () => {
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} />);
    // The icon is wrapped in an aria-hidden span so it is decorative
    expect(document.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('unselected button has aria-pressed="false"', () => {
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} selected={false} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('selected button has aria-pressed="true"', () => {
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} selected />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('selected button className contains "selected"', () => {
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} selected />);
    expect(screen.getByRole('button').className).toMatch(/selected/);
  });

  it('click fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Enter fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} onClick={onClick} />);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Space fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} onClick={onClick} />);
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled button does not fire onClick on click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} onClick={onClick} disabled />);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disabled button does not fire onClick on keyboard', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} onClick={onClick} disabled />);
    // disabled buttons are not focusable via tab, but forcibly focused they still don't fire
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disabled button has the disabled attribute', () => {
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('onClick is not called during render', () => {
    const onClick = vi.fn();
    render(<LiquidGlassButton label="Command" icon={<CommandIcon />} onClick={onClick} />);
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─── Segmented variant ─────────────────────────────────────────────────────────

describe('LiquidGlassButton — segmented variant', () => {
  it('renders a group element with aria-label', () => {
    const onSelect = vi.fn();
    render(
      <LiquidGlassButton
        variant="segmented"
        options={segmentedOptions}
        selectedValue="command"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    expect(screen.getByRole('group', { name: 'Navigation' })).toBeInTheDocument();
  });

  it('renders one button per option', () => {
    const onSelect = vi.fn();
    render(
      <LiquidGlassButton
        variant="segmented"
        options={segmentedOptions}
        selectedValue="command"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    expect(screen.getAllByRole('button')).toHaveLength(segmentedOptions.length);
  });

  it('selected option has aria-pressed="true"; others have aria-pressed="false"', () => {
    const onSelect = vi.fn();
    render(
      <LiquidGlassButton
        variant="segmented"
        options={segmentedOptions}
        selectedValue="command"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    expect(screen.getByRole('button', { name: 'Command' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Inbox' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('selected option button className contains "selected"', () => {
    const onSelect = vi.fn();
    render(
      <LiquidGlassButton
        variant="segmented"
        options={segmentedOptions}
        selectedValue="command"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    expect(screen.getByRole('button', { name: 'Command' }).className).toMatch(/selected/);
    expect(screen.getByRole('button', { name: 'Inbox' }).className).not.toMatch(/selected/);
  });

  it('group wrapper className contains "glass"', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <LiquidGlassButton
        variant="segmented"
        options={segmentedOptions}
        selectedValue="command"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    const group = container.querySelector('[role="group"]');
    expect(group?.className).toMatch(/glass/);
  });

  it('each button has accessible name equal to its label', () => {
    const onSelect = vi.fn();
    render(
      <LiquidGlassButton
        variant="segmented"
        options={segmentedOptions}
        selectedValue="command"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    expect(screen.getByRole('button', { name: 'Command' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Inbox' })).toBeInTheDocument();
  });

  it('clicking an option calls onSelect with that option value', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <LiquidGlassButton
        variant="segmented"
        options={segmentedOptions}
        selectedValue="command"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Inbox' }));
    expect(onSelect).toHaveBeenCalledWith('inbox');
  });

  it('group disabled prevents all option activation', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <LiquidGlassButton
        variant="segmented"
        options={segmentedOptions}
        selectedValue="command"
        onSelect={onSelect}
        ariaLabel="Navigation"
        disabled
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Inbox' }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('per-option disabled prevents only that option', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const optionsWithDisabled: LiquidGlassOption[] = [
      { value: 'command', label: 'Command', icon: <CommandIcon />, disabled: true },
      { value: 'inbox', label: 'Inbox', icon: <InboxIcon /> },
    ];
    render(
      <LiquidGlassButton
        variant="segmented"
        options={optionsWithDisabled}
        selectedValue="inbox"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Command' }));
    expect(onSelect).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Inbox' }));
    expect(onSelect).toHaveBeenCalledWith('inbox');
  });

  it('disabled option has the disabled attribute', () => {
    const onSelect = vi.fn();
    const optionsWithDisabled: LiquidGlassOption[] = [
      { value: 'command', label: 'Command', icon: <CommandIcon />, disabled: true },
      { value: 'inbox', label: 'Inbox', icon: <InboxIcon /> },
    ];
    render(
      <LiquidGlassButton
        variant="segmented"
        options={optionsWithDisabled}
        selectedValue="inbox"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    expect(screen.getByRole('button', { name: 'Command' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Inbox' })).not.toBeDisabled();
  });

  it('onSelect is not called during render', () => {
    const onSelect = vi.fn();
    render(
      <LiquidGlassButton
        variant="segmented"
        options={segmentedOptions}
        selectedValue="command"
        onSelect={onSelect}
        ariaLabel="Navigation"
      />,
    );
    expect(onSelect).not.toHaveBeenCalled();
  });
});
