import React, { useState, useEffect } from 'react';
import { PlotlyChartWrapper } from './PlotlyChartWrapper';

interface CompetitorRadarChartPlotlyProps {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
  height?: number;
  width?: string;
  darkMode?: boolean;
  highContrastMode?: boolean;
  "client:only"?: string;
}

export const CompetitorRadarChartPlotly: React.FC<CompetitorRadarChartPlotlyProps> = ({
  id = `competitor-radar-chart-${Math.random().toString(36).substring(2, 9)}`,
  title = "Quantum Computing Competitor Analysis",
  description = "Comparison of key quantum computing capabilities across major competitors in the ecosystem.",
  className = "",
  height = 500,
  width = "100%",
  darkMode = true,
  highContrastMode = false
}) => {
  // Chart data
  const categories = [
    'Quantum Processing Units', 
    'Error Correction', 
    'Qubit Coherence', 
    'Quantum Algorithms',
    'System Integration',
    'Quantum Software',
    'Cloud Access',
    'Developer Tools'
  ];
  
  const competitors = [
    { name: 'QDaria', values: [9, 8, 7, 9, 8, 9, 7, 9], color: '#04a3ff' },
    { name: 'IBM Quantum', values: [8, 7, 8, 8, 9, 7, 9, 8], color: '#6929c4' },
    { name: 'Google Quantum AI', values: [9, 6, 8, 7, 7, 6, 8, 7], color: '#f5b700' },
    { name: 'Rigetti', values: [7, 5, 6, 6, 6, 7, 7, 6], color: '#9D73FE' }
  ];

  // State for chart data
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartLayout, setChartLayout] = useState<any>({});
  const [isDataReady, setIsDataReady] = useState(false);
  const [activeCompetitors, setActiveCompetitors] = useState<string[]>(
    competitors.map(comp => comp.name)
  );

  // Prepare chart data & layout
  useEffect(() => {
    // Create radar chart traces
    const traces = competitors.map(competitor => ({
      type: 'scatterpolar',
      name: competitor.name,
      r: competitor.values,
      theta: categories,
      fill: 'toself',
      line: {
        color: competitor.color,
        width: 3
      },
      fillcolor: `${competitor.color}30`,
      hovertemplate: 
        '<b>%{theta}</b><br>' +
        'Score: %{r}/10<br>' +
        '<extra>%{fullData.name}</extra>',
      visible: activeCompetitors.includes(competitor.name) ? true : 'legendonly'
    }));

    setChartData(traces);

    // Configure layout
    const layout = {
      title: {
        text: title,
        font: {
          size: 20,
          color: '#ffffff'
        }
      },
      height: height,
      autosize: true,
      showlegend: true,
      legend: {
        orientation: 'h',
        y: 1.15,
        x: 0.5,
        xanchor: 'center',
        font: {
          color: '#ffffff',
          size: 12
        },
        bgcolor: 'rgba(0,0,0,0.1)',
        bordercolor: 'rgba(255,255,255,0.2)',
        borderwidth: 1
      },
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 10],
          angle: 45,
          tickfont: {
            color: '#ffffff',
            size: 10
          },
          gridcolor: 'rgba(255, 255, 255, 0.15)',
          gridwidth: 1,
          linecolor: 'rgba(255, 255, 255, 0.2)',
          linewidth: 1
        },
        angularaxis: {
          tickfont: {
            color: '#ffffff',
            size: 11
          },
          gridcolor: 'rgba(255, 255, 255, 0.1)',
          linecolor: 'rgba(255, 255, 255, 0.2)',
          linewidth: 1
        },
        bgcolor: 'rgba(0,0,0,0)'
      },
      margin: {
        l: 60,
        r: 60,
        t: 80,
        b: 60
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      hoverlabel: {
        bgcolor: '#1e293b',
        bordercolor: '#475569',
        font: {
          family: 'Inter, system-ui, sans-serif',
          color: '#ffffff',
          size: 12
        }
      }
    };

    setChartLayout(layout);
    setIsDataReady(true);
  }, [activeCompetitors]);

  // Toggle competitors visibility
  const toggleCompetitor = (competitorName: string) => {
    if (activeCompetitors.includes(competitorName)) {
      setActiveCompetitors(activeCompetitors.filter(name => name !== competitorName));
    } else {
      setActiveCompetitors([...activeCompetitors, competitorName]);
    }
  };

  // Render the data table
  const renderDataTable = () => {
    return (
      <table className="chart-data-table-content">
        <thead>
          <tr>
            <th>Capability</th>
            {competitors.map(competitor => (
              <th key={competitor.name}>{competitor.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, categoryIndex) => (
            <tr key={category}>
              <td>{category}</td>
              {competitors.map(competitor => (
                <td key={`${competitor.name}-${category}`}>
                  {competitor.values[categoryIndex]}/10
                </td>
              ))}
            </tr>
          ))}
          <tr className="summary-row">
            <td>Average Score</td>
            {competitors.map(competitor => (
              <td key={`${competitor.name}-avg`}>
                {(competitor.values.reduce((a, b) => a + b, 0) / competitor.values.length).toFixed(1)}/10
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  // Render competitor toggle buttons
  const renderCompetitorToggles = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {competitors.map(competitor => (
          <button
            key={competitor.name}
            className={`px-4 py-1 text-sm rounded-full transition-colors ${
              activeCompetitors.includes(competitor.name)
                ? 'bg-slate-700 text-white'
                : 'bg-slate-800/50 text-slate-400'
            }`}
            style={{
              borderColor: competitor.color,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            onClick={() => toggleCompetitor(competitor.name)}
          >
            {competitor.name}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {renderCompetitorToggles()}
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
      <div className="mt-4 text-xs text-zinc-400 text-center italic">
        <p>Score values represent capability strength on a scale of 1-10 based on published research and industry analyses.</p>
      </div>
    </div>
  );
};

export default CompetitorRadarChartPlotly;
