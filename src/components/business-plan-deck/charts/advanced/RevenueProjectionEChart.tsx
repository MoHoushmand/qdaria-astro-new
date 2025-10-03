/**
 * RevenueProjectionEChart - Revenue growth visualization with multiple metrics
 *
 * Displays revenue projections with breakdown by categories, growth rates,
 * and cumulative totals. Supports multiple revenue streams and interactive exploration.
 *
 * @example
 * <RevenueProjectionEChart
 *   data={{
 *     years: ['2024', '2025', '2026', '2027', '2028'],
 *     revenueStreams: [
 *       { name: 'Product Sales', values: [5, 12, 25, 45, 75] },
 *       { name: 'Subscriptions', values: [2, 8, 18, 32, 55] },
 *       { name: 'Services', values: [1, 4, 10, 20, 35] }
 *     ],
 *     growthRates: [0, 180, 145, 120, 95]
 *   }}
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
  accent: '#00d4ff',
  dark: '#1a1a1a',
  gray: '#666666',
  lightGray: '#999999',
};

export interface RevenueStream {
  name: string;
  values: number[];
  color?: string;
  description?: string;
}

export interface RevenueProjectionData {
  years: string[];
  revenueStreams: RevenueStream[];
  growthRates?: number[]; // Year-over-year growth percentages
  unit?: string; // e.g., 'Million USD', 'Thousand EUR'
  targets?: number[]; // Target revenue for each year
}

interface RevenueProjectionEChartProps {
  data: RevenueProjectionData;
  title?: string;
  subtitle?: string;
  height?: number | string;
  theme?: 'light' | 'dark';
  loading?: boolean;
  showGrowthRate?: boolean;
  showTargets?: boolean;
  stackMode?: 'stack' | 'separate';
  className?: string;
  onChartReady?: (chart: any) => void;
}

/**
 * Generate revenue projection chart configuration
 */
const getRevenueProjectionOption = (
  data: RevenueProjectionData,
  title?: string,
  subtitle?: string,
  theme: 'light' | 'dark' = 'dark',
  showGrowthRate: boolean = true,
  showTargets: boolean = true,
  stackMode: 'stack' | 'separate' = 'stack'
): EChartsOption => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const bgColor = isDark ? 'transparent' : '#ffffff';
  const gridBgColor = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';

  const colors = [
    QDARIA_COLORS.primary,
    QDARIA_COLORS.accent,
    QDARIA_COLORS.tertiary,
    QDARIA_COLORS.secondary,
    '#FF6B6B',
    '#4ECDC4',
    '#95E1D3',
  ];

  // Calculate totals for each year
  const totals = data.years.map((_, yearIndex) =>
    data.revenueStreams.reduce((sum, stream) => sum + stream.values[yearIndex], 0)
  );

  const series: any[] = [];

  // Add revenue stream series
  data.revenueStreams.forEach((stream, index) => {
    series.push({
      name: stream.name,
      type: 'bar',
      stack: stackMode === 'stack' ? 'total' : undefined,
      data: stream.values,
      barMaxWidth: 60,
      itemStyle: {
        color: stream.color || colors[index % colors.length],
        borderRadius: stackMode === 'stack' ? (
          index === data.revenueStreams.length - 1 ? [4, 4, 0, 0] : undefined
        ) : [4, 4, 4, 4],
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          shadowBlur: 15,
          shadowColor: stream.color || colors[index % colors.length],
        },
      },
      label: stackMode === 'separate' ? {
        show: true,
        position: 'top',
        color: textColor,
        fontSize: 11,
        formatter: (params: any) => `${params.value.toFixed(1)}`,
      } : undefined,
    });
  });

  // Add growth rate line if enabled
  if (showGrowthRate && data.growthRates) {
    series.push({
      name: 'Growth Rate',
      type: 'line',
      yAxisIndex: 1,
      data: data.growthRates,
      smooth: true,
      symbol: 'diamond',
      symbolSize: 10,
      lineStyle: {
        width: 3,
        type: 'dashed',
        color: '#FF6B6B',
      },
      itemStyle: {
        color: '#FF6B6B',
        borderWidth: 2,
        borderColor: bgColor,
      },
      label: {
        show: true,
        position: 'top',
        color: '#FF6B6B',
        fontSize: 11,
        formatter: (params: any) => `${params.value.toFixed(0)}%`,
      },
    });
  }

  // Add target line if enabled
  if (showTargets && data.targets) {
    series.push({
      name: 'Target',
      type: 'line',
      data: data.targets,
      smooth: true,
      symbol: 'triangle',
      symbolSize: 12,
      lineStyle: {
        width: 3,
        type: 'solid',
        color: QDARIA_COLORS.secondary,
      },
      itemStyle: {
        color: QDARIA_COLORS.secondary,
        borderWidth: 2,
        borderColor: bgColor,
      },
      markLine: {
        silent: true,
        symbol: 'none',
        lineStyle: { color: QDARIA_COLORS.secondary, type: 'dashed', width: 2 },
        label: { show: false },
      },
    });
  }

  const yAxisConfig = [
    {
      type: 'value' as const,
      name: data.unit ? `Revenue (${data.unit})` : 'Revenue',
      nameTextStyle: {
        color: textColor,
        fontSize: 13,
        padding: [0, 0, 0, -50],
      },
      position: 'left' as const,
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
          type: 'dashed' as const,
        },
      },
    },
  ];

  if (showGrowthRate && data.growthRates) {
    yAxisConfig.push({
      type: 'value' as const,
      name: 'Growth Rate (%)',
      nameTextStyle: {
        color: '#FF6B6B',
        fontSize: 13,
        padding: [0, -50, 0, 0],
      },
      position: 'right' as const,
      axisLine: {
        show: true,
        lineStyle: { color: 'rgba(255, 107, 107, 0.3)', width: 2 },
      },
      axisLabel: {
        color: '#FF6B6B',
        fontSize: 12,
        formatter: (value: number) => `${value.toFixed(0)}%`,
      },
      splitLine: { show: false },
    });
  }

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
        type: 'shadow',
        shadowStyle: {
          color: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(204, 255, 0, 0.2)',
        },
      },
      formatter: (params: any) => {
        if (!Array.isArray(params)) return '';

        const year = params[0].axisValue;
        const yearIndex = data.years.indexOf(year);
        const total = totals[yearIndex];
        const unit = data.unit || 'M USD';

        let tooltip = `<div style="font-weight: bold; margin-bottom: 8px; font-size: 16px; color: ${QDARIA_COLORS.primary}">${year}</div>`;
        tooltip += `<div style="margin-bottom: 8px; padding: 6px 0; border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};">
          <span style="font-weight: bold;">Total Revenue:</span>
          <span style="float: right; color: ${QDARIA_COLORS.primary}; font-weight: bold; margin-left: 12px;">${total.toFixed(1)} ${unit}</span>
        </div>`;

        params.forEach((param: any) => {
          if (param.seriesName === 'Growth Rate') {
            tooltip += `
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="display: inline-block; width: 12px; height: 12px; background: ${param.color}; border-radius: 50%; margin-right: 8px;"></span>
                <span style="flex: 1;">${param.seriesName}:</span>
                <span style="font-weight: bold; margin-left: 12px; color: ${param.color};">${param.value.toFixed(1)}%</span>
              </div>
            `;
          } else if (param.seriesName !== 'Target') {
            const value = param.value;
            const percentage = ((value / total) * 100).toFixed(1);
            tooltip += `
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="display: inline-block; width: 12px; height: 12px; background: ${param.color}; border-radius: 3px; margin-right: 8px;"></span>
                <span style="flex: 1;">${param.seriesName}:</span>
                <span style="margin-left: 12px; color: ${QDARIA_COLORS.lightGray};">${percentage}%</span>
                <span style="font-weight: bold; margin-left: 8px; color: ${param.color};">${value.toFixed(1)} ${unit}</span>
              </div>
            `;
          }
        });

        return tooltip;
      },
    },
    legend: {
      data: [
        ...data.revenueStreams.map(s => s.name),
        ...(showGrowthRate && data.growthRates ? ['Growth Rate'] : []),
        ...(showTargets && data.targets ? ['Target'] : []),
      ],
      top: title ? 60 : 20,
      left: 'center',
      textStyle: { color: textColor, fontSize: 14 },
      itemGap: 20,
      icon: 'roundRect',
      itemWidth: 30,
      itemHeight: 14,
    },
    grid: {
      left: '5%',
      right: showGrowthRate && data.growthRates ? '8%' : '5%',
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
    yAxis: yAxisConfig,
    series,
  };
};

/**
 * RevenueProjectionEChart Component - Revenue growth visualization
 */
export const RevenueProjectionEChart: React.FC<RevenueProjectionEChartProps> = ({
  data,
  title = 'Revenue Projections',
  subtitle,
  height = 500,
  theme = 'dark',
  loading = false,
  showGrowthRate = true,
  showTargets = false,
  stackMode = 'stack',
  className = '',
  onChartReady,
}) => {
  const option = useMemo(
    () => getRevenueProjectionOption(data, title, subtitle, theme, showGrowthRate, showTargets, stackMode),
    [data, title, subtitle, theme, showGrowthRate, showTargets, stackMode]
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
          <p style={{ color: QDARIA_COLORS.gray }}>Loading revenue data...</p>
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

export default RevenueProjectionEChart;
