/**
 * chartUtils.ts
 * Utility functions for ApexCharts implementation in QDaria Business Plan
 */

// Define chart color schemes
export const chartColors = {
  primary: ['#04a3ff', '#00ffd3', '#65ff00', '#7B61FF', '#FF6B6B'],
  secondary: ['#00A4EF', '#F5B700', '#9D73FE', '#00FFD3', '#FFCC00'],
  grayscale: ['#ffffff', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080'],
  highContrast: ['#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#ff0000']
};

// Default chart options for different chart types
export const getDefaultChartOptions = (chartType?: string) => {
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
    colors: chartColors.primary,
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

  // Chart type specific options
  switch (type) {
    case 'line':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: 'line'
        },
        stroke: {
          ...baseOptions.stroke,
          curve: 'smooth'
        },
        markers: {
          size: 4,
          strokeWidth: 0,
          hover: {
            size: 6
          }
        }
      };

    case 'area':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: 'area'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100]
          }
        }
      };

    case 'bar':
    case 'column':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: chartType
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            columnWidth: '70%',
            distributed: false,
            dataLabels: {
              position: 'top'
            }
          }
        }
      };

    case 'radar':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: 'radar'
        },
        plotOptions: {
          radar: {
            size: undefined,
            offsetX: 0,
            offsetY: 0,
            polygons: {
              strokeColors: 'rgba(255, 255, 255, 0.2)',
              strokeWidth: 1,
              connectorColors: 'rgba(255, 255, 255, 0.2)',
              fill: {
                colors: undefined
              }
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
      };

    case 'pie':
    case 'donut':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: chartType
        },
        plotOptions: {
          pie: {
            donut: {
              size: '50%',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '14px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#ffffff'
                },
                value: {
                  show: true,
                  fontSize: '16px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#ffffff'
                },
                total: {
                  show: true,
                  label: 'Total',
                  fontSize: '16px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#ffffff'
                }
              }
            }
          }
        },
        labels: [],
        legend: {
          position: 'bottom'
        }
      };

    case 'heatmap':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: 'heatmap'
        },
        plotOptions: {
          heatmap: {
            radius: 0,
            enableShades: true,
            shadeIntensity: 0.5,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 25,
                  color: chartColors.primary[0],
                  name: 'Low'
                },
                {
                  from: 26,
                  to: 50,
                  color: chartColors.primary[1],
                  name: 'Medium'
                },
                {
                  from: 51,
                  to: 75,
                  color: chartColors.primary[2],
                  name: 'High'
                },
                {
                  from: 76,
                  to: 100,
                  color: chartColors.primary[3],
                  name: 'Very High'
                }
              ]
            }
          }
        }
      };

    case 'timeline':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '50%',
            rangeBarGroupRows: true
          }
        },
        xaxis: {
          ...baseOptions.xaxis,
          type: 'datetime'
        }
      };

    default:
      return baseOptions;
  }
};

// Data table utilities
export const toggleDataTable = (tableElement: HTMLElement, buttonElement: HTMLElement) => {
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
export const makeSelectable = (elements: HTMLElement[]) => {
  elements.forEach(element => {
    if (element) {
      element.style.userSelect = 'text';
      // Use string indexing for vendor prefixes
      (element.style as any)['-webkit-user-select'] = 'text';
      (element.style as any)['-ms-user-select'] = 'text';
      element.style.cursor = 'text';
    }
  });
};

// Format numbers for display
export const formatNumber = (value: number, format: string = 'standard') => {
  if (isNaN(value)) return '0';
  
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

// Generate a data table from chart data
export const generateDataTable = (
  series: Array<{name: string, data: Array<number|string>}>,
  categories: string[],
  tableElement: HTMLElement
) => {
  if (!tableElement) return;
  
  const tableContent = document.createElement('table');
  tableContent.className = 'chart-data-table-content';
  
  // Create header row
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  // Add empty cell for the top-left corner
  const cornerCell = document.createElement('th');
  headerRow.appendChild(cornerCell);
  
  // Add category headers
  categories.forEach(category => {
    const th = document.createElement('th');
    th.textContent = category;
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  tableContent.appendChild(thead);
  
  // Create body rows
  const tbody = document.createElement('tbody');
  
  series.forEach(s => {
    const row = document.createElement('tr');
    
    // Add series name as row header
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.textContent = s.name;
    row.appendChild(th);
    
    // Add data cells
    s.data.forEach((value) => {
      const td = document.createElement('td');
      td.textContent = typeof value === 'number' ? value.toFixed(1) : String(value);
      row.appendChild(td);
    });
    
    tbody.appendChild(row);
  });
  
  tableContent.appendChild(tbody);
  
  // Clear existing content and append new table
  tableElement.innerHTML = '';
  tableElement.appendChild(tableContent);
};

// Initialize global chart utilities
export const initChartUtils = () => {
  // Make chart utils available globally
  window.chartUtils = {
    getDefaultChartOptions,
    toggleDataTable,
    makeSelectable,
    formatNumber,
    generateDataTable,
    colors: chartColors
  };
  
  // Add event listener for ApexCharts loaded
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ApexCharts !== 'undefined') {
      const event = new Event('ApexChartsLoaded');
      window.dispatchEvent(event);
    } else {
      // If ApexCharts is not loaded yet, wait for it
      const checkApexCharts = setInterval(() => {
        if (typeof window.ApexCharts !== 'undefined') {
          clearInterval(checkApexCharts);
          const event = new Event('ApexChartsLoaded');
          window.dispatchEvent(event);
        }
      }, 100);
    }
  });
};

// Initialize chart utils
initChartUtils();
