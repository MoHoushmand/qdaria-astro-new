/**
 * Chart Component Type Definitions
 *
 * Shared types and interfaces for all chart components in the QDaria pitch deck.
 */

/**
 * QDaria brand color palette
 */
export const QDARIA_COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  tertiary: '#66FF00',
  accent: '#00d4ff',
  dark: '#1a1a1a',
  gray: '#666666',
  palette: ['#CCFF00', '#00d4ff', '#9AFF00', '#66FF00', '#FF00FF', '#FF6B00'],
} as const;

/**
 * Theme options for all charts
 */
export type ChartTheme = 'light' | 'dark';

/**
 * Common chart props shared across all implementations
 */
export interface BaseChartProps {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Chart width (number in pixels or string with units) */
  width?: number | string;
  /** Chart height (number in pixels or string with units) */
  height?: number | string;
  /** Theme variant */
  theme?: ChartTheme;
  /** CSS class name for container */
  className?: string;
  /** Loading state */
  loading?: boolean;
  /** Enable animations */
  animate?: boolean;
  /** Enable interactive features */
  interactive?: boolean;
}

/**
 * Data point interface for simple charts
 */
export interface DataPoint {
  /** Label or category name */
  label: string;
  /** Numeric value */
  value: number;
  /** Optional color override */
  color?: string;
  /** Optional metadata */
  metadata?: Record<string, any>;
}

/**
 * Time series data point
 */
export interface TimeSeriesPoint {
  /** Date/time label */
  date: string | Date;
  /** Numeric value */
  value: number;
  /** Optional series identifier */
  series?: string;
}

/**
 * Multi-dimensional data point (for 3D charts)
 */
export interface MultiDimensionalPoint {
  /** X-axis value */
  x: number;
  /** Y-axis value */
  y: number;
  /** Z-axis value (optional) */
  z?: number;
  /** Label */
  label?: string;
  /** Size (for bubble charts) */
  size?: number;
  /** Color */
  color?: string;
}

/**
 * Network graph node
 */
export interface GraphNode {
  /** Unique node identifier */
  id: string;
  /** Display label */
  label: string;
  /** Group/category for coloring */
  group?: string | number;
  /** Size/weight */
  value?: number;
  /** Metadata */
  metadata?: Record<string, any>;
}

/**
 * Network graph link/edge
 */
export interface GraphLink {
  /** Source node ID */
  source: string;
  /** Target node ID */
  target: string;
  /** Link weight/value */
  value?: number;
  /** Link label */
  label?: string;
  /** Metadata */
  metadata?: Record<string, any>;
}

/**
 * Hierarchical tree node
 */
export interface TreeNode {
  /** Node name/label */
  name: string;
  /** Child nodes */
  children?: TreeNode[];
  /** Node value/size */
  value?: number;
  /** Metadata */
  metadata?: Record<string, any>;
}

/**
 * Chart axis configuration
 */
export interface AxisConfig {
  /** Axis label */
  label?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Tick format */
  format?: string;
  /** Show grid lines */
  showGrid?: boolean;
}

/**
 * Legend configuration
 */
export interface LegendConfig {
  /** Show legend */
  show?: boolean;
  /** Legend position */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Legend orientation */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Tooltip configuration
 */
export interface TooltipConfig {
  /** Show tooltip */
  show?: boolean;
  /** Custom tooltip formatter */
  formatter?: (data: any) => string;
  /** Trigger type */
  trigger?: 'hover' | 'click' | 'none';
}

/**
 * Chart configuration combining all options
 */
export interface ChartConfig extends BaseChartProps {
  /** X-axis configuration */
  xAxis?: AxisConfig;
  /** Y-axis configuration */
  yAxis?: AxisConfig;
  /** Z-axis configuration (for 3D charts) */
  zAxis?: AxisConfig;
  /** Legend configuration */
  legend?: LegendConfig;
  /** Tooltip configuration */
  tooltip?: TooltipConfig;
  /** Custom color palette */
  colors?: string[];
  /** Enable export functionality */
  exportable?: boolean;
}

/**
 * ECharts-specific types
 */
export type EChartsType =
  | 'multi-axis-line'
  | 'heatmap'
  | 'bubble'
  | 'waterfall'
  | 'stacked-area'
  | 'gauge'
  | '3d-bar';

/**
 * D3-specific types
 */
export type D3VisualizationType =
  | 'network-graph'
  | 'org-chart'
  | 'tree-diagram'
  | 'sankey'
  | 'force-layout';

/**
 * Plotly-specific types
 */
export type PlotlyChartType =
  | 'scatter-with-error'
  | '3d-scatter'
  | 'box-plot'
  | 'violin'
  | 'contour'
  | 'surface-3d'
  | 'parallel-coordinates';

/**
 * Nivo-specific types
 */
export type NivoChartType =
  | 'pie'
  | 'donut'
  | 'line'
  | 'bar'
  | 'stacked-bar'
  | 'radar'
  | 'area';

/**
 * visx-specific types
 */
export type VisxChartType =
  | 'branded-line'
  | 'gradient-bar'
  | 'animated-area'
  | 'custom-combo';

/**
 * Union type of all chart types
 */
export type ChartType =
  | EChartsType
  | D3VisualizationType
  | PlotlyChartType
  | NivoChartType
  | VisxChartType;

/**
 * Chart library enum
 */
export enum ChartLibrary {
  RECHARTS = 'recharts',
  ECHARTS = 'echarts',
  D3 = 'd3',
  PLOTLY = 'plotly',
  NIVO = 'nivo',
  VISX = 'visx',
}

/**
 * Chart selection criteria for automatic library selection
 */
export interface ChartSelectionCriteria {
  /** Desired chart type */
  chartType: ChartType;
  /** Data complexity (number of series) */
  dataComplexity: 'simple' | 'moderate' | 'complex';
  /** Interaction requirements */
  interactionLevel: 'none' | 'basic' | 'advanced';
  /** Branding requirements */
  brandingImportance: 'low' | 'medium' | 'high';
  /** Performance priority */
  performancePriority: 'low' | 'medium' | 'high';
  /** Bundle size sensitivity */
  bundleSizeCritical: boolean;
}

/**
 * Chart library recommendation
 */
export interface ChartRecommendation {
  /** Recommended library */
  library: ChartLibrary;
  /** Confidence score (0-1) */
  confidence: number;
  /** Reasoning */
  reason: string;
  /** Alternative options */
  alternatives?: ChartLibrary[];
}

/**
 * Error boundary state for charts
 */
export interface ChartErrorState {
  /** Has error occurred */
  hasError: boolean;
  /** Error message */
  error?: Error;
  /** Error info */
  errorInfo?: any;
}

/**
 * Chart performance metrics
 */
export interface ChartPerformanceMetrics {
  /** Render time in milliseconds */
  renderTime: number;
  /** Data points count */
  dataPointsCount: number;
  /** Memory usage (if available) */
  memoryUsage?: number;
  /** Frame rate (for animated charts) */
  frameRate?: number;
}

/**
 * Accessibility configuration
 */
export interface AccessibilityConfig {
  /** ARIA label */
  ariaLabel?: string;
  /** ARIA description */
  ariaDescription?: string;
  /** Keyboard navigation enabled */
  keyboardNav?: boolean;
  /** Screen reader support */
  screenReaderSupport?: boolean;
  /** High contrast mode */
  highContrast?: boolean;
}

/**
 * Export configuration
 */
export interface ExportConfig {
  /** Export format */
  format: 'png' | 'jpg' | 'svg' | 'pdf' | 'csv';
  /** Export filename */
  filename?: string;
  /** Export quality (0-1 for raster formats) */
  quality?: number;
  /** Include data table */
  includeData?: boolean;
}

/**
 * Responsive breakpoint configuration
 */
export interface ResponsiveConfig {
  /** Mobile breakpoint (max width) */
  mobile?: number;
  /** Tablet breakpoint (max width) */
  tablet?: number;
  /** Desktop breakpoint (min width) */
  desktop?: number;
  /** Adjust chart on resize */
  autoResize?: boolean;
}
