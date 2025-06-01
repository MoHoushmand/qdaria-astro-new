import React, { useState, useEffect } from 'react';
import { PlotlyChartWrapper } from './PlotlyChartWrapper';

interface MarketGrowthChartPlotlyProps {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
  height?: number;
  width?: string;
  darkMode?: boolean;
  highContrastMode?: boolean;
}

export const MarketGrowthChartPlotly: React.FC<MarketGrowthChartPlotlyProps> = ({
  id = `market-growth-chart-${Math.random().toString(36).substring(2, 9)}`,
  title = "Global Quantum Computing Market Growth Projection (2020-2035)",
  description = "Projected cumulative economic impact of quantum computing, showing exponential growth from 2020 to 2035, reaching $1 trillion by 2035.",
  className = "",
  height = 500,
  width = "100%",
  darkMode = true,
  highContrastMode = false
}) => {
  // Chart data
  const years = ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];
  const baseCase = [0.05, 0.1, 0.3, 1, 3, 10, 30, 60, 100, 200, 350, 550, 750, 1000];
  const conservativeCase = [0.04, 0.08, 0.2, 0.7, 2, 7, 20, 40, 70, 140, 250, 400, 600, 850];
  const optimisticCase = [0.06, 0.15, 0.5, 1.5, 5, 15, 45, 90, 150, 300, 500, 750, 950, 1300];

  // Colors
  const baseColor = '#04a3ff';
  const conservativeColor = '#9D73FE';
  const optimisticColor = '#F5B700';

  // State
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartLayout, setChartLayout] = useState<any>({});
  const [useLogarithmicScale, setUseLogarithmicScale] = useState(true);
  const [activeScenario, setActiveScenario] = useState<string>('all');
  const [isDataReady, setIsDataReady] = useState(false);

  // Calculate CAGR (Compound Annual Growth Rate) for each scenario
  const calculateCAGR = (startValue: number, endValue: number, years: number): string => {
    const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
    return cagr.toFixed(1) + '%';
  };

  // Calculate year-over-year growth rates
  const yoyGrowthBase = baseCase.map((val, idx) => {
    if (idx === 0) return '-';
    return ((val / baseCase[idx-1] - 1) * 100).toFixed(0) + '%';
  });

  const yoyGrowthConservative = conservativeCase.map((val, idx) => {
    if (idx === 0) return '-';
    return ((val / conservativeCase[idx-1] - 1) * 100).toFixed(0) + '%';
  });

  const yoyGrowthOptimistic = optimisticCase.map((val, idx) => {
    if (idx === 0) return '-';
    return ((val / optimisticCase[idx-1] - 1) * 100).toFixed(0) + '%';
  });

  // Calculate overall CAGR (2022-2035)
  const baseCAGR = calculateCAGR(baseCase[0], baseCase[baseCase.length-1], years.length-1);
  const conservativeCAGR = calculateCAGR(conservativeCase[0], conservativeCase[conservativeCase.length-1], years.length-1);
  const optimisticCAGR = calculateCAGR(optimisticCase[0], optimisticCase[optimisticCase.length-1], years.length-1);

  // Format values for display
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `$${(value/1000).toFixed(1)}T`;
    } else if (value >= 1) {
      return `$${value.toFixed(1)}B`;
    } else {
      return `$${(value * 1000).toFixed(0)}M`;
    }
  };

  // Prepare table data
  const tableData = years.map((year, index) => ({
    year,
    conservative: formatValue(conservativeCase[index]),
    conservativeGrowth: yoyGrowthConservative[index],
    base: formatValue(baseCase[index]),
    baseGrowth: yoyGrowthBase[index],
    optimistic: formatValue(optimisticCase[index]),
    optimisticGrowth: yoyGrowthOptimistic[index]
  }));

  // Prepare chart data & layout
  useEffect(() => {
    // Prepare Plotly data based on active scenario
    const prepareChartData = () => {
      const allTraces = [
        {
          name: 'Base Case',
          x: years,
          y: baseCase,
          type: 'scatter',
          mode: 'lines+markers',
          line: {
            color: baseColor,
            width: 3,
            shape: 'spline'
          },
          marker: {
            size: 8,
            color: baseColor,
            line: {
              color: 'rgba(255, 255, 255, 0.8)',
              width: 1
            }
          },
          fill: 'tozeroy',
          fillcolor: `${baseColor}30`,
          hovertemplate: '%{y:$,.1f}B<br>Year: %{x}<extra></extra>',
          visible: activeScenario === 'all' || activeScenario === 'base' ? true : 'legendonly'
        },
        {
          name: 'Conservative Case',
          x: years,
          y: conservativeCase,
          type: 'scatter',
          mode: 'lines+markers',
          line: {
            color: conservativeColor,
            width: 3,
            shape: 'spline'
          },
          marker: {
            size: 8,
            color: conservativeColor,
            line: {
              color: 'rgba(255, 255, 255, 0.8)',
              width: 1
            }
          },
          fill: 'tozeroy',
          fillcolor: `${conservativeColor}30`,
          hovertemplate: '%{y:$,.1f}B<br>Year: %{x}<extra></extra>',
          visible: activeScenario === 'all' || activeScenario === 'conservative' ? true : 'legendonly'
        },
        {
          name: 'Optimistic Case',
          x: years,
          y: optimisticCase,
          type: 'scatter',
          mode: 'lines+markers',
          line: {
            color: optimisticColor,
            width: 3,
            shape: 'spline'
          },
          marker: {
            size: 8,
            color: optimisticColor,
            line: {
              color: 'rgba(255, 255, 255, 0.8)',
              width: 1
            }
          },
          fill: 'tozeroy',
          fillcolor: `${optimisticColor}30`,
          hovertemplate: '%{y:$,.1f}B<br>Year: %{x}<extra></extra>',
          visible: activeScenario === 'all' || activeScenario === 'optimistic' ? true : 'legendonly'
        }
      ];

      setChartData(allTraces);
    };

    // Prepare Plotly layout
    const prepareChartLayout = () => {
      const layout = {
        title: {
          text: title,
          font: {
            size: 24,
            color: '#ffffff'
          }
        },
        height: height,
        autosize: true,
        showlegend: true,
        legend: {
          orientation: 'h',
          y: 1.1,
          x: 0.5,
          xanchor: 'center',
          font: {
            color: '#ffffff'
          }
        },
        xaxis: {
          title: {
            text: 'Year',
            font: {
              size: 14,
              color: '#9ca3af'
            }
          },
          tickfont: {
            color: '#ffffff'
          },
          showgrid: true,
          gridcolor: 'rgba(255, 255, 255, 0.1)',
          tickangle: 0
        },
        yaxis: {
          title: {
            text: 'Cumulative Economic Impact (USD)',
            font: {
              size: 14,
              color: '#9ca3af'
            }
          },
          type: useLogarithmicScale ? 'log' : 'linear',
          tickfont: {
            color: '#ffffff'
          },
          showgrid: true,
          gridcolor: 'rgba(255, 255, 255, 0.1)',
          tickformat: useLogarithmicScale ? '' : '$,.0f',
          tickprefix: '$',
          // Custom tick formatting
          tickvals: useLogarithmicScale 
            ? [0.01, 0.1, 1, 10, 100, 1000] 
            : [0, 200, 400, 600, 800, 1000, 1200, 1400],
          ticktext: useLogarithmicScale 
            ? ['$10M', '$100M', '$1B', '$10B', '$100B', '$1T'] 
            : ['$0', '$200B', '$400B', '$600B', '$800B', '$1T', '$1.2T', '$1.4T']
        },
        shapes: [
          // $1 Trillion milestone line
          {
            type: 'line',
            x0: years[0],
            x1: years[years.length - 1],
            y0: 1000,
            y1: 1000,
            line: {
              color: '#00d085',
              width: 2,
              dash: 'dash'
            }
          }
        ],
        annotations: [
          // $1 Trillion milestone text
          {
            x: years[years.length - 3],
            y: 1020,
            text: '$1 Trillion Milestone',
            showarrow: false,
            font: {
              color: '#00d085',
              size: 12,
              weight: 'bold'
            },
            bgcolor: 'rgba(0, 208, 133, 0.2)',
            borderpad: 4,
            bordercolor: '#00d085',
            borderwidth: 1
          }
        ],
        // For dark mode
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: {
          l: 70,
          r: 40,
          t: 50,
          b: 80
        },
        hoverlabel: {
          bgcolor: '#1e293b',
          bordercolor: '#475569',
          font: {
            family: 'Inter, system-ui, sans-serif',
            color: '#ffffff',
            size: 14
          }
        },
        hovermode: 'closest',
        updatemenus: [
          {
            // Y-axis type menu (log vs linear)
            buttons: [
              {
                args: [{'yaxis.type': 'log'}],
                label: 'Logarithmic',
                method: 'relayout'
              },
              {
                args: [{'yaxis.type': 'linear'}],
                label: 'Linear',
                method: 'relayout'
              }
            ],
            direction: 'right',
            pad: {'r': 10, 't': 10},
            showactive: true,
            type: 'buttons',
            x: 0.1,
            y: 1.1,
            xanchor: 'left',
            yanchor: 'top',
            font: {
              color: '#ffffff'
            },
            bgcolor: 'rgba(4, 163, 255, 0.2)',
            bordercolor: 'rgba(4, 163, 255, 0.4)',
            activecolor: 'rgba(4, 163, 255, 0.7)'
          },
          {
            // Scenario selection menu
            buttons: [
              {
                args: [{'visible': [true, true, true]}],
                label: 'All Scenarios',
                method: 'restyle'
              },
              {
                args: [{'visible': [true, 'legendonly', 'legendonly']}],
                label: 'Base Case',
                method: 'restyle'
              },
              {
                args: [{'visible': ['legendonly', true, 'legendonly']}],
                label: 'Conservative',
                method: 'restyle'
              },
              {
                args: [{'visible': ['legendonly', 'legendonly', true]}],
                label: 'Optimistic',
                method: 'restyle'
              }
            ],
            direction: 'right',
            pad: {'r': 10, 't': 10},
            showactive: true,
            type: 'buttons',
            x: 0.5,
            y: 1.1,
            xanchor: 'center',
            yanchor: 'top',
            font: {
              color: '#ffffff'
            },
            bgcolor: 'rgba(4, 163, 255, 0.2)',
            bordercolor: 'rgba(4, 163, 255, 0.4)',
            activecolor: 'rgba(4, 163, 255, 0.7)'
          }
        ]
      };

      setChartLayout(layout);
    };

    prepareChartData();
    prepareChartLayout();
    setIsDataReady(true);
  }, [activeScenario, useLogarithmicScale]);

  // Render the data table
  const renderDataTable = () => {
    return (
      <table className="chart-data-table-content">
        <thead>
          <tr>
            <th>Year</th>
            <th>Conservative Case</th>
            <th>YoY Growth</th>
            <th>Base Case</th>
            <th>YoY Growth</th>
            <th>Optimistic Case</th>
            <th>YoY Growth</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, idx) => (
            <tr key={`row-${idx}`}>
              <td>{row.year}</td>
              <td>{row.conservative}</td>
              <td>{row.conservativeGrowth}</td>
              <td>{row.base}</td>
              <td>{row.baseGrowth}</td>
              <td>{row.optimistic}</td>
              <td>{row.optimisticGrowth}</td>
            </tr>
          ))}
          <tr className="summary-row">
            <td>CAGR (2022-2035)</td>
            <td colSpan={2}>{conservativeCAGR}</td>
            <td colSpan={2}>{baseCAGR}</td>
            <td colSpan={2}>{optimisticCAGR}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <PlotlyChartWrapper
      id={id}
      title={title}
      description={description}
      className={className}
      data={chartData}
      layout={chartLayout}
      config={{
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'select2d'],
        toImageButtonOptions: {
          format: 'png',
          height: height * 2,
          width: 1200,
          scale: 2
        }
      }}
      style={{ width, height }}
      fallbackContent={renderDataTable()}
    />
  );
};

export default MarketGrowthChartPlotly;
