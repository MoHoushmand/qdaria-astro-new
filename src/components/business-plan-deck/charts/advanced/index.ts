/**
 * Advanced Charts for Business Plan Deck
 *
 * Production-ready chart components built with:
 * - @nivo for financial visualizations and market analysis
 * - @visx for custom advanced visualizations
 * - ECharts for competitor and market size analysis
 * - Plotly for risk assessment and scenario analysis
 */

// Nivo Charts
export { FinancialProjectionsNivo } from './FinancialProjectionsNivo';
export type {
  FinancialProjectionsNivoProps,
  FinancialDataPoint,
  FinancialSerie,
} from './FinancialProjectionsNivo';

export { MarketSegmentationNivo } from './MarketSegmentationNivo';
export type {
  MarketSegmentationNivoProps,
  MarketSegment,
} from './MarketSegmentationNivo';

export { GrowthMetricsNivo } from './GrowthMetricsNivo';
export type {
  GrowthMetricsNivoProps,
  GrowthDataPoint,
} from './GrowthMetricsNivo';

// Visx Charts
export { MilestoneGanttVisx } from './MilestoneGanttVisx';
export type { Milestone } from './MilestoneGanttVisx';

export { MetricsGridVisx } from './MetricsGridVisx';
export type { MetricDataPoint } from './MetricsGridVisx';

export { GrowthTrajectoryVisx } from './GrowthTrajectoryVisx';
export type {
  DataSeries,
  DataPoint,
  Milestone as GrowthMilestone
} from './GrowthTrajectoryVisx';

// Plotly Charts
export { RiskAssessmentPlotly } from './RiskAssessmentPlotly';
export { ScenarioAnalysisPlotly } from './ScenarioAnalysisPlotly';
export { ProductMixPlotly } from './ProductMixPlotly';
