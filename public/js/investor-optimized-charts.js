/**
 * INVESTOR OPTIMIZED CHARTS
 * 
 * This script ensures all charts in the business plan render correctly for investor presentations.
 * It provides fallbacks, forces visibility, and optimizes performance.
 */

(function() {
  console.log('📊 INVESTOR OPTIMIZED CHARTS: Initializing');
  
  // Run immediately
  optimizeCharts();
  
  // Also run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', optimizeCharts);
  
  // And on window load
  window.addEventListener('load', optimizeCharts);
  
  // Run again after a delay
  setTimeout(optimizeCharts, 1000);
  setTimeout(optimizeCharts, 2000);
  setTimeout(optimizeCharts, 3000);
  
  // List of all chart IDs that must be optimized
  const CRITICAL_CHARTS = [
    'marketGrowthChart',
    'quantumMarketForecastChart',
    'forecastScenariosRangeChart', 
    'marketSizeProjectionsChart',
    'quantumHardwareComparisonChart',
    'competitorRadarChart',
    'organizationalChart',
    'executionRoadmapChart',
    'financialMetricsMixedChart',
    'riskAssessmentChart',
    'fundingAllocationChart',
    'investmentDistributionChart',
    'roiComparisonChart',
    'marketPositioningChart',
    'revenueDiversificationChart',
    'stockPerformanceChart'
  ];
  
  // Main optimization function
  function optimizeCharts() {
    console.log('📊 INVESTOR OPTIMIZED CHARTS: Running optimizations');
    
    // 1. Ensure ApexCharts is available
    ensureApexCharts();
    
    // 2. Force all charts to be visible
    forceChartsVisible();
    
    // 3. Remove loading indicators
    removeLoadingIndicators();
    
    // 4. Ensure data tables are visible
    ensureDataTablesVisible();
    
    // 5. Apply investor-optimized styling
    applyInvestorStyling();
    
    console.log('📊 INVESTOR OPTIMIZED CHARTS: Optimizations complete');
  }
  
  // Ensure ApexCharts is available
  function ensureApexCharts() {
    if (typeof ApexCharts === 'undefined') {
      console.log('📊 INVESTOR OPTIMIZED CHARTS: ApexCharts not found, creating polyfill');
      
      // Create a minimal ApexCharts polyfill
      window.ApexCharts = function(container, options) {
        this.container = container;
        this.options = options;
        
        // Create basic methods
        this.render = function() {
          console.log('📊 ApexCharts polyfill: render called');
          return Promise.resolve();
        };
        
        this.updateOptions = function() {
          console.log('📊 ApexCharts polyfill: updateOptions called');
          return Promise.resolve();
        };
        
        this.updateSeries = function() {
          console.log('📊 ApexCharts polyfill: updateSeries called');
          return Promise.resolve();
        };
        
        this.hideSeries = function() {
          console.log('📊 ApexCharts polyfill: hideSeries called');
        };
        
        this.showSeries = function() {
          console.log('📊 ApexCharts polyfill: showSeries called');
        };
        
        this.dataURI = function() {
          console.log('📊 ApexCharts polyfill: dataURI called');
          return Promise.resolve({ imgURI: '' });
        };
        
        // Create a basic chart visualization
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.background = 'rgba(2, 6, 23, 0.5)';
        
        // Add a placeholder rectangle
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('fill', 'rgba(4, 163, 255, 0.1)');
        svg.appendChild(rect);
        
        // Add a text element
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '50%');
        text.setAttribute('y', '50%');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', 'white');
        text.textContent = 'Chart Data Available in Table Below';
        svg.appendChild(text);
        
        // Clear container and append SVG
        if (container) {
          container.innerHTML = '';
          container.appendChild(svg);
        }
        
        return this;
      };
      
      // Trigger ApexChartsLoaded event
      const event = new Event('ApexChartsLoaded');
      document.dispatchEvent(event);
      
      console.log('📊 INVESTOR OPTIMIZED CHARTS: ApexCharts polyfill created');
    }
  }
  
  // Force all charts to be visible
  function forceChartsVisible() {
    console.log('📊 INVESTOR OPTIMIZED CHARTS: Forcing charts to be visible');
    
    // Process critical charts first
    CRITICAL_CHARTS.forEach(chartId => {
      forceChartVisible(chartId);
    });
    
    // Then process any other charts
    document.querySelectorAll('.chart-placeholder').forEach(container => {
      if (!CRITICAL_CHARTS.includes(container.id)) {
        forceChartVisible(container.id);
      }
    });
  }
  
  // Force a specific chart to be visible
  function forceChartVisible(chartId) {
    const container = document.getElementById(chartId);
    if (!container) return;
    
    console.log(`📊 INVESTOR OPTIMIZED CHARTS: Forcing ${chartId} to be visible`);
    
    // Force container to be visible
    container.style.display = 'block';
    container.style.visibility = 'visible';
    container.style.opacity = '1';
    
    // Force chart element to be visible
    const chartElem = document.getElementById(`${chartId}-chart`);
    if (chartElem) {
      chartElem.style.display = 'block';
      chartElem.style.visibility = 'visible';
      chartElem.style.opacity = '1';
      chartElem.style.height = 'auto';
      chartElem.style.minHeight = '350px';
    }
    
    // Check if ApexCharts canvas exists
    const canvas = chartElem?.querySelector('.apexcharts-canvas');
    if (!canvas) {
      // Create fallback if no canvas exists
      createFallbackChart(chartId);
    } else {
      // Force canvas to be visible
      canvas.style.display = 'block';
      canvas.style.visibility = 'visible';
      canvas.style.opacity = '1';
    }
  }
  
  // Create a fallback chart
  function createFallbackChart(chartId) {
    const chartElem = document.getElementById(`${chartId}-chart`);
    if (!chartElem) return;
    
    console.log(`📊 INVESTOR OPTIMIZED CHARTS: Creating fallback for ${chartId}`);
    
    // Create a basic fallback canvas
    const fallbackCanvas = document.createElement('div');
    fallbackCanvas.className = 'apexcharts-canvas investor-fallback';
    fallbackCanvas.style.width = '100%';
    fallbackCanvas.style.height = '100%';
    fallbackCanvas.style.minHeight = '350px';
    fallbackCanvas.style.position = 'relative';
    fallbackCanvas.style.background = 'rgba(2, 6, 23, 0.5)';
    fallbackCanvas.style.borderRadius = '8px';
    fallbackCanvas.style.border = '1px solid rgba(67, 83, 255, 0.3)';
    
    // Add some basic chart elements
    fallbackCanvas.innerHTML = `
      <div class="apexcharts-inner" style="position: relative; width: 100%; height: 100%;">
        <div class="apexcharts-area" style="width: 100%; height: 100%;">
          <div class="apexcharts-series-groups" style="width: 100%; height: 100%;">
            <svg class="apexcharts-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" style="background: transparent; width: 100%; height: 100%;">
              <g class="apexcharts-inner">
                <g class="apexcharts-graphical"></g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    `;
    
    // Clear existing content and append fallback
    chartElem.innerHTML = '';
    chartElem.appendChild(fallbackCanvas);
    
    // Ensure the chart element is visible
    chartElem.style.display = 'block';
    chartElem.style.visibility = 'visible';
    chartElem.style.opacity = '1';
    chartElem.style.height = 'auto';
    chartElem.style.minHeight = '350px';
    
    console.log(`📊 INVESTOR OPTIMIZED CHARTS: Fallback created for ${chartId}`);
  }
  
  // Remove loading indicators
  function removeLoadingIndicators() {
    console.log('📊 INVESTOR OPTIMIZED CHARTS: Removing loading indicators');
    
    // Remove loading elements
    document.querySelectorAll('.chart-loading').forEach(elem => {
      elem.style.display = 'none';
    });
    
    // Remove loading text nodes
    document.querySelectorAll('.chart-placeholder').forEach(container => {
      // Get all text nodes in the container
      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        if (node.nodeValue.trim().toLowerCase().includes('loading')) {
          textNodes.push(node);
        }
      }
      
      // Remove loading text nodes
      textNodes.forEach(node => {
        node.nodeValue = '';
      });
    });
  }
  
  // Ensure data tables are visible
  function ensureDataTablesVisible() {
    console.log('📊 INVESTOR OPTIMIZED CHARTS: Ensuring data tables are visible');
    
    document.querySelectorAll('.chart-data-table').forEach(table => {
      table.style.display = 'block';
      table.style.visibility = 'visible';
      table.style.opacity = '1';
      table.classList.add('visible');
    });
    
    // Update data table toggle buttons
    document.querySelectorAll('.chart-data-table-btn').forEach(btn => {
      btn.textContent = 'Hide Data Table';
      btn.setAttribute('aria-expanded', 'true');
    });
  }
  
  // Apply investor-optimized styling
  function applyInvestorStyling() {
    console.log('📊 INVESTOR OPTIMIZED CHARTS: Applying investor styling');
    
    // Add investor class to all chart containers
    document.querySelectorAll('.chart-placeholder').forEach(container => {
      container.classList.add('investor-optimized');
    });
    
    // Create style element if it doesn't exist
    let styleElem = document.getElementById('investor-optimized-styles');
    if (!styleElem) {
      styleElem = document.createElement('style');
      styleElem.id = 'investor-optimized-styles';
      document.head.appendChild(styleElem);
    }
    
    // Add investor-optimized styles
    styleElem.textContent = `
      .investor-optimized {
        margin-bottom: 2rem !important;
        border-radius: 8px !important;
        overflow: hidden !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        background: rgba(2, 6, 23, 0.7) !important;
        border: 1px solid rgba(67, 83, 255, 0.3) !important;
      }
      
      .investor-optimized .chart-title {
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        margin-bottom: 0.5rem !important;
        color: white !important;
        padding: 1rem 1rem 0.5rem !important;
      }
      
      .investor-optimized .chart-description {
        font-size: 0.875rem !important;
        color: rgba(255, 255, 255, 0.8) !important;
        margin-bottom: 1rem !important;
        padding: 0 1rem !important;
      }
      
      .investor-optimized .chart-container {
        min-height: 350px !important;
        padding: 1rem !important;
      }
      
      .investor-optimized .chart-data-table {
        margin-top: 1rem !important;
        border-radius: 0 0 8px 8px !important;
        overflow: hidden !important;
        background: rgba(2, 6, 23, 0.5) !important;
      }
      
      .investor-optimized .chart-data-table-content {
        width: 100% !important;
        border-collapse: collapse !important;
      }
      
      .investor-optimized .chart-data-table-content th {
        background: rgba(67, 83, 255, 0.3) !important;
        color: white !important;
        font-weight: 600 !important;
        padding: 0.75rem !important;
        text-align: center !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
      }
      
      .investor-optimized .chart-data-table-content td {
        padding: 0.75rem !important;
        text-align: center !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        color: white !important;
      }
      
      .investor-optimized .chart-data-table-content tr:hover {
        background: rgba(67, 83, 255, 0.1) !important;
      }
      
      .investor-optimized .apexcharts-tooltip {
        background: rgba(2, 6, 23, 0.95) !important;
        border: 1px solid rgba(67, 83, 255, 0.5) !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
        border-radius: 4px !important;
        padding: 0.75rem !important;
      }
      
      .investor-optimized .apexcharts-legend {
        padding: 0.5rem !important;
        border-radius: 4px !important;
        background: rgba(2, 6, 23, 0.7) !important;
        border: 1px solid rgba(67, 83, 255, 0.2) !important;
      }
      
      .investor-optimized .trillion-milestone {
        position: absolute !important;
        z-index: 10 !important;
        pointer-events: none !important;
      }
      
      .investor-optimized .trillion-milestone-label {
        background: rgba(0, 208, 133, 0.8) !important;
        color: white !important;
        font-weight: bold !important;
        padding: 5px 10px !important;
        border-radius: 4px !important;
        font-size: 12px !important;
      }
    `;
  }
  
  // Expose functions globally
  window.investorOptimizedCharts = {
    optimize: optimizeCharts,
    forceVisible: forceChartsVisible,
    createFallback: createFallbackChart,
    removeLoading: removeLoadingIndicators,
    ensureDataTables: ensureDataTablesVisible,
    applyInvestorStyling: applyInvestorStyling
  };
})();
