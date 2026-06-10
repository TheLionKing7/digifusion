import type { Metadata } from 'next';
import Link from 'next/link';
import { getShopDb } from '@/lib/shop/supabase';

const SITE_URL = 'https://www.digitafusion.com';
const LAST_UPDATED = 'June 2026';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms and conditions for using DigiFusion services, products, and website.',
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
};

const DEFAULT_TERMS = `
<h2>Agreement</h2>
<p>By accessing digitafusion.com or purchasing our services and products, you agree to these Terms of Service.</p>
<h2>Services</h2>
<p>DigiFusion provides AI consultancy, digital media, software products, and published intelligence. Scope, deliverables, and fees for agency engagements are defined in separate statements of work or proposals.</p>
<h2>Products &amp; subscriptions</h2>
<p>SaaS products and digital goods are subject to the pricing and usage terms shown at checkout. Refunds follow the policy stated on the relevant product or order page.</p>
<h2>Intellectual property</h2>
<p>Site content, frameworks, playbooks, and proprietary methodologies remain the property of DigiFusion unless otherwise agreed in writing. Client-owned data and materials supplied by you remain yours.</p>
<h2>Limitation of liability</h2>
<p>Our services are provided on a best-efforts basis. We are not liable for indirect, incidental, or consequential damages arising from use of the site or services, to the maximum extent permitted by law.</p>
<h2>Contact</h2>
<p>Questions about these terms: <a href="mailto:enquiries@digitafusion.com">enquiries@digitafusion.com</a> or our <a href="/contact">contact page</a>.</p>
`.trim();

async function fetchTermsContent(): Promise<string> {
  try {
    const { data, error } = await getShopDb()
      .from('settings')
      .select('value')
      .eq('key', 'terms')
      .maybeSingle();
    if (error) return DEFAULT_TERMS;
    const content = (data?.value as { content?: string } | null)?.content?.trim();
    return content || DEFAULT_TERMS;
  } catch {
    return DEFAULT_TERMS;
  }
}

export default async function TermsPage() {
  const content = await fetchTermsContent();

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-3">
            Legal
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-muted text-base">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div
          className="bg-white rounded-2xl shadow-sm px-8 py-10 lg:px-14 lg:py-12 prose-blog-light max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <p className="mt-8 text-sm text-muted">
          See also our{' '}
          <Link href="/privacy-policy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </>
  );
}
