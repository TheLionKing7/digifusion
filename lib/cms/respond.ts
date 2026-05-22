/**
 * lib/cms/respond.ts
 *
 * Uniform response shape for all /api/cms/* endpoints.
 *
 * Success:  { ok: true,  data: T }
 * Failure:  { ok: false, code: string, error: string }
 *
 * Usage:
 *   return ok(data);
 *   return ok(data, { status: 201 });
 *   return fail('NOT_FOUND', 'Post not found.', 404);
 */

import { NextResponse } from 'next/server';

export function ok<T>(data: T, init?: ResponseInit): NextResponse {
  return NextResponse.json({ ok: true, data }, init);
}

export function fail(
  code: string,
  error: string,
  status: number = 400
): NextResponse {
  return NextResponse.json({ ok: false, code, error }, { status });
}
