/**
 * DEDICATED BUSINESS PLAN CHART FIX
 * This script targets the specific charts on the business plan page
 */

// Execute immediately
(function() {
  console.log('🔧 Business Plan Chart Fix - Initializing');
  
  // List of explicit chart IDs used in the business plan
  const CHART_IDS = [
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
  
  // Run on DOM content loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Business Plan Fix: DOM loaded');
    runBusinessPlanFix();
    
    // Run again after ApexCharts has a chance to initialize
    setTimeout(runBusinessPlanFix, 1000);
    setTimeout(runBusinessPlanFix, 3000);
  });
  
  // Watch for placeholder initialization
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if any added nodes are chart placeholders
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeType === 1 && (
              node.classList.contains('chart-placeholder') || 
              node.classList.contains('apex-chart-container'))) {
            console.log('🔍 Business Plan Fix: Chart placeholder added', node.id);
            setTimeout(runBusinessPlanFix, 500);
          }
        }
      }
    });
  });
  
  // Start observing after DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, { childList: true, subtree: true });
  });
  
  // Comprehensive business plan chart fix
  function runBusinessPlanFix() {
    console.log('🔧 Business Plan Fix: Running fixes...');
    
    // First process all known charts by ID
    CHART_IDS.forEach(function(chartId) {
      const placeholder = document.getElementById(chartId);
      if (placeholder) {
        fixChart(placeholder, chartId);
      }
    });
    
    // Then find any placeholders without IDs
    const placeholders = document.querySelectorAll('.chart-placeholder, .apex-chart-container');
    placeholders.forEach(function(placeholder) {
      const chartId = placeholder.id || 'unknown-chart';
      fixChart(placeholder, chartId);
    });
    
    // Add class to body to indicate fix ran
    document.body.classList.add('business-plan-charts-fixed');
  }
  
  // Fix an individual chart
  function fixChart(placeholder, chartId) {
    console.log(`🔧 Fixing chart: ${chartId}`);
    
    // 1. Hide any loading indicators
    const loadingElement = document.getElementById(`${chartId}-loading`) || 
                           placeholder.querySelector('.chart-loading') ||
                           placeholder.querySelector('[id$="-loading"]');
    
    if (loadingElement) {
      loadingElement.style.display = 'none';
      loadingElement.style.visibility = 'hidden';
      loadingElement.style.opacity = '0';
      console.log(`✅ Removed loading indicator for ${chartId}`);
    }
    
    // 2. Show data table
    const dataTable = document.getElementById(`${chartId}-data-table`) ||
                      placeholder.querySelector('.chart-data-table');
    
    if (dataTable) {
      dataTable.classList.add('visible');
      dataTable.style.display = 'block';
      dataTable.style.visibility = 'visible';
      dataTable.style.opacity = '1';
      console.log(`📊 Showed data table for ${chartId}`);
    }
    
    // 3. Add fallback if chart is empty
    const chartElement = document.getElementById(`${chartId}-chart`) ||
                         placeholder.querySelector('.chart-container');
    
    if (chartElement && (chartElement.innerHTML.trim() === '' || !chartElement.querySelector('.apexcharts-svg'))) {
      // Ensure there's not already a fallback
      if (!placeholder.querySelector('.chart-fallback[data-emergency="true"]')) {
        const fallback = document.createElement('div');
        fallback.className = 'chart-fallback';
        fallback.setAttribute('data-emergency', 'true');
        fallback.style.display = 'block';
        fallback.style.padding = '20px';
        fallback.style.textAlign = 'center';
        
        fallback.innerHTML = `
          <p style="color: #e2e8f0; margin-bottom: 10px;">
            Chart data available in the table below.
          </p>
        `;
        
        // Insert after the chart container
        if (chartElement.parentNode) {
          chartElement.parentNode.insertBefore(fallback, chartElement.nextSibling);
          console.log(`🖼️ Added emergency fallback for: ${chartId}`);
        }
      }
    }
    
    // 4. If chart is rendered but stuck, force it to appear
    if (chartElement && chartElement.querySelector('.apexcharts-svg')) {
      chartElement.style.visibility = 'visible';
      chartElement.style.opacity = '1';
      
      // Force SVG to be visible
      const svgElement = chartElement.querySelector('.apexcharts-svg');
      if (svgElement) {
        svgElement.style.visibility = 'visible';
        svgElement.style.opacity = '1';
      }
    }
  }
})();
