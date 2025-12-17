#!/usr/bin/env node

/**
 * Contrast Validation Script
 * Run contrast ratio calculations against the color system
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// Simple contrast calculation functions (duplicated for standalone script)
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

function getWCAGLevel(ratio: number, isLargeText: boolean = false): string {
  if (isLargeText) {
    if (ratio >= 4.5) return '✓ AAA';
    if (ratio >= 3) return '✓ AA';
    return '✗ FAIL';
  }
  if (ratio >= 7) return '✓ AAA';
  if (ratio >= 4.5) return '✓ AA';
  return '✗ FAIL';
}

// Color definitions from CSS
const colors = {
  background: {
    primary: '#000212',
    elevated: '#0a0f1c',
    hover: '#141926',
  },
  text: {
    primary: '#ffffff',
    secondary: '#e5e7eb',
    tertiary: '#d1d5db',
    muted: '#9ca3af',
    subtle: '#6b7280',
  },
  brand: {
    primary: '#0ea5e9',
    primaryLight: '#38bdf8',
    cyan: '#06d6ff',
    green: '#7ce000',
    greenLight: '#a3f000',
  },
  chart: {
    blue: '#0ea5e9',
    cyan: '#06d6ff',
    green: '#7ce000',
    yellow: '#fbbf24',
    orange: '#fb923c',
    red: '#f87171',
    purple: '#a78bfa',
    pink: '#f472b6',
    teal: '#14b8a6',
  },
  colorBlind: {
    blue: '#2196f3',
    green: '#029e73',
    orange: '#d55e00',
    purple: '#cc78bc',
    yellow: '#ece133',
    sky: '#56b4e9',
    vermillion: '#e69f00',
    pink: '#f0e442',
  },
  semantic: {
    success: '#10b981',
    successLight: '#34d399',
    warning: '#f59e0b',
    warningLight: '#fbbf24',
    error: '#ef4444',
    errorLight: '#f87171',
    info: '#0ea5e9',
    infoLight: '#38bdf8',
  },
};

console.log('🎨 Color Contrast Validation Report\n');
console.log('=' .repeat(80));

// Test text colors against primary background
console.log('\n📝 TEXT COLORS vs. Primary Background (#000212)\n');
console.log('Color'.padEnd(20), 'Ratio'.padEnd(12), 'Normal Text'.padEnd(15), 'Large Text');
console.log('-'.repeat(80));

Object.entries(colors.text).forEach(([name, color]) => {
  const ratio = getContrastRatio(color, colors.background.primary);
  const levelNormal = getWCAGLevel(ratio, false);
  const levelLarge = getWCAGLevel(ratio, true);

  console.log(
    name.padEnd(20),
    formatRatio(ratio).padEnd(12),
    levelNormal.padEnd(15),
    levelLarge
  );
});

// Test brand colors
console.log('\n🎨 BRAND COLORS vs. Primary Background (#000212)\n');
console.log('Color'.padEnd(20), 'Ratio'.padEnd(12), 'Normal Text'.padEnd(15), 'Large Text');
console.log('-'.repeat(80));

Object.entries(colors.brand).forEach(([name, color]) => {
  const ratio = getContrastRatio(color, colors.background.primary);
  const levelNormal = getWCAGLevel(ratio, false);
  const levelLarge = getWCAGLevel(ratio, true);

  console.log(
    name.padEnd(20),
    formatRatio(ratio).padEnd(12),
    levelNormal.padEnd(15),
    levelLarge
  );
});

// Test chart colors
console.log('\n📊 CHART COLORS vs. Primary Background (#000212)\n');
console.log('Color'.padEnd(20), 'Ratio'.padEnd(12), 'Normal Text'.padEnd(15), 'Large Text');
console.log('-'.repeat(80));

Object.entries(colors.chart).forEach(([name, color]) => {
  const ratio = getContrastRatio(color, colors.background.primary);
  const levelNormal = getWCAGLevel(ratio, false);
  const levelLarge = getWCAGLevel(ratio, true);

  console.log(
    name.padEnd(20),
    formatRatio(ratio).padEnd(12),
    levelNormal.padEnd(15),
    levelLarge
  );
});

// Test color-blind safe palette
console.log('\n🌈 COLOR-BLIND SAFE PALETTE vs. Primary Background (#000212)\n');
console.log('Color'.padEnd(20), 'Ratio'.padEnd(12), 'Normal Text'.padEnd(15), 'Large Text');
console.log('-'.repeat(80));

Object.entries(colors.colorBlind).forEach(([name, color]) => {
  const ratio = getContrastRatio(color, colors.background.primary);
  const levelNormal = getWCAGLevel(ratio, false);
  const levelLarge = getWCAGLevel(ratio, true);

  console.log(
    name.padEnd(20),
    formatRatio(ratio).padEnd(12),
    levelNormal.padEnd(15),
    levelLarge
  );
});

// Test semantic colors
console.log('\n⚠️  SEMANTIC COLORS vs. Primary Background (#000212)\n');
console.log('Color'.padEnd(20), 'Ratio'.padEnd(12), 'Normal Text'.padEnd(15), 'Large Text');
console.log('-'.repeat(80));

Object.entries(colors.semantic).forEach(([name, color]) => {
  const ratio = getContrastRatio(color, colors.background.primary);
  const levelNormal = getWCAGLevel(ratio, false);
  const levelLarge = getWCAGLevel(ratio, true);

  console.log(
    name.padEnd(20),
    formatRatio(ratio).padEnd(12),
    levelNormal.padEnd(15),
    levelLarge
  );
});

// Summary
console.log('\n' + '='.repeat(80));
console.log('\n📋 SUMMARY\n');

let totalColors = 0;
let passedAAA = 0;
let passedAA = 0;
let failed = 0;

const allColors = {
  ...colors.text,
  ...colors.brand,
  ...colors.chart,
  ...colors.colorBlind,
  ...colors.semantic,
};

Object.values(allColors).forEach(color => {
  totalColors++;
  const ratio = getContrastRatio(color, colors.background.primary);

  if (ratio >= 7) {
    passedAAA++;
  } else if (ratio >= 4.5) {
    passedAA++;
  } else {
    failed++;
  }
});

console.log(`Total Colors Tested: ${totalColors}`);
console.log(`AAA Compliant (7:1+): ${passedAAA} (${((passedAAA / totalColors) * 100).toFixed(1)}%)`);
console.log(`AA Compliant (4.5:1+): ${passedAA} (${((passedAA / totalColors) * 100).toFixed(1)}%)`);
console.log(`Failed (<4.5:1): ${failed} (${((failed / totalColors) * 100).toFixed(1)}%)`);

console.log('\n✓ Validation complete!\n');

// Exit with error if any colors failed
process.exit(failed > 0 ? 1 : 0);
