/**
 * Professional Chart Configuration
 * Provides consistent styling, typography, and formatting across all charts
 */

export const PROFESSIONAL_CHART_CONFIG = {
  // Typography - Professional, accessible font sizes
  fontSize: {
    tick: 14,
    axisLabel: 16,
    title: 28,
    subtitle: 18,
    tooltip: 16,
    legend: 14,
    annotation: 14
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },

  // Font family
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",

  // Spacing and margins - Optimized for professional presentation
  margin: {
    top: 40,
    right: 32,
    bottom: 48,
    left: 64,
    compact: {
      top: 24,
      right: 16,
      bottom: 32,
      left: 48
    }
  },

  // Chart heights - Minimum 500px for professional appearance
  height: {
    default: 500,
    small: 400,
    large: 600,
    xl: 700,
    xxl: 800
  },

  // Color-blind safe palette (Okabe-Ito inspired)
  colors: {
    // Primary colors
    primary: '#0ea5e9',      // Sky blue
    cyan: '#06d6ff',         // Bright cyan
    green: '#7ce000',        // Bright green
    yellow: '#fbbf24',       // Amber
    orange: '#fb923c',       // Orange
    red: '#f87171',          // Red
    purple: '#a78bfa',       // Purple
    pink: '#f472b6',         // Pink

    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Neutrals
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',

    // Chart background
    background: '#ffffff',
    backgroundAlt: '#f9fafb',

    // Grid and axis
    grid: '#e5e7eb',
    axis: '#374151'
  },

  // Color scales for multi-series charts
  colorScales: {
    default: ['#0ea5e9', '#06d6ff', '#7ce000', '#fbbf24', '#fb923c', '#f87171', '#a78bfa', '#f472b6'],
    blue: ['#dbeafe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'],
    green: ['#d1fae5', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857'],
    purple: ['#e9d5ff', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'],
    gradient: ['#0ea5e9', '#06b6d4', '#10b981', '#84cc16', '#eab308', '#f97316']
  },

  // Animation settings
  animation: {
    duration: 750,
    easing: 'ease-in-out',
    enabled: true
  },

  // Accessibility
  accessibility: {
    minContrast: 7.0,  // WCAG AAA standard
    focusOutline: '2px solid #0ea5e9',
    ariaLabels: true
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280
  },

  // Grid settings
  grid: {
    strokeDasharray: '3 3',
    stroke: '#e5e7eb',
    opacity: 0.5
  },

  // Axis settings
  axis: {
    stroke: '#374151',
    strokeWidth: 1,
    tickSize: 6,
    tickPadding: 8
  },

  // Legend settings
  legend: {
    iconSize: 12,
    iconType: 'circle',
    wrapperStyle: {
      paddingTop: '20px'
    }
  }
} as const;

// Formatters for different data types
export const formatters = {
  // Currency formatter (EUR)
  currency: (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      notation: value >= 1000000 ? 'compact' : 'standard',
      compactDisplay: 'short'
    }).format(value);
  },

  // Percentage formatter
  percent: (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(value / 100);
  },

  // Number formatter with thousands separator
  number: (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      notation: value >= 1000000 ? 'compact' : 'standard',
      compactDisplay: 'short'
    }).format(value);
  },

  // Compact number (K, M, B)
  compact: (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(value);
  },

  // Date formatter
  date: (value: string | Date): string => {
    const date = typeof value === 'string' ? new Date(value) : value;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  },

  // Quarter formatter (Q1 2025, etc.)
  quarter: (value: string): string => {
    return value;
  }
};

// Helper function to get Recharts-compatible configuration
export const getRechartsConfig = (overrides?: Partial<typeof PROFESSIONAL_CHART_CONFIG.margin>) => ({
  margin: { ...PROFESSIONAL_CHART_CONFIG.margin, ...overrides },
  style: {
    fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.tick,
    fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.medium,
    fontFamily: PROFESSIONAL_CHART_CONFIG.fontFamily
  }
});

// Helper to get responsive height based on screen size
export const getResponsiveHeight = (baseHeight: number = PROFESSIONAL_CHART_CONFIG.height.default): number => {
  if (typeof window === 'undefined') return baseHeight;

  const width = window.innerWidth;
  const { breakpoints } = PROFESSIONAL_CHART_CONFIG;

  if (width < breakpoints.mobile) return baseHeight * 0.7;
  if (width < breakpoints.tablet) return baseHeight * 0.85;
  return baseHeight;
};

// Helper to get color by index
export const getColorByIndex = (index: number, scale: keyof typeof PROFESSIONAL_CHART_CONFIG.colorScales = 'default'): string => {
  const colors = PROFESSIONAL_CHART_CONFIG.colorScales[scale];
  return colors[index % colors.length];
};

// Export default config
export default PROFESSIONAL_CHART_CONFIG;
