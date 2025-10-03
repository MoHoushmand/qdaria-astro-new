/**
 * QDaria Business Plan Charts - Export Index
 *
 * Strategic visualization components for investor presentations
 */

export { default as ProductPortfolioChart } from './ProductPortfolioChart';
export { default as MarketSegmentationChart } from './MarketSegmentationChart';
export { default as UserGrowthChart } from './UserGrowthChart';
export { default as ScenarioComparisonChart } from './ScenarioComparisonChart';

// Type exports
export type {
  ProductData,
  ProductMetrics,
  MarketNode,
  MarketSegment,
  MarketMetrics,
  BreadcrumbItem,
  ChartTooltipData,
  ZoomState,
  RevenueProjection,
  MarketForecast,
  ChartExportOptions,
  MarketFilter,
  ColorScheme,
  ChartDimensions,
  AnimationConfig,
  AccessibilityConfig,
  UserGrowthData,
  Milestone,
  CohortRetentionData,
  ScenarioData,
  ScenarioAssumptions,
  ScenarioProbabilities,
  MonteCarloResults,
  NPVCalculation,
  RiskMetrics,
  ViewMode,
  ScenarioType
} from './types';

// Color scheme export
export { QDARIA_COLORS } from './types';
