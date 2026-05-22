# migrate.ps1 — Windows PowerShell migration runner
# Usage (from the digifusion project root):
#   .\scripts\migrate.ps1 supabase\migrations\0001_shop_init.sql
#   .\scripts\migrate.ps1 supabase\migrations\0002_posts_and_settings.sql
#
# This script loads your .env.local automatically, then runs the Node runner.

param(
  [Parameter(Mandatory=$true)]
  [string]$MigrationFile
)

# ── Load .env.local ───────────────────────────────────────────────────────
$envFile = Join-Path $PSScriptRoot ".." ".env.local"
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
      $key   = $Matches[1].Trim()
      $value = $Matches[2].Trim()
      [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
  }
  Write-Host "✅  Loaded .env.local" -ForegroundColor Green
} else {
  Write-Host "⚠️   No .env.local found — make sure env vars are set." -ForegroundColor Yellow
}

# ── Run the Node migration script ─────────────────────────────────────────
$scriptPath = Join-Path $PSScriptRoot "run-migration.mjs"
node $scriptPath $MigrationFile
