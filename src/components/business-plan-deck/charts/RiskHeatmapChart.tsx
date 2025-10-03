import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ChartWrapper } from './ChartWrapper';

export const RiskHeatmapChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const risks = [
      'Technology Development',
      'Market Competition',
      'Talent Acquisition',
      'Regulatory Changes',
      'Funding Runway',
      'Customer Adoption',
      'IP Protection',
      'Supply Chain'
    ];

    const timeframes = ['Current', 'Q2 2024', 'Q4 2024', '2025', '2026'];

    // Risk scores: [timeframe][risk] - lower is better
    const data = [
      [0, 0, 2], [0, 1, 3], [0, 2, 2], [0, 3, 1], [0, 4, 2], [0, 5, 3], [0, 6, 1], [0, 7, 1],
      [1, 0, 1], [1, 1, 3], [1, 2, 2], [1, 3, 1], [1, 4, 1], [1, 5, 2], [1, 6, 1], [1, 7, 1],
      [2, 0, 1], [2, 1, 2], [2, 2, 1], [2, 3, 1], [2, 4, 1], [2, 5, 2], [2, 6, 1], [2, 7, 1],
      [3, 0, 0], [3, 1, 2], [3, 2, 1], [3, 3, 1], [3, 4, 0], [3, 5, 1], [3, 6, 0], [3, 7, 1],
      [4, 0, 0], [4, 1, 1], [4, 2, 1], [4, 3, 1], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0]
    ];

    const option = {
      backgroundColor: 'transparent',
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "'Inter', system-ui, sans-serif",
        color: 'rgba(229, 231, 235, 0.85)'
      },
      tooltip: {
        position: 'top',
        backgroundColor: 'rgba(0, 2, 18, 0.98)',
        borderColor: '#0ea5e9',
        borderWidth: 2,
        textStyle: {
          color: '#e5e7eb',
          fontSize: 16,
          fontWeight: 500
        },
        padding: 16,
        formatter: (params: any) => {
          const risk = risks[params.data[1]];
          const time = timeframes[params.data[0]];
          const level = ['Low', 'Medium', 'High', 'Critical'][params.data[2]];
          return `<div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${risk}</div><div style="font-size: 16px;">${time}: <span style="font-weight: 600;">${level} Risk</span></div>`;
        }
      },
      grid: {
        left: '15%',
        right: '4%',
        bottom: '15%',
        top: '15%',
        containLabel: false
      },
      xAxis: {
        type: 'category',
        data: timeframes,
        splitArea: { show: true },
        axisLine: { lineStyle: { color: '#0ea5e9' } },
        axisLabel: {
          color: '#e5e7eb',
          fontSize: 14,
          fontWeight: 500
        }
      },
      yAxis: {
        type: 'category',
        data: risks,
        splitArea: { show: true },
        axisLine: { lineStyle: { color: '#0ea5e9' } },
        axisLabel: {
          color: '#e5e7eb',
          fontSize: 14,
          fontWeight: 500
        }
      },
      visualMap: {
        min: 0,
        max: 3,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '2%',
        inRange: {
          color: ['#65ff00', '#f59e0b', '#f97316', '#dc2626']
        },
        text: ['Critical', 'Low'],
        textStyle: { color: '#e5e7eb' }
      },
      series: [
        {
          name: 'Risk Level',
          type: 'heatmap',
          data: data,
          label: {
            show: true,
            formatter: (params: any) => ['L', 'M', 'H', 'C'][params.data[2]],
            color: '#000212',
            fontWeight: 'bold',
            fontSize: 14
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(4, 163, 255, 0.5)'
            }
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

  const currentHighRisks = data.filter(d => d[0] === 0 && d[2] >= 2).length;
  const year2LowRisks = data.filter(d => d[0] === 4 && d[2] === 0).length;

  return (
    <ChartWrapper
      title="Risk Assessment Matrix"
      subtitle="Risk probability and impact tracking across 8 key categories over 3-year horizon"
      stats={[
        { value: '8', label: 'Risk Categories' },
        { value: `${currentHighRisks}`, label: 'Current High Risks' },
        { value: `${year2LowRisks}`, label: 'Low Risk by 2026' },
        { value: '75%', label: 'Risk Reduction Rate' }
      ]}
      insight="Systematic risk mitigation shows 75% reduction in high-risk areas by 2026, with strongest improvements in technology development and funding runway."
      height={600}
    >
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartWrapper>
  );
};
