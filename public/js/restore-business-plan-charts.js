/**
 * EMERGENCY CHART RESTORATION SCRIPT
 * This script detects missing charts in the business plan and restores them
 */

(function() {
  console.log('🔄 BUSINESS PLAN CHART RESTORATION SCRIPT ACTIVATED');
  
  // Chart definitions to restore
  const chartsToRestore = [
    {
      id: 'marketGrowthChart',
      type: 'area',
      title: 'Quantum Computing Market Growth',
      description: 'Projected increase in quantum computing market value (2025-2035)',
      position: 'after',
      querySelector: 'p:contains("To illustrate the growth trend")',
      workerScript: '/charts/marketGrowthWorker.js'
    },
    {
      id: 'forecastScenariosRangeChart',
      type: 'rangeArea',
      title: 'Quantum Computing Market Scenarios',
      description: 'Conservative, expected, and optimistic growth scenarios (2025-2035)',
      position: 'after',
      querySelector: 'p:contains("While this represents our expected scenario")',
      workerScript: '/charts/forecastScenariosRangeWorker.js'
    },
    {
      id: 'quantumHardwareComparisonChart',
      type: 'column',
      title: 'Quantum Hardware Comparison',
      description: 'Performance metrics of major quantum computing platforms',
      position: 'after',
      querySelector: 'p:contains("The chart below compares key performance metrics")',
      workerScript: '/charts/quantumHardwareComparisonWorker.js'
    },
    {
      id: 'competitorFundingChart',
      type: 'bar',
      title: 'Competitor Funding Comparison',
      description: 'Total investment raised by key players in quantum computing',
      position: 'after',
      querySelector: 'p:contains("The chart below compares the funding scale")',
      workerScript: '/charts/competitorStrengthWorker.js'
    },
    {
      id: 'organizationalChart',
      type: 'treemap',
      title: 'QDaria Holdings Structure',
      description: 'Planned organizational structure with subsidiaries',
      position: 'after',
      querySelector: 'p:contains("To achieve our ambitious vision")',
      workerScript: '/charts/organizationalChartWorker.js'
    },
    {
      id: 'financialMetricsMixedChart',
      type: 'line',
      title: 'QDaria Financial Projections',
      description: 'Revenue, expenses and profitability forecast (2025-2030)',
      position: 'after',
      querySelector: 'p:contains("Our financial projections for QDaria")',
      workerScript: '/charts/financialMetricsMixedWorker.js'
    }
  ];
  
  // Create a chart container
  function createChartContainer(chart) {
    const container = document.createElement('div');
    container.id = chart.id;
    container.className = 'apex-chart-container chart-placeholder';
    container.innerHTML = `
      <h3 class="chart-title selectable">${chart.title}</h3>
      <p class="chart-description selectable">${chart.description}</p>
      
      <div class="chart-content">
        <div id="${chart.id}-chart" class="chart-container" tabindex="0" 
             role="img" aria-label="${chart.title}"></div>
      </div>
      
      <div id="${chart.id}-data-table" class="chart-data-table visible">
        <div class="data-table-header">
          <span class="data-table-title">Data Table: ${chart.title}</span>
          <button type="button" class="data-table-close-btn" aria-label="Close data table">×</button>
        </div>
        <div class="data-table-content">
          <p>Data table will be populated by chart script</p>
        </div>
      </div>
    `;
    return container;
  }
  
  // Function to inject the chart worker script
  function injectChartScript(chart) {
    const script = document.createElement('script');
    script.src = chart.workerScript;
    script.async = true;
    document.head.appendChild(script);
    console.log(`📊 Injected worker script for ${chart.id}: ${chart.workerScript}`);
  }
  
  // Check if we're on the business plan page
  function isBusinessPlanPage() {
    return window.location.pathname.includes('/business-plan') || 
           document.title.includes('Business Plan') ||
           document.querySelector('h1:contains("QDaria Business Plan")');
  }
  
  // Find all chart placeholders in the document and restore them
  function restoreCharts() {
    if (!isBusinessPlanPage()) {
      console.log('Not on business plan page, skipping chart restoration');
      return;
    }
    
    console.log('📈 RESTORING MISSING BUSINESS PLAN CHARTS');
    
    // Process each chart definition
    chartsToRestore.forEach(chart => {
      // Check if chart already exists
      if (document.getElementById(chart.id)) {
        console.log(`Chart ${chart.id} already exists, skipping`);
        return;
      }
      
      // Find the target element to place the chart
      const targetElement = document.querySelector(chart.querySelector);
      if (!targetElement) {
        console.log(`❌ Could not find target element for ${chart.id} using selector: ${chart.querySelector}`);
        return;
      }
      
      // Create chart container
      const chartContainer = createChartContainer(chart);
      
      // Insert chart after target element
      if (chart.position === 'after') {
        if (targetElement.nextSibling) {
          targetElement.parentNode.insertBefore(chartContainer, targetElement.nextSibling);
        } else {
          targetElement.parentNode.appendChild(chartContainer);
        }
      } else {
        // Insert before target element
        targetElement.parentNode.insertBefore(chartContainer, targetElement);
      }
      
      console.log(`✅ Restored chart: ${chart.id}`);
      
      // Inject chart worker script
      injectChartScript(chart);
    });
    
    // Notify any global chart systems that we've added charts
    if (window.initializeQdariaCharts && typeof window.initializeQdariaCharts === 'function') {
      setTimeout(() => {
        console.log('🔄 Triggering chart initialization');
        window.initializeQdariaCharts();
      }, 500);
    }
  }
  
  // Run immediately and after a delay
  restoreCharts();
  
  // Run again after DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Running chart restoration');
    restoreCharts();
  });
  
  // Run again after window load to catch late content
  window.addEventListener('load', function() {
    console.log('Window loaded - Running final chart restoration');
    restoreCharts();
    
    // Also run again after a delay to ensure dynamic content is caught
    setTimeout(restoreCharts, 1000);
    setTimeout(restoreCharts, 3000);
  });
  
  console.log('🔄 Chart restoration script ready');
})();
