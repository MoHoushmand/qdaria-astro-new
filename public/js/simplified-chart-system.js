/**
 * QDaria Business Plan - Simplified Unified Chart System
 * A streamlined version that focuses on core functionality without complex error-handling
 */

(function() {
  console.log('🚀 QDaria Simplified Chart System initializing');
  
  // Store reference to original ApexCharts constructor
  const OriginalApexCharts = window.ApexCharts;
  
  // Common chart configuration options for different chart types
  const chartOptions = {
    chart: {
      fontFamily: 'Inter, Arial, sans-serif',
      foreColor: 'rgba(255, 255, 255, 0.8)',
      background: 'transparent',
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
        speed: 600
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 3,
        left: 2,
        top: 2
      }
    },
    theme: {
      mode: 'dark',
      palette: 'palette1'
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      size: 4,
      colors: undefined,
      strokeWidth: 0,
      hover: {
        size: 6
      }
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, Arial, sans-serif'
      }
    },
    xaxis: {
      labels: {
        style: {
          colors: 'rgba(255, 255, 255, 0.8)',
          fontSize: '12px',
          fontFamily: 'Inter, Arial, sans-serif'
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
          colors: 'rgba(255, 255, 255, 0.8)',
          fontSize: '12px',
          fontFamily: 'Inter, Arial, sans-serif'
        },
        formatter: function(val) {
          // Add suffix based on value size
          if (val >= 1000000000000) {
            return (val / 1000000000000).toFixed(1) + 'T';
          } else if (val >= 1000000000) {
            return (val / 1000000000).toFixed(1) + 'B';
          } else if (val >= 1000000) {
            return (val / 1000000).toFixed(1) + 'M';
          } else if (val >= 1000) {
            return (val / 1000).toFixed(1) + 'K';
          }
          return val.toFixed(0);
        }
      }
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, Arial, sans-serif',
        colors: ['#fff']
      },
      background: {
        enabled: true,
        borderRadius: 2,
        borderWidth: 0,
        dropShadow: {
          enabled: false
        }
      }
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: 'Inter, Arial, sans-serif',
      labels: {
        colors: 'rgba(255, 255, 255, 0.9)'
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        opacityFrom: 0.8,
        opacityTo: 0.2
      }
    },
    annotations: {
      yaxis: [
        {
          y: 1000000000000,
          borderColor: '#65FF00',
          label: {
            style: {
              color: '#fff',
              background: 'rgba(101, 255, 0, 0.5)'
            },
            text: '$1 Trillion Milestone'
          }
        }
      ]
    }
  };
  
  // Ensure data tables are visible by default
  function showDataTables() {
    document.querySelectorAll('.chart-data-table').forEach(table => {
      table.style.display = 'block';
      table.classList.add('visible');
    });
    
    document.querySelectorAll('.chart-data-table-btn').forEach(btn => {
      btn.textContent = 'Hide Data Table';
      btn.setAttribute('aria-expanded', 'true');
    });
  }
  
  // Create static data tables from sample data
  function createStaticDataTable(chartId, title) {
    const tableId = `${chartId}-data-table`;
    const tableContainer = document.getElementById(tableId);
    
    if (!tableContainer) {
      // Find chart container
      const chartContainer = document.getElementById(chartId) || document.getElementById(`${chartId}-chart`);
      if (!chartContainer || !chartContainer.parentNode) return;
      
      // Create basic table HTML with sample data
      const tableHtml = `
        <div class="data-table-header">
          <span class="data-table-title">Data Table: ${title || chartId}</span>
          <button type="button" class="data-table-close-btn" aria-label="Close data table">×</button>
        </div>
        <div class="data-table-content">
          <table class="chart-data-table-content">
            <thead>
              <tr>
                <th>Year</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>2025</td><td>1.5B</td></tr>
              <tr><td>2026</td><td>5.2B</td></tr>
              <tr><td>2027</td><td>20.7B</td></tr>
              <tr><td>2028</td><td>45.3B</td></tr>
              <tr><td>2029</td><td>102.1B</td></tr>
              <tr><td>2030</td><td>251.8B</td></tr>
              <tr><td>2031</td><td>425.6B</td></tr>
              <tr><td>2032</td><td>632.4B</td></tr>
              <tr><td>2033</td><td>781.2B</td></tr>
              <tr><td>2034</td><td>924.5B</td></tr>
              <tr><td>2035</td><td>1.12T</td></tr>
            </tbody>
          </table>
        </div>
      `;
      
      // Create a new table container
      const newTable = document.createElement('div');
      newTable.id = tableId;
      newTable.className = 'chart-data-table visible';
      newTable.innerHTML = tableHtml;
      newTable.style.display = 'block';
      
      // Insert after chart
      chartContainer.parentNode.insertBefore(newTable, chartContainer.nextSibling);
    }
  }
  
  // Create SVG fallbacks for charts
  function createSVGFallback(chartId) {
    const container = document.getElementById(`${chartId}-chart`) || document.getElementById(chartId);
    if (!container) return;
    
    // Create basic SVG fallback
    const svgContent = `
      <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <style>
          .title{font-family:Inter,Arial,sans-serif;font-size:16px;font-weight:bold;fill:#fff}
          .line{stroke:#04a3ff;stroke-width:2.5;fill:none}
          .area{fill:url(#areaGradient);fill-opacity:0.8}
          .dot{fill:#04a3ff;stroke:#1e293b;stroke-width:1.5}
          .milestone{stroke:rgba(101,255,0,0.9);stroke-width:1.5;stroke-dasharray:3,3}
          .milestone-text{font-family:Inter,Arial,sans-serif;font-size:10px;fill:#65ff00;font-weight:bold}
          .label{font-family:Inter,Arial,sans-serif;font-size:10px;fill:rgba(255,255,255,0.9)}
        </style>
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#04a3ff" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#04a3ff" stop-opacity="0.05"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="#1e293b" rx="4" />
        <text x="400" y="30" text-anchor="middle" class="title">QDaria Business Intelligence</text>
        
        <g transform="translate(50, 50)">
          <!-- $1T milestone marker -->
          <line x1="0" y1="50" x2="700" y2="50" class="milestone" />
          <text x="10" y="45" class="milestone-text">$1 Trillion Milestone</text>
          
          <!-- Area chart -->
          <path d="M0,250 L0,230 L100,215 L200,195 L300,160 L400,120 L500,90 L600,65 L700,50 L700,250 Z" class="area" />
          <path d="M0,230 L100,215 L200,195 L300,160 L400,120 L500,90 L600,65 L700,50" class="line" />
          
          <!-- Data points -->
          <circle cx="0" cy="230" r="4" class="dot" />
          <circle cx="100" cy="215" r="4" class="dot" />
          <circle cx="200" cy="195" r="4" class="dot" />
          <circle cx="300" cy="160" r="4" class="dot" />
          <circle cx="400" cy="120" r="4" class="dot" />
          <circle cx="500" cy="90" r="4" class="dot" />
          <circle cx="600" cy="65" r="4" class="dot" />
          <circle cx="700" cy="50" r="4" class="dot" />
          
          <!-- X-axis labels -->
          <text x="0" y="270" text-anchor="middle" class="label">2025</text>
          <text x="100" y="270" text-anchor="middle" class="label">2026</text>
          <text x="200" y="270" text-anchor="middle" class="label">2027</text>
          <text x="300" y="270" text-anchor="middle" class="label">2028</text>
          <text x="400" y="270" text-anchor="middle" class="label">2029</text>
          <text x="500" y="270" text-anchor="middle" class="label">2030</text>
          <text x="600" y="270" text-anchor="middle" class="label">2033</text>
          <text x="700" y="270" text-anchor="middle" class="label">2035</text>
        </g>
      </svg>
    `;
    
    // Set container styles
    container.style.minHeight = '400px';
    container.style.width = '100%';
    container.style.display = 'block';
    container.style.position = 'relative';
    
    // Insert SVG content
    container.innerHTML = svgContent;
  }
  
  // Initialize all business plan charts
  function initializeAllCharts() {
    // Show all data tables by default
    showDataTables();
    
    // Create static data tables and SVG fallbacks for all charts
    document.querySelectorAll('.chart-container, [id$="-chart"]').forEach(container => {
      if (!container.id) return;
      
      const chartId = container.id.replace('-chart', '');
      createStaticDataTable(chartId, getChartTitle(chartId));
      createSVGFallback(chartId);
    });
    
    console.log('✅ All charts have been initialized with fallbacks and data tables');
  }
  
  // Get chart title from container or make one up based on ID
  function getChartTitle(chartId) {
    // Try to find title element
    const parent = document.getElementById(chartId);
    if (parent) {
      const titleEl = parent.querySelector('.chart-title');
      if (titleEl && titleEl.textContent) {
        return titleEl.textContent;
      }
    }
    
    // Make up a title based on ID
    const cleanId = chartId
      .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .replace('Chart', '') // Remove "Chart" suffix
      .trim();
    
    return cleanId || 'Chart Data';
  }
  
  // Run initialization on page load
  window.addEventListener('DOMContentLoaded', initializeAllCharts);
  
  // Also run after a short delay to catch any late-loading charts
  setTimeout(initializeAllCharts, 1000);
})();
