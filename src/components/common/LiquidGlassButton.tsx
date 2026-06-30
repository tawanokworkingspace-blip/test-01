'use client'

import React from 'react'
import styles from './LiquidGlassButton.module.css'

export type LiquidGlassOption = {
  value: string
  label: string
  icon: React.ReactNode
  disabled?: boolean
}

type SingleProps = {
  variant?: 'single'
  label: string
  icon: React.ReactNode
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  'aria-label'?: string
}

type SegmentedProps = {
  variant: 'segmented'
  options: LiquidGlassOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export type LiquidGlassButtonProps = SingleProps | SegmentedProps

export default function LiquidGlassButton(props: LiquidGlassButtonProps) {
  if (props.variant === 'segmented') {
    return <SegmentedButton {...props} />
  }
  return <SingleButton {...props} />
}

function SingleButton({
  label,
  icon,
  selected = false,
  disabled = false,
  onClick,
  className,
  'aria-label': ariaLabel,
}: SingleProps) {
  return (
    <button
      type="button"
      data-testid="liquid-glass-button"
      data-variant="single"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        styles.single,
        selected ? styles.selected : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span aria-hidden="true" className={styles.icon}>
        {icon}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}

function SegmentedButton({
  options,
  value,
  onChange,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: SegmentedProps) {
  return (
    <div
      role="group"
      data-testid="liquid-glass-button"
      data-variant="segmented"
      aria-label={ariaLabel}
      className={[styles.segmented, className ?? ''].filter(Boolean).join(' ')}
    >
      {options.map((option) => {
        const isSelected = option.value === value
        const isDisabled = disabled || option.disabled === true

        return (
          <button
            key={option.value}
            type="button"
            data-testid="liquid-glass-segment"
            data-value={option.value}
            data-selected={isSelected ? 'true' : 'false'}
            aria-pressed={isSelected}
            disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) {
                onChange(option.value)
              }
            }}
            className={[
              styles.segment,
              isSelected ? styles.segmentSelected : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span aria-hidden="true" className={styles.icon}>
              {option.icon}
            </span>
            <span className={styles.label}>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
