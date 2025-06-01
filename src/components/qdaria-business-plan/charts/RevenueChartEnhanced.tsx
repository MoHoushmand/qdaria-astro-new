import React, { useEffect, useRef, useState } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto'; // Ensure Chart.js modules are registered
import EnhancedBaseChart from './EnhancedBaseChart';
import type { RevenueChartProps } from '../../../types/chart';

export default function RevenueChartEnhanced({
  id,
  title,
  description,
  revenueData,
  years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035], // Extended to 2035
  darkMode = false,
  className = '',
}: RevenueChartProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [dataTableVisible, setDataTableVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'yearly' | 'cumulative'>('yearly');
  const workerRef = useRef<Worker | null>(null);

  // Initialize web worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../charts/workers/revenueWorker.js', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (event) => {
      if (event.data.error) {
        console.error('Worker error:', event.data.error);
        return;
      }

      setChartData(event.data.chartData);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Process data with worker when props or view mode changes
  useEffect(() => {
    if (!workerRef.current) return;

    workerRef.current.postMessage({
      revenueData,
      years,
      viewMode,
      darkMode
    });
  }, [revenueData, years, viewMode, darkMode]);

  // Chart options
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          color: darkMode ? '#e5e7eb' : '#1f2937',
          font: {
            family: 'Inter, sans-serif',
            weight: 500,
            size: 14
          }
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#4b5563',
        }
      },
      y: {
        title: {
          display: true,
          text: viewMode === 'yearly' ? 'Annual Revenue (Millions USD)' : 'Cumulative Revenue (Millions USD)',
          color: darkMode ? '#e5e7eb' : '#1f2937',
          font: {
            family: 'Inter, sans-serif',
            weight: 500,
            size: 14
          }
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value) {
            return `$${value}M`;
          },
          color: darkMode ? '#9ca3af' : '#4b5563',
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: $${value.toFixed(1)}M`;
          }
        }
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Inter, sans-serif',
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: darkMode ? '#e5e7eb' : '#1f2937',
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // Handle keyboard navigation
  const handleChartClick = (event: any, elements: any[]) => {
    if (elements.length > 0) {
      const { datasetIndex, index } = elements[0];
      const dataValue = chartData?.datasets[datasetIndex].data[index];
      const year = years[index];
      const datasetLabel = chartData?.datasets[datasetIndex].label;
      
      // Announce for screen readers
      const announcement = document.getElementById('revenue-announcement');
      if (announcement) {
        announcement.textContent = `${datasetLabel} in ${year}: $${dataValue}M`;
      }
    }
  };

  // Handle data table toggle
  const toggleDataTable = () => {
    setDataTableVisible(!dataTableVisible);
  };

  // Toggle between yearly and cumulative views
  const toggleViewMode = () => {
    setViewMode(viewMode === 'yearly' ? 'cumulative' : 'yearly');
  };

  // Accessibility configuration
  const accessibility = {
    ariaLabel: `QDaria revenue projections from ${years[0]} to ${years[years.length-1]}`,
    keyboardNavigation: true,
    announceDataPoint: (index: number) => {
      const announcement = document.getElementById('revenue-announcement');
      if (announcement && chartData) {
        const year = years[index % years.length];
        let text = '';
        
        chartData.datasets.forEach(dataset => {
          const value = dataset.data[index % years.length] as number;
          text += `${dataset.label}: $${value.toFixed(1)}M, `;
        });
        
        announcement.textContent = `Year ${year}: ${text}`;
      }
    }
  };
  
  // Generate table data
  const renderDataTable = () => {
    if (!chartData || !dataTableVisible) return null;
    
    return (
      <div className="mt-8 overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Year
                  </th>
                  {chartData.datasets.map((dataset, i) => (
                    <th key={i} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {dataset.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {years.map((year: number, yearIndex: number) => (
                  <tr key={yearIndex} className={yearIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {year}
                    </td>
                    {chartData.datasets.map((dataset, datasetIndex) => (
                      <td key={datasetIndex} className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        ${(dataset.data[yearIndex] as number).toFixed(1)}M
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => exportTableAsCSV()}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            aria-label="Export data as CSV"
          >
            <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>
    );
  };
  
  // Export table data as CSV
  const exportTableAsCSV = () => {
    if (!chartData) return;
    
    // Build CSV content
    let csvContent = "Year," + chartData.datasets.map(ds => ds.label).join(",") + "\n";
    
    years.forEach((year: number, yearIndex: number) => {
      csvContent += year + ",";
      csvContent += chartData.datasets.map(dataset => (dataset.data[yearIndex] as number).toFixed(1)).join(",");
      csvContent += "\n";
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `qdaria_revenue_${viewMode}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col space-y-4">
        {chartData && (
          <React.Fragment>
            <div className="flex flex-wrap justify-end space-x-2 mb-4">
              <div className="inline-flex items-center rounded-md bg-gray-100 p-1 dark:bg-gray-800" role="group" aria-label="View mode selection">
                <button
                  onClick={() => setViewMode('yearly')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    viewMode === 'yearly'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                  } rounded-md`}
                  aria-label="Show yearly revenue"
                >
                  Yearly
                </button>
                <button
                  onClick={() => setViewMode('cumulative')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    viewMode === 'cumulative'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                  } rounded-md`}
                  aria-label="Show cumulative revenue"
                >
                  Cumulative
                </button>
              </div>
            </div>
            
            <EnhancedBaseChart
              id={id}
              title={title}
              description={description}
              type="line"
              data={chartData}
              options={options}
              darkMode={darkMode}
              className={className}
              accessibility={accessibility}
              onChartClick={(event, elements) => handleChartClick(event, elements || [])}
            />
            
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleDataTable}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                aria-label={dataTableVisible ? "Hide data table" : "Show data table"}
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {dataTableVisible ? 'Hide Data Table' : 'Show Data Table'}
              </button>
            </div>
            
            <div id={`${id}-data-table`} aria-live="polite">
              {renderDataTable()}
            </div>
          </React.Fragment>
        )}
        
        {/* Hidden element for screen reader announcements */}
        <div id="revenue-announcement" className="sr-only" aria-live="polite"></div>
      </div>
    </React.Fragment>
  );
}