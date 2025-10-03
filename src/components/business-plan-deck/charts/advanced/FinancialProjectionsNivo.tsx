/**
 * FinancialProjectionsNivo - Multi-metric line chart for financial projections
 *
 * Displays revenue, EBITDA, and profit projections over time with
 * interactive tooltips, smooth animations, and custom business theme
 *
 * @example
 * <FinancialProjectionsNivo
 *   data={projectionData}
 *   height={500}
 *   theme="dark"
 * />
 */

import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { motion } from 'framer-motion';
import type { Serie } from '@nivo/line';

// Business plan color palette - qdaria.com brand colors
const BUSINESS_COLORS = {
  revenue: '#04a3ff',      // Primary Blue for revenue
  ebitda: '#00ffd3',       // Cyan for EBITDA
  profit: '#65ff00',       // Lime Green for profit
  losses: '#FF3366',       // Red for losses
  background: '#000212',
  text: 'rgba(229, 231, 235, 0.95)',
  grid: 'rgba(255, 255, 255, 0.08)',
  tooltip: 'rgba(0, 2, 18, 0.98)',
};

export interface FinancialDataPoint {
  x: string | number;  // Year, Quarter, or Date
  y: number;           // Financial value
}

export interface FinancialSerie {
  id: string;
  data: FinancialDataPoint[];
  color?: string;
}

export interface FinancialProjectionsNivoProps {
  data?: FinancialSerie[];
  height?: number;
  theme?: 'light' | 'dark';
  animate?: boolean;
  enableArea?: boolean;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

/**
 * Default financial projection data (5-year forecast)
 */
const DEFAULT_DATA: FinancialSerie[] = [
  {
    id: 'Revenue',
    color: BUSINESS_COLORS.revenue,
    data: [
      { x: '2025', y: 2500000 },
      { x: '2026', y: 8500000 },
      { x: '2027', y: 24000000 },
      { x: '2028', y: 58000000 },
      { x: '2029', y: 125000000 },
    ],
  },
  {
    id: 'EBITDA',
    color: BUSINESS_COLORS.ebitda,
    data: [
      { x: '2025', y: -1200000 },
      { x: '2026', y: 850000 },
      { x: '2027', y: 6000000 },
      { x: '2028', y: 17400000 },
      { x: '2029', y: 43750000 },
    ],
  },
  {
    id: 'Net Profit',
    color: BUSINESS_COLORS.profit,
    data: [
      { x: '2025', y: -1800000 },
      { x: '2026', y: -200000 },
      { x: '2027', y: 3600000 },
      { x: '2028', y: 11600000 },
      { x: '2029', y: 31250000 },
    ],
  },
];

/**
 * Format currency values for display
 */
const formatCurrency = (value: number): string => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1000000) {
    return `${sign}$${(absValue / 1000000).toFixed(1)}M`;
  } else if (absValue >= 1000) {
    return `${sign}$${(absValue / 1000).toFixed(0)}K`;
  }
  return `${sign}$${absValue.toFixed(0)}`;
};

/**
 * Get Nivo theme configuration for business plan
 */
const getBusinessTheme = (themeMode: 'light' | 'dark' = 'dark') => {
  const isDark = themeMode === 'dark';
  const textColor = isDark ? BUSINESS_COLORS.text : '#1a1a1a';
  const gridColor = isDark ? BUSINESS_COLORS.grid : 'rgba(0, 0, 0, 0.08)';
  const bgColor = isDark ? BUSINESS_COLORS.background : '#ffffff';

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
        background: BUSINESS_COLORS.tooltip,
        color: BUSINESS_COLORS.text,
        fontSize: 13,
        borderRadius: 8,
        boxShadow: '0 0 25px rgba(4, 163, 255, 0.15)',
        padding: '16px 20px',
        border: '1px solid rgba(4, 163, 255, 0.2)',
      },
    },
    crosshair: {
      line: {
        stroke: BUSINESS_COLORS.revenue,
        strokeWidth: 1.5,
        strokeOpacity: 0.5,
        strokeDasharray: '6 6',
      },
    },
  };
};

/**
 * Custom tooltip component
 */
const CustomTooltip = ({ point }: any) => {
  const value = point.data.y;
  const isNegative = value < 0;

  return (
    <div
      style={{
        background: BUSINESS_COLORS.tooltip,
        padding: '16px 20px',
        border: `1px solid ${point.serieColor}`,
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '8px'
      }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: point.serieColor,
          }}
        />
        <strong style={{
          fontSize: '14px',
          color: BUSINESS_COLORS.text,
          fontWeight: 600
        }}>
          {point.serieId}
        </strong>
      </div>
      <div style={{
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '4px'
      }}>
        Year: {point.data.x}
      </div>
      <div
        style={{
          fontSize: '20px',
          fontWeight: 700,
          color: isNegative ? BUSINESS_COLORS.losses : point.serieColor,
          letterSpacing: '-0.02em',
        }}
      >
        {formatCurrency(value)}
      </div>
      {isNegative && (
        <div style={{
          fontSize: '11px',
          color: BUSINESS_COLORS.losses,
          marginTop: '4px',
          fontWeight: 600
        }}>
          LOSS
        </div>
      )}
    </div>
  );
};

/**
 * FinancialProjectionsNivo Component
 */
export const FinancialProjectionsNivo: React.FC<FinancialProjectionsNivoProps> = ({
  data = DEFAULT_DATA,
  height = 500,
  theme = 'dark',
  animate = true,
  enableArea = true,
  showLegend = true,
  formatValue = formatCurrency,
  className = '',
}) => {
  const nivoTheme = getBusinessTheme(theme);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div style={{ height: `${height}px` }}>
        <ResponsiveLine
          data={data}
          theme={nivoTheme}
          colors={{ datum: 'color' }}
          margin={{ top: 60, right: 140, bottom: 80, left: 90 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 8,
            tickPadding: 12,
            tickRotation: 0,
            legend: 'Fiscal Year',
            legendOffset: 50,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 8,
            tickPadding: 12,
            tickRotation: 0,
            legend: 'Financial Performance (USD)',
            legendOffset: -70,
            legendPosition: 'middle',
            format: (value) => formatValue(value),
          }}
          enableGridX={false}
          enableGridY={true}
          lineWidth={3}
          pointSize={12}
          pointColor={{ from: 'color' }}
          pointBorderWidth={3}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-16}
          enableArea={enableArea}
          areaOpacity={0.15}
          areaBaselineValue={0}
          enableCrosshair={true}
          crosshairType="cross"
          useMesh={true}
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
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemsSpacing: 12,
                    itemDirection: 'left-to-right',
                    itemWidth: 110,
                    itemHeight: 24,
                    itemOpacity: 1,
                    symbolSize: 16,
                    symbolShape: 'circle',
                    symbolBorderWidth: 2,
                    symbolBorderColor: 'rgba(0, 0, 0, 0.5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1,
                          itemTextColor: BUSINESS_COLORS.ebitda,
                        },
                      },
                    ],
                  },
                ]
              : []
          }
        />
      </div>
    </motion.div>
  );
};

export default FinancialProjectionsNivo;
