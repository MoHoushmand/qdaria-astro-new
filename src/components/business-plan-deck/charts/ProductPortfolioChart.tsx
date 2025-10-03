import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartWrapper } from './ChartWrapper';
import { PROFESSIONAL_CHART_CONFIG } from './chartConfig';

const data = [
  { name: 'Zipminator', value: 32, color: PROFESSIONAL_CHART_CONFIG.colors.primary },
  { name: 'Qm9', value: 18, color: PROFESSIONAL_CHART_CONFIG.colors.cyan },
  { name: 'QDiana', value: 15, color: PROFESSIONAL_CHART_CONFIG.colors.green },
  { name: 'QMikeAI', value: 12, color: PROFESSIONAL_CHART_CONFIG.colors.purple },
  { name: 'QNilaya', value: 10, color: PROFESSIONAL_CHART_CONFIG.colors.yellow },
  { name: 'TeHaA', value: 8, color: PROFESSIONAL_CHART_CONFIG.colors.pink },
  { name: 'Damon', value: 5, color: PROFESSIONAL_CHART_CONFIG.colors.info },
];

const renderLabel = (entry: any) => {
  return `${entry.name}: ${entry.value}%`;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];
  return (
    <div className="chart-tooltip-professional">
      <div className="chart-tooltip-label">{data.name}</div>
      <div className="chart-tooltip-item">
        <span style={{ color: data.payload.color }}>Revenue Share:</span>
        <span className="chart-tooltip-value">{data.value}%</span>
      </div>
      <div className="chart-tooltip-item text-sm opacity-80">
        Estimated: €{((data.value / 100) * 25.4).toFixed(1)}M in Year 3
      </div>
    </div>
  );
};

export const ProductPortfolioChart = () => {
  const topProduct = data[0];
  const productCount = data.length;

  return (
    <ChartWrapper
      title="Product Portfolio Revenue Mix"
      subtitle="Diversified revenue streams across 7 market-ready quantum products (Year 3)"
      stats={[
        { value: `${productCount}`, label: 'Products' },
        { value: `${topProduct.value}%`, label: `${topProduct.name} (Top)` },
        { value: '€25.4M', label: 'Total Revenue' },
        { value: '€8.1M', label: 'Top Product Revenue' }
      ]}
      insight="Balanced portfolio with Zipminator leading at 32%, demonstrating strong product-market fit across multiple verticals"
      height={550}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="48%"
            labelLine={{
              stroke: PROFESSIONAL_CHART_CONFIG.colors.grid,
              strokeWidth: 1
            }}
            label={(entry) => ({
              ...entry,
              fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.legend,
              fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.medium,
              fill: '#e5e7eb'
            })}
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="#000"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={48}
            iconSize={PROFESSIONAL_CHART_CONFIG.legend.iconSize}
            wrapperStyle={{
              fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.legend,
              paddingTop: '24px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
