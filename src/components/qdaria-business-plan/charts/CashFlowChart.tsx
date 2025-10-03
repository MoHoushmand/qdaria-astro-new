import React, { useState } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Button } from '@/components/pitch-deck/ui/button';
import { Download, TrendingUp, Calendar } from 'lucide-react';

// QDaria Brand Colors
const COLORS = {
  primary: '#04a3ff',
  secondary: '#00ffd3',
  tertiary: '#65ff00',
  positive: '#65ff00',
  negative: '#ff4444',
  neutral: '#04a3ff',
  bg: '#000212',
  grid: '#1a1a2e',
  text: '#e0e0e0',
  textMuted: '#a0a0a0',
};

// Annual cash flow data (in millions USD)
const annualData = [
  {
    year: '2025',
    operating: -0.5,
    investing: -3,
    financing: 12,
    net: 8.5,
    cumulative: 8.5,
  },
  {
    year: '2026',
    operating: -1,
    investing: -2,
    financing: 8,
    net: 5,
    cumulative: 13.5,
  },
  {
    year: '2027',
    operating: -2,
    investing: -3,
    financing: 20,
    net: 15,
    cumulative: 28.5,
  },
  {
    year: '2028',
    operating: 5,
    investing: -2,
    financing: 100,
    net: 103,
    cumulative: 131.5,
  },
  {
    year: '2029',
    operating: 20,
    investing: -5,
    financing: 0,
    net: 15,
    cumulative: 146.5,
  },
  {
    year: '2030',
    operating: 40,
    investing: -10,
    financing: 0,
    net: 30,
    cumulative: 176.5,
  },
];

// Quarterly cash flow data (in millions USD)
const quarterlyData = [
  {
    period: 'Q1 24',
    operating: -0.8,
    investing: -2.1,
    financing: 5.2,
    net: 2.3,
    cumulative: 2.3,
  },
  {
    period: 'Q2 24',
    operating: -0.5,
    investing: -0.8,
    financing: 0,
    net: -1.3,
    cumulative: 1.0,
  },
  {
    period: 'Q3 24',
    operating: 0.2,
    investing: -1.2,
    financing: 0,
    net: -1.0,
    cumulative: 0,
  },
  {
    period: 'Q4 24',
    operating: 0.8,
    investing: -0.5,
    financing: 0,
    net: 0.3,
    cumulative: 0.3,
  },
  {
    period: 'Q1 25',
    operating: 1.5,
    investing: -0.8,
    financing: 8.5,
    net: 9.2,
    cumulative: 9.5,
  },
  {
    period: 'Q2 25',
    operating: 2.2,
    investing: -1.2,
    financing: 0,
    net: 1.0,
    cumulative: 10.5,
  },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div
      className="custom-tooltip"
      style={{
        backgroundColor: 'rgba(0, 2, 18, 0.95)',
        border: `1px solid ${COLORS.primary}`,
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(4, 163, 255, 0.3)',
        minWidth: '200px',
      }}
    >
      <p style={{ color: COLORS.text, fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
        {label}
      </p>
      <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: data.operating >= 0 ? COLORS.positive : COLORS.negative,
          }}
        >
          <span>Operating CF:</span>
          <span style={{ fontWeight: 'bold' }}>
            ${data.operating >= 0 ? '+' : ''}
            {data.operating.toFixed(1)}M
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: data.investing >= 0 ? COLORS.positive : COLORS.negative,
          }}
        >
          <span>Investing CF:</span>
          <span style={{ fontWeight: 'bold' }}>
            ${data.investing >= 0 ? '+' : ''}
            {data.investing.toFixed(1)}M
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: data.financing >= 0 ? COLORS.positive : COLORS.negative,
          }}
        >
          <span>Financing CF:</span>
          <span style={{ fontWeight: 'bold' }}>
            ${data.financing >= 0 ? '+' : ''}
            {data.financing.toFixed(1)}M
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: `1px solid ${COLORS.grid}`,
            color: data.net >= 0 ? COLORS.positive : COLORS.negative,
            fontWeight: 'bold',
          }}
        >
          <span>Net Cash Flow:</span>
          <span>
            ${data.net >= 0 ? '+' : ''}
            {data.net.toFixed(1)}M
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: COLORS.primary,
            fontWeight: 'bold',
          }}
        >
          <span>Cumulative Cash:</span>
          <span>${data.cumulative.toFixed(1)}M</span>
        </div>
      </div>
    </div>
  );
};

// Custom legend
const CustomLegend = ({ payload }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '16px',
        flexWrap: 'wrap',
      }}
    >
      {payload.map((entry: any, index: number) => {
        // Determine icon based on dataKey
        const isLine = entry.dataKey === 'cumulative';

        return (
          <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isLine ? (
              <div
                style={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: entry.color,
                }}
              />
            ) : (
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: entry.color,
                  borderRadius: '2px',
                }}
              />
            )}
            <span style={{ color: COLORS.textMuted, fontSize: '12px' }}>{entry.value}</span>
          </div>
        );
      })}
    </div>
  );
};

// Format Y-axis values
const formatYAxis = (value: number) => {
  if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(1)}B`;
  return `$${value}M`;
};

interface CashFlowChartProps {
  className?: string;
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ className = '' }) => {
  const [viewMode, setViewMode] = useState<'annual' | 'quarterly'>('annual');
  const [exportLoading, setExportLoading] = useState(false);

  const data = viewMode === 'annual' ? annualData : quarterlyData;
  const xAxisKey = viewMode === 'annual' ? 'year' : 'period';

  const handleExportData = async () => {
    setExportLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create CSV data
    const headers = ['Period', 'Operating CF', 'Investing CF', 'Financing CF', 'Net CF', 'Cumulative'];
    const rows = data.map((d) => [
      d[xAxisKey as keyof typeof d],
      d.operating,
      d.investing,
      d.financing,
      d.net,
      d.cumulative,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qdaria-cash-flow-${viewMode}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    setExportLoading(false);
  };

  // Calculate key metrics
  const totalOperating = data.reduce((sum, d) => sum + d.operating, 0);
  const totalInvesting = data.reduce((sum, d) => sum + d.investing, 0);
  const totalFinancing = data.reduce((sum, d) => sum + d.financing, 0);
  const finalCumulative = data[data.length - 1].cumulative;

  return (
    <div
      className={`w-full bg-gradient-to-br from-[#000212] to-[#04a3ff]/5 p-6 rounded-xl border border-[#04a3ff]/30 ${className}`}
      role="img"
      aria-label="Cash Flow Analysis Chart showing operating, investing, and financing cash flows with cumulative total"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#04a3ff]" />
            Cash Flow Analysis
          </h3>
          <p className="text-gray-400 text-sm">
            Operating, investing, and financing activities with cumulative position
          </p>
        </div>
        <Button
          onClick={handleExportData}
          disabled={exportLoading}
          className="bg-[#04a3ff] hover:bg-[#0389d6] text-white"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          {exportLoading ? 'Exporting...' : 'Export Data'}
        </Button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Calendar className="w-4 h-4 text-gray-400" />
        <div className="flex bg-[#04a3ff]/10 border border-[#04a3ff]/30 rounded-lg p-1">
          <button
            onClick={() => setViewMode('quarterly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'quarterly'
                ? 'bg-[#04a3ff] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-pressed={viewMode === 'quarterly'}
          >
            Quarterly
          </button>
          <button
            onClick={() => setViewMode('annual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'annual'
                ? 'bg-[#04a3ff] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-pressed={viewMode === 'annual'}
          >
            Annual
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">
            ${totalOperating >= 0 ? '+' : ''}
            {totalOperating.toFixed(1)}M
          </div>
          <div className="text-xs text-gray-400 mt-1">Total Operating CF</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-400">${totalInvesting.toFixed(1)}M</div>
          <div className="text-xs text-gray-400 mt-1">Total Investing CF</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">
            ${totalFinancing >= 0 ? '+' : ''}
            {totalFinancing.toFixed(1)}M
          </div>
          <div className="text-xs text-gray-400 mt-1">Total Financing CF</div>
        </div>
        <div className="bg-[#04a3ff]/10 border border-[#04a3ff]/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-[#04a3ff]">${finalCumulative.toFixed(1)}M</div>
          <div className="text-xs text-gray-400 mt-1">Cumulative Cash</div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <defs>
            {/* Gradient for cumulative line */}
            <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.8} />
              <stop offset="100%" stopColor={COLORS.secondary} stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} opacity={0.3} />

          <XAxis
            dataKey={xAxisKey}
            stroke={COLORS.textMuted}
            tick={{ fill: COLORS.textMuted, fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
            label={{
              value: viewMode === 'annual' ? 'Year' : 'Quarter',
              position: 'insideBottom',
              offset: -50,
              fill: COLORS.text,
              fontSize: 14,
            }}
          />

          {/* Primary Y-axis (Cash Flow) */}
          <YAxis
            yAxisId="left"
            stroke={COLORS.textMuted}
            tick={{ fill: COLORS.textMuted, fontSize: 12 }}
            tickFormatter={formatYAxis}
            label={{
              value: 'Cash Flow ($M)',
              angle: -90,
              position: 'insideLeft',
              fill: COLORS.text,
              fontSize: 14,
            }}
          />

          {/* Secondary Y-axis (Cumulative) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={COLORS.textMuted}
            tick={{ fill: COLORS.textMuted, fontSize: 12 }}
            tickFormatter={formatYAxis}
            label={{
              value: 'Cumulative ($M)',
              angle: 90,
              position: 'insideRight',
              fill: COLORS.primary,
              fontSize: 14,
            }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {/* Zero line reference */}
          <ReferenceLine yAxisId="left" y={0} stroke={COLORS.textMuted} strokeDasharray="3 3" />

          {/* Bar charts for cash flow components */}
          <Bar yAxisId="left" dataKey="operating" name="Operating CF" stackId="cf" radius={[0, 0, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-operating-${index}`} fill={entry.operating >= 0 ? COLORS.positive : COLORS.negative} />
            ))}
          </Bar>

          <Bar yAxisId="left" dataKey="investing" name="Investing CF" stackId="cf" radius={[0, 0, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-investing-${index}`} fill={entry.investing >= 0 ? COLORS.positive : COLORS.negative} />
            ))}
          </Bar>

          <Bar yAxisId="left" dataKey="financing" name="Financing CF" stackId="cf" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-financing-${index}`} fill={entry.financing >= 0 ? COLORS.neutral : COLORS.negative} />
            ))}
          </Bar>

          {/* Cumulative cash line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cumulative"
            stroke="url(#cumulativeGradient)"
            strokeWidth={3}
            dot={{ fill: COLORS.primary, r: 5, strokeWidth: 2, stroke: COLORS.bg }}
            activeDot={{ r: 7, strokeWidth: 3 }}
            name="Cumulative Cash"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-[#04a3ff]/5 border border-[#04a3ff]/20 rounded-lg">
        <p className="text-xs text-gray-400 leading-relaxed">
          <strong className="text-white">Cash Flow Methodology:</strong> Operating CF shows business
          operations, Investing CF shows capital expenditures (Novera QPU, R&D infrastructure),
          Financing CF shows funding rounds (Seed $12M, Series A $8M, Series B $20M, IPO $100M).
          Break-even operating cash flow achieved in 2028. Cumulative line shows total cash position
          over time.
        </p>
      </div>
    </div>
  );
};

export default CashFlowChart;
