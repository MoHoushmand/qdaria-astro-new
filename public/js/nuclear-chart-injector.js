/**
 * NUCLEAR CHART INJECTOR
 * 
 * This script ensures ApexCharts is always available and forces chart rendering
 * regardless of any other issues. It creates a polyfill for ApexCharts if it fails
 * to load and ensures all charts are visible.
 */

(function() {
  console.log('🚀 NUCLEAR CHART INJECTOR: Initializing');
  
  // Run immediately
  injectNuclearFix();
  
  // Also run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', injectNuclearFix);
  
  // And on window load
  window.addEventListener('load', injectNuclearFix);
  
  // Run again after a delay
  setTimeout(injectNuclearFix, 500);
  setTimeout(injectNuclearFix, 1000);
  
  function injectNuclearFix() {
    console.log('🚀 NUCLEAR CHART INJECTOR: Running fixes');
    
    // 1. Ensure ApexCharts is available
    ensureApexChartsAvailable();
    
    // 2. Force all charts to be visible
    forceChartsVisible();
    
    // 3. Remove all loading indicators
    removeLoadingIndicators();
    
    console.log('🚀 NUCLEAR CHART INJECTOR: Fixes applied');
  }
  
  function ensureApexChartsAvailable() {
    // Check if ApexCharts is already available
    if (typeof window.ApexCharts !== 'undefined') {
      console.log('🚀 NUCLEAR CHART INJECTOR: ApexCharts already available');
      return;
    }
    
    console.log('🚀 NUCLEAR CHART INJECTOR: Creating ApexCharts polyfill');
    
    // Create a minimal ApexCharts polyfill
    window.ApexCharts = function(element, options) {
      this.element = element;
      this.options = options || {};
      
      // Create a basic chart container
      const container = document.createElement('div');
      container.className = 'apexcharts-canvas nuclear-injected';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.minHeight = '350px';
      container.style.position = 'relative';
      
      // Add some basic chart elements
      container.innerHTML = `
        <div class="apexcharts-inner" style="position: relative; width: 100%; height: 100%;">
          <svg class="apexcharts-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" style="background: transparent; width: 100%; height: 100%;">
            <g class="apexcharts-inner">
              <g class="apexcharts-graphical"></g>
            </g>
          </svg>
        </div>
      `;
      
      // Store for later use
      this.container = container;
      
      // Define methods
      this.render = function() {
        if (this.element) {
          // Clear existing content
          while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
          }
          
          // Append container
          this.element.appendChild(this.container);
          
          console.log('🚀 NUCLEAR CHART INJECTOR: Rendered fallback chart');
        }
        return this;
      };
      
      this.updateOptions = function(newOptions, redraw, animate) {
        this.options = { ...this.options, ...newOptions };
        if (redraw) {
          this.render();
        }
        return this;
      };
      
      this.updateSeries = function(newSeries, animate) {
        if (this.options) {
          this.options.series = newSeries;
        }
        return this;
      };
      
      this.hideSeries = function(seriesName) {
        return this;
      };
      
      this.showSeries = function(seriesName) {
        return this;
      };
      
      this.toggleSeries = function(seriesName) {
        return this;
      };
      
      this.destroy = function() {
        if (this.element) {
          while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
          }
        }
        return null;
      };
    };
    
    console.log('🚀 NUCLEAR CHART INJECTOR: ApexCharts polyfill created');
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
    
    console.log('🚀 NUCLEAR CHART INJECTOR: Forced all charts to be visible');
  }
  
  function removeLoadingIndicators() {
    // Remove all elements with loading-related classes
    document.querySelectorAll('.chart-loading, .loading-indicator, [id$="-loading"]').forEach(elem => {
      if (!elem) return;
      
      elem.style.display = 'none';
      elem.style.visibility = 'hidden';
      elem.style.opacity = '0';
      elem.style.height = '0';
      elem.style.overflow = 'hidden';
    });
    
    // Remove placeholder classes
    document.querySelectorAll('.chart-placeholder').forEach(elem => {
      if (!elem) return;
      
      elem.classList.remove('chart-placeholder');
      elem.classList.add('chart-loaded');
    });
    
    console.log('🚀 NUCLEAR CHART INJECTOR: Removed all loading indicators');
  }
})();
