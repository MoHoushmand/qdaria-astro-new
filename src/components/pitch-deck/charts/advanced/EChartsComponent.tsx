/**
 * EChartsComponent - Apache ECharts wrapper for complex business charts
 *
 * Best for: Market analysis, competitive matrices, complex time series,
 * multi-axis charts, heatmaps, 3D visualizations
 *
 * @example
 * <EChartsComponent
 *   type="multi-axis-line"
 *   data={marketGrowthData}
 *   title="Quantum Computing Market Growth"
 * />
 */

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import type { EChartsOption } from 'echarts';

// QDaria brand colors
const QDARIA_COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  tertiary: '#66FF00',
  accent: '#04a3ff',
  dark: '#1a1a1a',
  gray: '#666666',
};

interface EChartsComponentProps {
  type: 'multi-axis-line' | 'heatmap' | 'bubble' | 'waterfall' | 'stacked-area' | 'gauge' | '3d-bar';
  data: any;
  title?: string;
  subtitle?: string;
  height?: number | string;
  theme?: 'light' | 'dark';
  loading?: boolean;
  onChartReady?: (chart: any) => void;
  className?: string;
}

/**
 * Generate ECharts configuration based on chart type
 */
const getChartOption = (
  type: EChartsComponentProps['type'],
  data: any,
  title?: string,
  subtitle?: string,
  theme: 'light' | 'dark' = 'dark'
): EChartsOption => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const bgColor = isDark ? 'transparent' : '#ffffff';

  const baseOption: EChartsOption = {
    backgroundColor: bgColor,
    title: title ? {
      text: title,
      subtext: subtitle,
      textStyle: { color: textColor, fontSize: 20, fontWeight: 'bold' },
      subtextStyle: { color: QDARIA_COLORS.gray, fontSize: 14 },
    } : undefined,
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)',
      borderColor: QDARIA_COLORS.primary,
      borderWidth: 1,
      textStyle: { color: textColor },
    },
    legend: {
      textStyle: { color: textColor },
      top: title ? 50 : 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
  };

  switch (type) {
    case 'multi-axis-line':
      return {
        ...baseOption,
        xAxis: { type: 'category', data: data.labels, axisLabel: { color: textColor } },
        yAxis: [
          { type: 'value', name: data.yAxis1Name || 'Primary', axisLabel: { color: textColor }, nameTextStyle: { color: textColor } },
          { type: 'value', name: data.yAxis2Name || 'Secondary', axisLabel: { color: textColor }, nameTextStyle: { color: textColor } },
        ],
        series: data.series.map((s: any, idx: number) => ({
          name: s.name,
          type: 'line',
          yAxisIndex: s.yAxisIndex || 0,
          data: s.data,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3 },
          itemStyle: { color: s.color || QDARIA_COLORS[['primary', 'accent', 'secondary', 'tertiary'][idx % 4]] },
          areaStyle: s.showArea ? { opacity: 0.3 } : undefined,
        })),
      };

    case 'heatmap':
      return {
        ...baseOption,
        tooltip: { position: 'top' },
        xAxis: { type: 'category', data: data.xLabels, splitArea: { show: true }, axisLabel: { color: textColor } },
        yAxis: { type: 'category', data: data.yLabels, splitArea: { show: true }, axisLabel: { color: textColor } },
        visualMap: {
          min: data.min || 0,
          max: data.max || 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '5%',
          inRange: { color: [QDARIA_COLORS.dark, QDARIA_COLORS.tertiary, QDARIA_COLORS.primary] },
          textStyle: { color: textColor },
        },
        series: [{
          type: 'heatmap',
          data: data.data,
          label: { show: true, color: textColor },
          emphasis: { itemStyle: { shadowBlur: 10, shadowColor: QDARIA_COLORS.primary } },
        }],
      };

    case 'bubble':
      return {
        ...baseOption,
        xAxis: { type: 'value', name: data.xAxisName, axisLabel: { color: textColor }, nameTextStyle: { color: textColor } },
        yAxis: { type: 'value', name: data.yAxisName, axisLabel: { color: textColor }, nameTextStyle: { color: textColor } },
        series: data.series.map((s: any, idx: number) => ({
          name: s.name,
          type: 'scatter',
          symbolSize: (val: any) => val[2] * 2,
          data: s.data,
          itemStyle: { color: s.color || QDARIA_COLORS[['primary', 'accent', 'secondary', 'tertiary'][idx % 4]] },
          emphasis: { focus: 'series', blurScope: 'coordinateSystem' },
        })),
      };

    case 'waterfall':
      return {
        ...baseOption,
        xAxis: { type: 'category', data: data.labels, axisLabel: { color: textColor } },
        yAxis: { type: 'value', axisLabel: { color: textColor } },
        series: [{
          type: 'bar',
          stack: 'total',
          data: data.data.map((val: number, idx: number) => ({
            value: val,
            itemStyle: {
              color: val >= 0 ? QDARIA_COLORS.primary : '#ff4444',
              borderColor: QDARIA_COLORS.dark,
              borderWidth: 2,
            },
          })),
          label: { show: true, position: 'top', color: textColor },
        }],
      };

    case 'stacked-area':
      return {
        ...baseOption,
        xAxis: { type: 'category', boundaryGap: false, data: data.labels, axisLabel: { color: textColor } },
        yAxis: { type: 'value', axisLabel: { color: textColor } },
        series: data.series.map((s: any, idx: number) => ({
          name: s.name,
          type: 'line',
          stack: 'total',
          areaStyle: { opacity: 0.7 },
          emphasis: { focus: 'series' },
          smooth: true,
          data: s.data,
          itemStyle: { color: s.color || QDARIA_COLORS[['primary', 'secondary', 'tertiary', 'accent'][idx % 4]] },
        })),
      };

    case 'gauge':
      return {
        ...baseOption,
        series: [{
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: data.min || 0,
          max: data.max || 100,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 20,
              color: [[0.3, '#ff4444'], [0.7, QDARIA_COLORS.tertiary], [1, QDARIA_COLORS.primary]],
            },
          },
          pointer: { itemStyle: { color: QDARIA_COLORS.primary } },
          axisTick: { distance: -20, length: 8, lineStyle: { color: '#fff', width: 2 } },
          splitLine: { distance: -20, length: 20, lineStyle: { color: '#fff', width: 3 } },
          axisLabel: { color: textColor, distance: 25, fontSize: 12 },
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            color: QDARIA_COLORS.primary,
            fontSize: 30,
          },
          data: [{ value: data.value, name: data.name }],
        }],
      };

    case '3d-bar':
      return {
        ...baseOption,
        xAxis3D: { type: 'category', data: data.xLabels },
        yAxis3D: { type: 'category', data: data.yLabels },
        zAxis3D: { type: 'value' },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          viewControl: { projection: 'orthographic' },
          light: { main: { intensity: 1.2 }, ambient: { intensity: 0.3 } },
        },
        series: [{
          type: 'bar3D',
          data: data.data,
          shading: 'lambert',
          label: { textStyle: { fontSize: 16, borderWidth: 1 } },
          itemStyle: { opacity: 0.8 },
          emphasis: { label: { fontSize: 20, color: '#fff' }, itemStyle: { color: QDARIA_COLORS.primary } },
        }],
      };

    default:
      return baseOption;
  }
};

/**
 * EChartsComponent - Enterprise-grade Apache ECharts wrapper
 */
export const EChartsComponent: React.FC<EChartsComponentProps> = ({
  type,
  data,
  title,
  subtitle,
  height = 400,
  theme = 'dark',
  loading = false,
  onChartReady,
  className = '',
}) => {
  const option = useMemo(
    () => getChartOption(type, data, title, subtitle, theme),
    [type, data, title, subtitle, theme]
  );

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: QDARIA_COLORS.primary }} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <ReactECharts
        option={option}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        opts={{ renderer: 'canvas' }}
        onChartReady={onChartReady}
        notMerge={true}
        lazyUpdate={true}
      />
    </motion.div>
  );
};

export default EChartsComponent;
