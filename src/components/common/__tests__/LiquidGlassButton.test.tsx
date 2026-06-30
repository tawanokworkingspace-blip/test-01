import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LiquidGlassButton } from '../LiquidGlassButton';

const mockIcon = <span data-testid="icon">★</span>;

const singleOptions = [{ value: 'cmd', label: 'Command', icon: mockIcon }];

const segmentedOptions = [
  { value: 'cmd', label: 'Command', icon: mockIcon },
  { value: 'inbox', label: 'Inbox', icon: mockIcon },
];

const segmentedWithDisabled = [
  { value: 'cmd', label: 'Command', icon: mockIcon },
  { value: 'inbox', label: 'Inbox', icon: mockIcon, disabled: true },
];

describe('LiquidGlassButton', () => {
  describe('single variant (options.length === 1)', () => {
    it('renders a single button element', () => {
      render(
        <LiquidGlassButton
          options={singleOptions}
          selectedValue="cmd"
          onSelect={jest.fn()}
          ariaLabel="Command"
        />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has aria-pressed="true" when the option is selected', () => {
      render(
        <LiquidGlassButton
          options={singleOptions}
          selectedValue="cmd"
          onSelect={jest.fn()}
          ariaLabel="Command"
        />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('has aria-pressed="false" when the option is not selected', () => {
      render(
        <LiquidGlassButton
          options={singleOptions}
          selectedValue={undefined}
          onSelect={jest.fn()}
          ariaLabel="Command"
        />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('calls onSelect with the option value on click', () => {
      const onSelect = jest.fn();
      render(
        <LiquidGlassButton
          options={singleOptions}
          selectedValue={undefined}
          onSelect={onSelect}
          ariaLabel="Command"
        />
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onSelect).toHaveBeenCalledWith('cmd');
    });

    it('does not call onSelect when component is disabled', () => {
      const onSelect = jest.fn();
      render(
        <LiquidGlassButton
          options={singleOptions}
          selectedValue={undefined}
          onSelect={onSelect}
          ariaLabel="Command"
          disabled
        />
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('shows the option label', () => {
      render(
        <LiquidGlassButton
          options={singleOptions}
          selectedValue="cmd"
          onSelect={jest.fn()}
          ariaLabel="Command"
        />
      );
      expect(screen.getByText('Command')).toBeInTheDocument();
    });
  });

  describe('segmented variant (options.length > 1)', () => {
    it('renders a radiogroup container', () => {
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={jest.fn()}
          ariaLabel="Navigation"
        />
      );
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('renders each option as a radio button', () => {
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={jest.fn()}
          ariaLabel="Navigation"
        />
      );
      expect(screen.getAllByRole('radio')).toHaveLength(2);
    });

    it('marks the selected option with aria-checked="true"', () => {
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={jest.fn()}
          ariaLabel="Navigation"
        />
      );
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).toHaveAttribute('aria-checked', 'true');
      expect(radios[1]).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onSelect with correct value when an option is clicked', () => {
      const onSelect = jest.fn();
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={onSelect}
          ariaLabel="Navigation"
        />
      );
      fireEvent.click(screen.getAllByRole('radio')[1]);
      expect(onSelect).toHaveBeenCalledWith('inbox');
    });

    it('does not call onSelect when a disabled option is clicked', () => {
      const onSelect = jest.fn();
      render(
        <LiquidGlassButton
          options={segmentedWithDisabled}
          selectedValue="cmd"
          onSelect={onSelect}
          ariaLabel="Navigation"
        />
      );
      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[1]);
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('does not call onSelect when the component is disabled', () => {
      const onSelect = jest.fn();
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={onSelect}
          ariaLabel="Navigation"
          disabled
        />
      );
      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[1]);
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('shows labels for all options', () => {
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={jest.fn()}
          ariaLabel="Navigation"
        />
      );
      expect(screen.getByText('Command')).toBeInTheDocument();
      expect(screen.getByText('Inbox')).toBeInTheDocument();
    });

    it('the radiogroup has the ariaLabel', () => {
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={jest.fn()}
          ariaLabel="Navigation options"
        />
      );
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Navigation options');
    });

    it('calls onSelect on Enter keydown', () => {
      const onSelect = jest.fn();
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={onSelect}
          ariaLabel="Navigation"
        />
      );
      const secondRadio = screen.getAllByRole('radio')[1];
      fireEvent.keyDown(secondRadio, { key: 'Enter' });
      expect(onSelect).toHaveBeenCalledWith('inbox');
    });

    it('calls onSelect on Space keydown', () => {
      const onSelect = jest.fn();
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={onSelect}
          ariaLabel="Navigation"
        />
      );
      const secondRadio = screen.getAllByRole('radio')[1];
      fireEvent.keyDown(secondRadio, { key: ' ' });
      expect(onSelect).toHaveBeenCalledWith('inbox');
    });
  });

  describe('data-testid', () => {
    it('has data-testid="liquid-glass-button" on the container', () => {
      render(
        <LiquidGlassButton
          options={segmentedOptions}
          selectedValue="cmd"
          onSelect={jest.fn()}
          ariaLabel="Navigation"
        />
      );
      expect(screen.getByTestId('liquid-glass-button')).toBeInTheDocument();
    });
  });

  describe('userEvent interactions', () => {
    it('does not fire onSelect when clicking a truly disabled button', async () => {
      const onSelect = jest.fn();
      const user = userEvent.setup();
      render(
        <LiquidGlassButton
          options={segmentedWithDisabled}
          selectedValue="cmd"
          onSelect={onSelect}
          ariaLabel="Navigation"
        />
      );
      // The disabled button should not trigger onSelect
      const disabledBtn = screen.getByText('Inbox').closest('button');
      if (disabledBtn) {
        await user.click(disabledBtn);
      }
      expect(onSelect).not.toHaveBeenCalled();
    });
  });
});
