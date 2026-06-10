import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vektor — KDP Discovery & Validation',
  description:
    'Vektor helps KDP publishers discover niches, validate demand (P1–P3), analyse competitor BSR, and build ads packs — live API access for serious operators.',
  alternates: { canonical: 'https://www.digitafusion.com/products/vektor' },
  openGraph: {
    title: 'Vektor — KDP Discovery & Validation',
    description: 'Find your next bestselling ebook niche with data-backed validation.',
    url: 'https://www.digitafusion.com/products/vektor',
    type: 'website',
  },
};

export default function VektorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
