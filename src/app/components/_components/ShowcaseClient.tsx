'use client'

import React, { useState } from 'react'
import LiquidGlassButton from '@/components/common/LiquidGlassButton'
import styles from './ShowcaseClient.module.css'

const CommandIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
  </svg>
)

const InboxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
)

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
)

const segmentedOptions = [
  { value: 'command', label: 'Command', icon: <CommandIcon /> },
  { value: 'inbox', label: 'Inbox', icon: <InboxIcon /> },
  { value: 'starred', label: 'Starred', icon: <StarIcon /> },
]

export default function ShowcaseClient() {
  const [singleSelected, setSingleSelected] = useState(false)
  const [segmentedValue, setSegmentedValue] = useState('command')

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Components</h1>
      <p className={styles.pageDescription}>
        A showcase of all available UI components.
      </p>

      <div data-testid="showcase-grid" className={styles.grid}>
        <section
          data-testid="component-example"
          aria-labelledby="single-heading"
          className={styles.section}
        >
          <h2 id="single-heading" className={styles.sectionTitle}>
            LiquidGlassButton — Single
          </h2>
          <div className={styles.examples}>
            <div className={styles.exampleRow}>
              <LiquidGlassButton
                label="Command"
                icon={<CommandIcon />}
                selected={singleSelected}
                onClick={() => setSingleSelected((s) => !s)}
                aria-label="Toggle Command"
              />
              <LiquidGlassButton
                label="Inbox"
                icon={<InboxIcon />}
                selected={true}
              />
              <LiquidGlassButton
                label="Starred"
                icon={<StarIcon />}
                selected={false}
                disabled
                aria-label="Starred (disabled)"
              />
            </div>
            <p className={styles.hint}>
              Click the first button to toggle its selected state.
            </p>
          </div>
        </section>

        <section
          data-testid="component-example"
          aria-labelledby="segmented-heading"
          className={styles.section}
        >
          <h2 id="segmented-heading" className={styles.sectionTitle}>
            LiquidGlassButton — Segmented
          </h2>
          <div className={styles.examples}>
            <LiquidGlassButton
              variant="segmented"
              options={segmentedOptions}
              value={segmentedValue}
              onChange={setSegmentedValue}
              aria-label="View mode"
            />
            <p className={styles.hint}>
              Selected: <strong>{segmentedValue}</strong>
            </p>
          </div>
        </section>

        <section
          data-testid="component-example"
          aria-labelledby="segmented-disabled-heading"
          className={styles.section}
        >
          <h2 id="segmented-disabled-heading" className={styles.sectionTitle}>
            LiquidGlassButton — Segmented (Disabled)
          </h2>
          <div className={styles.examples}>
            <LiquidGlassButton
              variant="segmented"
              options={[
                { value: 'grid', label: 'Grid', icon: <GridIcon /> },
                { value: 'list', label: 'List', icon: <InboxIcon /> },
              ]}
              value="grid"
              onChange={() => undefined}
              disabled
              aria-label="Layout (disabled)"
            />
          </div>
        </section>

        <section
          data-testid="component-example"
          aria-labelledby="states-heading"
          className={styles.section}
        >
          <h2 id="states-heading" className={styles.sectionTitle}>
            LiquidGlassButton — All States
          </h2>
          <div className={styles.examples}>
            <div className={styles.statesGrid}>
              <div className={styles.stateItem}>
                <LiquidGlassButton
                  label="Default"
                  icon={<StarIcon />}
                  selected={false}
                />
                <span className={styles.stateLabel}>Default</span>
              </div>
              <div className={styles.stateItem}>
                <LiquidGlassButton
                  label="Selected"
                  icon={<StarIcon />}
                  selected={true}
                />
                <span className={styles.stateLabel}>Selected</span>
              </div>
              <div className={styles.stateItem}>
                <LiquidGlassButton
                  label="Disabled"
                  icon={<StarIcon />}
                  disabled
                />
                <span className={styles.stateLabel}>Disabled</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
