/**
 * GrowthTrajectoryVisx - Multi-axis line chart for growth metrics using Visx
 *
 * Features:
 * - Multiple data series with different scales
 * - Dual Y-axes for different metric types
 * - Area fills under lines
 * - Interactive tooltips with all series data
 * - Legend with series toggling
 * - Forecast projections with shaded confidence intervals
 * - Milestone markers on timeline
 * - Responsive scaling
 * - Business plan theme styling
 */

import React, { useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft, AxisRight } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LinePath, AreaClosed, Line } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { Text } from '@visx/text';
import { motion } from 'framer-motion';

// Business plan brand colors
const COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  accent: '#00d4ff',
  tertiary: '#ff00ff',
  quaternary: '#ff8c00',
  success: '#00ff88',
  warning: '#ffd700',
  dark: '#1a1a1a',
  gray: '#666666',
};

const SERIES_COLORS = [
  COLORS.primary,
  COLORS.accent,
  COLORS.tertiary,
  COLORS.quaternary,
  COLORS.success,
  COLORS.secondary,
];

export interface DataSeries {
  id: string;
  name: string;
  data: DataPoint[];
  color?: string;
  axis: 'left' | 'right';
  unit?: string;
  isForecast?: boolean;
  confidenceInterval?: {
    upper: number[];
    lower: number[];
  };
}

export interface DataPoint {
  date: Date;
  value: number;
}

export interface Milestone {
  date: Date;
  label: string;
  description?: string;
}

interface GrowthTrajectoryVisxProps {
  series: DataSeries[];
  milestones?: Milestone[];
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
  showGrid?: boolean;
  showArea?: boolean;
  showLegend?: boolean;
  showConfidenceInterval?: boolean;
  className?: string;
  leftAxisLabel?: string;
  rightAxisLabel?: string;
  title?: string;
}

const margin = { top: 80, right: 100, bottom: 80, left: 80 };

interface TooltipData {
  date: Date;
  series: Array<{ name: string; value: number; color: string; unit?: string }>;
}

export const GrowthTrajectoryVisx: React.FC<GrowthTrajectoryVisxProps> = ({
  series,
  milestones = [],
  width = 1200,
  height = 600,
  theme = 'dark',
  showGrid = true,
  showArea = true,
  showLegend = true,
  showConfidenceInterval = true,
  className = '',
  leftAxisLabel = 'Primary Metrics',
  rightAxisLabel = 'Secondary Metrics',
  title = 'Growth Trajectory',
}) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<TooltipData>();

  const [visibleSeries, setVisibleSeries] = useState<Set<string>>(
    new Set(series.map(s => s.id))
  );

  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const bgColor = isDark ? COLORS.dark : '#ffffff';

  // Calculate dimensions
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Assign colors to series
  const seriesWithColors = useMemo(
    () =>
      series.map((s, i) => ({
        ...s,
        color: s.color || SERIES_COLORS[i % SERIES_COLORS.length],
      })),
    [series]
  );

  // Filter visible series
  const filteredSeries = useMemo(
    () => seriesWithColors.filter(s => visibleSeries.has(s.id)),
    [seriesWithColors, visibleSeries]
  );

  // Get all dates
  const allDates = useMemo(() => {
    const dates = filteredSeries.flatMap(s => s.data.map(d => d.date));
    return dates.sort((a, b) => a.getTime() - b.getTime());
  }, [filteredSeries]);

  // Time scale (X-axis)
  const timeScale = useMemo(() => {
    if (allDates.length === 0) return scaleTime({ domain: [new Date(), new Date()], range: [0, xMax] });

    const minDate = allDates[0];
    const maxDate = allDates[allDates.length - 1];

    return scaleTime({
      domain: [minDate, maxDate],
      range: [0, xMax],
      nice: true,
    });
  }, [allDates, xMax]);

  // Left Y-axis scale
  const leftSeries = filteredSeries.filter(s => s.axis === 'left');
  const leftYScale = useMemo(() => {
    const values = leftSeries.flatMap(s => s.data.map(d => d.value));
    if (values.length === 0) return scaleLinear({ domain: [0, 100], range: [yMax, 0] });

    const maxValue = Math.max(...values);
    const minValue = Math.min(...values, 0);

    return scaleLinear({
      domain: [minValue * 0.9, maxValue * 1.1],
      range: [yMax, 0],
      nice: true,
    });
  }, [leftSeries, yMax]);

  // Right Y-axis scale
  const rightSeries = filteredSeries.filter(s => s.axis === 'right');
  const rightYScale = useMemo(() => {
    const values = rightSeries.flatMap(s => s.data.map(d => d.value));
    if (values.length === 0) return scaleLinear({ domain: [0, 100], range: [yMax, 0] });

    const maxValue = Math.max(...values);
    const minValue = Math.min(...values, 0);

    return scaleLinear({
      domain: [minValue * 0.9, maxValue * 1.1],
      range: [yMax, 0],
      nice: true,
    });
  }, [rightSeries, yMax]);

  const getYScale = (axis: 'left' | 'right') => (axis === 'left' ? leftYScale : rightYScale);

  const toggleSeries = (seriesId: string) => {
    setVisibleSeries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(seriesId)) {
        newSet.delete(seriesId);
      } else {
        newSet.add(seriesId);
      }
      return newSet;
    });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGRectElement>) => {
    const point = localPoint(event);
    if (!point) return;

    const x = point.x - margin.left;
    const date = timeScale.invert(x);

    // Find closest data points for each series
    const seriesData = filteredSeries.map(s => {
      const closestPoint = s.data.reduce((prev, curr) => {
        const prevDiff = Math.abs(prev.date.getTime() - date.getTime());
        const currDiff = Math.abs(curr.date.getTime() - date.getTime());
        return currDiff < prevDiff ? curr : prev;
      });

      return {
        name: s.name,
        value: closestPoint.value,
        color: s.color!,
        unit: s.unit,
      };
    });

    showTooltip({
      tooltipData: { date, series: seriesData },
      tooltipLeft: point.x,
      tooltipTop: point.y,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <div style={{ position: 'relative', background: bgColor, borderRadius: '8px', padding: '20px' }}>
        <svg width={width} height={height}>
          {/* Gradients for area fills */}
          {seriesWithColors.map((s, i) => (
            <LinearGradient
              key={`gradient-${i}`}
              id={`area-gradient-${i}`}
              from={s.color!}
              to={s.color!}
              fromOpacity={0.4}
              toOpacity={0.1}
            />
          ))}

          <Group left={margin.left} top={margin.top}>
            {/* Grid */}
            {showGrid && (
              <>
                <GridRows
                  scale={leftYScale}
                  width={xMax}
                  stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                />
                <GridColumns
                  scale={timeScale}
                  height={yMax}
                  stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                />
              </>
            )}

            {/* Confidence intervals */}
            {showConfidenceInterval &&
              filteredSeries.map((s, i) => {
                if (!s.confidenceInterval || !s.isForecast) return null;

                const yScale = getYScale(s.axis);
                const upperPath = s.data
                  .map((d, idx) => ({
                    x: timeScale(d.date),
                    y: yScale(s.confidenceInterval!.upper[idx] || d.value),
                  }))
                  .filter(d => !isNaN(d.x) && !isNaN(d.y));

                const lowerPath = s.data
                  .map((d, idx) => ({
                    x: timeScale(d.date),
                    y: yScale(s.confidenceInterval!.lower[idx] || d.value),
                  }))
                  .filter(d => !isNaN(d.x) && !isNaN(d.y))
                  .reverse();

                const pathData = [...upperPath, ...lowerPath];

                return (
                  <polygon
                    key={`confidence-${i}`}
                    points={pathData.map(p => `${p.x},${p.y}`).join(' ')}
                    fill={s.color}
                    opacity={0.15}
                  />
                );
              })}

            {/* Area fills */}
            {showArea &&
              filteredSeries.map((s, i) => {
                if (s.isForecast) return null; // Don't show area for forecasts
                const yScale = getYScale(s.axis);

                return (
                  <AreaClosed
                    key={`area-${i}`}
                    data={s.data}
                    x={d => timeScale(d.date)}
                    y={d => yScale(d.value)}
                    yScale={yScale}
                    strokeWidth={0}
                    fill={`url(#area-gradient-${i})`}
                    curve={curveMonotoneX}
                  />
                );
              })}

            {/* Lines */}
            {filteredSeries.map((s, i) => {
              const yScale = getYScale(s.axis);

              return (
                <LinePath
                  key={`line-${i}`}
                  data={s.data}
                  x={d => timeScale(d.date)}
                  y={d => yScale(d.value)}
                  stroke={s.color}
                  strokeWidth={s.isForecast ? 2 : 3}
                  strokeDasharray={s.isForecast ? '5,5' : undefined}
                  curve={curveMonotoneX}
                  opacity={s.isForecast ? 0.7 : 1}
                />
              );
            })}

            {/* Data points */}
            {filteredSeries.map((s, i) => {
              if (s.isForecast) return null; // Don't show points for forecasts
              const yScale = getYScale(s.axis);

              return s.data.map((d, j) => (
                <circle
                  key={`point-${i}-${j}`}
                  cx={timeScale(d.date)}
                  cy={yScale(d.value)}
                  r={4}
                  fill={s.color}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ));
            })}

            {/* Milestones */}
            {milestones.map((milestone, i) => {
              const x = timeScale(milestone.date);

              return (
                <Group key={`milestone-${i}`}>
                  <Line
                    from={{ x, y: 0 }}
                    to={{ x, y: yMax }}
                    stroke={COLORS.warning}
                    strokeWidth={2}
                    strokeDasharray="4,4"
                    opacity={0.5}
                  />
                  <circle cx={x} cy={-10} r={6} fill={COLORS.warning} />
                  <Text
                    x={x}
                    y={-20}
                    fontSize={10}
                    fill={textColor}
                    textAnchor="middle"
                  >
                    {milestone.label}
                  </Text>
                </Group>
              );
            })}

            {/* Interactive overlay */}
            <rect
              x={0}
              y={0}
              width={xMax}
              height={yMax}
              fill="transparent"
              onMouseMove={handleMouseMove}
              onMouseLeave={hideTooltip}
            />

            {/* Axes */}
            <AxisBottom
              top={yMax}
              scale={timeScale}
              stroke={textColor}
              tickStroke={textColor}
              numTicks={8}
              tickLabelProps={() => ({
                fill: textColor,
                fontSize: 11,
                textAnchor: 'middle',
              })}
              tickFormat={(date) => {
                const d = date as Date;
                return `${d.getMonth() + 1}/${d.getFullYear().toString().slice(2)}`;
              }}
            />

            {leftSeries.length > 0 && (
              <AxisLeft
                scale={leftYScale}
                stroke={textColor}
                tickStroke={textColor}
                numTicks={6}
                tickLabelProps={() => ({
                  fill: textColor,
                  fontSize: 11,
                  textAnchor: 'end',
                  dx: '-0.25em',
                  dy: '0.25em',
                })}
                label={leftAxisLabel}
                labelProps={{
                  fill: textColor,
                  fontSize: 13,
                  textAnchor: 'middle',
                }}
              />
            )}

            {rightSeries.length > 0 && (
              <AxisRight
                left={xMax}
                scale={rightYScale}
                stroke={textColor}
                tickStroke={textColor}
                numTicks={6}
                tickLabelProps={() => ({
                  fill: textColor,
                  fontSize: 11,
                  textAnchor: 'start',
                  dx: '0.25em',
                  dy: '0.25em',
                })}
                label={rightAxisLabel}
                labelProps={{
                  fill: textColor,
                  fontSize: 13,
                  textAnchor: 'middle',
                }}
              />
            )}
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
            {title}
          </Text>

          {/* Legend */}
          {showLegend && (
            <Group left={margin.left} top={height - margin.bottom + 40}>
              {seriesWithColors.map((s, i) => {
                const x = (i % 4) * 250;
                const y = Math.floor(i / 4) * 25;
                const isVisible = visibleSeries.has(s.id);

                return (
                  <Group
                    key={`legend-${i}`}
                    left={x}
                    top={y}
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleSeries(s.id)}
                    opacity={isVisible ? 1 : 0.4}
                  >
                    <rect
                      x={0}
                      y={-8}
                      width={20}
                      height={3}
                      fill={s.color}
                      strokeDasharray={s.isForecast ? '3,3' : ''}
                    />
                    <Text
                      x={28}
                      y={0}
                      fontSize={12}
                      fill={textColor}
                      verticalAnchor="middle"
                    >
                      {`${s.name}${s.isForecast ? ' (forecast)' : ''}`}
                    </Text>
                  </Group>
                );
              })}
            </Group>
          )}
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
              minWidth: '200px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ fontSize: '14px' }}>
                {tooltipData.date.toLocaleDateString()}
              </strong>
            </div>
            {tooltipData.series.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4px',
                  fontSize: '13px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '3px',
                    backgroundColor: s.color,
                    marginRight: '8px',
                  }}
                />
                <span>
                  {s.name}: <strong>{s.value.toLocaleString()}</strong>
                  {s.unit && ` ${s.unit}`}
                </span>
              </div>
            ))}
          </TooltipWithBounds>
        )}
      </div>
    </motion.div>
  );
};

export default GrowthTrajectoryVisx;
