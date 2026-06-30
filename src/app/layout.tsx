import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Liquid Glass',
    default: 'Liquid Glass',
  },
  description: 'Apple-inspired Liquid Glass UI components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/components" className={styles.navLink}>Components</Link>
          </nav>
        </header>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  )
}
