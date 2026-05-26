/**
 * Edge proxy — Basic Auth gate for everything under /admin.
 *
 * Set ADMIN_USER and ADMIN_PASSWORD env vars. We compare in constant time
 * to avoid timing-attack leaks even though Basic Auth itself is weak.
 *
 * For v2, replace this with proper SSO or a magic-link admin login.
 */

import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'],
};

export function proxy(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedPass) {
    // Deny outright in production if no password set, so /admin can't be reached
    if (process.env.NODE_ENV === 'production') {
      return new NextResponse('Admin disabled (ADMIN_PASSWORD not set)', { status: 503 });
    }
    return NextResponse.next();
  }

  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="DigiFusion Admin", charset="UTF-8"' },
    });
  }

  let decoded: string;
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return new NextResponse('Bad credentials', { status: 400 });
  }
  const colonIdx = decoded.indexOf(':');
  const user = decoded.slice(0, colonIdx);
  const pass = decoded.slice(colonIdx + 1);

  if (!timingSafeEqual(user, expectedUser) || !timingSafeEqual(pass, expectedPass)) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="DigiFusion Admin", charset="UTF-8"' },
    });
  }

  return NextResponse.next();
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
