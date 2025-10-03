import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, ZAxis } from 'recharts';
import { ChartWrapper } from './ChartWrapper';
import { PROFESSIONAL_CHART_CONFIG, getRechartsConfig } from './chartConfig';

const milestones = [
  { date: 1, impact: 85, label: 'Series A Close', size: 1200, color: PROFESSIONAL_CHART_CONFIG.colors.primary },
  { date: 3, impact: 65, label: 'Zipminator v2.0', size: 800, color: PROFESSIONAL_CHART_CONFIG.colors.cyan },
  { date: 6, impact: 75, label: '50 Enterprise Customers', size: 1000, color: PROFESSIONAL_CHART_CONFIG.colors.green },
  { date: 9, impact: 90, label: 'QDiana Production', size: 1500, color: PROFESSIONAL_CHART_CONFIG.colors.purple },
  { date: 12, impact: 70, label: 'First Quantum Chip', size: 900, color: PROFESSIONAL_CHART_CONFIG.colors.yellow },
  { date: 15, impact: 80, label: 'Series B Ready', size: 1100, color: PROFESSIONAL_CHART_CONFIG.colors.pink },
  { date: 18, impact: 95, label: 'Market Leader Status', size: 1800, color: PROFESSIONAL_CHART_CONFIG.colors.primary },
];

const ProfessionalTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;

  return (
    <div className="chart-tooltip-professional">
      <div className="chart-tooltip-label">{data.label}</div>
      <div className="chart-tooltip-item">
        <span>Month:</span>
        <span className="chart-tooltip-value">{data.date}</span>
      </div>
      <div className="chart-tooltip-item">
        <span>Impact Score:</span>
        <span className="chart-tooltip-value">{data.impact}/100</span>
      </div>
    </div>
  );
};

export const MilestoneTimelineChart = () => {
  const highestImpact = milestones.reduce((max, m) => m.impact > max.impact ? m : max);

  return (
    <ChartWrapper
      title="Strategic Milestones Timeline"
      subtitle="18-month roadmap from Series A to market leadership"
      stats={[
        { value: '7', label: 'Major Milestones' },
        { value: '18', label: 'Months to Execute' },
        { value: `${highestImpact.impact}/100`, label: `Highest Impact (${highestImpact.label})` },
        { value: '95', label: 'Final Impact Score' }
      ]}
      insight="Bubble size represents strategic importance. Clear path to Series B readiness with market leadership achieved by month 18."
      height={550}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart {...getRechartsConfig()}>
          <CartesianGrid
            strokeDasharray={PROFESSIONAL_CHART_CONFIG.grid.strokeDasharray}
            stroke={PROFESSIONAL_CHART_CONFIG.grid.stroke}
            opacity={PROFESSIONAL_CHART_CONFIG.grid.opacity}
          />
          <XAxis
            dataKey="date"
            name="Month"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.axis}
            fontSize={PROFESSIONAL_CHART_CONFIG.fontSize.tick}
            fontWeight={PROFESSIONAL_CHART_CONFIG.fontWeight.medium}
            label={{
              value: 'Months from Series A',
              position: 'insideBottom',
              offset: -20,
              style: {
                fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.axisLabel,
                fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.semibold,
                fill: PROFESSIONAL_CHART_CONFIG.colors.primary
              }
            }}
          />
          <YAxis
            dataKey="impact"
            name="Business Impact"
            stroke={PROFESSIONAL_CHART_CONFIG.colors.axis}
            fontSize={PROFESSIONAL_CHART_CONFIG.fontSize.tick}
            fontWeight={PROFESSIONAL_CHART_CONFIG.fontWeight.medium}
            label={{
              value: 'Impact Score',
              angle: -90,
              position: 'insideLeft',
              style: {
                fontSize: PROFESSIONAL_CHART_CONFIG.fontSize.axisLabel,
                fontWeight: PROFESSIONAL_CHART_CONFIG.fontWeight.semibold,
                fill: PROFESSIONAL_CHART_CONFIG.colors.primary
              }
            }}
          />
          <ZAxis dataKey="size" range={[400, 2000]} />
          <Tooltip content={<ProfessionalTooltip />} />
          <Scatter data={milestones} fill="#8884d8">
            {milestones.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
