import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer
} from 'recharts';
import ChartWrapper from './ChartWrapper';

const data = [
  { category: 'Technical', inherentRisk: 80, mitigatedRisk: 40 },
  { category: 'Market', inherentRisk: 70, mitigatedRisk: 35 },
  { category: 'Operational', inherentRisk: 60, mitigatedRisk: 25 },
  { category: 'Financial', inherentRisk: 65, mitigatedRisk: 30 }
];

const RiskAssessmentRadarChart = () => {
  return (
    <ChartWrapper
      title="Risk Assessment Analysis"
      description="Comparison of inherent risks versus mitigated risks across key business dimensions."
    >
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(4, 163, 255, 0.1)" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Radar
              name="Inherent Risk"
              dataKey="inherentRisk"
              stroke="rgba(239, 68, 68, 0.8)"
              fill="rgba(239, 68, 68, 0.4)"
            />
            <Radar
              name="Mitigated Risk"
              dataKey="mitigatedRisk"
              stroke="rgba(4, 163, 255, 0.8)"
              fill="rgba(4, 163, 255, 0.4)"
            />
            <Legend
              wrapperStyle={{
                paddingTop: '10px',
                color: '#9ca3af'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

export default RiskAssessmentRadarChart;
