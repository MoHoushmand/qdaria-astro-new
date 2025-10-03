import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

interface ProductComparisonChartProps {
  className?: string;
}

export const ProductComparisonChart: React.FC<ProductComparisonChartProps> = ({ className = '' }) => {
  const data = [
    {
      metric: 'Performance',
      'QDaria Platform': 95,
      'Competitor A': 75,
      'Competitor B': 68,
      'Industry Avg': 60,
    },
    {
      metric: 'Scalability',
      'QDaria Platform': 92,
      'Competitor A': 70,
      'Competitor B': 65,
      'Industry Avg': 55,
    },
    {
      metric: 'Security',
      'QDaria Platform': 98,
      'Competitor A': 82,
      'Competitor B': 78,
      'Industry Avg': 70,
    },
    {
      metric: 'Ease of Use',
      'QDaria Platform': 88,
      'Competitor A': 72,
      'Competitor B': 80,
      'Industry Avg': 65,
    },
    {
      metric: 'AI Capabilities',
      'QDaria Platform': 96,
      'Competitor A': 65,
      'Competitor B': 58,
      'Industry Avg': 50,
    },
    {
      metric: 'Integration',
      'QDaria Platform': 90,
      'Competitor A': 78,
      'Competitor B': 72,
      'Industry Avg': 62,
    },
    {
      metric: 'Cost Efficiency',
      'QDaria Platform': 85,
      'Competitor A': 70,
      'Competitor B': 75,
      'Industry Avg': 68,
    },
  ];

  return (
    <div className={`w-full h-full min-h-[500px] ${className}`}>
      <ResponsiveRadar
        data={data}
        keys={['QDaria Platform', 'Competitor A', 'Competitor B', 'Industry Avg']}
        indexBy="metric"
        maxValue={100}
        margin={{ top: 70, right: 120, bottom: 40, left: 120 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={24}
        enableDots={true}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor="#000212"
        enableDotLabel={false}
        colors={['#04a3ff', '#00ffd3', '#65ff00', '#ff00ff']}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="gentle"
        isInteractive={true}
        theme={{
          background: 'transparent',
          text: {
            fill: '#ffffff',
            fontSize: 12,
            fontWeight: 500,
          },
          tooltip: {
            container: {
              background: 'rgba(0, 2, 18, 0.95)',
              color: '#ffffff',
              fontSize: '13px',
              borderRadius: '8px',
              border: '1px solid #04a3ff',
              boxShadow: '0 8px 32px rgba(4, 163, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              padding: '12px 16px',
            },
          },
          grid: {
            line: {
              stroke: 'rgba(255, 255, 255, 0.2)',
              strokeWidth: 1,
            },
          },
          crosshair: {
            line: {
              stroke: '#04a3ff',
              strokeWidth: 2,
              strokeOpacity: 0.75,
            },
          },
        }}
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -100,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#ffffff',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#04a3ff',
                },
              },
            ],
          },
        ]}
        tooltip={({ index, value, color }) => (
          <div
            style={{
              background: 'rgba(0, 2, 18, 0.95)',
              padding: '12px 16px',
              borderRadius: '8px',
              border: `1px solid ${color}`,
              boxShadow: `0 8px 32px ${color}50`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{index}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: color,
                }}
              />
              <span style={{ fontWeight: 600 }}>{value}/100</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default ProductComparisonChart;
