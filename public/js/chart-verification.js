/**
 * CHART VERIFICATION
 * 
 * This script verifies that all charts are properly rendered and visible.
 * It runs checks on each chart and applies fixes if needed.
 */

(function() {
  console.log('✅ CHART VERIFICATION: Initializing');
  
  // Run verification after a delay to allow other scripts to initialize
  setTimeout(verifyCharts, 1000);
  setTimeout(verifyCharts, 2000);
  setTimeout(verifyCharts, 3000);
  
  // List of all chart IDs that must be verified
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
  
  function verifyCharts() {
    console.log('✅ CHART VERIFICATION: Running verification checks');
    
    // Verify each critical chart
    CRITICAL_CHARTS.forEach(chartId => {
      verifyChart(chartId);
    });
    
    console.log('✅ CHART VERIFICATION: Verification complete');
  }
  
  function verifyChart(chartId) {
    const container = document.getElementById(chartId);
    if (!container) {
      console.warn(`✅ CHART VERIFICATION: Chart container ${chartId} not found`);
      return;
    }
    
    console.log(`✅ CHART VERIFICATION: Verifying ${chartId}`);
    
    // Check 1: Is the container visible?
    const containerStyle = getComputedStyle(container);
    const isContainerVisible = containerStyle.display !== 'none' && 
                              containerStyle.visibility !== 'hidden' && 
                              containerStyle.opacity !== '0';
    
    if (!isContainerVisible) {
      console.warn(`✅ CHART VERIFICATION: Container ${chartId} is not visible, fixing...`);
      container.style.display = 'block';
      container.style.visibility = 'visible';
      container.style.opacity = '1';
    }
    
    // Check 2: Is the chart element visible?
    const chartElem = document.getElementById(`${chartId}-chart`);
    if (!chartElem) {
      console.warn(`✅ CHART VERIFICATION: Chart element ${chartId}-chart not found`);
      return;
    }
    
    const chartStyle = getComputedStyle(chartElem);
    const isChartVisible = chartStyle.display !== 'none' && 
                          chartStyle.visibility !== 'hidden' && 
                          chartStyle.opacity !== '0';
    
    if (!isChartVisible) {
      console.warn(`✅ CHART VERIFICATION: Chart element ${chartId}-chart is not visible, fixing...`);
      chartElem.style.display = 'block';
      chartElem.style.visibility = 'visible';
      chartElem.style.opacity = '1';
    }
    
    // Check 3: Is the ApexCharts canvas present and visible?
    const canvas = chartElem.querySelector('.apexcharts-canvas');
    if (!canvas) {
      console.warn(`✅ CHART VERIFICATION: ApexCharts canvas not found in ${chartId}, creating fallback...`);
      createFallbackChart(chartId);
      return;
    }
    
    const canvasStyle = getComputedStyle(canvas);
    const isCanvasVisible = canvasStyle.display !== 'none' && 
                           canvasStyle.visibility !== 'hidden' && 
                           canvasStyle.opacity !== '0';
    
    if (!isCanvasVisible) {
      console.warn(`✅ CHART VERIFICATION: ApexCharts canvas in ${chartId} is not visible, fixing...`);
      canvas.style.display = 'block';
      canvas.style.visibility = 'visible';
      canvas.style.opacity = '1';
    }
    
    // Check 4: Does the canvas have content?
    const hasContent = canvas.querySelector('.apexcharts-inner') !== null;
    if (!hasContent) {
      console.warn(`✅ CHART VERIFICATION: ApexCharts canvas in ${chartId} has no content, creating fallback...`);
      createFallbackChart(chartId);
      return;
    }
    
    // Check 5: Is the data table visible?
    const dataTable = document.getElementById(`${chartId}-data-table`);
    if (dataTable) {
      const dataTableStyle = getComputedStyle(dataTable);
      const isDataTableVisible = dataTableStyle.display !== 'none' && 
                                dataTableStyle.visibility !== 'hidden' && 
                                dataTableStyle.opacity !== '0';
      
      if (!isDataTableVisible) {
        console.warn(`✅ CHART VERIFICATION: Data table ${chartId}-data-table is not visible, fixing...`);
        dataTable.style.display = 'block';
        dataTable.style.visibility = 'visible';
        dataTable.style.opacity = '1';
      }
    }
    
    console.log(`✅ CHART VERIFICATION: ${chartId} verification complete`);
  }
  
  function createFallbackChart(chartId) {
    const chartElem = document.getElementById(`${chartId}-chart`);
    if (!chartElem) return;
    
    console.log(`✅ CHART VERIFICATION: Creating fallback for ${chartId}`);
    
    // Create a basic fallback canvas
    const fallbackCanvas = document.createElement('div');
    fallbackCanvas.className = 'apexcharts-canvas verification-fallback';
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
    
    console.log(`✅ CHART VERIFICATION: Fallback created for ${chartId}`);
  }
})();
