/* ── Digital Product Types ────────────────────────────── */

export interface DigitalProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  thumbnailUrl: string;
  galleryImages: string[];
  pricing: {
    amount: number;
    currency: string;
    interval?: 'one-time' | 'monthly' | 'yearly';
  };
  features: string[];
  files: {
    name: string;
    url: string;
    size: number;
  }[];
  docsUrl?: string;
  category: 'software' | 'extension' | 'template' | 'course' | 'tool';
  createdAt: string;
  updatedAt: string;
}

export interface ProductCollection {
  products: DigitalProduct[];
  categories: string[];
}
