/**
 * ScenarioAnalysisPlotly - Multiple Scenario Waterfall Chart
 *
 * Visualizes financial scenarios (best case, base case, worst case) using
 * interactive waterfall charts with variance analysis and export capabilities.
 *
 * @example
 * <ScenarioAnalysisPlotly
 *   data={scenarioData}
 *   title="5-Year Revenue Scenario Analysis"
 * />
 */

import React, { useMemo, useState } from 'react';
import Plot from 'react-plotly.js';
import { motion } from 'framer-motion';
import type { Data, Layout, Config } from 'plotly.js';

// Business plan brand colors
const BUSINESS_COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  tertiary: '#66FF00',
  accent: '#00d4ff',
  dark: '#1a1a1a',
  success: '#00ff88',
  warning: '#ffaa00',
  danger: '#ff3366',
  gray: '#666666',
};

interface ScenarioStep {
  label: string;
  value: number;
  isTotal?: boolean; // For cumulative totals
  description?: string;
}

interface ScenarioData {
  bestCase: ScenarioStep[];
  baseCase: ScenarioStep[];
  worstCase: ScenarioStep[];
  currency?: string;
  timeframe?: string;
}

interface ScenarioAnalysisPlotlyProps {
  data: ScenarioData;
  title?: string;
  width?: number | string;
  height?: number | string;
  theme?: 'light' | 'dark';
  showLegend?: boolean;
  loading?: boolean;
  className?: string;
  onScenarioSelect?: (scenario: 'best' | 'base' | 'worst') => void;
}

/**
 * Generate waterfall chart data for a scenario
 */
const generateWaterfallData = (
  steps: ScenarioStep[],
  name: string,
  color: string,
  visible: boolean | 'legendonly' = true
): Data => {
  const x = steps.map(s => s.label);
  const y = steps.map(s => s.value);

  // Determine if each step is increasing, decreasing, or total
  const measure = steps.map(s => {
    if (s.isTotal) return 'total';
    return s.value >= 0 ? 'relative' : 'relative';
  });

  const textValues = steps.map(s => {
    const absValue = Math.abs(s.value);
    if (absValue >= 1_000_000) {
      return `$${(absValue / 1_000_000).toFixed(1)}M`;
    } else if (absValue >= 1_000) {
      return `$${(absValue / 1_000).toFixed(1)}K`;
    }
    return `$${absValue.toFixed(0)}`;
  });

  return {
    type: 'waterfall',
    name,
    x,
    y,
    measure,
    text: textValues,
    textposition: 'outside',
    textfont: { color: '#ffffff', size: 11 },
    connector: {
      line: { color: color, width: 2, dash: 'dot' },
      visible: true,
    },
    increasing: { marker: { color: BUSINESS_COLORS.success } },
    decreasing: { marker: { color: BUSINESS_COLORS.danger } },
    totals: { marker: { color: color } },
    hovertemplate:
      '<b>%{x}</b><br>' +
      'Value: %{text}<br>' +
      '<extra></extra>',
    visible,
  };
};

/**
 * Calculate scenario statistics
 */
const calculateStats = (steps: ScenarioStep[]) => {
  const values = steps.filter(s => !s.isTotal).map(s => s.value);
  const total = values.reduce((sum, v) => sum + v, 0);
  const positive = values.filter(v => v > 0).reduce((sum, v) => sum + v, 0);
  const negative = values.filter(v => v < 0).reduce((sum, v) => sum + v, 0);

  return {
    total,
    positive,
    negative,
    net: total,
    count: values.length,
  };
};

/**
 * Format currency value
 */
const formatCurrency = (value: number, currency: string = 'USD'): string => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1_000_000_000) {
    return `${sign}$${(absValue / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    return `${sign}$${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    return `${sign}$${(absValue / 1_000).toFixed(2)}K`;
  }
  return `${sign}$${absValue.toFixed(0)}`;
};

/**
 * ScenarioAnalysisPlotly Component
 */
export const ScenarioAnalysisPlotly: React.FC<ScenarioAnalysisPlotlyProps> = ({
  data,
  title = 'Scenario Analysis - Waterfall Chart',
  width = '100%',
  height = 600,
  theme = 'dark',
  showLegend = true,
  loading = false,
  className = '',
  onScenarioSelect,
}) => {
  const [activeScenario, setActiveScenario] = useState<'best' | 'base' | 'worst' | 'all'>('all');

  const plotConfig = useMemo(() => {
    const isDark = theme === 'dark';
    const bgColor = isDark ? 'transparent' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#333333';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    // Generate waterfall traces for each scenario
    const traces: Data[] = [
      generateWaterfallData(
        data.worstCase,
        'Worst Case',
        BUSINESS_COLORS.danger,
        activeScenario === 'all' || activeScenario === 'worst'
      ),
      generateWaterfallData(
        data.baseCase,
        'Base Case',
        BUSINESS_COLORS.accent,
        activeScenario === 'all' || activeScenario === 'base'
      ),
      generateWaterfallData(
        data.bestCase,
        'Best Case',
        BUSINESS_COLORS.success,
        activeScenario === 'all' || activeScenario === 'best'
      ),
    ];

    const layout: Partial<Layout> = {
      title: {
        text: title,
        font: { size: 20, color: textColor, family: 'Inter, sans-serif', weight: 600 },
        x: 0.5,
        xanchor: 'center',
      },
      paper_bgcolor: bgColor,
      plot_bgcolor: bgColor,
      font: { color: textColor, family: 'Inter, sans-serif' },
      showlegend: showLegend,
      legend: {
        bgcolor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
        bordercolor: BUSINESS_COLORS.primary,
        borderwidth: 1,
        orientation: 'h',
        x: 0.5,
        xanchor: 'center',
        y: 1.1,
      },
      xaxis: {
        title: { text: 'Financial Components', font: { color: textColor } },
        gridcolor: gridColor,
        color: textColor,
        tickangle: -45,
      },
      yaxis: {
        title: { text: `Value (${data.currency || 'USD'})`, font: { color: textColor } },
        gridcolor: gridColor,
        color: textColor,
        zeroline: true,
        zerolinecolor: BUSINESS_COLORS.gray,
        zerolinewidth: 2,
      },
      margin: { l: 80, r: 40, t: 120, b: 120 },
      hovermode: 'closest',
      waterfallgap: 0.3,
    };

    return { data: traces, layout };
  }, [data, title, theme, showLegend, activeScenario]);

  const config: Partial<Config> = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d'],
    toImageButtonOptions: {
      format: 'png',
      filename: 'scenario_analysis_waterfall',
      height: 1000,
      width: 1600,
      scale: 2,
    },
  };

  const handleScenarioToggle = (scenario: 'best' | 'base' | 'worst' | 'all') => {
    setActiveScenario(scenario);
    if (scenario !== 'all') {
      onScenarioSelect?.(scenario);
    }
  };

  // Calculate statistics for each scenario
  const stats = useMemo(() => ({
    best: calculateStats(data.bestCase),
    base: calculateStats(data.baseCase),
    worst: calculateStats(data.worstCase),
  }), [data]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
            style={{ borderColor: BUSINESS_COLORS.primary }}
          />
          <p className="text-white/70">Loading scenario analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {/* Scenario Toggle Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { key: 'all' as const, label: 'All Scenarios', color: BUSINESS_COLORS.primary },
          { key: 'best' as const, label: 'Best Case', color: BUSINESS_COLORS.success },
          { key: 'base' as const, label: 'Base Case', color: BUSINESS_COLORS.accent },
          { key: 'worst' as const, label: 'Worst Case', color: BUSINESS_COLORS.danger },
        ].map((scenario) => (
          <button
            key={scenario.key}
            onClick={() => handleScenarioToggle(scenario.key)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeScenario === scenario.key
                ? 'text-black'
                : 'text-white bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
            style={{
              backgroundColor: activeScenario === scenario.key ? scenario.color : undefined,
            }}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      <Plot
        data={plotConfig.data}
        layout={{
          ...plotConfig.layout,
          width: typeof width === 'string' ? undefined : width,
          height: typeof height === 'number' ? height : undefined,
          autosize: typeof width === 'string',
        }}
        config={config}
        style={{ width: '100%', height: '100%' }}
        className="rounded-lg"
      />

      {/* Scenario Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { key: 'best', label: 'Best Case', color: BUSINESS_COLORS.success, data: stats.best },
          { key: 'base', label: 'Base Case', color: BUSINESS_COLORS.accent, data: stats.base },
          { key: 'worst', label: 'Worst Case', color: BUSINESS_COLORS.danger, data: stats.worst },
        ].map((scenario) => (
          <motion.div
            key={scenario.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: scenario.color }} />
              <h4 className="text-lg font-semibold text-white">{scenario.label}</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Net Total:</span>
                <span className="text-white font-semibold">{formatCurrency(scenario.data.net, data.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Positive:</span>
                <span className="text-green-400 font-medium">{formatCurrency(scenario.data.positive, data.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Negative:</span>
                <span className="text-red-400 font-medium">{formatCurrency(scenario.data.negative, data.currency)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-white/60">Components:</span>
                <span className="text-white font-medium">{scenario.data.count}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Variance Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-5 rounded-lg bg-white/5 border border-[#CCFF00]/30"
      >
        <h4 className="text-lg font-semibold text-white mb-4">Variance Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-white/60">Best vs Base:</span>
            <span className="ml-2 text-green-400 font-semibold">
              {formatCurrency(stats.best.net - stats.base.net, data.currency)}
            </span>
            <span className="ml-2 text-white/40">
              ({(((stats.best.net - stats.base.net) / stats.base.net) * 100).toFixed(1)}%)
            </span>
          </div>
          <div>
            <span className="text-white/60">Base vs Worst:</span>
            <span className="ml-2 text-red-400 font-semibold">
              {formatCurrency(stats.base.net - stats.worst.net, data.currency)}
            </span>
            <span className="ml-2 text-white/40">
              ({(((stats.base.net - stats.worst.net) / stats.worst.net) * 100).toFixed(1)}%)
            </span>
          </div>
          <div>
            <span className="text-white/60">Best vs Worst:</span>
            <span className="ml-2 text-[#CCFF00] font-semibold">
              {formatCurrency(stats.best.net - stats.worst.net, data.currency)}
            </span>
            <span className="ml-2 text-white/40">
              ({(((stats.best.net - stats.worst.net) / stats.worst.net) * 100).toFixed(1)}%)
            </span>
          </div>
          {data.timeframe && (
            <div>
              <span className="text-white/60">Timeframe:</span>
              <span className="ml-2 text-white font-medium">{data.timeframe}</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScenarioAnalysisPlotly;
