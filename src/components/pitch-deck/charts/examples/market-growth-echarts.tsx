/**
 * Market Growth ECharts Example
 * Demonstrates multi-axis time series for MarketSlide
 */

import React from 'react';
import { EChartsComponent } from '../advanced/EChartsComponent';

export const MarketGrowthEChartsExample: React.FC = () => {
  const marketGrowthData = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'],
    yAxis1Name: 'Market Size ($B)',
    yAxis2Name: 'Growth Rate (%)',
    series: [
      {
        name: 'Total Addressable Market',
        yAxisIndex: 0,
        data: [1.2, 2.1, 3.8, 6.5, 11.2, 19.5, 34.0, 59.0, 103.0],
        color: '#CCFF00',
        showArea: true,
      },
      {
        name: 'Serviceable Market',
        yAxisIndex: 0,
        data: [0.5, 0.9, 1.6, 2.8, 4.8, 8.4, 14.6, 25.4, 44.3],
        color: '#00d4ff',
        showArea: true,
      },
      {
        name: 'YoY Growth Rate',
        yAxisIndex: 1,
        data: [75, 81, 87, 71, 72, 74, 74, 74, 75],
        color: '#9AFF00',
        showArea: false,
      },
    ],
  };

  return (
    <div className="w-full">
      <EChartsComponent
        type="multi-axis-line"
        data={marketGrowthData}
        title="Quantum Computing Market Growth Projection"
        subtitle="TAM, SAM, and YoY Growth Rate (2020-2028)"
        height={500}
        theme="dark"
      />
    </div>
  );
};

export const CompetitivePositioningExample: React.FC = () => {
  const competitiveData = {
    xAxisName: 'Market Share (%)',
    yAxisName: 'Innovation Score',
    series: [
      {
        name: 'QDaria',
        data: [[15, 95, 50]], // [x, y, size]
        color: '#CCFF00',
      },
      {
        name: 'IBM Quantum',
        data: [[35, 85, 80]],
        color: '#0066cc',
      },
      {
        name: 'Google Quantum AI',
        data: [[28, 88, 75]],
        color: '#ea4335',
      },
      {
        name: 'Rigetti',
        data: [[12, 78, 40]],
        color: '#9AFF00',
      },
      {
        name: 'IonQ',
        data: [[8, 82, 35]],
        color: '#04a3ff',
      },
      {
        name: 'Atom Computing',
        data: [[2, 75, 20]],
        color: '#66FF00',
      },
    ],
  };

  return (
    <div className="w-full">
      <EChartsComponent
        type="bubble"
        data={competitiveData}
        title="Competitive Positioning Matrix"
        subtitle="Market Share vs Innovation (Bubble size = Company valuation)"
        height={500}
        theme="dark"
      />
    </div>
  );
};

export default MarketGrowthEChartsExample;
