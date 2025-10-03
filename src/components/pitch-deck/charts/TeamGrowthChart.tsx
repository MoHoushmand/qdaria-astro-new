import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface TeamGrowthChartProps {
  className?: string;
}

export const TeamGrowthChart: React.FC<TeamGrowthChartProps> = ({ className = '' }) => {
  const data = [
    { date: 'Q1 2023', engineering: 5, research: 2, operations: 2, total: 9, milestone: 'Seed Round' },
    { date: 'Q2 2023', engineering: 8, research: 3, operations: 3, total: 14, milestone: '' },
    { date: 'Q3 2023', engineering: 12, research: 4, operations: 4, total: 20, milestone: '' },
    { date: 'Q4 2023', engineering: 15, research: 5, operations: 5, total: 25, milestone: 'Beta Launch' },
    { date: 'Q1 2024', engineering: 20, research: 6, operations: 6, total: 32, milestone: '' },
    { date: 'Q2 2024', engineering: 28, research: 8, operations: 8, total: 44, milestone: 'Series A' },
    { date: 'Q3 2024', engineering: 35, research: 10, operations: 10, total: 55, milestone: '' },
    { date: 'Q4 2024', engineering: 45, research: 12, operations: 12, total: 69, milestone: 'Public Launch' },
    { date: 'Q1 2025', engineering: 58, research: 15, operations: 15, total: 88, milestone: '' },
    { date: 'Q2 2025', engineering: 75, research: 18, operations: 18, total: 111, milestone: 'Series B Target' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const milestone = payload[0]?.payload?.milestone;
      return (
        <div
          style={{
            background: 'rgba(0, 2, 18, 0.95)',
            border: '1px solid #04a3ff',
            borderRadius: '8px',
            padding: '12px 16px',
            boxShadow: '0 8px 32px rgba(4, 163, 255, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '8px', color: '#e5e7eb', fontSize: '16px', fontFamily: "'Inter', system-ui, sans-serif" }}>{label}</div>
          {milestone && (
            <div
              style={{
                fontWeight: 600,
                marginBottom: '8px',
                color: '#65ff00',
                fontSize: '16px',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              🎯 {milestone}
            </div>
          )}
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '4px',
                color: entry.color,
                fontSize: '16px',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              <span>{entry.name}:</span>
              <span style={{ fontWeight: 600, marginLeft: '12px' }}>{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full h-full min-h-[500px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="engineeringGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#04a3ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#04a3ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="researchGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ffd3" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00ffd3" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="operationsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#65ff00" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#65ff00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="rgba(229, 231, 235, 0.85)"
            style={{ fontSize: '14px', fontWeight: 500, fontFamily: "'Inter', system-ui, sans-serif" }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="rgba(229, 231, 235, 0.85)"
            style={{ fontSize: '14px', fontWeight: 500, fontFamily: "'Inter', system-ui, sans-serif" }}
            label={{
              value: 'Team Members',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#e5e7eb', fontSize: '16px', fontWeight: 600, fontFamily: "'Inter', system-ui, sans-serif" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
            iconType="line"
          />
          <ReferenceLine
            x="Q2 2024"
            stroke="#65ff00"
            strokeDasharray="3 3"
            label={{
              value: 'Series A',
              position: 'top',
              fill: '#65ff00',
              fontSize: 14,
              fontWeight: 600,
            }}
          />
          <ReferenceLine
            x="Q4 2024"
            stroke="#04a3ff"
            strokeDasharray="3 3"
            label={{
              value: 'Public Launch',
              position: 'top',
              fill: '#04a3ff',
              fontSize: 14,
              fontWeight: 600,
            }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#ff00ff"
            strokeWidth={3}
            dot={{ fill: '#ff00ff', strokeWidth: 2, r: 5, stroke: '#000212' }}
            activeDot={{ r: 7, strokeWidth: 0 }}
            name="Total Team"
          />
          <Line
            type="monotone"
            dataKey="engineering"
            stroke="#04a3ff"
            strokeWidth={2.5}
            dot={{ fill: '#04a3ff', strokeWidth: 2, r: 4, stroke: '#000212' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name="Engineering"
          />
          <Line
            type="monotone"
            dataKey="research"
            stroke="#00ffd3"
            strokeWidth={2.5}
            dot={{ fill: '#00ffd3', strokeWidth: 2, r: 4, stroke: '#000212' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name="Research"
          />
          <Line
            type="monotone"
            dataKey="operations"
            stroke="#65ff00"
            strokeWidth={2.5}
            dot={{ fill: '#65ff00', strokeWidth: 2, r: 4, stroke: '#000212' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name="Operations"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamGrowthChart;
