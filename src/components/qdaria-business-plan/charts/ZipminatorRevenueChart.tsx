import React, { useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/qdaria-business-plan/ui/card';
import { Button } from '@/components/qdaria-business-plan/ui/button';
import { Download, TrendingUp, Users, DollarSign, Package } from 'lucide-react';

interface PricingTier {
  name: string;
  monthlyPrice: number; // in EUR
  targetCustomers: number;
  color: string;
}

interface YearlyData {
  year: string;
  starter: number;
  professional: number;
  enterprise: number;
  government: number;
  total: number;
  totalCustomers: number;
  arr: number;
  growthRate: number;
}

const pricingTiers: PricingTier[] = [
  { name: 'Starter', monthlyPrice: 495, targetCustomers: 0, color: '#3498db' },
  { name: 'Professional', monthlyPrice: 2495, targetCustomers: 0, color: '#2ecc71' },
  { name: 'Enterprise', monthlyPrice: 9995, targetCustomers: 0, color: '#9b59b6' },
  { name: 'Government', monthlyPrice: 25000, targetCustomers: 0, color: '#e74c3c' }
];

// QCaaS Revenue Projections 2026-2030
const revenueData: YearlyData[] = [
  {
    year: '2026',
    starter: 0.3, // €300K (50 customers × €495 × 12)
    professional: 0.6, // €600K (20 customers × €2,495 × 12)
    enterprise: 1.2, // €1.2M (10 customers × €9,995 × 12)
    government: 0.5, // €500K (2 customers × €25,000 × 12 avg)
    total: 2.6,
    totalCustomers: 82,
    arr: 2.6,
    growthRate: 0
  },
  {
    year: '2027',
    starter: 1.2, // €1.2M (200 customers)
    professional: 2.4, // €2.4M (80 customers)
    enterprise: 4.8, // €4.8M (40 customers)
    government: 2.0, // €2M (8 customers avg)
    total: 10.4,
    totalCustomers: 328,
    arr: 10.4,
    growthRate: 300
  },
  {
    year: '2028',
    starter: 2.4, // €2.4M (400 customers)
    professional: 6.0, // €6M (200 customers)
    enterprise: 12.0, // €12M (100 customers)
    government: 5.0, // €5M (20 customers avg)
    total: 25.4,
    totalCustomers: 720,
    arr: 25.4,
    growthRate: 144
  },
  {
    year: '2029',
    starter: 3.6, // €3.6M (600 customers)
    professional: 12.0, // €12M (400 customers)
    enterprise: 24.0, // €24M (200 customers)
    government: 10.0, // €10M (40 customers avg)
    total: 49.6,
    totalCustomers: 1240,
    arr: 49.6,
    growthRate: 95
  },
  {
    year: '2030',
    starter: 4.8, // €4.8M (800 customers)
    professional: 18.0, // €18M (600 customers)
    enterprise: 36.0, // €36M (300 customers)
    government: 15.0, // €15M (60 customers avg)
    total: 73.8,
    totalCustomers: 1760,
    arr: 73.8,
    growthRate: 49
  }
];

const ZipminatorRevenueChart: React.FC = () => {
  const [view, setView] = useState<'revenue' | 'customers' | 'growth'>('revenue');
  const [showProjection, setShowProjection] = useState(true);

  const handleExport = () => {
    const csv = [
      ['Year', 'Starter (€M)', 'Professional (€M)', 'Enterprise (€M)', 'Government (€M)', 'Total (€M)', 'Total Customers', 'ARR (€M)', 'YoY Growth (%)'],
      ...revenueData.map(d => [
        d.year,
        d.starter.toFixed(1),
        d.professional.toFixed(1),
        d.enterprise.toFixed(1),
        d.government.toFixed(1),
        d.total.toFixed(1),
        d.totalCustomers,
        d.arr.toFixed(1),
        d.growthRate.toFixed(0)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zipminator-qcaas-revenue-projections.csv';
    a.click();
  };

  const formatCurrency = (value: number) => {
    return `€${value.toFixed(1)}M`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = revenueData.find(d => d.year === label);
    if (!data) return null;

    return (
      <div className="bg-slate-900/95 border border-cyan-500/30 rounded-lg p-4 shadow-xl backdrop-blur-md">
        <p className="font-bold text-white mb-2">{label}</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-blue-400">Starter:</span>
            <span className="text-white font-semibold">{formatCurrency(data.starter)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-green-400">Professional:</span>
            <span className="text-white font-semibold">{formatCurrency(data.professional)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-purple-400">Enterprise:</span>
            <span className="text-white font-semibold">{formatCurrency(data.enterprise)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-red-400">Government:</span>
            <span className="text-white font-semibold">{formatCurrency(data.government)}</span>
          </div>
          <div className="border-t border-slate-700 my-2 pt-2">
            <div className="flex justify-between gap-4">
              <span className="text-cyan-400 font-bold">Total Revenue:</span>
              <span className="text-cyan-400 font-bold">{formatCurrency(data.total)}</span>
            </div>
            <div className="flex justify-between gap-4 mt-1">
              <span className="text-gray-400">Customers:</span>
              <span className="text-white">{formatNumber(data.totalCustomers)}</span>
            </div>
            <div className="flex justify-between gap-4 mt-1">
              <span className="text-gray-400">YoY Growth:</span>
              <span className={data.growthRate > 0 ? "text-green-400" : "text-gray-400"}>
                {data.growthRate > 0 ? '+' : ''}{data.growthRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-cyan-500/20">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Zipminator QCaaS Revenue Projections (2026-2030)
            </CardTitle>
            <p className="text-slate-400 text-sm">
              Post-quantum cryptography subscription revenue by pricing tier
            </p>
          </div>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="border-cyan-500/30 hover:bg-cyan-500/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => setView('revenue')}
            variant={view === 'revenue' ? 'default' : 'outline'}
            size="sm"
            className={view === 'revenue' ? 'bg-cyan-600 hover:bg-cyan-700' : 'border-slate-700'}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Revenue
          </Button>
          <Button
            onClick={() => setView('customers')}
            variant={view === 'customers' ? 'default' : 'outline'}
            size="sm"
            className={view === 'customers' ? 'bg-cyan-600 hover:bg-cyan-700' : 'border-slate-700'}
          >
            <Users className="w-4 h-4 mr-2" />
            Customers
          </Button>
          <Button
            onClick={() => setView('growth')}
            variant={view === 'growth' ? 'default' : 'outline'}
            size="sm"
            className={view === 'growth' ? 'bg-cyan-600 hover:bg-cyan-700' : 'border-slate-700'}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Growth Rate
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Chart */}
        <div className="h-[500px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00CED1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00CED1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />

              <XAxis
                dataKey="year"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
                tickLine={{ stroke: '#475569' }}
              />

              {view === 'revenue' && (
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                  tickLine={{ stroke: '#475569' }}
                  tickFormatter={(value) => `€${value}M`}
                  label={{ value: 'Revenue (€M)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
              )}

              {view === 'customers' && (
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                  tickLine={{ stroke: '#475569' }}
                  tickFormatter={(value) => value.toLocaleString()}
                  label={{ value: 'Total Customers', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
              )}

              {view === 'growth' && (
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                  tickLine={{ stroke: '#475569' }}
                  tickFormatter={(value) => `${value}%`}
                  label={{ value: 'YoY Growth (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
              )}

              <Tooltip content={<CustomTooltip />} />

              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />

              {view === 'revenue' && (
                <>
                  <Bar dataKey="starter" stackId="revenue" fill="#3498db" name="Starter (€495/mo)" />
                  <Bar dataKey="professional" stackId="revenue" fill="#2ecc71" name="Professional (€2,495/mo)" />
                  <Bar dataKey="enterprise" stackId="revenue" fill="#9b59b6" name="Enterprise (€9,995/mo)" />
                  <Bar dataKey="government" stackId="revenue" fill="#e74c3c" name="Government/Defense (Custom)" />

                  {showProjection && (
                    <Area
                      type="monotone"
                      dataKey="total"
                      fill="url(#totalGradient)"
                      stroke="#00CED1"
                      strokeWidth={2}
                      name="Total Revenue Projection"
                    />
                  )}
                </>
              )}

              {view === 'customers' && (
                <Line
                  type="monotone"
                  dataKey="totalCustomers"
                  stroke="#00CED1"
                  strokeWidth={3}
                  dot={{ fill: '#00CED1', r: 6 }}
                  name="Total Customers"
                />
              )}

              {view === 'growth' && (
                <>
                  <Bar dataKey="growthRate" fill="#2ecc71" name="YoY Growth Rate (%)" />
                  <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Pricing Tier Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Starter</span>
            </div>
            <div className="text-2xl font-bold text-white">€495/mo</div>
            <div className="text-xs text-slate-400 mt-1">Up to 10 users</div>
          </div>

          <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Professional</span>
            </div>
            <div className="text-2xl font-bold text-white">€2,495/mo</div>
            <div className="text-xs text-slate-400 mt-1">Up to 100 users</div>
          </div>

          <div className="p-4 rounded-lg border border-purple-500/30 bg-purple-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">Enterprise</span>
            </div>
            <div className="text-2xl font-bold text-white">€9,995/mo</div>
            <div className="text-xs text-slate-400 mt-1">Unlimited users</div>
          </div>

          <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400">Government</span>
            </div>
            <div className="text-2xl font-bold text-white">Custom</div>
            <div className="text-xs text-slate-400 mt-1">FIPS 140-3 compliance</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 rounded bg-slate-800/50">
            <div className="text-xl font-bold text-cyan-400">€73.8M</div>
            <div className="text-xs text-slate-400">2030 ARR Target</div>
          </div>
          <div className="text-center p-3 rounded bg-slate-800/50">
            <div className="text-xl font-bold text-green-400">1,760</div>
            <div className="text-xs text-slate-400">Total Customers</div>
          </div>
          <div className="text-center p-3 rounded bg-slate-800/50">
            <div className="text-xl font-bold text-purple-400">168% CAGR</div>
            <div className="text-xs text-slate-400">2026-2030</div>
          </div>
          <div className="text-center p-3 rounded bg-slate-800/50">
            <div className="text-xl font-bold text-orange-400">€41,900</div>
            <div className="text-xs text-slate-400">Avg Customer ARR</div>
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-500 text-center">
          Projections based on conservative adoption rates for post-quantum cryptography standards (NIST PQC).
          Assumes enterprise adoption accelerates 2028-2030 as quantum threats materialize.
        </div>
      </CardContent>
    </Card>
  );
};

export default ZipminatorRevenueChart;
