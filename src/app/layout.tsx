import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SCRUM-105 — Liquid Glass UI',
  description: 'Liquid Glass button component showcase',
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
