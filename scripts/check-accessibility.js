#!/usr/bin/env node

/**
 * QDaria Pitch Deck - Accessibility Color Contrast Checker
 * Calculates WCAG 2.1 color contrast ratios
 */

// Color combinations to test from brand CSS files
const colorTests = [
  {
    name: "Primary (#04a3ff) on Dark Background (#000212)",
    foreground: "#04a3ff",
    background: "#000212"
  },
  {
    name: "Cyan (#00ffd3) on Dark Background (#000212)",
    foreground: "#00ffd3",
    background: "#000212"
  },
  {
    name: "Green (#65ff00) on Dark Background (#000212)",
    foreground: "#65ff00",
    background: "#000212"
  },
  {
    name: "White Text on Primary Button (#04a3ff)",
    foreground: "#ffffff",
    background: "#04a3ff"
  },
  {
    name: "Dark Text (#000212) on Primary Button (#04a3ff)",
    foreground: "#000212",
    background: "#04a3ff"
  },
  {
    name: "Text Primary (#e5e7eb) on Dark Background (#000212)",
    foreground: "#e5e7eb",
    background: "#000212"
  },
  {
    name: "Text Secondary (#94a3b8) on Dark Background (#000212)",
    foreground: "#94a3b8",
    background: "#000212"
  },
  {
    name: "Text Muted (#64748b) on Dark Background (#000212)",
    foreground: "#64748b",
    background: "#000212"
  }
];

// WCAG 2.1 Standards
const WCAG_AA_NORMAL = 4.5;  // Normal text AA
const WCAG_AA_LARGE = 3.0;   // Large text AA (18pt+ or 14pt+ bold)
const WCAG_AAA_NORMAL = 7.0; // Normal text AAA
const WCAG_AAA_LARGE = 4.5;  // Large text AAA

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance (WCAG formula)
 */
function getLuminance(rgb) {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio (WCAG formula)
 */
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG compliance
 */
function checkWCAG(ratio) {
  return {
    AA_Normal: ratio >= WCAG_AA_NORMAL,
    AA_Large: ratio >= WCAG_AA_LARGE,
    AAA_Normal: ratio >= WCAG_AAA_NORMAL,
    AAA_Large: ratio >= WCAG_AAA_LARGE
  };
}

/**
 * Format compliance status
 */
function formatCompliance(compliance) {
  const results = [];

  if (compliance.AAA_Normal) {
    results.push("✅ AAA (Normal & Large)");
  } else if (compliance.AAA_Large) {
    results.push("✅ AAA (Large only)");
  } else if (compliance.AA_Normal) {
    results.push("✅ AA (Normal & Large)");
  } else if (compliance.AA_Large) {
    results.push("⚠️  AA (Large only)");
  } else {
    results.push("❌ FAILS all WCAG standards");
  }

  return results.join(", ");
}

/**
 * Main execution
 */
console.log("\n" + "=".repeat(80));
console.log("🎨 QDaria Pitch Deck - Accessibility Color Contrast Analysis");
console.log("=".repeat(80) + "\n");

const results = [];
let passCount = 0;
let failCount = 0;

colorTests.forEach((test, index) => {
  const ratio = getContrastRatio(test.foreground, test.background);
  const compliance = checkWCAG(ratio);
  const status = formatCompliance(compliance);

  const result = {
    name: test.name,
    foreground: test.foreground,
    background: test.background,
    ratio: ratio.toFixed(2),
    compliance: compliance,
    status: status,
    passes: compliance.AA_Normal || compliance.AA_Large
  };

  results.push(result);

  if (result.passes) {
    passCount++;
  } else {
    failCount++;
  }

  console.log(`${index + 1}. ${test.name}`);
  console.log(`   Foreground: ${test.foreground} | Background: ${test.background}`);
  console.log(`   Contrast Ratio: ${ratio.toFixed(2)}:1`);
  console.log(`   Status: ${status}`);
  console.log("");
});

console.log("=".repeat(80));
console.log(`\n📊 Summary: ${passCount} passing, ${failCount} failing\n`);

// WCAG Guidelines Reference
console.log("📋 WCAG 2.1 Standards Reference:");
console.log("   • AA Normal Text (< 18pt): 4.5:1 minimum");
console.log("   • AA Large Text (≥ 18pt or ≥ 14pt bold): 3.0:1 minimum");
console.log("   • AAA Normal Text: 7.0:1 minimum");
console.log("   • AAA Large Text: 4.5:1 minimum\n");

// Recommendations
console.log("💡 Recommendations:");

const failing = results.filter(r => !r.passes);
if (failing.length > 0) {
  console.log("\n   ⚠️  Colors failing WCAG AA standards:");
  failing.forEach(f => {
    console.log(`   - ${f.name}: ${f.ratio}:1 (needs ${WCAG_AA_NORMAL}:1)`);
  });
  console.log("\n   Suggested fixes:");
  console.log("   1. Increase text size to 18pt+ for large text exemption (3:1 ratio)");
  console.log("   2. Add text-shadow or background overlay for better contrast");
  console.log("   3. Use alternative colors for critical text");
} else {
  console.log("\n   ✅ All color combinations meet WCAG AA standards!");
}

console.log("\n" + "=".repeat(80) + "\n");

// Export results as JSON for memory storage
const reportData = {
  timestamp: new Date().toISOString(),
  summary: {
    total: colorTests.length,
    passing: passCount,
    failing: failCount
  },
  standards: {
    AA_Normal: WCAG_AA_NORMAL,
    AA_Large: WCAG_AA_LARGE,
    AAA_Normal: WCAG_AAA_NORMAL,
    AAA_Large: WCAG_AAA_LARGE
  },
  results: results
};

console.log("📄 JSON Report:\n");
console.log(JSON.stringify(reportData, null, 2));
console.log("\n");

process.exit(failing.length > 0 ? 1 : 0);
