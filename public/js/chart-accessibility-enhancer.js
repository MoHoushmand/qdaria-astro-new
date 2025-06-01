/**
 * QDaria Business Plan - Chart Accessibility Enhancer
 * 
 * This script enhances chart accessibility by adding:
 * - WCAG 2.1 AA compliance features
 * - Keyboard navigation support
 * - Screen reader announcements
 * - Proper ARIA attributes and focus management
 * - High contrast support
 * 
 * As required in the .clinerules file under "Accessibility Standards"
 */

(function() {
  // Run on load and after short delay to capture all charts
  window.addEventListener('load', function() {
    setTimeout(enhanceChartAccessibility, 1000);
    setTimeout(enhanceChartAccessibility, 3000); // Run again to catch any delayed charts
  });
  
  function enhanceChartAccessibility() {
    console.log('🔍 Chart Accessibility Enhancer activating...');
    
    // Get all chart containers in the document
    const chartContainers = document.querySelectorAll('[id$="-chart"], .apexcharts-canvas, .chart-container');
    
    if (chartContainers.length === 0) {
      console.log('No chart containers found yet, will retry later...');
      return;
    }
    
    console.log(`Found ${chartContainers.length} chart containers to enhance for accessibility`);
    
    // Process each chart container
    chartContainers.forEach(container => {
      const chartId = container.id || 'chart-' + Math.random().toString(36).substring(2, 9);
      
      // Skip if already processed
      if (container.getAttribute('data-accessibility-enhanced') === 'true') {
        return;
      }
      
      // Mark as processed
      container.setAttribute('data-accessibility-enhanced', 'true');
      
      // 1. Add WAI-ARIA roles and properties
      container.setAttribute('role', 'figure');
      container.setAttribute('aria-roledescription', 'chart');
      
      // Find chart title, if available
      const titleElement = container.querySelector('.chart-title') || 
                          container.querySelector('.apexcharts-title-text');
      
      let chartTitle = '';
      if (titleElement) {
        chartTitle = titleElement.textContent;
      } else {
        // Create a reasonable title from the ID
        chartTitle = chartId
          .replace(/-chart$/, '')
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, c => c.toUpperCase())
          .replace(/-/g, ' ')
          .trim();
      }
      
      container.setAttribute('aria-label', chartTitle);
      
      // 2. Ensure the chart and its contents are focusable
      if (container.tabIndex !== 0) {
        container.tabIndex = 0;
      }
      
      // 3. Add accessibility description
      let chartDescription = '';
      const chartType = getChartType(container);
      
      // Get chart data from data table if available
      const relatedTableId = chartId.replace('-chart', '-data-table');
      const dataTable = document.getElementById(relatedTableId);
      
      if (dataTable) {
        // Create a descriptive summary from the data table
        chartDescription = `${chartTitle} ${chartType} chart. Data is also available in tabular format. `;
        chartDescription += 'Use arrow keys to navigate between data points. ';
        
        if (dataTable.querySelectorAll('td').length > 0) {
          chartDescription += 'Press "t" key to access the data table.';
        }
      } else {
        chartDescription = `${chartTitle} ${chartType} chart. Use arrow keys to navigate between data points.`;
      }
      
      // Add description to chart
      container.setAttribute('aria-description', chartDescription);
      
      // 4. Add keyboard navigation
      container.addEventListener('keydown', function(e) {
        const key = e.key.toLowerCase();
        
        // Navigation keys
        if (['arrowleft', 'arrowright', 'arrowup', 'arrowdown'].includes(key)) {
          e.preventDefault();
          navigateChart(container, key);
        }
        
        // Toggle data table
        if (key === 't' && dataTable) {
          e.preventDefault();
          const isHidden = dataTable.style.display === 'none';
          dataTable.style.display = isHidden ? 'block' : 'none';
          
          // Announce to screen readers
          announceToScreenReader(
            isHidden ? 'Data table displayed' : 'Data table hidden'
          );
        }
        
        // Enter key to get details about current point
        if (key === 'enter') {
          e.preventDefault();
          // Get current selected point and announce details
          const selectedPoint = container.querySelector('.apexcharts-series-highlight') || 
                              container.querySelector('.apexcharts-selected');
          
          if (selectedPoint) {
            const pointDetails = getDataPointDetails(selectedPoint);
            announceToScreenReader(pointDetails);
          }
        }
      });
      
      // 5. Add focus indicator styles
      enhanceFocusIndicator(container);
      
      // 6. Add accessible tooltips
      enhanceTooltips(container);
      
      // 7. Check for and announce trillion-dollar milestones
      if (container.textContent.toLowerCase().includes('trillion') || 
          container.textContent.includes('$1T')) {
        
        container.setAttribute('data-contains-trillion', 'true');
        const annotation = document.createElement('div');
        annotation.className = 'sr-only chart-trillion-note';
        annotation.setAttribute('aria-live', 'polite');
        annotation.textContent = 'This chart contains data showing the $1 Trillion milestone.';
        container.appendChild(annotation);
      }
      
      console.log(`✅ Accessibility enhanced for chart: ${chartId}`);
    });
    
    // Also make any SVG fallbacks accessible
    document.querySelectorAll('svg:not([role])').forEach(svg => {
      if (!svg.closest('.apexcharts-canvas')) { // Don't target ApexCharts SVGs
        svg.setAttribute('role', 'img');
        
        // Try to find a title or create one
        let titleElement = svg.querySelector('title');
        if (!titleElement) {
          titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          svg.insertBefore(titleElement, svg.firstChild);
          
          // Create a title from context
          const parentElement = svg.parentElement;
          if (parentElement) {
            const header = parentElement.querySelector('h1, h2, h3, h4, h5, h6');
            if (header) {
              titleElement.textContent = header.textContent + ' (SVG chart)';
            } else {
              titleElement.textContent = 'Chart visualization';
            }
          }
        }
        
        if (titleElement && titleElement.textContent) {
          svg.setAttribute('aria-labelledby', 'svg-title-' + Math.random().toString(36).substring(2, 9));
          titleElement.id = svg.getAttribute('aria-labelledby');
        }
      }
    });
    
    // Make sure data tables are accessible
    document.querySelectorAll('.chart-data-table').forEach(table => {
      // Check if it has a label
      if (!table.getAttribute('aria-label')) {
        const tableId = table.id;
        const chartId = tableId?.replace('-data-table', '-chart');
        const chartElement = document.getElementById(chartId);
        
        let tableTitle = '';
        if (chartElement) {
          const chartTitle = chartElement.getAttribute('aria-label');
          if (chartTitle) {
            tableTitle = chartTitle + ' - Data Table';
          }
        }
        
        if (!tableTitle) {
          tableTitle = 'Chart Data Table';
        }
        
        table.setAttribute('aria-label', tableTitle);
      }
      
      // Ensure the table has proper ARIA attributes
      const tableElement = table.querySelector('table');
      if (tableElement) {
        tableElement.setAttribute('role', 'table');
        tableElement.querySelectorAll('th').forEach(th => {
          th.setAttribute('scope', 'col');
        });
      }
    });
    
    console.log('✅ Accessibility enhancement complete');
    
    // Add a global keyboard shortcut to toggle all data tables
    if (!window.dataTableKeyboardListenerAdded) {
      window.addEventListener('keydown', function(e) {
        // Alt+T toggles all data tables
        if (e.altKey && e.key.toLowerCase() === 't') {
          e.preventDefault();
          
          const tables = document.querySelectorAll('.chart-data-table');
          let anyHidden = false;
          
          // Check if any are hidden
          tables.forEach(table => {
            if (table.style.display === 'none' || 
                window.getComputedStyle(table).display === 'none') {
              anyHidden = true;
            }
          });
          
          // Show all if any are hidden, otherwise hide all
          tables.forEach(table => {
            table.style.display = anyHidden ? 'block' : 'none';
          });
          
          announceToScreenReader(
            anyHidden ? 'All data tables displayed' : 'All data tables hidden'
          );
        }
      });
      
      window.dataTableKeyboardListenerAdded = true;
    }
  }
  
  // Helper function to get chart type
  function getChartType(chartContainer) {
    const classes = chartContainer.className;
    
    if (classes.includes('area-chart') || chartContainer.querySelector('.apexcharts-area')) {
      return 'Area';
    } else if (classes.includes('line-chart') || chartContainer.querySelector('.apexcharts-line')) {
      return 'Line';
    } else if (classes.includes('bar-chart') || chartContainer.querySelector('.apexcharts-bar')) {
      return 'Bar';
    } else if (classes.includes('radar-chart') || chartContainer.querySelector('.apexcharts-radar')) {
      return 'Radar';
    } else if (classes.includes('pie-chart') || chartContainer.querySelector('.apexcharts-pie')) {
      return 'Pie';
    } else if (classes.includes('donut-chart') || chartContainer.querySelector('.apexcharts-donut')) {
      return 'Donut';
    } else if (classes.includes('scatter-chart') || chartContainer.querySelector('.apexcharts-scatter')) {
      return 'Scatter';
    } else if (classes.includes('bubble-chart') || chartContainer.querySelector('.apexcharts-bubble')) {
      return 'Bubble';
    } else if (classes.includes('heatmap-chart') || chartContainer.querySelector('.apexcharts-heatmap')) {
      return 'Heatmap';
    } else if (classes.includes('candlestick-chart') || chartContainer.querySelector('.apexcharts-candlestick')) {
      return 'Candlestick';
    } else {
      return 'Data';
    }
  }
  
  // Helper function for keyboard navigation
  function navigateChart(container, key) {
    // Try to find the currently highlighted point
    let currentPoint = container.querySelector('.apexcharts-series-highlight') || 
                      container.querySelector('.apexcharts-selected');
    
    // If no point is selected, select the first one
    if (!currentPoint) {
      const points = container.querySelectorAll('.apexcharts-series .apexcharts-point');
      if (points.length > 0) {
        currentPoint = points[0];
        simulatePointHover(currentPoint);
      }
      return;
    }
    
    // Based on the key, find the next point to highlight
    const allPoints = Array.from(container.querySelectorAll('.apexcharts-series .apexcharts-point'));
    const currentIndex = allPoints.indexOf(currentPoint);
    
    let nextIndex = currentIndex;
    
    if (key === 'arrowright') {
      nextIndex = Math.min(allPoints.length - 1, currentIndex + 1);
    } else if (key === 'arrowleft') {
      nextIndex = Math.max(0, currentIndex - 1);
    } else if (key === 'arrowup' || key === 'arrowdown') {
      // For up/down, we need to find points in different series
      const currentSeries = currentPoint.closest('.apexcharts-series');
      const seriesIndex = Array.from(container.querySelectorAll('.apexcharts-series')).indexOf(currentSeries);
      const seriesCount = container.querySelectorAll('.apexcharts-series').length;
      
      let targetSeriesIndex = seriesIndex;
      
      if (key === 'arrowup') {
        targetSeriesIndex = (seriesIndex + 1) % seriesCount;
      } else {
        targetSeriesIndex = (seriesIndex - 1 + seriesCount) % seriesCount;
      }
      
      const targetSeries = container.querySelectorAll('.apexcharts-series')[targetSeriesIndex];
      if (targetSeries) {
        const pointsInSeries = targetSeries.querySelectorAll('.apexcharts-point');
        if (pointsInSeries.length > 0) {
          // Try to find the same x-position point
          const pointIndex = Math.min(currentIndex % pointsInSeries.length, pointsInSeries.length - 1);
          simulatePointHover(pointsInSeries[pointIndex]);
          return;
        }
      }
    }
    
    // Highlight the next point if different from current
    if (nextIndex !== currentIndex && allPoints[nextIndex]) {
      simulatePointHover(allPoints[nextIndex]);
    }
  }
  
  // Helper function to simulate hover on a point
  function simulatePointHover(point) {
    // Focus the point
    point.focus();
    
    // Try to trigger the hover event
    const mouseoverEvent = new MouseEvent('mouseover', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    
    point.dispatchEvent(mouseoverEvent);
    
    // Get point details and announce
    const details = getDataPointDetails(point);
    announceToScreenReader(details);
  }
  
  // Helper function to get details about a data point
  function getDataPointDetails(point) {
    if (!point) return 'No point selected';
    
    try {
      // Get series index and point index
      const series = point.closest('.apexcharts-series');
      const seriesIndex = Array.from(document.querySelectorAll('.apexcharts-series')).indexOf(series);
      
      // Find related series and value
      const seriesName = series.getAttribute('seriesName') || `Series ${seriesIndex + 1}`;
      
      // Try to extract value from point
      let value = point.getAttribute('value') || point.getAttribute('data-value');
      
      // If not found, try to get from tooltip
      if (!value) {
        const tooltip = document.querySelector('.apexcharts-tooltip-text-y-value');
        if (tooltip) {
          value = tooltip.textContent;
        }
      }
      
      // Get x-value (category or date)
      let xValue = '';
      const xLabel = point.getAttribute('index');
      if (xLabel) {
        const container = point.closest('[id]');
        if (container && container.id) {
          const chart = window.ApexCharts.getChartByID(container.id);
          if (chart && chart.w && chart.w.globals.labels) {
            xValue = chart.w.globals.labels[xLabel] || `Point ${parseInt(xLabel) + 1}`;
          }
        }
      }
      
      if (!xValue) {
        xValue = `Point ${parseInt(point.getAttribute('j')) + 1}`;
      }
      
      return `${seriesName}, ${xValue}: ${value}`;
    } catch (err) {
      return 'Data point selected';
    }
  }
  
  // Helper function to announce messages to screen readers
  function announceToScreenReader(message) {
    // Find or create live region
    let liveRegion = document.getElementById('chart-live-region');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'chart-live-region';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      document.body.appendChild(liveRegion);
    }
    
    // Reset then set content to ensure announcement
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 50);
  }
  
  // Helper function to enhance focus indicators
  function enhanceFocusIndicator(container) {
    // Apply focus styles to container
    container.addEventListener('focus', () => {
      container.style.outline = '2px solid #3b82f6';
      container.style.outlineOffset = '2px';
    });
    
    container.addEventListener('blur', () => {
      container.style.outline = '';
    });
    
    // Add style for focus visible
    const style = document.createElement('style');
    style.textContent = `
      .chart-container:focus, .apexcharts-canvas:focus, [id$="-chart"]:focus {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `;
    
    // Add style to document head if not already added
    if (!document.querySelector('#chart-accessibility-styles')) {
      style.id = 'chart-accessibility-styles';
      document.head.appendChild(style);
    }
  }
  
  // Helper function to enhance tooltips for accessibility
  function enhanceTooltips(container) {
    // Find tooltip elements
    const tooltips = container.querySelectorAll('.apexcharts-tooltip');
    
    tooltips.forEach(tooltip => {
      // Set proper ARIA attributes
      tooltip.setAttribute('role', 'tooltip');
      tooltip.setAttribute('aria-hidden', 'true');
      
      // When tooltip becomes visible, update ARIA attributes
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === 'style') {
            const isVisible = window.getComputedStyle(tooltip).opacity !== '0';
            tooltip.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
            
            if (isVisible) {
              // Announce tooltip content
              const content = tooltip.textContent.trim();
              if (content) {
                announceToScreenReader(content);
              }
            }
          }
        });
      });
      
      observer.observe(tooltip, { attributes: true });
    });
  }
})();
