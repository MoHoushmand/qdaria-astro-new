/**
 * Shared utility functions for business plan charts
 *
 * @module charts/utils
 */

/**
 * Format currency values for display
 *
 * @param value - Numeric value to format
 * @param options - Formatting options
 * @returns Formatted currency string
 *
 * @example
 * ```typescript
 * formatCurrency(1500000) // "$1.5M"
 * formatCurrency(500) // "$500"
 * ```
 */
export const formatCurrency = (
  value: number,
  options: {
    decimals?: number;
    prefix?: string;
    suffix?: string;
  } = {}
): string => {
  const { decimals = 1, prefix = '$', suffix = '' } = options;

  if (value >= 1000000000) {
    return `${prefix}${(value / 1000000000).toFixed(decimals)}B${suffix}`;
  }
  if (value >= 1000000) {
    return `${prefix}${(value / 1000000).toFixed(decimals)}M${suffix}`;
  }
  if (value >= 1000) {
    return `${prefix}${(value / 1000).toFixed(decimals)}K${suffix}`;
  }
  return `${prefix}${value.toLocaleString()}${suffix}`;
};

/**
 * Format percentage values for display
 *
 * @param value - Numeric value (0-100)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 *
 * @example
 * ```typescript
 * formatPercentage(45.678) // "45.7%"
 * formatPercentage(100, 0) // "100%"
 * ```
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Calculate percentage change between two values
 *
 * @param current - Current value
 * @param previous - Previous value
 * @returns Percentage change
 *
 * @example
 * ```typescript
 * calculatePercentageChange(150, 100) // 50
 * calculatePercentageChange(75, 100) // -25
 * ```
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Calculate Compound Annual Growth Rate (CAGR)
 *
 * @param startValue - Starting value
 * @param endValue - Ending value
 * @param years - Number of years
 * @returns CAGR percentage
 *
 * @example
 * ```typescript
 * calculateCAGR(100, 200, 5) // 14.87 (approximately)
 * ```
 */
export const calculateCAGR = (
  startValue: number,
  endValue: number,
  years: number
): number => {
  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
};

/**
 * Export data to CSV format
 *
 * @param data - Array of objects to export
 * @param filename - Output filename
 * @param headers - Optional custom headers
 *
 * @example
 * ```typescript
 * exportToCSV([{ year: 2025, value: 100 }], 'revenue-data.csv')
 * ```
 */
export const exportToCSV = <T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  headers?: string[]
): void => {
  if (data.length === 0) return;

  const keys = headers || (Object.keys(data[0]) as string[]);
  const csvRows = [
    keys.join(','),
    ...data.map((row) =>
      keys.map((key) => {
        const value = row[key];
        // Handle values with commas by wrapping in quotes
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return String(value ?? '');
      }).join(',')
    ),
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Debounce function to limit function call frequency
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Generate sparkline data points for growth visualization
 *
 * @param growth - Growth rate percentage
 * @param points - Number of data points
 * @returns Array of normalized values
 *
 * @example
 * ```typescript
 * generateSparkline(150, 5) // [100, 150, 225, 337.5, 506.25]
 * ```
 */
export const generateSparkline = (growth: number, points: number = 5): number[] => {
  const result: number[] = [];
  let current = 100;

  for (let i = 0; i < points; i++) {
    result.push(current);
    current *= 1 + growth / 100 / points;
  }

  return result;
};

/**
 * Validate data structure before rendering chart
 *
 * @param data - Data array to validate
 * @param requiredKeys - Required keys in each data point
 * @returns True if valid, false otherwise
 */
export const validateChartData = <T extends Record<string, unknown>>(
  data: T[],
  requiredKeys: string[]
): boolean => {
  if (!Array.isArray(data) || data.length === 0) return false;

  return data.every((item) =>
    requiredKeys.every((key) => key in item && item[key] !== undefined)
  );
};

/**
 * Calculate average value from array of numbers
 *
 * @param values - Array of numeric values
 * @returns Average value
 */
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

/**
 * Generate color palette with opacity variations
 *
 * @param baseColor - Base hex color
 * @param steps - Number of opacity steps
 * @returns Array of colors with varying opacity
 */
export const generateColorPalette = (baseColor: string, steps: number = 5): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < steps; i++) {
    const opacity = Math.floor((255 * (i + 1)) / steps);
    colors.push(`${baseColor}${opacity.toString(16).padStart(2, '0')}`);
  }
  return colors;
};
