import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Button } from '@/components/pitch-deck/ui/button';
import { Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Financial data
const revenueData = [
  { month: 'Q1', value: 45 },
  { month: 'Q2', value: 78 },
  { month: 'Q3', value: 125 },
  { month: 'Q4', value: 195 },
  { month: 'Q1', value: 280 },
  { month: 'Q2', value: 350 },
];

const ebitdaData = [
  { month: 'Q1', margin: -15 },
  { month: 'Q2', margin: -8 },
  { month: 'Q3', margin: 5 },
  { month: 'Q4', margin: 18 },
  { month: 'Q1', margin: 25 },
  { month: 'Q2', margin: 30 },
];

const arrGrowthData = [
  { month: 'Jan', growth: 120 },
  { month: 'Feb', growth: 145 },
  { month: 'Mar', growth: 165 },
  { month: 'Apr', growth: 180 },
  { month: 'May', growth: 195 },
  { month: 'Jun', growth: 200 },
];

const burnRateData = [
  { month: 'Q1', burn: 3.2, revenue: 1.2 },
  { month: 'Q2', burn: 2.9, revenue: 2.1 },
  { month: 'Q3', burn: 2.7, revenue: 3.8 },
  { month: 'Q4', burn: 2.5, revenue: 5.2 },
  { month: 'Q1', burn: 2.2, revenue: 7.5 },
  { month: 'Q2', burn: 0, revenue: 12.3 },
];

const cacLtvData = [
  { metric: 'CAC', value: 10.8 },
  { metric: 'LTV', value: 158 },
];

const customerData = [
  { quarter: 'Q1 24', count: 125 },
  { quarter: 'Q2 24', count: 285 },
  { quarter: 'Q3 24', count: 520 },
  { quarter: 'Q4 24', count: 890 },
  { quarter: 'Q1 25', count: 1540 },
  { quarter: 'Q2 25', count: 2755 },
];

const marginData = [
  { category: 'Revenue', value: 100 },
  { category: 'COGS', value: -30 },
  { category: 'Gross', value: 70 },
  { category: 'S&M', value: -25 },
  { category: 'R&D', value: -20 },
  { category: 'G&A', value: -10 },
  { category: 'EBITDA', value: 30 },
];

const ipoReadinessData = [
  { milestone: 'Revenue', progress: 95 },
  { milestone: 'Profitability', progress: 85 },
  { milestone: 'Governance', progress: 80 },
  { milestone: 'Market Share', progress: 75 },
  { milestone: 'Team Scale', progress: 90 },
];

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
  subtitle?: string;
  chart: React.ReactNode;
  benchmark?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeType,
  subtitle,
  chart,
  benchmark,
}) => {
  const getTrendIcon = () => {
    switch (changeType) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-[#000212]/90 to-[#04a3ff]/10 border border-[#04a3ff]/30 backdrop-blur-xl hover:border-[#04a3ff]/60 transition-all duration-300 group">
      {/* Glassmorphic glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04a3ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-bold bg-gradient-to-r from-white to-[#04a3ff] bg-clip-text text-transparent">
              {value}
            </span>
            {subtitle && (
              <span className="text-xs text-gray-500 mt-1">{subtitle}</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={`text-sm font-semibold ${getChangeColor()}`}>
              {change}
            </span>
          </div>
        </div>

        {benchmark && (
          <div className="text-xs text-gray-500 border-t border-[#04a3ff]/20 pt-2">
            vs. {benchmark}
          </div>
        )}

        <div className="h-16 -mx-2">
          {chart}
        </div>
      </CardContent>
    </Card>
  );
};

export const FinancialDashboard: React.FC = () => {
  const [exportLoading, setExportLoading] = useState(false);

  const handleExportPDF = async () => {
    setExportLoading(true);
    // Simulate PDF export
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, use html2canvas + jsPDF
    console.log('Exporting dashboard as PDF...');

    setExportLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#000212] p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-[#04a3ff] to-white bg-clip-text text-transparent mb-2">
              Financial Dashboard
            </h1>
            <p className="text-gray-400">
              Real-time KPIs and performance metrics
            </p>
          </div>

          <Button
            onClick={handleExportPDF}
            disabled={exportLoading}
            className="bg-[#04a3ff] hover:bg-[#0389d6] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            {exportLoading ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <KPICard
          title="Total Revenue"
          value="$350M"
          change="+110% YoY"
          changeType="up"
          subtitle="2030 Projection"
          benchmark="Industry avg: $180M"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#04a3ff" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#04a3ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#04a3ff"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          }
        />

        {/* EBITDA Card */}
        <KPICard
          title="EBITDA Margin"
          value="30%"
          change="+45pp"
          changeType="up"
          subtitle="$105M EBITDA"
          benchmark="SaaS leaders: 25%"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ebitdaData}>
                <Line
                  type="monotone"
                  dataKey="margin"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 3 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          }
        />

        {/* ARR Growth Card */}
        <KPICard
          title="ARR Growth"
          value="200%"
          change="CAGR 24-30"
          changeType="up"
          subtitle="$315M ARR"
          benchmark="Target: 150%"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arrGrowthData}>
                <Bar
                  dataKey="growth"
                  fill="#04a3ff"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          }
        />

        {/* Burn Rate Card */}
        <KPICard
          title="Cash Runway"
          value="Profitable"
          change="Q2 2025"
          changeType="up"
          subtitle="Was $2.5M/mo burn"
          benchmark="Breakeven achieved"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={burnRateData}>
                <defs>
                  <linearGradient id="burnGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="burn"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#burnGradient)"
                  animationDuration={1000}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="none"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          }
        />

        {/* CAC/LTV Card */}
        <KPICard
          title="Unit Economics"
          value="14.6:1"
          change="LTV/CAC"
          changeType="up"
          subtitle="CAC: $10,800"
          benchmark="Target: >3:1"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cacLtvData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="metric" hide />
                <Bar
                  dataKey="value"
                  fill="#04a3ff"
                  radius={[0, 4, 4, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          }
        />

        {/* Customer Count Card */}
        <KPICard
          title="Customer Base"
          value="2,755"
          change="+180% YoY"
          changeType="up"
          subtitle="2030 Customers"
          benchmark="Retention: 95%"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customerData}>
                <defs>
                  <linearGradient id="customerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#customerGradient)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          }
        />

        {/* Gross Margin Card */}
        <KPICard
          title="Gross Margin"
          value="70%"
          change="Best-in-class"
          changeType="up"
          subtitle="vs 30% COGS"
          benchmark="Industry: 65%"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marginData.slice(0, 3)}>
                <Bar
                  dataKey="value"
                  fill="#10b981"
                  radius={[4, 4, 4, 4]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          }
        />

        {/* IPO Readiness Card */}
        <KPICard
          title="IPO Readiness"
          value="85%"
          change="2028 Target"
          changeType="up"
          subtitle="5 metrics tracked"
          benchmark="Threshold: 80%"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ipoReadinessData} layout="vertical">
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis type="category" dataKey="milestone" hide />
                <Bar
                  dataKey="progress"
                  fill="#fbbf24"
                  radius={[0, 4, 4, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          }
        />
      </div>

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#000212]/90 to-[#04a3ff]/10 border border-[#04a3ff]/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#04a3ff]">$45M</div>
          <div className="text-sm text-gray-400">Raised to Date</div>
        </div>

        <div className="bg-gradient-to-br from-[#000212]/90 to-[#10b981]/10 border border-[#10b981]/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#10b981]">18 Months</div>
          <div className="text-sm text-gray-400">To Profitability</div>
        </div>

        <div className="bg-gradient-to-br from-[#000212]/90 to-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#8b5cf6]">95%</div>
          <div className="text-sm text-gray-400">Customer Retention</div>
        </div>

        <div className="bg-gradient-to-br from-[#000212]/90 to-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#fbbf24]">3.2x</div>
          <div className="text-sm text-gray-400">Revenue Multiple</div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto mt-8 text-center text-sm text-gray-500">
        <p>
          All projections based on conservative models and validated market assumptions.
          <br />
          Last updated: {new Date().toLocaleDateString()} | Confidence: 87%
        </p>
      </div>
    </div>
  );
};

export default FinancialDashboard;
