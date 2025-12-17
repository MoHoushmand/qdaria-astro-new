#!/bin/bash

# Typography Validation Runner
# Runs both manual Chrome DevTools validation and automated tests

set -e

echo "🔍 Typography Validation Suite"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create validation reports directory
mkdir -p validation-reports

echo -e "${BLUE}📋 Step 1: Manual Chrome DevTools Validation${NC}"
echo "Please open Chrome DevTools and run the validation script:"
echo ""
echo -e "${YELLOW}1. Start the dev server: npm run dev${NC}"
echo -e "${YELLOW}2. Navigate to: http://localhost:4321/invest/business-plan${NC}"
echo -e "${YELLOW}3. Open Chrome DevTools (F12)${NC}"
echo -e "${YELLOW}4. Run: node scripts/chrome-devtools-typography-validation.js${NC}"
echo ""
read -p "Press Enter when you have completed the manual validation..."

echo ""
echo -e "${BLUE}📋 Step 2: Running Automated Tests${NC}"
echo ""

# Check if Playwright is installed
if ! command -v playwright &> /dev/null; then
    echo -e "${YELLOW}Installing Playwright...${NC}"
    npm install -D @playwright/test
    npx playwright install
fi

# Run Playwright tests
echo -e "${GREEN}Running Playwright typography tests...${NC}"
npx playwright test tests/chrome-devtools/typography-validation.spec.ts --reporter=html

# Check test results
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All automated tests passed!${NC}"
else
    echo ""
    echo -e "${RED}❌ Some tests failed. Check the report for details.${NC}"
fi

echo ""
echo -e "${BLUE}📊 Step 3: Generating Summary Report${NC}"

# Find the latest validation report
LATEST_REPORT=$(ls -t validation-reports/typography-validation-*.json 2>/dev/null | head -1)

if [ -n "$LATEST_REPORT" ]; then
    echo -e "${GREEN}Latest validation report: $LATEST_REPORT${NC}"

    # Display summary
    SCORE=$(cat "$LATEST_REPORT" | grep -o '"score": "[^"]*"' | cut -d'"' -f4)
    TOTAL=$(cat "$LATEST_REPORT" | grep -o '"total": [0-9]*' | cut -d':' -f2 | tr -d ' ')
    PASSED=$(cat "$LATEST_REPORT" | grep -o '"passed": [0-9]*' | cut -d':' -f2 | tr -d ' ')
    FAILED=$(cat "$LATEST_REPORT" | grep -o '"failed": [0-9]*' | cut -d':' -f2 | tr -d ' ')

    echo ""
    echo "Summary:"
    echo "  Score: $SCORE"
    echo "  Total: $TOTAL"
    echo "  Passed: $PASSED"
    echo "  Failed: $FAILED"
fi

echo ""
echo -e "${BLUE}📂 Reports Location:${NC}"
echo "  JSON Reports: validation-reports/"
echo "  Playwright Report: playwright-report/"
echo "  Screenshots: validation-reports/*.png"

echo ""
echo -e "${GREEN}✨ Validation Complete!${NC}"
