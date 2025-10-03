/**
 * ChartShowcase Component
 * Demonstrates all animated chart components with sample data
 * Use this as a reference for implementing charts in your slides
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import {
  AnimatedLineChart,
  AnimatedAreaChart,
  AnimatedRadarChart,
  AnimatedBarChart,
  AnimatedPieChart,
  AnimatedMetricCard
} from './index';
import { TrendingUp, DollarSign, Users, Target, Zap, Award } from 'lucide-react';

// Sample data for market growth
const marketGrowthData = [
  { year: '2024', value: 1.3, projected: 1.5, target: 1.8 },
  { year: '2025', value: 2.1, projected: 2.4, target: 2.8 },
  { year: '2026', value: 3.2, projected: 3.8, target: 4.2 },
  { year: '2027', value: 4.5, projected: 5.1, target: 5.8 },
  { year: '2028', value: 5.3, projected: 6.2, target: 7.5 }
];

// Sample data for technology comparison
const techComparisonData = [
  { metric: 'Accuracy', QDaria: 95, Competitor: 75 },
  { metric: 'Speed', QDaria: 88, Competitor: 65 },
  { metric: 'Scalability', QDaria: 92, Competitor: 70 },
  { metric: 'Ease of Use', QDaria: 85, Competitor: 60 },
  { metric: 'Cost', QDaria: 78, Competitor: 55 },
  { metric: 'Support', QDaria: 90, Competitor: 68 }
];

// Sample data for revenue streams
const revenueStreamsData = [
  { name: 'Subscriptions', value: 4500 },
  { name: 'Professional Services', value: 2800 },
  { name: 'Enterprise Licenses', value: 3200 },
  { name: 'Training', value: 1200 },
  { name: 'Consulting', value: 1800 }
];

// Sample data for quarterly metrics
const quarterlyMetricsData = [
  { quarter: 'Q1', revenue: 120, users: 850, partnerships: 12 },
  { quarter: 'Q2', revenue: 180, users: 1200, partnerships: 18 },
  { quarter: 'Q3', revenue: 250, users: 1650, partnerships: 24 },
  { quarter: 'Q4', revenue: 320, users: 2100, partnerships: 30 }
];

export const ChartShowcase: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Interactive Data Visualization Library
        </h1>
        <p className="text-xl text-gray-400">
          Professional, animated charts built with Recharts + Framer Motion
        </p>
      </div>

      {/* Animated Metric Cards */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Animated Metric Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <AnimatedMetricCard
            icon={<TrendingUp className="w-6 h-6" style={{ color: '#CCFF00' }} />}
            label="Total Revenue"
            value={148.5}
            prefix="€"
            suffix="M"
            decimals={1}
            trend="up"
            trendValue="+185%"
            color="#CCFF00"
          />
          <AnimatedMetricCard
            icon={<Users className="w-6 h-6" style={{ color: '#9AFF00' }} />}
            label="Active Users"
            value={2100}
            trend="up"
            trendValue="+42%"
            color="#9AFF00"
          />
          <AnimatedMetricCard
            icon={<Target className="w-6 h-6" style={{ color: '#66FF00' }} />}
            label="Partnerships"
            value={30}
            trend="up"
            trendValue="+150%"
            color="#66FF00"
          />
          <AnimatedMetricCard
            icon={<DollarSign className="w-6 h-6" style={{ color: '#00d4ff' }} />}
            label="ARR"
            value={5.94}
            prefix="€"
            suffix="M"
            decimals={2}
            trend="up"
            trendValue="+220%"
            color="#00d4ff"
          />
          <AnimatedMetricCard
            icon={<Zap className="w-6 h-6" style={{ color: '#CCFF00' }} />}
            label="LTV/CAC"
            value={14.6}
            suffix=":1"
            decimals={1}
            trend="up"
            trendValue="+18%"
            color="#CCFF00"
          />
          <AnimatedMetricCard
            icon={<Award className="w-6 h-6" style={{ color: '#9AFF00' }} />}
            label="NRR"
            value={165}
            suffix="%"
            trend="up"
            trendValue="+12%"
            color="#9AFF00"
          />
        </div>
      </section>

      {/* Line Chart */}
      <section>
        <Card className="bg-slate-900/50 border-2 border-cyan-400/20">
          <CardHeader>
            <CardTitle className="text-white">Market Growth Trajectory</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedLineChart
              data={marketGrowthData}
              lines={[
                { dataKey: 'value', stroke: '#CCFF00', strokeWidth: 3, name: 'Actual' },
                { dataKey: 'projected', stroke: '#04a3ff', strokeWidth: 2, name: 'Projected' },
                { dataKey: 'target', stroke: '#66FF00', strokeWidth: 2, name: 'Target' }
              ]}
              xAxisKey="year"
              height={400}
              description="Multi-line chart with smooth animations"
            />
          </CardContent>
        </Card>
      </section>

      {/* Area Chart */}
      <section>
        <Card className="bg-slate-900/50 border-2 border-cyan-400/20">
          <CardHeader>
            <CardTitle className="text-white">Revenue Growth with Gradient Fill</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedAreaChart
              data={marketGrowthData}
              areas={[
                { dataKey: 'value', stroke: '#CCFF00', fill: '#CCFF00', name: 'Revenue', fillOpacity: 0.8 }
              ]}
              xAxisKey="year"
              height={400}
              description="Area chart with gradient fill animation"
            />
          </CardContent>
        </Card>
      </section>

      {/* Radar Chart */}
      <section>
        <Card className="bg-slate-900/50 border-2 border-cyan-400/20">
          <CardHeader>
            <CardTitle className="text-white">Technology Comparison (Radar)</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedRadarChart
              data={techComparisonData}
              radars={[
                { dataKey: 'QDaria', stroke: '#CCFF00', fill: '#CCFF00', fillOpacity: 0.6, name: 'QDaria' },
                { dataKey: 'Competitor', stroke: '#04a3ff', fill: '#04a3ff', fillOpacity: 0.3, name: 'Competitor Avg' }
              ]}
              angleKey="metric"
              height={400}
              description="Radar chart comparing key metrics"
            />
          </CardContent>
        </Card>
      </section>

      {/* Bar Chart */}
      <section>
        <Card className="bg-slate-900/50 border-2 border-cyan-400/20">
          <CardHeader>
            <CardTitle className="text-white">Quarterly Metrics (Bar)</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedBarChart
              data={quarterlyMetricsData}
              bars={[
                { dataKey: 'revenue', fill: '#CCFF00', name: 'Revenue (K)' },
                { dataKey: 'users', fill: '#9AFF00', name: 'Users' }
              ]}
              xAxisKey="quarter"
              height={400}
              description="Bar chart with staggered animation"
            />
          </CardContent>
        </Card>
      </section>

      {/* Pie Chart */}
      <section>
        <Card className="bg-slate-900/50 border-2 border-cyan-400/20">
          <CardHeader>
            <CardTitle className="text-white">Revenue Distribution (Pie)</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedPieChart
              data={revenueStreamsData}
              height={400}
              description="Interactive pie chart with hover effects"
              innerRadius={60}
              outerRadius={120}
            />
          </CardContent>
        </Card>
      </section>

      {/* Usage Instructions */}
      <section className="bg-slate-900/50 border-2 border-cyan-400/20 rounded-lg p-6 mt-12">
        <h2 className="text-2xl font-bold text-white mb-4">How to Use These Charts</h2>
        <div className="space-y-4 text-gray-300">
          <p>All chart components are now available in <code className="text-cyan-400">/src/components/pitch-deck/charts/</code></p>

          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="font-semibold mb-2">Import example:</p>
            <code className="text-sm text-cyan-400">
              {`import { AnimatedLineChart, AnimatedMetricCard } from '@/components/pitch-deck/charts';`}
            </code>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Features:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Smooth animations using Framer Motion</li>
              <li>Responsive design (works on all screen sizes)</li>
              <li>Interactive tooltips with custom styling</li>
              <li>Hover effects and active states</li>
              <li>Customizable colors, gradients, and animations</li>
              <li>Accessibility support (ARIA labels, keyboard nav)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Available Components:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code className="text-cyan-400">AnimatedLineChart</code> - Multi-line charts with smooth animations</li>
              <li><code className="text-cyan-400">AnimatedAreaChart</code> - Area charts with gradient fills</li>
              <li><code className="text-cyan-400">AnimatedRadarChart</code> - Radar/spider charts for comparisons</li>
              <li><code className="text-cyan-400">AnimatedBarChart</code> - Bar charts with stagger effects</li>
              <li><code className="text-cyan-400">AnimatedPieChart</code> - Pie/donut charts with expand animation</li>
              <li><code className="text-cyan-400">AnimatedCountUp</code> - Number counters with smooth counting</li>
              <li><code className="text-cyan-400">AnimatedMetricCard</code> - Metric cards with icons and trends</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChartShowcase;
