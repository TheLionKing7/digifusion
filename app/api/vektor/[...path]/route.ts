/**
 * Vektor API Proxy
 *
 * Proxies all /api/vektor/* requests to the Render backend.
 * This eliminates CORS issues — the browser talks to DigiFusion,
 * DigiFusion talks server-to-server to Render.
 *
 * Routes:
 *   POST /api/vektor/auth/register   → POST https://vektor-xr-1.onrender.com/auth/register
 *   POST /api/vektor/auth/login      → POST https://vektor-xr-1.onrender.com/auth/login
 *   POST /api/vektor/billing/checkout→ POST https://vektor-xr-1.onrender.com/billing/checkout
 *   GET  /api/vektor/billing/verify  → GET  https://vektor-xr-1.onrender.com/billing/verify
 */

import { NextRequest, NextResponse } from 'next/server';

const VEKTOR_BACKEND = 'https://vektor-xr-1.onrender.com';

async function proxyRequest(req: NextRequest, params: { path: string[] }) {
  const segments = params.path;               // e.g. ["auth","register"]
  const backendPath = '/' + segments.join('/');
  const backendUrl  = new URL(backendPath, VEKTOR_BACKEND);

  // Forward query params (needed for /billing/verify?ref=...)
  req.nextUrl.searchParams.forEach((value, key) => {
    backendUrl.searchParams.set(key, value);
  });

  // Forward body
  let body: BodyInit | undefined;
  const contentType = req.headers.get('content-type') || '';
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && contentType.includes('application/json')) {
    body = await req.text();
  }

  const backendRes = await fetch(backendUrl.toString(), {
    method:  req.method,
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(req, params);
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(req, params);
}
