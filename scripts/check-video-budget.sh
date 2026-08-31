#!/usr/bin/env bash
#
# Enforce the in-repo video budget from ADR 0001 D8.
#
# Counts TRACKED video only, via `git ls-files` rather than find(1). `.gitignore`
# excludes `**/video/raw/`, and those masters run to ~18 MB, so a filesystem walk
# would fail on any machine that holds the masters while passing in CI — a gate
# that is strictest where it is least needed. `git ls-files` and the filesystem
# diverge exactly where `.gitignore` does, and that is the divergence we want.
#
# Usage:  bash scripts/check-video-budget.sh   (or: npm run check:video)
# Tunables: MAX_FILE_BYTES, MAX_TOTAL_BYTES.

set -euo pipefail

MAX_FILE_BYTES=${MAX_FILE_BYTES:-$((10 * 1024 * 1024))}
MAX_TOTAL_BYTES=${MAX_TOTAL_BYTES:-$((40 * 1024 * 1024))}

cd "$(dirname "$0")/.."

mib() { awk -v b="$1" 'BEGIN { printf "%.1f MiB", b / 1048576 }'; }

total=0
failed=0
found=0

while IFS= read -r -d '' file; do
  # A tracked file can be absent from the working tree during a sparse or
  # partial checkout; skip rather than abort, since that is not a budget breach.
  [ -f "$file" ] || continue
  size=$(wc -c <"$file")
  total=$((total + size))
  found=$((found + 1))

  if [ "$size" -gt "$MAX_FILE_BYTES" ]; then
    printf '  FAIL  %-10s %s\n' "$(mib "$size")" "$file"
    failed=1
  else
    printf '  ok    %-10s %s\n' "$(mib "$size")" "$file"
  fi
done < <(git ls-files -z -- '*.mp4' '*.webm' '*.mov' '*.m4v' '*.mkv')

if [ "$found" -eq 0 ]; then
  echo "No tracked video files."
  exit 0
fi

echo
echo "  $found file(s), $(mib "$total") total (per-file limit $(mib "$MAX_FILE_BYTES"), budget $(mib "$MAX_TOTAL_BYTES"))"

if [ "$total" -gt "$MAX_TOTAL_BYTES" ]; then
  failed=1
  echo
  echo "Over budget: tracked video totals $(mib "$total"), limit is $(mib "$MAX_TOTAL_BYTES")."
fi

if [ "$failed" -ne 0 ]; then
  cat <<'MSG'

ADR 0001 D8: video stays in the repository only while it is small and stable.
Git history is permanent, so every re-encode of a tracked video costs its full
size forever. Move the offending file to files.westonrobot.com and reference it
by URL, or re-encode it smaller.

Raising the limit is a decision, not a fix — amend ADR 0001 D8 if that is what
is intended, rather than bumping the number here.
MSG
  exit 1
fi
