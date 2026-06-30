import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Welcome</h1>
      <Link href="/components">View Components</Link>
    </main>
  );
}
