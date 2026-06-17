/**
 * DigiFusion Intelligence Library — catalog, pricing tiers, and access strategy.
 *
 * Tier model (McKinsey-style paywall):
 *   free      → Blog, topic hubs, executive briefs (teaser)
 *   licensed  → Single playbook / guide / research pack (one-time download)
 *   pass      → Annual Intelligence Pass (all current IP + updates)
 *   firm      → Firm license (team access + advisory)
 */

export type IntelligenceCategory = 'field-guide' | 'playbook' | 'research' | 'tool' | 'bundle';
export type AccessTier = 'free' | 'licensed' | 'pass' | 'firm';

export interface CatalogPrice {
  USD: number; // minor units (cents)
  NGN?: number;
  GBP?: number;
}

export interface IntelligenceSku {
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  category: IntelligenceCategory;
  framework?: string;
  tag: string;
  tier: AccessTier;
  prices: CatalogPrice;
  featured?: boolean;
  includes?: string[];
  pages?: string;
  status: 'available' | 'coming-soon' | 'waitlist';
  /** Maps to shop product when seeded */
  shopReady: boolean;
  /** Interactive HTML experience (paywalled on-site) */
  experienceHref?: string;
}

export const ACCESS_TIERS = [
  {
    id: 'free' as const,
    label: 'Executive Brief',
    priceLabel: 'Free',
    description: 'Blog articles, topic hubs, and selected research excerpts. Enough to diagnose whether you need the full IP.',
    includes: ['Blog & topic hubs', 'Research teasers', 'Framework overviews'],
  },
  {
    id: 'licensed' as const,
    label: 'Licensed IP',
    priceLabel: 'From $49',
    description: 'Single playbooks, field guides, and research packs. Buy once, implement this week. Instant secure download.',
    includes: ['Full workflow files', 'SOPs & prompt packs', 'Implementation guides', '72h download access'],
  },
  {
    id: 'pass' as const,
    label: 'Intelligence Pass',
    priceLabel: '$497 / year',
    description: 'All current proprietary playbooks and quarterly IP updates. For operators who want the full library without agency fees.',
    includes: ['All licensed playbooks', 'Quarterly new releases', 'Priority email support', 'Member-only briefings'],
  },
  {
    id: 'firm' as const,
    label: 'Firm License',
    priceLabel: '$1,497',
    description: 'Team-wide access for up to 10 seats plus two strategy sessions. For leadership teams standardising on DigiFusion frameworks.',
    includes: ['Everything in Intelligence Pass', '10 team seats', '2× strategy sessions', 'Custom industry playbook scoping'],
  },
] as const;

/** Core monetizable IP — maps to AVE, Deal Engine, C2C, Engagement Model */
export const INTELLIGENCE_SKUS: IntelligenceSku[] = [
  {
    slug: 'ave-diagnostic-kit',
    name: 'Automation Velocity Engine — Diagnostic Kit',
    subtitle: 'Diagnose before you build',
    description:
      'The complete AVE diagnostic system: Automation Opportunity Matrix, process readiness scoring, adoption KPIs, and the 3-phase deploy sequence we use with agency clients.',
    category: 'playbook',
    framework: 'AVE',
    tag: 'Automation',
    tier: 'licensed',
    prices: { USD: 19700, NGN: 8900000, GBP: 15700 },
    featured: true,
    includes: ['Automation Opportunity Matrix template', 'Process readiness scorecard', 'ADKAR adoption checklist', 'ROI projection worksheet', 'Setup guide (PDF + Notion)'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'deal-engine-field-kit',
    name: 'Deal Engine — B2B Field Kit',
    subtitle: 'Dream 50 fixed. Pipeline that closes.',
    description:
      'ABM tier model, Pain/Value/Access/Timing fit scoring, trigger-event targeting, and the one-afternoon reprioritisation framework from our B2B practice.',
    category: 'playbook',
    framework: 'Deal Engine',
    tag: 'Business Development',
    tier: 'licensed',
    prices: { USD: 24700, NGN: 11200000, GBP: 19700 },
    featured: true,
    includes: ['Account scoring workbook', 'Dream 50 audit template', 'Trigger-event research SOP', 'Pipeline stage definitions', 'Outreach sequence prompts'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'c2c-pillar-cluster-playbook',
    name: 'Content-to-Capital Pipeline — Pillar-Cluster Playbook',
    subtitle: 'Authority architecture, not orphan pages',
    description:
      'ICP Search Journey Map, pillar-cluster architecture, editorial calendar tied to commercial intent, and attribution from content to booked calls.',
    category: 'playbook',
    framework: 'C2C',
    tag: 'Digital Media',
    tier: 'licensed',
    prices: { USD: 19700, NGN: 8900000, GBP: 15700 },
    includes: ['Pillar-cluster map template', 'STDC stage content matrix', 'Cluster brief generator', 'Internal linking SOP', 'Content ROI tracker'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'engagement-model-os',
    name: 'Engagement Model OS',
    subtitle: 'Client lifecycle, utilization, NPS',
    description:
      'The operating system for professional services firms: engagement blueprints, delivery monitoring, utilization tracking, and NPS loops that protect margin.',
    category: 'playbook',
    framework: 'Engagement Model',
    tag: 'Operations',
    tier: 'licensed',
    prices: { USD: 29700, NGN: 13500000, GBP: 23700 },
    includes: ['Engagement blueprint template', 'Utilization dashboard spec', 'NPS + recovery playbook', 'Client 360 view structure', 'Economics model worksheet'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'advertising-playbook-vol1',
    name: 'The Advertising Playbook',
    subtitle: 'Vol. 1 — Strategic Advertising for Modern Business',
    description:
      'Field-tested advertising strategy for SMBs: media selection, message architecture, campaign budgeting, and measuring what actually moves revenue.',
    category: 'field-guide',
    tag: 'Advertising',
    tier: 'licensed',
    prices: { USD: 9700, NGN: 4500000, GBP: 7700 },
    pages: '180+',
    includes: ['Full digital book (PDF + EPUB)', 'Campaign budget templates', 'Creative brief framework', 'Channel selection matrix'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'executive-prompt-library',
    name: 'Executive Prompt Library',
    subtitle: '300+ battle-tested prompts by function',
    description:
      'Categorised prompts for strategy, operations, marketing, sales, and leadership — each with rationale, variables, and example outputs.',
    category: 'field-guide',
    tag: 'AI & Prompts',
    tier: 'licensed',
    prices: { USD: 6700, NGN: 3100000, GBP: 5300 },
    pages: '300+ prompts',
    includes: ['Searchable prompt database', 'Customisation variables guide', 'Output quality rubric', 'Team usage policy template'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'smb-automation-roi-pack',
    name: 'SMB Automation ROI Data Pack',
    subtitle: 'Premium research — full methodology & data',
    description:
      'Extended version of our automation ROI research: full dataset, methodology breakdown, sector benchmarks, and implementation cost models.',
    category: 'research',
    tag: 'Automation',
    tier: 'licensed',
    prices: { USD: 4900, NGN: 2200000, GBP: 3900 },
    includes: ['Full research PDF', 'ROI calculator spreadsheet', 'Sector benchmark tables', 'Methodology appendix'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'african-ai-executive-brief',
    name: 'African C-Suite AI Executive Brief',
    subtitle: 'AI-first playbook for automation-driven growth',
    description:
      'Licensed executive brief covering Nigeria, Ghana, Kenya, and South Africa — AVE-aligned, humanised for C-suite readers, with playbook implementation checklist.',
    category: 'research',
    tag: 'Executive',
    tier: 'licensed',
    prices: { USD: 7900, NGN: 3600000, GBP: 6300 },
    includes: ['Executive brief (PDF)', 'Country priority matrix', 'C-suite council charter', 'One-number KPI worksheet'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'affiliateos-headless-commerce-case-study',
    name: 'AffiliateOS — The Headless Commerce Paradigm',
    subtitle: 'Restructuring the creator economy settlement layer',
    description:
      'Full techno-economic case study: intent decay model, dual-engine Sigil + edge routing architecture, competitive capability matrix, TAM/SAM/SOM, and 5-year projections. Interactive HTML + PDF.',
    category: 'research',
    framework: 'AffiliateOS',
    tag: 'Creator Commerce',
    tier: 'licensed',
    prices: { USD: 8499, NGN: 3950000, GBP: 6800 },
    featured: true,
    pages: 'Interactive + PDF',
    experienceHref: '/intelligence/research/affiliateos-headless-commerce-case-study',
    includes: [
      'Full case study (PDF)',
      'Interactive HTML edition with charts',
      'Intent decay & settlement rate model',
      'Architecture diagrams & competitive matrix',
      'Implementation checklist for operators',
    ],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'openmarket-africa-coordination-case-study',
    name: 'OpenMarket Africa — The Coordination Imperative',
    subtitle: 'McKinsey-grade strategic case study',
    description:
      'Interactive case study + PDF: why asset-heavy e-commerce failed in Africa, the coordination protocol model, AACI credit engine, AfCFTA/PAPSS rails, and 5-year projections.',
    category: 'research',
    framework: 'OpenMarket',
    tag: 'African Commerce',
    tier: 'licensed',
    prices: { USD: 9999, NGN: 4650000, GBP: 7900 },
    featured: true,
    pages: 'Interactive + PDF',
    experienceHref: '/intelligence/research/openmarket-africa-coordination-case-study',
    includes: [
      'Full case study (PDF)',
      'Interactive HTML with charts',
      'Informal trade economics model',
      'Platform architecture & AACI deep-dive',
      'AfCFTA / PAPSS integration framework',
    ],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'intelligence-pass-annual',
    name: 'DigiFusion Intelligence Pass',
    subtitle: 'Annual access to the full IP library',
    description:
      'All current playbooks, field guides, and research packs — plus every new release for 12 months. The paywalled library without agency fees.',
    category: 'bundle',
    tag: 'Membership',
    tier: 'pass',
    prices: { USD: 49700, NGN: 22500000, GBP: 39700 },
    featured: true,
    includes: ['All licensed playbooks', 'All field guides', 'All research packs', 'Quarterly IP updates', 'Member email support'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'intelligence-firm-license',
    name: 'Firm Intelligence License',
    subtitle: 'Team access + advisory',
    description:
      'Everything in the Intelligence Pass for up to 10 team members, plus two 30-minute strategy sessions to align frameworks to your operating model.',
    category: 'bundle',
    tag: 'Enterprise',
    tier: 'firm',
    prices: { USD: 149700, NGN: 68000000, GBP: 119700 },
    includes: ['10 team seats', 'Full Intelligence Pass library', '2× strategy sessions', 'Custom playbook scoping call'],
    status: 'available',
    shopReady: true,
  },
  {
    slug: 'workflow-mapper-tool',
    name: 'Workflow Mapper',
    subtitle: 'Map manual processes in 20 minutes',
    description: 'Standalone utility for documenting as-is processes before automation. Exports to AVE diagnostic format.',
    category: 'tool',
    tag: 'Automation',
    tier: 'licensed',
    prices: { USD: 2900, NGN: 1300000, GBP: 2300 },
    status: 'coming-soon',
    shopReady: false,
  },
  {
    slug: 'seo-audit-extension',
    name: 'SEO Audit Extension',
    subtitle: 'Chrome extension for content teams',
    description: 'On-page SEO audit, schema checks, and internal link opportunities — built for C2C cluster workflows.',
    category: 'tool',
    tag: 'SEO',
    tier: 'licensed',
    prices: { USD: 1900, NGN: 850000, GBP: 1500 },
    status: 'coming-soon',
    shopReady: false,
  },
];

export function skusByCategory(category: IntelligenceCategory): IntelligenceSku[] {
  return INTELLIGENCE_SKUS.filter((s) => s.category === category);
}

export function skuBySlug(slug: string): IntelligenceSku | undefined {
  return INTELLIGENCE_SKUS.find((s) => s.slug === slug);
}

/** Blog slugs for free research teasers */
export const RESEARCH_BLOG_LINKS: Record<string, string> = {
  'smb-automation-roi-2025': 'ai-automation-diagnostic-most-teams-skip',
  'ai-adoption-african-smbs': 'rewiring-the-african-c-suite-the-ai-first-playbook-for-automation-driven-growth',
  'content-systems-that-compound': 'pillar-cluster-authority-architecture',
  'affiliateos-infrastructure-teaser': 'your-followers-are-ready-to-buy-affiliateos-infrastructure',
  'openmarket-coordination-teaser': 'the-death-of-the-e-commerce-clone-why-africas-trillion-dollar-market-demands-coordination-',
};
