'use client';

import React from 'react';
import styles from './LiquidGlassButton.module.css';

export type LiquidGlassButtonProps = {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
};

export default function LiquidGlassButton({
  label,
  icon,
  selected = false,
  disabled = false,
  onClick,
  ariaLabel,
  className,
}: LiquidGlassButtonProps) {
  function handleClick() {
    if (!disabled && onClick) {
      onClick();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
      e.preventDefault();
      onClick();
    }
  }

  const rootClass = [
    styles.button,
    selected ? styles.selected : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      data-testid="liquid-glass-button"
      aria-label={ariaLabel ?? label}
      aria-pressed={selected}
      aria-disabled={disabled}
      disabled={disabled}
      data-selected={selected ? 'true' : undefined}
      className={rootClass}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon && (
        <span data-testid="lgb-icon" className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span data-testid="lgb-label" className={styles.label}>
        {label}
      </span>
    </button>
  );
}
