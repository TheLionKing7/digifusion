import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://www.digitafusion.com';
const EMAIL = 'enquiries@digitafusion.com';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with DigiFusion — book a free strategy session, email our team, or ask about AI automation, digital media, and intelligence products.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact DigiFusion',
    description: 'Book a strategy session or reach our team directly.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-3">
            Contact
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Let&apos;s talk about your next move.
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Whether you need automation diagnostics, a digital media roadmap, or guidance on our
            Intelligence products — start with a conversation. No sales pressure, just clarity.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div className="glass-strong rounded-2xl p-8 border border-border/40">
            <h2 className="font-serif text-xl font-bold mb-3">Book a strategy session</h2>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Free · 30 minutes · diagnosis before prescription. Pick the track that matches your
              priority — automation, business development, or digital media.
            </p>
            <Link
              href="/agency/booking"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Book a free session
            </Link>
          </div>

          <div className="glass-strong rounded-2xl p-8 border border-border/40">
            <h2 className="font-serif text-xl font-bold mb-3">Email us</h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              For partnerships, media enquiries, product support, or general questions.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-accent font-medium hover:underline break-all"
            >
              {EMAIL}
            </a>
            <p className="text-xs text-muted mt-6">
              We respond within one business day for most enquiries.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold mb-4">What to expect</h2>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">1.</span>
              <span>We listen to your operational bottleneck — not your tool wish list.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">2.</span>
              <span>We map whether automation, BD, or content is the highest-leverage starting point.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">3.</span>
              <span>You leave with a clear next step — even if that step is not working with us yet.</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
