/**
 * CashFlowChart displays comprehensive cash flow breakdown with activity analysis
 *
 * Features:
 * - Toggle between annual and quarterly views
 * - Operating, Investing, and Financing CF breakdown
 * - Cumulative cash flow tracking
 * - CSV export functionality
 * - Fully accessible with ARIA labels
 *
 * @module charts/CashFlowChart
 */

import React, { useState, useMemo, useCallback } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/qdaria-business-plan/ui/card';
import { Button } from '@/components/qdaria-business-plan/ui/button';
import { Download, TrendingUp, Calendar } from 'lucide-react';
import {
  CHART_THEME,
  standardTooltipStyle,
  standardAxisStyle,
  standardTickStyle,
  standardGridStyle,
  standardLegendStyle,
  formatCurrency,
} from '@/styles/chart-theme';
import type { CustomTooltipProps } from './types';
import { exportToCSV } from './utils';

// Annual cash flow data (in millions USD)
const annualData = [
  {
    year: '2025',
    operating: -0.5,
    investing: -3,
    financing: 15,
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
    operating: 2,
    investing: -2,
    financing: 100,
    net: 100,
    cumulative: 128.5,
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

/**
 * Custom tooltip component with proper typing
 * Displays operating, investing, and financing cash flows with color coding
 */
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div style={{
      backgroundColor: CHART_THEME.colors.background.dark,
      border: `${CHART_THEME.colors.chart.tooltip.borderWidth} solid ${CHART_THEME.colors.chart.tooltip.border}`,
      borderRadius: CHART_THEME.borderRadius.md,
      padding: '12px 16px',
      boxShadow: CHART_THEME.shadows.glow,
      minWidth: '200px',
    }}>
      <p style={{
        color: CHART_THEME.colors.text.primary,
        fontWeight: CHART_THEME.typography.weights.bold,
        marginBottom: '8px',
        fontSize: CHART_THEME.typography.sizes.base + 'px',
      }}>
        {label}
      </p>
      <div style={{
        fontSize: CHART_THEME.typography.sizes.sm + 'px',
        lineHeight: CHART_THEME.typography.lineHeight.relaxed,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: data.operating >= 0 ? CHART_THEME.colors.semantic.positive : CHART_THEME.colors.semantic.negative,
        }}>
          <span>Operating CF:</span>
          <span style={{ fontWeight: 'bold' }}>
            ${data.operating >= 0 ? '+' : ''}{data.operating.toFixed(1)}M
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: data.investing >= 0 ? CHART_THEME.colors.semantic.positive : CHART_THEME.colors.semantic.negative,
        }}>
          <span>Investing CF:</span>
          <span style={{ fontWeight: 'bold' }}>
            ${data.investing >= 0 ? '+' : ''}{data.investing.toFixed(1)}M
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: data.financing >= 0 ? CHART_THEME.colors.semantic.positive : CHART_THEME.colors.semantic.negative,
        }}>
          <span>Financing CF:</span>
          <span style={{ fontWeight: 'bold' }}>
            ${data.financing >= 0 ? '+' : ''}{data.financing.toFixed(1)}M
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: `1px solid ${CHART_THEME.colors.chart.grid}`,
          color: data.net >= 0 ? CHART_THEME.colors.semantic.positive : CHART_THEME.colors.semantic.negative,
          fontWeight: 'bold',
        }}>
          <span>Net Cash Flow:</span>
          <span>${data.net >= 0 ? '+' : ''}{data.net.toFixed(1)}M</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: CHART_THEME.colors.primary,
          fontWeight: 'bold',
        }}>
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

/**
 * CashFlowChart Component - Displays comprehensive cash flow analysis
 * @component
 * @example
 * ```tsx
 * <CashFlowChart className="my-6" />
 * ```
 */
export const CashFlowChart = React.memo<CashFlowChartProps>(({ className = '' }) => {
  const [viewMode, setViewMode] = useState<'annual' | 'quarterly'>('annual');
  const [exportLoading, setExportLoading] = useState(false);

  // Memoize data selection
  const data = useMemo(
    () => (viewMode === 'annual' ? annualData : quarterlyData),
    [viewMode]
  );

  const xAxisKey = useMemo(
    () => (viewMode === 'annual' ? 'year' : 'period'),
    [viewMode]
  );

  /**
   * Export cash flow data to CSV with proper formatting
   */
  const handleExportData = useCallback(async () => {
    setExportLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create CSV data
    const csvData = data.map((d) => ({
      Period: d[xAxisKey as keyof typeof d],
      'Operating CF ($M)': d.operating,
      'Investing CF ($M)': d.investing,
      'Financing CF ($M)': d.financing,
      'Net CF ($M)': d.net,
      'Cumulative ($M)': d.cumulative,
    }));

    exportToCSV(
      csvData,
      `qdaria-cash-flow-${viewMode}.csv`,
      ['Period', 'Operating CF ($M)', 'Investing CF ($M)', 'Financing CF ($M)', 'Net CF ($M)', 'Cumulative ($M)']
    );

    setExportLoading(false);
  }, [data, xAxisKey, viewMode]);

  // Memoize calculated metrics
  const { totalOperating, totalInvesting, totalFinancing, finalCumulative } = useMemo(() => ({
    totalOperating: data.reduce((sum, d) => sum + d.operating, 0),
    totalInvesting: data.reduce((sum, d) => sum + d.investing, 0),
    totalFinancing: data.reduce((sum, d) => sum + d.financing, 0),
    finalCumulative: data[data.length - 1].cumulative,
  }), [data]);

  return (
    <div
      className={`w-full bg-gradient-to-br from-[#000212] to-[#04a3ff]/5 p-6 rounded-xl border border-[#04a3ff]/30 ${className}`}
      role="region"
      aria-label="Cash Flow Analysis Chart showing operating, investing, and financing cash flows with cumulative total from 2025 to 2030, including Series A, Series B, and IPO funding events"
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
            aria-label="View quarterly cash flow data"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setViewMode('quarterly');
              }
            }}
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
            aria-label="View annual cash flow data"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setViewMode('annual');
              }
            }}
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
      <ResponsiveContainer
        width="100%"
        height={500}
        role="img"
        aria-label={`Cash flow breakdown showing operating, investing, and financing activities for ${viewMode === 'annual' ? 'annual' : 'quarterly'} periods. Total operating CF: $${totalOperating.toFixed(1)}M, Total investing CF: $${totalInvesting.toFixed(1)}M, Total financing CF: $${totalFinancing.toFixed(1)}M, Cumulative cash: $${finalCumulative.toFixed(1)}M`}
        tabIndex={0}
      >
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          title="Cash flow analysis by operating, investing, and financing activities"
        >
          <defs>
            {/* Gradient for cumulative line using theme colors */}
            <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_THEME.colors.primary} stopOpacity={0.8} />
              <stop offset="100%" stopColor={CHART_THEME.colors.secondary} stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid {...standardGridStyle} />

          <XAxis
            dataKey={xAxisKey}
            {...standardAxisStyle}
            tick={standardTickStyle}
            angle={-45}
            textAnchor="end"
            height={60}
            label={{
              value: viewMode === 'annual' ? 'Year' : 'Quarter',
              position: 'insideBottom',
              offset: -50,
              fill: CHART_THEME.colors.text.primary,
              fontSize: CHART_THEME.typography.sizes.base,
            }}
          />

          {/* Primary Y-axis (Cash Flow) */}
          <YAxis
            yAxisId="left"
            {...standardAxisStyle}
            tick={standardTickStyle}
            tickFormatter={formatYAxis}
            label={{
              value: 'Cash Flow ($M)',
              angle: -90,
              position: 'insideLeft',
              fill: CHART_THEME.colors.text.primary,
              fontSize: CHART_THEME.typography.sizes.base,
            }}
          />

          {/* Secondary Y-axis (Cumulative) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={CHART_THEME.colors.primary}
            tick={{ fill: CHART_THEME.colors.primary, fontSize: CHART_THEME.typography.sizes.sm }}
            tickFormatter={formatYAxis}
            label={{
              value: 'Cumulative ($M)',
              angle: 90,
              position: 'insideRight',
              fill: CHART_THEME.colors.primary,
              fontSize: CHART_THEME.typography.sizes.base,
            }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {/* Zero line reference */}
          <ReferenceLine yAxisId="left" y={0} stroke={CHART_THEME.colors.chart.axis} strokeDasharray="3 3" />

          {/* Bar charts for cash flow components */}
          <Bar yAxisId="left" dataKey="operating" name="Operating CF" stackId="cf" radius={[0, 0, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-operating-${index}`}
                fill={entry.operating >= 0 ? CHART_THEME.colors.semantic.positive : CHART_THEME.colors.semantic.negative}
              />
            ))}
          </Bar>

          <Bar yAxisId="left" dataKey="investing" name="Investing CF" stackId="cf" radius={[0, 0, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-investing-${index}`}
                fill={entry.investing >= 0 ? CHART_THEME.colors.semantic.positive : CHART_THEME.colors.semantic.negative}
              />
            ))}
          </Bar>

          <Bar yAxisId="left" dataKey="financing" name="Financing CF" stackId="cf" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-financing-${index}`}
                fill={entry.financing >= 0 ? CHART_THEME.colors.primary : CHART_THEME.colors.semantic.negative}
              />
            ))}
          </Bar>

          {/* Cumulative cash line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cumulative"
            stroke="url(#cumulativeGradient)"
            strokeWidth={3}
            dot={{ fill: CHART_THEME.colors.primary, r: 5, strokeWidth: 2, stroke: CHART_THEME.colors.background.primary }}
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
          Financing CF shows funding rounds (Seed €15M, Series A $8M, Series B $20M, planned IPO $100M).
          Break-even operating cash flow achieved in Q4 2028. Cumulative line shows total cash position
          over time. All projections based on QDaria Financial Model v4.1 (2025).
        </p>
      </div>
    </div>
  );
});

CashFlowChart.displayName = 'CashFlowChart';

export default CashFlowChart;
