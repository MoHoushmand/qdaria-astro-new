/**
 * VisxChartsExamples - Example usage of Visx charts for business plan
 *
 * This file demonstrates how to use the three advanced Visx charts
 * with realistic business plan data
 */

import React from 'react';
import { MilestoneGanttVisx, type Milestone } from './MilestoneGanttVisx';
import { MetricsGridVisx, type MetricDataPoint } from './MetricsGridVisx';
import { GrowthTrajectoryVisx, type DataSeries } from './GrowthTrajectoryVisx';

// Example 1: Milestone Gantt Chart
export const MilestoneGanttExample: React.FC = () => {
  const milestones: Milestone[] = [
    {
      id: '1',
      name: 'Product Development',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-06-30'),
      progress: 75,
      status: 'in-progress',
      category: 'development',
      owner: 'Engineering Team',
      budget: 500000,
      description: 'Core product development and alpha testing',
      dependencies: [],
    },
    {
      id: '2',
      name: 'Market Research',
      startDate: new Date('2025-01-15'),
      endDate: new Date('2025-04-15'),
      progress: 100,
      status: 'completed',
      category: 'research',
      owner: 'Research Team',
      budget: 150000,
      description: 'Comprehensive market analysis and customer surveys',
    },
    {
      id: '3',
      name: 'Beta Launch',
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-08-31'),
      progress: 45,
      status: 'in-progress',
      category: 'marketing',
      owner: 'Product Team',
      budget: 300000,
      description: 'Beta product launch and user feedback collection',
      dependencies: ['1'],
    },
    {
      id: '4',
      name: 'Sales Infrastructure',
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-07-31'),
      progress: 60,
      status: 'in-progress',
      category: 'operations',
      owner: 'Sales Team',
      budget: 250000,
      description: 'Build sales team and processes',
      dependencies: ['2'],
    },
    {
      id: '5',
      name: 'Fundraising Series A',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-09-30'),
      progress: 30,
      status: 'in-progress',
      category: 'finance',
      owner: 'Executive Team',
      budget: 100000,
      description: 'Series A funding round',
      dependencies: ['3', '4'],
    },
    {
      id: '6',
      name: 'Product Launch',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-12-31'),
      progress: 0,
      status: 'not-started',
      category: 'marketing',
      owner: 'Marketing Team',
      budget: 750000,
      description: 'Full product launch and go-to-market execution',
      dependencies: ['3', '5'],
    },
    {
      id: '7',
      name: 'International Expansion',
      startDate: new Date('2025-10-01'),
      endDate: new Date('2026-03-31'),
      progress: 0,
      status: 'not-started',
      category: 'operations',
      owner: 'Operations Team',
      budget: 1000000,
      description: 'Expand to European and Asian markets',
      dependencies: ['6'],
    },
  ];

  return (
    <MilestoneGanttVisx
      data={milestones}
      width={1200}
      height={600}
      theme="dark"
      showGrid={true}
      showDependencies={true}
      onMilestoneClick={(milestone) => {
        console.log('Milestone clicked:', milestone);
      }}
    />
  );
};

// Example 2: Metrics Grid Heatmap
export const MetricsGridExample: React.FC = () => {
  const metricsData: MetricDataPoint[] = [
    // Q1 2025
    { metric: 'Revenue', period: 'Q1 2025', value: 250000, target: 300000, trend: 'up', unit: 'USD', category: 'Financial' },
    { metric: 'Active Users', period: 'Q1 2025', value: 15000, target: 12000, trend: 'up', unit: 'users', category: 'Growth' },
    { metric: 'Customer Acquisition Cost', period: 'Q1 2025', value: 85, target: 100, trend: 'down', unit: 'USD', category: 'Marketing' },
    { metric: 'Churn Rate', period: 'Q1 2025', value: 3.5, target: 5.0, trend: 'down', unit: '%', category: 'Retention' },
    { metric: 'Net Promoter Score', period: 'Q1 2025', value: 72, target: 70, trend: 'up', unit: 'score', category: 'Satisfaction' },

    // Q2 2025
    { metric: 'Revenue', period: 'Q2 2025', value: 380000, target: 400000, trend: 'up', unit: 'USD', category: 'Financial' },
    { metric: 'Active Users', period: 'Q2 2025', value: 22000, target: 18000, trend: 'up', unit: 'users', category: 'Growth' },
    { metric: 'Customer Acquisition Cost', period: 'Q2 2025', value: 78, target: 100, trend: 'down', unit: 'USD', category: 'Marketing' },
    { metric: 'Churn Rate', period: 'Q2 2025', value: 2.8, target: 5.0, trend: 'down', unit: '%', category: 'Retention' },
    { metric: 'Net Promoter Score', period: 'Q2 2025', value: 75, target: 70, trend: 'up', unit: 'score', category: 'Satisfaction' },

    // Q3 2025
    { metric: 'Revenue', period: 'Q3 2025', value: 520000, target: 500000, trend: 'up', unit: 'USD', category: 'Financial' },
    { metric: 'Active Users', period: 'Q3 2025', value: 32000, target: 25000, trend: 'up', unit: 'users', category: 'Growth' },
    { metric: 'Customer Acquisition Cost', period: 'Q3 2025', value: 72, target: 100, trend: 'down', unit: 'USD', category: 'Marketing' },
    { metric: 'Churn Rate', period: 'Q3 2025', value: 2.4, target: 5.0, trend: 'down', unit: '%', category: 'Retention' },
    { metric: 'Net Promoter Score', period: 'Q3 2025', value: 78, target: 70, trend: 'up', unit: 'score', category: 'Satisfaction' },

    // Q4 2025
    { metric: 'Revenue', period: 'Q4 2025', value: 680000, target: 650000, trend: 'up', unit: 'USD', category: 'Financial' },
    { metric: 'Active Users', period: 'Q4 2025', value: 45000, target: 35000, trend: 'up', unit: 'users', category: 'Growth' },
    { metric: 'Customer Acquisition Cost', period: 'Q4 2025', value: 65, target: 100, trend: 'down', unit: 'USD', category: 'Marketing' },
    { metric: 'Churn Rate', period: 'Q4 2025', value: 2.1, target: 5.0, trend: 'down', unit: '%', category: 'Retention' },
    { metric: 'Net Promoter Score', period: 'Q4 2025', value: 82, target: 70, trend: 'up', unit: 'score', category: 'Satisfaction' },

    // Q1 2026
    { metric: 'Revenue', period: 'Q1 2026', value: 850000, target: 800000, trend: 'up', unit: 'USD', category: 'Financial' },
    { metric: 'Active Users', period: 'Q1 2026', value: 58000, target: 48000, trend: 'up', unit: 'users', category: 'Growth' },
    { metric: 'Customer Acquisition Cost', period: 'Q1 2026', value: 60, target: 100, trend: 'down', unit: 'USD', category: 'Marketing' },
    { metric: 'Churn Rate', period: 'Q1 2026', value: 1.9, target: 5.0, trend: 'down', unit: '%', category: 'Retention' },
    { metric: 'Net Promoter Score', period: 'Q1 2026', value: 85, target: 70, trend: 'up', unit: 'score', category: 'Satisfaction' },
  ];

  return (
    <MetricsGridVisx
      data={metricsData}
      width={1200}
      height={600}
      theme="dark"
      colorScheme="performance"
      showTrends={true}
      showTargets={true}
      onCellClick={(dataPoint) => {
        console.log('Cell clicked:', dataPoint);
      }}
    />
  );
};

// Example 3: Growth Trajectory Multi-axis Chart
export const GrowthTrajectoryExample: React.FC = () => {
  const dataSeries: DataSeries[] = [
    {
      id: 'revenue',
      name: 'Monthly Revenue',
      axis: 'left',
      unit: 'USD',
      color: '#CCFF00',
      data: [
        { date: new Date('2025-01-01'), value: 80000 },
        { date: new Date('2025-02-01'), value: 85000 },
        { date: new Date('2025-03-01'), value: 95000 },
        { date: new Date('2025-04-01'), value: 120000 },
        { date: new Date('2025-05-01'), value: 130000 },
        { date: new Date('2025-06-01'), value: 145000 },
        { date: new Date('2025-07-01'), value: 170000 },
        { date: new Date('2025-08-01'), value: 185000 },
        { date: new Date('2025-09-01'), value: 210000 },
        { date: new Date('2025-10-01'), value: 230000 },
        { date: new Date('2025-11-01'), value: 255000 },
        { date: new Date('2025-12-01'), value: 285000 },
      ],
    },
    {
      id: 'users',
      name: 'Active Users',
      axis: 'right',
      unit: 'users',
      color: '#00d4ff',
      data: [
        { date: new Date('2025-01-01'), value: 5000 },
        { date: new Date('2025-02-01'), value: 5500 },
        { date: new Date('2025-03-01'), value: 6200 },
        { date: new Date('2025-04-01'), value: 8000 },
        { date: new Date('2025-05-01'), value: 9500 },
        { date: new Date('2025-06-01'), value: 11200 },
        { date: new Date('2025-07-01'), value: 14000 },
        { date: new Date('2025-08-01'), value: 16500 },
        { date: new Date('2025-09-01'), value: 19800 },
        { date: new Date('2025-10-01'), value: 23000 },
        { date: new Date('2025-11-01'), value: 26500 },
        { date: new Date('2025-12-01'), value: 30000 },
      ],
    },
    {
      id: 'revenue-forecast',
      name: 'Revenue Forecast',
      axis: 'left',
      unit: 'USD',
      color: '#CCFF00',
      isForecast: true,
      data: [
        { date: new Date('2025-12-01'), value: 285000 },
        { date: new Date('2026-01-01'), value: 320000 },
        { date: new Date('2026-02-01'), value: 360000 },
        { date: new Date('2026-03-01'), value: 405000 },
        { date: new Date('2026-04-01'), value: 455000 },
        { date: new Date('2026-05-01'), value: 510000 },
        { date: new Date('2026-06-01'), value: 570000 },
      ],
      confidenceInterval: {
        upper: [285000, 340000, 385000, 440000, 500000, 570000, 640000],
        lower: [285000, 300000, 335000, 370000, 410000, 450000, 500000],
      },
    },
    {
      id: 'users-forecast',
      name: 'Users Forecast',
      axis: 'right',
      unit: 'users',
      color: '#00d4ff',
      isForecast: true,
      data: [
        { date: new Date('2025-12-01'), value: 30000 },
        { date: new Date('2026-01-01'), value: 34000 },
        { date: new Date('2026-02-01'), value: 38500 },
        { date: new Date('2026-03-01'), value: 43500 },
        { date: new Date('2026-04-01'), value: 49000 },
        { date: new Date('2026-05-01'), value: 55000 },
        { date: new Date('2026-06-01'), value: 61500 },
      ],
      confidenceInterval: {
        upper: [30000, 36000, 41000, 47000, 54000, 61000, 69000],
        lower: [30000, 32000, 36000, 40000, 44000, 49000, 54000],
      },
    },
  ];

  const milestones = [
    {
      date: new Date('2025-03-01'),
      label: 'Beta Launch',
      description: 'Product beta release',
    },
    {
      date: new Date('2025-06-01'),
      label: 'Series A',
      description: 'Series A funding close',
    },
    {
      date: new Date('2025-09-01'),
      label: 'Launch',
      description: 'Full product launch',
    },
    {
      date: new Date('2026-01-01'),
      label: 'International',
      description: 'International expansion',
    },
  ];

  return (
    <GrowthTrajectoryVisx
      series={dataSeries}
      milestones={milestones}
      width={1200}
      height={600}
      theme="dark"
      showGrid={true}
      showArea={true}
      showLegend={true}
      showConfidenceInterval={true}
      leftAxisLabel="Revenue (USD)"
      rightAxisLabel="Active Users"
      title="Growth Trajectory & Forecast"
    />
  );
};

// Complete example combining all charts
export const VisxChartsShowcase: React.FC = () => {
  return (
    <div className="space-y-12 p-8">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-[#CCFF00]">
          Project Timeline & Milestones
        </h2>
        <MilestoneGanttExample />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-[#CCFF00]">
          KPI Performance Heatmap
        </h2>
        <MetricsGridExample />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-[#CCFF00]">
          Growth Metrics & Forecasts
        </h2>
        <GrowthTrajectoryExample />
      </section>
    </div>
  );
};

export default VisxChartsShowcase;
