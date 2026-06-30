'use client';

import { useRef, type KeyboardEvent } from 'react';
import type { ReactNode } from 'react';
import styles from './LiquidGlassButton.module.css';

export interface LiquidGlassOption {
  value: string;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
}

export interface LiquidGlassButtonProps {
  options: LiquidGlassOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
}

function OptionContent({ option }: { option: LiquidGlassOption }) {
  return (
    <>
      <span className={styles.icon}>{option.icon}</span>
      <span className={styles.label}>{option.label}</span>
    </>
  );
}

function SingleVariant({
  option,
  isSelected,
  disabled,
  onSelect,
  ariaLabel,
}: {
  option: LiquidGlassOption;
  isSelected: boolean;
  disabled: boolean;
  onSelect: (value: string) => void;
  ariaLabel: string;
}) {
  const isDisabled = disabled || option.disabled;

  function handleClick() {
    if (!isDisabled) {
      onSelect(option.value);
    }
  }

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={handleClick}
      className={`${styles.option} ${isSelected ? styles.selected : ''}`.trim()}
    >
      <OptionContent option={option} />
    </button>
  );
}

function SegmentedVariant({
  options,
  selectedValue,
  disabled,
  onSelect,
  ariaLabel,
}: {
  options: LiquidGlassOption[];
  selectedValue?: string;
  disabled: boolean;
  onSelect: (value: string) => void;
  ariaLabel: string;
}) {
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleClick(option: LiquidGlassOption) {
    if (!disabled && !option.disabled) {
      onSelect(option.value);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, option: LiquidGlassOption, index: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled && !option.disabled) {
        onSelect(option.value);
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % options.length;
      optionRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + options.length) % options.length;
      optionRefs.current[prev]?.focus();
    }
  }

  const selectedIndex = options.findIndex((o) => o.value === selectedValue);
  const focusableIndex = selectedIndex >= 0 ? selectedIndex : 0;

  return (
    <div role="radiogroup" aria-label={ariaLabel}>
      {options.map((option, index) => {
        const isSelected = option.value === selectedValue;
        const isDisabled = disabled || option.disabled;
        const tabIndex = index === focusableIndex && !isDisabled ? 0 : -1;

        return (
          <button
            key={option.value}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
            disabled={isDisabled}
            tabIndex={tabIndex}
            onClick={() => handleClick(option)}
            onKeyDown={(e) => handleKeyDown(e, option, index)}
            className={`${styles.option} ${isSelected ? styles.selected : ''}`.trim()}
          >
            <OptionContent option={option} />
          </button>
        );
      })}
    </div>
  );
}

export function LiquidGlassButton({
  options,
  selectedValue,
  onSelect,
  disabled = false,
  ariaLabel,
  className = '',
}: LiquidGlassButtonProps) {
  return (
    <div
      data-testid="liquid-glass-button"
      className={`${styles.container} ${className}`.trim()}
    >
      {options.length === 1 ? (
        <SingleVariant
          option={options[0]}
          isSelected={options[0].value === selectedValue}
          disabled={disabled}
          onSelect={onSelect}
          ariaLabel={ariaLabel}
        />
      ) : (
        <SegmentedVariant
          options={options}
          selectedValue={selectedValue}
          disabled={disabled}
          onSelect={onSelect}
          ariaLabel={ariaLabel}
        />
      )}
    </div>
  );
}
