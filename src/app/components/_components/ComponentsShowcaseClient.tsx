'use client';

import { useState } from 'react';
import LiquidGlassButton from '@/components/common/LiquidGlassButton';
import type { LiquidGlassOption } from '@/components/common/LiquidGlassButton';
import styles from './ComponentsShowcase.module.css';

function CommandIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 18.76 4H5.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

const segmentedOptions: LiquidGlassOption[] = [
  { value: 'command', label: 'Command', icon: <CommandIcon /> },
  { value: 'inbox', label: 'Inbox', icon: <InboxIcon /> },
];

export default function ComponentsShowcaseClient() {
  const [singleSelected, setSingleSelected] = useState(false);
  const [segmentedValue, setSegmentedValue] = useState('command');

  return (
    <div className={styles.showcase}>
      <section className={styles.example}>
        <h2>Liquid Glass Button — Single</h2>
        <div className={styles.exampleContent}>
          <LiquidGlassButton
            label="Command"
            icon={<CommandIcon />}
            selected={singleSelected}
            onClick={() => setSingleSelected((prev) => !prev)}
          />
          <LiquidGlassButton
            label="Inbox"
            icon={<InboxIcon />}
            selected={false}
          />
          <LiquidGlassButton
            label="Disabled"
            icon={<CommandIcon />}
            disabled
          />
        </div>
      </section>

      <section className={styles.example}>
        <h2>Liquid Glass Button — Segmented</h2>
        <div className={styles.exampleContent}>
          <LiquidGlassButton
            variant="segmented"
            options={segmentedOptions}
            selectedValue={segmentedValue}
            onSelect={setSegmentedValue}
            ariaLabel="View mode"
          />
        </div>
      </section>
    </div>
  );
}
