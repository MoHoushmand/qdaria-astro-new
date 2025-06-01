/**
 * QDaria Business Plan - Trillion Dollar Milestone Enhancer
 * Ensures all charts properly display the $1 Trillion milestone annotations
 * as specified in the .clinerules requirements
 */

(function() {
  // Run after DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Trillion Dollar Milestone Enhancer initializing...');
    
    // Wait for ApexCharts to be available and initialized
    const checkInterval = setInterval(function() {
      if (window.ApexCharts) {
        clearInterval(checkInterval);
        enhanceTrillionAnnotations();
      }
    }, 200);
  });
  
  // Also run on window load to catch any delayed chart renderings
  window.addEventListener('load', function() {
    setTimeout(enhanceTrillionAnnotations, 1000);
    setTimeout(enhanceTrillionAnnotations, 3000); // Run again after 3 seconds
  });
  
  function enhanceTrillionAnnotations() {
    console.log('🔍 Checking for charts that need trillion dollar annotations...');
    
    // Get all chart containers
    const chartContainers = document.querySelectorAll('[id$="-chart"]');
    if (!chartContainers.length) {
      console.log('No chart containers found yet...');
      return;
    }

    let enhancedCharts = 0;
    
    // Find all chart instances and add/enhance trillion annotations
    chartContainers.forEach(container => {
      const chartId = container.id;
      // Skip if this doesn't look like a chart container
      if (!chartId) return;
      
      // Look for the chart instance
      let chartInstance = window.ApexCharts.getChartByID(chartId);
      if (!chartInstance) {
        // Try to find chart by ID without suffix
        const baseId = chartId.replace('-chart', '');
        chartInstance = window.ApexCharts.getChartByID(baseId);
      }
      
      // If we found a chart instance, check for trillion dollar values
      if (chartInstance && chartInstance.w) {
        let hasTrillionValues = false;
        let trillionYValue = 0;
        
        // Check if the chart has a trillion dollar value in its series
        if (chartInstance.w.globals.series) {
          const series = chartInstance.w.globals.series;
          const seriesType = chartInstance.w.config.chart.type;
          
          // Different chart types have different data structures
          if (seriesType === 'line' || seriesType === 'area' || seriesType === 'bar' || seriesType === 'column') {
            // For basic charts, look for values >= 1000 (which represents 1T)
            series.forEach(s => {
              if (Array.isArray(s)) {
                s.forEach(val => {
                  if (val >= 1000) {
                    hasTrillionValues = true;
                    trillionYValue = 1000; // 1 trillion
                  }
                });
              }
            });
          }
        }
        
        // Also check labels in case they contain trillion references
        if (chartInstance.w.globals.labels) {
          const labels = chartInstance.w.globals.labels;
          labels.forEach(label => {
            if (typeof label === 'string' && 
                (label.includes('trillion') || label.includes('Trillion') || label.includes('T'))) {
              hasTrillionValues = true;
            }
          });
        }
        
        // If we found trillion values, add or enhance the annotation
        if (hasTrillionValues) {
          enhancedCharts++;
          
          try {
            // Get current options
            const currentOptions = chartInstance.w.config;
            
            // Check if annotations already exist
            let hasExistingTrillionAnnotation = false;
            if (currentOptions.annotations && 
                currentOptions.annotations.yaxis && 
                Array.isArray(currentOptions.annotations.yaxis)) {
              
              hasExistingTrillionAnnotation = currentOptions.annotations.yaxis.some(a => 
                (a.label && a.label.text && a.label.text.includes('Trillion')) ||
                (a.label && a.label.text && a.label.text.includes('$1T'))
              );
            }
            
            // Only add if there's no existing trillion annotation
            if (!hasExistingTrillionAnnotation) {
              // Prepare new options with trillion annotation
              const newOptions = {
                annotations: {
                  yaxis: [{
                    y: trillionYValue || 1000, // Default to 1000 (1T) if we don't have a specific value
                    y2: null,
                    strokeDashArray: 5,
                    borderColor: '#65FF00',
                    fillColor: '#65FF00',
                    opacity: 0.2,
                    offsetX: 0,
                    offsetY: 0,
                    width: '100%',
                    label: {
                      borderColor: '#65FF00',
                      borderWidth: 1,
                      borderRadius: 2,
                      textAnchor: 'end',
                      position: 'right',
                      offsetX: -5,
                      offsetY: 0,
                      style: {
                        background: 'rgba(10, 10, 10, 0.85)',
                        color: '#65FF00',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        padding: {
                          left: 8,
                          right: 8,
                          top: 4,
                          bottom: 4
                        }
                      },
                      text: '$1 Trillion Milestone'
                    }
                  }]
                }
              };
              
              // Apply the new options
              chartInstance.updateOptions(newOptions, false, false);
              console.log(`✅ Added trillion dollar annotation to chart: ${chartId}`);
            } else {
              console.log(`ℹ️ Chart ${chartId} already has trillion annotation`);
            }
          } catch (err) {
            console.error(`Error enhancing chart ${chartId}:`, err);
          }
        }
      }
    });
    
    console.log(`🔍 Trillion dollar enhancement completed. Modified ${enhancedCharts} charts.`);
  }
})();
