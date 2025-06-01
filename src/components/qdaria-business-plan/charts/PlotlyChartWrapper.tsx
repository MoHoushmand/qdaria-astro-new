import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface PlotlyChartWrapperProps {
  id: string;
  title?: string;
  description?: string;
  className?: string;
  data: any[];
  layout: any;
  config?: any;
  style?: React.CSSProperties;
  fallbackContent?: ReactNode;
}

export const PlotlyChartWrapper: React.FC<PlotlyChartWrapperProps> = ({
  id,
  title,
  description,
  className = '',
  data,
  layout,
  config = {},
  style = {},
  fallbackContent
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPlotlyLoaded, setIsPlotlyLoaded] = useState(false);

  // Check if Plotly is available
  useEffect(() => {
    const checkPlotly = () => {
      if (typeof window !== 'undefined' && window.Plotly) {
        setIsPlotlyLoaded(true);
        return true;
      }
      return false;
    };

    // Try to load Plotly if not already loaded
    if (!checkPlotly() && window.plotlyChartRenderer) {
      window.plotlyChartRenderer.loadPlotly()
        .then(() => {
          setIsPlotlyLoaded(true);
        })
        .catch(err => {
          console.error('Error loading Plotly:', err);
          setHasError(true);
          setErrorMessage('Failed to load Plotly library.');
        });
    }

    // Listen for the event that Plotly is ready
    const handlePlotlyReady = () => {
      setIsPlotlyLoaded(true);
    };
    
    document.addEventListener('PlotlyReady', handlePlotlyReady);
    
    return () => {
      document.removeEventListener('PlotlyReady', handlePlotlyReady);
    };
  }, []);

  // Render chart when data & Plotly are ready
  useEffect(() => {
    if (!isPlotlyLoaded || !data || data.length === 0) return;

    setIsLoading(true);
    setHasError(false);

    try {
      // Use plotlyChartRenderer helper if available
      if (window.plotlyChartRenderer) {
        window.plotlyChartRenderer.renderPlotlyChart(
          `${id}-plot`, 
          data, 
          layout, 
          config
        )
        .then(() => {
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error rendering chart:', err);
          setHasError(true);
          setErrorMessage(err.message || 'Failed to render chart.');
          setIsLoading(false);
        });
      }
      // Direct Plotly API call if renderer is not available
      else if (window.Plotly) {
        const plotContainer = document.getElementById(`${id}-plot`);
        if (plotContainer) {
          window.Plotly.newPlot(
            plotContainer,
            data,
            { ...layout },
            { responsive: true, ...config }
          )
          .then(() => {
            setIsLoading(false);
          })
          .catch(err => {
            console.error('Error rendering chart:', err);
            setHasError(true);
            setErrorMessage(err.message || 'Failed to render chart.');
            setIsLoading(false);
          });
        }
      } else {
        throw new Error('Plotly is not available.');
      }
    } catch (error) {
      console.error('Error setting up chart:', error);
      setHasError(true);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
      setIsLoading(false);
    }
  }, [data, layout, config, isPlotlyLoaded, id]);

  return (
    <div id={id} className={`plotly-chart-container ${className}`}>
      {title && (
        <div className="chart-title-container">
          {title && <h3 className="chart-title">{title}</h3>}
          {description && <p className="chart-description">{description}</p>}
        </div>
      )}
      
      {/* Loading state */}
      <div 
        id={`${id}-loading`} 
        className="chart-loading" 
        aria-busy={isLoading ? "true" : "false"}
        style={{ display: isLoading ? 'flex' : 'none' }}
      >
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading chart...</div>
      </div>
      
      {/* Error state */}
      {hasError && (
        <div id={`${id}-error`} className="chart-error" role="alert">
          <div className="error-icon">❌</div>
          <div className="error-message">
            <strong>Error loading chart</strong>
            <p>{errorMessage || 'An unknown error occurred'}</p>
          </div>
        </div>
      )}
      
      {/* Chart container */}
      <div 
        id={`${id}-plot`} 
        className="plotly-chart"
        style={{
          width: style.width || '100%',
          height: style.height || '400px',
          display: hasError ? 'none' : 'block',
          ...style
        }}
      ></div>
      
      {/* Data table with toggle */}
      {fallbackContent && (
        <div className="chart-data-table">
          <button 
            className="chart-data-table-btn"
            aria-expanded="false"
            aria-controls={`${id}-data-table`}
            onClick={() => {
              const tableElem = document.getElementById(`${id}-data-table`);
              const tableBtn = document.querySelector(`#${id} .chart-data-table-btn`);
              if (tableElem && tableBtn) {
                const isExpanded = tableBtn.getAttribute('aria-expanded') === 'true';
                tableBtn.setAttribute('aria-expanded', (!isExpanded).toString());
                tableElem.classList.toggle('hidden');
                tableElem.setAttribute('aria-hidden', isExpanded.toString());
                tableBtn.textContent = isExpanded ? 'Show Data Table' : 'Hide Data Table';
              }
            }}
          >
            Show Data Table
          </button>
          <div 
            id={`${id}-data-table`} 
            className="chart-data-table-container hidden"
            aria-hidden="true"
          >
            {fallbackContent}
          </div>
        </div>
      )}
      
      {/* Screen reader announcements */}
      <div 
        id={`${id}-announcements`} 
        className="sr-only" 
        aria-live="polite"
      ></div>
    </div>
  );
};

export default PlotlyChartWrapper;
