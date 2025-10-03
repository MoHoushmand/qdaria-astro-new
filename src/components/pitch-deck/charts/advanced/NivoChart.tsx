/**
 * NivoChart - Nivo beautiful charts with animations
 *
 * Best for: Customer distribution, industry breakdown, KPI dashboards,
 * beautiful declarative charts with smooth animations
 *
 * @example
 * <NivoChart
 *   type="pie"
 *   data={industryDistributionData}
 *   title="Market Distribution by Industry"
 * />
 */

import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveRadar } from '@nivo/radar';
import { motion } from 'framer-motion';

// QDaria brand colors
const QDARIA_COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  tertiary: '#66FF00',
  accent: '#04a3ff',
  dark: '#1a1a1a',
  gray: '#666666',
  palette: ['#CCFF00', '#04a3ff', '#9AFF00', '#66FF00', '#FF00FF', '#FF6B00'],
};

interface NivoChartProps {
  type: 'pie' | 'donut' | 'line' | 'bar' | 'stacked-bar' | 'radar' | 'area';
  data: any;
  title?: string;
  height?: number;
  theme?: 'light' | 'dark';
  animate?: boolean;
  interactive?: boolean;
  className?: string;
  colors?: string[];
}

/**
 * Get Nivo theme configuration
 */
const getNivoTheme = (theme: 'light' | 'dark' = 'dark') => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return {
    background: 'transparent',
    text: { fill: textColor, fontSize: 14, fontWeight: 500, fontFamily: "'Inter', system-ui, sans-serif" },
    axis: {
      domain: { line: { stroke: gridColor, strokeWidth: 1 } },
      legend: { text: { fill: textColor, fontSize: 16, fontWeight: 600, fontFamily: "'Inter', system-ui, sans-serif" } },
      ticks: {
        line: { stroke: gridColor, strokeWidth: 1 },
        text: { fill: textColor, fontSize: 14, fontWeight: 500, fontFamily: "'Inter', system-ui, sans-serif" },
      },
    },
    grid: { line: { stroke: gridColor, strokeWidth: 1 } },
    legends: {
      text: { fill: textColor, fontSize: 14, fontWeight: 500, fontFamily: "'Inter', system-ui, sans-serif" },
    },
    tooltip: {
      container: {
        background: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        color: textColor,
        fontSize: 16,
        fontFamily: "'Inter', system-ui, sans-serif",
        borderRadius: 4,
        boxShadow: `0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px ${QDARIA_COLORS.primary}`,
        padding: '12px 16px',
      },
    },
    crosshair: { line: { stroke: QDARIA_COLORS.primary, strokeWidth: 1, strokeOpacity: 0.75 } },
  };
};

/**
 * Pie/Donut Chart Component
 */
const PieChart: React.FC<{ data: any; isDonut?: boolean; theme: any; colors: string[]; animate: boolean }> = ({
  data,
  isDonut = false,
  theme,
  colors,
  animate,
}) => (
  <ResponsivePie
    data={data}
    theme={theme}
    colors={colors}
    margin={{ top: 40, right: 100, bottom: 80, left: 100 }}
    innerRadius={isDonut ? 0.6 : 0}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={2}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor={theme.text.fill}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
    enableArcLinkLabels={!isDonut}
    animate={animate}
    motionConfig="gentle"
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: theme.text.fill,
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
      },
    ]}
  />
);

/**
 * Line Chart Component
 */
const LineChart: React.FC<{ data: any; theme: any; colors: string[]; animate: boolean; isArea?: boolean }> = ({
  data,
  theme,
  colors,
  animate,
  isArea = false,
}) => (
  <ResponsiveLine
    data={data}
    theme={theme}
    colors={colors}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
    curve="catmullRom"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'X Axis',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Y Axis',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    enableGridX={false}
    enableGridY={true}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    enableArea={isArea}
    areaOpacity={0.3}
    useMesh={true}
    animate={animate}
    motionConfig="gentle"
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
      },
    ]}
  />
);

/**
 * Bar Chart Component
 */
const BarChart: React.FC<{ data: any; theme: any; colors: string[]; animate: boolean; stacked?: boolean; keys: string[] }> = ({
  data,
  theme,
  colors,
  animate,
  stacked = false,
  keys,
}) => (
  <ResponsiveBar
    data={data}
    theme={theme}
    keys={keys}
    indexBy="label"
    colors={colors}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    groupMode={stacked ? 'stacked' : 'grouped'}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Category',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Value',
      legendPosition: 'middle',
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
    animate={animate}
    motionConfig="gentle"
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
      },
    ]}
  />
);

/**
 * Radar Chart Component
 */
const RadarChart: React.FC<{ data: any; theme: any; colors: string[]; animate: boolean; keys: string[] }> = ({
  data,
  theme,
  colors,
  animate,
  keys,
}) => (
  <ResponsiveRadar
    data={data}
    theme={theme}
    keys={keys}
    indexBy="metric"
    colors={colors}
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    borderColor={{ from: 'color' }}
    gridLabelOffset={36}
    dotSize={10}
    dotColor={{ theme: 'background' }}
    dotBorderWidth={2}
    dotBorderColor={{ from: 'color' }}
    enableDotLabel={true}
    dotLabel="value"
    dotLabelYOffset={-12}
    fillOpacity={0.25}
    blendMode="multiply"
    animate={animate}
    motionConfig="gentle"
    legends={[
      {
        anchor: 'top-left',
        direction: 'column',
        translateX: -50,
        translateY: -40,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: theme.text.fill,
        symbolSize: 12,
        symbolShape: 'circle',
      },
    ]}
  />
);

/**
 * NivoChart Component - Beautiful animated charts
 */
export const NivoChart: React.FC<NivoChartProps> = ({
  type,
  data,
  title,
  height = 400,
  theme = 'dark',
  animate = true,
  interactive = true,
  className = '',
  colors = QDARIA_COLORS.palette,
}) => {
  const nivoTheme = getNivoTheme(theme);

  const renderChart = () => {
    switch (type) {
      case 'pie':
        return <PieChart data={data} theme={nivoTheme} colors={colors} animate={animate} />;

      case 'donut':
        return <PieChart data={data} isDonut={true} theme={nivoTheme} colors={colors} animate={animate} />;

      case 'line':
        return <LineChart data={data} theme={nivoTheme} colors={colors} animate={animate} />;

      case 'area':
        return <LineChart data={data} theme={nivoTheme} colors={colors} animate={animate} isArea={true} />;

      case 'bar':
        return <BarChart data={data} theme={nivoTheme} colors={colors} animate={animate} keys={data.keys || ['value']} />;

      case 'stacked-bar':
        return <BarChart data={data} theme={nivoTheme} colors={colors} animate={animate} stacked={true} keys={data.keys} />;

      case 'radar':
        return <RadarChart data={data} theme={nivoTheme} colors={colors} animate={animate} keys={data.keys} />;

      default:
        return <div>Unsupported chart type: {type}</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {title && (
        <h3 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#fff' : '#333' }}>
          {title}
        </h3>
      )}
      <div style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </motion.div>
  );
};

export default NivoChart;
