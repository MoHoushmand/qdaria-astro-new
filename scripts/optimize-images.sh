#!/bin/bash

# ========================================
# Image Optimization Script - Phase 2
# ========================================
# Converts all JPG/PNG images to AVIF + WebP
# Generates responsive sizes (1x, 2x)
# Expected savings: 40MB (75% reduction)
# ========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Image Optimization Script - Phase 2${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Configuration
IMAGE_DIR="/Users/mos/dev/qdaria-astro-new/public/images"
QUALITY_AVIF=75
QUALITY_WEBP=80
QUALITY_JPG=85

# Check if required tools are installed
check_dependencies() {
    echo -e "${YELLOW}Checking dependencies...${NC}"

    if ! command -v sharp &> /dev/null; then
        echo -e "${RED}✗ sharp-cli not found. Installing...${NC}"
        npm install -g sharp-cli
    else
        echo -e "${GREEN}✓ sharp-cli found${NC}"
    fi

    echo ""
}

# Count files to process
count_files() {
    JPG_COUNT=$(find "$IMAGE_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" \) ! -path "*/team-optimized/*" ! -path "*/media-optimized/*" | wc -l | tr -d ' ')
    PNG_COUNT=$(find "$IMAGE_DIR" -type f -name "*.png" ! -path "*/team-optimized/*" ! -path "*/media-optimized/*" | wc -l | tr -d ' ')
    TOTAL_COUNT=$((JPG_COUNT + PNG_COUNT))

    echo -e "${BLUE}Files to process:${NC}"
    echo -e "  JPG/JPEG: ${YELLOW}${JPG_COUNT}${NC}"
    echo -e "  PNG: ${YELLOW}${PNG_COUNT}${NC}"
    echo -e "  Total: ${YELLOW}${TOTAL_COUNT}${NC}\n"
}

# Calculate initial size
calculate_initial_size() {
    INITIAL_SIZE=$(du -sh "$IMAGE_DIR" | cut -f1)
    echo -e "${BLUE}Initial size: ${YELLOW}${INITIAL_SIZE}${NC}\n"
}

# Convert single image to AVIF and WebP
convert_image() {
    local input_file="$1"
    local output_dir=$(dirname "$input_file")
    local filename=$(basename "$input_file")
    local name="${filename%.*}"
    local ext="${filename##*.}"

    # Skip if already in optimized directory
    if [[ "$input_file" == *"team-optimized"* ]] || [[ "$input_file" == *"media-optimized"* ]]; then
        return
    fi

    echo -e "${BLUE}Processing: ${NC}$filename"

    # Get image dimensions
    local width=$(identify -format "%w" "$input_file" 2>/dev/null || echo "1920")
    local height=$(identify -format "%h" "$input_file" 2>/dev/null || echo "1080")

    # Generate 1x size (original)
    echo -e "  ${YELLOW}→ Creating AVIF (1x)...${NC}"
    sharp -i "$input_file" -o "${output_dir}/${name}.avif" \
        --avif "{\"quality\": ${QUALITY_AVIF}, \"effort\": 4}" 2>/dev/null || echo "  ${RED}✗ AVIF conversion failed${NC}"

    echo -e "  ${YELLOW}→ Creating WebP (1x)...${NC}"
    sharp -i "$input_file" -o "${output_dir}/${name}.webp" \
        --webp "{\"quality\": ${QUALITY_WEBP}}" 2>/dev/null || echo "  ${RED}✗ WebP conversion failed${NC}"

    # Generate 2x size for Retina displays (if image is large enough)
    if [[ $width -gt 800 ]]; then
        local width_2x=$((width * 2))
        local height_2x=$((height * 2))

        echo -e "  ${YELLOW}→ Creating AVIF (2x)...${NC}"
        sharp -i "$input_file" -o "${output_dir}/${name}@2x.avif" \
            --resize "{\"width\": ${width_2x}, \"height\": ${height_2x}}" \
            --avif "{\"quality\": ${QUALITY_AVIF}, \"effort\": 4}" 2>/dev/null || true

        echo -e "  ${YELLOW}→ Creating WebP (2x)...${NC}"
        sharp -i "$input_file" -o "${output_dir}/${name}@2x.webp" \
            --resize "{\"width\": ${width_2x}, \"height\": ${height_2x}}" \
            --webp "{\"quality\": ${QUALITY_WEBP}}" 2>/dev/null || true
    fi

    echo -e "  ${GREEN}✓ Conversion complete${NC}\n"
}

# Convert all team images
convert_team_images() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}Converting Team Images${NC}"
    echo -e "${BLUE}========================================${NC}\n"

    local team_dir="$IMAGE_DIR/team"
    local optimized_dir="$IMAGE_DIR/team-optimized"

    mkdir -p "$optimized_dir"

    find "$team_dir" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read file; do
        convert_image "$file"

        # Copy optimized versions to team-optimized directory
        local filename=$(basename "$file")
        local name="${filename%.*}"

        if [[ -f "${team_dir}/${name}.avif" ]]; then
            cp "${team_dir}/${name}.avif" "$optimized_dir/"
        fi
        if [[ -f "${team_dir}/${name}.webp" ]]; then
            cp "${team_dir}/${name}.webp" "$optimized_dir/"
        fi
        if [[ -f "${team_dir}/${name}@2x.avif" ]]; then
            cp "${team_dir}/${name}@2x.avif" "$optimized_dir/"
        fi
        if [[ -f "${team_dir}/${name}@2x.webp" ]]; then
            cp "${team_dir}/${name}@2x.webp" "$optimized_dir/"
        fi
    done
}

# Convert all media images
convert_media_images() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}Converting Media Images${NC}"
    echo -e "${BLUE}========================================${NC}\n"

    local media_dir="$IMAGE_DIR/media"
    local optimized_dir="$IMAGE_DIR/media-optimized"

    mkdir -p "$optimized_dir"

    find "$media_dir" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) ! -path "*/ecomoyo/*" ! -path "*/artforchange/*" | while read file; do
        convert_image "$file"

        # Copy optimized versions to media-optimized directory
        local filename=$(basename "$file")
        local name="${filename%.*}"

        if [[ -f "${media_dir}/${name}.avif" ]]; then
            cp "${media_dir}/${name}.avif" "$optimized_dir/"
        fi
        if [[ -f "${media_dir}/${name}.webp" ]]; then
            cp "${media_dir}/${name}.webp" "$optimized_dir/"
        fi
        if [[ -f "${media_dir}/${name}@2x.avif" ]]; then
            cp "${media_dir}/${name}@2x.avif" "$optimized_dir/"
        fi
        if [[ -f "${media_dir}/${name}@2x.webp" ]]; then
            cp "${media_dir}/${name}@2x.webp" "$optimized_dir/"
        fi
    done
}

# Convert blog images
convert_blog_images() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}Converting Blog Images${NC}"
    echo -e "${BLUE}========================================${NC}\n"

    local blog_dir="$IMAGE_DIR/blog"

    if [[ -d "$blog_dir" ]]; then
        find "$blog_dir" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read file; do
            convert_image "$file"
        done
    fi
}

# Generate size comparison report
generate_report() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}Optimization Report${NC}"
    echo -e "${BLUE}========================================${NC}\n"

    local final_size=$(du -sh "$IMAGE_DIR" | cut -f1)

    echo -e "${GREEN}Initial size:${NC} $INITIAL_SIZE"
    echo -e "${GREEN}Final size:${NC} $final_size"

    # Count new formats
    local avif_count=$(find "$IMAGE_DIR" -name "*.avif" | wc -l | tr -d ' ')
    local webp_count=$(find "$IMAGE_DIR" -name "*.webp" | wc -l | tr -d ' ')

    echo -e "\n${GREEN}Generated files:${NC}"
    echo -e "  AVIF: ${YELLOW}${avif_count}${NC}"
    echo -e "  WebP: ${YELLOW}${webp_count}${NC}"

    echo -e "\n${GREEN}✓ Image optimization complete!${NC}"
    echo -e "\n${YELLOW}Next steps:${NC}"
    echo -e "  1. Update image references in components to use <picture> tags"
    echo -e "  2. Add responsive srcset with @2x versions"
    echo -e "  3. Implement lazy loading with loading='lazy'"
    echo -e "  4. Test across different browsers and devices"
}

# Cleanup old images (optional)
cleanup_old_images() {
    echo -e "\n${YELLOW}Would you like to remove original JPG/PNG files? (y/N)${NC}"
    read -r response

    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Removing original files...${NC}"

        # Backup first
        local backup_dir="$IMAGE_DIR/originals-backup-$(date +%Y%m%d)"
        mkdir -p "$backup_dir"

        find "$IMAGE_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) \
            ! -path "*/originals-backup-*" \
            ! -path "*/team-optimized/*" \
            ! -path "*/media-optimized/*" \
            -exec cp {} "$backup_dir/" \; \
            -exec rm {} \;

        echo -e "${GREEN}✓ Original files backed up to: $backup_dir${NC}"
        echo -e "${GREEN}✓ Original files removed${NC}"
    else
        echo -e "${YELLOW}Original files kept. You can manually remove them later.${NC}"
    fi
}

# Main execution
main() {
    check_dependencies
    count_files
    calculate_initial_size

    echo -e "${YELLOW}Starting image optimization...${NC}\n"

    convert_team_images
    convert_media_images
    convert_blog_images

    generate_report
    cleanup_old_images

    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}All done! 🎉${NC}"
    echo -e "${GREEN}========================================${NC}\n"
}

# Run main function
main
