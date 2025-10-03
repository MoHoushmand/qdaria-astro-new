import React from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';

interface IncomeBreakdownChartProps {
  className?: string;
}

export const IncomeBreakdownChart: React.FC<IncomeBreakdownChartProps> = ({ className = '' }) => {
  const data = {
    name: 'Total Revenue',
    color: '#04a3ff',
    children: [
      {
        name: 'Software',
        color: '#04a3ff',
        children: [
          { name: 'Enterprise Licenses', color: '#0492e6', value: 5500 },
          { name: 'SMB Licenses', color: '#0477b8', value: 2800 },
          { name: 'Starter Plans', color: '#035d8f', value: 1200 },
        ],
      },
      {
        name: 'Cloud Services',
        color: '#00ffd3',
        children: [
          { name: 'Compute Hours', color: '#00e6bd', value: 3200 },
          { name: 'Storage', color: '#00cca7', value: 1500 },
          { name: 'Data Transfer', color: '#00b391', value: 800 },
        ],
      },
      {
        name: 'Professional Services',
        color: '#65ff00',
        children: [
          { name: 'Consulting', color: '#5ae600', value: 2100 },
          { name: 'Implementation', color: '#4fcc00', value: 1800 },
          { name: 'Support', color: '#44b300', value: 1200 },
        ],
      },
      {
        name: 'Education',
        color: '#ff00ff',
        children: [
          { name: 'Training Programs', color: '#e600e6', value: 950 },
          { name: 'Certifications', color: '#cc00cc', value: 650 },
          { name: 'Workshops', color: '#b300b3', value: 420 },
        ],
      },
      {
        name: 'Partnerships',
        color: '#ffaa00',
        children: [
          { name: 'Referral Revenue', color: '#e69900', value: 880 },
          { name: 'Co-Marketing', color: '#cc8800', value: 520 },
          { name: 'Technology Partners', color: '#b37700', value: 380 },
        ],
      },
    ],
  };

  return (
    <div className={`w-full h-full min-h-[600px] ${className}`}>
      <ResponsiveSunburst
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        id="name"
        value="value"
        cornerRadius={4}
        borderWidth={2}
        borderColor="#000212"
        colors={{ scheme: 'nivo' }}
        childColor={{
          from: 'color',
          modifiers: [['brighter', 0.1]],
        }}
        enableArcLabels={true}
        arcLabelsSkipAngle={15}
        arcLabelsTextColor="#ffffff"
        arcLabel={(d) => {
          if (d.value && d.value > 1000) {
            return `${d.id}\n$${(d.value / 1000).toFixed(1)}M`;
          } else if (d.value) {
            return `${d.id}\n$${d.value}K`;
          }
          return String(d.id);
        }}
        animate={true}
        motionConfig="gentle"
        transitionMode="startAngle"
        theme={{
          background: 'transparent',
          text: {
            fill: 'rgba(229, 231, 235, 0.85)',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "'Inter', system-ui, sans-serif",
          },
          tooltip: {
            container: {
              background: 'rgba(0, 2, 18, 0.95)',
              color: '#e5e7eb',
              fontSize: '16px',
              fontFamily: "'Inter', system-ui, sans-serif",
              borderRadius: '8px',
              border: '1px solid #04a3ff',
              boxShadow: '0 8px 32px rgba(4, 163, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              padding: '12px 16px',
            },
          },
        }}
        tooltip={({ id, value, color, depth }) => (
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
            <div style={{ fontWeight: 600, marginBottom: '6px', fontSize: '16px', fontFamily: "'Inter', system-ui, sans-serif" }}>{id}</div>
            {value && (
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '16px', fontFamily: "'Inter', system-ui, sans-serif" }}>
                <span>Revenue:</span>
                <span style={{ fontWeight: 700, color }}>
                  {value >= 1000 ? `$${(value / 1000).toFixed(2)}M` : `$${value}K`}
                </span>
              </div>
            )}
            <div style={{ marginTop: '4px', fontSize: '14px', fontFamily: "'Inter', system-ui, sans-serif", color: 'rgba(229, 231, 235, 0.7)' }}>
              Level {depth}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default IncomeBreakdownChart;
