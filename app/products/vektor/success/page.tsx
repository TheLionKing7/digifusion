import Link from 'next/link';

export const metadata = {
  title: 'Payment Confirmed — Vektor',
  description: 'Your Vektor subscription is active. Check your email for your registration key.',
};

interface Props {
  searchParams: Promise<{ plan?: string; ref?: string }>;
}

export default async function VektorSuccessPage({ searchParams }: Props) {
  const { plan } = await searchParams;
  const planLabel = plan === 'pro' ? 'Pro' : plan === 'solo' ? 'Solo' : 'paid';

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div className="text-center max-w-lg mx-auto">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
          style={{ background: 'rgba(244,166,29,0.12)', border: '1px solid rgba(244,166,29,0.3)' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f4a61d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Heading */}
        <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#f4a61d' }}>
          ⚡ Vektor · Payment Confirmed
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          You&apos;re on <span style={{ color: '#f4a61d' }}>Vektor {planLabel}</span>
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-8">
          Your subscription is active. We&apos;ve sent your <strong className="text-foreground">registration key</strong> and receipt to your email — it should arrive within the next few minutes.
        </p>

        {/* Steps card */}
        <div className="rounded-2xl border p-8 mb-8 text-left space-y-5"
          style={{ background: '#0e1018', borderColor: 'rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: '#5a6072' }}>Next steps</p>

          {[
            { num: '01', title: 'Check your inbox', body: 'Look for an email from DigiFusion with the subject "Your Vektor API Key". If it\'s not there in 5 minutes, check your spam folder.' },
            { num: '02', title: 'Copy your registration key', body: 'Your key is a long string starting with "vk_". Copy it exactly — no extra spaces.' },
            { num: '03', title: 'Open the Vektor Chrome extension', body: 'Click the Vektor icon in your browser toolbar. Paste your key into the registration field when prompted.' },
            { num: '04', title: 'Run your first sweep', body: 'Select a niche category and hit Sweep. Your first brief will be ready in under 60 seconds.' },
          ].map(({ num, title, body }) => (
            <div key={num} className="flex gap-4 items-start">
              <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                style={{ background: 'rgba(244,166,29,0.12)', color: '#f4a61d' }}>
                {num}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Didn't get email note */}
        <div className="rounded-xl border p-5 mb-8 text-sm text-left"
          style={{ background: 'rgba(244,166,29,0.05)', borderColor: 'rgba(244,166,29,0.2)' }}>
          <p className="font-semibold mb-1" style={{ color: '#f4a61d' }}>Didn&apos;t receive the email?</p>
          <p className="text-muted leading-relaxed">
            Check your spam or promotions folder first. If it still hasn&apos;t arrived after 10 minutes,
            visit the{' '}
            <Link href="/products/vektor#vk-register" className="underline" style={{ color: '#f4a61d' }}>
              Retrieve Key
            </Link>{' '}
            tab on the Vektor page and enter your email to look up your key directly.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/products/vektor"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
            style={{ background: '#f4a61d', color: '#000' }}
          >
            ← Back to Vektor
          </Link>
          <Link
            href="/products/vektor#vk-register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-all text-muted hover:text-foreground"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            Retrieve my key
          </Link>
        </div>

      </div>
    </div>
  );
}
