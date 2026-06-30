import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>UI Components</h1>
      <p className={styles.description}>
        A showcase of reusable UI components built with Next.js and TypeScript.
      </p>
      <nav>
        <Link href="/components" className={styles.link}>
          View Components Showcase
        </Link>
      </nav>
    </main>
  );
}
