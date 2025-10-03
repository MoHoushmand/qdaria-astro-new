import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ChartWrapper } from './ChartWrapper';

export const CompetitiveLandscapeChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      backgroundColor: 'transparent',
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "'Inter', system-ui, sans-serif",
        color: 'rgba(229, 231, 235, 0.85)'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 2, 18, 0.98)',
        borderColor: '#0ea5e9',
        borderWidth: 2,
        textStyle: {
          color: '#e5e7eb',
          fontSize: 16,
          fontWeight: 500
        },
        padding: 16
      },
      legend: {
        data: ['QDaria', 'IBM Quantum', 'Google Quantum AI', 'Rigetti', 'IonQ'],
        textStyle: {
          color: '#e5e7eb',
          fontSize: 14,
          fontWeight: 500
        },
        top: 40,
        itemGap: 20,
        itemWidth: 30,
        itemHeight: 14
      },
      radar: {
        indicator: [
          { name: 'Technology', max: 100 },
          { name: 'Market Share', max: 100 },
          { name: 'Team Quality', max: 100 },
          { name: 'Funding', max: 100 },
          { name: 'Product Portfolio', max: 100 },
          { name: 'Customer Base', max: 100 }
        ],
        shape: 'polygon',
        splitNumber: 5,
        axisName: {
          color: '#0ea5e9',
          fontSize: 14,
          fontWeight: 600
        },
        splitLine: {
          lineStyle: { color: 'rgba(14, 165, 233, 0.2)' }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(14, 165, 233, 0.05)', 'rgba(14, 165, 233, 0.02)']
          }
        },
        axisLine: {
          lineStyle: { color: 'rgba(14, 165, 233, 0.3)' }
        }
      },
      series: [
        {
          name: 'Company Comparison',
          type: 'radar',
          data: [
            {
              value: [92, 45, 88, 65, 95, 52],
              name: 'QDaria',
              lineStyle: { color: qdariaBrand.colors.cyan, width: 3 },
              areaStyle: { color: 'rgba(0, 255, 211, 0.3)' }
            },
            {
              value: [88, 75, 85, 95, 70, 82],
              name: 'IBM Quantum',
              lineStyle: { color: '#8b5cf6', width: 2 },
              areaStyle: { color: 'rgba(139, 92, 246, 0.15)' }
            },
            {
              value: [95, 80, 90, 98, 65, 75],
              name: 'Google Quantum AI',
              lineStyle: { color: '#f59e0b', width: 2 },
              areaStyle: { color: 'rgba(245, 158, 11, 0.15)' }
            },
            {
              value: [78, 35, 72, 55, 68, 40],
              name: 'Rigetti',
              lineStyle: { color: '#ec4899', width: 2 },
              areaStyle: { color: 'rgba(236, 72, 153, 0.15)' }
            },
            {
              value: [82, 42, 75, 68, 60, 48],
              name: 'IonQ',
              lineStyle: { color: '#3b82f6', width: 2 },
              areaStyle: { color: 'rgba(59, 130, 246, 0.15)' }
            }
          ]
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
      title="Competitive Landscape Analysis"
      subtitle="Multi-dimensional comparison across 6 key performance indicators"
      stats={[
        { value: '95/100', label: 'Product Portfolio (Highest)' },
        { value: '92/100', label: 'Technology Score' },
        { value: '88/100', label: 'Team Quality' },
        { value: '5', label: 'Major Competitors' }
      ]}
      insight="QDaria leads in Product Portfolio (95) and Technology (92), outperforming competitors with 7 market-ready products and patented topological quantum computing."
      height={650}
    >
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartWrapper>
  );
};
