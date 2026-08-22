#!/usr/bin/env bash
# ================================================================
# AELINDRA   Twine/SugarCube build script
#
# Compiles every .tw/.css/.js file under src/ into a single
# index.html at the project root, using tweego. Assets stay in
# assets/ (outside src/) so they are never scanned/embedded by
# tweego   index.html just references them by relative path
# ("assets/images/...") at runtime, keeping the compiled HTML
# small.
#
# Usage:
#   ./build.sh            one-off build
#   ./build.sh watch       rebuild automatically on file change
# ================================================================
set -euo pipefail

cd "$(dirname "$0")"

OUT="index.html"
START="title-screen"
FORMAT="sugarcube-2"
HEAD="build-head.html"

if [ "${1:-}" = "watch" ]; then
  echo "Watching src/ for changes... (Ctrl+C to stop)"
  tweego -w -o "$OUT" -f "$FORMAT" -s "$START" --head="$HEAD" src/
else
  tweego -o "$OUT" -f "$FORMAT" -s "$START" --head="$HEAD" src/
  echo "Built $OUT"
fi
