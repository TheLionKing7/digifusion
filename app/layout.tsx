import type { Metadata } from 'next';
import Script from 'next/script';
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

        {/* ── Lightweight page-view tracker ── */}
        <Script id="df-tracker" strategy="afterInteractive">{`
(function(){
  // Generate or retrieve a session ID (tab-scoped, not persisted)
  var sid = window.__dfSid;
  if(!sid){
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    window.__dfSid = sid;
  }
  function track(){
    var payload = JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer || null,
      sessionId: sid
    });
    if(navigator.sendBeacon){
      navigator.sendBeacon('/api/track', new Blob([payload],{type:'application/json'}));
    } else {
      fetch('/api/track',{method:'POST',body:payload,headers:{'Content-Type':'application/json'},keepalive:true}).catch(function(){});
    }
  }
  // Track initial page load
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',track);
  } else {
    track();
  }
  // Track Next.js client-side navigation
  var _pushState = history.pushState.bind(history);
  history.pushState = function(){
    _pushState.apply(history, arguments);
    setTimeout(track, 0);
  };
  window.addEventListener('popstate', track);
})();
        `}</Script>
      </body>
    </html>
  );
}
