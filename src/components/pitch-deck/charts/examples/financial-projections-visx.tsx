/**
 * Financial Projections visx Example
 * Custom branded charts for FinancialsSlide
 */

import React from 'react';
import { VisxChart } from '../advanced/VisxChart';

export const RevenueProjectionsExample: React.FC = () => {
  const revenueData = [
    { label: 'Q1 2024', value: 1100000 },
    { label: 'Q2 2024', value: 1610000 },
    { label: 'Q3 2024', value: 2370000 },
    { label: 'Q4 2024', value: 3495000 },
    { label: 'Q1 2025', value: 5143000 },
    { label: 'Q2 2025', value: 7570000 },
    { label: 'Q3 2025', value: 11137000 },
    { label: 'Q4 2025', value: 16391000 },
  ];

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg">
      <VisxChart
        type="branded-line"
        data={revenueData}
        width={900}
        height={500}
        title="Revenue Projections (2024-2025)"
        xLabel="Quarter"
        yLabel="Revenue ($)"
        theme="dark"
        color="#CCFF00"
        showGrid={true}
        animate={true}
      />
      <div className="mt-4 text-sm text-gray-400">
        <div className="flex justify-around">
          <div>
            <span className="font-bold text-[#CCFF00]">Q4 2024:</span> $3.5M ARR
          </div>
          <div>
            <span className="font-bold text-[#CCFF00]">Q4 2025:</span> $16.4M ARR
          </div>
          <div>
            <span className="font-bold text-[#CCFF00]">Growth:</span> 369% YoY
          </div>
        </div>
      </div>
    </div>
  );
};

export const CustomerAcquisitionCostExample: React.FC = () => {
  const cacData = [
    { label: 'Q1 2024', value: 125000 },
    { label: 'Q2 2024', value: 98000 },
    { label: 'Q3 2024', value: 82000 },
    { label: 'Q4 2024', value: 68000 },
    { label: 'Q1 2025', value: 57000 },
    { label: 'Q2 2025', value: 48000 },
  ];

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg">
      <VisxChart
        type="gradient-bar"
        data={cacData}
        width={900}
        height={450}
        title="Customer Acquisition Cost Trend"
        xLabel="Quarter"
        yLabel="CAC ($)"
        theme="dark"
        gradientFrom="#04a3ff"
        gradientTo="#CCFF00"
        showGrid={true}
        animate={true}
      />
      <div className="mt-4 text-sm text-gray-400 text-center">
        52% reduction in CAC through platform optimization and market expansion
      </div>
    </div>
  );
};

export const UnitEconomicsExample: React.FC = () => {
  const unitEconomicsData = [
    { label: 'Q1 2024', value: 280000 },
    { label: 'Q2 2024', value: 420000 },
    { label: 'Q3 2024', value: 630000 },
    { label: 'Q4 2024', value: 945000 },
    { label: 'Q1 2025', value: 1418000 },
    { label: 'Q2 2025', value: 2127000 },
  ];

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg">
      <VisxChart
        type="animated-area"
        data={unitEconomicsData}
        width={900}
        height={450}
        title="Average Revenue Per Customer (ARPC)"
        xLabel="Quarter"
        yLabel="ARPC ($)"
        theme="dark"
        color="#9AFF00"
        showGrid={true}
        animate={true}
      />
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#CCFF00' }}>$2.1M</div>
          <div className="text-gray-400">ARPC Q2 2025</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#04a3ff' }}>3.2x</div>
          <div className="text-gray-400">LTV/CAC Ratio</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#9AFF00' }}>18 mo</div>
          <div className="text-gray-400">Payback Period</div>
        </div>
      </div>
    </div>
  );
};

export const BurnRateExample: React.FC = () => {
  const burnData = [
    { label: 'Jan 2024', value: 450000 },
    { label: 'Feb 2024', value: 520000 },
    { label: 'Mar 2024', value: 580000 },
    { label: 'Apr 2024', value: 650000 },
    { label: 'May 2024', value: 720000 },
    { label: 'Jun 2024', value: 680000 },
    { label: 'Jul 2024', value: 620000 },
    { label: 'Aug 2024', value: 580000 },
  ];

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg">
      <VisxChart
        type="gradient-bar"
        data={burnData}
        width={900}
        height={450}
        title="Monthly Burn Rate Optimization"
        xLabel="Month"
        yLabel="Burn Rate ($)"
        theme="dark"
        gradientFrom="#FF6B00"
        gradientTo="#CCFF00"
        showGrid={true}
        animate={true}
      />
      <div className="mt-4 text-sm text-gray-400 text-center">
        <span className="font-bold text-[#CCFF00]">24 months runway</span> with current funding •
        Break-even projected Q2 2026
      </div>
    </div>
  );
};

export default RevenueProjectionsExample;
