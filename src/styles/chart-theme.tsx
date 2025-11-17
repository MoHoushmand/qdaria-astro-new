/**
 * QDaria Business Plan - Chart Design System
 * Standardized theme for all charts and visualizations
 *
 * Usage: Import and apply to all Recharts, ECharts, and Nivo components
 * Example:
 *   import { CHART_THEME, standardTooltipStyle } from '@/styles/chart-theme';
 *   <XAxis stroke={CHART_THEME.colors.chart.axis} />
 */

import React from 'react';

export const CHART_THEME = {
  colors: {
    // Primary QDaria brand colors
    primary: '#04a3ff',      // QDaria blue
    secondary: '#00ffd3',    // Cyan
    accent: '#65ff00',       // Green

    // Extended palette for multi-series charts
    palette: {
      blue: '#04a3ff',
      cyan: '#00ffd3',
      green: '#65ff00',
      purple: '#a855f7',
      orange: '#f59e0b',
      red: '#ff4444',
      yellow: '#ffbb00',
      pink: '#ec4899',
    },

    // Semantic colors
    semantic: {
      positive: '#65ff00',    // Success/growth
      negative: '#ff4444',    // Danger/loss
      warning: '#ffbb00',     // Caution
      info: '#04a3ff',        // Information
      neutral: '#94a3b8',     // Neutral/disabled
    },

    // Gradient combinations for area charts
    gradients: {
      primary: ['#a855f7', '#3b82f6', '#06b6d4'],
      revenue: ['#04a3ff', '#00ffd3'],
      growth: ['#65ff00', '#00ffd3'],
      warning: ['#f59e0b', '#ff4444'],
    },

    // Text colors
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      muted: 'rgba(255, 255, 255, 0.5)',
      disabled: 'rgba(255, 255, 255, 0.3)',
    },

    // Background colors
    background: {
      transparent: 'transparent',
      primary: '#000212',      // Dark blue background
      secondary: '#001a2e',    // Lighter dark blue
      dark: 'rgba(0, 2, 18, 0.95)',
      overlay: 'rgba(0, 0, 0, 0.8)',
      card: 'rgba(0, 2, 18, 0.6)',
    },

    // Chart-specific colors
    chart: {
      grid: 'rgba(255, 255, 255, 0.1)',
      gridStrong: 'rgba(255, 255, 255, 0.2)',
      axis: 'rgba(148, 163, 184, 1)',      // #94a3b8
      axisLine: 'rgba(71, 85, 105, 1)',    // #475569
      tooltip: {
        bg: 'rgba(0, 2, 18, 0.95)',
        border: '#04a3ff',
        borderWidth: '1px',
        shadow: '0 4px 12px rgba(4, 163, 255, 0.3)',
      },
    },
  },

  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sizes: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 20,
      xxl: 24,
    },
    weights: {
      normal: 500,
      medium: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
  },

  spacing: {
    chart: {
      margin: { top: 20, right: 30, left: 20, bottom: 60 },
      marginCompact: { top: 10, right: 20, left: 10, bottom: 40 },
      padding: 16,
      paddingLarge: 24,
    },
    gap: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(4, 163, 255, 0.3)',
    glowStrong: '0 0 30px rgba(4, 163, 255, 0.5)',
  },

  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: 'ease-in-out',
  },

  responsive: {
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      wide: 1280,
    },
  },
} as const;

/**
 * Standardized tooltip style for consistency across all charts
 * Apply to Recharts Tooltip components
 */
export const standardTooltipStyle = {
  backgroundColor: CHART_THEME.colors.background.dark,
  border: CHART_THEME.colors.chart.tooltip.borderWidth + ' solid ' + CHART_THEME.colors.chart.tooltip.border,
  color: CHART_THEME.colors.text.primary,
  borderRadius: CHART_THEME.borderRadius.md,
  padding: '12px 16px',
  fontFamily: CHART_THEME.typography.fontFamily,
  fontSize: CHART_THEME.typography.sizes.sm + 'px',
  boxShadow: CHART_THEME.shadows.glow,
  minWidth: '200px',
} as const;

/**
 * Standardized label style for consistency across all charts
 * Apply to Recharts Label components
 */
export const standardLabelStyle = {
  fill: CHART_THEME.colors.text.secondary,
  fontSize: CHART_THEME.typography.sizes.sm,
  fontWeight: CHART_THEME.typography.weights.medium,
  fontFamily: CHART_THEME.typography.fontFamily,
} as const;

/**
 * Standardized axis style for consistency across all charts
 * Apply to XAxis and YAxis components
 */
export const standardAxisStyle = {
  stroke: CHART_THEME.colors.chart.axis,
  fontSize: CHART_THEME.typography.sizes.sm,
  fill: CHART_THEME.colors.chart.axis,
  fontFamily: CHART_THEME.typography.fontFamily,
} as const;

/**
 * Standardized tick style for axis labels
 */
export const standardTickStyle = {
  fill: CHART_THEME.colors.chart.axis,
  fontSize: CHART_THEME.typography.sizes.sm,
  fontFamily: CHART_THEME.typography.fontFamily,
} as const;

/**
 * Standardized grid style for consistency across all charts
 * Apply to CartesianGrid components
 */
export const standardGridStyle = {
  stroke: CHART_THEME.colors.chart.grid,
  strokeDasharray: '3 3',
  opacity: 0.3,
} as const;

/**
 * Standardized legend style
 */
export const standardLegendStyle = {
  iconType: 'circle' as const,
  wrapperStyle: {
    paddingTop: '20px',
    fontSize: CHART_THEME.typography.sizes.sm + 'px',
    fontFamily: CHART_THEME.typography.fontFamily,
  },
} as const;

/**
 * Format currency values consistently
 */
export const formatCurrency = (value: number, currency: string = '$'): string => {
  if (Math.abs(value) >= 1_000_000_000) {
    return `${currency}${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `${currency}${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${currency}${(value / 1_000).toFixed(1)}K`;
  }
  return `${currency}${value.toLocaleString()}`;
};

/**
 * Format percentage values consistently
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

/**
 * Format large numbers with K/M/B suffixes
 */
export const formatNumber = (value: number): string => {
  if (Math.abs(value) >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toLocaleString();
};

/**
 * Get color based on value (positive/negative/neutral)
 */
export const getSemanticColor = (value: number, thresholds?: { positive: number; negative: number }): string => {
  if (thresholds) {
    if (value >= thresholds.positive) return CHART_THEME.colors.semantic.positive;
    if (value <= thresholds.negative) return CHART_THEME.colors.semantic.negative;
    return CHART_THEME.colors.semantic.neutral;
  }
  if (value > 0) return CHART_THEME.colors.semantic.positive;
  if (value < 0) return CHART_THEME.colors.semantic.negative;
  return CHART_THEME.colors.semantic.neutral;
};

/**
 * Generate gradient definitions for Recharts
 */
export const generateGradientDefs = () => {
  return (
    <defs>
      {/* Primary gradient */}
      <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={CHART_THEME.colors.primary} stopOpacity={0.8} />
        <stop offset="95%" stopColor={CHART_THEME.colors.primary} stopOpacity={0.1} />
      </linearGradient>

      {/* Secondary gradient */}
      <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={CHART_THEME.colors.secondary} stopOpacity={0.8} />
        <stop offset="95%" stopColor={CHART_THEME.colors.secondary} stopOpacity={0.1} />
      </linearGradient>

      {/* Accent gradient */}
      <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={CHART_THEME.colors.accent} stopOpacity={0.8} />
        <stop offset="95%" stopColor={CHART_THEME.colors.accent} stopOpacity={0.1} />
      </linearGradient>

      {/* Revenue gradient */}
      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={CHART_THEME.colors.palette.cyan} stopOpacity={0.6} />
        <stop offset="95%" stopColor={CHART_THEME.colors.palette.cyan} stopOpacity={0.1} />
      </linearGradient>
    </defs>
  );
};
