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
    label: 'Products',
    href: '/products',
    description: 'Digital tools & SaaS',
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'AI insights & knowledge base',
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
  products: {
    label: 'Products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Software', href: '/products?category=software' },
      { label: 'Extensions', href: '/products?category=extension' },
      { label: 'Templates', href: '/products?category=template' },
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
    ],
  },
};

export const SOCIAL_LINKS = {
  twitter: 'https://x.com/digifusion',
  linkedin: 'https://linkedin.com/company/digifusion',
  github: 'https://github.com/digifusion',
};
