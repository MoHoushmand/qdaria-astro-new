import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartWrapper } from './ChartWrapper';
import { ProfessionalTooltip } from './ProfessionalTooltip';
import { PROFESSIONAL_CHART_CONFIG, getRechartsConfig, formatters } from './chartConfig';

const data = [
  { quarter: 'Q1 2024', customers: 12, cac: 15000, ltv: 180000 },
  { quarter: 'Q2 2024', customers: 28, cac: 12000, ltv: 195000 },
  { quarter: 'Q3 2024', customers: 45, cac: 10000, ltv: 210000 },
  { quarter: 'Q4 2024', customers: 67, cac: 8500, ltv: 225000 },
  { quarter: 'Q1 2025', customers: 95, cac: 7200, ltv: 240000 },
  { quarter: 'Q2 2025', customers: 134, cac: 6100, ltv: 255000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="chart-tooltip-professional">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="chart-tooltip-item">
          <span style={{ color: entry.color }}>{entry.name}:</span>
          <span className="chart-tooltip-value">
            {entry.dataKey === 'customers'
              ? entry.value
              : formatters.currency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export const CustomerAcquisitionChart = () => {
  const ltvCacRatio = (data[data.length - 1].ltv / data[data.length - 1].cac).toFixed(1);

  return (
    <ChartWrapper
      title="Customer Acquisition & Lifetime Value"
      subtitle="Customer growth trajectory with CAC and LTV economics"
      stats={[
        { value: '134', label: 'Total Customers (Q2 2025)' },
        { value: `${ltvCacRatio}:1`, label: 'LTV:CAC Ratio' },
        { value: '€255K', label: 'Customer LTV' },
        { value: '€6.1K', label: 'Customer CAC' }
      ]}
      insight="LTV:CAC ratio of 41.8:1 demonstrates exceptional unit economics, significantly exceeding the 3:1 industry benchmark"
      height={500}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} {...getRechartsConfig()}>
          <CartesianGrid
            strokeDasharray={PROFESSIONAL_CHART_CONFIG.grid.strokeDasharray}
            stroke={PROFESSIONAL_CHART_CONFIG.grid.stroke}
            opacity={PROFESSIONAL_CHART_CONFIG.grid.opacity}
          />
          <XAxis
            dataKey="quarter"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.axis}
            fontSize={PROFESSIONAL_CHART_CONFIG.fontSize.tick}
            fontWeight={PROFESSIONAL_CHART_CONFIG.fontWeight.medium}
          />
          <YAxis
            yAxisId="left"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.primary}
            fontSize={PROFESSIONAL_CHART_CONFIG.fontSize.tick}
            fontWeight={PROFESSIONAL_CHART_CONFIG.fontWeight.medium}
            label={{
              value: 'Customers',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.axisLabel }
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.cyan}
            fontSize={PROFESSIONAL_CHART_CONFIG.fontSize.tick}
            fontWeight={PROFESSIONAL_CHART_CONFIG.fontWeight.medium}
            label={{
              value: 'Amount (€)',
              angle: 90,
              position: 'insideRight',
              style: { fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.axisLabel }
            }}
            tickFormatter={(value) => formatters.compact(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={PROFESSIONAL_CHART_CONFIG.legend.wrapperStyle}
            iconSize={PROFESSIONAL_CHART_CONFIG.legend.iconSize}
          />
          <Bar
            yAxisId="left"
            dataKey="customers"
            fill={PROFESSIONAL_CHART_CONFIG.colors.primary}
            radius={[8, 8, 0, 0]}
            name="Total Customers"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ltv"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.cyan}
            strokeWidth={3}
            name="LTV (€)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cac"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.green}
            strokeWidth={2}
            strokeDasharray="5 5"
            name="CAC (€)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
