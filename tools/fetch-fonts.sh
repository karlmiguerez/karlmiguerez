#!/bin/sh
#
# fetch-fonts — download the four webfont files this site uses into assets/fonts/.
#
# Why: the fonts are currently fetched from Google at runtime, which costs two
# extra connections (fonts.googleapis.com for the CSS, then fonts.gstatic.com for
# the files) before the hero headline — the LCP element — can paint in its real
# typeface. Serving them from our own origin removes both hops.
#
# Syne and DM Sans are VARIABLE fonts: one file each covers their whole weight
# range (Syne 400–800, DM Sans 300–500). DM Mono is static, so it needs two.
#
# All three families are SIL Open Font License 1.1 — self-hosting is permitted.
# OFL requires the licence travel with the fonts, so it is saved alongside them.
#
# Run once from the repo root:   sh tools/fetch-fonts.sh
# Re-run only if Google revs the font version (the /v16/, /v17/, /v24/ in the URLs).

set -e
cd "$(dirname "$0")/.."
mkdir -p assets/fonts

# A modern User-Agent is required — Google serves .ttf to unknown clients.
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

get() {
  printf '  %-22s' "$2"
  curl -sfL -A "$UA" "$1" -o "assets/fonts/$2"
  printf 'OK  (%s)\n' "$(du -h "assets/fonts/$2" | cut -f1 | tr -d ' ')"
}

echo "Downloading webfonts into assets/fonts/ ..."
get 'https://fonts.gstatic.com/s/syne/v24/8vIH7w4qzmVxm2BL9G78HEY.woff2'        'syne-variable.woff2'
get 'https://fonts.gstatic.com/s/dmsans/v17/rP2Hp2ywxg089UriCZOIHTWEBlw.woff2'  'dmsans-variable.woff2'
get 'https://fonts.gstatic.com/s/dmmono/v16/aFTR7PB1QTsUX8KYvrGyEYOtbYf-Vlg.woff2' 'dmmono-300.woff2'
get 'https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthqQBK6PYK0.woff2'  'dmmono-400.woff2'

cat > assets/fonts/OFL.txt <<'EOF'
Syne, DM Sans and DM Mono are licensed under the SIL Open Font License 1.1.

  Syne    — https://fonts.google.com/specimen/Syne/license
  DM Sans — https://fonts.google.com/specimen/DM+Sans/license
  DM Mono — https://fonts.google.com/specimen/DM+Mono/license

Full licence text: https://openfontlicense.org/

These files are redistributed unmodified. The OFL permits bundling and
self-hosting; it requires this notice travel with the font files.
EOF

echo
echo "Done. 4 files + OFL.txt in assets/fonts/"
echo "The @font-face rules in style.css already point at them."
