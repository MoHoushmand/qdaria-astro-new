// chartFix.js - Fix for ApexCharts loading issues

// Define global chartUtils namespace
window.chartUtils = window.chartUtils || {};

// Chart color schemes
window.chartUtils.colors = {
  primary: ['#04a3ff', '#00ffd3', '#65ff00', '#7B61FF', '#FF6B6B'],
  secondary: ['#00A4EF', '#F5B700', '#9D73FE', '#00FFD3', '#FFCC00'],
  grayscale: ['#ffffff', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080'],
  highContrast: ['#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#ff0000']
};

// Toggle data table utility
window.chartUtils.toggleDataTable = function(tableElement, buttonElement) {
  if (!tableElement || !buttonElement) return;

  const isVisible = tableElement.classList.contains('visible');
  
  if (isVisible) {
    tableElement.classList.remove('visible');
    buttonElement.textContent = 'Show Data Table';
    buttonElement.setAttribute('aria-expanded', 'false');
    tableElement.setAttribute('aria-hidden', 'true');
  } else {
    tableElement.classList.add('visible');
    buttonElement.textContent = 'Hide Data Table';
    buttonElement.setAttribute('aria-expanded', 'true');
    tableElement.setAttribute('aria-hidden', 'false');
  }
};

// Make text elements selectable
window.chartUtils.makeSelectable = function(elements) {
  elements.forEach(element => {
    if (element) {
      element.style.userSelect = 'text';
      element.style['-webkit-user-select'] = 'text';
      element.style['-ms-user-select'] = 'text';
      element.style.cursor = 'text';
    }
  });
};

// Format numbers for display
window.chartUtils.formatNumber = function(value, format) {
  if (isNaN(value)) return '0';
  format = format || 'standard';
  
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
      
    case 'percent':
      return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }).format(value / 100);
      
    case 'compact':
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }).format(value);
      
    case 'trillion':
      return `$${(value / 1000000000000).toFixed(1)}T`;
      
    case 'billion':
      return `$${(value / 1000000000).toFixed(1)}B`;
      
    case 'million':
      return `$${(value / 1000000).toFixed(1)}M`;
      
    default:
      return new Intl.NumberFormat('en-US').format(value);
  }
};

// Default chart options
window.chartUtils.getDefaultChartOptions = function(chartType) {
  // Default to 'line' if no chart type is provided
  const type = chartType || 'line';
  const baseOptions = {
    chart: {
      fontFamily: 'Inter, system-ui, sans-serif',
      background: 'transparent',
      foreColor: '#ffffff',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    colors: window.chartUtils.colors.primary,
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10
      }
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontFamily: 'Inter, system-ui, sans-serif',
      offsetY: 5,
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      labels: {
        colors: '#ffffff'
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    },
    xaxis: {
      labels: {
        style: {
          colors: '#ffffff',
          fontSize: '12px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }
      },
      axisBorder: {
        show: true,
        color: 'rgba(255, 255, 255, 0.2)'
      },
      axisTicks: {
        show: true,
        color: 'rgba(255, 255, 255, 0.2)'
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
          fontSize: '12px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 350
          },
          legend: {
            position: 'bottom',
            offsetY: 0
          }
        }
      }
    ]
  };

  // Return custom options based on chart type
  switch (type) {
    case 'line':
      return Object.assign({}, baseOptions, {
        chart: Object.assign({}, baseOptions.chart, { type: 'line' }),
        stroke: Object.assign({}, baseOptions.stroke, { curve: 'smooth' }),
        markers: {
          size: 4,
          strokeWidth: 0,
          hover: {
            size: 6
          }
        }
      });
      
    case 'area':
      return Object.assign({}, baseOptions, {
        chart: Object.assign({}, baseOptions.chart, { type: 'area' }),
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100]
          }
        }
      });
      
    case 'radar':
      return Object.assign({}, baseOptions, {
        chart: Object.assign({}, baseOptions.chart, { type: 'radar' }),
        plotOptions: {
          radar: {
            size: undefined,
            offsetX: 0,
            offsetY: 0,
            polygons: {
              strokeColors: 'rgba(255, 255, 255, 0.2)',
              strokeWidth: 1,
              connectorColors: 'rgba(255, 255, 255, 0.2)'
            }
          }
        },
        markers: {
          size: 4,
          hover: {
            size: 6
          }
        },
        fill: {
          opacity: 0.2
        }
      });
      
    // Add more chart types as needed
      
    default:
      return baseOptions;
  }
};

// Define global chartUtils namespace
window.chartUtils = window.chartUtils || {};

// Enhanced Chart Fix Script with more robust loading indicator handling
let apexChartsLoaded = false;
let loadingTimeout;

// Force ApexCharts to initialize
document.addEventListener('DOMContentLoaded', function() {
  console.log("🔧 Enhanced Chart fix script loaded");
  
  // Immediately hide all loading indicators with a small delay to ensure they get created first
  setTimeout(function() {
    // First attempt to handle stuck indicators
    checkAndClearLoadingIndicators();
  }, 500);
  
  // Check for stuck indicators again after a longer delay
  setTimeout(function() {
    checkAndClearLoadingIndicators(true); // true = force clear
  }, 5000);
  
  // Check if ApexCharts loaded
  function checkApexChartsLoaded() {
    if (typeof ApexCharts !== 'undefined') {
      if (!apexChartsLoaded) {
        console.log("✅ ApexCharts library detected");
        apexChartsLoaded = true;
        document.dispatchEvent(new Event('ApexChartsLoaded'));
        
        // Clear any pending timeout
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
        }
        
        // Clear loading indicators once ApexCharts is confirmed loaded
        checkAndClearLoadingIndicators();
      }
      return true;
    }
    return false;
  }
  
  // Initial check
  if (checkApexChartsLoaded()) {
    console.log("✅ ApexCharts already loaded during page initialization");
  } else {
    console.log("⚠️ ApexCharts not found - verifying script tag");
    
    // Check if the script tag exists
    const existingScript = document.querySelector('script[src*="apexcharts"]');
    
    if (!existingScript) {
      console.log("⚠️ ApexCharts script tag not found - adding it dynamically");
      
      // Create a script tag to load ApexCharts
      const script = document.createElement('script');
      script.src = '/js/vendor/apexcharts.min.js';
      script.async = false;
      
      script.onload = function() {
        console.log("✅ ApexCharts loaded dynamically");
        apexChartsLoaded = true;
        document.dispatchEvent(new Event('ApexChartsLoaded'));
        checkAndClearLoadingIndicators();
      };
      
      script.onerror = function() {
        console.error("❌ Failed to load ApexCharts");
        handleChartLoadingErrors();
      };
      
      document.head.appendChild(script);
    } else {
      console.log("⚠️ ApexCharts script tag exists but library not loaded yet - waiting");
      
      // Set up a checker that periodically checks for ApexCharts
      let checkCount = 0;
      const maxChecks = 20; // Try for 10 seconds (20 * 500ms)
      
      const scriptLoadChecker = setInterval(function() {
        checkCount++;
        
        if (checkApexChartsLoaded()) {
          console.log("✅ ApexCharts loaded after waiting");
          clearInterval(scriptLoadChecker);
          checkAndClearLoadingIndicators();
        } else if (checkCount >= maxChecks) {
          console.error("❌ Gave up waiting for ApexCharts to load");
          clearInterval(scriptLoadChecker);
          handleChartLoadingErrors();
        }
      }, 500);
    }
  }
  
  // Check and clear any loading indicators
  function checkAndClearLoadingIndicators(forceClear = false) {
    console.log("🔍 Checking for loading indicators...");
    const loadingElements = document.querySelectorAll('.chart-loading');
    let clearedCount = 0;
    
    loadingElements.forEach(function(element) {
      if (element && (forceClear || element.style.display !== 'none')) {
        clearedCount++;
        element.style.display = 'none';
        
        // Mark as cleared
        element.setAttribute('data-cleared', 'true');
        
        console.log(`🔄 Cleared loading indicator for: ${element.id.replace('-loading', '')}`);
        
        // Check if chart container exists
        const parent = element.closest('.apex-chart-container');
        if (parent) {
          const chartContainer = parent.querySelector('.chart-container');
          if (chartContainer) {
            chartContainer.style.display = 'block';
          }
          
          // Show data table when loading indicator is cleared
          const dataTableBtn = parent.querySelector('.chart-data-table-btn');
          const dataTable = parent.querySelector('.chart-data-table');
          
          if (dataTableBtn && dataTable && !dataTable.classList.contains('visible')) {
            console.log(`📊 Showing data table for: ${parent.id}`);
            dataTable.classList.add('visible');
            dataTableBtn.textContent = 'Hide Data Table';
            dataTableBtn.setAttribute('aria-expanded', 'true');
            dataTable.setAttribute('aria-hidden', 'false');
          }
        }
      }
    });
    
    if (clearedCount > 0) {
      console.log(`🧹 Cleared ${clearedCount} loading indicators`);
    } else {
      console.log("✅ No stuck loading indicators found");
    }
  }
  
  // Handle stuck loading indicators and fallbacks
  loadingTimeout = setTimeout(function() {
    console.log("⚠️ Chart loading timeout reached, checking for stuck loading indicators");
    checkAndClearLoadingIndicators(true); // Force clear all indicators
  }, 8000); // Give charts 8 seconds to load
  
  // Handle errors for any chart placeholders
  function handleChartLoadingErrors() {
    document.querySelectorAll('.chart-placeholder, .chart-loading').forEach(function(element) {
      element.innerHTML = `
        <div class="chart-error-state" style="display: block; padding: 20px; text-align: center;">
          <div class="chart-error-icon">⚠️</div>
          <h4 class="chart-error-title">Chart Loading Error</h4>
          <p class="chart-error-message">Failed to load visualization library. Please check console for details.</p>
        </div>
      `;
    });
  }
  
  // Set up a MutationObserver to detect new chart placeholders being added to the DOM
  const observer = new MutationObserver(function(mutations) {
    let hasNewPlaceholders = false;
    
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check for newly added chart placeholders
          const newPlaceholders = node.querySelectorAll ? node.querySelectorAll('.chart-placeholder') : [];
          if (newPlaceholders.length > 0 || (node.classList && node.classList.contains('chart-placeholder'))) {
            hasNewPlaceholders = true;
          }
          
          // Also check for newly added loading indicators
          const newLoadingIndicators = node.querySelectorAll ? node.querySelectorAll('.chart-loading') : [];
          if (newLoadingIndicators.length > 0 || (node.classList && node.classList.contains('chart-loading'))) {
            // Clear any new loading indicators after a short delay
            setTimeout(function() {
              checkAndClearLoadingIndicators();
            }, 5000);
          }
        }
      });
    });
    
    if (hasNewPlaceholders) {
      console.log("🔄 New chart placeholder detected, triggering initialization");
      
      // Allow some time for the DOM to settle, then dispatch an event
      setTimeout(function() {
        document.dispatchEvent(new CustomEvent('newChartPlaceholdersAdded'));
        
        // Also check for loading indicators again
        checkAndClearLoadingIndicators();
      }, 2000);
    }
  });
  
  // Start observing the document body for added nodes
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Extra check for chart containers with no data (this will force show data tables for charts that don't load)
  setTimeout(function() {
    document.querySelectorAll('.apex-chart-container').forEach(function(container) {
      const chartContainer = container.querySelector('.chart-container');
      
      // If the chart has no content but has a data table, show the data table
      if (chartContainer && (!chartContainer.childNodes.length || chartContainer.childNodes.length < 2)) {
        const dataTableBtn = container.querySelector('.chart-data-table-btn');
        const dataTable = container.querySelector('.chart-data-table');
        
        if (dataTableBtn && dataTable && !dataTable.classList.contains('visible')) {
          console.log(`📊 Forcing data table display for empty chart: ${container.id}`);
          dataTable.classList.add('visible');
          dataTableBtn.textContent = 'Hide Data Table';
          dataTableBtn.setAttribute('aria-expanded', 'true');
          dataTable.setAttribute('aria-hidden', 'false');
          
          // Also make sure loading indicator is hidden
          const loadingElem = container.querySelector('.chart-loading');
          if (loadingElem) {
            loadingElem.style.display = 'none';
          }
        }
      }
    });
  }, 10000); // After 10 seconds
});
