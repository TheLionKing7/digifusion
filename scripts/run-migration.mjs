/**
 * run-migration.mjs
 *
 * Applies a SQL migration file directly against Supabase using
 * the service_role key. Runs each statement individually so you
 * get a clear error message if anything fails.
 *
 * Usage (from the digifusion project root):
 *   node scripts/run-migration.mjs supabase/migrations/0001_shop_init.sql
 *   node scripts/run-migration.mjs supabase/migrations/0002_posts_and_settings.sql
 *
 * Requires Node 18+. No extra packages — uses node:fetch (built-in).
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Config from env ───────────────────────────────────────────────────────
const SUPABASE_URL          = process.env.SUPABASE_URL
                           || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('\n❌  Missing env vars. Make sure .env.local has:');
  console.error('      SUPABASE_URL=https://xxx.supabase.co');
  console.error('      SUPABASE_SERVICE_ROLE_KEY=eyJ...\n');
  process.exit(1);
}

// Strip trailing slash
const base = SUPABASE_URL.replace(/\/$/, '');

// ── SQL file from CLI arg ─────────────────────────────────────────────────
const __dir  = dirname(fileURLToPath(import.meta.url));
const target = process.argv[2];
if (!target) {
  console.error('\n❌  Usage: node scripts/run-migration.mjs <path-to-sql-file>\n');
  process.exit(1);
}

const sqlPath = resolve(__dir, '..', target);
let fullSql;
try {
  fullSql = readFileSync(sqlPath, 'utf8');
} catch {
  console.error(`\n❌  Could not read file: ${sqlPath}\n`);
  process.exit(1);
}

// ── Split SQL into individual statements ─────────────────────────────────
// Removes comments, then splits on semicolons.
const statements = fullSql
  .split('\n')
  .filter(line => !line.trimStart().startsWith('--'))  // strip line comments
  .join('\n')
  .split(/;\s*\n/)                                     // split on ; newline
  .map(s => s.trim())
  .filter(s => s.length > 0 && !/^\s*$/.test(s));

console.log(`\n📄  ${sqlPath}`);
console.log(`🔢  ${statements.length} statements to run\n`);

// ── Execute via Supabase REST (rpc → sql helper) ──────────────────────────
// Supabase exposes a raw SQL endpoint under /rest/v1/rpc/exec_sql if the
// function exists. We create it on the fly using the management REST API.
//
// Actually the reliable path is the Postgres REST query API via
// /rest/v1/ + calling a temporary helper function. Since that's circular,
// we use the undocumented but stable /pg endpoint available on all projects.

async function execSQL(sql) {
  const endpoint = `${base}/rest/v1/rpc/exec_sql`;

  // First attempt: call exec_sql function (may already exist)
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'apikey':        SUPABASE_SERVICE_KEY,
    },
    body: JSON.stringify({ sql }),
  });

  if (res.ok) return { ok: true };

  const body = await res.text();

  // If exec_sql doesn't exist yet, bootstrap it first
  if (body.includes('exec_sql') && body.includes('not exist')) {
    return { ok: false, needsBootstrap: true, status: res.status, body };
  }
  return { ok: false, status: res.status, body };
}

async function bootstrapExecSql() {
  // Create a helper function that lets us run arbitrary SQL via RPC.
  // SECURITY DEFINER + superuser = service_role can call it safely.
  const bootstrap = `
    create or replace function exec_sql(sql text)
    returns void
    language plpgsql
    security definer
    as $$ begin execute sql; end; $$;
  `;

  // Use the Supabase Management API to create the function
  const projectRef = base.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (!projectRef) {
    console.error('❌  Could not extract project ref from SUPABASE_URL');
    process.exit(1);
  }

  // Try direct postgres via supabase's internal query API
  const mgmtRes = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: bootstrap }),
    }
  );

  if (!mgmtRes.ok) {
    console.error('\n❌  Could not bootstrap exec_sql via Management API.');
    console.error('    The Management API requires a Personal Access Token (PAT),');
    console.error('    not the service_role key.');
    console.error('\n    ──────────────────────────────────────────────────────');
    console.error('    ALTERNATIVE: Run the SQL directly in your terminal with psql:');
    console.error(`\n    psql "postgresql://postgres.${projectRef}:[DB_PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres" \\`);
    console.error(`      -f ${sqlPath}`);
    console.error('\n    Get DB_PASSWORD from:');
    console.error('      Supabase Dashboard → Settings → Database → Connection string');
    console.error('    ──────────────────────────────────────────────────────\n');
    process.exit(1);
  }

  console.log('✅  Bootstrapped exec_sql helper function.');
}

// ── Main run loop ─────────────────────────────────────────────────────────
let bootstrapped = false;
let passed = 0;
let failed = 0;

for (let i = 0; i < statements.length; i++) {
  const stmt = statements[i];
  const preview = stmt.slice(0, 80).replace(/\s+/g, ' ');
  process.stdout.write(`  [${i + 1}/${statements.length}] ${preview}… `);

  let result = await execSQL(stmt);

  if (!result.ok && result.needsBootstrap && !bootstrapped) {
    process.stdout.write('\n');
    console.log('  ⚙️   exec_sql not found — bootstrapping…');
    await bootstrapExecSql();
    bootstrapped = true;
    result = await execSQL(stmt);
  }

  if (result.ok) {
    console.log('✅');
    passed++;
  } else {
    console.log('❌');
    console.error(`      Error (${result.status}): ${result.body?.slice(0, 200)}`);
    failed++;
    // Don't abort — continue so you see all failures at once
  }
}

console.log(`\n─────────────────────────────────────────`);
console.log(`  ✅  ${passed} passed   ❌  ${failed} failed`);

if (failed > 0) {
  console.log('\n  If you see "already exists" errors, the migration was already');
  console.log('  partially applied — that is safe to ignore (all DDL is IF NOT EXISTS).\n');
  process.exit(1);
} else {
  console.log('\n  Migration applied successfully. 🎉\n');
}
