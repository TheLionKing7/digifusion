import type { Metadata } from 'next';
import Script from 'next/script';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AssistantChat } from '@/components/ui/AssistantChat';
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
        {/* Organization + WebSite schema — global, picked up by every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.digitafusion.com/#organization',
                  name: 'DigiFusion',
                  url: 'https://www.digitafusion.com',
                  logo: 'https://www.digitafusion.com/assets/digilogo.png',
                  contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'enquiries@digitafusion.com',
                    contactType: 'customer service',
                  },
                  sameAs: [
                    'https://web.facebook.com/profile.php?id=61589805234698',
                    'https://x.com/digifusion_hq',
                    'https://www.quora.com/profile/DigiFusion-Inc',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.digitafusion.com/#website',
                  url: 'https://www.digitafusion.com',
                  name: 'DigiFusion',
                  description: 'Enterprise AI agency delivering automation, digital media, products and intelligence solutions.',
                  publisher: { '@id': 'https://www.digitafusion.com/#organization' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://www.digitafusion.com/blog?q={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* DigiFusion Assistant — floating chat widget for lead qualification */}
        <AssistantChat />

        {/* OneSignal Web Push — app registered to https://www.digitafusion.com
            notifyButton disabled: opt-in is driven by the AssistantChat widget.
            The service worker is at /public/OneSignalSDKWorker.js. */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />
        <Script id="onesignal-init" strategy="afterInteractive">{`
window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function(OneSignal) {
  await OneSignal.init({
    appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}",
    notifyButton: { enable: false },
    serviceWorkerPath: "/OneSignalSDKWorker.js",
  });
  window._osReady = true;
  window.dispatchEvent(new CustomEvent('onesignal:ready'));
});
        `}</Script>

        {/* DigiFusion Analytics — full visitor footprint tracker */}
        <Script id="df-tracker" strategy="afterInteractive">{`
(function(){
  var SID_KEY='__dfSid';
  var sid=sessionStorage.getItem(SID_KEY);
  if(!sid){sid=Math.random().toString(36).slice(2)+Date.now().toString(36);sessionStorage.setItem(SID_KEY,sid);}
  var _utmS,_utmM,_utmC;
  (function(){var sp=new URLSearchParams(window.location.search);
    _utmS=sp.get('utm_source')||sessionStorage.getItem('__dfUtmS')||undefined;
    _utmM=sp.get('utm_medium')||sessionStorage.getItem('__dfUtmM')||undefined;
    _utmC=sp.get('utm_campaign')||sessionStorage.getItem('__dfUtmC')||undefined;
    if(_utmS)sessionStorage.setItem('__dfUtmS',_utmS);
    if(_utmM)sessionStorage.setItem('__dfUtmM',_utmM);
    if(_utmC)sessionStorage.setItem('__dfUtmC',_utmC);
  })();
  function getDevice(){var ua=navigator.userAgent;if(/mobi|android|iphone|ipod/i.test(ua))return'mobile';if(/tablet|ipad/i.test(ua))return'tablet';return'desktop';}
  function beacon(p){var b=new Blob([JSON.stringify(p)],{type:'application/json'});if(navigator.sendBeacon){navigator.sendBeacon('/api/track',b);}else{fetch('/api/track',{method:'POST',body:JSON.stringify(p),headers:{'Content-Type':'application/json'},keepalive:true}).catch(function(){});}}
  var _entered=Date.now(),_maxScroll=0,_sent=false;
  function trackPageview(){
    _entered=Date.now();_maxScroll=0;_sent=false;
    beacon({event:'pageview',path:window.location.pathname,referrer:document.referrer||null,sessionId:sid,pageTitle:document.title,
      viewport:window.innerWidth+'x'+window.innerHeight,language:navigator.language,
      timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,
      deviceType:getDevice(),utmSource:_utmS,utmMedium:_utmM,utmCampaign:_utmC});
  }
  function getScroll(){var dH=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),wH=window.innerHeight,sY=window.scrollY||window.pageYOffset;if(dH<=wH)return 100;return Math.min(100,Math.round((sY+wH)/dH*100));}
  window.addEventListener('scroll',function(){var d=getScroll();if(d>_maxScroll)_maxScroll=d;},{passive:true});
  function sendExit(){if(_sent)return;_sent=true;beacon({event:'exit',path:window.location.pathname,sessionId:sid,scrollDepth:_maxScroll,timeOnPage:Math.round((Date.now()-_entered)/1000)});}
  document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')sendExit();});
  window.addEventListener('pagehide',sendExit);
  document.addEventListener('click',function(e){
    var el=e.target;for(var i=0;i<5&&el;i++){
      if(el.tagName==='A'||el.tagName==='BUTTON'||(el.dataset&&el.dataset.track)){
        var lbl=(el.getAttribute('aria-label')||el.innerText||el.getAttribute('href')||'').trim().slice(0,120);
        if(lbl)beacon({event:'click',path:window.location.pathname,sessionId:sid,clickTarget:lbl});
        break;
      }el=el.parentElement;}
  },{passive:true});
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',trackPageview);}else{trackPageview();}
  var _ps=history.pushState.bind(history);
  history.pushState=function(){sendExit();_ps.apply(history,arguments);setTimeout(trackPageview,100);};
  window.addEventListener('popstate',function(){sendExit();setTimeout(trackPageview,100);});
})();
        `}</Script>
      </body>
    </html>
  );
}
