import Link from 'next/link';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '32px',
      }}
    >
      <h1>Welcome</h1>
      <p>Explore the UI component library.</p>
      <Link
        href="/components"
        style={{
          padding: '12px 24px',
          background: '#0070f3',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        View Components
      </Link>
    </main>
  );
}
