#!/usr/bin/env node
/**
 * Zip AffiliateOS case study assets for R2 upload (Intelligence Store fulfillment).
 *
 * Place source files in:
 *   content/intelligence/affiliateos/affiliateos-case-study.pdf
 *   content/intelligence/affiliateos/affiliateos-case-study.html
 *
 * Output:
 *   content/intelligence/affiliateos/affiliateos-headless-commerce-case-study.zip
 *
 * Upload to R2 bucket `digifusion-shop` at key:
 *   Digifusion/Intelligence/affiliateos-headless-commerce-case-study.zip
 *
 * Then: node --env-file=.env scripts/seed-intelligence-products.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content', 'intelligence', 'affiliateos');
const pdf = path.join(dir, 'affiliateos-case-study.pdf');
const html = path.join(dir, 'affiliateos-case-study.html');
const zip = path.join(dir, 'affiliateos-headless-commerce-case-study.zip');

for (const f of [pdf, html]) {
  if (!fs.existsSync(f)) {
    console.error(`Missing: ${f}`);
    console.error('Copy affiliateos-case-study.pdf and .html into content/intelligence/affiliateos/');
    process.exit(1);
  }
}

if (fs.existsSync(zip)) fs.unlinkSync(zip);

// Windows: Compress-Archive; Unix: zip
if (process.platform === 'win32') {
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${pdf}','${html}' -DestinationPath '${zip}' -Force"`,
    { stdio: 'inherit' },
  );
} else {
  execSync(`zip -j "${zip}" "${pdf}" "${html}"`, { stdio: 'inherit' });
}

console.log('✓ Created', zip);
console.log('Upload to R2: Digifusion/Intelligence/affiliateos-headless-commerce-case-study.zip');
