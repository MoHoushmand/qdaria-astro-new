/**
 * GrowthMetricsNivo - Bar chart for year-over-year growth metrics
 *
 * Displays comparative growth metrics across different categories
 * with smooth animations, custom tooltips, and business-focused styling
 *
 * @example
 * <GrowthMetricsNivo
 *   data={growthData}
 *   groupMode="grouped"
 *   showComparison
 * />
 */

import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { motion } from 'framer-motion';

// Business plan color palette for growth metrics
const GROWTH_COLORS = {
  current: '#00d4ff',      // Cyan - Current year
  previous: '#9AFF00',     // Green - Previous year
  target: '#CCFF00',       // Lime - Target/Projected
  industry: '#666666',     // Gray - Industry average
  positive: '#00FF88',     // Bright green - Positive growth
  negative: '#FF3366',     // Red - Negative growth
  background: '#0a0a0a',
  text: '#ffffff',
  tooltip: 'rgba(10, 10, 10, 0.98)',
};

export interface GrowthDataPoint {
  category: string;
  current?: number;
  previous?: number;
  target?: number;
  industry?: number;
  [key: string]: string | number | undefined;
}

export interface GrowthMetricsNivoProps {
  data?: GrowthDataPoint[];
  keys?: string[];
  groupMode?: 'grouped' | 'stacked';
  height?: number;
  theme?: 'light' | 'dark';
  animate?: boolean;
  showComparison?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  layout?: 'horizontal' | 'vertical';
  formatValue?: (value: number) => string;
  className?: string;
}

/**
 * Default growth metrics data
 */
const DEFAULT_DATA: GrowthDataPoint[] = [
  {
    category: 'Revenue',
    current: 340,
    previous: 100,
    target: 500,
    industry: 150,
  },
  {
    category: 'Customers',
    current: 280,
    previous: 85,
    target: 420,
    industry: 120,
  },
  {
    category: 'EBITDA',
    current: 450,
    previous: -50,
    target: 600,
    industry: 180,
  },
  {
    category: 'Market Share',
    current: 220,
    previous: 120,
    target: 350,
    industry: 160,
  },
  {
    category: 'Efficiency',
    current: 180,
    previous: 110,
    target: 240,
    industry: 140,
  },
];

const DEFAULT_KEYS = ['previous', 'current', 'target', 'industry'];

/**
 * Format growth percentage
 */
const formatGrowth = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value}%`;
};

/**
 * Get color for metric key
 */
const getKeyColor = (key: string): string => {
  const colorMap: Record<string, string> = {
    current: GROWTH_COLORS.current,
    previous: GROWTH_COLORS.previous,
    target: GROWTH_COLORS.target,
    industry: GROWTH_COLORS.industry,
  };
  return colorMap[key] || GROWTH_COLORS.current;
};

/**
 * Get Nivo theme configuration
 */
const getGrowthTheme = (themeMode: 'light' | 'dark' = 'dark') => {
  const isDark = themeMode === 'dark';
  const textColor = isDark ? GROWTH_COLORS.text : '#1a1a1a';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

  return {
    background: 'transparent',
    text: {
      fill: textColor,
      fontSize: 13,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 500,
    },
    axis: {
      domain: {
        line: {
          stroke: gridColor,
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          fill: textColor,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.02em',
        },
      },
      ticks: {
        line: {
          stroke: gridColor,
          strokeWidth: 1,
        },
        text: {
          fill: textColor,
          fontSize: 12,
          fontWeight: 500,
        },
      },
    },
    grid: {
      line: {
        stroke: gridColor,
        strokeWidth: 1,
        strokeDasharray: '4 4',
      },
    },
    legends: {
      text: {
        fill: textColor,
        fontSize: 13,
        fontWeight: 600,
      },
    },
    tooltip: {
      container: {
        background: GROWTH_COLORS.tooltip,
        color: GROWTH_COLORS.text,
        fontSize: 13,
        borderRadius: 8,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(204, 255, 0, 0.3)',
        padding: '16px 20px',
        border: '1px solid rgba(204, 255, 0, 0.2)',
      },
    },
  };
};

/**
 * Custom tooltip component
 */
const CustomTooltip = ({ id, value, color, indexValue, data }: any) => {
  const isNegative = value < 0;
  const metricName = String(id).charAt(0).toUpperCase() + String(id).slice(1);

  // Calculate growth vs previous if available
  let growthRate: number | null = null;
  if (id === 'current' && data.previous !== undefined) {
    growthRate = ((value - data.previous) / Math.abs(data.previous)) * 100;
  }

  return (
    <div
      style={{
        background: GROWTH_COLORS.tooltip,
        padding: '16px 20px',
        border: `1px solid ${color}`,
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        minWidth: '200px',
      }}
    >
      <div style={{
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.6)',
        marginBottom: '4px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {indexValue}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: growthRate !== null ? '12px' : '8px'
      }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '2px',
            background: color,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
        <strong style={{
          fontSize: '14px',
          color: GROWTH_COLORS.text,
          fontWeight: 600
        }}>
          {metricName}
        </strong>
      </div>

      <div
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: isNegative ? GROWTH_COLORS.negative : color,
          letterSpacing: '-0.02em',
          marginBottom: '4px',
        }}
      >
        {formatGrowth(value)}
      </div>

      {growthRate !== null && (
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: growthRate >= 0 ? GROWTH_COLORS.positive : GROWTH_COLORS.negative,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <span>{growthRate >= 0 ? '↑' : '↓'}</span>
          <span>{formatGrowth(Math.abs(growthRate))} YoY</span>
        </div>
      )}
    </div>
  );
};

/**
 * Custom bar label component
 */
const BarLabel = ({ bars }: any) => {
  return bars.map((bar: any) => {
    const shouldShow = Math.abs(bar.data.value) > 50; // Only show for significant values
    if (!shouldShow) return null;

    return (
      <text
        key={bar.key}
        x={bar.x + bar.width / 2}
        y={bar.y - 8}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 11,
          fontWeight: 700,
          fill: bar.color,
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
        }}
      >
        {formatGrowth(bar.data.value)}
      </text>
    );
  });
};

/**
 * GrowthMetricsNivo Component
 */
export const GrowthMetricsNivo: React.FC<GrowthMetricsNivoProps> = ({
  data = DEFAULT_DATA,
  keys = DEFAULT_KEYS,
  groupMode = 'grouped',
  height = 500,
  theme = 'dark',
  animate = true,
  showComparison = true,
  showGrid = true,
  showLegend = true,
  layout = 'vertical',
  formatValue = formatGrowth,
  className = '',
}) => {
  const nivoTheme = getGrowthTheme(theme);
  const isHorizontal = layout === 'horizontal';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div style={{ height: `${height}px` }}>
        <ResponsiveBar
          data={data}
          theme={nivoTheme}
          keys={keys}
          indexBy="category"
          colors={({ id }) => getKeyColor(String(id))}
          margin={{ top: 60, right: 150, bottom: 80, left: 90 }}
          padding={0.25}
          groupMode={groupMode}
          layout={isHorizontal ? 'horizontal' : 'vertical'}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          borderRadius={4}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 8,
            tickPadding: 8,
            tickRotation: isHorizontal ? 0 : -30,
            legend: isHorizontal ? 'Growth Rate (%)' : 'Metric Category',
            legendPosition: 'middle',
            legendOffset: isHorizontal ? 50 : 60,
          }}
          axisLeft={{
            tickSize: 8,
            tickPadding: 8,
            tickRotation: 0,
            legend: isHorizontal ? 'Metric Category' : 'Growth Rate (%)',
            legendPosition: 'middle',
            legendOffset: -70,
            format: (value) => formatValue(value),
          }}
          enableGridX={isHorizontal && showGrid}
          enableGridY={!isHorizontal && showGrid}
          enableLabel={false}
          layers={[
            'grid',
            'axes',
            'bars',
            BarLabel,
            'markers',
            'legends',
            'annotations',
          ]}
          labelSkipWidth={16}
          labelSkipHeight={16}
          labelTextColor="#000000"
          animate={animate}
          motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0,
          }}
          tooltip={CustomTooltip}
          legends={
            showLegend
              ? [
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 140,
                    translateY: 0,
                    itemsSpacing: 12,
                    itemWidth: 120,
                    itemHeight: 24,
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 16,
                    symbolShape: 'square',
                    symbolBorderWidth: 0,
                    symbolBorderColor: 'rgba(0, 0, 0, 0.5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1,
                          itemTextColor: GROWTH_COLORS.target,
                        },
                      },
                    ],
                  },
                ]
              : []
          }
          markers={
            showComparison
              ? [
                  {
                    axis: isHorizontal ? 'x' : 'y',
                    value: 0,
                    lineStyle: {
                      stroke: 'rgba(255, 255, 255, 0.3)',
                      strokeWidth: 2,
                      strokeDasharray: '4 4',
                    },
                    legend: 'Baseline',
                    legendOrientation: 'horizontal',
                    legendPosition: 'top-right',
                  },
                ]
              : []
          }
        />
      </div>
    </motion.div>
  );
};

export default GrowthMetricsNivo;
