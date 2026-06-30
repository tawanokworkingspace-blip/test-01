'use client';

import type { ReactNode } from 'react';
import styles from './LiquidGlassButton.module.css';

export interface LiquidGlassOption {
  value: string;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
}

export interface LiquidGlassSingleProps {
  variant?: 'single';
  label: string;
  icon: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface LiquidGlassSegmentedProps {
  variant: 'segmented';
  options: LiquidGlassOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  ariaLabel: string;
  disabled?: boolean;
  className?: string;
}

export type LiquidGlassButtonProps =
  | LiquidGlassSingleProps
  | LiquidGlassSegmentedProps;

export default function LiquidGlassButton(props: LiquidGlassButtonProps) {
  if (props.variant === 'segmented') {
    return <SegmentedGroup {...props} />;
  }
  return <SingleButton {...props} />;
}

function SingleButton({
  label,
  icon,
  selected = false,
  disabled = false,
  onClick,
  className,
}: LiquidGlassSingleProps) {
  const classes = [styles.button, selected ? styles.selected : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
    >
      <span aria-hidden="true" className={styles.icon}>
        {icon}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}

function SegmentedGroup({
  options,
  selectedValue,
  onSelect,
  ariaLabel,
  disabled = false,
  className,
}: LiquidGlassSegmentedProps) {
  const wrapperClasses = [styles.glass, className ?? ''].filter(Boolean).join(' ');

  return (
    <div role="group" aria-label={ariaLabel} className={wrapperClasses}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        const isDisabled = disabled || Boolean(option.disabled);
        const btnClasses = [styles.button, isSelected ? styles.selected : '']
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={option.value}
            type="button"
            className={btnClasses}
            aria-pressed={isSelected}
            disabled={isDisabled}
            onClick={() => onSelect(option.value)}
          >
            <span aria-hidden="true" className={styles.icon}>
              {option.icon}
            </span>
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
