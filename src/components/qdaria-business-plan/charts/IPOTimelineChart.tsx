import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    phase: 'Pre-IPO',
    milestone: 'Product Development',
    progress: 100,
    year: '2024-25'
  },
  {
    phase: 'Pre-IPO',
    milestone: 'Market Validation',
    progress: 80,
    year: '2026-27'
  },
  {
    phase: 'IPO Preparation',
    milestone: 'Financial Audit',
    progress: 60,
    year: '2027-28'
  },
  {
    phase: 'IPO Preparation',
    milestone: 'Regulatory Compliance',
    progress: 40,
    year: '2028-29'
  },
  {
    phase: 'IPO Launch',
    milestone: 'Public Offering',
    progress: 20,
    year: '2029-30'
  }
];

const IPOTimelineChart = () => {
  return (
    <div style={{
      width: '100%',
      height: '400px',
      padding: '1rem',
      borderRadius: '0.75rem',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      backgroundColor: 'rgb(17, 24, 39)',
      boxShadow: '0 0 15px rgba(0, 0, 255, 0.2)',
      transition: 'all 0.3s ease'
    }}>
      {/* @ts-ignore */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 120,
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis
            type="number"
            domain={[0, 100]}
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis
            type="category"
            dataKey="milestone"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
            width={110}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '0.5rem'
            }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: '#9ca3af' }}
            formatter={(value: number, name: string, props: any) => [
              `${value}% - ${props.payload.phase} (${props.payload.year})`,
              'Progress'
            ]}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '10px',
              color: '#9ca3af'
            }}
          />
          <Bar
            dataKey="progress"
            name="IPO Timeline Progress"
            fill="#3b82f6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IPOTimelineChart;
