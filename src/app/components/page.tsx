import type { Metadata } from 'next';
import ComponentsShowcaseClient from './_components/ComponentsShowcaseClient';

export const metadata: Metadata = {
  title: 'Components',
};

export default function ComponentsPage() {
  return (
    <main>
      <h1 style={{ padding: '1.5rem 1.5rem 0', fontSize: '1.5rem', fontWeight: 700 }}>
        Components
      </h1>
      <ComponentsShowcaseClient />
    </main>
  );
}
