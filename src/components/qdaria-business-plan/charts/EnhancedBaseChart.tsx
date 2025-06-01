import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import type { ChartData, ChartOptions, ChartType } from 'chart.js';

interface AccessibilityConfig {
  ariaLabel: string;
  keyboardNavigation: boolean;
  announceDataPoint?: (index: number) => void;
}

interface EnhancedBaseChartProps {
  id: string;
  title?: string;
  description?: string;
  type: ChartType;
  data: ChartData;
  options: ChartOptions;
  darkMode?: boolean;
  className?: string;
  accessibility: AccessibilityConfig;
  onChartClick?: (event: any, elements: any[]) => void;
}

export default function EnhancedBaseChart({
  id,
  title,
  description,
  type,
  data,
  options,
  darkMode = false,
  className = '',
  accessibility,
  onChartClick,
}: EnhancedBaseChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [currentDataPoint, setCurrentDataPoint] = useState<number | null>(null);
  const [exportOptions, setExportOptions] = useState<{ showing: boolean }>({ showing: false });

  // Initialize and update chart when data or options change
  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type,
        data,
        options: {
          ...options,
          onClick: (event, elements) => {
            if (onChartClick) {
              onChartClick(event, elements);
            }
          },
        },
      });
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [type, data, options]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!accessibility.keyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!chartRef.current || !chartInstance.current) return;

      // Only process if chart canvas is focused
      if (document.activeElement !== chartRef.current) return;

      // Determine max index based on data
      const maxIndex = chartInstance.current.data.labels?.length || 0;
      let newIndex = currentDataPoint || 0;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newIndex = (newIndex + 1) % maxIndex;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newIndex = (newIndex - 1 + maxIndex) % maxIndex;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = maxIndex - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          // Simulate a click
          if (chartInstance.current && newIndex !== null) {
            const meta = chartInstance.current.getDatasetMeta(0);
            if (meta && meta.data[newIndex]) {
              chartInstance.current.tooltip?.setActiveElements([{
                datasetIndex: 0,
                index: newIndex
              }], { x: 0, y: 0 });
              chartInstance.current.update();
            }
          }
          break;
        case 't':
          if (e.altKey) {
            // ALT+T to toggle data table
            e.preventDefault();
            const tableToggle = document.querySelector(`button[aria-label="Show data table"], button[aria-label="Hide data table"]`) as HTMLButtonElement;
            if (tableToggle) tableToggle.click();
          }
          break;
        case 'e':
          if (e.altKey) {
            // ALT+E to export chart as image
            e.preventDefault();
            exportAsImage();
          }
          break;
        case 'c':
          if (e.altKey) {
            // ALT+C to export data as CSV
            e.preventDefault();
            const csvExport = document.querySelector(`button[aria-label="Export data as CSV"]`) as HTMLButtonElement;
            if (csvExport) csvExport.click();
          }
          break;
      }

      if (newIndex !== currentDataPoint) {
        setCurrentDataPoint(newIndex);
        highlightDataPoint(newIndex);
        if (accessibility.announceDataPoint) {
          accessibility.announceDataPoint(newIndex);
        }
      }
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentDataPoint, accessibility]);

  // Set tabindex and focus behavior
  useEffect(() => {
    if (!chartRef.current) return;

    // Make the canvas focusable
    chartRef.current.tabIndex = 0;
    chartRef.current.setAttribute('role', 'img');
    chartRef.current.setAttribute('aria-label', accessibility.ariaLabel);

    // Add focus styling
    const handleFocus = () => {
      if (chartRef.current) {
        chartRef.current.style.outline = '2px solid #3b82f6';
        chartRef.current.style.outlineOffset = '2px';
      }
    };

    const handleBlur = () => {
      if (chartRef.current) {
        chartRef.current.style.outline = 'none';
      }
    };

    chartRef.current.addEventListener('focus', handleFocus);
    chartRef.current.addEventListener('blur', handleBlur);

    return () => {
      if (chartRef.current) {
        chartRef.current.removeEventListener('focus', handleFocus);
        chartRef.current.removeEventListener('blur', handleBlur);
      }
    };
  }, [accessibility.ariaLabel]);

  // Function to highlight a specific data point
  const highlightDataPoint = (index: number) => {
    if (!chartInstance.current) return;

    const chart = chartInstance.current;
    
    // Show tooltip for the active point
    chart.tooltip?.setActiveElements([{
      datasetIndex: 0,
      index,
    }], { x: 0, y: 0 });
    
    chart.update();
  };

  // Export chart as image
  const exportAsImage = () => {
    if (!chartRef.current || !chartInstance.current) return;
    
    const canvas = chartRef.current;
    const imageUrl = canvas.toDataURL('image/png');
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.download = `${id}_chart_${new Date().toISOString().split('T')[0]}.png`;
    link.href = imageUrl;
    link.click();
  };

  // Show export options
  const toggleExportOptions = () => {
    setExportOptions(prev => ({ showing: !prev.showing }));
  };

  return (
    <div className={`chart-container relative ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>}
      
      <div className="relative chart-canvas-container">
        <canvas 
          ref={chartRef} 
          role="img"
          aria-label={accessibility.ariaLabel}
          className="w-full h-full min-h-[300px]"
        ></canvas>
        
        {/* Chart controls */}
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={toggleExportOptions}
            className="p-1.5 rounded-md bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            aria-label="Chart options"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          
          {exportOptions.showing && (
            <div className="absolute top-full right-0 mt-1 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-20">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={exportAsImage}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  role="menuitem"
                >
                  <svg className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Export as PNG
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {description && <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{description}</p>}
      
      {/* Keyboard navigation instructions */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-md">
        <p className="font-medium mb-1">Keyboard Navigation:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use <span className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Tab</span> to focus on the chart</li>
          <li>Use <span className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Arrow Keys</span> to navigate between data points</li>
          <li>Press <span className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Alt+T</span> to toggle data table</li>
          <li>Press <span className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Alt+E</span> to export as PNG</li>
          <li>Press <span className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Alt+C</span> to export as CSV</li>
        </ul>
      </div>
    </div>
  );
}