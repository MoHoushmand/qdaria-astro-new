#!/bin/bash

# ========================================
# Performance Testing Script - Phase 2
# ========================================
# Runs Lighthouse CI tests
# Compares before/after metrics
# Validates Phase 2 goals achieved
# ========================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Performance Testing - Phase 2${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Configuration
RESULTS_DIR="/Users/mos/dev/qdaria-astro-new/.performance-results"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
URL="${1:-http://localhost:4321}"

mkdir -p "$RESULTS_DIR"

# Check if Lighthouse is installed
check_lighthouse() {
    if ! command -v lighthouse &> /dev/null; then
        echo -e "${YELLOW}Installing Lighthouse CLI...${NC}"
        npm install -g lighthouse
    fi
    echo -e "${GREEN}✓ Lighthouse CLI ready${NC}\n"
}

# Start local server if testing locally
start_server() {
    if [[ "$URL" == *"localhost"* ]]; then
        echo -e "${YELLOW}Starting local preview server...${NC}"
        cd /Users/mos/dev/qdaria-astro-new

        # Kill existing server
        pkill -f "astro preview" 2>/dev/null || true

        # Start new server in background
        npm run preview > /tmp/astro-preview.log 2>&1 &
        local server_pid=$!

        echo -e "${GREEN}✓ Server started (PID: $server_pid)${NC}"
        echo -e "${YELLOW}Waiting for server to be ready...${NC}"
        sleep 5

        echo $server_pid > /tmp/astro-server.pid
    fi
}

# Run Lighthouse test
run_lighthouse() {
    local page="$1"
    local page_name="$2"
    local output_file="$RESULTS_DIR/${TIMESTAMP}-${page_name}"

    echo -e "\n${BLUE}Testing: ${CYAN}$page${NC}"
    echo -e "${YELLOW}Running Lighthouse audit...${NC}\n"

    lighthouse "$page" \
        --output json \
        --output html \
        --output-path "$output_file" \
        --preset perf \
        --throttling-method=simulate \
        --throttling.cpuSlowdownMultiplier=4 \
        --chrome-flags="--headless --no-sandbox" \
        --quiet

    echo -e "${GREEN}✓ Audit complete${NC}"
    echo -e "${BLUE}Results saved to: ${output_file}.html${NC}\n"
}

# Extract metrics from JSON
extract_metrics() {
    local json_file="$1"

    if [[ ! -f "$json_file" ]]; then
        echo -e "${RED}Error: Results file not found${NC}"
        return
    fi

    # Extract key metrics using jq (or fallback to grep/awk)
    if command -v jq &> /dev/null; then
        local performance=$(jq -r '.categories.performance.score * 100' "$json_file" 2>/dev/null || echo "N/A")
        local fcp=$(jq -r '.audits."first-contentful-paint".numericValue / 1000' "$json_file" 2>/dev/null || echo "N/A")
        local lcp=$(jq -r '.audits."largest-contentful-paint".numericValue / 1000' "$json_file" 2>/dev/null || echo "N/A")
        local tti=$(jq -r '.audits.interactive.numericValue / 1000' "$json_file" 2>/dev/null || echo "N/A")
        local tbt=$(jq -r '.audits."total-blocking-time".numericValue' "$json_file" 2>/dev/null || echo "N/A")
        local cls=$(jq -r '.audits."cumulative-layout-shift".numericValue' "$json_file" 2>/dev/null || echo "N/A")

        echo -e "${CYAN}Performance Metrics:${NC}"
        echo -e "  Performance Score: ${YELLOW}${performance}${NC}/100"
        echo -e "  First Contentful Paint: ${YELLOW}${fcp}s${NC}"
        echo -e "  Largest Contentful Paint: ${YELLOW}${lcp}s${NC}"
        echo -e "  Time to Interactive: ${YELLOW}${tti}s${NC}"
        echo -e "  Total Blocking Time: ${YELLOW}${tbt}ms${NC}"
        echo -e "  Cumulative Layout Shift: ${YELLOW}${cls}${NC}"
    else
        echo -e "${YELLOW}Install 'jq' for detailed metric extraction${NC}"
        echo -e "${BLUE}View full results: ${json_file}${NC}"
    fi
}

# Compare with baseline
compare_with_baseline() {
    local current_json="$1"
    local baseline_json="/Users/mos/dev/qdaria-astro-new/.performance-results/baseline.json"

    if [[ ! -f "$baseline_json" ]]; then
        echo -e "\n${YELLOW}No baseline found. Saving current as baseline...${NC}"
        cp "$current_json" "$baseline_json"
        return
    fi

    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}Comparison with Baseline${NC}"
    echo -e "${BLUE}========================================${NC}\n"

    if command -v jq &> /dev/null; then
        # Performance Score
        local baseline_perf=$(jq -r '.categories.performance.score * 100' "$baseline_json" 2>/dev/null)
        local current_perf=$(jq -r '.categories.performance.score * 100' "$current_json" 2>/dev/null)
        local perf_diff=$(awk "BEGIN {printf \"%.1f\", $current_perf - $baseline_perf}")

        # LCP
        local baseline_lcp=$(jq -r '.audits."largest-contentful-paint".numericValue / 1000' "$baseline_json" 2>/dev/null)
        local current_lcp=$(jq -r '.audits."largest-contentful-paint".numericValue / 1000' "$current_json" 2>/dev/null)
        local lcp_diff=$(awk "BEGIN {printf \"%.2f\", $current_lcp - $baseline_lcp}")

        # FCP
        local baseline_fcp=$(jq -r '.audits."first-contentful-paint".numericValue / 1000' "$baseline_json" 2>/dev/null)
        local current_fcp=$(jq -r '.audits."first-contentful-paint".numericValue / 1000' "$current_json" 2>/dev/null)
        local fcp_diff=$(awk "BEGIN {printf \"%.2f\", $current_fcp - $baseline_fcp}")

        echo -e "${CYAN}Metric Comparison:${NC}"
        echo -e "  Performance: $baseline_perf → $current_perf (${perf_diff:0:1}${perf_diff#-})"
        echo -e "  LCP: ${baseline_lcp}s → ${current_lcp}s (${lcp_diff:0:1}${lcp_diff#-}s)"
        echo -e "  FCP: ${baseline_fcp}s → ${current_fcp}s (${fcp_diff:0:1}${fcp_diff#-}s)"

        # Determine if goals met
        echo -e "\n${BLUE}Phase 2 Goals:${NC}"

        if (( $(echo "$current_lcp < 1.0" | bc -l) )); then
            echo -e "  ${GREEN}✓ LCP < 1.0s (${current_lcp}s)${NC}"
        else
            echo -e "  ${RED}✗ LCP >= 1.0s (${current_lcp}s)${NC}"
        fi

        if (( $(echo "$current_perf >= 90" | bc -l) )); then
            echo -e "  ${GREEN}✓ Performance Score >= 90 (${current_perf})${NC}"
        else
            echo -e "  ${YELLOW}! Performance Score < 90 (${current_perf})${NC}"
        fi
    fi
}

# Generate report
generate_report() {
    local report_file="$RESULTS_DIR/performance-report-${TIMESTAMP}.md"

    cat > "$report_file" << EOF
# Performance Test Report

**Date:** $(date)
**Test URL:** $URL

## Test Results

### Pages Tested
- Home Page
- Pitch Deck

## Key Metrics

See individual HTML reports in:
\`$RESULTS_DIR/\`

## Phase 2 Goals Progress

- [ ] LCP < 1.0s
- [ ] Performance Score >= 90
- [ ] Initial bundle < 45KB
- [ ] All images in next-gen formats

## Next Actions

Based on test results, consider:
1. Further bundle optimization if score < 90
2. Image lazy loading improvements
3. Critical CSS refinement
4. Service worker caching

## Files

EOF

    find "$RESULTS_DIR" -name "${TIMESTAMP}*" | sed 's|^|- |' >> "$report_file"

    echo -e "\n${GREEN}Report saved to: $report_file${NC}"
}

# Stop server
stop_server() {
    if [[ -f /tmp/astro-server.pid ]]; then
        local pid=$(cat /tmp/astro-server.pid)
        echo -e "\n${YELLOW}Stopping server (PID: $pid)...${NC}"
        kill $pid 2>/dev/null || true
        rm /tmp/astro-server.pid
        echo -e "${GREEN}✓ Server stopped${NC}"
    fi
}

# Main execution
main() {
    check_lighthouse
    start_server

    # Test key pages
    run_lighthouse "${URL}/" "home"
    extract_metrics "$RESULTS_DIR/${TIMESTAMP}-home.json"

    run_lighthouse "${URL}/pitch" "pitch"
    extract_metrics "$RESULTS_DIR/${TIMESTAMP}-pitch.json"

    # Compare with baseline
    compare_with_baseline "$RESULTS_DIR/${TIMESTAMP}-home.json"

    generate_report
    stop_server

    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}Performance testing complete! 🎉${NC}"
    echo -e "${GREEN}========================================${NC}\n"

    echo -e "${BLUE}View results:${NC}"
    echo -e "  HTML: $RESULTS_DIR/${TIMESTAMP}-home.html"
    echo -e "  JSON: $RESULTS_DIR/${TIMESTAMP}-home.json\n"
}

# Handle Ctrl+C
trap stop_server EXIT

# Run main function
main
