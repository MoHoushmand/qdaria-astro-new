/**
 * Essential Chart Fix - A minimal, non-disruptive approach to ensure ApexCharts render
 * This script avoids overriding browser APIs and focuses on reliable rendering
 */
(function() {
  console.log('Essential Chart Fix: Initializing');
  
  // List of all business plan charts that need fixing
  const businessPlanCharts = [
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

  // Ensure data tables are visible - this is critical
  function showDataTables() {
    businessPlanCharts.forEach(chartId => {
      const dataTable = document.getElementById(`${chartId}-data-table`);
      if (!dataTable) return;
      
      // Force the data table to be visible with inline styles for maximum reliability
      dataTable.style.display = 'block';
      dataTable.style.visibility = 'visible';
      dataTable.style.opacity = '1';
      dataTable.style.height = 'auto';
      dataTable.style.maxHeight = 'none';
      dataTable.style.overflow = 'visible';
      
      console.log(`Essential Chart Fix: Made data table visible for ${chartId}`);
    });
  }
  
  // Remove loading messages without disrupting page rendering
  function removeLoadingMessages() {
    // Safely remove loading indicators
    document.querySelectorAll('.chart-loading, [id$="-loading"]').forEach(element => {
      if (element) {
        element.style.display = 'none';
        console.log('Essential Chart Fix: Hidden loading indicator');
      }
    });
    
    // Remove fallback messages
    document.querySelectorAll('.chart-fallback-message').forEach(element => {
      if (element) {
        element.style.display = 'none';
        console.log('Essential Chart Fix: Hidden fallback message');
      }
    });
  }
  
  // Fix chart placeholder handling
  function fixChartContainers() {
    businessPlanCharts.forEach(chartId => {
      const chartContainer = document.getElementById(chartId);
      if (chartContainer) {
        // Replace placeholder class without removing other important classes
        chartContainer.classList.remove('chart-placeholder');
        chartContainer.classList.add('chart-fixed');
        console.log(`Essential Chart Fix: Fixed container for ${chartId}`);
      }
    });
  }
  
  // Add essential chart styles
  function addChartStyles() {
    // Create a style element with essential chart styles
    const style = document.createElement('style');
    style.textContent = `
      /* Essential chart styles */
      .chart-data-table {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        height: auto !important;
        max-height: none !important;
        overflow: visible !important;
      }
      
      /* Hide loading and fallback messages */
      .chart-loading,
      [id$="-loading"],
      .chart-fallback-message {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      
      /* Basic chart container styles */
      .apex-chart-container {
        margin: 1.5rem 0;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: rgba(30, 41, 59, 0.4);
      }
    `;
    
    document.head.appendChild(style);
    console.log('Essential Chart Fix: Added essential styles');
  }
  
  // Main fix function
  function applyFixes() {
    console.log('Essential Chart Fix: Applying fixes');
    
    // Add essential styles first
    addChartStyles();
    
    // Remove loading messages
    removeLoadingMessages();
    
    // Make data tables visible
    showDataTables();
    
    // Fix chart containers
    fixChartContainers();
    
    console.log('Essential Chart Fix: All fixes applied');
  }
  
  // Execute when DOM is fully loaded to avoid disrupting rendering
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyFixes);
  } else {
    applyFixes();
  }
  
  // Run again after a short delay to catch late DOM changes
  setTimeout(applyFixes, 1000);
})();
