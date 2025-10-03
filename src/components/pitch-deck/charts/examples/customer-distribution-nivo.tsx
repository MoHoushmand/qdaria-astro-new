/**
 * Customer Distribution Nivo Example
 * Beautiful pie/donut charts for CustomerValidationSlide
 */

import React from 'react';
import { NivoChart } from '../advanced/NivoChart';

export const IndustryDistributionExample: React.FC = () => {
  const industryData = [
    { id: 'Pharmaceuticals', label: 'Pharmaceuticals', value: 28, color: '#CCFF00' },
    { id: 'Finance', label: 'Financial Services', value: 24, color: '#04a3ff' },
    { id: 'Materials', label: 'Materials Science', value: 18, color: '#9AFF00' },
    { id: 'Energy', label: 'Energy & Utilities', value: 15, color: '#66FF00' },
    { id: 'Aerospace', label: 'Aerospace & Defense', value: 10, color: '#FF00FF' },
    { id: 'Other', label: 'Other Industries', value: 5, color: '#FF6B00' },
  ];

  return (
    <div className="w-full">
      <NivoChart
        type="donut"
        data={industryData}
        title="Customer Distribution by Industry"
        height={500}
        theme="dark"
        animate={true}
      />
    </div>
  );
};

export const CustomerGrowthExample: React.FC = () => {
  const growthData = [
    {
      id: 'Enterprise Customers',
      data: [
        { x: 'Q1 2023', y: 3 },
        { x: 'Q2 2023', y: 5 },
        { x: 'Q3 2023', y: 8 },
        { x: 'Q4 2023', y: 12 },
        { x: 'Q1 2024', y: 18 },
        { x: 'Q2 2024', y: 27 },
      ],
    },
    {
      id: 'Research Institutions',
      data: [
        { x: 'Q1 2023', y: 5 },
        { x: 'Q2 2023', y: 7 },
        { x: 'Q3 2023', y: 11 },
        { x: 'Q4 2023', y: 15 },
        { x: 'Q1 2024', y: 22 },
        { x: 'Q2 2024', y: 31 },
      ],
    },
    {
      id: 'Startups & SMBs',
      data: [
        { x: 'Q1 2023', y: 8 },
        { x: 'Q2 2023', y: 15 },
        { x: 'Q3 2023', y: 28 },
        { x: 'Q4 2023', y: 45 },
        { x: 'Q1 2024', y: 72 },
        { x: 'Q2 2024', y: 115 },
      ],
    },
  ];

  return (
    <div className="w-full">
      <NivoChart
        type="area"
        data={growthData}
        title="Customer Growth by Segment"
        height={500}
        theme="dark"
        animate={true}
        colors={['#CCFF00', '#04a3ff', '#9AFF00']}
      />
    </div>
  );
};

export const RevenueBySegmentExample: React.FC = () => {
  const revenueData = [
    {
      label: 'Q1 2024',
      'Cloud Access': 280000,
      'Enterprise License': 520000,
      'Consulting': 180000,
      'Research Grants': 120000,
    },
    {
      label: 'Q2 2024',
      'Cloud Access': 420000,
      'Enterprise License': 780000,
      'Consulting': 260000,
      'Research Grants': 150000,
    },
    {
      label: 'Q3 2024 (Proj)',
      'Cloud Access': 630000,
      'Enterprise License': 1170000,
      'Consulting': 390000,
      'Research Grants': 180000,
    },
    {
      label: 'Q4 2024 (Proj)',
      'Cloud Access': 945000,
      'Enterprise License': 1755000,
      'Consulting': 585000,
      'Research Grants': 210000,
    },
  ];

  return (
    <div className="w-full">
      <NivoChart
        type="stacked-bar"
        data={{
          ...revenueData,
          keys: ['Cloud Access', 'Enterprise License', 'Consulting', 'Research Grants'],
        }}
        title="Revenue by Product Segment"
        height={500}
        theme="dark"
        animate={true}
        colors={['#CCFF00', '#04a3ff', '#9AFF00', '#66FF00']}
      />
    </div>
  );
};

export const CompetitiveRadarExample: React.FC = () => {
  const competitiveData = [
    { metric: 'Qubit Quality', QDaria: 95, IBM: 75, Google: 80, Rigetti: 70, IonQ: 78 },
    { metric: 'Error Rate', QDaria: 98, IBM: 65, Google: 72, Rigetti: 60, IonQ: 75 },
    { metric: 'Scalability', QDaria: 88, IBM: 82, Google: 85, Rigetti: 65, IonQ: 70 },
    { metric: 'Cloud Access', QDaria: 85, IBM: 90, Google: 88, Rigetti: 75, IonQ: 80 },
    { metric: 'Developer Tools', QDaria: 82, IBM: 85, Google: 90, Rigetti: 70, IonQ: 75 },
    { metric: 'Price/Performance', QDaria: 90, IBM: 70, Google: 65, Rigetti: 75, IonQ: 72 },
  ];

  return (
    <div className="w-full">
      <NivoChart
        type="radar"
        data={{
          ...competitiveData,
          keys: ['QDaria', 'IBM', 'Google', 'Rigetti', 'IonQ'],
        }}
        title="Competitive Analysis Radar"
        height={600}
        theme="dark"
        animate={true}
        colors={['#CCFF00', '#0066cc', '#ea4335', '#9AFF00', '#04a3ff']}
      />
    </div>
  );
};

export default IndustryDistributionExample;
