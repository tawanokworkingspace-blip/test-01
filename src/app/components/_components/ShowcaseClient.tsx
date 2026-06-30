'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LiquidGlassButton from '@/components/common/LiquidGlassButton';
import LiquidGlassSegmentedButton from '@/components/common/LiquidGlassSegmentedButton';
import styles from './Showcase.module.css';

const SEGMENTS = [
  { id: 'command', label: 'Command', icon: '⌘' },
  { id: 'inbox', label: 'Inbox', icon: '📥' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function ShowcaseClient() {
  const [singleSelected, setSingleSelected] = useState(false);
  const [segSelected, setSegSelected] = useState('command');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Home
        </Link>
        <h1 className={styles.heading}>Components</h1>
        <p className={styles.subtitle}>
          Interactive showcase of all UI components.
        </p>
      </header>

      <section className={styles.grid}>
        {/* Single button — default */}
        <div data-testid="showcase-item" className={styles.card}>
          <h2 className={styles.cardTitle}>Liquid Glass Button — Default</h2>
          <div className={styles.cardContent}>
            <LiquidGlassButton
              label="Click me"
              onClick={() => setSingleSelected((v) => !v)}
            />
          </div>
        </div>

        {/* Single button — selected */}
        <div data-testid="showcase-item" className={styles.card}>
          <h2 className={styles.cardTitle}>Liquid Glass Button — Selected</h2>
          <div className={styles.cardContent}>
            <LiquidGlassButton
              label="Selected"
              selected={singleSelected}
              onClick={() => setSingleSelected((v) => !v)}
            />
          </div>
        </div>

        {/* Single button — with icon */}
        <div data-testid="showcase-item" className={styles.card}>
          <h2 className={styles.cardTitle}>Liquid Glass Button — With Icon</h2>
          <div className={styles.cardContent}>
            <LiquidGlassButton label="Command" icon="⌘" />
          </div>
        </div>

        {/* Single button — disabled */}
        <div data-testid="showcase-item" className={styles.card}>
          <h2 className={styles.cardTitle}>Liquid Glass Button — Disabled</h2>
          <div className={styles.cardContent}>
            <LiquidGlassButton label="Disabled" disabled />
          </div>
        </div>

        {/* Single button — icon + aria-label */}
        <div data-testid="showcase-item" className={styles.card}>
          <h2 className={styles.cardTitle}>
            Liquid Glass Button — Icon with ariaLabel
          </h2>
          <div className={styles.cardContent}>
            <LiquidGlassButton
              label="📥"
              ariaLabel="Inbox"
              icon="📥"
            />
          </div>
        </div>

        {/* Segmented button */}
        <div data-testid="showcase-item" className={styles.card}>
          <h2 className={styles.cardTitle}>
            Liquid Glass Segmented Button
          </h2>
          <div className={styles.cardContent}>
            <LiquidGlassSegmentedButton
              segments={SEGMENTS}
              selectedId={segSelected}
              onSelect={setSegSelected}
              ariaLabel="Navigation tabs"
            />
          </div>
        </div>

        {/* Segmented button — two options */}
        <div data-testid="showcase-item" className={styles.card}>
          <h2 className={styles.cardTitle}>
            Liquid Glass Segmented — Two options
          </h2>
          <div className={styles.cardContent}>
            <LiquidGlassSegmentedButton
              segments={[
                { id: 'light', label: 'Light', icon: '☀️' },
                { id: 'dark', label: 'Dark', icon: '🌙' },
              ]}
              selectedId="light"
              onSelect={() => {}}
              ariaLabel="Theme selector"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
