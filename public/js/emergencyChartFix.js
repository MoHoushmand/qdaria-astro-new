/**
 * EMERGENCY FIX: QDaria Business Plan Charts
 * This script addresses all chart loading issues across the business plan
 */

// Run immediately
(function() {
  console.log('🚨 EMERGENCY CHART FIX - Running immediate repairs...');
  
  // List of all chart IDs used in the business plan
  const BUSINESS_PLAN_CHART_IDS = [
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
  
  // Run initial fix immediately
  runEmergencyChartFix();
  
  // Also run when DOM is loaded
  document.addEventListener('DOMContentLoaded', runEmergencyChartFix);
  
  // Run at intervals to catch any new elements
  setInterval(runEmergencyChartFix, 1000);
  
  /**
   * Comprehensive emergency chart fix
   */
  function runEmergencyChartFix() {
    // Force hide all loading indicators
    forceHideAllLoadings();
    
    // Force show all data tables
    forceShowAllDataTables();
    
    // Force show any SVG fallbacks if charts failed to load
    showSvgFallbacks();
    
    // Try to re-initialize any charts that failed to load
    retryFailedCharts();
    
    // Add inline SVG fallbacks for important charts that failed to initialize
    addSvgFallbacks();
  }
  
  /**
   * Force hide ALL loading indicators
   */
  function forceHideAllLoadings() {
    // Get all loading elements - using various selectors to catch everything
    const selectors = [
      '.chart-loading', 
      '[id$="-loading"]',
      '.apex-chart-container .loading-spinner',
      '.chart-placeholder .loading-spinner'
    ];
    
    const loadingElements = document.querySelectorAll(selectors.join(','));
    
    loadingElements.forEach(element => {
      // Force hide with multiple methods
      element.style.display = 'none !important';
      element.style.opacity = '0 !important';
      element.style.visibility = 'hidden !important';
      element.style.zIndex = '-999 !important';
      element.style.position = 'absolute !important';
      element.style.pointerEvents = 'none !important';
      element.setAttribute('aria-hidden', 'true');
      element.classList.add('force-hidden');
      
      // Empty the element to be sure
      element.innerHTML = '';
      
      console.log(`✅ Force-hidden loading indicator: ${element.id || 'unnamed'}`);
    });
    
    // Also add a global style to hide all loading elements
    if (!document.getElementById('emergency-chart-style')) {
      const style = document.createElement('style');
      style.id = 'emergency-chart-style';
      style.textContent = `
        .chart-loading, 
        [id$="-loading"],
        .apex-chart-container .loading-spinner,
        .chart-placeholder .loading-spinner {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          z-index: -999 !important;
          position: absolute !important;
          pointer-events: none !important;
        }
        
        .chart-data-table {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        .chart-placeholder {
          min-height: 200px;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  /**
   * Force show all data tables
   */
  function forceShowAllDataTables() {
    // Find all data tables
    const dataTables = document.querySelectorAll('.chart-data-table');
    
    dataTables.forEach(table => {
      // Add visible class
      table.classList.add('visible');
      
      // Force visibility with inline styles
      table.style.display = 'block';
      table.style.visibility = 'visible';
      table.style.opacity = '1';
      
      // Update accessibility attributes
      table.setAttribute('aria-hidden', 'false');
      
      // Update button if it exists
      const chartContainer = table.closest('.apex-chart-container');
      if (chartContainer) {
        const button = chartContainer.querySelector('.chart-data-table-btn');
        if (button) {
          button.textContent = 'Hide Data Table';
          button.setAttribute('aria-expanded', 'true');
        }
      }
      
      console.log(`📊 Force-shown data table: ${table.id || 'unnamed'}`);
    });
  }
  
  /**
   * Show any SVG fallbacks if they exist
   */
  function showSvgFallbacks() {
    // Find all chart fallbacks
    const fallbacks = document.querySelectorAll('.chart-fallback');
    
    fallbacks.forEach(fallback => {
      // Get parent chart container
      const chartContainer = fallback.closest('.apex-chart-container');
      if (!chartContainer) return;
      
      // Get chart element
      const chartElement = chartContainer.querySelector('.chart-container');
      
      // If chart is empty or has error, show fallback
      if (!chartElement || 
          chartElement.innerHTML.trim() === '' || 
          chartElement.querySelector('.apexcharts-svg') === null) {
        
        // Show fallback
        fallback.style.display = 'block';
        console.log(`📈 Showing SVG fallback for: ${chartContainer.id || 'unnamed'}`);
      }
    });
  }
  
  /**
   * Try to re-initialize any charts that failed to load
   */
  function retryFailedCharts() {
    // Process all known business plan charts
    BUSINESS_PLAN_CHART_IDS.forEach(chartId => {
      const chartContainer = document.getElementById(chartId);
      if (!chartContainer) return;
      
      // Check if chart is initialized
      const chartElement = chartContainer.querySelector('.chart-container');
      if (!chartElement || 
          chartElement.innerHTML.trim() === '' || 
          chartElement.querySelector('.apexcharts-svg') === null) {
        
        // Chart didn't initialize properly, try to force data table
        const dataTable = chartContainer.querySelector('.chart-data-table');
        if (dataTable) {
          dataTable.classList.add('visible');
          dataTable.style.display = 'block';
          dataTable.style.visibility = 'visible';
          dataTable.style.opacity = '1';
          
          console.log(`🔄 Re-initialized data table for failed chart: ${chartId}`);
        }
      }
    });
  }
  
  /**
   * Add minimal SVG fallbacks for important charts that failed completely
   */
  function addSvgFallbacks() {
    // Process all known business plan charts
    BUSINESS_PLAN_CHART_IDS.forEach(chartId => {
      const chartContainer = document.getElementById(chartId);
      if (!chartContainer) return;
      
      // If chart already has fallback, skip
      if (chartContainer.querySelector('.chart-fallback[data-emergency="true"]')) return;
      
      // Check if chart is initialized
      const chartElement = chartContainer.querySelector('.chart-container');
      if (!chartElement || 
          chartElement.innerHTML.trim() === '' || 
          chartElement.querySelector('.apexcharts-svg') === null) {
        
        // Create minimal SVG fallback
        const fallback = document.createElement('div');
        fallback.className = 'chart-fallback';
        fallback.setAttribute('data-emergency', 'true');
        fallback.style.display = 'block';
        fallback.style.padding = '20px';
        fallback.style.textAlign = 'center';
        
        fallback.innerHTML = `
          <p style="color: #e2e8f0; margin-bottom: 10px;">
            <strong>Chart visualization unavailable.</strong> 
            Please refer to the data table below for this information.
          </p>
          <svg width="100%" height="150" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="150" fill="#1e293b" rx="4" />
            <text x="200" y="50" fill="#94a3b8" text-anchor="middle" font-size="14">
              Chart visualization unavailable
            </text>
            <text x="200" y="80" fill="#64748b" text-anchor="middle" font-size="12">
              Data is available in the table below
            </text>
            <line x1="50" y1="120" x2="350" y2="120" stroke="#475569" stroke-width="2" />
            <line x1="50" y1="120" x2="50" y2="40" stroke="#475569" stroke-width="2" />
          </svg>
        `;
        
        // Insert after the chart container
        if (chartElement.parentNode) {
          chartElement.parentNode.insertBefore(fallback, chartElement.nextSibling);
          console.log(`🖼️ Added emergency SVG fallback for: ${chartId}`);
        }
      }
    });
  }
})();
