/**
 * MarketSegmentationNivo - Pie/Donut chart for market segmentation analysis
 *
 * Displays market distribution across different segments with
 * interactive hover effects, percentage breakdowns, and custom styling
 *
 * @example
 * <MarketSegmentationNivo
 *   data={marketSegments}
 *   variant="donut"
 *   showPercentages
 * />
 */

import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { motion } from 'framer-motion';

// Business plan color palette for market segments
const SEGMENT_COLORS = {
  palette: [
    '#00d4ff', // Cyan - Primary segment
    '#CCFF00', // Lime - Secondary segment
    '#9AFF00', // Green - Growth segment
    '#66FF00', // Light green
    '#FF00FF', // Magenta - Emerging
    '#FF6B00', // Orange
    '#00FFD4', // Teal
    '#FFD700', // Gold
  ],
  background: '#0a0a0a',
  text: '#ffffff',
  tooltip: 'rgba(10, 10, 10, 0.98)',
};

export interface MarketSegment {
  id: string;
  label: string;
  value: number;
  color?: string;
  description?: string;
}

export interface MarketSegmentationNivoProps {
  data?: MarketSegment[];
  variant?: 'pie' | 'donut';
  height?: number;
  theme?: 'light' | 'dark';
  animate?: boolean;
  showPercentages?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
  className?: string;
}

/**
 * Default market segmentation data
 */
const DEFAULT_DATA: MarketSegment[] = [
  {
    id: 'financial-services',
    label: 'Financial Services',
    value: 35,
    color: SEGMENT_COLORS.palette[0],
    description: 'Banking, Insurance, Trading',
  },
  {
    id: 'pharmaceuticals',
    label: 'Pharmaceuticals',
    value: 25,
    color: SEGMENT_COLORS.palette[1],
    description: 'Drug Discovery, Clinical Trials',
  },
  {
    id: 'energy',
    label: 'Energy & Utilities',
    value: 18,
    color: SEGMENT_COLORS.palette[2],
    description: 'Grid Optimization, Resource Management',
  },
  {
    id: 'aerospace',
    label: 'Aerospace & Defense',
    value: 12,
    color: SEGMENT_COLORS.palette[3],
    description: 'Cryptography, Simulations',
  },
  {
    id: 'logistics',
    label: 'Logistics & Supply Chain',
    value: 10,
    color: SEGMENT_COLORS.palette[4],
    description: 'Route Optimization, Inventory',
  },
];

/**
 * Format percentage values
 */
const formatPercentage = (value: number, total: number): string => {
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
};

/**
 * Get Nivo theme configuration
 */
const getSegmentationTheme = (themeMode: 'light' | 'dark' = 'dark') => {
  const isDark = themeMode === 'dark';
  const textColor = isDark ? SEGMENT_COLORS.text : '#1a1a1a';
  const bgColor = isDark ? SEGMENT_COLORS.background : '#ffffff';

  return {
    background: 'transparent',
    text: {
      fill: textColor,
      fontSize: 13,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 600,
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
        background: SEGMENT_COLORS.tooltip,
        color: SEGMENT_COLORS.text,
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
const CustomTooltip = ({ datum }: any) => {
  const segment = datum.data as MarketSegment;

  return (
    <div
      style={{
        background: SEGMENT_COLORS.tooltip,
        padding: '16px 20px',
        border: `1px solid ${datum.color}`,
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        minWidth: '220px',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
      }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '3px',
            background: datum.color,
            boxShadow: `0 0 12px ${datum.color}`,
          }}
        />
        <strong style={{
          fontSize: '15px',
          color: SEGMENT_COLORS.text,
          fontWeight: 700
        }}>
          {datum.label}
        </strong>
      </div>

      {segment.description && (
        <div style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: '10px',
          lineHeight: '1.4'
        }}>
          {segment.description}
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '16px'
      }}>
        <div>
          <div style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Market Share
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: datum.color,
              letterSpacing: '-0.02em',
            }}
          >
            {datum.value}%
          </div>
        </div>

        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.8)',
        }}>
          ${(datum.value * 10).toFixed(0)}B
        </div>
      </div>
    </div>
  );
};

/**
 * Custom arc label component
 */
const ArcLabel = ({ datum, label, style }: any) => {
  return (
    <text
      transform={style.transform}
      textAnchor={style.textAnchor}
      dominantBaseline="central"
      style={{
        ...style,
        fontSize: 14,
        fontWeight: 700,
        fill: '#000',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
      }}
    >
      {datum.value}%
    </text>
  );
};

/**
 * MarketSegmentationNivo Component
 */
export const MarketSegmentationNivo: React.FC<MarketSegmentationNivoProps> = ({
  data = DEFAULT_DATA,
  variant = 'donut',
  height = 500,
  theme = 'dark',
  animate = true,
  showPercentages = true,
  showLabels = true,
  showLegend = true,
  innerRadius = 0.65,
  className = '',
}) => {
  const nivoTheme = getSegmentationTheme(theme);
  const isDonut = variant === 'donut';

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div style={{ height: `${height}px`, position: 'relative' }}>
        <ResponsivePie
          data={data}
          theme={nivoTheme}
          colors={{ datum: 'data.color' }}
          margin={{ top: 60, right: 160, bottom: 60, left: 40 }}
          innerRadius={isDonut ? innerRadius : 0}
          padAngle={1.5}
          cornerRadius={4}
          activeOuterRadiusOffset={12}
          activeInnerRadiusOffset={8}
          borderWidth={2}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
          }}
          enableArcLinkLabels={showLabels && !isDonut}
          arcLinkLabelsSkipAngle={8}
          arcLinkLabelsTextColor={theme === 'dark' ? '#ffffff' : '#1a1a1a'}
          arcLinkLabelsThickness={2.5}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLinkLabelsDiagonalLength={20}
          arcLinkLabelsStraightLength={16}
          arcLabelsSkipAngle={8}
          arcLabel={(datum) => (showPercentages ? `${datum.value}%` : datum.label)}
          arcLabelsComponent={ArcLabel}
          arcLabelsTextColor="#000000"
          animate={animate}
          motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0,
          }}
          transitionMode="centerRadius"
          tooltip={CustomTooltip}
          legends={
            showLegend
              ? [
                  {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 140,
                    translateY: 0,
                    itemsSpacing: 16,
                    itemWidth: 120,
                    itemHeight: 24,
                    itemTextColor: theme === 'dark' ? '#ffffff' : '#1a1a1a',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    symbolBorderWidth: 0,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1,
                          itemTextColor: SEGMENT_COLORS.palette[1],
                        },
                      },
                    ],
                  },
                ]
              : []
          }
        />

        {/* Center label for donut variant */}
        {isDonut && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 600,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Total Market
            </div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: SEGMENT_COLORS.palette[1],
                letterSpacing: '-0.02em',
              }}
            >
              $1T
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: 500,
                marginTop: '4px',
              }}
            >
              Addressable
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MarketSegmentationNivo;
