/**
 * Chart Fallback Handler
 * This script provides a global safety mechanism for the business plan page
 * by detecting chart loading issues and providing fallback options.
 */
(function() {
  console.log('🛟 Chart Fallback Handler initialized');
  
  // Configuration
  const MAX_CHART_LOAD_TIME = 5000; // 5 seconds
  const REDIRECT_TO_FALLBACK = false; // Set to true to auto-redirect if charts fail to load
  
  // Track page load time
  const pageLoadStart = Date.now();
  
  // Function to check if any chart placeholders are stuck loading
  function checkForStuckCharts() {
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
    let stuckChartsCount = 0;
    
    chartPlaceholders.forEach(placeholder => {
      // Consider a chart stuck if it has no children or only has loading indicators
      const hasContent = placeholder.querySelector('.chart-container, .plotly-chart-root, .chart-data-table:not(.hidden)');
      if (!hasContent) {
        stuckChartsCount++;
        console.warn(`Chart placeholder ${placeholder.id || 'unknown'} appears to be stuck loading`);
        
        // Apply fallback styling to make the placeholder visible and prevent layout shifts
        placeholder.style.minHeight = '200px';
        placeholder.style.padding = '20px';
        placeholder.style.backgroundColor = 'rgba(30, 41, 59, 0.4)';
        placeholder.style.borderRadius = '8px';
        placeholder.style.margin = '20px 0';
        
        // Add a fallback message if none exists
        if (!placeholder.querySelector('.chart-fallback-message')) {
          const fallbackMessage = document.createElement('div');
          fallbackMessage.className = 'chart-fallback-message';
          fallbackMessage.innerHTML = `
            <h3 style="color: #f87171; margin-bottom: 10px;">Chart could not be loaded</h3>
            <p style="color: #e5e7eb; margin-bottom: 10px;">The chart data is still available in our <a href="/business-plan-fallback" style="color: #60a5fa; text-decoration: underline;">fallback version</a>.</p>
            <a href="/business-plan-fallback" style="display: inline-block; background-color: #3b82f6; color: white; padding: 6px 12px; border-radius: 4px; text-decoration: none; margin-top: 10px;">View Fallback Version</a>
          `;
          placeholder.appendChild(fallbackMessage);
        }
      }
    });
    
    // If too many charts are stuck, consider offering the fallback page
    if (stuckChartsCount > 2 || (stuckChartsCount > 0 && (Date.now() - pageLoadStart > MAX_CHART_LOAD_TIME))) {
      showFallbackBanner();
      
      // Optionally redirect to fallback page automatically
      if (REDIRECT_TO_FALLBACK) {
        window.location.href = '/business-plan-fallback';
      }
    }
    
    return stuckChartsCount;
  }
  
  // Function to show a banner with fallback link
  function showFallbackBanner() {
    // Only add the banner once
    if (document.getElementById('fallback-banner')) return;
    
    const banner = document.createElement('div');
    banner.id = 'fallback-banner';
    banner.style.position = 'fixed';
    banner.style.bottom = '20px';
    banner.style.right = '20px';
    banner.style.zIndex = '9999';
    banner.style.backgroundColor = '#ef4444';
    banner.style.color = 'white';
    banner.style.padding = '12px 20px';
    banner.style.borderRadius = '8px';
    banner.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    banner.style.maxWidth = '300px';
    
    banner.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 6px;">Charts not loading properly?</div>
      <p style="margin-bottom: 8px; font-size: 14px;">Try our text-only fallback version with static tables.</p>
      <a href="/business-plan-fallback" style="display: block; background-color: white; color: #ef4444; padding: 6px 12px; border-radius: 4px; text-decoration: none; text-align: center; font-weight: bold;">View Fallback Version</a>
      <button id="close-fallback-banner" style="position: absolute; top: 6px; right: 10px; background: none; border: none; color: white; cursor: pointer; font-size: 18px;">&times;</button>
    `;
    
    document.body.appendChild(banner);
    
    // Add event listener to close button
    document.getElementById('close-fallback-banner').addEventListener('click', function(e) {
      e.preventDefault();
      banner.remove();
    });
  }
  
  // Initial check shortly after page load
  setTimeout(() => {
    const stuckChartsCount = checkForStuckCharts();
    
    // Schedule periodic checks if any charts appear to be loading
    if (stuckChartsCount > 0) {
      const checkInterval = setInterval(() => {
        const currentStuckCount = checkForStuckCharts();
        
        // Stop checking if all charts eventually loaded
        if (currentStuckCount === 0) {
          clearInterval(checkInterval);
        }
      }, 2000); // Check every 2 seconds
      
      // Stop checking after 30 seconds regardless
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 30000);
    }
  }, 3000); // Initial 3 second delay to give charts time to load
  
  // Handle page errors that might be caused by chart loading
  window.addEventListener('error', function(event) {
    console.error('Page error detected:', event.message);
    
    // If the error might be related to charts, show the fallback banner
    if (event.message && (
      event.message.includes('chart') || 
      event.message.includes('apex') || 
      event.message.includes('plotly') ||
      event.message.includes('react') ||
      event.message.includes('undefined') ||
      event.message.includes('null')
    )) {
      showFallbackBanner();
    }
  });
})();
