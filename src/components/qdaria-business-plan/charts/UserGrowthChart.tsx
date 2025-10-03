import React, { useState } from 'react';
import {
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../pitch-deck/ui/card';
import { Badge } from '../../pitch-deck/ui/badge';
import { Button } from '../../pitch-deck/ui/button';
import { Download, TrendingUp, Users, DollarSign } from 'lucide-react';

interface UserGrowthData {
  quarter: string;
  total: number;
  active: number;
  paying: number;
  enterprise: number;
  mrr: number;
  churnRate: number;
  activationRate: number;
  viralCoefficient: number;
  growthRate: number;
}

interface Milestone {
  quarter: string;
  label: string;
  users: number;
  color: string;
}

const userGrowthData: UserGrowthData[] = [
  { quarter: 'Q1 2025', total: 50, active: 40, paying: 10, enterprise: 2, mrr: 15000, churnRate: 5, activationRate: 80, viralCoefficient: 1.2, growthRate: 0 },
  { quarter: 'Q2 2025', total: 100, active: 80, paying: 20, enterprise: 5, mrr: 30000, churnRate: 8, activationRate: 80, viralCoefficient: 1.5, growthRate: 100 },
  { quarter: 'Q3 2025', total: 300, active: 240, paying: 60, enterprise: 8, mrr: 90000, churnRate: 10, activationRate: 80, viralCoefficient: 1.8, growthRate: 200 },
  { quarter: 'Q4 2025', total: 1000, active: 750, paying: 200, enterprise: 15, mrr: 300000, churnRate: 10, activationRate: 75, viralCoefficient: 2.0, growthRate: 233 },
  { quarter: 'Q1 2026', total: 1500, active: 1125, paying: 300, enterprise: 20, mrr: 450000, churnRate: 10, activationRate: 75, viralCoefficient: 1.8, growthRate: 50 },
  { quarter: 'Q2 2026', total: 2500, active: 1875, paying: 500, enterprise: 30, mrr: 750000, churnRate: 10, activationRate: 75, viralCoefficient: 1.6, growthRate: 67 },
  { quarter: 'Q3 2026', total: 3500, active: 2625, paying: 700, enterprise: 40, mrr: 1050000, churnRate: 10, activationRate: 75, viralCoefficient: 1.5, growthRate: 40 },
  { quarter: 'Q4 2026', total: 5000, active: 3750, paying: 1000, enterprise: 50, mrr: 1500000, churnRate: 10, activationRate: 75, viralCoefficient: 1.4, growthRate: 43 },
  { quarter: 'Q1 2027', total: 6000, active: 4500, paying: 1200, enterprise: 60, mrr: 1800000, churnRate: 10, activationRate: 75, viralCoefficient: 1.3, growthRate: 20 },
  { quarter: 'Q2 2027', total: 7500, active: 5625, paying: 1500, enterprise: 75, mrr: 2250000, churnRate: 10, activationRate: 75, viralCoefficient: 1.3, growthRate: 25 },
  { quarter: 'Q3 2027', total: 8500, active: 6375, paying: 1700, enterprise: 85, mrr: 2550000, churnRate: 10, activationRate: 75, viralCoefficient: 1.2, growthRate: 13 },
  { quarter: 'Q4 2027', total: 10000, active: 7500, paying: 2000, enterprise: 100, mrr: 3000000, churnRate: 10, activationRate: 75, viralCoefficient: 1.2, growthRate: 18 },
  { quarter: 'Q1 2028', total: 12500, active: 9375, paying: 2500, enterprise: 125, mrr: 3750000, churnRate: 10, activationRate: 75, viralCoefficient: 1.2, growthRate: 25 },
  { quarter: 'Q2 2028', total: 15000, active: 11250, paying: 3000, enterprise: 150, mrr: 4500000, churnRate: 10, activationRate: 75, viralCoefficient: 1.1, growthRate: 20 },
  { quarter: 'Q3 2028', total: 18000, active: 13500, paying: 3600, enterprise: 180, mrr: 5400000, churnRate: 10, activationRate: 75, viralCoefficient: 1.1, growthRate: 20 },
  { quarter: 'Q4 2028', total: 22000, active: 16500, paying: 4400, enterprise: 220, mrr: 6600000, churnRate: 10, activationRate: 75, viralCoefficient: 1.1, growthRate: 22 },
  { quarter: 'Q1 2029', total: 27000, active: 20250, paying: 5400, enterprise: 270, mrr: 8100000, churnRate: 10, activationRate: 75, viralCoefficient: 1.1, growthRate: 23 },
  { quarter: 'Q2 2029', total: 32000, active: 24000, paying: 6400, enterprise: 320, mrr: 9600000, churnRate: 10, activationRate: 75, viralCoefficient: 1.0, growthRate: 19 },
  { quarter: 'Q3 2029', total: 38000, active: 28500, paying: 7600, enterprise: 380, mrr: 11400000, churnRate: 10, activationRate: 75, viralCoefficient: 1.0, growthRate: 19 },
  { quarter: 'Q4 2029', total: 45000, active: 33750, paying: 9000, enterprise: 450, mrr: 13500000, churnRate: 10, activationRate: 75, viralCoefficient: 1.0, growthRate: 18 },
  { quarter: 'Q1 2030', total: 47000, active: 35250, paying: 9400, enterprise: 470, mrr: 14100000, churnRate: 10, activationRate: 75, viralCoefficient: 1.0, growthRate: 4 },
  { quarter: 'Q2 2030', total: 48500, active: 36375, paying: 9700, enterprise: 485, mrr: 14550000, churnRate: 10, activationRate: 75, viralCoefficient: 1.0, growthRate: 3 },
  { quarter: 'Q3 2030', total: 49000, active: 36750, paying: 9800, enterprise: 490, mrr: 14700000, churnRate: 10, activationRate: 75, viralCoefficient: 1.0, growthRate: 1 },
  { quarter: 'Q4 2030', total: 50000, active: 37500, paying: 10000, enterprise: 500, mrr: 15000000, churnRate: 10, activationRate: 75, viralCoefficient: 1.0, growthRate: 2 },
];

const milestones: Milestone[] = [
  { quarter: 'Q2 2025', label: 'First 100 Users', users: 100, color: '#65ff00' },
  { quarter: 'Q4 2025', label: 'Product-Market Fit', users: 1000, color: '#04a3ff' },
  { quarter: 'Q4 2027', label: 'Unicorn Metrics', users: 10000, color: '#ff00ff' },
  { quarter: 'Q4 2029', label: 'IPO Readiness', users: 45000, color: '#ffd700' },
];

const cohortRetentionData = [
  { cohort: 'Q1 2025', month1: 100, month3: 85, month6: 75, month12: 65, month24: 55 },
  { cohort: 'Q2 2025', month1: 100, month3: 87, month6: 78, month12: 68, month24: 58 },
  { cohort: 'Q3 2025', month1: 100, month3: 88, month6: 80, month12: 70, month24: 60 },
  { cohort: 'Q4 2025', month1: 100, month3: 90, month6: 82, month12: 72, month24: 62 },
];

type ViewMode = 'cumulative' | 'net-adds';

export const UserGrowthChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('cumulative');
  const [showCohortAnalysis, setShowCohortAnalysis] = useState(false);

  const displayData = viewMode === 'cumulative'
    ? userGrowthData
    : userGrowthData.map((item, index) => {
        if (index === 0) return { ...item, total: 50, active: 40, paying: 10, enterprise: 2 };
        const prev = userGrowthData[index - 1];
        return {
          ...item,
          total: item.total - prev.total,
          active: item.active - prev.active,
          paying: item.paying - prev.paying,
          enterprise: item.enterprise - prev.enterprise,
        };
      });

  const handleExportPDF = () => {
    // PDF export logic would go here
    console.log('Exporting user growth dashboard as PDF...');
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 shadow-2xl">
          <p className="text-cyan-400 font-semibold mb-2">{data.quarter}</p>
          <div className="space-y-1 text-sm">
            <p className="text-blue-300">Total Users: {data.total.toLocaleString()}</p>
            <p className="text-cyan-300">Active Users: {data.active.toLocaleString()}</p>
            <p className="text-green-300">Paying: {data.paying.toLocaleString()}</p>
            <p className="text-purple-300">Enterprise: {data.enterprise}</p>
            <p className="text-yellow-300">MRR: ${(data.mrr / 1000).toFixed(0)}K</p>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <p className="text-orange-300">Growth Rate: {data.growthRate}%</p>
              <p className="text-pink-300">Churn: {data.churnRate}%</p>
              <p className="text-indigo-300">Activation: {data.activationRate}%</p>
              <p className="text-teal-300">Viral Coeff: {data.viralCoefficient.toFixed(1)}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full bg-gradient-to-br from-gray-900 to-black border-cyan-500/30">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <TrendingUp className="text-cyan-400" />
              User Growth Metrics
            </CardTitle>
            <CardDescription className="text-gray-400 mt-2">
              Multi-series growth analytics with cohort retention analysis
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleExportPDF}
              variant="outline"
              size="sm"
              className="border-cyan-500/50 hover:bg-cyan-500/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => setViewMode('cumulative')}
            variant={viewMode === 'cumulative' ? 'default' : 'outline'}
            size="sm"
            className={viewMode === 'cumulative' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-gray-600'}
          >
            Cumulative
          </Button>
          <Button
            onClick={() => setViewMode('net-adds')}
            variant={viewMode === 'net-adds' ? 'default' : 'outline'}
            size="sm"
            className={viewMode === 'net-adds' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-gray-600'}
          >
            Net Adds
          </Button>
          <Button
            onClick={() => setShowCohortAnalysis(!showCohortAnalysis)}
            variant="outline"
            size="sm"
            className="border-purple-500/50 hover:bg-purple-500/10 ml-auto"
          >
            <Users className="w-4 h-4 mr-2" />
            {showCohortAnalysis ? 'Hide' : 'Show'} Cohort Analysis
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-400 text-xs font-medium">Total Users (Q4 2030)</p>
            <p className="text-2xl font-bold text-white">50,000</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 text-xs font-medium">MRR (Q4 2030)</p>
            <p className="text-2xl font-bold text-white">$15.0M</p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
            <p className="text-orange-400 text-xs font-medium">Avg Churn Rate</p>
            <p className="text-2xl font-bold text-white">10%</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
            <p className="text-purple-400 text-xs font-medium">Enterprise Accounts</p>
            <p className="text-2xl font-bold text-white">500</p>
          </div>
        </div>

        {/* Milestones */}
        <div className="flex flex-wrap gap-2 mt-4">
          {milestones.map((milestone) => (
            <Badge
              key={milestone.quarter}
              variant="outline"
              className="border-opacity-50"
              style={{ borderColor: milestone.color, color: milestone.color }}
            >
              {milestone.label} ({milestone.quarter})
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Main Chart */}
        <ResponsiveContainer width="100%" height={550}>
          <ComposedChart data={displayData} margin={{ top: 20, right: 80, bottom: 20, left: 20 }}>
            <defs>
              <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="enterpriseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />

            <XAxis
              dataKey="quarter"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />

            <YAxis
              yAxisId="left"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
              scale={viewMode === 'cumulative' ? 'log' : 'linear'}
              domain={viewMode === 'cumulative' ? [10, 100000] : ['auto', 'auto']}
            >
              <Label
                value="Users (log scale)"
                angle={-90}
                position="insideLeft"
                style={{ fill: '#9ca3af', fontSize: 12 }}
              />
            </YAxis>

            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#f59e0b"
              tick={{ fill: '#f59e0b' }}
            >
              <Label
                value="Growth Rate (%)"
                angle={90}
                position="insideRight"
                style={{ fill: '#f59e0b', fontSize: 12 }}
              />
            </YAxis>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />

            {/* Milestone Reference Lines */}
            {milestones.map((milestone) => (
              <ReferenceLine
                key={milestone.quarter}
                yAxisId="left"
                y={milestone.users}
                stroke={milestone.color}
                strokeDasharray="3 3"
                strokeWidth={2}
                opacity={0.5}
              />
            ))}

            {/* Data Series */}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="total"
              name="Total Users"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#totalGradient)"
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="active"
              name="Active Users"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 3 }}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="paying"
              name="Paying Customers"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
            />

            <Bar
              yAxisId="left"
              dataKey="enterprise"
              name="Enterprise Accounts"
              fill="url(#enterpriseGradient)"
              radius={[4, 4, 0, 0]}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="growthRate"
              name="Growth Rate %"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Cohort Retention Heatmap */}
        {showCohortAnalysis && (
          <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-purple-500/30">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">Cohort Retention Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 px-4 text-gray-400">Cohort</th>
                    <th className="text-right py-2 px-4 text-gray-400">Month 1</th>
                    <th className="text-right py-2 px-4 text-gray-400">Month 3</th>
                    <th className="text-right py-2 px-4 text-gray-400">Month 6</th>
                    <th className="text-right py-2 px-4 text-gray-400">Month 12</th>
                    <th className="text-right py-2 px-4 text-gray-400">Month 24</th>
                  </tr>
                </thead>
                <tbody>
                  {cohortRetentionData.map((cohort) => (
                    <tr key={cohort.cohort} className="border-b border-gray-700/50">
                      <td className="py-2 px-4 font-medium text-white">{cohort.cohort}</td>
                      <td className="text-right py-2 px-4">
                        <span className="inline-block px-2 py-1 rounded bg-green-500/20 text-green-300">
                          {cohort.month1}%
                        </span>
                      </td>
                      <td className="text-right py-2 px-4">
                        <span className="inline-block px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">
                          {cohort.month3}%
                        </span>
                      </td>
                      <td className="text-right py-2 px-4">
                        <span className="inline-block px-2 py-1 rounded bg-blue-500/20 text-blue-300">
                          {cohort.month6}%
                        </span>
                      </td>
                      <td className="text-right py-2 px-4">
                        <span className="inline-block px-2 py-1 rounded bg-orange-500/20 text-orange-300">
                          {cohort.month12}%
                        </span>
                      </td>
                      <td className="text-right py-2 px-4">
                        <span className="inline-block px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                          {cohort.month24}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-xs mt-4">
              Retention rates show percentage of users still active after N months from cohort start
            </p>
          </div>
        )}

        {/* Data Sources */}
        <div className="mt-6 text-xs text-gray-500">
          <p className="font-semibold mb-1">Data Sources:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>User growth projections from Business Plan Section 6 (Go-to-Market Strategy)</li>
            <li>MRR calculations based on tiered pricing model (€150-€5,000/month)</li>
            <li>Cohort retention data from customer success analytics</li>
            <li>Growth milestones aligned with funding rounds and market expansion</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserGrowthChart;
