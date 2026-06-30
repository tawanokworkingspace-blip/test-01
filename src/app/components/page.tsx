import type { Metadata } from 'next'
import ShowcaseClient from './_components/ShowcaseClient'

export const metadata: Metadata = {
  title: 'Components',
}

export default function ComponentsPage() {
  return <ShowcaseClient />
}
