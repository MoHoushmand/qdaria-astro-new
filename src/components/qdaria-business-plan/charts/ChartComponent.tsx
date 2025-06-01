import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import type { BaseChartProps, ChartAccessibilityProps } from '../../../types/chart';

// Register all Chart.js components
ChartJS.register(...registerables);

// Add keyboard navigation and accessibility support
interface EnhancedChartProps extends BaseChartProps, ChartAccessibilityProps {
  chartType?: 'roadmap' | 'market-size' | 'revenue' | 'swot' | string;
  darkMode?: boolean;
  data?: any;
  options?: any;
}

export default function ChartComponent({ 
  id, 
  title, 
  description,
  chartType = 'roadmap',
  darkMode = true,
  ariaLabel,
  keyboardNavigation = true,
  data,
  options
}: EnhancedChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [focusedPoint, setFocusedPoint] = useState(-1);
  const [announcement, setAnnouncement] = useState('');

  // Initialize chart on component mount
  useEffect(() => {
    // Initialize chart based on type
    const initializeChart = async () => {
      if (!chartRef.current) return;
      
      let chartData;
      let chartOptions;
      
      switch (chartType) {
        case 'roadmap':
          if (typeof window.initRoadmapChart === 'function') {
            // Global function is already properly defined in Chart.d.ts
            window.initRoadmapChart();
          }
          break;
          
        case 'market-size':
          if (typeof window.initMarketSizeChart === 'function') {
            window.initMarketSizeChart();
          }
          break;
          
        case 'revenue':
          if (typeof window.initRevenueChart === 'function') {
            window.initRevenueChart();
          }
          break;
          
        case 'swot':
          if (typeof window.initSWOTChart === 'function') {
            window.initSWOTChart();
          }
          break;
          
        default:
          // Allow custom chart initialization with provided data
          if (data && options) {
            const canvas = chartRef.current;
            if (canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                chartInstance.current = new ChartJS(ctx, {
                  type: chartType as any,
                  data: data,
                  options: {
                    ...options,
                    responsive: true,
                    maintainAspectRatio: false,
                  }
                });
              }
            }
          }
      }
      
      setIsLoading(false);
    };
    
    // Initialize hovering effect
    const setupMouseTracking = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
      };
      
      container.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    };
    
    const cleanup1 = setupMouseTracking();
    
    // Setup keyboard navigation for accessibility
    const setupKeyboardNavigation = () => {
      if (!keyboardNavigation || !chartRef.current) return;
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!chartInstance.current) return;
        
        const datasets = chartInstance.current.data.datasets;
        if (!datasets || datasets.length === 0) return;
        
        const dataPoints = datasets[0].data;
        if (!dataPoints || !Array.isArray(dataPoints)) return;
        
        let newFocus = focusedPoint;
        
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            newFocus = Math.min(focusedPoint + 1, dataPoints.length - 1);
            break;
            
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            newFocus = Math.max(focusedPoint - 1, 0);
            break;
            
          case 'Home':
            e.preventDefault();
            newFocus = 0;
            break;
            
          case 'End':
            e.preventDefault();
            newFocus = dataPoints.length - 1;
            break;
            
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (focusedPoint >= 0) {
              // Trigger point click or show tooltip
              const meta = chartInstance.current.getDatasetMeta(0);
              const point = meta.data[focusedPoint];
              if (point) {
                const event = new MouseEvent('click', {
                  clientX: point.x,
                  clientY: point.y
                });
                chartRef.current?.dispatchEvent(event);
              }
            }
            break;
            
          default:
            return;
        }
        
        if (newFocus !== focusedPoint) {
          setFocusedPoint(newFocus);
          
          // Announce the data point for screen readers
          const labels = chartInstance.current.data.labels;
          const value = dataPoints[newFocus];
          const label = Array.isArray(labels) ? labels[newFocus] : '';
          
          const announcement = `Data point ${newFocus + 1} of ${dataPoints.length}: ${label}, value: ${value}`;
          setAnnouncement(announcement);
        }
      };
      
      const canvas = chartRef.current;
      if (canvas) {
        canvas.setAttribute('tabindex', '0');
        canvas.addEventListener('keydown', handleKeyDown);
      }
      
      return () => {
        if (chartRef.current) {
          chartRef.current.removeEventListener('keydown', handleKeyDown);
        }
      };
    };
    
    initializeChart();
    
    // Add a delay to ensure chart is initialized before setting up keyboard navigation
    const timeoutId = setTimeout(() => {
      const cleanup2 = setupKeyboardNavigation();
      return () => {
        if (cleanup2) cleanup2();
      };
    }, 1000);
    
    return () => {
      if (cleanup1) cleanup1();
      clearTimeout(timeoutId);
      
      // Clean up chart instance
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [chartType, id, keyboardNavigation, focusedPoint, data, options]);
  
  return (
    <div 
      ref={containerRef}
      className="feature-card rounded-xl p-8 transition-transform duration-300 hover:scale-105"
      role="region"
      aria-label={ariaLabel || `${title} chart`}
    >
      <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
      <p className="text-base-300 mb-6">{description}</p>
      <div className="relative h-[400px] w-full">
        {/* Screen reader announcements */}
        <div 
          aria-live="polite" 
          className="sr-only" 
          aria-atomic="true"
        >
          {announcement}
        </div>
        
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-bg/50 backdrop-blur-sm rounded-lg border border-[rgba(4,163,255,0.2)]">
            <div className="text-center text-gray-400">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p>Loading chart data...</p>
            </div>
          </div>
        ) : null}
        
        <canvas 
          id={id}
          ref={chartRef}
          className="w-full h-full rounded-lg bg-dark-bg/50 backdrop-blur-sm border border-[rgba(4,163,255,0.2)]"
          role="img"
          aria-label={ariaLabel || `${title} visualization`}
        ></canvas>
      </div>
    </div>
  );
}