import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { year: 2025, operating: -30, investing: -50, financing: 100 },
  { year: 2026, operating: -10, investing: -40, financing: 80 },
  { year: 2027, operating: 20, investing: -30, financing: 50 },
  { year: 2028, operating: 50, investing: -20, financing: 30 },
  { year: 2029, operating: 80, investing: -15, financing: 20 },
  { year: 2030, operating: 120, investing: -10, financing: 10 }
];

const formatCashFlow = (value: number) => {
  const absValue = Math.abs(value);
  if (absValue >= 1000) {
    return `${value < 0 ? '-' : ''}$${(absValue / 1000).toFixed(1)}B`;
  }
  return `${value < 0 ? '-' : ''}$${absValue}M`;
};

const CashFlowChart = () => {
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
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis
            dataKey="year"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
            tickFormatter={formatCashFlow}
            label={{
              value: 'Cash Flow',
              angle: -90,
              position: 'insideLeft',
              fill: '#9ca3af'
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '0.5rem'
            }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: '#9ca3af' }}
            formatter={(value: number) => [formatCashFlow(value), 'Cash Flow']}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '10px',
              color: '#9ca3af'
            }}
          />
          <Line
            type="monotone"
            dataKey="operating"
            name="Operating Cash Flow"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{
              stroke: '#3b82f6',
              strokeWidth: 2,
              r: 4,
              fill: '#111827'
            }}
          />
          <Line
            type="monotone"
            dataKey="investing"
            name="Investing Cash Flow"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{
              stroke: '#ef4444',
              strokeWidth: 2,
              r: 4,
              fill: '#111827'
            }}
          />
          <Line
            type="monotone"
            dataKey="financing"
            name="Financing Cash Flow"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{
              stroke: '#22c55e',
              strokeWidth: 2,
              r: 4,
              fill: '#111827'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
