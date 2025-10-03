/**
 * MarketSizeEChart - Market size projections with multiple scenarios
 *
 * Visualizes market size growth across different scenarios (conservative, moderate, aggressive)
 * with interactive comparisons and detailed tooltips
 *
 * @example
 * <MarketSizeEChart
 *   data={{
 *     years: ['2024', '2025', '2026', '2027', '2028'],
 *     scenarios: [
 *       { name: 'Conservative', values: [10, 15, 22, 30, 40], color: '#66FF00' },
 *       { name: 'Moderate', values: [10, 18, 28, 42, 62], color: '#CCFF00' },
 *       { name: 'Aggressive', values: [10, 22, 38, 62, 95], color: '#00d4ff' }
 *     ]
 *   }}
 *   height={500}
 * />
 */

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import type { EChartsOption } from 'echarts';

// QDaria brand colors - exact qdaria.com colors
const QDARIA_COLORS = {
  primary: '#04a3ff',      // Primary Blue
  cyan: '#00ffd3',         // Cyan
  green: '#65ff00',        // Lime Green
  accent: '#04a3ff',       // Accent Blue
  dark: '#000212',         // Background
  gray: 'rgba(229, 231, 235, 0.5)',
  lightGray: 'rgba(229, 231, 235, 0.7)',
};

export interface MarketScenario {
  name: string;
  values: number[];
  color?: string;
  description?: string;
}

export interface MarketSizeData {
  years: string[];
  scenarios: MarketScenario[];
  unit?: string; // e.g., 'Billion USD', 'Million EUR'
  segments?: {
    name: string;
    values: number[];
    color?: string;
  }[];
}

interface MarketSizeEChartProps {
  data: MarketSizeData;
  title?: string;
  subtitle?: string;
  height?: number | string;
  theme?: 'light' | 'dark';
  loading?: boolean;
  showArea?: boolean;
  showDataLabels?: boolean;
  className?: string;
  onChartReady?: (chart: any) => void;
}

/**
 * Generate market size chart configuration
 */
const getMarketSizeOption = (
  data: MarketSizeData,
  title?: string,
  subtitle?: string,
  theme: 'light' | 'dark' = 'dark',
  showArea: boolean = true,
  showDataLabels: boolean = false
): EChartsOption => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const bgColor = isDark ? 'transparent' : '#ffffff';
  const gridBgColor = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';

  const colors = [
    QDARIA_COLORS.primary,
    QDARIA_COLORS.cyan,
    QDARIA_COLORS.green,
    QDARIA_COLORS.accent,
    '#FF6B6B',
    '#4ECDC4',
  ];

  return {
    backgroundColor: bgColor,
    title: title ? {
      text: title,
      subtext: subtitle,
      left: 'center',
      textStyle: {
        color: textColor,
        fontSize: 24,
        fontWeight: 'bold',
      },
      subtextStyle: {
        color: QDARIA_COLORS.gray,
        fontSize: 14,
      },
    } : undefined,
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderColor: QDARIA_COLORS.primary,
      borderWidth: 2,
      textStyle: { color: textColor, fontSize: 14 },
      axisPointer: {
        type: 'cross',
        crossStyle: { color: QDARIA_COLORS.gray },
        lineStyle: { color: QDARIA_COLORS.primary, width: 1, type: 'dashed' },
      },
      formatter: (params: any) => {
        if (!Array.isArray(params)) return '';

        const year = params[0].axisValue;
        let tooltip = `<div style="font-weight: bold; margin-bottom: 8px; font-size: 16px; color: ${QDARIA_COLORS.primary}">${year}</div>`;

        params.forEach((param: any) => {
          const value = param.value;
          const unit = data.unit || 'B USD';
          const color = param.color;
          tooltip += `
            <div style="display: flex; align-items: center; margin: 6px 0;">
              <span style="display: inline-block; width: 12px; height: 12px; background: ${color}; border-radius: 50%; margin-right: 8px;"></span>
              <span style="flex: 1;">${param.seriesName}:</span>
              <span style="font-weight: bold; margin-left: 12px; color: ${color};">${value.toFixed(1)} ${unit}</span>
            </div>
          `;
        });

        return tooltip;
      },
    },
    legend: {
      data: data.scenarios.map(s => s.name),
      top: title ? 60 : 20,
      left: 'center',
      textStyle: { color: textColor, fontSize: 14 },
      itemGap: 20,
      icon: 'roundRect',
      itemWidth: 30,
      itemHeight: 4,
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: title ? 100 : 60,
      containLabel: true,
      backgroundColor: gridBgColor,
      show: true,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },
    xAxis: {
      type: 'category',
      data: data.years,
      boundaryGap: false,
      axisLine: {
        lineStyle: { color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', width: 2 },
      },
      axisLabel: {
        color: textColor,
        fontSize: 13,
        fontWeight: 'bold',
      },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: data.unit ? `Market Size (${data.unit})` : 'Market Size',
      nameTextStyle: {
        color: textColor,
        fontSize: 13,
        padding: [0, 0, 0, -60],
      },
      axisLine: {
        show: true,
        lineStyle: { color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', width: 2 },
      },
      axisLabel: {
        color: textColor,
        fontSize: 12,
        formatter: (value: number) => value.toFixed(0),
      },
      splitLine: {
        lineStyle: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          type: 'dashed',
        },
      },
    },
    series: data.scenarios.map((scenario, index) => ({
      name: scenario.name,
      type: 'line',
      data: scenario.values,
      smooth: true,
      symbol: 'circle',
      symbolSize: 10,
      lineStyle: {
        width: 4,
        shadowColor: scenario.color || colors[index],
        shadowBlur: 10,
        shadowOffsetY: 5,
      },
      itemStyle: {
        color: scenario.color || colors[index],
        borderWidth: 3,
        borderColor: bgColor,
      },
      areaStyle: showArea ? {
        opacity: 0.25,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: scenario.color || colors[index] },
            { offset: 1, color: 'transparent' },
          ],
        },
      } : undefined,
      emphasis: {
        focus: 'series',
        itemStyle: {
          borderWidth: 4,
          shadowBlur: 15,
          shadowColor: scenario.color || colors[index],
        },
      },
      label: showDataLabels ? {
        show: true,
        position: 'top',
        color: textColor,
        fontSize: 11,
        formatter: (params: any) => `${params.value.toFixed(1)}`,
      } : undefined,
    })),
  };
};

/**
 * MarketSizeEChart Component - Market size projections visualization
 */
export const MarketSizeEChart: React.FC<MarketSizeEChartProps> = ({
  data,
  title = 'Market Size Projections',
  subtitle,
  height = 500,
  theme = 'dark',
  loading = false,
  showArea = true,
  showDataLabels = false,
  className = '',
  onChartReady,
}) => {
  const option = useMemo(
    () => getMarketSizeOption(data, title, subtitle, theme, showArea, showDataLabels),
    [data, title, subtitle, theme, showArea, showDataLabels]
  );

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: QDARIA_COLORS.primary }}
          />
          <p style={{ color: QDARIA_COLORS.gray }}>Loading market data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      <ReactECharts
        option={option}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        opts={{ renderer: 'canvas', devicePixelRatio: 2 }}
        onChartReady={onChartReady}
        notMerge={true}
        lazyUpdate={true}
      />
    </motion.div>
  );
};

export default MarketSizeEChart;
