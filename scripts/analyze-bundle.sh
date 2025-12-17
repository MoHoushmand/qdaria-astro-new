#!/bin/bash

# ========================================
# Bundle Analysis Script - Phase 2
# ========================================
# Analyzes JavaScript bundle sizes
# Identifies optimization opportunities
# Generates detailed report
# ========================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Bundle Analysis - Phase 2${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Configuration
DIST_DIR="/Users/mos/dev/qdaria-astro-new/dist"
ASTRO_DIR="${DIST_DIR}/_astro"
REPORT_FILE="/Users/mos/dev/qdaria-astro-new/docs/bundle-analysis-report.md"

# Check if build exists
if [[ ! -d "$DIST_DIR" ]]; then
    echo -e "${RED}Error: Build directory not found. Run 'npm run build' first.${NC}"
    exit 1
fi

# Initialize report
init_report() {
    cat > "$REPORT_FILE" << 'EOF'
# Bundle Analysis Report

**Generated:** $(date)
**Build Directory:** dist/

---

## Summary

EOF
}

# Analyze JavaScript bundles
analyze_javascript() {
    echo -e "${BLUE}Analyzing JavaScript bundles...${NC}\n"

    local total_js_size=0
    local total_js_gzipped=0

    echo "### JavaScript Bundles" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "| File | Size | Gzipped | Ratio |" >> "$REPORT_FILE"
    echo "|------|------|---------|-------|" >> "$REPORT_FILE"

    # Find all JS files and sort by size
    while IFS= read -r file; do
        if [[ -f "$file" ]]; then
            local filename=$(basename "$file")
            local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            local size_kb=$((size / 1024))

            # Gzip for comparison
            local gzipped_size=$(gzip -c "$file" | wc -c | tr -d ' ')
            local gzipped_kb=$((gzipped_size / 1024))
            local ratio=$(awk "BEGIN {printf \"%.1f\", ($gzipped_size / $size) * 100}")

            total_js_size=$((total_js_size + size))
            total_js_gzipped=$((total_js_gzipped + gzipped_size))

            # Determine priority
            local priority=""
            if [[ $size_kb -gt 200 ]]; then
                priority=" ⚠️ CRITICAL"
                echo -e "${RED}✗ $filename: ${size_kb}KB (${gzipped_kb}KB gzipped)${NC}"
            elif [[ $size_kb -gt 100 ]]; then
                priority=" ⚠️ HIGH"
                echo -e "${YELLOW}! $filename: ${size_kb}KB (${gzipped_kb}KB gzipped)${NC}"
            else
                echo -e "${GREEN}✓ $filename: ${size_kb}KB (${gzipped_kb}KB gzipped)${NC}"
            fi

            echo "| $filename | ${size_kb}KB | ${gzipped_kb}KB | ${ratio}%${priority} |" >> "$REPORT_FILE"
        fi
    done < <(find "$ASTRO_DIR" -name "*.js" -type f | sort -h)

    local total_kb=$((total_js_size / 1024))
    local total_gzipped_kb=$((total_js_gzipped / 1024))

    echo "" >> "$REPORT_FILE"
    echo "**Total JavaScript:** ${total_kb}KB (${total_gzipped_kb}KB gzipped)" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    echo -e "\n${BLUE}Total JavaScript: ${YELLOW}${total_kb}KB${NC} (${total_gzipped_kb}KB gzipped)\n"
}

# Analyze CSS bundles
analyze_css() {
    echo -e "${BLUE}Analyzing CSS bundles...${NC}\n"

    local total_css_size=0

    echo "### CSS Bundles" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "| File | Size | Gzipped |" >> "$REPORT_FILE"
    echo "|------|------|---------|" >> "$REPORT_FILE"

    while IFS= read -r file; do
        if [[ -f "$file" ]]; then
            local filename=$(basename "$file")
            local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            local size_kb=$((size / 1024))

            local gzipped_size=$(gzip -c "$file" | wc -c | tr -d ' ')
            local gzipped_kb=$((gzipped_size / 1024))

            total_css_size=$((total_css_size + size))

            echo -e "${GREEN}✓ $filename: ${size_kb}KB (${gzipped_kb}KB gzipped)${NC}"
            echo "| $filename | ${size_kb}KB | ${gzipped_kb}KB |" >> "$REPORT_FILE"
        fi
    done < <(find "$ASTRO_DIR" -name "*.css" -type f | sort -h)

    local total_kb=$((total_css_size / 1024))

    echo "" >> "$REPORT_FILE"
    echo "**Total CSS:** ${total_kb}KB" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    echo -e "\n${BLUE}Total CSS: ${YELLOW}${total_kb}KB${NC}\n"
}

# Analyze images
analyze_images() {
    echo -e "${BLUE}Analyzing images...${NC}\n"

    local images_dir="/Users/mos/dev/qdaria-astro-new/public/images"

    echo "### Images" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    local jpg_count=$(find "$images_dir" -name "*.jpg" -o -name "*.jpeg" | wc -l | tr -d ' ')
    local png_count=$(find "$images_dir" -name "*.png" | wc -l | tr -d ' ')
    local webp_count=$(find "$images_dir" -name "*.webp" | wc -l | tr -d ' ')
    local avif_count=$(find "$images_dir" -name "*.avif" | wc -l | tr -d ' ')

    local total_size=$(du -sh "$images_dir" | cut -f1)

    echo "| Format | Count |" >> "$REPORT_FILE"
    echo "|--------|-------|" >> "$REPORT_FILE"
    echo "| JPG/JPEG | $jpg_count |" >> "$REPORT_FILE"
    echo "| PNG | $png_count |" >> "$REPORT_FILE"
    echo "| WebP | $webp_count |" >> "$REPORT_FILE"
    echo "| AVIF | $avif_count |" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Total Size:** $total_size" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    echo -e "${BLUE}Image Formats:${NC}"
    echo -e "  JPG/JPEG: ${YELLOW}${jpg_count}${NC}"
    echo -e "  PNG: ${YELLOW}${png_count}${NC}"
    echo -e "  WebP: ${GREEN}${webp_count}${NC}"
    echo -e "  AVIF: ${GREEN}${avif_count}${NC}"
    echo -e "  Total Size: ${YELLOW}${total_size}${NC}\n"
}

# Identify optimization opportunities
identify_opportunities() {
    echo -e "${BLUE}Identifying optimization opportunities...${NC}\n"

    echo "## Optimization Opportunities" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    # Check for large bundles
    local large_bundles=$(find "$ASTRO_DIR" -name "*.js" -type f -size +200k | wc -l | tr -d ' ')
    if [[ $large_bundles -gt 0 ]]; then
        echo "### 🚨 Large Bundles Detected" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        echo "Found $large_bundles JavaScript bundles over 200KB:" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"

        find "$ASTRO_DIR" -name "*.js" -type f -size +200k | while read file; do
            local filename=$(basename "$file")
            local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            local size_kb=$((size / 1024))

            echo "- **$filename** (${size_kb}KB)" >> "$REPORT_FILE"
            echo -e "${RED}  ⚠️  $filename: ${size_kb}KB - Consider code splitting${NC}"

            # Suggest optimizations based on filename
            if [[ $filename == *"recharts"* ]]; then
                echo "  - Suggestion: Use specific Recharts imports instead of whole library" >> "$REPORT_FILE"
            elif [[ $filename == *"vendor"* ]]; then
                echo "  - Suggestion: Split vendor bundle into smaller chunks" >> "$REPORT_FILE"
            fi
        done

        echo "" >> "$REPORT_FILE"
    fi

    # Check for unoptimized images
    local unoptimized=$(find "/Users/mos/dev/qdaria-astro-new/public/images" -type f -size +1000k \( -name "*.jpg" -o -name "*.png" \) | wc -l | tr -d ' ')
    if [[ $unoptimized -gt 0 ]]; then
        echo "### 📸 Unoptimized Images" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        echo "Found $unoptimized images over 1MB that should be converted:" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"

        find "/Users/mos/dev/qdaria-astro-new/public/images" -type f -size +1000k \( -name "*.jpg" -o -name "*.png" \) | while read file; do
            local filename=$(basename "$file")
            local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            local size_mb=$(awk "BEGIN {printf \"%.1f\", $size / 1024 / 1024}")

            echo "- **$filename** (${size_mb}MB)" >> "$REPORT_FILE"
            echo -e "${YELLOW}  ! $filename: ${size_mb}MB - Convert to AVIF/WebP${NC}"
        done

        echo "" >> "$REPORT_FILE"
    fi

    # Recommendations
    echo "### Recommended Actions" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "1. **Tree-shake large bundles:**" >> "$REPORT_FILE"
    echo "   - Recharts: Use specific component imports" >> "$REPORT_FILE"
    echo "   - Lucide: Remove unused icon imports" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "2. **Image optimization:**" >> "$REPORT_FILE"
    echo "   - Run \`./scripts/optimize-images.sh\`" >> "$REPORT_FILE"
    echo "   - Convert all JPG/PNG to AVIF + WebP" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "3. **Code splitting:**" >> "$REPORT_FILE"
    echo "   - Implement React.lazy() for slide components" >> "$REPORT_FILE"
    echo "   - Add route-based code splitting" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "4. **Caching:**" >> "$REPORT_FILE"
    echo "   - Implement service worker" >> "$REPORT_FILE"
    echo "   - Add aggressive cache headers" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
}

# Generate performance score
calculate_score() {
    echo -e "${BLUE}Calculating performance score...${NC}\n"

    local total_js_kb=$(find "$ASTRO_DIR" -name "*.js" -type f -exec stat -f%z {} \; 2>/dev/null | awk '{s+=$1} END {print s/1024}')
    local score=100

    # Deduct points for large bundles
    if [[ $(echo "$total_js_kb > 1000" | bc) -eq 1 ]]; then
        score=$((score - 20))
    elif [[ $(echo "$total_js_kb > 500" | bc) -eq 1 ]]; then
        score=$((score - 10))
    fi

    # Check image optimization
    local unoptimized=$(find "/Users/mos/dev/qdaria-astro-new/public/images" -type f \( -name "*.jpg" -o -name "*.png" \) ! -path "*/team-optimized/*" ! -path "*/media-optimized/*" | wc -l | tr -d ' ')
    if [[ $unoptimized -gt 50 ]]; then
        score=$((score - 15))
    elif [[ $unoptimized -gt 20 ]]; then
        score=$((score - 10))
    fi

    echo "## Performance Score" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Score:** ${score}/100" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    if [[ $score -ge 90 ]]; then
        echo -e "${GREEN}Performance Score: ${score}/100 ✓ Excellent${NC}\n"
    elif [[ $score -ge 70 ]]; then
        echo -e "${YELLOW}Performance Score: ${score}/100 - Good, but can be improved${NC}\n"
    else
        echo -e "${RED}Performance Score: ${score}/100 ⚠️  Needs optimization${NC}\n"
    fi
}

# Main execution
main() {
    init_report
    analyze_javascript
    analyze_css
    analyze_images
    identify_opportunities
    calculate_score

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Analysis complete!${NC}"
    echo -e "${GREEN}========================================${NC}\n"
    echo -e "${BLUE}Report saved to: ${NC}$REPORT_FILE\n"
    echo -e "${YELLOW}Next steps:${NC}"
    echo -e "  1. Review optimization opportunities"
    echo -e "  2. Run ./scripts/optimize-images.sh"
    echo -e "  3. Implement code splitting"
    echo -e "  4. Re-run analysis to measure improvements\n"
}

# Run main function
main
