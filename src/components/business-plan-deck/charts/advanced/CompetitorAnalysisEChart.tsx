/**
 * CompetitorAnalysisEChart - Competitor comparison radar chart
 *
 * Visualizes competitive positioning across multiple dimensions using radar/spider charts.
 * Supports multiple competitors with detailed comparison metrics and interactive exploration.
 *
 * @example
 * <CompetitorAnalysisEChart
 *   data={{
 *     dimensions: ['Technology', 'Market Share', 'Innovation', 'Customer Service', 'Pricing', 'Scalability'],
 *     competitors: [
 *       { name: 'QDaria', scores: [95, 45, 98, 90, 85, 92], color: '#CCFF00' },
 *       { name: 'Competitor A', scores: [70, 85, 65, 80, 75, 70] },
 *       { name: 'Competitor B', scores: [65, 90, 60, 70, 80, 65] }
 *     ]
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

export interface Competitor {
  name: string;
  scores: number[]; // Score for each dimension (0-100)
  color?: string;
  description?: string;
  marketPosition?: 'leader' | 'challenger' | 'follower' | 'niche';
}

export interface CompetitorDimension {
  name: string;
  weight?: number; // Importance weight (0-1)
  max?: number; // Maximum score (default: 100)
}

export interface CompetitorAnalysisData {
  dimensions: string[] | CompetitorDimension[];
  competitors: Competitor[];
  defaultMax?: number; // Default max score for all dimensions
}

interface CompetitorAnalysisEChartProps {
  data: CompetitorAnalysisData;
  title?: string;
  subtitle?: string;
  height?: number | string;
  theme?: 'light' | 'dark';
  loading?: boolean;
  chartType?: 'radar' | 'parallel'; // Radar or parallel coordinates
  showAreaStyle?: boolean;
  className?: string;
  onChartReady?: (chart: any) => void;
}

/**
 * Generate competitor analysis chart configuration
 */
const getCompetitorAnalysisOption = (
  data: CompetitorAnalysisData,
  title?: string,
  subtitle?: string,
  theme: 'light' | 'dark' = 'dark',
  chartType: 'radar' | 'parallel' = 'radar',
  showAreaStyle: boolean = true
): EChartsOption => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const bgColor = isDark ? 'transparent' : '#ffffff';

  const colors = [
    QDARIA_COLORS.primary,
    QDARIA_COLORS.accent,
    QDARIA_COLORS.tertiary,
    '#FF6B6B',
    '#4ECDC4',
    QDARIA_COLORS.secondary,
    '#95E1D3',
  ];

  // Normalize dimensions
  const dimensions = data.dimensions.map((dim) =>
    typeof dim === 'string' ? { name: dim, max: data.defaultMax || 100 } : dim
  );

  if (chartType === 'radar') {
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
        trigger: 'item',
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: QDARIA_COLORS.primary,
        borderWidth: 2,
        textStyle: { color: textColor, fontSize: 14 },
        formatter: (params: any) => {
          const competitor = data.competitors[params.seriesIndex];
          let tooltip = `<div style="font-weight: bold; margin-bottom: 8px; font-size: 16px; color: ${params.color}">${competitor.name}</div>`;

          if (competitor.marketPosition) {
            tooltip += `<div style="margin-bottom: 8px; color: ${QDARIA_COLORS.lightGray}; font-style: italic;">Position: ${competitor.marketPosition.charAt(0).toUpperCase() + competitor.marketPosition.slice(1)}</div>`;
          }

          tooltip += '<div style="margin-top: 8px;">';
          params.value.forEach((score: number, index: number) => {
            const dim = dimensions[index];
            tooltip += `
              <div style="display: flex; align-items: center; margin: 4px 0;">
                <span style="flex: 1;">${dim.name}:</span>
                <span style="font-weight: bold; margin-left: 12px; color: ${params.color};">${score}/100</span>
              </div>
            `;
          });
          tooltip += '</div>';

          return tooltip;
        },
      },
      legend: {
        data: data.competitors.map(c => c.name),
        top: title ? 60 : 20,
        left: 'center',
        textStyle: { color: textColor, fontSize: 14 },
        itemGap: 20,
        icon: 'circle',
        itemWidth: 16,
        itemHeight: 16,
      },
      radar: {
        indicator: dimensions.map((dim) => ({
          name: dim.name,
          max: dim.max || 100,
        })),
        center: ['50%', '55%'],
        radius: '65%',
        startAngle: 90,
        splitNumber: 5,
        shape: 'polygon',
        name: {
          textStyle: {
            color: textColor,
            fontSize: 13,
            fontWeight: 'bold',
          },
          formatter: (value: string) => {
            // Wrap long names
            return value.length > 15 ? value.substring(0, 15) + '...' : value;
          },
        },
        splitArea: {
          areaStyle: {
            color: isDark
              ? ['rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.04)']
              : ['rgba(0, 0, 0, 0.02)', 'rgba(0, 0, 0, 0.04)'],
          },
        },
        axisLine: {
          lineStyle: {
            color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
          },
        },
        splitLine: {
          lineStyle: {
            color: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
            width: 2,
          },
        },
      },
      series: data.competitors.map((competitor, index) => ({
        name: competitor.name,
        type: 'radar',
        data: [
          {
            value: competitor.scores,
            name: competitor.name,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 3,
              shadowColor: competitor.color || colors[index % colors.length],
              shadowBlur: 10,
            },
            itemStyle: {
              color: competitor.color || colors[index % colors.length],
              borderWidth: 2,
              borderColor: bgColor,
            },
            areaStyle: showAreaStyle ? {
              opacity: 0.25,
              color: competitor.color || colors[index % colors.length],
            } : undefined,
            emphasis: {
              lineStyle: {
                width: 5,
                shadowBlur: 15,
              },
              itemStyle: {
                borderWidth: 3,
                shadowBlur: 15,
                shadowColor: competitor.color || colors[index % colors.length],
              },
            },
          },
        ],
      })),
    };
  } else {
    // Parallel coordinates chart
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
        trigger: 'item',
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: QDARIA_COLORS.primary,
        borderWidth: 2,
        textStyle: { color: textColor, fontSize: 14 },
      },
      legend: {
        data: data.competitors.map(c => c.name),
        top: title ? 60 : 20,
        left: 'center',
        textStyle: { color: textColor, fontSize: 14 },
        itemGap: 20,
      },
      parallelAxis: dimensions.map((dim, index) => ({
        dim: index,
        name: dim.name,
        max: dim.max || 100,
        nameTextStyle: {
          color: textColor,
          fontSize: 13,
          fontWeight: 'bold',
        },
        axisLine: {
          lineStyle: {
            color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
          },
        },
        axisTick: {
          lineStyle: {
            color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
          },
        },
        axisLabel: {
          color: textColor,
        },
      })),
      parallel: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: title ? 120 : 80,
        parallelAxisDefault: {
          type: 'value',
          nameLocation: 'end',
          nameGap: 20,
        },
      },
      series: data.competitors.map((competitor, index) => ({
        name: competitor.name,
        type: 'parallel',
        lineStyle: {
          width: 4,
          color: competitor.color || colors[index % colors.length],
          shadowColor: competitor.color || colors[index % colors.length],
          shadowBlur: 10,
        },
        emphasis: {
          lineStyle: {
            width: 6,
            shadowBlur: 15,
          },
        },
        data: [competitor.scores],
      })),
    };
  }
};

/**
 * CompetitorAnalysisEChart Component - Competitor comparison visualization
 */
export const CompetitorAnalysisEChart: React.FC<CompetitorAnalysisEChartProps> = ({
  data,
  title = 'Competitive Analysis',
  subtitle,
  height = 600,
  theme = 'dark',
  loading = false,
  chartType = 'radar',
  showAreaStyle = true,
  className = '',
  onChartReady,
}) => {
  const option = useMemo(
    () => getCompetitorAnalysisOption(data, title, subtitle, theme, chartType, showAreaStyle),
    [data, title, subtitle, theme, chartType, showAreaStyle]
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
          <p style={{ color: QDARIA_COLORS.gray }}>Loading competitor data...</p>
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

export default CompetitorAnalysisEChart;
