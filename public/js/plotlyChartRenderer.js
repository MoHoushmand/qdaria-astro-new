/**
 * plotlyChartRenderer.js
 * 
 * A central script for dynamically rendering Plotly charts in the QDaria Business Plan.
 * Works with web workers to process data and render sophisticated Plotly visualizations.
 */

(function() {
  // Store for chart instances
  const plotlyCharts = {};
  
  // Check if Plotly library is loaded
  const isPlotlyLoaded = () => {
    return typeof window.Plotly !== 'undefined';
  };
  
  // Load Plotly from CDN if not already loaded
  const loadPlotly = () => {
    if (isPlotlyLoaded()) {
      console.log('💫 Plotly already loaded');
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      console.log('💫 Loading Plotly.js from CDN');
      const script = document.createElement('script');
      script.src = 'https://cdn.plot.ly/plotly-2.27.1.min.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('💫 Plotly.js loaded successfully');
        // Set default config for all charts
        if (window.Plotly) {
          window.Plotly.setPlotConfig({
            responsive: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'select2d']
          });
        }
        resolve();
      };
      
      script.onerror = (error) => {
        console.error('❌ Failed to load Plotly.js', error);
        reject(error);
      };
      
      document.head.appendChild(script);
    });
  };
  
  // Load React and ReactDOM from CDN if not already loaded (for React-based charts)
  const loadReactAndDOM = () => {
    const promises = [];
    
    if (typeof window.React === 'undefined') {
      promises.push(new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
        script.crossOrigin = 'anonymous';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      }));
    }
    
    if (typeof window.ReactDOM === 'undefined') {
      promises.push(new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
        script.crossOrigin = 'anonymous';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      }));
    }
    
    return Promise.all(promises);
  };
  
  // Initialize a chart container
  const initializeChartContainer = (chartId) => {
    console.log(`💫 Initializing chart container for ${chartId}`);
    const container = document.getElementById(chartId);
    
    if (!container) {
      console.error(`❌ Chart container #${chartId} not found`);
      return null;
    }
    
    // Check if chart is already initialized
    if (plotlyCharts[chartId]) {
      console.log(`💫 Chart ${chartId} already initialized`);
      return container;
    }
    
    // Create chart container if it doesn't exist
    let plotContainer = document.getElementById(`${chartId}-plot`);
    if (!plotContainer) {
      plotContainer = document.createElement('div');
      plotContainer.id = `${chartId}-plot`;
      plotContainer.className = 'plotly-chart';
      container.appendChild(plotContainer);
    }
    
    // Hide loading element explicitly
    const loadingElement = document.getElementById(`${chartId}-loading`);
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
    return container;
  };
  
  // Render a Plotly chart
  const renderPlotlyChart = (chartId, data, layout, config = {}) => {
    const container = initializeChartContainer(chartId);
    if (!container) return null;
    
    const plotContainer = document.getElementById(`${chartId}-plot`);
    if (!plotContainer) return null;
    
    try {
      // Default config for all charts
      const defaultConfig = {
        responsive: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'select2d'],
        toImageButtonOptions: {
          format: 'png',
          height: 1200,
          width: 1800,
          scale: 2
        }
      };
      
      // Deep merge configs
      const mergedConfig = { ...defaultConfig, ...config };
      
      // Default layout for dark mode
      const defaultLayout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
          family: 'Inter, system-ui, sans-serif',
          color: '#ffffff'
        },
        margin: {
          l: 60,
          r: 20,
          t: 30,
          b: 60
        },
        xaxis: {
          gridcolor: 'rgba(255, 255, 255, 0.1)',
          zerolinecolor: 'rgba(255, 255, 255, 0.1)'
        },
        yaxis: {
          gridcolor: 'rgba(255, 255, 255, 0.1)',
          zerolinecolor: 'rgba(255, 255, 255, 0.1)'
        }
      };
      
      // Deep merge layouts
      const mergedLayout = { ...defaultLayout, ...layout };
      
      console.log(`💫 Rendering Plotly chart for ${chartId}`);
      
      // Create the plot
      return Plotly.newPlot(plotContainer, data, mergedLayout, mergedConfig)
        .then(() => {
          console.log(`✅ Chart ${chartId} rendered successfully`);
          
          // Store chart instance for future reference
          plotlyCharts[chartId] = {
            data,
            layout: mergedLayout,
            config: mergedConfig
          };
          
          // Trigger resize to ensure proper rendering
          window.dispatchEvent(new Event('resize'));
          
          // Add event listener for data table toggle buttons
          const toggleBtn = container.querySelector('.chart-data-table-btn');
          if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
              const tableId = this.getAttribute('aria-controls');
              const table = document.getElementById(tableId);
              if (table) {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
                table.classList.toggle('hidden');
                table.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
                this.textContent = isExpanded ? 'Show Data Table' : 'Hide Data Table';
              }
            });
          }
          
          return plotContainer;
        })
        .catch(error => {
          console.error(`❌ Error rendering chart ${chartId}:`, error);
          displayErrorState(chartId, error);
          return null;
        });
    } catch (error) {
      console.error(`❌ Error setting up chart ${chartId}:`, error);
      displayErrorState(chartId, error);
      return null;
    }
  };
  
  // Display error state
  const displayErrorState = (chartId, error) => {
    const container = document.getElementById(chartId);
    if (!container) return;
    
    // Hide loading indicator
    const loadingElement = document.getElementById(`${chartId}-loading`);
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
    // Show error message
    const errorContainer = document.createElement('div');
    errorContainer.className = 'chart-error';
    errorContainer.setAttribute('role', 'alert');
    errorContainer.innerHTML = `
      <strong>Error loading chart</strong>
      <p>${error.message || 'An unknown error occurred'}</p>
      <div class="chart-fallback">
        <p>Data is still available in the table below.</p>
      </div>
    `;
    
    // Replace plot container with error
    const plotContainer = document.getElementById(`${chartId}-plot`);
    if (plotContainer) {
      plotContainer.innerHTML = '';
      plotContainer.appendChild(errorContainer);
    } else {
      container.appendChild(errorContainer);
    }
    
    // Make data table visible if available
    const dataTable = document.getElementById(`${chartId}-data-table`);
    if (dataTable) {
      dataTable.style.display = 'block';
      dataTable.classList.remove('hidden');
      dataTable.setAttribute('aria-hidden', 'false');
      
      // Update toggle button if exists
      const toggleBtn = container.querySelector('.chart-data-table-btn');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.textContent = 'Hide Data Table';
      }
    }
  };
  
  // Process chart data with web worker
  const processChartData = (chartId, workerPath, params) => {
    return new Promise((resolve, reject) => {
      try {
        // Use chartWorkerFactory if available
        if (window.chartWorkerFactory) {
          const workerName = workerPath.split('/').pop().replace('Worker.js', '');
          const worker = window.chartWorkerFactory.createChartWorker(workerName);
          
          worker.sendMessage({
            action: 'prepareData',
            chartId,
            ...params
          }).then(response => {
            if (response.action === 'dataReady') {
              resolve(response.chartData);
            } else if (response.action === 'error') {
              reject(new Error(response.error || 'Error processing chart data'));
            }
          }).catch(reject);
        } else {
          // Fall back to direct worker creation
          const worker = new Worker(workerPath);
          
          worker.onmessage = function(e) {
            if (e.data.action === 'dataReady') {
              resolve(e.data.chartData);
            } else if (e.data.action === 'error') {
              reject(new Error(e.data.error || 'Error processing chart data'));
            }
          };
          
          worker.onerror = function(e) {
            reject(new Error(e.message || 'Worker error'));
          };
          
          worker.postMessage({
            action: 'prepareData',
            chartId,
            ...params
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  
  // Generate a data table from JSON data
  const generateDataTable = (data, columns) => {
    if (!data || !Array.isArray(data) || data.length === 0) return '';
    
    const table = document.createElement('table');
    table.className = 'chart-data-table-content';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col.label || col.key;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    data.forEach(row => {
      const tr = document.createElement('tr');
      
      columns.forEach(col => {
        const td = document.createElement('td');
        td.textContent = row[col.key] || '';
        
        if (col.className) {
          td.className = col.className;
        }
        
        tr.appendChild(td);
      });
      
      tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    return table;
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('💫 Plotly Chart Renderer initializing');
    
    // Start loading Plotly
    loadPlotly()
      .then(() => {
        console.log('💫 Scanning for Plotly chart placeholders');
        
        // Find all Plotly chart placeholders
        document.querySelectorAll('.plotly-chart-container').forEach(container => {
          const chartId = container.id;
          if (!chartId) return;
          
          console.log(`💫 Found Plotly chart placeholder: ${chartId}`);
          
          // Initialize the container (but don't render yet - React components will handle rendering)
          initializeChartContainer(chartId);
        });
        
        // Announce Plotly is ready
        document.dispatchEvent(new Event('PlotlyReady'));
      })
      .catch(error => {
        console.error('❌ Error initializing Plotly:', error);
      });
  });
  
  // Global access to chart functions
  window.plotlyChartRenderer = {
    loadPlotly,
    loadReactAndDOM,
    renderPlotlyChart,
    processChartData,
    generateDataTable,
    getChart: (chartId) => plotlyCharts[chartId] || null,
    updateChart: (chartId, data, layout) => {
      const chart = plotlyCharts[chartId];
      if (!chart) return null;
      
      const plotContainer = document.getElementById(`${chartId}-plot`);
      if (!plotContainer) return null;
      
      return Plotly.update(plotContainer, data, layout);
    }
  };
})();
