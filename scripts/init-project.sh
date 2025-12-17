#!/bin/bash

# Qdaria Astro Project Initialization Script
# This script sets up the development environment and verifies all dependencies

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Qdaria Astro Project Initialization                   ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to print status messages
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
check_node() {
    echo "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi

    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi

    print_status "Node.js $(node -v) detected"
}

# Check if npm is installed
check_npm() {
    echo "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    print_status "npm $(npm -v) detected"
}

# Install dependencies
install_dependencies() {
    echo ""
    echo "Installing project dependencies..."
    cd "$PROJECT_ROOT"

    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi

    print_status "Dependencies installed successfully"
}

# Setup environment file
setup_environment() {
    echo ""
    echo "Setting up environment configuration..."

    if [ ! -f "$PROJECT_ROOT/.env" ]; then
        print_warning ".env file not found. Creating from template..."
        cat > "$PROJECT_ROOT/.env" << 'EOF'
# Qdaria Astro Environment Configuration

# Site Configuration
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_SITE_NAME=Qdaria

# API Keys (Add your keys here)
# SENDGRID_API_KEY=your_sendgrid_key
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_supabase_anon_key

# Sentry Configuration
# SENTRY_DSN=your_sentry_dsn
# SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Analytics
# PUBLIC_GA_TRACKING_ID=your_ga_tracking_id

# Feature Flags
NODE_ENV=development
EOF
        print_status "Created .env file. Please update with your API keys."
    else
        print_status "Environment file exists"
    fi
}

# Create necessary directories
create_directories() {
    echo ""
    echo "Creating project directories..."

    mkdir -p "$PROJECT_ROOT/dist"
    mkdir -p "$PROJECT_ROOT/.astro"
    mkdir -p "$PROJECT_ROOT/tests/reports"
    mkdir -p "$PROJECT_ROOT/tests/screenshots"
    mkdir -p "$PROJECT_ROOT/public/temp"

    print_status "Project directories created"
}

# Verify project structure
verify_structure() {
    echo ""
    echo "Verifying project structure..."

    REQUIRED_DIRS=(
        "src"
        "src/components"
        "src/layouts"
        "src/pages"
        "src/styles"
        "public"
        "tests"
    )

    for dir in "${REQUIRED_DIRS[@]}"; do
        if [ ! -d "$PROJECT_ROOT/$dir" ]; then
            print_error "Required directory missing: $dir"
            exit 1
        fi
    done

    print_status "Project structure verified"
}

# Install Playwright browsers
install_playwright() {
    echo ""
    echo "Installing Playwright browsers..."

    if command -v npx &> /dev/null; then
        npx playwright install --with-deps chromium
        print_status "Playwright browsers installed"
    else
        print_warning "Playwright installation skipped (npx not available)"
    fi
}

# Build the project
build_project() {
    echo ""
    echo "Building project..."
    cd "$PROJECT_ROOT"

    npm run build

    print_status "Project built successfully"
}

# Run initialization tests
run_tests() {
    echo ""
    echo "Running initialization tests..."

    # Check if build artifacts exist
    if [ ! -d "$PROJECT_ROOT/dist" ]; then
        print_error "Build directory not found"
        exit 1
    fi

    print_status "Build verification passed"
}

# Print summary
print_summary() {
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║   Initialization Complete!                              ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Update .env file with your API keys"
    echo "  2. Start development server: npm run dev"
    echo "  3. Run tests: npm run test:all"
    echo "  4. Build for production: npm run build"
    echo ""
    echo "Development server will be available at:"
    echo "  → http://localhost:4321"
    echo ""
}

# Main execution
main() {
    check_node
    check_npm
    verify_structure
    install_dependencies
    setup_environment
    create_directories
    install_playwright

    # Optional: Build project (comment out for faster init)
    # build_project
    # run_tests

    print_summary
}

# Run main function
main
