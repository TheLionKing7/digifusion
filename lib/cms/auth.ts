/**
 * lib/cms/auth.ts
 *
 * Bearer-token gate for all /api/cms/* routes.
 * PathGuru sends:  Authorization: Bearer <PATHGURU_CMS_TOKEN>
 *
 * Mirror of the inline requireAdmin() in app/api/admin/products/route.ts
 * but using a single shared secret instead of Basic Auth.
 *
 * Returns:
 *   null          — token is valid, proceed
 *   NextResponse  — 401 or 503, short-circuit the handler
 */

import { NextRequest, NextResponse } from 'next/server';

export function requireCmsToken(req: NextRequest): NextResponse | null {
  const secret = process.env.PATHGURU_CMS_TOKEN;

  // 503 if the env var is not configured — same defensive pattern as ADMIN_PASSWORD
  if (!secret) {
    return NextResponse.json(
      { ok: false, code: 'CMS_NOT_CONFIGURED', error: 'CMS token is not set on this server.' },
      { status: 503 }
    );
  }

  const auth = req.headers.get('authorization') ?? '';

  if (!auth.startsWith('Bearer ')) {
    return NextResponse.json(
      { ok: false, code: 'MISSING_TOKEN', error: 'Authorization: Bearer <token> header required.' },
      { status: 401 }
    );
  }

  const provided = auth.slice(7); // strip "Bearer "

  // Constant-time comparison to prevent timing attacks
  if (provided.length !== secret.length || provided !== secret) {
    return NextResponse.json(
      { ok: false, code: 'INVALID_TOKEN', error: 'Invalid CMS token.' },
      { status: 401 }
    );
  }

  return null; // ✅ authorised
}
