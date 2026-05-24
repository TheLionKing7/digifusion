import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About',
  description:
    'DigiFusion is an enterprise AI agency and digital media company fusing system design expertise with intelligent tools to help SMBs scale. Part of the Digital Nation ecosystem.',
  alternates: { canonical: 'https://www.digitafusion.com/about' },
  openGraph: {
    title: 'About DigiFusion — Where Digital Knowledge Meets Intelligent Execution',
    description:
      'We fuse digital knowledge with intelligent tools to help individuals and businesses grow online.',
    url: 'https://www.digitafusion.com/about',
    type: 'website',
  },
};

const FAQ_ITEMS = [
  {
    q: 'What exactly does DigiFusion do?',
    a: 'DigiFusion is an enterprise AI agency and digital media company operating across three disciplines: AI automation and workflow engineering, digital product strategy and monetisation, and content visibility through SEO and growth. We help small and medium businesses replace manual bottlenecks with intelligent, scalable systems.',
  },
  {
    q: 'Who do you typically work with?',
    a: 'We work with founders, SMB owners, and growth-stage companies ready to use AI as a genuine business lever — not a buzzword. Our clients span services, retail, coaching, content creation, and e-commerce sectors across Africa, Europe, and North America.',
  },
  {
    q: 'How is DigiFusion different from a regular digital agency?',
    a: 'Most agencies deliver a website or a campaign and disappear. We build systems — automations, workflows, and content engines that keep working after we leave. Our roots are in user research and system design, which means every solution is engineered around real user behaviour, not assumptions.',
  },
  {
    q: 'How do I get started with DigiFusion?',
    a: 'Book a free 30-minute strategy session. We audit your current operations, identify the highest-leverage automation opportunities, and deliver a prioritised roadmap — no commitment, no sales pressure.',
  },
  {
    q: 'Is DigiFusion a service company or a product company?',
    a: 'Both. We offer done-for-you agency services for businesses that want expert implementation, and we publish digital tools, templates, and guides for those who prefer a self-serve path. The Knowledge Base on this site is the public-facing layer of that publishing engine.',
  },
  {
    q: 'What is Digital Nation?',
    a: 'Digital Nation is the parent ecosystem that DigiFusion operates under. It is a portfolio of digital brands focused on helping creators, entrepreneurs, and businesses grow in the modern digital economy.',
  },
];

const LENSES = [
  {
    label: 'Lens 01',
    title: 'Digital Business',
    desc: 'We help you turn knowledge into income. From ebook publishing and info-product strategy to digital product launches and pricing architecture — we build the asset layer of your business.',
    tags: ['Digital Products', 'Ebooks & Courses', 'Monetisation', 'Pricing Strategy'],
    href: '/blog/topics/digital-business',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    label: 'Lens 02',
    title: 'AI & Automation',
    desc: 'We design and deploy AI-powered workflows that eliminate the manual work draining your team. No-code to full-stack — we build automation systems that scale with your business.',
    tags: ['AI Agents', 'Workflow Automation', 'No-Code Systems', 'Productivity'],
    href: '/blog/topics/ai-automation',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h.01M15 9h.01M9 15h6"/>
      </svg>
    ),
  },
  {
    label: 'Lens 03',
    title: 'Content & Visibility',
    desc: 'We build content systems that compound over time — SEO-driven blog strategy, social media growth engines, and audience-building frameworks that drive organic, lasting traffic.',
    tags: ['SEO Strategy', 'Blog Systems', 'Social Growth', 'Audience Building'],
    href: '/blog/topics/content-visibility',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

const VALUES = [
  { title: 'Expertise Over Opinion', desc: 'Every recommendation we make is grounded in system design principles, real user research, and tested frameworks — not trends.' },
  { title: 'Build, Don\'t Just Advise', desc: 'We are engineers and strategists. We don\'t hand you a deck and wave goodbye. We build the thing, then hand you the controls.' },
  { title: 'Practical Over Theoretical', desc: 'Our knowledge base and client work are both rooted in what actually works in the field — no recycled advice, no AI-generated fluff.' },
  { title: 'Transparent by Default', desc: 'We identify as DigiFusion on every platform. We disclose affiliations clearly. We answer questions even when we have no product to sell.' },
];

const STATS = [
  { value: '20+', label: 'Years Combined Experience' },
  { value: '200+', label: 'Workflows Automated' },
  { value: '3', label: 'Expert Lenses' },
  { value: '50+', label: 'SMBs Served' },
];

export default function AboutPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            Part of Digital Nation
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl mb-6">
            Where Digital Knowledge Meets{' '}
            <span className="text-accent">Intelligent Execution</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
            DigiFusion is the answer to modern technological disruption and media invisibility.
            We fuse the expertise of seasoned system designers with the creativity of digital
            media strategists — helping small and medium businesses scale with precision.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/agency/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              Book a Strategy Session
            </Link>
            <Link
              href="/agency/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-all text-sm font-medium"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="border-b border-border/40 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-4xl font-bold text-accent">{s.value}</p>
                <p className="text-sm text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Lenses ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            The Fluid Identity Model
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
            One Brand. Three Expert Lenses.
          </h2>
          <p className="text-muted leading-relaxed">
            DigiFusion doesn&apos;t operate from a single angle. We activate the lens most
            relevant to your challenge — without being confined to one professional identity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LENSES.map((lens) => (
            <Link
              key={lens.title}
              href={lens.href}
              className="group flex flex-col rounded-2xl bg-surface-lighter border border-border/50 hover:border-accent/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 p-7"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                {lens.icon}
              </div>
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-accent mb-1">
                {lens.label}
              </p>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {lens.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed flex-1">{lens.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {lens.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                Our Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Built at the Intersection of Knowledge and Tools
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  DigiFusion Inc emerged from a clear observation: most businesses don&apos;t
                  lack ambition — they lack the systems to execute it. Technological disruption
                  moves fast, and most SMBs are left managing chaos manually while their
                  competitors automate ahead.
                </p>
                <p>
                  Founded under the <span className="text-foreground font-medium">Digital Nation</span> ecosystem,
                  we sit at the intersection of digital knowledge and intelligent tools. Our team of
                  system designers, marketing experts, business developers, and creatives brings
                  over two decades of combined experience to every engagement.
                </p>
                <p>
                  We don&apos;t just consult. We build, deploy, and hand you the controls — leaving
                  behind systems that compound your growth long after the engagement ends.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-border/40" />
                <p className="text-xs text-muted italic font-medium">
                  &ldquo;We fuse digital knowledge with intelligent tools to help individuals and businesses grow online.&rdquo;
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'System Design', desc: 'User-centered architecture built to last' },
                { label: 'AI Engineering', desc: 'Automation that removes real bottlenecks' },
                { label: 'Digital Strategy', desc: 'Content and visibility that compounds' },
                { label: 'Business Dev', desc: 'Products and monetisation that scale' },
              ].map((item) => (
                <div key={item.label} className="glass-light rounded-xl p-5">
                  <div className="w-2 h-2 rounded-full bg-accent mb-3" />
                  <p className="font-semibold text-foreground text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
          The Team
        </p>
        <h2 className="font-serif text-3xl font-bold tracking-tight mb-10">
          Expertise Behind the Platform
        </h2>
        <div className="max-w-2xl">
          <div className="glass-strong rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-7">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/30 shrink-0 ring-2 ring-accent/10">
              <Image src="/images/founder.jpg" alt="Boroji Adebayo" width={80} height={80} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-semibold mb-1">Founder &amp; Lead Strategist</p>
              <p className="font-serif text-2xl font-bold text-foreground mb-1">Boroji Adebayo</p>
              <p className="text-sm text-accent font-medium mb-3">
                User Research &amp; System Designer · Design Strategist · AI Automation Engineer
              </p>
              <p className="text-sm text-muted leading-relaxed mb-4">
                7 years building user-centered, innovative solutions at the intersection of
                design strategy and AI engineering. Boroji leads DigiFusion&apos;s system design
                practice — crafting intelligent workflows, product architectures, and automation
                pipelines that solve real operational problems for SMBs.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['User Research', 'System Design', 'Design Strategy', 'AI Automation', '7 Years Experience'].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://www.linkedin.com/in/boroji-adebayo-5956b12b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Voice / Values ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">How We Work</p>
            <h2 className="font-serif text-3xl font-bold tracking-tight">Our Principles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div key={v.title} className="rounded-xl bg-surface-lighter border border-border/50 p-6">
                <p className="text-xs font-mono text-accent mb-3">0{i + 1}</p>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3 items-center">
            <p className="text-xs text-muted uppercase tracking-widest font-semibold mr-2">Brand Voice</p>
            {['Authoritative', 'Practical', 'Forward-thinking', 'Accessible'].map((v) => (
              <span key={v} className="text-xs px-3 py-1.5 rounded-full border border-accent/30 text-accent bg-accent/5 font-medium">
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">FAQ</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight">Common Questions</h2>
        </div>
        <div className="max-w-3xl space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="rounded-xl border border-border/40 bg-surface p-6">
              <h3 className="font-semibold text-foreground mb-2 flex items-start gap-3">
                <span className="text-accent font-mono text-sm shrink-0 mt-0.5">Q{i + 1}</span>
                {item.q}
              </h3>
              <p className="text-sm text-muted leading-relaxed pl-7">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

            {/* ── CTA ── */}
      <section className="border-t border-border/40 bg-surface/30 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-10 lg:gap-0">

            {/* Text + button */}
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Ready to Scale?</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Let&apos;s Build Your Intelligence Layer
              </h2>
              <p className="text-muted mb-8 leading-relaxed">
                Book a free strategy session. We&apos;ll audit your operations, identify automation
                opportunities, and deliver a roadmap &mdash; no obligation, no sales pitch.
              </p>
              <Link
                href="/agency/booking"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-all active:scale-[0.98]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                Book Your Strategy Session
              </Link>
            </div>

            {/* Founder image - no background, anchored to bottom edge */}
            <div className="hidden lg:flex items-end justify-end self-end -mb-20 -mr-6">
              <Image
                src="/images/founder-nobg.webp"
                alt="Boroji Adebayo, Founder of DigiFusion"
                width={320}
                height={425}
                className="object-contain object-bottom drop-shadow-2xl select-none pointer-events-none"
                priority={false}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
