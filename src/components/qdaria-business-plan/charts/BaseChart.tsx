import React, { useEffect, useRef, useState } from 'react';
import { 
  Chart, 
  registerables, 
  type ChartEvent, 
  type ActiveElement,
  type ChartType, 
  type ChartData, 
  type ChartOptions 
} from 'chart.js';
import type { BaseChartProps, ChartEventHandlers } from '../../../types/chart';

// Register Chart.js components
Chart.register(...registerables);

interface BaseChartComponentProps extends BaseChartProps {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  eventHandlers?: ChartEventHandlers;
}

export const BaseChart: React.FC<BaseChartComponentProps> = ({
  id,
  title,
  description,
  type,
  data,
  options = {},
  showDataTable = false,
  darkMode = true,
  eventHandlers = {},
  className = '',
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [dataTableVisible, setDataTableVisible] = useState(showDataTable);
  const [activePoint, setActivePoint] = useState(-1);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  // Initialize and manage chart lifecycle
  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Apply theme-based styling to options
    const themedOptions = applyThemeToOptions(options, darkMode);
    
    // Create new chart instance
    const newChartInstance = new Chart(chartRef.current, {
      type,
      data,
      options: themedOptions,
    });

    // Add chart instance to window for debugging
    if (chartRef.current) {
      chartRef.current.chart = newChartInstance;
    }

    // Register chart event handlers
    if (eventHandlers.onChartClick && newChartInstance.options) {
      newChartInstance.options.onClick = eventHandlers.onChartClick as unknown as (event: ChartEvent, elements: ActiveElement[], chart: Chart) => void;
    }
    
    if (eventHandlers.onHover && newChartInstance.options) {
      newChartInstance.options.onHover = eventHandlers.onHover as unknown as (event: ChartEvent, elements: ActiveElement[], chart: Chart) => void;
    }

    setChartInstance(newChartInstance);

    // Cleanup function to destroy chart when component unmounts
    return () => {
      newChartInstance.destroy();
    };
  }, [type, data, options, darkMode, eventHandlers]);

  // Apply theme to chart options
  const applyThemeToOptions = (options: ChartOptions, isDarkMode: boolean): ChartOptions => {
    const baseOptions: ChartOptions = { ...options };
    
    // Set default colors based on theme
    const gridColor = isDarkMode ? 'rgba(4, 163, 255, 0.1)' : 'rgba(0, 102, 204, 0.1)';
    const textColor = isDarkMode ? '#9ca3af' : '#666666';
    const tooltipBgColor = isDarkMode ? 'rgba(2, 6, 23, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    const tooltipBorderColor = isDarkMode ? 'rgba(4, 163, 255, 0.3)' : 'rgba(0, 102, 204, 0.3)';
    
    // Apply theme to scales if they exist
    if (baseOptions.scales) {
      // Handle y-axis theming
      if (baseOptions.scales.y) {
        baseOptions.scales.y = {
          ...baseOptions.scales.y,
          grid: {
            ...baseOptions.scales.y.grid,
            color: gridColor,
          },
          ticks: {
            ...baseOptions.scales.y.ticks,
            color: textColor,
          },
        };
      }
      
      // Handle x-axis theming
      if (baseOptions.scales.x) {
        baseOptions.scales.x = {
          ...baseOptions.scales.x,
          grid: {
            ...baseOptions.scales.x.grid,
            color: gridColor,
          },
          ticks: {
            ...baseOptions.scales.x.ticks,
            color: textColor,
          },
        };
      }
      
      // Handle radar chart's r scale (if present)
      if (baseOptions.scales.r) {
        // Handle basic properties safely
        baseOptions.scales.r = {
          ...baseOptions.scales.r,
          grid: {
            ...baseOptions.scales.r.grid,
            color: gridColor,
          },
          ticks: {
            ...baseOptions.scales.r.ticks,
            color: textColor,
          },
        };
        
        // Handle radar-specific properties with type safety
        const rScale = baseOptions.scales.r as any;
        
        if (rScale.angleLines) {
          rScale.angleLines = {
            ...rScale.angleLines,
            color: gridColor,
          };
        }
        
        if (rScale.pointLabels) {
          rScale.pointLabels = {
            ...rScale.pointLabels,
            color: textColor,
          };
        }
      }
    }
    
    // Apply theme to plugins if they exist
    if (!baseOptions.plugins) {
      baseOptions.plugins = {};
    }
    
    // Apply theme to legend
    baseOptions.plugins.legend = {
      ...baseOptions.plugins.legend,
      labels: {
        ...baseOptions.plugins.legend?.labels,
        color: textColor,
      },
    };
    
    // Apply theme to tooltip
    baseOptions.plugins.tooltip = {
      ...baseOptions.plugins.tooltip,
      backgroundColor: tooltipBgColor,
      borderColor: tooltipBorderColor,
      titleColor: textColor,
      bodyColor: textColor,
    };
    
    return baseOptions;
  };

  // Toggle data table visibility
  const toggleDataTable = () => {
    setDataTableVisible(!dataTableVisible);
    // Store preference in localStorage
    localStorage.setItem(`${id}-data-table-visible`, (!dataTableVisible).toString());
    
    // Announce state change for screen readers
    const liveRegion = document.getElementById(`${id}-live-region`);
    if (liveRegion) {
      liveRegion.textContent = !dataTableVisible 
        ? `Data table for ${title} is now visible` 
        : `Data table for ${title} is now hidden`;
    }
  };

  // Export chart as PNG image
  const exportChartAsImage = () => {
    if (!chartRef.current) return;
    
    try {
      const url = chartRef.current.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${id}.png`;
      link.href = url;
      link.click();
      
      // Announce for screen readers
      const liveRegion = document.getElementById(`${id}-live-region`);
      if (liveRegion) {
        liveRegion.textContent = `Chart exported as PNG image`;
      }
    } catch (err) {
      console.error('Failed to export chart as image:', err);
      
      // Announce error for screen readers
      const liveRegion = document.getElementById(`${id}-live-region`);
      if (liveRegion) {
        liveRegion.textContent = `Failed to export chart as image`;
      }
    }
  };

  // Export chart data as CSV
  const exportChartAsCSV = () => {
    if (!chartInstance) return;
    
    try {
      const labels = chartInstance.data.labels || [];
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Create header row with column names
      const headerRow = ['Category'];
      chartInstance.data.datasets.forEach(dataset => {
        headerRow.push(dataset.label || 'Value');
      });
      csvContent += headerRow.join(',') + '\n';
      
      // Add data rows
      labels.forEach((label, i) => {
        let row = [label?.toString() || ''];
        chartInstance.data.datasets.forEach(dataset => {
          row.push(dataset.data[i]?.toString() || '');
        });
        csvContent += row.join(',') + '\n';
      });
      
      // Create and trigger download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${id}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Announce for screen readers
      const liveRegion = document.getElementById(`${id}-live-region`);
      if (liveRegion) {
        liveRegion.textContent = `Chart data exported as CSV`;
      }
    } catch (err) {
      console.error('Failed to export chart data as CSV:', err);
      
      // Announce error for screen readers
      const liveRegion = document.getElementById(`${id}-live-region`);
      if (liveRegion) {
        liveRegion.textContent = `Failed to export chart data as CSV`;
      }
    }
  };

  // Handle keyboard navigation for chart
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!chartInstance) return;
    
    const labels = chartInstance.data.labels || [];
    if (!labels.length) return;
    
    let newActivePoint = activePoint;
    
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        // Move to next data point
        if (activePoint < labels.length - 1) {
          newActivePoint = activePoint + 1;
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        // Move to previous data point
        if (activePoint > 0) {
          newActivePoint = activePoint - 1;
        } else if (activePoint === -1) {
          // If no point is selected, select the first one
          newActivePoint = 0;
        }
        break;
      case 'Home':
        // Move to first data point
        newActivePoint = 0;
        break;
      case 'End':
        // Move to last data point
        newActivePoint = labels.length - 1;
        break;
      case 'Enter':
      case ' ': // Space key
        // If a point is selected, announce its details
        if (activePoint >= 0) {
          announceDataPoint(activePoint);
        }
        e.preventDefault();
        return;
      case 't':
        // Alt+T to toggle data table
        if (e.altKey) {
          toggleDataTable();
          e.preventDefault();
          return;
        }
        break;
      case 'e':
        // Alt+E to export as image
        if (e.altKey) {
          exportChartAsImage();
          e.preventDefault();
          return;
        }
        break;
      case 'c':
        // Alt+C to export as CSV
        if (e.altKey) {
          exportChartAsCSV();
          e.preventDefault();
          return;
        }
        break;
      default:
        return; // Don't handle other keys
    }
    
    // If the active point changed, update state and announce
    if (newActivePoint !== activePoint) {
      setActivePoint(newActivePoint);
      announceDataPoint(newActivePoint);
      e.preventDefault();
    }
  };

  // Announce data point for screen readers
  const announceDataPoint = (index: number) => {
    if (!chartInstance || index < 0) return;
    
    const labels = chartInstance.data.labels || [];
    if (index >= labels.length) return;
    
    const label = labels[index];
    const datasets = chartInstance.data.datasets;
    
    let announcement = `${label}: `;
    datasets.forEach((dataset, i) => {
      const value = dataset.data[index];
      announcement += `${dataset.label || `Dataset ${i+1}`}: ${value}${i < datasets.length - 1 ? ', ' : ''}`;
    });
    
    // Update live region for screen readers
    const liveRegion = document.getElementById(`${id}-live-region`);
    if (liveRegion) {
      liveRegion.textContent = announcement;
    }
  };

  // Generate data table from chart data
  const renderDataTable = () => {
    if (!chartInstance) return null;
    
    const labels = chartInstance.data.labels || [];
    const datasets = chartInstance.data.datasets;
    
    if (!labels.length || !datasets.length) {
      return <p>No data available to display</p>;
    }
    
    return (
      <div 
        ref={tableRef}
        className="data-table-container mt-6 overflow-x-auto"
        tabIndex={0}
      >
        <table className="data-table w-full border-collapse text-left">
          <caption className="sr-only">Data table for {title}</caption>
          <thead>
            <tr>
              <th scope="col" className="px-4 py-2 bg-primary-900/50 text-primary-100 font-semibold">
                Category
              </th>
              {datasets.map((dataset, i) => (
                <th key={`header-${i}`} scope="col" className="px-4 py-2 bg-primary-900/50 text-primary-100 font-semibold">
                  {dataset.label || `Dataset ${i+1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map((label, i) => (
              <tr key={`row-${i}`} className={activePoint === i ? 'bg-primary-900/20' : ''}>
                <td className="px-4 py-2 border-t border-primary-800/30 text-white font-medium">
                  {label?.toString()}
                </td>
                {datasets.map((dataset, j) => (
                  <td key={`cell-${i}-${j}`} className="px-4 py-2 border-t border-primary-800/30 text-white">
                    {dataset.data[i]?.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Pre-compute values for rendering to avoid JSX expressions in ARIA attributes
  const dataTableButtonLabel = dataTableVisible ? 'Hide data table' : 'Show data table';
  const dataTableButtonClassName = `px-3 py-1 ${dataTableVisible ? 'bg-primary-600/60 text-white' : 'bg-primary-600/20 hover:bg-primary-600/40 focus:bg-primary-600/40 text-primary-200'} rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-bg`;
  const canvasClassName = `w-full h-full rounded-lg ${darkMode ? 'bg-dark-bg/50 backdrop-blur-sm border border-primary-500/20' : 'bg-white/90 backdrop-blur-sm border border-primary-500/10'}`;
  
  return (
    <div 
      className={`chart-container relative rounded-2xl border border-primary-500/30 bg-dark-bg/80 backdrop-blur-sm transition-all duration-500 overflow-visible p-6 my-8 ${className}`}
      role="region" 
      aria-labelledby={`${id}-title`}
    >
      <div className="chart-header mb-6">
        <h3 id={`${id}-title`} className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p id={`${id}-desc`} className="text-base-300 mb-4">{description}</p>
        <div className="chart-controls flex flex-wrap gap-2 mb-4">
          {dataTableVisible ? (
            <button 
              aria-pressed="true"
              onClick={toggleDataTable}
              className={dataTableButtonClassName}
              aria-label={dataTableButtonLabel}
            >
              Hide Data Table
            </button>
          ) : (
            <button 
              aria-pressed="false"
              onClick={toggleDataTable}
              className={dataTableButtonClassName}
              aria-label={dataTableButtonLabel}
            >
              Show Data Table
            </button>
          )}
          <button 
            onClick={exportChartAsImage} 
            className="px-3 py-1 bg-primary-600/20 hover:bg-primary-600/40 focus:bg-primary-600/40 text-primary-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-bg"
            aria-label="Export as PNG image"
          >
            Export PNG
          </button>
          <button 
            onClick={exportChartAsCSV} 
            className="px-3 py-1 bg-primary-600/20 hover:bg-primary-600/40 focus:bg-primary-600/40 text-primary-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-bg"
            aria-label="Export data as CSV"
          >
            Export CSV
          </button>
        </div>
      </div>
      
      <div className="chart-visualization relative h-[400px] w-full">
        <canvas 
          ref={chartRef}
          id={id}
          aria-labelledby={`${id}-title ${id}-desc`}
          role="img"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={canvasClassName}
        />
        
        {/* Live region for screen reader announcements */}
        <div 
          id={`${id}-live-region`} 
          className="sr-only" 
          aria-live="polite"
          aria-atomic="true"
        />
      </div>
      
      {dataTableVisible && renderDataTable()}
      
      {/* Keyboard navigation instructions - hidden visually but available to screen readers */}
      <div className="sr-only">
        <h4>Keyboard Navigation</h4>
        <ul>
          <li>Use arrow keys to navigate between data points</li>
          <li>Press Enter or Space to hear details about the selected data point</li>
          <li>Press Alt+T to toggle data table</li>
          <li>Press Alt+E to export as image</li>
          <li>Press Alt+C to export as CSV</li>
        </ul>
      </div>
    </div>
  );
};