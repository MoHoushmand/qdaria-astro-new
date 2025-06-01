/**
 * Reliable Chart Fix - Safe approach to fixing charts without disrupting page rendering
 * This script is designed to work reliably in all environments without overriding browser APIs
 */
(function() {
  // Wait for DOM to be fully loaded before doing anything
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Reliable Chart Fix: Running after DOM is fully loaded');
    
    // Only run this script if ApexCharts is available
    if (typeof window.ApexCharts === 'undefined') {
      console.log('Reliable Chart Fix: ApexCharts not found, waiting for it to load');
      
      // Try again in a moment in case ApexCharts loads later
      setTimeout(function() {
        if (typeof window.ApexCharts !== 'undefined') {
          console.log('Reliable Chart Fix: ApexCharts now available, proceeding with fixes');
          applyChartFixes();
        } else {
          console.log('Reliable Chart Fix: ApexCharts still not available, showing data tables only');
          showDataTablesOnly();
        }
      }, 1000);
    } else {
      // ApexCharts is available, proceed with fixes
      applyChartFixes();
    }
  });
  
  // Main function to apply chart fixes
  function applyChartFixes() {
    // Business plan charts (safe list - only target specific charts)
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
    
    // Process each chart
    businessPlanCharts.forEach(function(chartId) {
      const chartContainer = document.getElementById(chartId);
      if (!chartContainer) return;
      
      // Fix placeholder class and loading indicators
      chartContainer.classList.remove('chart-placeholder');
      
      // Find and hide loading indicators
      const loadingIndicator = document.getElementById(`${chartId}-loading`);
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
      
      // Show data table
      const dataTable = document.getElementById(`${chartId}-data-table`);
      if (dataTable) {
        dataTable.style.display = 'block';
        dataTable.style.visibility = 'visible';
        dataTable.style.opacity = '1';
      }
      
      // Check for chart visualization
      const chartViz = document.getElementById(`${chartId}-chart`);
      if (chartViz) {
        // If the chart is empty, add an SVG fallback
        if (!chartViz.querySelector('svg') && !chartViz.querySelector('canvas')) {
          console.log(`Reliable Chart Fix: Adding SVG fallback for ${chartId}`);
          addSvgFallback(chartId, chartViz);
        }
      }
    });
  }
  
  // Show data tables when charts can't be rendered
  function showDataTablesOnly() {
    // Business plan charts
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
    
    // Process each chart
    businessPlanCharts.forEach(function(chartId) {
      const chartContainer = document.getElementById(chartId);
      if (!chartContainer) return;
      
      // Hide loading indicators
      const loadingIndicators = chartContainer.querySelectorAll('.chart-loading, [id$="-loading"]');
      loadingIndicators.forEach(function(indicator) {
        indicator.style.display = 'none';
      });
      
      // Hide fallback messages
      const fallbackMessages = chartContainer.querySelectorAll('.chart-fallback-message');
      fallbackMessages.forEach(function(message) {
        message.style.display = 'none';
      });
      
      // Show data table
      const dataTable = document.getElementById(`${chartId}-data-table`);
      if (dataTable) {
        dataTable.style.display = 'block';
        dataTable.style.visibility = 'visible';
        dataTable.style.opacity = '1';
      }
      
      // Add svg fallback
      const chartViz = document.getElementById(`${chartId}-chart`);
      if (chartViz) {
        addSvgFallback(chartId, chartViz);
      }
    });
  }
  
  // Add SVG fallback for charts
  function addSvgFallback(chartId, container) {
    // Create a simple SVG with gradient
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '300');
    svg.setAttribute('viewBox', '0 0 800 300');
    svg.setAttribute('class', 'chart-fallback-svg');
    
    // Add gradient definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', `${chartId}-gradient`);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:#04a3ff;stop-opacity:0.7');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('style', 'stop-color:#00ffd3;stop-opacity:0.7');
    
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('style', 'stop-color:#65ff00;stop-opacity:0.7');
    
    // Build the SVG
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Add background rect
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', '#1e293b');
    rect.setAttribute('opacity', '0.3');
    svg.appendChild(rect);
    
    // Add text label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '50%');
    text.setAttribute('y', '50%');
    text.setAttribute('font-family', 'Arial, sans-serif');
    text.setAttribute('font-size', '16');
    text.setAttribute('fill', '#ffffff');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = 'Chart data available in table below';
    svg.appendChild(text);
    
    // Add chart-specific decorative elements based on chart type
    if (chartId.includes('Market') || chartId.includes('Revenue') || chartId.includes('Forecast')) {
      // Area chart decorative elements
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.setAttribute('d', 'M50,250 Q200,100 400,200 Q600,280 750,150');
      path1.setAttribute('stroke', `url(#${chartId}-gradient)`);
      path1.setAttribute('stroke-width', '3');
      path1.setAttribute('fill', 'none');
      svg.appendChild(path1);
      
      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path2.setAttribute('d', 'M50,250 Q200,100 400,200 Q600,280 750,150 L750,290 L50,290 Z');
      path2.setAttribute('fill', `url(#${chartId}-gradient)`);
      path2.setAttribute('opacity', '0.3');
      svg.appendChild(path2);
    } else if (chartId.includes('Competitor') || chartId.includes('Risk') || chartId.includes('SWOT')) {
      // Radar chart decorative elements
      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', '400,50 500,150 450,250 350,250 300,150');
      polygon.setAttribute('stroke', `url(#${chartId}-gradient)`);
      polygon.setAttribute('stroke-width', '2');
      polygon.setAttribute('fill', `url(#${chartId}-gradient)`);
      polygon.setAttribute('opacity', '0.3');
      svg.appendChild(polygon);
      
      // Add concentric circles
      [100, 75, 50, 25].forEach(radius => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '400');
        circle.setAttribute('cy', '150');
        circle.setAttribute('r', radius.toString());
        circle.setAttribute('stroke', '#ffffff');
        circle.setAttribute('stroke-width', '1');
        circle.setAttribute('stroke-opacity', '0.2');
        circle.setAttribute('fill', 'none');
        svg.appendChild(circle);
      });
    } else {
      // Generic chart decoration (bars)
      const heights = [150, 100, 170, 130];
      const positions = [100, 250, 400, 550];
      
      positions.forEach((x, i) => {
        const barRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        barRect.setAttribute('x', x.toString());
        barRect.setAttribute('y', (250 - heights[i]).toString());
        barRect.setAttribute('width', '100');
        barRect.setAttribute('height', heights[i].toString());
        barRect.setAttribute('rx', '5');
        barRect.setAttribute('fill', `url(#${chartId}-gradient)`);
        barRect.setAttribute('opacity', '0.7');
        svg.appendChild(barRect);
      });
    }
    
    // Clear container and add SVG
    container.appendChild(svg);
  }
})();
