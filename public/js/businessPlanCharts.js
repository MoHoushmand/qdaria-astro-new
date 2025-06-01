                                                                                                                                                                                                                                                                                                  /**
 * QDaria Business Plan Charts
 * Global initialization and fixes for all business plan charts
 */

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🌟 QDaria Business Plan Charts - Initializing global chart behavior');
  
  // Force-clear any loading indicators IMMEDIATELY
  forceHideLoading();
  
  // Then force again to be absolutely sure
  setTimeout(forceHideLoading, 500);
  setTimeout(forceHideLoading, 1000);
  
  // Show data tables for all charts in the business plan
  showAllDataTables();
  setTimeout(showAllDataTables, 1000);
  
  // Add more safety checks
  setTimeout(forceHideLoading, 2000);
  setTimeout(showAllDataTables, 3000);
  setTimeout(forceHideLoading, 5000);
  setTimeout(forceHideLoading, 10000);
  
  // Automatically update data tables when charts are rendered
  document.addEventListener('chartRendered', function(event) {
    // Wait a brief moment for the chart to fully render
    setTimeout(function() {
      updateChartDataTable(event.detail.chartId);
    }, 500);
  });
  
  // Listen for new chart placeholders being added
  document.addEventListener('newChartPlaceholdersAdded', function() {
    setTimeout(showAllDataTables, 2000);
    setTimeout(forceHideLoading, 2000);
  });
  
  /**
   * Show data tables for all charts in the business plan
   */
  function showAllDataTables() {
    console.log('📊 Making all chart data tables visible');
    
    // Get all chart components
    const chartContainers = document.querySelectorAll('.apex-chart-container');
    
    let dataTablesShown = 0;
    
    chartContainers.forEach(function(container) {
      const chartId = container.id;
      const dataTableBtn = container.querySelector('.chart-data-table-btn');
      const dataTable = container.querySelector('.chart-data-table');
      
      // Skip if already visible
      if (dataTable && !dataTable.classList.contains('visible')) {
        dataTable.classList.add('visible');
        
        if (dataTableBtn) {
          dataTableBtn.textContent = 'Hide Data Table';
          dataTableBtn.setAttribute('aria-expanded', 'true');
        }
        
        dataTable.setAttribute('aria-hidden', 'false');
        dataTablesShown++;
      }
    });
    
    if (dataTablesShown > 0) {
      console.log(`📊 Made ${dataTablesShown} data tables visible`);
    }
  }
  
  /**
   * Force hide loading spinners that may be stuck
   */
  function forceHideLoading() {
    console.log('🔄 Aggressively removing all loading indicators');
    
    // Get all loading elements
    const loadingIndicators = document.querySelectorAll('.chart-loading');
    
    let clearedCount = 0;
    
    loadingIndicators.forEach(function(loadingElement) {
      // Force hide ALL loading indicators without checking current state
      loadingElement.style.display = 'none';
      loadingElement.style.opacity = '0';
      loadingElement.style.visibility = 'hidden';
      loadingElement.style.pointerEvents = 'none';
      loadingElement.style.zIndex = '-1';
      
      // Get ID from loading element if available
      const loadingId = loadingElement.id ? loadingElement.id.replace('-loading', '') : 'unknown';
      console.log(`🔄 Forcing hide of loading indicator for: ${loadingId}`);
      clearedCount++;
      
      // Get the parent chart container
      const chartContainer = loadingElement.closest('.apex-chart-container');
      if (chartContainer) {
        // Make sure chart container is visible
        const chartElements = chartContainer.querySelectorAll('.chart-container');
        chartElements.forEach(function(chartElement) {
          if (chartElement) {
            chartElement.style.display = 'block';
          }
        });
        
        // Show data table if loading is stuck
        const dataTableBtn = chartContainer.querySelector('.chart-data-table-btn');
        const dataTable = chartContainer.querySelector('.chart-data-table');
        
        if (dataTableBtn && dataTable) {
          dataTable.classList.add('visible');
          dataTableBtn.textContent = 'Hide Data Table';
          dataTableBtn.setAttribute('aria-expanded', 'true');
          dataTable.setAttribute('aria-hidden', 'false');
        }
      }
    });
    
    // Also remove loading spinners by adding a class to the body
    document.body.classList.add('charts-loaded');
    
    // Log the result
    if (clearedCount > 0) {
      console.log(`🧹 Forcibly removed ${clearedCount} loading indicators`);
    } else {
      console.log('✅ No loading indicators found at this time');
    }
  }
  
  /**
   * Update data table for a specific chart
   */
  function updateChartDataTable(chartId) {
    const chartContainer = document.getElementById(chartId);
    if (!chartContainer) return;
    
    const dataTable = chartContainer.querySelector('.chart-data-table');
    if (!dataTable) return;
    
    // Get chart instance
    const chartInstance = window[`${chartId}-instance`];
    if (!chartInstance) return;
    
    // Get chart data
    const series = chartInstance.w.globals.series;
    const categories = chartInstance.w.globals.categories;
    
    // Force loading element to be hidden
    const loadingElement = document.getElementById(`${chartId}-loading`);
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
    // Show data table
    if (!dataTable.classList.contains('visible')) {
      dataTable.classList.add('visible');
      
      const dataTableBtn = chartContainer.querySelector('.chart-data-table-btn');
      if (dataTableBtn) {
        dataTableBtn.textContent = 'Hide Data Table';
        dataTableBtn.setAttribute('aria-expanded', 'true');
      }
      
      dataTable.setAttribute('aria-hidden', 'false');
    }
  }
});

/**
 * QDaria Chart Global Utils
 * Additional utilities for the business plan charts
 */

// Chart loading timeout handling
window.QDARIA_CHART_TIMEOUT = 10000; // 10 seconds timeout

// Track loading status for each chart
window.QDARIA_CHART_LOADING = {};

// Chart type to worker type mapping
window.CHART_TYPE_TO_WORKER_MAP = {
  'line': 'marketGrowth',
  'area': 'marketGrowth',
  'rangeArea': 'forecastScenariosRange',
  'radar': 'competitorRadar',
  'bar': 'investmentDistribution',
  'column': 'quantumHardwareComparison',
  'donut': 'fundingAllocation',
  'pie': 'fundingAllocation',
  'scatter': 'roiComparison',
  'bubble': 'marketPositioning',
  'treemap': 'revenueDiversification',
  'candlestick': 'stockPerformance',
  'heatmap': 'riskAssessment',
  'polar': 'competitorStrength',
  'timeline': 'executionRoadmap',
  'mixed': 'financialMetricsMixed'
};

/**
 * Global chart initialization function
 * This can be called for any chart in the business plan
 */
window.initializeQdariaChart = function(chartId, workerType, initialData) {
  // Map chart type to worker type if needed
  const actualWorkerType = window.CHART_TYPE_TO_WORKER_MAP[workerType] || workerType;
  
  console.log(`Initializing QDaria chart: ${chartId} using worker: ${workerType} (mapped to: ${actualWorkerType})`);
  
  // Start tracking loading
  window.QDARIA_CHART_LOADING[chartId] = {
    startTime: Date.now(),
    loaded: false
  };
  
  // Set timeout to check loading status
  setTimeout(function() {
    checkChartLoadingTimeout(chartId);
  }, window.QDARIA_CHART_TIMEOUT);
  
  // Create worker for data processing
  if (window.chartWorkerFactory) {
    try {
      const worker = window.chartWorkerFactory.createChartWorker(actualWorkerType);
      
      // Send initial data to worker
      worker.sendMessage({
        action: 'prepareData',
        chartId: chartId,
        ...initialData
      }).then(function(response) {
        if (response.action === 'dataReady') {
          // Mark as loaded
          window.QDARIA_CHART_LOADING[chartId].loaded = true;
          
          // Hide loading indicator
          const loadingElement = document.getElementById(`${chartId}-loading`);
          if (loadingElement) {
            loadingElement.style.display = 'none';
          }
          
          // Render chart with data
          renderQdariaChart(chartId, response.chartData, workerType);
          
          // Dispatch event for chart rendered
          document.dispatchEvent(new CustomEvent('chartRendered', {
            detail: { chartId: chartId }
          }));
        } else {
          console.error(`Unexpected response from worker: ${response.action}`);
          
          // Hide loading and show data table
          forceCompleteLoading(chartId);
        }
      }).catch(function(error) {
        console.error(`Error from chart worker (${chartId}):`, error);
        
        // Hide loading and show data table
        forceCompleteLoading(chartId);
      });
    } catch (error) {
      console.error(`Error creating chart worker (${chartId}):`, error);
      
      // Hide loading and show data table
      forceCompleteLoading(chartId);
    }
  } else {
    console.warn(`Chart worker factory not available for ${chartId}, using fallback data`);
    
    // Hide loading indicator
    const loadingElement = document.getElementById(`${chartId}-loading`);
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
    // Render chart with initial data
    renderQdariaChart(chartId, initialData, workerType);
    
    // Dispatch event for chart rendered
    document.dispatchEvent(new CustomEvent('chartRendered', {
      detail: { chartId: chartId }
    }));
  }
};

/**
 * Check if chart loading has timed out
 */
function checkChartLoadingTimeout(chartId) {
  const chartLoading = window.QDARIA_CHART_LOADING[chartId];
  
  if (chartLoading && !chartLoading.loaded) {
    const elapsedTime = Date.now() - chartLoading.startTime;
    
    if (elapsedTime >= window.QDARIA_CHART_TIMEOUT) {
      console.warn(`Chart loading timeout for ${chartId} after ${elapsedTime}ms`);
      
      // Force loading to complete
      forceCompleteLoading(chartId);
    }
  }
}

/**
 * Force loading to complete for a chart
 */
function forceCompleteLoading(chartId) {
  // Mark as loaded to prevent further timeout checks
  if (window.QDARIA_CHART_LOADING[chartId]) {
    window.QDARIA_CHART_LOADING[chartId].loaded = true;
  }
  
  // Hide loading indicator
  const loadingElement = document.getElementById(`${chartId}-loading`);
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
  
  // Get chart container
  const chartContainer = document.getElementById(chartId);
  if (!chartContainer) return;
  
  // Show data table
  const dataTableBtn = chartContainer.querySelector('.chart-data-table-btn');
  const dataTable = chartContainer.querySelector('.chart-data-table');
  
  if (dataTableBtn && dataTable && !dataTable.classList.contains('visible')) {
    dataTable.classList.add('visible');
    dataTableBtn.textContent = 'Hide Data Table';
    dataTableBtn.setAttribute('aria-expanded', 'true');
    dataTable.setAttribute('aria-hidden', 'false');
  }
  
  // Show error state
  const errorContainer = document.getElementById(`${chartId}-error`);
  if (errorContainer) {
    errorContainer.style.display = 'block';
  }
}

/**
 * Render QDaria chart with data
 */
function renderQdariaChart(chartId, chartData, chartType) {
  const chartContainer = document.getElementById(`${chartId}-chart`);
  if (!chartContainer) {
    console.error(`Chart container #${chartId}-chart not found`);
    return;
  }
  
  // Hide loading indicator explicitly
  const loadingElement = document.getElementById(`${chartId}-loading`);
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
  
  // Make sure chart container is visible
  chartContainer.style.display = 'block';
  
  // Get chart options from utilities or create default options
  let options = window.chartUtils ? 
    window.chartUtils.getDefaultChartOptions(chartType) : {};
  
  // Update options with chart-specific settings
  options = {
    ...options,
    chart: {
      ...options.chart,
      type: chartType === 'rangeArea' ? 'area' : chartType,
      height: 400,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      }
    },
    series: chartData.series,
    xaxis: {
      ...options.xaxis,
      categories: chartData.categories,
    }
  };
  
  // Add additional options based on chart type
  if (chartType === 'rangeArea' && chartData.annotations) {
    options.annotations = chartData.annotations;
  }
  
  // Create chart instance
  try {
    const chart = new ApexCharts(chartContainer, options);
    
    // Render the chart
    chart.render().then(() => {
      console.log(`Chart rendered successfully: ${chartId}`);
      
      // Double-check that loading indicator is hidden after render
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
      
      // Dispatch event for chart rendered
      document.dispatchEvent(new CustomEvent('chartRendered', {
        detail: { chartId: chartId }
      }));
      
    }).catch(err => {
      console.error(`Error rendering chart: ${chartId}`, err);
      
      // Show error state if chart fails to render
      const errorContainer = document.getElementById(`${chartId}-error`);
      if (errorContainer) {
        errorContainer.style.display = 'block';
      }
      
      // Force data table to be visible
      const dataTableBtn = document.querySelector(`#${chartId} .chart-data-table-btn`);
      const dataTable = document.getElementById(`${chartId}-data-table`);
      
      if (dataTableBtn && dataTable && !dataTable.classList.contains('visible')) {
        dataTable.classList.add('visible');
        dataTableBtn.textContent = 'Hide Data Table';
        dataTableBtn.setAttribute('aria-expanded', 'true');
        dataTable.setAttribute('aria-hidden', 'false');
      }
    });
    
    // Store chart instance for later reference
    window[`${chartId}-instance`] = chart;
    
  } catch (error) {
    console.error(`Failed to create chart: ${chartId}`, error);
    
    // Force data table to be visible
    const dataTableBtn = document.querySelector(`#${chartId} .chart-data-table-btn`);
    const dataTable = document.getElementById(`${chartId}-data-table`);
    
    if (dataTableBtn && dataTable && !dataTable.classList.contains('visible')) {
      dataTable.classList.add('visible');
      dataTableBtn.textContent = 'Hide Data Table';
      dataTableBtn.setAttribute('aria-expanded', 'true');
      dataTable.setAttribute('aria-hidden', 'false');
    }
  }
}
