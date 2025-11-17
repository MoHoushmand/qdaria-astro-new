/**
 * Chart Source Attribution Utilities
 *
 * Helper functions for applying consistent source citations across all charts
 * in the business plan.
 *
 * @example
 * ```astro
 * ---
 * import { getChartSources } from '@/utils/chart-sources';
 * const sources = getChartSources('financial');
 * ---
 * ```
 */

import chartSourcesData from '@/data/chart-sources.json';

export type SourceCategory = keyof typeof chartSourcesData;

export interface ChartSourceData {
  sources: string[];
  dataDate: string;
}

/**
 * Get sources for a specific category
 * @param category - The source category (e.g., 'financial', 'market', 'zipminator')
 * @returns Object containing sources array and dataDate
 */
export function getChartSources(category: SourceCategory): ChartSourceData {
  return chartSourcesData[category];
}

/**
 * Combine sources from multiple categories
 * @param categories - Array of source categories to combine
 * @returns Object with merged sources (deduplicated) and most recent date
 */
export function getCombinedSources(...categories: SourceCategory[]): ChartSourceData {
  if (categories.length === 0) {
    return chartSourcesData.default;
  }

  // Combine all sources
  const allSources = categories.flatMap(cat => chartSourcesData[cat].sources);

  // Remove duplicates while preserving order
  const uniqueSources = [...new Set(allSources)];

  // Use the date from the first category
  const dataDate = chartSourcesData[categories[0]].dataDate;

  return {
    sources: uniqueSources,
    dataDate
  };
}

/**
 * Add custom sources to an existing category
 * @param category - Base source category
 * @param customSources - Additional sources to append
 * @returns Object with combined sources
 */
export function extendSources(
  category: SourceCategory,
  customSources: string[]
): ChartSourceData {
  const baseData = chartSourcesData[category];

  return {
    sources: [...baseData.sources, ...customSources],
    dataDate: baseData.dataDate
  };
}

/**
 * Get all available source categories
 * @returns Array of category names
 */
export function getSourceCategories(): SourceCategory[] {
  return Object.keys(chartSourcesData) as SourceCategory[];
}

/**
 * Check if a source category exists
 * @param category - Category name to check
 * @returns Boolean indicating if category exists
 */
export function hasSourceCategory(category: string): category is SourceCategory {
  return category in chartSourcesData;
}

/**
 * Format sources for display (e.g., in tooltips or footnotes)
 * @param sources - Array of source strings
 * @param format - Output format ('list' | 'inline' | 'footnote')
 * @returns Formatted string
 */
export function formatSources(
  sources: string[],
  format: 'list' | 'inline' | 'footnote' = 'list'
): string {
  if (sources.length === 0) return '';

  switch (format) {
    case 'inline':
      return sources.join('; ');

    case 'footnote':
      return sources.map((s, i) => `[${i + 1}] ${s}`).join('\n');

    case 'list':
    default:
      return sources.map(s => `• ${s}`).join('\n');
  }
}

/**
 * Generate a citation key for bibliography linking
 * @param source - Source string
 * @returns Citation key (e.g., 'mck-2024', 'qdaria-fm-2025')
 */
export function generateCitationKey(source: string): string {
  // Extract organization and year from source string
  const orgMatch = source.match(/^([A-Za-z&]+)/);
  const yearMatch = source.match(/\((\d{4})\)/);

  const org = orgMatch ? orgMatch[1].toLowerCase().replace(/\s+/g, '-') : 'ref';
  const year = yearMatch ? yearMatch[1] : 'n.d.';

  return `${org}-${year}`;
}

/**
 * Chart metadata for common charts (figure numbers, titles, etc.)
 */
export const CHART_METADATA = {
  // Financial Charts
  'financial-dashboard': {
    number: 8.1,
    title: 'Financial Dashboard - Key Performance Indicators',
    category: 'financial' as SourceCategory
  },
  'revenue-projections': {
    number: 8.2,
    title: 'Revenue Projections (2024-2030)',
    category: 'financial' as SourceCategory
  },
  'profitability': {
    number: 8.3,
    title: 'Path to Profitability',
    category: 'financial' as SourceCategory
  },
  'unit-economics': {
    number: 8.5,
    title: 'Unit Economics - CAC/LTV Analysis',
    category: 'unit-economics' as SourceCategory
  },

  // Market Charts
  'tam-sam-som': {
    number: 3.1,
    title: 'Total Addressable Market Funnel (TAM/SAM/SOM)',
    category: 'tam-sam-som' as SourceCategory
  },
  'market-segmentation': {
    number: 3.2,
    title: 'Market Segmentation Analysis',
    category: 'tam-sam-som' as SourceCategory
  },
  'market-growth': {
    number: 3.3,
    title: 'Quantum Computing Market Growth (2024-2035)',
    category: 'market' as SourceCategory
  },

  // Product Charts
  'product-portfolio': {
    number: 5.1,
    title: 'Product Portfolio Revenue Breakdown (2030)',
    category: 'default' as SourceCategory
  },
  'zipminator-revenue': {
    number: 7.3,
    title: 'Zipminator QCaaS Revenue Projections (2026-2030)',
    category: 'zipminator' as SourceCategory
  },

  // Competitive Charts
  'competitor-radar': {
    number: 4.3,
    title: 'Competitive Positioning Analysis',
    category: 'competitors' as SourceCategory
  },
  'competitor-funding': {
    number: 4.4,
    title: 'Competitor Funding Comparison',
    category: 'competitors' as SourceCategory
  },

  // Strategic Charts
  'swot': {
    number: 4.5,
    title: 'SWOT Analysis - Strategic Positioning',
    category: 'swot' as SourceCategory
  },
  'risk-assessment': {
    number: 10.2,
    title: 'Risk Assessment Matrix',
    category: 'risk' as SourceCategory
  },
  'execution-roadmap': {
    number: 9.1,
    title: 'Strategic Execution Roadmap (2024-2030)',
    category: 'roadmap' as SourceCategory
  },
  'ipo-timeline': {
    number: 11.1,
    title: 'IPO Readiness Timeline',
    category: 'ipo' as SourceCategory
  },

  // Funding Charts
  'funding-flow': {
    number: 8.4,
    title: 'Capital Deployment and Funding Flow',
    category: 'funding' as SourceCategory
  },
  'funding-allocation': {
    number: 8.6,
    title: 'Funding Allocation Strategy',
    category: 'funding' as SourceCategory
  }
} as const;

export type ChartKey = keyof typeof CHART_METADATA;

/**
 * Get complete chart configuration including sources
 * @param chartKey - The chart identifier
 * @returns Complete chart configuration
 */
export function getChartConfig(chartKey: ChartKey) {
  const metadata = CHART_METADATA[chartKey];
  const sources = getChartSources(metadata.category);

  return {
    ...metadata,
    ...sources
  };
}

/**
 * Validate that all charts have proper source attribution
 * @returns Object with validation results
 */
export function validateChartSources() {
  const categories = getSourceCategories();
  const issues: string[] = [];

  categories.forEach(category => {
    const data = chartSourcesData[category];

    if (data.sources.length === 0) {
      issues.push(`Category '${category}' has no sources`);
    }

    if (!data.dataDate) {
      issues.push(`Category '${category}' is missing dataDate`);
    }

    // Check for year in dataDate
    if (data.dataDate && !data.dataDate.match(/20\d{2}/)) {
      issues.push(`Category '${category}' dataDate missing year: ${data.dataDate}`);
    }
  });

  return {
    valid: issues.length === 0,
    issues,
    categoriesChecked: categories.length
  };
}

/**
 * Generate a source attribution string for use in chart footers
 * @param category - Source category
 * @param includeDate - Whether to include the data date
 * @returns Formatted attribution string
 */
export function getAttributionString(
  category: SourceCategory,
  includeDate: boolean = true
): string {
  const data = chartSourcesData[category];
  const sourcesText = `Sources: ${data.sources.join(', ')}`;

  if (includeDate) {
    return `${sourcesText} | Data as of: ${data.dataDate}`;
  }

  return sourcesText;
}

/**
 * React hook for chart sources (for use in React/TSX components)
 * @param category - Source category
 * @returns Chart source data
 */
export function useChartSources(category: SourceCategory): ChartSourceData {
  return getChartSources(category);
}

// Export the raw data for advanced use cases
export { chartSourcesData };
