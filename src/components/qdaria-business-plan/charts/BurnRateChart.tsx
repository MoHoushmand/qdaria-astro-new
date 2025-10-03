import React, { useState } from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
  ReferenceArea,
} from 'recharts';
import { Download } from 'lucide-react';

// TypeScript interfaces
interface MonthlyBurnData {
  month: string;
  date: string;
  burnRate: number;
  runway: number;
  cashBalance: number;
  scenario: 'actual' | 'projected';
}

interface FundingEvent {
  month: string;
  amount: number;
  round: string;
  description: string;
}

interface ScenarioData {
  name: string;
  burnMultiplier: number;
  description: string;
}

// QDaria brand colors
const COLORS = {
  primary: '#04a3ff',
  success: '#65ff00',
  warning: '#ffbb00',
  danger: '#ff4444',
  background: '#000212',
  safe: '#65ff00',
  caution: '#ffbb00',
  critical: '#ff4444',
};

// Funding events
const fundingEvents: FundingEvent[] = [
  { month: 'Mar 2025', amount: 12, round: 'Series A', description: '€12M Series A Funding' },
  { month: 'Sep 2027', amount: 20, round: 'Series B', description: '€20M Series B (projected)' },
];

// Scenarios
const scenarios: ScenarioData[] = [
  { name: 'Conservative', burnMultiplier: 0.7, description: 'Reduced spending, extend runway' },
  { name: 'Base', burnMultiplier: 1.0, description: 'Current burn rate trajectory' },
  { name: 'Optimistic', burnMultiplier: 1.3, description: 'Aggressive growth investment' },
];

// Generate monthly burn rate data
const generateBurnData = (scenarioMultiplier: number = 1.0): MonthlyBurnData[] => {
  const months = [
    'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025',
    'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025',
    'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026',
    'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 'Nov 2026', 'Dec 2026',
    'Jan 2027', 'Feb 2027', 'Mar 2027', 'Apr 2027', 'May 2027', 'Jun 2027',
    'Jul 2027', 'Aug 2027', 'Sep 2027', 'Oct 2027', 'Nov 2027', 'Dec 2027',
  ];

  let cashBalance = 5000; // Starting with $5M
  const data: MonthlyBurnData[] = [];

  months.forEach((month, index) => {
    // Base burn rate increases over time as we scale
    let baseBurn = 500 + (index * 15); // Starting at $500K/month, increasing

    // Apply scenario multiplier
    const burnRate = baseBurn * scenarioMultiplier;

    // Funding injections
    if (month === 'Mar 2025') {
      cashBalance += 12000; // Series A
    }
    if (month === 'Sep 2027') {
      cashBalance += 20000; // Series B
    }

    // Deduct burn
    cashBalance -= burnRate;

    // Calculate runway (months of cash remaining)
    const runway = cashBalance > 0 ? Math.floor(cashBalance / burnRate) : 0;

    data.push({
      month,
      date: month,
      burnRate: Math.round(burnRate),
      runway,
      cashBalance: Math.round(cashBalance),
      scenario: index < 3 ? 'actual' : 'projected',
    });
  });

  return data;
};

interface BurnRateChartProps {
  className?: string;
}

export const BurnRateChart: React.FC<BurnRateChartProps> = ({ className = '' }) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('Base');
  const [showRunwayExtension, setShowRunwayExtension] = useState<boolean>(false);

  const currentScenario = scenarios.find((s) => s.name === selectedScenario) || scenarios[1];
  const burnData = generateBurnData(currentScenario.burnMultiplier);

  // Find break-even point (when burn becomes positive cash flow)
  const breakEvenMonth = 'Q2 2027';

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Month', 'Burn Rate ($K)', 'Runway (months)', 'Cash Balance ($K)'];
    const rows = burnData.map((d) => [
      d.month,
      d.burnRate.toString(),
      d.runway.toString(),
      d.cashBalance.toString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qdaria-burn-rate-${selectedScenario.toLowerCase()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    const fundingEvent = fundingEvents.find((e) => e.month === data.month);

    return (
      <div
        className="bg-[#000212]/95 border border-[#04a3ff]/30 rounded-lg p-4 backdrop-blur-sm min-w-[200px]"
        style={{ boxShadow: '0 0 20px rgba(4, 163, 255, 0.3)' }}
      >
        <h4 className="text-white font-bold mb-2">{data.month}</h4>
        {fundingEvent && (
          <div className="mb-2 p-2 bg-[#65ff00]/20 rounded border border-[#65ff00]/40">
            <p className="text-[#65ff00] font-bold text-xs">{fundingEvent.round}</p>
            <p className="text-white text-sm">€{fundingEvent.amount}M</p>
          </div>
        )}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400 text-xs">Burn Rate:</span>
            <span className="text-[#ff4444] font-semibold">${data.burnRate}K/mo</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-xs">Runway:</span>
            <span className="text-[#ffbb00] font-semibold">{data.runway} months</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-xs">Cash Balance:</span>
            <span className="text-[#04a3ff] font-semibold">${(data.cashBalance / 1000).toFixed(1)}M</span>
          </div>
        </div>
      </div>
    );
  };

  // Determine zone colors for runway
  const getRunwayColor = (runway: number): string => {
    if (runway >= 12) return COLORS.safe;
    if (runway >= 6) return COLORS.warning;
    return COLORS.danger;
  };

  return (
    <div className={`bg-gradient-to-br from-[#000212] to-[#001a2e] rounded-xl p-6 border border-[#04a3ff]/30 ${className}`}>
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Cash Burn Rate & Runway Analysis</h3>
          <p className="text-gray-400 text-sm">
            Monthly burn trajectory with funding events and runway projections
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-[#04a3ff]/20 hover:bg-[#04a3ff]/30 text-white rounded-lg transition-all"
          aria-label="Export data to CSV"
        >
          <Download size={16} />
          <span className="text-sm">Export CSV</span>
        </button>
      </div>

      {/* Current Status Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#ff4444]/20">
          <div className="text-gray-400 text-xs mb-1">Monthly Burn</div>
          <div className="text-2xl font-bold text-[#ff4444]">
            ${burnData[0]?.burnRate || 850}K
          </div>
          <div className="text-xs text-gray-500 mt-1">Current rate</div>
        </div>
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#04a3ff]/20">
          <div className="text-gray-400 text-xs mb-1">Cash Balance</div>
          <div className="text-2xl font-bold text-[#04a3ff]">
            €{(burnData[0]?.cashBalance / 1000 || 12).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-500 mt-1">After Series A</div>
        </div>
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#ffbb00]/20">
          <div className="text-gray-400 text-xs mb-1">Runway</div>
          <div className="text-2xl font-bold text-[#ffbb00]">
            {burnData[0]?.runway || 14} mo
          </div>
          <div className="text-xs text-gray-500 mt-1">Months remaining</div>
        </div>
        <div className="bg-[#000212]/60 rounded-lg p-4 border border-[#65ff00]/20">
          <div className="text-gray-400 text-xs mb-1">Break-even</div>
          <div className="text-2xl font-bold text-[#65ff00]">{breakEvenMonth}</div>
          <div className="text-xs text-gray-500 mt-1">Projected</div>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="mb-6">
        <label className="text-gray-400 text-sm mb-2 block">Scenario Planning:</label>
        <div className="flex flex-wrap gap-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.name}
              onClick={() => setSelectedScenario(scenario.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedScenario === scenario.name
                  ? 'bg-[#04a3ff] text-white'
                  : 'bg-[#04a3ff]/20 text-gray-300 hover:bg-[#04a3ff]/30'
              }`}
            >
              {scenario.name}
              <span className="block text-xs opacity-75 mt-1">{scenario.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={burnData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <defs>
            <linearGradient id="burnGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.danger} stopOpacity={0.8} />
              <stop offset="100%" stopColor={COLORS.danger} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.6} />
              <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#04a3ff" opacity={0.1} />

          <XAxis
            dataKey="month"
            stroke="#9ca3af"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: '#9ca3af', fontSize: 10 }}
            interval={2}
          />

          <YAxis
            yAxisId="left"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => `$${value}K`}
            label={{ value: 'Burn Rate ($K/mo)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => value >= 1000 ? `$${(value / 1000).toFixed(0)}M` : `$${value}K`}
            label={{ value: 'Cash Balance / Runway', angle: 90, position: 'insideRight', fill: '#9ca3af' }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />

          {/* Color zones for runway safety */}
          <ReferenceArea yAxisId="right" y1={0} y2={6} fill={COLORS.danger} fillOpacity={0.05} />
          <ReferenceArea yAxisId="right" y1={6} y2={12} fill={COLORS.warning} fillOpacity={0.05} />
          <ReferenceArea yAxisId="right" y1={12} y2={24} fill={COLORS.safe} fillOpacity={0.05} />

          {/* Break-even marker */}
          <ReferenceLine
            x="Jul 2027"
            stroke={COLORS.success}
            strokeWidth={2}
            strokeDasharray="5 5"
            yAxisId="left"
          >
            <Label value="Break-even" position="top" fill={COLORS.success} />
          </ReferenceLine>

          {/* Funding event markers */}
          {fundingEvents.map((event) => (
            <ReferenceLine
              key={event.month}
              x={event.month}
              stroke={COLORS.success}
              strokeWidth={3}
              yAxisId="left"
            >
              <Label value={event.round} position="top" fill={COLORS.success} fontSize={10} />
            </ReferenceLine>
          ))}

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="burnRate"
            fill="url(#burnGradient)"
            stroke={COLORS.danger}
            strokeWidth={2}
            name="Monthly Burn Rate ($K)"
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="runway"
            stroke={COLORS.warning}
            strokeWidth={3}
            dot={{ fill: COLORS.warning, r: 4 }}
            name="Runway (months)"
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cashBalance"
            stroke={COLORS.primary}
            strokeWidth={3}
            dot={{ fill: COLORS.primary, r: 4 }}
            name="Cash Balance ($K)"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Runway Extension Scenarios */}
      <div className="mt-6">
        <button
          onClick={() => setShowRunwayExtension(!showRunwayExtension)}
          className="text-[#04a3ff] hover:text-[#65ff00] font-semibold text-sm mb-3"
        >
          {showRunwayExtension ? '▼' : '▶'} Show Runway Extension Scenarios
        </button>

        {showRunwayExtension && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#000212]/40 rounded-lg p-4 border border-[#04a3ff]/20">
            <div className="bg-gradient-to-br from-[#65ff00]/10 to-transparent rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2 text-sm">Reduce Burn by 20%</h4>
              <div className="text-[#65ff00] text-xl font-bold mb-1">+3 months</div>
              <p className="text-gray-400 text-xs">Extended runway: 17 months</p>
            </div>
            <div className="bg-gradient-to-br from-[#65ff00]/10 to-transparent rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2 text-sm">Reduce Burn by 30%</h4>
              <div className="text-[#65ff00] text-xl font-bold mb-1">+5 months</div>
              <p className="text-gray-400 text-xs">Extended runway: 19 months</p>
            </div>
            <div className="bg-gradient-to-br from-[#65ff00]/10 to-transparent rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2 text-sm">Reduce Burn by 40%</h4>
              <div className="text-[#65ff00] text-xl font-bold mb-1">+8 months</div>
              <p className="text-gray-400 text-xs">Extended runway: 22 months</p>
            </div>
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="mt-6 bg-gradient-to-r from-[#04a3ff]/10 to-[#65ff00]/10 rounded-lg p-4 border border-[#04a3ff]/30">
        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#65ff00] rounded-full"></span>
          Key Insights
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-[#65ff00] mt-1">•</span>
            <span>Series A funding (€12M) provides 14-month runway at current burn rate</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#65ff00] mt-1">•</span>
            <span>Series B (€20M, Sep 2027) extends runway through break-even period</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#65ff00] mt-1">•</span>
            <span>Break-even projected Q2 2027, before Series B deployment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ffbb00] mt-1">•</span>
            <span>Conservative scenario reduces risk with 30% lower burn rate</span>
          </li>
        </ul>
      </div>

      {/* Accessibility */}
      <div className="mt-4 text-xs text-gray-500 italic">
        Toggle scenarios to compare burn rates. Export data for detailed analysis. Hover over chart for details.
      </div>
    </div>
  );
};

export default BurnRateChart;
