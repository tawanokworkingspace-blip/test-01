'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { LiquidGlassButton } from '@/components/common/LiquidGlassButton';
import { CommandIcon } from '@/components/common/icons/CommandIcon';
import { InboxIcon } from '@/components/common/icons/InboxIcon';
import { SettingsIcon } from '@/components/common/icons/SettingsIcon';
import styles from './ComponentsShowcase.module.css';

const singleOptions = [
  { value: 'command', label: 'Command', icon: <CommandIcon /> },
];

const segmentedOptions = [
  { value: 'command', label: 'Command', icon: <CommandIcon /> },
  { value: 'inbox', label: 'Inbox', icon: <InboxIcon /> },
  { value: 'settings', label: 'Settings', icon: <SettingsIcon />, disabled: true },
];

export default function ComponentsShowcase() {
  const [singleSelected, setSingleSelected] = useState<string>('command');
  const [segmentSelected, setSegmentSelected] = useState<string>('command');

  return (
    <div className={styles.showcase}>
      {/* Section 1: Button */}
      <section data-testid="showcase-section" className={styles.section}>
        <h2 className={styles.sectionHeading}>Button</h2>
        <div className={styles.sectionContent}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* Section 2: Liquid Glass — Single variant */}
      <section data-testid="showcase-section" className={styles.section}>
        <h2 className={styles.sectionHeading}>Liquid Glass Button — Single</h2>
        <div className={styles.sectionContent}>
          <div className={styles.glassWrapper}>
            <LiquidGlassButton
              options={singleOptions}
              selectedValue={singleSelected}
              onSelect={setSingleSelected}
              ariaLabel="Command"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Liquid Glass — Segmented variant */}
      <section data-testid="showcase-section" className={styles.section}>
        <h2 className={styles.sectionHeading}>Liquid Glass Button — Segmented</h2>
        <div className={styles.sectionContent}>
          <div className={styles.glassWrapper}>
            <LiquidGlassButton
              options={segmentedOptions}
              selectedValue={segmentSelected}
              onSelect={setSegmentSelected}
              ariaLabel="Navigation options"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
