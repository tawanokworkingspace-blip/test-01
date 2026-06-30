import type { Metadata } from 'next';
import ShowcaseClient from './_components/ShowcaseClient';

export const metadata: Metadata = {
  title: 'Components — Liquid Glass UI',
};

export default function ComponentsPage() {
  return (
    <main data-testid="components-showcase">
      <ShowcaseClient />
    </main>
  );
}
