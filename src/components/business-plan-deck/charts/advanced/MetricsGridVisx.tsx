/**
 * MetricsGridVisx - Heatmap for KPI tracking using Visx
 *
 * Features:
 * - Color-coded heatmap cells for metric values
 * - Time-series data visualization
 * - Interactive tooltips with detailed metrics
 * - Trend indicators (up/down arrows)
 * - Target comparison indicators
 * - Responsive scaling
 * - Business plan theme styling
 */

import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { Text } from '@visx/text';
import { LinearGradient } from '@visx/gradient';
import { motion } from 'framer-motion';

// Business plan brand colors
const COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  accent: '#00d4ff',
  success: '#00ff88',
  warning: '#ffd700',
  danger: '#ff4444',
  dark: '#1a1a1a',
  gray: '#666666',
};

export interface MetricDataPoint {
  metric: string;
  period: string;
  value: number;
  target?: number;
  trend?: 'up' | 'down' | 'stable';
  unit?: string;
  category?: string;
  description?: string;
}

interface MetricsGridVisxProps {
  data: MetricDataPoint[];
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
  colorScheme?: 'performance' | 'heat' | 'diverging';
  showTrends?: boolean;
  showTargets?: boolean;
  className?: string;
  onCellClick?: (dataPoint: MetricDataPoint) => void;
}

const margin = { top: 80, right: 100, bottom: 80, left: 200 };

const getColorForValue = (
  value: number,
  minValue: number,
  maxValue: number,
  colorScheme: 'performance' | 'heat' | 'diverging',
  target?: number
): string => {
  const normalizedValue = (value - minValue) / (maxValue - minValue);

  if (colorScheme === 'performance') {
    // Green to red based on target achievement
    if (target) {
      const targetRatio = value / target;
      if (targetRatio >= 1.0) return COLORS.success;
      if (targetRatio >= 0.8) return COLORS.primary;
      if (targetRatio >= 0.6) return COLORS.warning;
      return COLORS.danger;
    }
    // Fallback to gradient
    if (normalizedValue > 0.75) return COLORS.success;
    if (normalizedValue > 0.5) return COLORS.primary;
    if (normalizedValue > 0.25) return COLORS.warning;
    return COLORS.danger;
  }

  if (colorScheme === 'heat') {
    // Blue to red heat map
    const hue = 240 - normalizedValue * 240; // 240 (blue) to 0 (red)
    const saturation = 80;
    const lightness = 40 + normalizedValue * 20;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  if (colorScheme === 'diverging') {
    // Red-Yellow-Green diverging
    if (normalizedValue > 0.6) {
      const t = (normalizedValue - 0.6) / 0.4;
      return interpolateColor('#ffd700', COLORS.success, t);
    } else {
      const t = normalizedValue / 0.6;
      return interpolateColor(COLORS.danger, '#ffd700', t);
    }
  }

  return COLORS.primary;
};

const interpolateColor = (color1: string, color2: string, t: number): string => {
  const c1 = color1.startsWith('#') ? hexToRgb(color1) : { r: 0, g: 0, b: 0 };
  const c2 = color2.startsWith('#') ? hexToRgb(color2) : { r: 0, g: 0, b: 0 };

  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const getTrendIcon = (trend?: 'up' | 'down' | 'stable'): string => {
  if (trend === 'up') return '▲';
  if (trend === 'down') return '▼';
  return '●';
};

const getTrendColor = (trend?: 'up' | 'down' | 'stable'): string => {
  if (trend === 'up') return COLORS.success;
  if (trend === 'down') return COLORS.danger;
  return COLORS.gray;
};

export const MetricsGridVisx: React.FC<MetricsGridVisxProps> = ({
  data,
  width = 1200,
  height = 700,
  theme = 'dark',
  colorScheme = 'performance',
  showTrends = true,
  showTargets = true,
  className = '',
  onCellClick,
}) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<MetricDataPoint>();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const bgColor = isDark ? COLORS.dark : '#ffffff';

  // Calculate dimensions
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Get unique metrics and periods
  const metrics = useMemo(() => Array.from(new Set(data.map(d => d.metric))), [data]);
  const periods = useMemo(() => Array.from(new Set(data.map(d => d.period))), [data]);

  // Calculate min/max values for color scaling
  const { minValue, maxValue } = useMemo(() => {
    const values = data.map(d => d.value);
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
    };
  }, [data]);

  // Scales
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        domain: periods,
        range: [0, xMax],
        padding: 0.05,
      }),
    [periods, xMax]
  );

  const yScale = useMemo(
    () =>
      scaleBand<string>({
        domain: metrics,
        range: [0, yMax],
        padding: 0.05,
      }),
    [metrics, yMax]
  );

  const cellWidth = xScale.bandwidth();
  const cellHeight = yScale.bandwidth();

  // Create a lookup map for data
  const dataMap = useMemo(() => {
    const map = new Map<string, MetricDataPoint>();
    data.forEach(d => {
      map.set(`${d.metric}-${d.period}`, d);
    });
    return map;
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <div style={{ position: 'relative', background: bgColor, borderRadius: '8px', padding: '20px' }}>
        <svg width={width} height={height}>
          {/* Gradients */}
          <LinearGradient id="cell-gradient" from={COLORS.primary} to={COLORS.accent} />

          <Group left={margin.left} top={margin.top}>
            {/* Render cells */}
            {metrics.map((metric, i) => (
              periods.map((period, j) => {
                const dataPoint = dataMap.get(`${metric}-${period}`);
                if (!dataPoint) return null;

                const x = xScale(period)!;
                const y = yScale(metric)!;
                const cellColor = getColorForValue(
                  dataPoint.value,
                  minValue,
                  maxValue,
                  colorScheme,
                  dataPoint.target
                );

                const targetAchieved = dataPoint.target
                  ? dataPoint.value >= dataPoint.target
                  : false;

                return (
                  <Group key={`cell-${i}-${j}`}>
                    {/* Cell background */}
                    <motion.rect
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: (i * periods.length + j) * 0.02 }}
                      x={x}
                      y={y}
                      width={cellWidth}
                      height={cellHeight}
                      fill={cellColor}
                      rx={4}
                      style={{ cursor: 'pointer' }}
                      onMouseMove={(event) => {
                        const point = localPoint(event.target as SVGElement);
                        if (point) {
                          showTooltip({
                            tooltipData: dataPoint,
                            tooltipLeft: point.x,
                            tooltipTop: point.y,
                          });
                        }
                      }}
                      onMouseLeave={hideTooltip}
                      onClick={() => onCellClick?.(dataPoint)}
                    />

                    {/* Cell border */}
                    <rect
                      x={x}
                      y={y}
                      width={cellWidth}
                      height={cellHeight}
                      fill="none"
                      stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                      strokeWidth={1}
                      rx={4}
                    />

                    {/* Value text */}
                    {cellWidth > 60 && cellHeight > 30 && (
                      <Text
                        x={x + cellWidth / 2}
                        y={y + cellHeight / 2 - (showTrends ? 5 : 0)}
                        fontSize={13}
                        fontWeight="bold"
                        fill="#fff"
                        textAnchor="middle"
                        verticalAnchor="middle"
                      >
                        {dataPoint.value.toLocaleString()}
                      </Text>
                    )}

                    {/* Trend indicator */}
                    {showTrends && dataPoint.trend && cellHeight > 40 && (
                      <Text
                        x={x + cellWidth / 2}
                        y={y + cellHeight / 2 + 12}
                        fontSize={10}
                        fill={getTrendColor(dataPoint.trend)}
                        textAnchor="middle"
                        verticalAnchor="middle"
                      >
                        {getTrendIcon(dataPoint.trend)}
                      </Text>
                    )}

                    {/* Target indicator */}
                    {showTargets && dataPoint.target && targetAchieved && (
                      <circle
                        cx={x + cellWidth - 8}
                        cy={y + 8}
                        r={4}
                        fill={COLORS.success}
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    )}
                  </Group>
                );
              })
            ))}

            {/* Axes */}
            <AxisBottom
              top={yMax}
              scale={xScale}
              stroke={textColor}
              tickStroke={textColor}
              tickLabelProps={() => ({
                fill: textColor,
                fontSize: 12,
                textAnchor: 'middle',
                angle: -45,
                dx: '-0.5em',
                dy: '0.25em',
              })}
            />

            <AxisLeft
              scale={yScale}
              stroke={textColor}
              tickStroke={textColor}
              tickLabelProps={() => ({
                fill: textColor,
                fontSize: 12,
                textAnchor: 'end',
                dx: '-0.5em',
                dy: '0.25em',
              })}
            />
          </Group>

          {/* Legend - Color scale */}
          <Group left={width - margin.right + 20} top={margin.top}>
            <Text fontSize={14} fontWeight="bold" fill={textColor}>
              Scale
            </Text>
            {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
              const value = minValue + (maxValue - minValue) * t;
              const color = getColorForValue(value, minValue, maxValue, colorScheme);

              return (
                <Group key={i} top={25 + i * 30}>
                  <rect x={0} y={-8} width={20} height={20} fill={color} rx={2} />
                  <Text x={28} y={2} fontSize={11} fill={textColor} verticalAnchor="middle">
                    {value.toFixed(0)}
                  </Text>
                </Group>
              );
            })}
          </Group>

          {/* Title */}
          <Text
            x={width / 2}
            y={25}
            fontSize={20}
            fontWeight="bold"
            fill={textColor}
            textAnchor="middle"
          >
            KPI Metrics Heatmap
          </Text>

          {/* Subtitle */}
          <Text
            x={width / 2}
            y={48}
            fontSize={14}
            fill={textColor}
            textAnchor="middle"
            opacity={0.7}
          >
            Performance tracking across time periods
          </Text>
        </svg>

        {/* Tooltip */}
        {tooltipOpen && tooltipData && (
          <TooltipWithBounds
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              color: textColor,
              border: `2px solid ${COLORS.primary}`,
              borderRadius: '8px',
              padding: '12px 16px',
              minWidth: '220px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ fontSize: '16px', color: COLORS.primary }}>
                {tooltipData.metric}
              </strong>
            </div>
            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
              <strong>Period:</strong> {tooltipData.period}
            </div>
            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
              <strong>Value:</strong> {tooltipData.value.toLocaleString()}
              {tooltipData.unit && ` ${tooltipData.unit}`}
            </div>
            {tooltipData.target && (
              <div style={{ fontSize: '13px', marginBottom: '4px' }}>
                <strong>Target:</strong> {tooltipData.target.toLocaleString()}
                {tooltipData.unit && ` ${tooltipData.unit}`}
                <span
                  style={{
                    marginLeft: '8px',
                    color: tooltipData.value >= tooltipData.target ? COLORS.success : COLORS.danger,
                  }}
                >
                  ({((tooltipData.value / tooltipData.target) * 100).toFixed(1)}%)
                </span>
              </div>
            )}
            {tooltipData.trend && (
              <div style={{ fontSize: '13px', marginBottom: '4px' }}>
                <strong>Trend:</strong>{' '}
                <span style={{ color: getTrendColor(tooltipData.trend) }}>
                  {getTrendIcon(tooltipData.trend)} {tooltipData.trend}
                </span>
              </div>
            )}
            {tooltipData.category && (
              <div style={{ fontSize: '13px', marginBottom: '4px' }}>
                <strong>Category:</strong> {tooltipData.category}
              </div>
            )}
            {tooltipData.description && (
              <div style={{ fontSize: '12px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                {tooltipData.description}
              </div>
            )}
          </TooltipWithBounds>
        )}
      </div>
    </motion.div>
  );
};

export default MetricsGridVisx;
