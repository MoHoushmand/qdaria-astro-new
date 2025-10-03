// Chart Components Library
// Reusable, animated chart components for professional data visualization

// Basic animated charts
export { AnimatedLineChart } from './AnimatedLineChart';
export { AnimatedAreaChart } from './AnimatedAreaChart';
export { AnimatedRadarChart } from './AnimatedRadarChart';
export { AnimatedBarChart } from './AnimatedBarChart';
export { AnimatedPieChart } from './AnimatedPieChart';
export { AnimatedCountUp, AnimatedMetricCard } from './AnimatedCountUp';

// Advanced Chart Components for QDaria Pitch Deck
// Using ECharts, Plotly, ApexCharts, @nivo, @visx, and Recharts
export { default as MarketSizeChart } from './MarketSizeChart';
export { default as GrowthMetricsChart } from './GrowthMetricsChart';
export { default as RevenueProjectionsChart } from './RevenueProjectionsChart';
export { default as ProductComparisonChart } from './ProductComparisonChart';
export { default as CompetitiveMatrixChart } from './CompetitiveMatrixChart';
export { default as TechnologyArchitectureChart } from './TechnologyArchitectureChart';
export { default as RevenueStreamsChart } from './RevenueStreamsChart';
export { default as TeamGrowthChart } from './TeamGrowthChart';
export { default as IncomeBreakdownChart } from './IncomeBreakdownChart';
export { default as KeyMetricsChart } from './KeyMetricsChart';

// Chart configuration types
export interface ChartConfig {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    gradient: string[];
  };
  animation: {
    duration: number;
    easing: string;
  };
  responsive: {
    height: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
  };
}

// Default chart configuration
export const defaultChartConfig: ChartConfig = {
  colors: {
    primary: '#CCFF00',
    secondary: '#9AFF00',
    tertiary: '#66FF00',
    accent: '#04a3ff',
    gradient: ['#CCFF00', '#9AFF00', '#66FF00', '#04a3ff']
  },
  animation: {
    duration: 1500,
    easing: 'ease-in-out'
  },
  responsive: {
    height: {
      mobile: 300,
      tablet: 400,
      desktop: 500
    }
  }
};

// QDaria brand chart theme
export const qdariaBrandTheme = {
  colors: {
    primary: '#04a3ff',
    secondary: '#00ffd3',
    accent: '#65ff00',
    highlight: '#ff00ff',
    warning: '#ffaa00',
    danger: '#ff4444',
  },
  background: 'rgba(0, 2, 18, 0.8)',
  text: '#ffffff',
  grid: 'rgba(255, 255, 255, 0.1)',
};

export const commonChartConfig = {
  animation: {
    duration: 800,
    easing: 'easeinout',
  },
  tooltip: {
    background: 'rgba(0, 2, 18, 0.95)',
    borderColor: '#04a3ff',
    textColor: '#ffffff',
  },
};
