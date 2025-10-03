import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ChartWrapper } from './ChartWrapper';
import { ProfessionalTooltip } from './ProfessionalTooltip';
import { PROFESSIONAL_CHART_CONFIG, getRechartsConfig, formatters } from './chartConfig';

const data = [
  { year: '2024', market: 15.3, qdaria: 0.5, projected: 0.8 },
  { year: '2025', market: 18.7, qdaria: 2.1, projected: 3.5 },
  { year: '2026', market: 23.4, qdaria: 5.8, projected: 8.2 },
  { year: '2027', market: 29.8, qdaria: 12.4, projected: 15.6 },
  { year: '2028', market: 38.2, qdaria: 23.7, projected: 28.9 },
];

export const MarketGrowthChart = () => {
  const marketShare2028 = ((data[4].qdaria / data[4].market) * 100).toFixed(1);
  const cagr = (((data[4].qdaria / data[0].qdaria) ** (1/4) - 1) * 100).toFixed(0);

  return (
    <ChartWrapper
      title="Quantum Computing Market Growth vs QDaria Revenue"
      subtitle="5-year market expansion with QDaria revenue trajectory"
      stats={[
        { value: '€38.2B', label: 'Total Market 2028' },
        { value: '€23.7M', label: 'QDaria Revenue 2028' },
        { value: `${marketShare2028}%`, label: 'Market Share' },
        { value: `${cagr}%`, label: 'Revenue CAGR' }
      ]}
      insight="QDaria capturing significant market share with 127% CAGR, outpacing total market growth by 3.2x"
      height={500}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} {...getRechartsConfig()}>
          <defs>
            <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={PROFESSIONAL_CHART_CONFIG.colors.primary} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={PROFESSIONAL_CHART_CONFIG.colors.primary} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="qdariaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={PROFESSIONAL_CHART_CONFIG.colors.cyan} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={PROFESSIONAL_CHART_CONFIG.colors.cyan} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray={PROFESSIONAL_CHART_CONFIG.grid.strokeDasharray}
            stroke={PROFESSIONAL_CHART_CONFIG.grid.stroke}
            opacity={PROFESSIONAL_CHART_CONFIG.grid.opacity}
          />
          <XAxis
            dataKey="year"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.axis}
            fontSize={PROFESSIONAL_CHART_CONFIG.fontSize.tick}
            fontWeight={PROFESSIONAL_CHART_CONFIG.fontWeight.medium}
          />
          <YAxis
            stroke={PROFESSIONAL_CHART_CONFIG.colors.axis}
            fontSize={PROFESSIONAL_CHART_CONFIG.fontSize.tick}
            fontWeight={PROFESSIONAL_CHART_CONFIG.fontWeight.medium}
            label={{
              value: 'Revenue (€B)',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.axisLabel }
            }}
            tickFormatter={(value) => `€${value}B`}
          />
          <Tooltip
            content={<ProfessionalTooltip formatter={(v) => `€${v}B`} />}
          />
          <Legend
            wrapperStyle={PROFESSIONAL_CHART_CONFIG.legend.wrapperStyle}
            iconSize={PROFESSIONAL_CHART_CONFIG.legend.iconSize}
          />
          <Area
            type="monotone"
            dataKey="market"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.primary}
            fill="url(#marketGradient)"
            name="Total Market"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="qdaria"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.cyan}
            fill="url(#qdariaGradient)"
            name="QDaria Revenue"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="projected"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.green}
            strokeDasharray="5 5"
            strokeWidth={2}
            name="Optimistic Projection"
            dot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
