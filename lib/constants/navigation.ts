/* ── Navigation Configuration ─────────────────────────── */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Agency',
    href: '/agency',
    description: 'Enterprise AI consultancy services',
    children: [
      { label: 'Services', href: '/agency/services' },
      { label: 'Case Studies', href: '/agency/case-studies' },
      { label: 'Book a Strategy Session', href: '/agency/booking' },
    ],
  },
  {
    label: 'Intelligence',
    href: '/intelligence',
    description: 'Premium knowledge, tools & resources',
    children: [
      { label: 'Field Guides', href: '/intelligence/field-guides', description: 'Premium books on advertising & business' },
      { label: 'Automation Playbooks', href: '/intelligence/playbooks', description: 'Workflows, prompt libraries & templates' },
      { label: 'Research & Case Studies', href: '/intelligence/research', description: 'In-depth analysis and real-world findings' },
      { label: 'Tools & Extensions', href: '/intelligence/tools', description: 'Lightweight utilities to sharpen your edge' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    description: 'AI-powered SaaS built for modern businesses',
    children: [
      { label: 'SabiWork', href: '/products/sabiwork', description: 'AI cost-estimator for artisans & contractors' },
      { label: 'Receptra', href: '/products/receptra', description: 'AI-powered receptionist for hospitality & law' },
      { label: 'AdPilot', href: '/products/adpilot', description: 'AI marketing assistant inside WhatsApp' },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'AI insights & knowledge base',
  },
  {
    label: 'About',
    href: '/about',
    description: 'Our story, team and mission',
  },
];

export const FOOTER_LINKS = {
  agency: {
    label: 'Agency',
    links: [
      { label: 'Services', href: '/agency/services' },
      { label: 'Methodology', href: '/agency/methodology' },
      { label: 'Case Studies', href: '/agency/case-studies' },
      { label: 'Book a Call', href: '/agency/booking' },
    ],
  },
  intelligence: {
    label: 'Intelligence',
    links: [
      { label: 'Field Guides', href: '/intelligence/field-guides' },
      { label: 'Automation Playbooks', href: '/intelligence/playbooks' },
      { label: 'Research & Case Studies', href: '/intelligence/research' },
      { label: 'Tools & Extensions', href: '/intelligence/tools' },
    ],
  },
  products: {
    label: 'Products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'SabiWork', href: '/products/sabiwork' },
      { label: 'Receptra', href: '/products/receptra' },
      { label: 'AdPilot', href: '/products/adpilot' },
    ],
  },
  blog: {
    label: 'Knowledge Base',
    links: [
      { label: 'Latest Posts', href: '/blog' },
      { label: 'Guides', href: '/blog?type=guide' },
      { label: 'Case Studies', href: '/blog?type=case-study' },
      { label: 'Tutorials', href: '/blog?type=how-to' },
    ],
  },
  company: {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'enquiries@digitafusion.com', href: 'mailto:enquiries@digitafusion.com' },
    ],
  },
};

export const SOCIAL_LINKS = {
  facebook: 'https://web.facebook.com/profile.php?id=61589805234698',
  twitter: 'https://x.com/digifusion_hq',
  quora: 'https://www.quora.com/profile/DigiFusion-Inc',
  email: 'enquiries@digitafusion.com',
};
