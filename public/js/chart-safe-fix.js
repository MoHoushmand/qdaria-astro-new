/**
 * CHART SAFE FIX
 * 
 * This script provides targeted fixes for chart rendering issues without
 * breaking navigation or other site functionality.
 */

(function() {
  console.log('📊 CHART SAFE FIX: Initializing');
  
  // Run immediately
  initSafeFix();
  
  // Also run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', initSafeFix);
  
  // And on window load
  window.addEventListener('load', initSafeFix);
  
  // Run again after a delay
  setTimeout(initSafeFix, 1000);
  setTimeout(initSafeFix, 2000);
  
  function initSafeFix() {
    console.log('📊 CHART SAFE FIX: Running fixes');
    
    // Fix chart placeholders
    document.querySelectorAll('.chart-placeholder').forEach(container => {
      fixChartContainer(container);
    });
    
    // Ensure data tables are visible
    ensureDataTablesVisible();
    
    // Apply investor-optimized styling
    applyInvestorStyling();
    
    console.log('📊 CHART SAFE FIX: Fixes applied');
  }
  
  function fixChartContainer(container) {
    if (!container) return;
    
    const id = container.id;
    console.log(`📊 CHART SAFE FIX: Fixing ${id}`);
    
    // Force container to be visible
    container.style.display = 'block';
    container.style.visibility = 'visible';
    container.style.opacity = '1';
    
    // Force chart element to be visible
    const chartElem = document.getElementById(`${id}-chart`);
    if (chartElem) {
      chartElem.style.display = 'block';
      chartElem.style.visibility = 'visible';
      chartElem.style.opacity = '1';
      chartElem.style.height = 'auto';
      chartElem.style.minHeight = '350px';
    }
    
    // Remove loading elements
    const loadingElem = document.getElementById(`${id}-loading`);
    if (loadingElem) {
      loadingElem.style.display = 'none';
    }
    
    // Check if ApexCharts canvas exists
    const canvas = chartElem?.querySelector('.apexcharts-canvas');
    if (!canvas) {
      // Create fallback if no canvas exists after 3 seconds
      setTimeout(() => {
        const updatedCanvas = chartElem?.querySelector('.apexcharts-canvas');
        if (!updatedCanvas) {
          createFallbackChart(id);
        }
      }, 3000);
    }
  }
  
  function createFallbackChart(chartId) {
    const chartElem = document.getElementById(`${chartId}-chart`);
    if (!chartElem) return;
    
    console.log(`📊 CHART SAFE FIX: Creating fallback for ${chartId}`);
    
    // Get chart title and description
    const container = document.getElementById(chartId);
    const title = container?.querySelector('.chart-title')?.textContent || 'Chart';
    const description = container?.querySelector('.chart-description')?.textContent || '';
    
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
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="white">Chart data available in table below</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    `;
    
    // Only replace if the element doesn't already have content
    if (chartElem.children.length === 0 || !chartElem.querySelector('.apexcharts-canvas')) {
      chartElem.appendChild(fallbackCanvas);
    }
    
    // Ensure the chart element is visible
    chartElem.style.display = 'block';
    chartElem.style.visibility = 'visible';
    chartElem.style.opacity = '1';
    chartElem.style.height = 'auto';
    chartElem.style.minHeight = '350px';
    
    console.log(`📊 CHART SAFE FIX: Fallback created for ${chartId}`);
  }
  
  function ensureDataTablesVisible() {
    console.log('📊 CHART SAFE FIX: Ensuring data tables are visible');
    
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
  
  function applyInvestorStyling() {
    console.log('📊 CHART SAFE FIX: Applying investor styling');
    
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
  window.chartSafeFix = {
    init: initSafeFix,
    fixContainer: fixChartContainer,
    createFallback: createFallbackChart,
    ensureDataTables: ensureDataTablesVisible,
    applyInvestorStyling: applyInvestorStyling
  };
})();
