/**
 * INVESTOR PRESENTATION FIX
 * 
 * This script enhances charts for investor presentations by adding premium styling,
 * ensuring trillion milestone annotations are visible, and optimizing visual clarity.
 */

(function() {
  console.log('💼 INVESTOR PRESENTATION FIX: Initializing');
  
  // Run immediately
  enhanceForInvestors();
  
  // Also run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', enhanceForInvestors);
  
  // And on window load
  window.addEventListener('load', enhanceForInvestors);
  
  // Run again after a delay
  setTimeout(enhanceForInvestors, 1000);
  setTimeout(enhanceForInvestors, 2000);
  
  function enhanceForInvestors() {
    console.log('💼 INVESTOR PRESENTATION FIX: Enhancing charts for investors');
    
    // 1. Apply premium styling
    applyPremiumStyling();
    
    // 2. Ensure trillion milestone annotations
    ensureTrillionMilestones();
    
    // 3. Optimize visual clarity
    optimizeVisualClarity();
    
    // 4. Add download functionality
    addDownloadFunctionality();
    
    console.log('💼 INVESTOR PRESENTATION FIX: Enhancement complete');
  }
  
  function applyPremiumStyling() {
    // Get all chart containers
    const chartContainers = document.querySelectorAll('[id$="Chart"], .chart-container, .apex-chart-container');
    
    // Apply premium styling to each container
    chartContainers.forEach(container => {
      if (!container) return;
      
      // Add premium class
      container.classList.add('premium-chart-container');
      
      // Style chart title
      const title = container.querySelector('.chart-title');
      if (title) {
        title.classList.add('premium-chart-title');
      }
      
      // Style chart description
      const desc = container.querySelector('.chart-description');
      if (desc) {
        desc.classList.add('premium-chart-description');
      }
    });
    
    console.log('💼 INVESTOR PRESENTATION FIX: Applied premium styling');
  }
  
  function ensureTrillionMilestones() {
    // Charts that should have trillion milestone
    const trillionCharts = [
      'marketGrowthChart',
      'quantumMarketForecastChart',
      'forecastScenariosRangeChart',
      'marketSizeProjectionsChart'
    ];
    
    trillionCharts.forEach(chartId => {
      const container = document.getElementById(chartId);
      if (!container) return;
      
      // Check if trillion milestone already exists
      const existingMilestone = container.querySelector('.trillion-milestone');
      if (existingMilestone) return;
      
      console.log(`💼 INVESTOR PRESENTATION FIX: Adding trillion milestone to ${chartId}`);
      
      // Create trillion milestone element
      const milestone = document.createElement('div');
      milestone.className = 'trillion-milestone';
      milestone.innerHTML = '<span class="trillion-milestone-label">$1 Trillion Milestone</span>';
      
      // Add to container
      container.style.position = 'relative';
      container.appendChild(milestone);
      
      // Try to add annotation to ApexCharts if available
      const chartInstance = window[`${chartId}-instance`];
      if (chartInstance && typeof chartInstance.updateOptions === 'function') {
        try {
          chartInstance.updateOptions({
            annotations: {
              yaxis: [{
                y: 1000,
                borderColor: '#00D085',
                borderWidth: 2,
                strokeDashArray: 5,
                label: {
                  borderColor: '#00D085',
                  style: {
                    color: '#ffffff',
                    background: 'rgba(0, 208, 133, 0.8)',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    padding: {
                      left: 10,
                      right: 10,
                      top: 5,
                      bottom: 5
                    }
                  },
                  text: '$1 Trillion Milestone',
                  position: 'right',
                  offsetX: -15
                }
              }]
            }
          }, false, true);
        } catch (error) {
          console.error(`Error adding trillion milestone to ${chartId}:`, error);
        }
      }
    });
    
    console.log('💼 INVESTOR PRESENTATION FIX: Ensured trillion milestones');
  }
  
  function optimizeVisualClarity() {
    // Remove unnecessary visual elements
    document.querySelectorAll('.apexcharts-toolbar').forEach(toolbar => {
      if (!toolbar) return;
      
      // Hide unnecessary toolbar buttons
      const unnecessaryButtons = toolbar.querySelectorAll('.apexcharts-menu-icon, .apexcharts-reset-icon, .apexcharts-selection-icon');
      unnecessaryButtons.forEach(button => {
        button.style.display = 'none';
      });
    });
    
    // Enhance tooltips
    document.querySelectorAll('.apexcharts-tooltip').forEach(tooltip => {
      if (!tooltip) return;
      
      tooltip.style.background = 'rgba(2, 6, 23, 0.95)';
      tooltip.style.border = '1px solid rgba(67, 83, 255, 0.5)';
      tooltip.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
      tooltip.style.borderRadius = '4px';
      tooltip.style.padding = '0.75rem';
    });
    
    // Enhance legends
    document.querySelectorAll('.apexcharts-legend').forEach(legend => {
      if (!legend) return;
      
      legend.style.padding = '0.5rem';
      legend.style.borderRadius = '4px';
      legend.style.background = 'rgba(2, 6, 23, 0.7)';
      legend.style.border = '1px solid rgba(67, 83, 255, 0.2)';
    });
    
    console.log('💼 INVESTOR PRESENTATION FIX: Optimized visual clarity');
  }
  
  function addDownloadFunctionality() {
    // Get all chart containers
    const chartContainers = document.querySelectorAll('[id$="Chart"], .chart-container, .apex-chart-container');
    
    // Add download button to each container
    chartContainers.forEach(container => {
      if (!container) return;
      
      // Check if download button already exists
      const existingButton = container.querySelector('.chart-download-btn');
      if (existingButton) return;
      
      // Create download button
      const downloadBtn = document.createElement('button');
      downloadBtn.className = 'chart-download-btn';
      downloadBtn.innerHTML = 'Download Chart';
      downloadBtn.style.display = 'inline-flex';
      downloadBtn.style.alignItems = 'center';
      downloadBtn.style.background = 'rgba(67, 83, 255, 0.2)';
      downloadBtn.style.color = '#fff';
      downloadBtn.style.border = '1px solid rgba(67, 83, 255, 0.3)';
      downloadBtn.style.borderRadius = '4px';
      downloadBtn.style.padding = '0.5rem 1rem';
      downloadBtn.style.fontSize = '0.875rem';
      downloadBtn.style.fontWeight = '500';
      downloadBtn.style.cursor = 'pointer';
      downloadBtn.style.transition = 'all 0.2s ease';
      downloadBtn.style.marginTop = '1rem';
      downloadBtn.style.marginLeft = '0.5rem';
      
      // Add click handler
      downloadBtn.addEventListener('click', function() {
        const chartId = container.id;
        if (!chartId) return;
        
        // Try to use ApexCharts export functionality if available
        const chartInstance = window[`${chartId}-instance`];
        if (chartInstance && typeof chartInstance.dataURI === 'function') {
          chartInstance.dataURI().then(({ imgURI }) => {
            const downloadLink = document.createElement('a');
            downloadLink.href = imgURI;
            downloadLink.download = `${chartId}.png`;
            downloadLink.click();
          });
        } else {
          // Fallback to html2canvas if available
          if (typeof html2canvas === 'function') {
            html2canvas(container).then(canvas => {
              const imgData = canvas.toDataURL('image/png');
              const downloadLink = document.createElement('a');
              downloadLink.href = imgData;
              downloadLink.download = `${chartId}.png`;
              downloadLink.click();
            });
          }
        }
      });
      
      // Find a good place to add the button
      const dataTableBtn = container.querySelector('.chart-data-table-btn');
      if (dataTableBtn) {
        dataTableBtn.parentNode.insertBefore(downloadBtn, dataTableBtn.nextSibling);
      } else {
        container.appendChild(downloadBtn);
      }
    });
    
    console.log('💼 INVESTOR PRESENTATION FIX: Added download functionality');
  }
})();
