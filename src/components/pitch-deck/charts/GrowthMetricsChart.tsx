import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

interface GrowthMetricsChartProps {
  className?: string;
}

export const GrowthMetricsChart: React.FC<GrowthMetricsChartProps> = ({ className = '' }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data: Partial<Plotly.PlotData>[] = [
      {
        x: months,
        y: [1200, 2100, 3800, 6200, 9800, 14500, 21000, 29500, 40000, 53000, 68000, 85000],
        name: 'Active Users',
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#04a3ff',
          width: 3,
          shape: 'spline',
        },
        marker: {
          size: 8,
          color: '#04a3ff',
          line: {
            color: '#000212',
            width: 2,
          },
        },
        hovertemplate: '<b>%{x}</b><br>Active Users: %{y:,}<extra></extra>',
      },
      {
        x: months,
        y: [850, 1500, 2700, 4400, 7000, 10200, 15000, 21000, 28500, 38000, 49000, 62000],
        name: 'Monthly Revenue ($K)',
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#00ffd3',
          width: 3,
          shape: 'spline',
        },
        marker: {
          size: 8,
          color: '#00ffd3',
          line: {
            color: '#000212',
            width: 2,
          },
        },
        hovertemplate: '<b>%{x}</b><br>Revenue: $%{y:,}K<extra></extra>',
      },
      {
        x: months,
        y: [45, 52, 58, 64, 69, 73, 77, 80, 83, 86, 88, 90],
        name: 'Customer Retention (%)',
        type: 'scatter',
        mode: 'lines+markers',
        yaxis: 'y2',
        line: {
          color: '#65ff00',
          width: 3,
          shape: 'spline',
        },
        marker: {
          size: 8,
          color: '#65ff00',
          line: {
            color: '#000212',
            width: 2,
          },
        },
        hovertemplate: '<b>%{x}</b><br>Retention: %{y}%<extra></extra>',
      },
      {
        x: months,
        y: [120, 180, 265, 380, 540, 750, 1050, 1450, 1950, 2550, 3250, 4100],
        name: 'AI Operations (K)',
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#ff00ff',
          width: 3,
          shape: 'spline',
        },
        marker: {
          size: 8,
          color: '#ff00ff',
          line: {
            color: '#000212',
            width: 2,
          },
        },
        hovertemplate: '<b>%{x}</b><br>AI Ops: %{y:,}K<extra></extra>',
      },
    ];

    const layout: Partial<Plotly.Layout> = {
      paper_bgcolor: 'rgba(0, 2, 18, 0)',
      plot_bgcolor: 'rgba(0, 2, 18, 0)',
      font: {
        family: 'Inter, system-ui, sans-serif',
        color: '#ffffff',
      },
      margin: {
        l: 60,
        r: 60,
        t: 40,
        b: 50,
      },
      xaxis: {
        title: 'Month',
        gridcolor: 'rgba(255, 255, 255, 0.1)',
        showgrid: true,
        zeroline: false,
        color: '#ffffff',
      },
      yaxis: {
        title: 'Users & Revenue',
        gridcolor: 'rgba(255, 255, 255, 0.1)',
        showgrid: true,
        zeroline: false,
        color: '#ffffff',
      },
      yaxis2: {
        title: 'Retention Rate (%)',
        overlaying: 'y',
        side: 'right',
        gridcolor: 'rgba(255, 255, 255, 0.05)',
        showgrid: false,
        zeroline: false,
        color: '#ffffff',
        range: [0, 100],
      },
      legend: {
        orientation: 'h',
        y: -0.15,
        x: 0.5,
        xanchor: 'center',
        bgcolor: 'rgba(0, 2, 18, 0.8)',
        bordercolor: 'rgba(255, 255, 255, 0.2)',
        borderwidth: 1,
      },
      hovermode: 'x unified',
      hoverlabel: {
        bgcolor: 'rgba(0, 2, 18, 0.95)',
        bordercolor: '#04a3ff',
        font: {
          color: '#ffffff',
          size: 13,
        },
      },
    };

    const config: Partial<Plotly.Config> = {
      responsive: true,
      displayModeBar: false,
    };

    Plotly.newPlot(chartRef.current, data, layout, config);

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className={`w-full h-full min-h-[450px] ${className}`}
      style={{ minHeight: '450px' }}
    />
  );
};

export default GrowthMetricsChart;
