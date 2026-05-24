import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How DigiFusion collects, uses and protects your personal data. Our commitments as an AI consultancy, digital media and publishing company.',
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'May 2025';
const CONTACT_EMAIL = 'enquiries@digitafusion.com';
const SITE_URL = 'https://www.digitafusion.com';

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-3">
            Legal
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted text-base">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-16">

          {/* Sticky TOC sidebar */}
          <nav className="hidden lg:block">
            <div className="sticky top-28 space-y-1 text-sm">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted mb-3">
                Contents
              </p>
              {[
                ['#overview', 'Overview'],
                ['#information-we-collect', 'Information We Collect'],
                ['#how-we-use-data', 'How We Use Your Data'],
                ['#legal-basis', 'Legal Basis'],
                ['#sharing', 'Sharing & Disclosure'],
                ['#ai-tools', 'AI Tools & Automation'],
                ['#cookies', 'Cookies & Tracking'],
                ['#retention', 'Data Retention'],
                ['#rights', 'Your Rights'],
                ['#security', 'Security'],
                ['#children', 'Children'],
                ['#international', 'International Transfers'],
                ['#changes', 'Policy Changes'],
                ['#contact', 'Contact Us'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="block px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm px-8 py-10 lg:px-14 lg:py-12 prose-blog-light max-w-none">

            <section id="overview">
              <h2>Overview</h2>
              <p>
                DigiFusion Inc (&ldquo;DigiFusion&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates{' '}
                <a href={SITE_URL}>{SITE_URL}</a> and all associated sub-pages, products and services
                (collectively, the &ldquo;Services&rdquo;). We are an AI consultancy, digital media company and
                publishing-technology business. This Privacy Policy explains what personal data we collect,
                why we collect it, how we use it, and what rights you have over it.
              </p>
              <p>
                By using our Services you agree to the practices described here. If you do not agree,
                please discontinue use and contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to request deletion of any
                data already held.
              </p>
            </section>

            <section id="information-we-collect">
              <h2>Information We Collect</h2>

              <h3>Information you provide directly</h3>
              <ul>
                <li>
                  <strong>Enquiry and contact forms</strong> — name, email address, company name,
                  message content and any attachments you choose to share when reaching out about
                  our agency services, products or content.
                </li>
                <li>
                  <strong>Strategy session bookings</strong> — name, email, role, company and
                  calendar/timezone preferences submitted when scheduling a consultation call.
                </li>
                <li>
                  <strong>Product purchases</strong> — billing name, email and payment details
                  processed by our third-party payment processor (Stripe or equivalent). We do
                  not store raw card numbers.
                </li>
                <li>
                  <strong>Newsletter or content subscriptions</strong> — email address and any
                  preference data you supply at opt-in.
                </li>
                <li>
                  <strong>Client project data</strong> — documents, workflows, credentials and
                  business information you share with us during an active AI consulting engagement.
                  This data is governed by your service agreement and is handled with the highest
                  level of confidentiality.
                </li>
              </ul>

              <h3>Information collected automatically</h3>
              <ul>
                <li>
                  <strong>Usage data</strong> — pages visited, referrer URL, session duration and
                  navigation path, collected via a lightweight first-party tracker embedded in our
                  site.
                </li>
                <li>
                  <strong>Device &amp; browser data</strong> — browser type, operating system,
                  screen resolution and approximate IP-derived location (city/country level). We
                  do not perform fingerprinting beyond what is needed for analytics.
                </li>
                <li>
                  <strong>Cookies &amp; local storage</strong> — small files stored on your device
                  for session management, preference storage and aggregate analytics. See the
                  Cookies section below for full details.
                </li>
              </ul>

              <h3>Information from third parties</h3>
              <ul>
                <li>
                  <strong>PathGuru Publishers</strong> — our proprietary content-publishing
                  platform. When content is published to DigiFusion via PathGuru, associated
                  author profile data (name, avatar URL) is transferred and displayed publicly.
                </li>
                <li>
                  <strong>Social platforms</strong> — if you interact with our pages on Facebook,
                  X (Twitter) or Quora, those platforms may share limited profile or engagement
                  data with us subject to their own privacy policies.
                </li>
              </ul>
            </section>

            <section id="how-we-use-data">
              <h2>How We Use Your Data</h2>
              <p>We use personal data only for clearly defined purposes:</p>
              <ul>
                <li>Responding to enquiries and delivering requested services</li>
                <li>Scheduling and facilitating strategy sessions and client projects</li>
                <li>Processing product purchases and issuing receipts</li>
                <li>Sending newsletters or product updates you have subscribed to</li>
                <li>Improving site performance, content relevance and user experience</li>
                <li>Detecting and preventing fraud, abuse or security incidents</li>
                <li>Meeting our legal and contractual obligations</li>
                <li>Aggregated, anonymised analytics to understand content performance</li>
              </ul>
              <p>
                We do not sell, rent or trade your personal data to third parties for their
                independent marketing purposes.
              </p>
            </section>

            <section id="legal-basis">
              <h2>Legal Basis for Processing (GDPR)</h2>
              <p>
                Where the General Data Protection Regulation (GDPR) or UK GDPR applies, we rely
                on the following legal bases:
              </p>
              <ul>
                <li>
                  <strong>Contractual necessity</strong> — processing required to deliver a service
                  you have requested or entered a contract for.
                </li>
                <li>
                  <strong>Legitimate interests</strong> — site analytics, security monitoring and
                  first-party marketing to existing contacts, balanced against your privacy rights.
                </li>
                <li>
                  <strong>Consent</strong> — newsletter subscriptions, non-essential cookies and
                  any processing you have explicitly opted into. You may withdraw consent at any
                  time.
                </li>
                <li>
                  <strong>Legal obligation</strong> — retaining financial records, responding to
                  lawful data requests from authorities.
                </li>
              </ul>
            </section>

            <section id="sharing">
              <h2>Sharing &amp; Disclosure</h2>
              <p>We share data with the following categories of recipients:</p>
              <ul>
                <li>
                  <strong>Service providers</strong> — cloud hosting (Vercel), email delivery
                  (e.g. Resend or Postmark), payment processing (Stripe), calendar scheduling
                  tools and analytics. These providers are contractually required to protect your
                  data and may not use it for their own purposes.
                </li>
                <li>
                  <strong>PathGuru Publishers</strong> — our related publishing platform. Data
                  shared between DigiFusion and PathGuru is limited to what is necessary for
                  content delivery and author attribution.
                </li>
                <li>
                  <strong>Professional advisors</strong> — lawyers, accountants or auditors under
                  strict confidentiality obligations.
                </li>
                <li>
                  <strong>Law enforcement or regulators</strong> — when required by law or to
                  protect the rights, property or safety of DigiFusion, our clients or the public.
                </li>
                <li>
                  <strong>Business transfers</strong> — in the event of a merger, acquisition or
                  asset sale, personal data may be transferred as part of that transaction. You
                  will be notified of any such change in controller.
                </li>
              </ul>
            </section>

            <section id="ai-tools">
              <h2>AI Tools &amp; Automation</h2>
              <p>
                As an AI consultancy, we use AI-powered tools internally to improve our work.
                We want to be transparent about how this affects your data:
              </p>
              <ul>
                <li>
                  <strong>Client work</strong> — data you share for a consulting engagement may
                  be processed by AI models (e.g. large language models) to perform analysis,
                  produce drafts or automate workflows. This is always done under your service
                  agreement and only using models or environments you have approved.
                </li>
                <li>
                  <strong>Internal productivity</strong> — we may use AI assistants to help draft
                  internal communications or code. We maintain strict policies against inputting
                  client personal data into publicly accessible AI tools without explicit consent.
                </li>
                <li>
                  <strong>Content generation</strong> — some published content on this site is
                  AI-assisted. Where AI substantially contributed to an article, it may be noted
                  in the post&apos;s metadata.
                </li>
                <li>
                  <strong>No automated decisions with legal effect</strong> — we do not make
                  solely automated decisions about individuals that produce legal or similarly
                  significant effects.
                </li>
              </ul>
            </section>

            <section id="cookies">
              <h2>Cookies &amp; Tracking</h2>

              <h3>Essential cookies</h3>
              <p>
                Required for the site to function — session state, CSRF protection and load
                balancing. These cannot be disabled without breaking core functionality.
              </p>

              <h3>Analytics cookies</h3>
              <p>
                We use a lightweight first-party tracker (no third-party scripts like Google
                Analytics) that collects page path, referrer and a session identifier. No
                personally identifiable information is sent. The data is stored on our own
                infrastructure and never shared with advertising networks.
              </p>

              <h3>Preference cookies</h3>
              <p>
                Store your choices such as cookie consent status and UI preferences across visits.
              </p>

              <h3>Managing cookies</h3>
              <p>
                You can delete or block cookies through your browser settings. Note that blocking
                essential cookies will impair site functionality. Our analytics tracker does not
                use third-party cookies so browser-level opt-outs from ad networks do not affect it;
                contact us to request analytics opt-out.
              </p>
            </section>

            <section id="retention">
              <h2>Data Retention</h2>
              <ul>
                <li>
                  <strong>Enquiry and contact data</strong> — retained for 3 years from last
                  contact, or until you request deletion.
                </li>
                <li>
                  <strong>Client project data</strong> — retained for the duration of the
                  engagement plus 5 years for legal and audit purposes, unless a shorter period
                  is agreed in your contract.
                </li>
                <li>
                  <strong>Newsletter subscribers</strong> — retained until you unsubscribe or
                  request deletion.
                </li>
                <li>
                  <strong>Purchase records</strong> — retained for 7 years to meet financial
                  regulatory requirements.
                </li>
                <li>
                  <strong>Analytics data</strong> — aggregated and anonymised after 24 months;
                  raw session logs are purged after 90 days.
                </li>
              </ul>
            </section>

            <section id="rights">
              <h2>Your Rights</h2>
              <p>
                Depending on your jurisdiction, you have some or all of the following rights:
              </p>
              <ul>
                <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
                <li><strong>Rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
                <li><strong>Erasure</strong> — request deletion of your data (&ldquo;right to be forgotten&rdquo;),
                  subject to legal retention requirements.</li>
                <li><strong>Restriction</strong> — ask us to limit how we process your data while a
                  dispute is resolved.</li>
                <li><strong>Portability</strong> — receive your data in a structured, machine-readable
                  format.</li>
                <li><strong>Objection</strong> — object to processing based on legitimate interests,
                  including direct marketing.</li>
                <li><strong>Withdraw consent</strong> — where processing is consent-based, withdraw
                  it at any time without affecting prior lawful processing.</li>
              </ul>
              <p>
                To exercise any right, email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond within
                30 days. If you are dissatisfied with our response, you have the right to lodge a
                complaint with your local data protection authority.
              </p>
            </section>

            <section id="security">
              <h2>Security</h2>
              <p>
                We implement industry-standard technical and organisational measures to protect your
                data against unauthorised access, alteration, disclosure or destruction. These include
                TLS encryption in transit, access controls, regular security reviews and
                least-privilege access policies for staff and systems.
              </p>
              <p>
                No method of transmission over the internet is 100% secure. While we take every
                reasonable precaution, we cannot guarantee absolute security. In the event of a
                data breach that affects your rights and freedoms, we will notify affected individuals
                and relevant authorities as required by law.
              </p>
            </section>

            <section id="children">
              <h2>Children</h2>
              <p>
                Our Services are directed at business professionals and are not intended for children
                under 16 years of age. We do not knowingly collect personal data from anyone under 16.
                If you believe a child has provided us with personal information, please contact us
                immediately and we will delete it.
              </p>
            </section>

            <section id="international">
              <h2>International Data Transfers</h2>
              <p>
                DigiFusion is operated from Nigeria and serves clients globally. Your data may be
                processed in countries outside your own, including countries where data protection
                laws differ from those in your jurisdiction. Where we transfer data internationally,
                we rely on appropriate safeguards — including standard contractual clauses approved
                by relevant regulators — to protect your information.
              </p>
            </section>

            <section id="changes">
              <h2>Policy Changes</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our
                practices, technology or legal requirements. When we make material changes, we will
                update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the
                Services after any change constitutes acceptance of the updated policy. We encourage
                you to review this page periodically.
              </p>
            </section>

            <section id="contact">
              <h2>Contact Us</h2>
              <p>
                If you have questions, requests or complaints about this Privacy Policy or how we
                handle your personal data, please contact us:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                <li>
                  <strong>Website:</strong>{' '}
                  <a href={`${SITE_URL}/contact`}>{SITE_URL}/contact</a>
                </li>
              </ul>
              <p>
                We aim to respond to all privacy-related enquiries within 5 business days.
              </p>
            </section>

          </div>
        </div>
      </section>

      {/* Footer CTA strip */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            Questions about how we handle your data?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent-dim transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
