import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ChartWrapper } from './ChartWrapper';
import { PROFESSIONAL_CHART_CONFIG } from './chartConfig';

export const FinancialScenariosChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      backgroundColor: 'transparent',
      textStyle: {
        fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.tick,
        fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.medium,
        fontFamily: PROFESSIONAL_CHART_CONFIG.fontFamily,
        color: 'rgba(229, 231, 235, 0.85)'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
        backgroundColor: 'rgba(0, 2, 18, 0.98)',
        borderColor: PROFESSIONAL_CHART_CONFIG.colors.primary,
        borderWidth: 2,
        textStyle: {
          color: '#e5e7eb',
          fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.tooltip,
          fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.medium
        },
        padding: 16,
        formatter: (params: any) => {
          let result = `<div style="font-size: ${PROFESSIONAL_CHART_CONFIG.fontSize.tooltip}px; font-weight: ${PROFESSIONAL_CHART_CONFIG.fontWeight.semibold}; margin-bottom: 8px;">${params[0].name}</div>`;
          params.forEach((param: any) => {
            result += `<div style="display: flex; justify-content: space-between; gap: 24px; font-size: ${PROFESSIONAL_CHART_CONFIG.fontSize.tooltip}px;">`;
            result += `<span style="color: ${param.color};">${param.seriesName}:</span>`;
            result += `<span style="font-weight: ${PROFESSIONAL_CHART_CONFIG.fontWeight.semibold};">€${param.value}M</span>`;
            result += `</div>`;
          });
          return result;
        }
      },
      legend: {
        data: ['Conservative', 'Base Case', 'Optimistic'],
        textStyle: {
          color: '#e5e7eb',
          fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.legend,
          fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.medium
        },
        top: 40,
        itemGap: 20,
        itemWidth: 30,
        itemHeight: 14
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: 100,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2024 Q1', 'Q2', 'Q3', 'Q4', '2025 Q1', 'Q2', 'Q3', 'Q4', '2026 Q1', 'Q2', 'Q3', 'Q4'],
        axisLine: { lineStyle: { color: PROFESSIONAL_CHART_CONFIG.colors.primary } },
        axisLabel: {
          color: '#e5e7eb',
          fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.tick,
          fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.medium
        }
      },
      yAxis: {
        type: 'value',
        name: 'Revenue (€M)',
        nameTextStyle: {
          color: PROFESSIONAL_CHART_CONFIG.colors.primary,
          fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.axisLabel,
          fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.semibold
        },
        nameGap: 20,
        axisLine: { lineStyle: { color: PROFESSIONAL_CHART_CONFIG.colors.primary } },
        axisLabel: {
          color: '#e5e7eb',
          fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.tick,
          fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.medium,
          formatter: '€{value}M'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(14, 165, 233, 0.1)'
          }
        }
      },
      series: [
        {
          name: 'Conservative',
          type: 'line',
          data: [0.5, 0.8, 1.2, 1.6, 2.1, 2.7, 3.4, 4.2, 5.1, 6.2, 7.5, 9.0],
          smooth: true,
          lineStyle: { color: PROFESSIONAL_CHART_CONFIG.colors.yellow, width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(251, 191, 36, 0.3)' },
              { offset: 1, color: 'rgba(251, 191, 36, 0.05)' }
            ])
          }
        },
        {
          name: 'Base Case',
          type: 'line',
          data: [0.8, 1.4, 2.3, 3.5, 4.9, 6.5, 8.4, 10.8, 13.6, 16.9, 20.8, 25.4],
          smooth: true,
          lineStyle: { color: PROFESSIONAL_CHART_CONFIG.colors.cyan, width: 3 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(6, 214, 255, 0.4)' },
              { offset: 1, color: 'rgba(6, 214, 255, 0.05)' }
            ])
          },
          emphasis: {
            focus: 'series',
            lineStyle: { width: 4 }
          }
        },
        {
          name: 'Optimistic',
          type: 'line',
          data: [1.2, 2.3, 4.1, 6.8, 10.5, 15.4, 21.8, 29.9, 39.8, 51.7, 65.9, 82.5],
          smooth: true,
          lineStyle: { color: PROFESSIONAL_CHART_CONFIG.colors.green, width: 2, type: 'dashed' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(124, 224, 0, 0.3)' },
              { offset: 1, color: 'rgba(124, 224, 0, 0.05)' }
            ])
          }
        }
      ]
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <ChartWrapper
      title="Financial Scenarios Analysis"
      subtitle="3-year revenue projections: Conservative, Base Case, and Optimistic scenarios"
      stats={[
        { value: '€9.0M', label: 'Conservative (Year 3)' },
        { value: '€25.4M', label: 'Base Case (Year 3)' },
        { value: '€82.5M', label: 'Optimistic (Year 3)' },
        { value: '9.2x', label: 'Optimistic vs Conservative' }
      ]}
      insight="Base case scenario achieves €25.4M by Year 3 with 127% CAGR. Conservative scenario maintains sustainable growth with reduced risk."
      height={550}
    >
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartWrapper>
  );
};
