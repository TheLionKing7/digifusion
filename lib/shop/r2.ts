/**
 * Cloudflare R2 helpers for the shop.
 *
 * R2 is S3-compatible, so we use the AWS SDK v3 S3 client pointed at the
 * R2 endpoint. We don't issue presigned URLs to the buyer — instead, our
 * /api/download/[token] route streams bytes from R2 so we can enforce
 * expiry / max-uses / IP logging on every download attempt.
 */

import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import type { Readable } from 'node:stream';

let cached: S3Client | null = null;

function getR2(): S3Client {
  if (cached) return cached;

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKey = process.env.R2_ACCESS_KEY_ID;
  const secretKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKey || !secretKey) {
    throw new Error(
      '[shop] R2 credentials missing — set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY'
    );
  }

  cached = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
  });

  return cached;
}

function bucket(): string {
  const b = process.env.R2_SHOP_BUCKET;
  if (!b) throw new Error('[shop] R2_SHOP_BUCKET not set');
  return b;
}

/**
 * Fetch an object's stream + metadata for download streaming.
 * Returns Node Readable + content length so the route handler can set headers.
 */
export async function getDownloadStream(key: string): Promise<{
  body: Readable;
  contentLength?: number;
  contentType?: string;
}> {
  const r2 = getR2();
  const cmd = new GetObjectCommand({ Bucket: bucket(), Key: key });
  const res = await r2.send(cmd);

  if (!res.Body) {
    throw new Error(`[shop] R2 object body missing for key ${key}`);
  }

  return {
    body: res.Body as Readable,
    contentLength: res.ContentLength,
    contentType: res.ContentType,
  };
}

/** Cheaper check that a key exists before issuing a download token. */
export async function objectExists(key: string): Promise<boolean> {
  try {
    await getR2().send(new HeadObjectCommand({ Bucket: bucket(), Key: key }));
    return true;
  } catch (err: unknown) {
    const e = err as { name?: string; $metadata?: { httpStatusCode?: number } };
    if (e?.$metadata?.httpStatusCode === 404 || e?.name === 'NotFound') return false;
    throw err;
  }
}
