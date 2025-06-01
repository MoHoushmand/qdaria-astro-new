import React, { useEffect, useRef, useState } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto'; // Ensure Chart.js modules are registered
import EnhancedBaseChart from './EnhancedBaseChart';
import type { TAMSAMSOMChartProps } from '../../../types/chart';

export default function TAMSAMSOMChartEnhanced({
  id,
  title,
  description,
  tam,
  samPercentage,
  somPercentage,
  years,
  growthRate,
  darkMode = false,
  className = '',
}: TAMSAMSOMChartProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const [activeView, setActiveView] = useState<'absolute' | 'percentage'>('absolute');

  // Initialize web worker for calculation
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../charts/workers/tamSamSomWorker.js', import.meta.url),
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

  // Process data with worker when props or view changes
  useEffect(() => {
    if (!workerRef.current) return;

    workerRef.current.postMessage({
      tam,
      samPercentage,
      somPercentage,
      years,
      growthRate,
      viewMode: activeView,
      darkMode
    });
  }, [
    tam, 
    samPercentage, 
    somPercentage, 
    years, 
    growthRate, 
    activeView, 
    darkMode
  ]);

  // Chart options
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
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
        stacked: activeView === 'percentage',
        title: {
          display: true,
          text: activeView === 'absolute' ? 'Market Size (Billions USD)' : 'Market Share (%)',
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
            return activeView === 'absolute' 
              ? `$${value}B` 
              : `${value}%`;
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
            
            return activeView === 'absolute'
              ? `${label}: $${value.toFixed(1)}B`
              : `${label}: ${value.toFixed(1)}%`;
          },
          footer: function(tooltipItems) {
            const item = tooltipItems[0];
            const yearIndex = item.dataIndex;
            const year = years[yearIndex];
            
            if (activeView === 'absolute') {
              return [`Year: ${year}`];
            } else {
              const totalValue = item.chart.data.datasets.reduce((sum, dataset) => {
                return sum + (dataset.data[yearIndex] as number);
              }, 0);
              
              return [
                `Year: ${year}`,
                `Total Market: $${totalValue.toFixed(1)}B`
              ];
            }
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
          padding: 20
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
      const announcement = document.getElementById('tamsomsom-announcement');
      if (announcement) {
        const value = activeView === 'absolute' ? `$${dataValue}B` : `${dataValue}%`;
        announcement.textContent = `${datasetLabel} in ${year}: ${value}`;
      }
    }
  };

  // Accessibility configuration
  const accessibility = {
    ariaLabel: `TAM SAM SOM breakdown from ${years[0]} to ${years[years.length-1]}`,
    keyboardNavigation: true,
    announceDataPoint: (index: number) => {
      const announcement = document.getElementById('tamsomsom-announcement');
      if (announcement && chartData) {
        const year = years[index % years.length];
        const tam = chartData.datasets[0].data[index % years.length];
        const sam = chartData.datasets[1]?.data[index % years.length];
        const som = chartData.datasets[2]?.data[index % years.length];
        
        const values = activeView === 'absolute'
          ? `TAM: $${tam}B, SAM: $${sam}B, SOM: $${som}B`
          : `TAM: ${tam}%, SAM: ${sam}%, SOM: ${som}%`;
          
        announcement.textContent = `Year ${year}: ${values}`;
      }
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col space-y-4">
        {chartData && (
          <React.Fragment>
            <EnhancedBaseChart
              id={id}
              title={title}
              description={description}
              type="bar"
              data={chartData}
              options={options}
              darkMode={darkMode}
              className={className}
              accessibility={accessibility}
              onChartClick={(event, elements) => handleChartClick(event, elements || [])}
            />
            
            <div className="flex flex-wrap items-center justify-end space-x-4 px-8">
              <div className="inline-flex items-center rounded-md bg-gray-100 p-1 dark:bg-gray-800">
                <button
                  onClick={() => setActiveView('absolute')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    activeView === 'absolute'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                  } rounded-md`}
                  aria-label="Show absolute values"
                >
                  Absolute ($B)
                </button>
                <button
                  onClick={() => setActiveView('percentage')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    activeView === 'percentage'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                  } rounded-md`}
                  aria-label="Show percentage values"
                >
                  Percentage (%)
                </button>
              </div>
            </div>
            
            <div className="mx-auto max-w-3xl px-4 py-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">TAM</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Total Addressable Market: The total market demand for quantum computing solutions.
                  </p>
                  <div className="mt-2 text-2xl font-bold text-primary-600 dark:text-primary-400">
                    ${tam}B
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">SAM</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Serviceable Addressable Market: The segment of TAM targeted by our products.
                  </p>
                  <div className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    ${(tam * samPercentage / 100).toFixed(1)}B
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">SOM</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Serviceable Obtainable Market: The portion of SAM we can realistically capture.
                  </p>
                  <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ${(tam * samPercentage / 100 * somPercentage / 100).toFixed(1)}B
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        
        {/* Hidden element for screen reader announcements */}
        <div id="tamsomsom-announcement" className="sr-only" aria-live="polite"></div>
      </div>
    </React.Fragment>
  );
}