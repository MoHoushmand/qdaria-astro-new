import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ChartWrapper } from './ChartWrapper';

export const MarketOpportunitySankeyChart = () => {
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
        trigger: 'item',
        triggerOn: 'mousemove',
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
      series: {
        type: 'sankey',
        layout: 'none',
        emphasis: {
          focus: 'adjacency'
        },
        data: [
          { name: 'Global Quantum Computing TAM' },
          { name: 'European Market' },
          { name: 'North American Market' },
          { name: 'Asia-Pacific Market' },
          { name: 'Enterprise Software' },
          { name: 'Quantum Hardware' },
          { name: 'Quantum Services' },
          { name: 'QDaria SAM' },
          { name: 'Zipminator' },
          { name: 'Qm9' },
          { name: 'QDiana' },
          { name: 'Consulting' },
          { name: 'QDaria SOM (Year 3)' }
        ],
        links: [
          // TAM to Regional Markets
          { source: 'Global Quantum Computing TAM', target: 'European Market', value: 12 },
          { source: 'Global Quantum Computing TAM', target: 'North American Market', value: 18 },
          { source: 'Global Quantum Computing TAM', target: 'Asia-Pacific Market', value: 8 },

          // Regional to Market Segments
          { source: 'European Market', target: 'Enterprise Software', value: 5 },
          { source: 'European Market', target: 'Quantum Hardware', value: 4 },
          { source: 'European Market', target: 'Quantum Services', value: 3 },
          { source: 'North American Market', target: 'Enterprise Software', value: 8 },
          { source: 'North American Market', target: 'Quantum Hardware', value: 6 },
          { source: 'North American Market', target: 'Quantum Services', value: 4 },

          // Market Segments to QDaria SAM
          { source: 'Enterprise Software', target: 'QDaria SAM', value: 8 },
          { source: 'Quantum Hardware', target: 'QDaria SAM', value: 3 },
          { source: 'Quantum Services', target: 'QDaria SAM', value: 4 },

          // QDaria SAM to Products (SOM)
          { source: 'QDaria SAM', target: 'Zipminator', value: 5 },
          { source: 'QDaria SAM', target: 'Qm9', value: 3 },
          { source: 'QDaria SAM', target: 'QDiana', value: 4 },
          { source: 'QDaria SAM', target: 'Consulting', value: 3 },

          // Products to Final SOM
          { source: 'Zipminator', target: 'QDaria SOM (Year 3)', value: 5 },
          { source: 'Qm9', target: 'QDaria SOM (Year 3)', value: 3 },
          { source: 'QDiana', target: 'QDaria SOM (Year 3)', value: 4 },
          { source: 'Consulting', target: 'QDaria SOM (Year 3)', value: 3 }
        ],
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        },
        itemStyle: {
          color: '#06d6ff',
          borderColor: '#0ea5e9',
          borderWidth: 1
        },
        label: {
          color: '#e5e7eb',
          fontSize: 14,
          fontWeight: 500
        }
      }
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
      title="Market Opportunity Flow Analysis"
      subtitle="TAM → SAM → SOM funnel showing market segmentation and QDaria's addressable opportunity"
      stats={[
        { value: '$38B', label: 'TAM (2028 Total Market)' },
        { value: '$15B', label: 'SAM (Addressable Market)' },
        { value: '$1.2B', label: 'SOM (Target Year 3)' },
        { value: '3.2%', label: 'Market Penetration' }
      ]}
      insight="QDaria targets $1.2B SOM representing 3.2% of total market, focusing on enterprise software and quantum services with proven demand."
      height={700}
    >
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartWrapper>
  );
};
