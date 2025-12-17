#!/bin/bash

# Performance Audit Script
# Runs Lighthouse and tracks metrics

set -e

echo "🚀 Running performance audit..."

# Build the site first
echo "Building site..."
npm run build

# Start preview server in background
echo "Starting preview server..."
npm run preview &
SERVER_PID=$!

# Wait for server to be ready
sleep 5

# Check if lighthouse is installed
if ! command -v lighthouse &> /dev/null; then
    echo "Installing lighthouse..."
    npm install -g lighthouse
fi

# Run Lighthouse audit
echo "Running Lighthouse audit on /pitch route..."
lighthouse http://localhost:4321/pitch \
  --output=json \
  --output=html \
  --output-path=/Users/mos/dev/qdaria-astro-new/lighthouse-report \
  --preset=desktop \
  --chrome-flags="--headless --disable-gpu --no-sandbox" \
  --only-categories=performance

# Kill preview server
kill $SERVER_PID

# Parse results
if [ -f "/Users/mos/dev/qdaria-astro-new/lighthouse-report.report.json" ]; then
    SCORE=$(cat /Users/mos/dev/qdaria-astro-new/lighthouse-report.report.json | grep -o '"performance":[0-9.]*' | cut -d: -f2)
    LCP=$(cat /Users/mos/dev/qdaria-astro-new/lighthouse-report.report.json | grep -o '"largest-contentful-paint":{[^}]*}' | grep -o '"numericValue":[0-9.]*' | cut -d: -f2)

    echo ""
    echo "📊 Performance Results:"
    echo "   Lighthouse Score: $(echo "$SCORE * 100" | bc | cut -d. -f1)"
    echo "   LCP: $(echo "$LCP / 1000" | bc)s"
    echo ""
    echo "📄 Full report: lighthouse-report.report.html"
fi

echo "✅ Audit complete!"
