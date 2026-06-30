import type { Metadata } from 'next';
import ComponentsShowcase from './_components/ComponentsShowcase';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Components Showcase',
};

export default function ComponentsPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Components Showcase</h1>
      <p className={styles.subtitle}>
        Live examples of every UI component in the library.
      </p>
      <ComponentsShowcase />
    </main>
  );
}
