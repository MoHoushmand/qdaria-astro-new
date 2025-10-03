/**
 * VisxChart - visx low-level composable components for custom charts
 *
 * Best for: Custom branded charts matching QDaria aesthetic,
 * highly customized visualizations, financial projections
 *
 * @example
 * <VisxChart
 *   type="branded-line"
 *   data={revenueProjectionData}
 *   title="Revenue Projections"
 * />
 */

import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LinePath, AreaClosed } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { motion } from 'framer-motion';

// QDaria brand colors
const QDARIA_COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  tertiary: '#66FF00',
  accent: '#04a3ff',
  dark: '#1a1a1a',
  gray: '#666666',
};

interface DataPoint {
  label: string;
  value: number;
  x?: number;
  y?: number;
}

interface VisxChartProps {
  type: 'branded-line' | 'gradient-bar' | 'animated-area' | 'custom-combo';
  data: DataPoint[];
  width?: number;
  height?: number;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  theme?: 'light' | 'dark';
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
  showGrid?: boolean;
  animate?: boolean;
}

// Margin configuration
const margin = { top: 40, right: 40, bottom: 60, left: 80 };

/**
 * Branded Line Chart with QDaria styling
 */
const BrandedLineChart: React.FC<{
  data: DataPoint[];
  width: number;
  height: number;
  color: string;
  theme: 'light' | 'dark';
  showGrid: boolean;
}> = ({ data, width, height, color, theme, showGrid }) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<DataPoint>();

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: data.map((d) => d.label),
        padding: 0.2,
      }),
    [xMax, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, Math.max(...data.map((d) => d.value)) * 1.1],
        nice: true,
      }),
    [yMax, data]
  );

  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <LinearGradient id="area-gradient" from={color} to={color} fromOpacity={0.4} toOpacity={0.1} />
        <Group left={margin.left} top={margin.top}>
          {showGrid && <GridRows scale={yScale} width={xMax} stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />}

          <AreaClosed
            data={data}
            x={(d) => xScale(d.label)! + xScale.bandwidth() / 2}
            y={(d) => yScale(d.value)}
            yScale={yScale}
            strokeWidth={0}
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />

          <LinePath
            data={data}
            x={(d) => xScale(d.label)! + xScale.bandwidth() / 2}
            y={(d) => yScale(d.value)}
            stroke={color}
            strokeWidth={3}
            curve={curveMonotoneX}
          />

          {data.map((d, i) => (
            <circle
              key={`point-${i}`}
              cx={xScale(d.label)! + xScale.bandwidth() / 2}
              cy={yScale(d.value)}
              r={6}
              fill={color}
              stroke="#fff"
              strokeWidth={2}
              style={{ cursor: 'pointer' }}
              onMouseMove={(event) => {
                const point = localPoint(event);
                if (point) {
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: point.x,
                    tooltipTop: point.y,
                  });
                }
              }}
              onMouseLeave={hideTooltip}
            />
          ))}

          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke={textColor}
            tickStroke={textColor}
            tickLabelProps={() => ({
              fill: textColor,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Inter', system-ui, sans-serif",
              textAnchor: 'middle',
            })}
          />

          <AxisLeft
            scale={yScale}
            stroke={textColor}
            tickStroke={textColor}
            tickLabelProps={() => ({
              fill: textColor,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Inter', system-ui, sans-serif",
              textAnchor: 'end',
              dx: '-0.25em',
              dy: '0.25em',
            })}
          />
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            color: textColor,
            border: `1px solid ${color}`,
            borderRadius: '4px',
            padding: '8px 12px',
          }}
        >
          <div>
            <strong>{tooltipData.label}</strong>
          </div>
          <div>{tooltipData.value.toLocaleString()}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
};

/**
 * Gradient Bar Chart with animations
 */
const GradientBarChart: React.FC<{
  data: DataPoint[];
  width: number;
  height: number;
  gradientFrom: string;
  gradientTo: string;
  theme: 'light' | 'dark';
  showGrid: boolean;
}> = ({ data, width, height, gradientFrom, gradientTo, theme, showGrid }) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<DataPoint>();

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: data.map((d) => d.label),
        padding: 0.3,
      }),
    [xMax, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, Math.max(...data.map((d) => d.value)) * 1.1],
        nice: true,
      }),
    [yMax, data]
  );

  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <LinearGradient id="bar-gradient" from={gradientFrom} to={gradientTo} />
        <Group left={margin.left} top={margin.top}>
          {showGrid && <GridRows scale={yScale} width={xMax} stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />}

          {data.map((d, i) => {
            const barHeight = yMax - yScale(d.value);
            const barX = xScale(d.label)!;
            const barY = yMax - barHeight;

            return (
              <Bar
                key={`bar-${i}`}
                x={barX}
                y={barY}
                width={xScale.bandwidth()}
                height={barHeight}
                fill="url(#bar-gradient)"
                stroke="#fff"
                strokeWidth={2}
                rx={4}
                style={{ cursor: 'pointer' }}
                onMouseMove={(event) => {
                  const point = localPoint(event);
                  if (point) {
                    showTooltip({
                      tooltipData: d,
                      tooltipLeft: point.x,
                      tooltipTop: point.y,
                    });
                  }
                }}
                onMouseLeave={hideTooltip}
              />
            );
          })}

          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke={textColor}
            tickStroke={textColor}
            tickLabelProps={() => ({
              fill: textColor,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Inter', system-ui, sans-serif",
              textAnchor: 'middle',
            })}
          />

          <AxisLeft
            scale={yScale}
            stroke={textColor}
            tickStroke={textColor}
            tickLabelProps={() => ({
              fill: textColor,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Inter', system-ui, sans-serif",
              textAnchor: 'end',
              dx: '-0.25em',
              dy: '0.25em',
            })}
            numTicks={5}
          />
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            color: textColor,
            border: `1px solid ${gradientFrom}`,
            borderRadius: '4px',
            padding: '8px 12px',
          }}
        >
          <div>
            <strong>{tooltipData.label}</strong>
          </div>
          <div>{tooltipData.value.toLocaleString()}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
};

/**
 * VisxChart Component - Custom branded visualizations
 */
export const VisxChart: React.FC<VisxChartProps> = ({
  type,
  data,
  width = 800,
  height = 400,
  title,
  xLabel,
  yLabel,
  theme = 'dark',
  color = QDARIA_COLORS.primary,
  gradientFrom = QDARIA_COLORS.primary,
  gradientTo = QDARIA_COLORS.accent,
  className = '',
  showGrid = true,
  animate = true,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'branded-line':
      case 'animated-area':
        return (
          <BrandedLineChart
            data={data}
            width={width}
            height={height}
            color={color}
            theme={theme}
            showGrid={showGrid}
          />
        );

      case 'gradient-bar':
        return (
          <GradientBarChart
            data={data}
            width={width}
            height={height}
            gradientFrom={gradientFrom}
            gradientTo={gradientTo}
            theme={theme}
            showGrid={showGrid}
          />
        );

      case 'custom-combo':
        // Combination chart would combine multiple visx components
        return (
          <BrandedLineChart
            data={data}
            width={width}
            height={height}
            color={color}
            theme={theme}
            showGrid={showGrid}
          />
        );

      default:
        return <div>Unsupported chart type: {type}</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {title && (
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: theme === 'dark' ? '#fff' : '#333' }}
        >
          {title}
        </h3>
      )}
      {renderChart()}
    </motion.div>
  );
};

export default VisxChart;
