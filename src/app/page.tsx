import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Liquid Glass UI</h1>
      <p className={styles.description}>
        Apple-inspired translucent components with frosted glass aesthetics.
      </p>
      <Link href="/components" className={styles.cta}>
        View Components
      </Link>
    </div>
  )
}
