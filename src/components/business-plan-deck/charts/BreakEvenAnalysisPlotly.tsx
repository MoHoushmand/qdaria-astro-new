import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { ChartWrapper } from './ChartWrapper';
import { PROFESSIONAL_CHART_CONFIG } from './chartConfig';
import '../styles/master-professional.css';

export const BreakEvenAnalysisPlotly = () => {
  const [scenario, setScenario] = useState<'conservative' | 'base' | 'optimistic'>('base');

  const months = Array.from({ length: 36 }, (_, i) => i + 1);

  const scenarioData = {
    conservative: {
      revenue: months.map(m => 0.5 * Math.pow(1.08, m / 3)),
      costs: months.map(m => 1.2 - 0.02 * m),
      breakEven: 22
    },
    base: {
      revenue: months.map(m => 0.8 * Math.pow(1.12, m / 3)),
      costs: months.map(m => 1.5 - 0.03 * m),
      breakEven: 16
    },
    optimistic: {
      revenue: months.map(m => 1.2 * Math.pow(1.15, m / 3)),
      costs: months.map(m => 1.8 - 0.04 * m),
      breakEven: 12
    }
  };

  const data = scenarioData[scenario];

  return (
    <ChartWrapper
      title="Break-Even Analysis"
      subtitle="Revenue vs costs trajectory with scenario modeling"
      stats={[
        { value: `Month ${scenarioData.conservative.breakEven}`, label: 'Conservative' },
        { value: `Month ${scenarioData.base.breakEven}`, label: 'Base Case' },
        { value: `Month ${scenarioData.optimistic.breakEven}`, label: 'Optimistic' }
      ]}
      insight="Base case scenario achieves break-even at month 16, demonstrating strong unit economics and efficient capital deployment"
      height={550}
    >
      <div className="flex gap-3 mb-6 justify-center">
        <button
          onClick={() => setScenario('conservative')}
          className={`px-6 py-2 rounded-lg font-medium text-base transition-all ${
            scenario === 'conservative'
              ? 'bg-amber-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          aria-label="Show conservative scenario"
          aria-pressed={scenario === 'conservative'}
        >
          Conservative
        </button>
        <button
          onClick={() => setScenario('base')}
          className={`px-6 py-2 rounded-lg font-medium text-base transition-all ${
            scenario === 'base'
              ? 'bg-cyan-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          aria-label="Show base case scenario"
          aria-pressed={scenario === 'base'}
        >
          Base Case
        </button>
        <button
          onClick={() => setScenario('optimistic')}
          className={`px-6 py-2 rounded-lg font-medium text-base transition-all ${
            scenario === 'optimistic'
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          aria-label="Show optimistic scenario"
          aria-pressed={scenario === 'optimistic'}
        >
          Optimistic
        </button>
      </div>

      <Plot
        data={[
          {
            x: months,
            y: data.revenue,
            type: 'scatter',
            mode: 'lines',
            name: 'Revenue',
            line: {
              color: PROFESSIONAL_CHART_CONFIG.colors.cyan,
              width: 3,
              shape: 'spline'
            },
            fill: 'tozeroy',
            fillcolor: 'rgba(6, 214, 255, 0.15)'
          },
          {
            x: months,
            y: data.costs,
            type: 'scatter',
            mode: 'lines',
            name: 'Costs',
            line: {
              color: PROFESSIONAL_CHART_CONFIG.colors.yellow,
              width: 3,
              shape: 'spline'
            },
            fill: 'tozeroy',
            fillcolor: 'rgba(251, 191, 36, 0.15)'
          },
          {
            x: [data.breakEven, data.breakEven],
            y: [0, Math.max(...data.revenue)],
            type: 'scatter',
            mode: 'lines',
            name: 'Break-Even Point',
            line: {
              color: PROFESSIONAL_CHART_CONFIG.colors.green,
              width: 2,
              dash: 'dash'
            }
          }
        ]}
        layout={{
          autosize: true,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: {
            color: '#e5e7eb',
            family: PROFESSIONAL_CHART_CONFIG.fontFamily,
            size: PROFESSIONAL_CHART_CONFIG.fontSize.tick
          },
          xaxis: {
            title: {
              text: 'Months from Series A',
              font: {
                size: PROFESSIONAL_CHART_CONFIG.fontSize.axisLabel,
                weight: PROFESSIONAL_CHART_CONFIG.fontWeight.semibold
              }
            },
            gridcolor: PROFESSIONAL_CHART_CONFIG.grid.stroke,
            zerolinecolor: 'rgba(4, 163, 255, 0.2)',
            tickfont: { size: PROFESSIONAL_CHART_CONFIG.fontSize.tick }
          },
          yaxis: {
            title: {
              text: 'Monthly Amount (€M)',
              font: {
                size: PROFESSIONAL_CHART_CONFIG.fontSize.axisLabel,
                weight: PROFESSIONAL_CHART_CONFIG.fontWeight.semibold
              }
            },
            gridcolor: PROFESSIONAL_CHART_CONFIG.grid.stroke,
            zerolinecolor: 'rgba(4, 163, 255, 0.2)',
            tickfont: { size: PROFESSIONAL_CHART_CONFIG.fontSize.tick }
          },
          legend: {
            orientation: 'h',
            y: -0.15,
            font: { size: PROFESSIONAL_CHART_CONFIG.fontSize.legend }
          },
          margin: { l: 80, r: 40, t: 20, b: 100 },
          hovermode: 'x unified'
        }}
        config={{
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['lasso2d', 'select2d'],
          toImageButtonOptions: {
            format: 'png',
            filename: 'break-even-analysis',
            height: 800,
            width: 1200,
            scale: 2
          }
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </ChartWrapper>
  );
};
