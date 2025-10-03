/**
 * Example Usage for Business Plan Plotly Charts
 *
 * This file demonstrates how to use the interactive Plotly charts
 * with sample data for the business plan deck.
 */

import React from 'react';
import { RiskAssessmentPlotly } from './RiskAssessmentPlotly';
import { ScenarioAnalysisPlotly } from './ScenarioAnalysisPlotly';
import { ProductMixPlotly } from './ProductMixPlotly';

/**
 * Example 1: Risk Assessment Chart
 */
export const RiskAssessmentExample: React.FC = () => {
  const riskData = {
    risks: [
      {
        probability: 30,
        impact: 80,
        category: 'Market Competition',
        description: 'Increased competition from established quantum computing providers',
      },
      {
        probability: 45,
        impact: 70,
        category: 'Technology Risk',
        description: 'Delays in achieving target qubit coherence times',
      },
      {
        probability: 25,
        impact: 90,
        category: 'Funding Risk',
        description: 'Difficulty securing Series A funding in current market',
      },
      {
        probability: 60,
        impact: 50,
        category: 'Regulatory Changes',
        description: 'New quantum computing regulations in key markets',
      },
      {
        probability: 40,
        impact: 60,
        category: 'Talent Acquisition',
        description: 'Challenges hiring quantum physicists and engineers',
      },
      {
        probability: 20,
        impact: 85,
        category: 'IP Protection',
        description: 'Patent challenges or IP infringement claims',
      },
      {
        probability: 35,
        impact: 55,
        category: 'Supply Chain',
        description: 'Disruptions in specialized quantum hardware supply',
      },
      {
        probability: 50,
        impact: 45,
        category: 'Customer Adoption',
        description: 'Slower than expected market adoption of quantum solutions',
      },
    ],
    categories: [
      'Market Competition',
      'Technology Risk',
      'Funding Risk',
      'Regulatory Changes',
      'Talent Acquisition',
      'IP Protection',
      'Supply Chain',
      'Customer Adoption',
    ],
    timeHorizon: 'Next 24 Months',
  };

  return (
    <div className="w-full p-6">
      <RiskAssessmentPlotly
        data={riskData}
        title="QDaria Risk Assessment Matrix - 2025-2026"
        height={700}
        onRiskClick={(risk) => console.log('Selected risk:', risk)}
      />
    </div>
  );
};

/**
 * Example 2: Scenario Analysis Chart
 */
export const ScenarioAnalysisExample: React.FC = () => {
  const scenarioData = {
    periods: ['2025', '2026', '2027', '2028', '2029'],
    currency: 'USD',
    timeframe: '5-Year Projection (2025-2029)',

    bestCase: [
      { label: 'Starting Capital', value: 10_000_000, isTotal: true },
      { label: 'Product Revenue', value: 15_000_000 },
      { label: 'Service Revenue', value: 8_000_000 },
      { label: 'Licensing', value: 5_000_000 },
      { label: 'Operating Costs', value: -12_000_000 },
      { label: 'R&D Investment', value: -8_000_000 },
      { label: 'Marketing', value: -3_000_000 },
      { label: 'Net Position', value: 15_000_000, isTotal: true },
    ],

    baseCase: [
      { label: 'Starting Capital', value: 10_000_000, isTotal: true },
      { label: 'Product Revenue', value: 10_000_000 },
      { label: 'Service Revenue', value: 5_000_000 },
      { label: 'Licensing', value: 2_000_000 },
      { label: 'Operating Costs', value: -10_000_000 },
      { label: 'R&D Investment', value: -6_000_000 },
      { label: 'Marketing', value: -2_000_000 },
      { label: 'Net Position', value: 9_000_000, isTotal: true },
    ],

    worstCase: [
      { label: 'Starting Capital', value: 10_000_000, isTotal: true },
      { label: 'Product Revenue', value: 5_000_000 },
      { label: 'Service Revenue', value: 2_000_000 },
      { label: 'Licensing', value: 500_000 },
      { label: 'Operating Costs', value: -9_000_000 },
      { label: 'R&D Investment', value: -5_000_000 },
      { label: 'Marketing', value: -1_500_000 },
      { label: 'Net Position', value: 2_000_000, isTotal: true },
    ],
  };

  return (
    <div className="w-full p-6">
      <ScenarioAnalysisPlotly
        data={scenarioData}
        title="QDaria 5-Year Financial Scenarios"
        height={700}
        stackMode="stack"
        onScenarioSelect={(scenario) => console.log('Selected scenario:', scenario)}
      />
    </div>
  );
};

/**
 * Example 3: Product Mix Chart
 */
export const ProductMixExample: React.FC = () => {
  const productMixData = {
    periods: ['2025', '2026', '2027', '2028', '2029'],
    currency: 'USD',
    unit: 'Revenue',

    products: [
      {
        name: 'Quantum Simulator Platform',
        values: [2_000_000, 4_500_000, 8_000_000, 12_000_000, 18_000_000],
        color: '#CCFF00',
        category: 'Software',
        description: 'Cloud-based quantum circuit simulation and development environment',
      },
      {
        name: 'Topological Qubit Hardware',
        values: [1_000_000, 3_000_000, 7_000_000, 15_000_000, 25_000_000],
        color: '#00d4ff',
        category: 'Hardware',
        description: 'Fibonacci anyon-based topological quantum processors',
      },
      {
        name: 'Quantum Algorithm Library',
        values: [500_000, 1_500_000, 3_000_000, 5_000_000, 8_000_000],
        color: '#9933ff',
        category: 'Software',
        description: 'Pre-built quantum algorithms for industry applications',
      },
      {
        name: 'Consulting Services',
        values: [1_500_000, 2_500_000, 4_000_000, 6_000_000, 9_000_000],
        color: '#ff9933',
        category: 'Services',
        description: 'Quantum strategy and implementation consulting',
      },
      {
        name: 'Training & Education',
        values: [300_000, 800_000, 1_500_000, 2_500_000, 4_000_000],
        color: '#00cc99',
        category: 'Services',
        description: 'Quantum computing training programs and certifications',
      },
      {
        name: 'API Access & Cloud',
        values: [200_000, 800_000, 2_000_000, 5_000_000, 10_000_000],
        color: '#3366ff',
        category: 'Cloud',
        description: 'Pay-per-use quantum computing API and cloud access',
      },
    ],
  };

  return (
    <div className="w-full p-6">
      <ProductMixPlotly
        data={productMixData}
        title="QDaria Product Portfolio Revenue Mix (2025-2029)"
        height={700}
        stackMode="stack"
        onProductClick={(product) => console.log('Selected product:', product)}
      />
    </div>
  );
};

/**
 * Complete Dashboard Example
 */
export const BusinessPlanDashboard: React.FC = () => {
  return (
    <div className="w-full space-y-8 p-6 bg-[#1a1a1a]">
      <h1 className="text-4xl font-bold text-white mb-8">QDaria Business Plan Dashboard</h1>

      {/* Risk Assessment */}
      <section>
        <RiskAssessmentExample />
      </section>

      {/* Scenario Analysis */}
      <section className="mt-12">
        <ScenarioAnalysisExample />
      </section>

      {/* Product Mix */}
      <section className="mt-12">
        <ProductMixExample />
      </section>
    </div>
  );
};

export default BusinessPlanDashboard;
