import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import type { MarketSizeChartProps } from '../../../types/chart';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export default function MarketSizeChartEnhanced({
  id,
  title,
  description,
  initialData,
  years,
  smoothing = true,
  scenarios,
  darkMode = true,
}: MarketSizeChartProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showScenarios, setShowScenarios] = useState(false);
  const [quarterlyView, setQuarterlyView] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Create web worker for data processing
    if (typeof window !== 'undefined' && window.Worker) {
      workerRef.current = new Worker('/src/components/qdaria-business-plan/charts/workers/marketSizeWorker.js');
      
      workerRef.current.onmessage = (e) => {
        const { chartData, error } = e.data;
        
        if (error) {
          console.error('Market size worker error:', error);
          return;
        }
        
        if (chartData && chartRef.current) {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
          
          const ctx = chartRef.current.getContext('2d');
          if (!ctx) return;
          
          // Create Chart.js instance with processed data
          chartInstance.current = new ChartJS(ctx, {
            type: 'line',
            data: chartData,
            options: getChartOptions()
          });
          
          setIsLoading(false);
        }
      };
      
      // Send data to worker for processing
      processChartData();
    } else {
      // Fallback for environments without web worker support
      const chartData = generateChartData();
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
          chartInstance.current = new ChartJS(ctx, {
            type: 'line',
            data: chartData,
            options: getChartOptions()
          });
          
          setIsLoading(false);
        }
      }
    }
    
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Update chart when view options change
  useEffect(() => {
    processChartData();
  }, [showScenarios, quarterlyView, smoothing]);

  // Process chart data using web worker
  const processChartData = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        initialData,
        years,
        smoothing,
        scenarios,
        scenariosVisible: showScenarios,
        quarterlyView,
        darkMode
      });
    } else {
      // Fallback
      const chartData = generateChartData();
      if (chartInstance.current) {
        chartInstance.current.data = chartData;
        chartInstance.current.update();
      }
    }
  };

  // Fallback chart data generation (without web worker)
  const generateChartData = (): ChartData => {
    const baseColor = '#3b82f6';
    const conservativeColor = '#ef4444';
    const aggressiveColor = '#10b981';
    
    const datasets = [
      {
        label: 'Base Case',
        data: initialData,
        borderColor: baseColor,
        backgroundColor: `${baseColor}20`,
        fill: true,
        tension: 0.4,
      }
    ];
    
    if (showScenarios && scenarios) {
      if (scenarios.conservative) {
        datasets.push({
          label: 'Conservative Case',
          data: scenarios.conservative,
          borderColor: conservativeColor,
          backgroundColor: `${conservativeColor}10`,
          fill: true,
          tension: 0.4,
        });
      }
      
      if (scenarios.aggressive) {
        datasets.push({
          label: 'Aggressive Case',
          data: scenarios.aggressive,
          borderColor: aggressiveColor,
          backgroundColor: `${aggressiveColor}10`,
          fill: true,
          tension: 0.4,
        });
      }
    }
    
    return {
      labels: years.map(year => year.toString()),
      datasets
    };
  };

  // Chart options configuration
  const getChartOptions = (): ChartOptions => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
            callback: (value) => `$${value}B`
          }
        }
      },
      plugins: {
        tooltip: {
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          titleColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          bodyColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(4, 163, 255, 0.4)',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: (context) => {
              const value = context.raw as number;
              return ` ${context.dataset.label}: $${value.toFixed(1)}B`;
            }
          }
        },
        legend: {
          labels: {
            color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
            font: {
              family: 'Inter, sans-serif'
            },
            usePointStyle: true
          },
          position: 'top',
          align: 'center'
        }
      }
    };
  };

  // Toggle scenario comparisons
  const toggleScenarios = () => {
    setShowScenarios(!showScenarios);
  };

  // Toggle quarterly view
  const toggleQuarterlyView = () => {
    setQuarterlyView(!quarterlyView);
  };

  // Toggle smoothing
  const toggleSmoothing = () => {
    const newSmoothing = !smoothing;
    // Calling this directly won't work since smoothing is not a state
    // but a prop, so we need to handle it differently in a real implementation
    processChartData();
  };

  // Toggle data table view
  const toggleDataTable = () => {
    setShowTable(!showTable);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!chartInstance.current) return;
    
    const labels = chartInstance.current.data.labels || [];
    const datasets = chartInstance.current.data.datasets || [];
    
    // Create CSV headers
    let csv = 'Year';
    datasets.forEach(dataset => {
      csv += `,${dataset.label}`;
    });
    csv += '\n';
    
    // Add data rows
    labels.forEach((label, index) => {
      csv += label;
      datasets.forEach(dataset => {
        const data = dataset.data as number[];
        csv += `,${data[index]}`;
      });
      csv += '\n';
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `market-size-projections-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Attach this to window for the chart-examples.astro script
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.initMarketSizeChart = (options: { id?: string } = {}) => {
        if (options.id !== id) return;
        
        // Process chart data (already happens in useEffect)
        // This method is called from the Astro component
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        window.initMarketSizeChart = undefined;
      }
    };
  }, [id]);

  return (
    <div className="market-size-chart relative">
      <div className="controls flex justify-end gap-2 mb-4">
        <button
          type="button"
          onClick={toggleScenarios}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors 
            ${showScenarios 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
          aria-pressed={showScenarios ? "true" : "false"}
        >
          {showScenarios ? 'Hide Scenarios' : 'Show Scenarios'}
        </button>
        
        <button
          type="button"
          onClick={toggleQuarterlyView}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors 
            ${quarterlyView 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
          aria-pressed={quarterlyView ? "true" : "false"}
        >
          {quarterlyView ? 'Yearly View' : 'Quarterly View'}
        </button>
        
        <button
          type="button"
          onClick={toggleDataTable}
          className="px-3 py-1 rounded-md text-sm font-medium bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
          aria-controls="market-size-data-table"
          aria-expanded={showTable ? "true" : "false"}
        >
          {showTable ? 'Hide Data Table' : 'Show Data Table'}
        </button>
        
        <button
          type="button"
          onClick={exportToCSV}
          className="px-3 py-1 rounded-md text-sm font-medium bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
          aria-label="Export data to CSV file"
        >
          Export CSV
        </button>
      </div>
      
      <div className="chart-container relative h-[400px] w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm rounded-lg z-10">
            <div className="text-center text-gray-300">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p>Processing chart data...</p>
            </div>
          </div>
        )}
        
        <canvas 
          ref={chartRef}
          id={id}
          role="img"
          aria-label={`Market size projections from ${years[0]} to ${years[years.length - 1]}`}
          tabIndex={0}
        ></canvas>
      </div>
      
      {showTable && (
        <div 
          id="market-size-data-table"
          className="data-table mt-6 border border-gray-700 rounded-md overflow-hidden"
          role="region"
          aria-label="Market size data table"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Year
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Base Case ($B)
                  </th>
                  {showScenarios && scenarios && (
                    <Fragment>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Conservative ($B)
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Aggressive ($B)
                      </th>
                    </Fragment>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-gray-900">
                {years.map((year, index) => (
                  <tr key={year} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/50'}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                      {year}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                      {initialData[index].toFixed(1)}
                    </td>
                    {showScenarios && scenarios && (
                      <Fragment>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                          {scenarios.conservative && scenarios.conservative[index] ? scenarios.conservative[index].toFixed(1) : 'N/A'}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                          {scenarios.aggressive ? scenarios.aggressive[index].toFixed(1) : 'N/A'}
                        </td>
                      </Fragment>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}