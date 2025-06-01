/**
 * NUKE LOADING
 * 
 * This script aggressively removes all loading indicators and forces charts to display.
 * It's a last-resort nuclear option to ensure charts are visible regardless of any issues.
 */

(function() {
  console.log('💣 NUKE LOADING: Initializing');
  
  // Run immediately
  nukeLoading();
  
  // Also run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', nukeLoading);
  
  // And on window load
  window.addEventListener('load', nukeLoading);
  
  // Run again after a delay
  setTimeout(nukeLoading, 500);
  setTimeout(nukeLoading, 1000);
  setTimeout(nukeLoading, 2000);
  
  function nukeLoading() {
    console.log('💣 NUKE LOADING: Running nuclear option');
    
    // 1. Remove all loading indicators
    removeLoadingIndicators();
    
    // 2. Force all charts to be visible
    forceChartsVisible();
    
    // 3. Remove loading classes
    removeLoadingClasses();
    
    // 4. Force data tables to be visible
    forceDataTablesVisible();
    
    console.log('💣 NUKE LOADING: Nuclear option complete');
  }
  
  function removeLoadingIndicators() {
    // Get all elements with loading-related classes
    const loadingElements = document.querySelectorAll(
      '.chart-loading, ' +
      '.loading-indicator, ' +
      '.loading-spinner, ' +
      '.chart-placeholder::before, ' +
      '.chart-placeholder::after, ' +
      '[id$="-loading"], ' +
      '.loading-text, ' +
      '.error-text, ' +
      '.chart-error, ' +
      '.chart-loading-text, ' +
      '.loading-message, ' +
      '.error-message, ' +
      '.fallback-message, ' +
      '.chart-fallback-message'
    );
    
    // Remove or hide each element
    loadingElements.forEach(elem => {
      if (!elem) return;
      
      try {
        // Try to remove the element
        elem.parentNode.removeChild(elem);
      } catch (error) {
        // If removal fails, hide it
        elem.style.display = 'none';
        elem.style.visibility = 'hidden';
        elem.style.opacity = '0';
        elem.style.height = '0';
        elem.style.width = '0';
        elem.style.overflow = 'hidden';
        elem.style.position = 'absolute';
        elem.style.pointerEvents = 'none';
      }
    });
    
    console.log('💣 NUKE LOADING: Removed all loading indicators');
  }
  
  function forceChartsVisible() {
    // Force all chart containers to be visible
    document.querySelectorAll('[id$="Chart"], .chart-container, .apex-chart-container').forEach(container => {
      if (!container) return;
      
      container.style.display = 'block';
      container.style.visibility = 'visible';
      container.style.opacity = '1';
      container.style.height = 'auto';
      container.style.minHeight = '400px';
      
      // Force chart element to be visible
      const chartId = container.id;
      if (chartId) {
        const chartElem = document.getElementById(`${chartId}-chart`);
        if (chartElem) {
          chartElem.style.display = 'block';
          chartElem.style.visibility = 'visible';
          chartElem.style.opacity = '1';
          chartElem.style.height = 'auto';
          chartElem.style.minHeight = '350px';
        }
      }
    });
    
    // Force all ApexCharts canvases to be visible
    document.querySelectorAll('.apexcharts-canvas').forEach(canvas => {
      if (!canvas) return;
      
      canvas.style.display = 'block';
      canvas.style.visibility = 'visible';
      canvas.style.opacity = '1';
    });
    
    console.log('💣 NUKE LOADING: Forced all charts to be visible');
  }
  
  function removeLoadingClasses() {
    // Remove placeholder classes
    document.querySelectorAll('.chart-placeholder').forEach(elem => {
      if (!elem) return;
      
      elem.classList.remove('chart-placeholder');
      elem.classList.add('chart-loaded');
    });
    
    // Remove loading classes
    document.querySelectorAll('.loading, .is-loading, .chart-loading').forEach(elem => {
      if (!elem) return;
      
      elem.classList.remove('loading');
      elem.classList.remove('is-loading');
      elem.classList.remove('chart-loading');
      elem.classList.add('loaded');
      elem.classList.add('is-loaded');
      elem.classList.add('chart-loaded');
    });
    
    console.log('💣 NUKE LOADING: Removed all loading classes');
  }
  
  function forceDataTablesVisible() {
    // Force all data tables to be visible
    document.querySelectorAll('[id$="-data-table"], .chart-data-table').forEach(table => {
      if (!table) return;
      
      table.style.display = 'block';
      table.style.visibility = 'visible';
      table.style.opacity = '1';
    });
    
    // Force all data table toggle buttons to be visible
    document.querySelectorAll('.chart-data-table-btn').forEach(btn => {
      if (!btn) return;
      
      btn.style.display = 'inline-flex';
      btn.style.visibility = 'visible';
      btn.style.opacity = '1';
      
      // Set aria-expanded to true
      btn.setAttribute('aria-expanded', 'true');
    });
    
    console.log('💣 NUKE LOADING: Forced all data tables to be visible');
  }
})();
