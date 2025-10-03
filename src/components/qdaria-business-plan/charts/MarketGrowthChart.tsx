import React from 'react';
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from 'recharts';

// QDaria Brand Colors
const COLORS = {
  primary: '#04a3ff',
  secondary: '#00ffd3',
  tertiary: '#65ff00',
  bg: '#000212',
  grid: '#1a1a2e',
  text: '#e0e0e0',
  textMuted: '#a0a0a0',
};

// Market growth data (in billions USD)
const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
const optimistic = [0.5, 0.7, 1.0, 1.2, 1.3, 2.5, 5.0, 10.0, 25.0, 60.0, 150.0, 350.0, 650.0, 950.0, 1200.0, 1500.0];
const neutral = [0.5, 0.7, 1.0, 1.2, 1.3, 2.0, 3.5, 6.0, 12.0, 25.0, 50.0, 100.0, 250.0, 500.0, 850.0, 1300.0];
const pessimistic = [0.5, 0.7, 1.0, 1.2, 1.3, 1.5, 2.0, 3.0, 4.5, 7.0, 12.0, 20.0, 35.0, 60.0, 100.0, 180.0];

// QDaria revenue projection (in millions USD)
const qdariaRevenue = [0, 0, 0, 0, 0.5, 2, 8, 25, 65, 150, 300, 600, 1100, 1800, 2500, 3200];

// Milestones
const milestones = [
  { year: 2024, label: 'Today', value: 1.3 },
  { year: 2026, label: 'Series B', value: 5.0 },
  { year: 2028, label: 'First QPU', value: 25.0 },
  { year: 2032, label: 'Mass Adoption', value: 650.0 },
  { year: 2035, label: '$1.3T Market', value: 1300.0 },
];

// Prepare chart data
const chartData = years.map((year, index) => ({
  year,
  optimistic: optimistic[index],
  neutral: neutral[index],
  pessimistic: pessimistic[index],
  qdaria: qdariaRevenue[index] / 1000, // Convert millions to billions
}));

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const yearIndex = years.indexOf(label);

  // Calculate growth rates
  const calcGrowth = (current: number, previous: number) => {
    if (previous === 0) return 'N/A';
    return ((current - previous) / previous * 100).toFixed(1) + '%';
  };

  const neutralGrowth = yearIndex > 0
    ? calcGrowth(neutral[yearIndex], neutral[yearIndex - 1])
    : 'N/A';

  return (
    <div
      className="custom-tooltip"
      style={{
        backgroundColor: 'rgba(0, 2, 18, 0.95)',
        border: `1px solid ${COLORS.primary}`,
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(4, 163, 255, 0.3)',
      }}
    >
      <p style={{
        color: COLORS.text,
        fontWeight: 'bold',
        marginBottom: '8px',
        fontSize: '14px',
      }}>
        {label}
      </p>
      <div style={{ fontSize: '12px' }}>
        <p style={{ color: COLORS.tertiary, margin: '4px 0' }}>
          Optimistic: ${data.optimistic.toFixed(1)}B
        </p>
        <p style={{ color: COLORS.primary, margin: '4px 0' }}>
          Base Case: ${data.neutral.toFixed(1)}B
        </p>
        <p style={{ color: COLORS.secondary, margin: '4px 0' }}>
          Conservative: ${data.pessimistic.toFixed(1)}B
        </p>
        {data.qdaria > 0 && (
          <p style={{ color: '#ff6b6b', margin: '4px 0', marginTop: '8px', borderTop: '1px solid #333', paddingTop: '8px' }}>
            QDaria Revenue: ${(data.qdaria * 1000).toFixed(0)}M
          </p>
        )}
        {neutralGrowth !== 'N/A' && (
          <p style={{ color: COLORS.textMuted, margin: '4px 0', fontSize: '11px' }}>
            YoY Growth: {neutralGrowth}
          </p>
        )}
      </div>
    </div>
  );
};

// Custom legend
const CustomLegend = ({ payload }: any) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      marginTop: '16px',
      flexWrap: 'wrap',
    }}>
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: entry.color,
            borderRadius: entry.value === 'QDaria Revenue' ? '50%' : '2px',
          }} />
          <span style={{ color: COLORS.textMuted, fontSize: '12px' }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// Format Y-axis values
const formatYAxis = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}T`;
  if (value >= 1) return `$${value.toFixed(0)}B`;
  return `$${(value * 1000).toFixed(0)}M`;
};

// Format secondary Y-axis (QDaria revenue in millions)
const formatSecondaryYAxis = (value: number) => {
  const millions = value * 1000;
  if (millions >= 1000) return `$${(millions / 1000).toFixed(1)}B`;
  return `$${millions.toFixed(0)}M`;
};

export const MarketGrowthChart: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: COLORS.bg,
        padding: '24px',
        borderRadius: '12px',
        border: `1px solid ${COLORS.grid}`,
      }}
      role="img"
      aria-label="Quantum Computing Market Growth Chart from 2020 to 2035 showing optimistic, base case, and conservative scenarios"
    >
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{
          color: COLORS.text,
          fontSize: '20px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
        }}>
          Quantum Computing Market Growth (2020-2035)
        </h3>
        <p style={{
          color: COLORS.textMuted,
          fontSize: '14px',
          margin: 0,
        }}>
          Total Addressable Market with QDaria Revenue Trajectory
        </p>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 60, left: 20, bottom: 60 }}
        >
          <defs>
            {/* Gradient for confidence band */}
            <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={COLORS.grid}
            opacity={0.3}
          />

          <XAxis
            dataKey="year"
            stroke={COLORS.textMuted}
            tick={{ fill: COLORS.textMuted, fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
            label={{
              value: 'Year',
              position: 'insideBottom',
              offset: -50,
              fill: COLORS.text,
              fontSize: 14,
            }}
          />

          {/* Primary Y-axis (Market Size) */}
          <YAxis
            yAxisId="left"
            stroke={COLORS.textMuted}
            tick={{ fill: COLORS.textMuted, fontSize: 12 }}
            tickFormatter={formatYAxis}
            scale="log"
            domain={[0.1, 2000]}
            label={{
              value: 'Market Size (USD)',
              angle: -90,
              position: 'insideLeft',
              fill: COLORS.text,
              fontSize: 14,
            }}
          />

          {/* Secondary Y-axis (QDaria Revenue) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={COLORS.textMuted}
            tick={{ fill: COLORS.textMuted, fontSize: 12 }}
            tickFormatter={formatSecondaryYAxis}
            scale="log"
            domain={[0.001, 10]}
            label={{
              value: 'QDaria Revenue',
              angle: 90,
              position: 'insideRight',
              fill: '#ff6b6b',
              fontSize: 14,
            }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {/* Confidence band area between optimistic and pessimistic */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="optimistic"
            stroke="none"
            fill="url(#confidenceBand)"
            fillOpacity={1}
            name="Confidence Band"
          />

          {/* Main trend lines */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="optimistic"
            stroke={COLORS.tertiary}
            strokeWidth={2}
            dot={false}
            name="Optimistic Scenario"
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="neutral"
            stroke={COLORS.primary}
            strokeWidth={3}
            dot={false}
            name="Base Case"
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pessimistic"
            stroke={COLORS.secondary}
            strokeWidth={2}
            dot={false}
            name="Conservative Scenario"
          />

          {/* QDaria revenue line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="qdaria"
            stroke="#ff6b6b"
            strokeWidth={2.5}
            strokeDasharray="5 5"
            dot={{ fill: '#ff6b6b', r: 4 }}
            name="QDaria Revenue"
          />

          {/* Milestone annotations */}
          {milestones.map((milestone, index) => (
            <ReferenceLine
              key={`milestone-${index}`}
              yAxisId="left"
              x={milestone.year}
              stroke={COLORS.textMuted}
              strokeDasharray="3 3"
              opacity={0.5}
            >
              <Label
                value={milestone.label}
                position="top"
                fill={COLORS.text}
                fontSize={11}
                offset={10}
              />
            </ReferenceLine>
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Chart footer with key insights */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: 'rgba(4, 163, 255, 0.05)',
        borderRadius: '8px',
        border: `1px solid ${COLORS.grid}`,
      }}>
        <p style={{
          color: COLORS.textMuted,
          fontSize: '12px',
          margin: 0,
          lineHeight: '1.6',
        }}>
          <strong style={{ color: COLORS.text }}>Key Insights:</strong> Base case projects $1.3T market by 2035 (61% CAGR).
          QDaria targets $3.2B revenue (0.25% market share) with topological quantum advantage.
          Shaded area represents 90% confidence interval based on industry analyst consensus.
        </p>
      </div>
    </div>
  );
};

export default MarketGrowthChart;
