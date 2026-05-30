/**
 * GET /api/intelligence/playbooks
 *
 * Returns the live list of generated agency IP playbooks from the PathGuru
 * R2 agency manifest, merged with a static fallback list so the page always
 * has content even before the first synthesis run.
 *
 * Query params:
 *   access  — 'public' | 'premium' | '' (all)
 *   type    — 'playbook' | 'framework' | 'template' | 'methodology' | '' (all)
 */

import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 60; // ISR: re-fetch from R2 every 60 seconds

interface PlaybookEntry {
  slug:      string;
  title:     string;
  domain:    string;
  type:      string;
  sources:   string[];
  tagline:   string;
  access:    string;
  key?:      string;
  createdAt: string;
  isLive?:   boolean;
}

/** Fallback static entries shown until real IP is generated */
const STATIC_ENTRIES: PlaybookEntry[] = [
  {
    slug:      'agency-operations-playbook',
    title:     'Agency Operations Playbook',
    domain:    'business_development',
    type:      'playbook',
    sources:   [],
    tagline:   'Replace your ops overhead with a 3-automation stack that runs on its own.',
    access:    'premium',
    createdAt: '',
    isLive:    false,
  },
  {
    slug:      'smb-lead-machine',
    title:     'SMB Lead Machine',
    domain:    'automation',
    type:      'playbook',
    sources:   [],
    tagline:   'A full lead nurture system for small teams without a dedicated sales ops hire.',
    access:    'premium',
    createdAt: '',
    isLive:    false,
  },
  {
    slug:      'hospitality-automation-suite',
    title:     'Hospitality Automation Suite',
    domain:    'automation',
    type:      'playbook',
    sources:   [],
    tagline:   'Automate guest intake, bookings, and follow-up without adding headcount.',
    access:    'premium',
    createdAt: '',
    isLive:    false,
  },
];

async function fetchAgencyManifest(): Promise<PlaybookEntry[]> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.R2_ACCOUNT_ID || '';
  const bucket    = process.env.CLOUDFLARE_R2_BUCKET  || process.env.R2_BUCKET_NAME || '';
  const token     = process.env.CLOUDFLARE_R2_TOKEN   || process.env.R2_TOKEN       || '';
  const publicUrl = (process.env.CLOUDFLARE_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL || '').replace(/\/$/, '');

  if (!accountId || !bucket || !token) return [];

  // Matches the user's actual R2 output structure: Digifusion/Playbooks/_manifest.json
  const manifestKey = 'Digifusion/Playbooks/_manifest.json';
  const url = publicUrl
    ? `${publicUrl}/${manifestKey}`
    : `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${manifestKey}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next:    { revalidate: 60 },
    });
    if (res.status === 404) return [];
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.map((e: PlaybookEntry) => ({ ...e, isLive: true })) : [];
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const filterAccess = searchParams.get('access') || '';
  const filterType   = searchParams.get('type')   || '';

  const live = await fetchAgencyManifest();

  // Merge: live entries replace static ones with matching slug
  const liveSlugSet = new Set(live.map(e => e.slug));
  const statics     = STATIC_ENTRIES.filter(e => !liveSlugSet.has(e.slug));
  let   all         = [...live, ...statics];

  if (filterAccess) all = all.filter(e => e.access === filterAccess);
  if (filterType)   all = all.filter(e => e.type   === filterType);

  return NextResponse.json({ playbooks: all, total: all.length, liveCount: live.length });
}
