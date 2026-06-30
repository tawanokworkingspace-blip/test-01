import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UI Components Showcase',
  description: 'Reusable UI component library with Liquid Glass design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
