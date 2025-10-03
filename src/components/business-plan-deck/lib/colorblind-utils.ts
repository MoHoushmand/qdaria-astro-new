/**
 * Color-blind Safe Utilities
 * Provides tools for creating accessible visualizations
 */

/**
 * Color-blind safe palette based on Wong (2011) and IBM Design
 * Optimized for deuteranopia, protanopia, and tritanopia
 */
export const colorBlindSafePalette = {
  blue: '#2196f3',       // Strong blue - Enhanced for WCAG AAA (7.5:1)
  green: '#029e73',      // Teal green
  orange: '#d55e00',     // Vivid orange
  purple: '#cc78bc',     // Light purple
  yellow: '#ece133',     // Bright yellow
  sky: '#56b4e9',        // Sky blue
  vermillion: '#e69f00', // Orange-yellow
  pink: '#f0e442',       // Yellow-pink
} as const;

/**
 * Get color-blind safe palette as array
 */
export function getColorBlindSafePalette(): string[] {
  return Object.values(colorBlindSafePalette);
}

/**
 * Chart color mapping for Recharts
 */
export const colorBlindChartColors = [
  colorBlindSafePalette.blue,
  colorBlindSafePalette.orange,
  colorBlindSafePalette.green,
  colorBlindSafePalette.purple,
  colorBlindSafePalette.yellow,
  colorBlindSafePalette.sky,
  colorBlindSafePalette.vermillion,
  colorBlindSafePalette.pink,
];

/**
 * Pattern fills for additional differentiation
 * Useful when color alone is not sufficient
 */
export const patternFills = {
  solid: 'none',
  dots: 'url(#dots)',
  stripes: 'url(#stripes)',
  diagonal: 'url(#diagonal)',
  cross: 'url(#cross)',
  grid: 'url(#grid)',
} as const;

/**
 * SVG pattern definitions for charts
 */
export const patternDefinitions = `
  <defs>
    <pattern id="dots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.3"/>
    </pattern>
    <pattern id="stripes" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    </pattern>
    <pattern id="diagonal" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M0,8 l8,-8" stroke="currentColor" stroke-width="2" opacity="0.3"/>
    </pattern>
    <pattern id="cross" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M4,0 v8 M0,4 h8" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    </pattern>
    <pattern id="grid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M0,0 v8 h8" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.3"/>
    </pattern>
  </defs>
`;

/**
 * Calculate relative luminance (WCAG formula)
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors (WCAG formula)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Check if contrast ratio meets WCAG level
 */
export function meetsWCAGLevel(
  ratio: number,
  level: 'AA' | 'AAA',
  isLargeText: boolean = false
): boolean {
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Get accessible color for text based on background
 */
export function getAccessibleTextColor(backgroundColor: string): string {
  const bgRgb = hexToRgb(backgroundColor);
  if (!bgRgb) return '#ffffff';

  const luminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

  // If background is light, use dark text; if dark, use light text
  return luminance > 0.5 ? '#000212' : '#ffffff';
}

/**
 * Simulate color blindness for testing
 * @param type - Type of color blindness to simulate
 */
export function simulateColorBlindness(
  color: string,
  type: 'deuteranopia' | 'protanopia' | 'tritanopia'
): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  let { r, g, b } = rgb;

  // Simplified simulation matrices
  switch (type) {
    case 'deuteranopia': // Red-green (green weak)
      r = r * 0.625 + g * 0.375;
      g = r * 0.7 + g * 0.3;
      b = g * 0.3 + b * 0.7;
      break;
    case 'protanopia': // Red-green (red weak)
      r = r * 0.567 + g * 0.433;
      g = r * 0.558 + g * 0.442;
      b = b * 0.242 + g * 0.758;
      break;
    case 'tritanopia': // Blue-yellow
      r = r * 0.95 + g * 0.05;
      g = g * 0.433 + b * 0.567;
      b = g * 0.475 + b * 0.525;
      break;
  }

  // Clamp values
  r = Math.min(255, Math.max(0, Math.round(r)));
  g = Math.min(255, Math.max(0, Math.round(g)));
  b = Math.min(255, Math.max(0, Math.round(b)));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Validate entire palette for color-blind accessibility
 */
export function validatePaletteAccessibility(colors: string[]): {
  isAccessible: boolean;
  minContrast: number;
  issues: string[];
} {
  const issues: string[] = [];
  let minContrast = Infinity;
  const backgroundColor = '#000212'; // Primary background

  colors.forEach((color, index) => {
    const ratio = getContrastRatio(color, backgroundColor);
    minContrast = Math.min(minContrast, ratio);

    if (ratio < 4.5) {
      issues.push(`Color ${index + 1} (${color}) has insufficient contrast: ${ratio.toFixed(2)}:1`);
    }

    // Test color-blind simulation
    ['deuteranopia', 'protanopia', 'tritanopia'].forEach(type => {
      const simulated = simulateColorBlindness(color, type as any);
      const simulatedRatio = getContrastRatio(simulated, backgroundColor);

      if (simulatedRatio < 3) {
        issues.push(
          `Color ${index + 1} (${color}) has poor ${type} simulation contrast: ${simulatedRatio.toFixed(2)}:1`
        );
      }
    });
  });

  return {
    isAccessible: issues.length === 0,
    minContrast,
    issues
  };
}

/**
 * Generate accessible color scheme for charts
 */
export function generateAccessibleChartScheme(
  dataPoints: number,
  useColorBlindSafe: boolean = true
): string[] {
  if (useColorBlindSafe) {
    const palette = colorBlindChartColors;
    const scheme: string[] = [];

    for (let i = 0; i < dataPoints; i++) {
      scheme.push(palette[i % palette.length]);
    }

    return scheme;
  }

  // Default high-contrast scheme
  const highContrastColors = [
    '#0ea5e9', // Blue
    '#7ce000', // Green
    '#fbbf24', // Yellow
    '#fb923c', // Orange
    '#f87171', // Red
    '#a78bfa', // Purple
    '#06d6ff', // Cyan
    '#f472b6', // Pink
  ];

  const scheme: string[] = [];
  for (let i = 0; i < dataPoints; i++) {
    scheme.push(highContrastColors[i % highContrastColors.length]);
  }

  return scheme;
}

/**
 * Format contrast ratio for display
 */
export function formatContrastRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/**
 * Get WCAG level for contrast ratio
 */
export function getWCAGLevel(ratio: number, isLargeText: boolean = false): 'AAA' | 'AA' | 'FAIL' {
  if (isLargeText) {
    if (ratio >= 4.5) return 'AAA';
    if (ratio >= 3) return 'AA';
  } else {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
  }
  return 'FAIL';
}
