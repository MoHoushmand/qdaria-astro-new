import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { motion } from 'framer-motion';

// QDaria brand colors
const COLORS = {
  revenue: '#04a3ff',      // Electric blue
  ebitda: '#00ffd3',       // Teal
  netIncome: '#65ff00',    // Green
  cashFlow: '#9b59b6'      // Purple
};

// Financial data for three scenarios (in millions USD)
const financialData = {
  conservative: [
    { year: 2025, revenue: 0.1, ebitda: -0.5, netIncome: -0.8, cashFlow: -0.6 },
    { year: 2026, revenue: 2, ebitda: -1, netIncome: -1.5, cashFlow: -0.8 },
    { year: 2027, revenue: 10, ebitda: 1, netIncome: 0, cashFlow: 1.5 },
    { year: 2028, revenue: 50, ebitda: 10, netIncome: 5, cashFlow: 12 },
    { year: 2029, revenue: 150, ebitda: 40, netIncome: 25, cashFlow: 45 },
    { year: 2030, revenue: 400, ebitda: 120, netIncome: 80, cashFlow: 130 }
  ],
  base: [
    { year: 2025, revenue: 0.1, ebitda: -0.5, netIncome: -0.8, cashFlow: -0.6 },
    { year: 2026, revenue: 5, ebitda: -0.5, netIncome: -1, cashFlow: -0.3 },
    { year: 2027, revenue: 25, ebitda: 5, netIncome: 2, cashFlow: 7 },
    { year: 2028, revenue: 100, ebitda: 25, netIncome: 15, cashFlow: 30 },
    { year: 2029, revenue: 300, ebitda: 80, netIncome: 50, cashFlow: 90 },
    { year: 2030, revenue: 800, ebitda: 240, netIncome: 160, cashFlow: 260 }
  ],
  optimistic: [
    { year: 2025, revenue: 0.1, ebitda: -0.3, netIncome: -0.5, cashFlow: -0.4 },
    { year: 2026, revenue: 10, ebitda: 1, netIncome: 0, cashFlow: 1.5 },
    { year: 2027, revenue: 50, ebitda: 12, netIncome: 8, cashFlow: 15 },
    { year: 2028, revenue: 200, ebitda: 60, netIncome: 40, cashFlow: 70 },
    { year: 2029, revenue: 600, ebitda: 180, netIncome: 120, cashFlow: 200 },
    { year: 2030, revenue: 1500, ebitda: 450, netIncome: 300, cashFlow: 480 }
  ]
};

type Scenario = 'conservative' | 'base' | 'optimistic';

interface FinancialProjectionsChartProps {
  title?: string;
  description?: string;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border-2 border-cyan-400/50 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        <p className="text-cyan-400 font-semibold mb-2 text-base">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <span className="text-gray-300 text-sm">{entry.name}:</span>
            <span className="font-bold text-sm" style={{ color: entry.color }}>
              ${typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}M
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const formatYAxis = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
  if (value >= 1) return `$${value.toFixed(0)}M`;
  return `$${value.toFixed(1)}M`;
};

export const FinancialProjectionsChart: React.FC<FinancialProjectionsChartProps> = ({
  title = 'Financial Projections (2025-2030)',
  description = 'Three-scenario revenue and profitability projections',
  height = 500
}) => {
  const [scenario, setScenario] = useState<Scenario>('base');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const currentData = financialData[scenario];

  const scenarioColors = {
    conservative: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
    base: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
    optimistic: 'bg-green-500/20 border-green-500/50 text-green-300'
  };

  const ScenarioButton = ({ name, label }: { name: Scenario; label: string }) => (
    <button
      onClick={() => setScenario(name)}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 border-2 ${
        scenario === name
          ? scenarioColors[name]
          : 'bg-slate-800/50 border-slate-600/50 text-slate-400 hover:bg-slate-700/50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-slate-900/40 rounded-2xl p-6 border border-cyan-400/20 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      {/* Scenario Selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        <ScenarioButton name="conservative" label="Conservative" />
        <ScenarioButton name="base" label="Base Case" />
        <ScenarioButton name="optimistic" label="Optimistic" />

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 rounded text-sm font-medium transition-all ${
              chartType === 'area'
                ? 'bg-cyan-500/30 text-cyan-300'
                : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded text-sm font-medium transition-all ${
              chartType === 'line'
                ? 'bg-cyan-500/30 text-cyan-300'
                : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
            }`}
          >
            Line
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        {chartType === 'area' ? (
          <AreaChart
            data={currentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.revenue} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS.revenue} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorEbitda" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.ebitda} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS.ebitda} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorNetIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.netIncome} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS.netIncome} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorCashFlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.cashFlow} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS.cashFlow} stopOpacity={0.1}/>
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(4, 163, 255, 0.1)"
              strokeOpacity={0.5}
            />

            <XAxis
              dataKey="year"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={{ stroke: '#475569' }}
            />

            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={{ stroke: '#475569' }}
              tickFormatter={formatYAxis}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="square"
            />

            <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke={COLORS.revenue}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
              name="Revenue"
            />

            <Area
              type="monotone"
              dataKey="ebitda"
              stroke={COLORS.ebitda}
              fillOpacity={1}
              fill="url(#colorEbitda)"
              strokeWidth={2}
              name="EBITDA"
            />

            <Area
              type="monotone"
              dataKey="netIncome"
              stroke={COLORS.netIncome}
              fillOpacity={1}
              fill="url(#colorNetIncome)"
              strokeWidth={2}
              name="Net Income"
            />

            <Area
              type="monotone"
              dataKey="cashFlow"
              stroke={COLORS.cashFlow}
              fillOpacity={1}
              fill="url(#colorCashFlow)"
              strokeWidth={2}
              name="Cash Flow"
            />
          </AreaChart>
        ) : (
          <LineChart
            data={currentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(4, 163, 255, 0.1)"
              strokeOpacity={0.5}
            />

            <XAxis
              dataKey="year"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={{ stroke: '#475569' }}
            />

            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={{ stroke: '#475569' }}
              tickFormatter={formatYAxis}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />

            <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke={COLORS.revenue}
              strokeWidth={3}
              name="Revenue"
              dot={{ fill: COLORS.revenue, strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />

            <Line
              type="monotone"
              dataKey="ebitda"
              stroke={COLORS.ebitda}
              strokeWidth={3}
              name="EBITDA"
              dot={{ fill: COLORS.ebitda, strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />

            <Line
              type="monotone"
              dataKey="netIncome"
              stroke={COLORS.netIncome}
              strokeWidth={3}
              name="Net Income"
              dot={{ fill: COLORS.netIncome, strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />

            <Line
              type="monotone"
              dataKey="cashFlow"
              stroke={COLORS.cashFlow}
              strokeWidth={3}
              name="Cash Flow"
              dot={{ fill: COLORS.cashFlow, strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>

      {/* Key Metrics Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-cyan-400/20">
          <div className="text-xs text-gray-400 mb-1">2030 Revenue</div>
          <div className="text-xl font-bold" style={{ color: COLORS.revenue }}>
            ${currentData[5].revenue.toFixed(0)}M
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3 border border-cyan-400/20">
          <div className="text-xs text-gray-400 mb-1">2030 EBITDA</div>
          <div className="text-xl font-bold" style={{ color: COLORS.ebitda }}>
            ${currentData[5].ebitda.toFixed(0)}M
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3 border border-cyan-400/20">
          <div className="text-xs text-gray-400 mb-1">2030 Net Income</div>
          <div className="text-xl font-bold" style={{ color: COLORS.netIncome }}>
            ${currentData[5].netIncome.toFixed(0)}M
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3 border border-cyan-400/20">
          <div className="text-xs text-gray-400 mb-1">2030 Cash Flow</div>
          <div className="text-xl font-bold" style={{ color: COLORS.cashFlow }}>
            ${currentData[5].cashFlow.toFixed(0)}M
          </div>
        </div>
      </div>

      {/* Scenario Description */}
      <div className="mt-4 p-4 bg-slate-800/30 rounded-lg border border-cyan-400/10">
        <p className="text-sm text-gray-300">
          {scenario === 'conservative' && (
            <>
              <strong className="text-yellow-300">Conservative Scenario:</strong> Assumes slower market adoption,
              limited partnership success, and conservative pricing. Break-even achieved in 2027.
            </>
          )}
          {scenario === 'base' && (
            <>
              <strong className="text-blue-300">Base Case Scenario:</strong> Realistic market penetration with
              successful strategic partnerships and steady customer acquisition. Break-even in late 2026.
            </>
          )}
          {scenario === 'optimistic' && (
            <>
              <strong className="text-green-300">Optimistic Scenario:</strong> Rapid market adoption, strong
              enterprise partnerships, and premium pricing power. Break-even achieved in early 2026.
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
};
