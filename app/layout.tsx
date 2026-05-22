import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DigiFusion — AI Agency, Digital Media, Products & Knowledge Base',
    template: '%s | DigiFusion',
  },
  description:
    'Enterprise AI consultancy, digital media, products and a knowledge base powered by our proprietary publishing engine. We build the intelligence layer for your business.',
  keywords: [
    'AI agency',
    'AI automation',
    'digital products',
    'AI consulting',
    'enterprise AI',
    'machine learning',
    'AI agents',
  ],
  openGraph: {
    title: 'DigiFusion — AI Agency, Digital Media, Products & Knowledge Base',
    description:
      'Enterprise AI consultancy, digital media, products and a knowledge base powered by our proprietary publishing engine.',
    siteName: 'DigiFusion',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigiFusion — AI Agency, Digital Media, Products & Knowledge Base',
    description:
      'Enterprise AI consultancy, digital media, products and a knowledge base powered by our proprietary publishing engine.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif:wght@400;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
