'use client';

import React from 'react';
import styles from './LiquidGlassSegmentedButton.module.css';

export type Segment = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type LiquidGlassSegmentedButtonProps = {
  segments: Segment[];
  selectedId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
  className?: string;
};

export default function LiquidGlassSegmentedButton({
  segments,
  selectedId,
  onSelect,
  ariaLabel,
  className,
}: LiquidGlassSegmentedButtonProps) {
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    id: string,
    disabled?: boolean,
  ) {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onSelect(id);
    }
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      data-testid="liquid-glass-segmented"
      className={[styles.group, className ?? ''].filter(Boolean).join(' ')}
    >
      {segments.map((seg) => {
        const isSelected = seg.id === selectedId;
        const segClass = [
          styles.segment,
          isSelected ? styles.selected : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={seg.id}
            type="button"
            data-testid={`lgb-seg-${seg.id}`}
            aria-pressed={isSelected}
            aria-disabled={seg.disabled}
            disabled={seg.disabled}
            data-selected={isSelected ? 'true' : 'false'}
            className={segClass}
            onClick={() => !seg.disabled && onSelect(seg.id)}
            onKeyDown={(e) => handleKeyDown(e, seg.id, seg.disabled)}
          >
            {seg.icon && (
              <span className={styles.icon} aria-hidden="true">
                {seg.icon}
              </span>
            )}
            <span className={styles.label}>{seg.label}</span>
          </button>
        );
      })}
    </div>
  );
}
