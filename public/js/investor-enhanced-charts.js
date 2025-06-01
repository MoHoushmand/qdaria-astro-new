/**
 * Investor-Enhanced Charts
 * High-quality chart enhancements optimized for investor presentations
 * Focused on visual excellence, interactivity, and reliable rendering
 */

(function() {
  // Configuration
  const CONFIG = {
    // Color palettes optimized for investor presentations
    COLORS: {
      primary: ['#04A3FF', '#0075FF', '#00C2FF', '#00D8FF', '#00E8FF'],
      secondary: ['#9D73FE', '#7B5CFF', '#B797FF', '#D4BBFF', '#E5D4FF'],
      accent: ['#F5B700', '#FFD000', '#FFAA00', '#FF8A00', '#FF6D00'],
      success: ['#00D085', '#00E490', '#00F29E', '#00FF9C', '#7AFFCC'],
      neutral: ['#171F2A', '#1E293B', '#334155', '#475569', '#64748B']
    },
    // Chart types and their preferred styling
    CHART_TYPES: {
      area: {
        fillOpacity: 0.7,
        strokeWidth: 3,
        curveType: 'smooth'
      },
      line: {
        strokeWidth: 3,
        curveType: 'smooth'
      },
      radar: {
        fillOpacity: 0.6,
        strokeWidth: 2.5
      },
      bar: {
        borderRadius: 4,
        columnWidth: '70%'
      },
      donut: {
        size: '65%',
        expandOnClick: true
      }
    },
    // Special thresholds for visual emphasis
    THRESHOLDS: {
      trillion: 1000 // $1 Trillion milestone
    }
  };
  
  // Business plan chart IDs to enhance
  const CHART_IDS = [
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
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Load enhanced chart styles
    loadEnhancedStyles();
    
    // Apply initial chart enhancements
    enhanceAllCharts();
    
    // Set up listeners for dynamic content
    setupDynamicListeners();
    
    console.log('🚀 Investor-Enhanced Charts: Initialization complete');
  });
  
  // Load enhanced chart styles
  function loadEnhancedStyles() {
    // Check if styles already loaded
    if (document.getElementById('investor-enhanced-styles')) {
      return;
    }
    
    // Create style link
    const link = document.createElement('link');
    link.id = 'investor-enhanced-styles';
    link.rel = 'stylesheet';
    link.href = '/styles/investor-enhanced/chart-visuals.css';
    
    // Add to head
    document.head.appendChild(link);
    
    console.log('💅 Investor-Enhanced Charts: Premium styles loaded');
  }
  
  // Enhance all charts
  function enhanceAllCharts() {
    // Process each chart ID
    CHART_IDS.forEach(function(chartId) {
      setTimeout(() => {
        enhanceChart(chartId);
      }, 100);
    });
  }
  
  // Enhance a single chart
  function enhanceChart(chartId) {
    // Get chart container
    const chartContainer = document.getElementById(chartId);
    if (!chartContainer) {
      return;
    }
    
    console.log(`🔍 Enhancing chart: ${chartId}`);
    
    // Remove loading indicators
    removeLoadingIndicators(chartContainer, chartId);
    
    // Ensure data table is visible
    ensureDataTableVisible(chartContainer, chartId);
    
    // If ApexCharts is available, enhance with premium options
    if (typeof ApexCharts !== 'undefined') {
      enhanceApexChart(chartId, chartContainer);
    } else {
      // Otherwise, apply fallback SVG styling
      applyFallbackStyling(chartId, chartContainer);
    }
    
    // Add trillion milestone if applicable
    addTrillionMilestone(chartId);
    
    // Make elements properly selectable
    makeSelectableElements(chartContainer);
    
    // Apply accessibility enhancements
    applyAccessibilityEnhancements(chartContainer, chartId);
  }
  
  // Remove loading indicators
  function removeLoadingIndicators(container, chartId) {
    // Direct loading element
    const loadingElem = document.getElementById(`${chartId}-loading`);
    if (loadingElem) {
      loadingElem.style.display = 'none';
      loadingElem.setAttribute('aria-hidden', 'true');
    }
    
    // Generic loading elements
    const loadingElements = container.querySelectorAll('.chart-loading, .loading-spinner');
    loadingElements.forEach(el => {
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    });
    
    // Remove placeholder class that might show loading state
    container.classList.remove('chart-placeholder');
  }
  
  // Ensure data table is visible
  function ensureDataTableVisible(container, chartId) {
    // Find data table element
    const dataTable = document.getElementById(`${chartId}-data-table`);
    if (!dataTable) {
      return;
    }
    
    // Make sure it's visible
    dataTable.style.display = 'block';
    dataTable.style.visibility = 'visible';
    dataTable.style.opacity = '1';
    dataTable.classList.add('visible');
    dataTable.setAttribute('aria-hidden', 'false');
    
    // If there's a toggle button, update its state
    const toggleBtn = container.querySelector('.chart-data-table-btn');
    if (toggleBtn) {
      toggleBtn.textContent = 'Hide Data Table';
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  }
  
  // Enhance ApexChart with premium options
  function enhanceApexChart(chartId, container) {
    // Check for existing chart instance
    const chartInstance = window[`${chartId}-instance`];
    if (!chartInstance || typeof chartInstance.updateOptions !== 'function') {
      console.log(`No ApexCharts instance found for ${chartId}`);
      return;
    }
    
    // Determine chart type
    const chartType = determineChartType(chartId, container);
    console.log(`📊 Determined chart type: ${chartType} for ${chartId}`);
    
    // Get type-specific settings
    const typeSettings = CONFIG.CHART_TYPES[chartType] || {};
    
    // Premium visual enhancements
    const enhancedOptions = {
      chart: {
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
        },
        background: 'transparent',
        foreColor: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
        toolbar: {
          show: true
        }
      },
      colors: CONFIG.COLORS.primary,
      stroke: {
        width: typeSettings.strokeWidth || 2,
        curve: typeSettings.curveType || 'straight'
      },
      fill: {
        opacity: typeSettings.fillOpacity || 0.8,
        gradient: {
          enabled: true,
          shadeIntensity: 1,
          opacityFrom: typeSettings.fillOpacity || 0.8,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      },
      markers: {
        size: 5,
        strokeWidth: 0,
        hover: {
          size: 7,
          sizeOffset: 3
        }
      },
      tooltip: {
        theme: 'dark',
        shared: true,
        intersect: false,
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }
      },
      grid: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetY: 10,
        labels: {
          colors: '#ffffff'
        },
        onItemHover: {
          highlightDataSeries: true
        }
      }
    };
    
    // Specific options for bar/column charts
    if (chartType === 'bar' || chartType === 'column') {
      enhancedOptions.plotOptions = {
        bar: {
          borderRadius: typeSettings.borderRadius || 4,
          columnWidth: typeSettings.columnWidth || '70%',
          dataLabels: {
            position: 'top'
          }
        }
      };
    }
    
    // Specific options for pie/donut charts
    if (chartType === 'pie' || chartType === 'donut') {
      enhancedOptions.plotOptions = {
        pie: {
          donut: {
            size: typeSettings.size || '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontWeight: 600
              },
              value: {
                show: true,
                fontWeight: 700
              },
              total: {
                show: true,
                label: 'Total',
                fontWeight: 700
              }
            }
          },
          expandOnClick: typeSettings.expandOnClick !== false
        }
      };
    }
    
    // Update chart options
    chartInstance.updateOptions(enhancedOptions, false, true);
    
    console.log(`✨ Enhanced ApexChart: ${chartId}`);
  }
  
  // Apply fallback styling if ApexCharts failed to load
  function applyFallbackStyling(chartId, container) {
    // Get chart visualization container
    const chartViz = document.getElementById(`${chartId}-chart`);
    if (!chartViz) {
      return;
    }
    
    // Check if there's already an SVG fallback
    if (chartViz.querySelector('svg.chart-fallback-svg')) {
      return;
    }
    
    // If chart is empty (no ApexCharts canvas), add SVG fallback
    if (!chartViz.querySelector('.apexcharts-canvas')) {
      console.log(`📉 Adding SVG fallback for ${chartId}`);
      
      // Get chart type
      const chartType = determineChartType(chartId, container);
      
      // Add SVG fallback based on chart type
      const fallbackSvg = createFallbackSvg(chartId, chartType);
      chartViz.innerHTML = '';
      chartViz.appendChild(fallbackSvg);
    }
  }
  
  // Create fallback SVG visualization
  function createFallbackSvg(chartId, chartType) {
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '300');
    svg.setAttribute('viewBox', '0 0 800 300');
    svg.setAttribute('class', 'chart-fallback-svg');
    
    // Create gradient definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', `${chartId}-gradient`);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');
    
    // Add gradient stops
    const colors = CONFIG.COLORS.primary;
    [0, 50, 100].forEach((offset, i) => {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('offset', `${offset}%`);
      stop.setAttribute('style', `stop-color:${colors[i % colors.length]};stop-opacity:0.7`);
      gradient.appendChild(stop);
    });
    
    // Add filter for glow effect
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', `${chartId}-glow`);
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '3');
    feGaussianBlur.setAttribute('result', 'blur');
    filter.appendChild(feGaussianBlur);
    
    const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    feComposite.setAttribute('in', 'SourceGraphic');
    feComposite.setAttribute('in2', 'blur');
    feComposite.setAttribute('operator', 'over');
    filter.appendChild(feComposite);
    
    defs.appendChild(gradient);
    defs.appendChild(filter);
    svg.appendChild(defs);
    
    // Add background
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', '100%');
    background.setAttribute('height', '100%');
    background.setAttribute('fill', '#1e293b');
    background.setAttribute('opacity', '0.3');
    svg.appendChild(background);
    
    // Add chart type specific visualization
    if (chartType === 'area' || chartId.includes('Market') || chartId.includes('Forecast')) {
      // Area chart visualization
      addAreaChartSvg(svg, chartId);
    } else if (chartType === 'radar' || chartId.includes('Competitor') || chartId.includes('SWOT')) {
      // Radar chart visualization
      addRadarChartSvg(svg, chartId);
    } else if (chartType === 'bar' || chartType === 'column' || chartId.includes('Investment')) {
      // Bar chart visualization
      addBarChartSvg(svg, chartId);
    } else if (chartType === 'pie' || chartType === 'donut' || chartId.includes('Allocation')) {
      // Pie chart visualization
      addPieChartSvg(svg, chartId);
    } else {
      // Generic line chart
      addLineChartSvg(svg, chartId);
    }
    
    // Add message about data table
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '50%');
    text.setAttribute('y', '15%');
    text.setAttribute('font-family', 'Inter, system-ui, sans-serif');
    text.setAttribute('font-size', '14');
    text.setAttribute('fill', '#ffffff');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = 'Interactive chart data available in table below';
    svg.appendChild(text);
    
    return svg;
  }
  
  // Add area chart SVG visualization
  function addAreaChartSvg(svg, chartId) {
    // Area path
    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    areaPath.setAttribute('d', 'M50,250 Q200,100 400,190 Q600,280 750,150 L750,290 L50,290 Z');
    areaPath.setAttribute('fill', `url(#${chartId}-gradient)`);
    areaPath.setAttribute('opacity', '0.7');
    areaPath.setAttribute('filter', `url(#${chartId}-glow)`);
    svg.appendChild(areaPath);
    
    // Line on top
    const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    linePath.setAttribute('d', 'M50,250 Q200,100 400,190 Q600,280 750,150');
    linePath.setAttribute('stroke', `url(#${chartId}-gradient)`);
    linePath.setAttribute('stroke-width', '3');
    linePath.setAttribute('fill', 'none');
    svg.appendChild(linePath);
    
    // Add data points
    [50, 200, 400, 600, 750].forEach((x, i) => {
      const y = i === 0 ? 250 : i === 1 ? 100 : i === 2 ? 190 : i === 3 ? 280 : 150;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', '6');
      circle.setAttribute('fill', CONFIG.COLORS.primary[i % CONFIG.COLORS.primary.length]);
      circle.setAttribute('stroke', '#ffffff');
      circle.setAttribute('stroke-width', '2');
      svg.appendChild(circle);
    });
    
    // Add trillion milestone if appropriate
    if (chartId.includes('Market') || chartId.includes('Forecast')) {
      // $1T line
      const trilLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      trilLine.setAttribute('x1', '50');
      trilLine.setAttribute('y1', '150');
      trilLine.setAttribute('x2', '750');
      trilLine.setAttribute('y2', '150');
      trilLine.setAttribute('stroke', CONFIG.COLORS.success[0]);
      trilLine.setAttribute('stroke-width', '2');
      trilLine.setAttribute('stroke-dasharray', '5,5');
      svg.appendChild(trilLine);
      
      // $1T label
      const trilLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      trilLabel.setAttribute('x', '700');
      trilLabel.setAttribute('y', '145');
      trilLabel.setAttribute('fill', CONFIG.COLORS.success[0]);
      trilLabel.setAttribute('font-size', '12');
      trilLabel.setAttribute('font-weight', 'bold');
      trilLabel.setAttribute('text-anchor', 'end');
      trilLabel.textContent = '$1 Trillion Milestone';
      svg.appendChild(trilLabel);
    }
  }
  
  // Add radar chart SVG visualization
  function addRadarChartSvg(svg, chartId) {
    // Center of the radar
    const centerX = 400;
    const centerY = 150;
    
    // Add concentric circles
    [80, 60, 40, 20].forEach(radius => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', centerX.toString());
      circle.setAttribute('cy', centerY.toString());
      circle.setAttribute('r', radius.toString());
      circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
      circle.setAttribute('stroke-width', '1');
      circle.setAttribute('fill', 'none');
      svg.appendChild(circle);
    });
    
    // Add radar axes (6 points)
    const axisLabels = ['Technology', 'Market Share', 'Innovation', 'Growth', 'Capital', 'Talent'];
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const x2 = centerX + Math.sin(angle) * 80;
      const y2 = centerY - Math.cos(angle) * 80;
      
      // Axis line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', centerX.toString());
      line.setAttribute('y1', centerY.toString());
      line.setAttribute('x2', x2.toString());
      line.setAttribute('y2', y2.toString());
      line.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
      
      // Label
      const labelX = centerX + Math.sin(angle) * 95;
      const labelY = centerY - Math.cos(angle) * 95;
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', labelX.toString());
      text.setAttribute('y', labelY.toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '12');
      text.textContent = axisLabels[i];
      svg.appendChild(text);
    }
    
    // Add radar polygon
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      // Random radius between 20 and 80
      const r = 20 + Math.random() * 60;
      const x = centerX + Math.sin(angle) * r;
      const y = centerY - Math.cos(angle) * r;
      points.push(`${x},${y}`);
    }
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', points.join(' '));
    polygon.setAttribute('fill', `url(#${chartId}-gradient)`);
    polygon.setAttribute('fill-opacity', '0.6');
    polygon.setAttribute('stroke', CONFIG.COLORS.primary[0]);
    polygon.setAttribute('stroke-width', '2');
    svg.appendChild(polygon);
    
    // Add data points at vertices
    points.forEach(point => {
      const [x, y] = point.split(',');
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', 'white');
      svg.appendChild(circle);
    });
  }
  
  // Add bar chart SVG visualization
  function addBarChartSvg(svg, chartId) {
    // Bar chart constants
    const barWidth = 70;
    const barGap = 40;
    const maxHeight = 200;
    const baselineY = 270;
    
    // Add horizontal grid lines
    [0, 1, 2, 3, 4].forEach(i => {
      const y = baselineY - i * 50;
      
      // Grid line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '50');
      line.setAttribute('y1', y.toString());
      line.setAttribute('x2', '750');
      line.setAttribute('y2', y.toString());
      line.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
      
      // Y-axis label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '45');
      text.setAttribute('y', y.toString());
      text.setAttribute('text-anchor', 'end');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '12');
      text.textContent = i === 0 ? '0' : i === 4 ? '100%' : `${i * 25}%`;
      svg.appendChild(text);
    });
    
    // Generate random data
    const barCount = 5;
    const data = Array.from({ length: barCount }, () => Math.random() * maxHeight);
    
    // Calculate positioning
    const totalWidth = barCount * barWidth + (barCount - 1) * barGap;
    const startX = (800 - totalWidth) / 2;
    
    // Add bars
    data.forEach((height, index) => {
      const x = startX + index * (barWidth + barGap);
      const y = baselineY - height;
      
      // Bar rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x.toString());
      rect.setAttribute('y', y.toString());
      rect.setAttribute('width', barWidth.toString());
      rect.setAttribute('height', height.toString());
      rect.setAttribute('rx', '4');
      rect.setAttribute('fill', CONFIG.COLORS.primary[index % CONFIG.COLORS.primary.length]);
      svg.appendChild(rect);
      
      // Value label on top
      const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      valueText.setAttribute('x', (x + barWidth / 2).toString());
      valueText.setAttribute('y', (y - 10).toString());
      valueText.setAttribute('text-anchor', 'middle');
      valueText.setAttribute('fill', 'white');
      valueText.setAttribute('font-size', '12');
      valueText.setAttribute('font-weight', 'bold');
      valueText.textContent = `${Math.round(height / maxHeight * 100)}%`;
      svg.appendChild(valueText);
      
      // X-axis label
      const xText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      xText.setAttribute('x', (x + barWidth / 2).toString());
      xText.setAttribute('y', (baselineY + 15).toString());
      xText.setAttribute('text-anchor', 'middle');
      xText.setAttribute('fill', 'white');
      xText.setAttribute('font-size', '12');
      xText.textContent = ['Q1', 'Q2', 'Q3', 'Q4', 'Target'][index];
      svg.appendChild(xText);
    });
  }
  
  // Add pie chart SVG visualization
  function addPieChartSvg(svg, chartId) {
    const centerX = 400;
    const centerY = 150;
    const radius = 80;
    
    // Generate random segments (4 segments)
    const segments = 4;
    let startAngle = 0;
    
    for (let i = 0; i < segments; i++) {
      // Random angle between 0.2 and 0.4 of a circle
      const angle = (0.2 + Math.random() * 0.2) * Math.PI * 2;
      const endAngle = startAngle + angle;
      
      // Calculate arc path
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);
      
      const largeArcFlag = angle > Math.PI ? 1 : 0;
      
      // Create pie segment path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`);
      path.setAttribute('fill', CONFIG.COLORS.primary[i % CONFIG.COLORS.primary.length]);
      svg.appendChild(path);
      
      // Add label
      const labelAngle = startAngle + angle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + labelRadius * Math.cos(labelAngle);
      const labelY = centerY + labelRadius * Math.sin(labelAngle);
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', labelX.toString());
      text.setAttribute('y', labelY.toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-weight', 'bold');
      text.textContent = `${Math.round(angle / (Math.PI * 2) * 100)}%`;
      svg.appendChild(text);
      
      // Move to next segment
      startAngle = endAngle;
    }
    
    // Add center circle for donut effect
    const donutHole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    donutHole.setAttribute('cx', centerX.toString());
    donutHole.setAttribute('cy', centerY.toString());
    donutHole.setAttribute('r', '40');
    donutHole.setAttribute('fill', '#1e293b');
    svg.appendChild(donutHole);
    
    // Add total in center
    const totalText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    totalText.setAttribute('x', centerX.toString());
    totalText.setAttribute('y', centerY.toString());
    totalText.setAttribute('text-anchor', 'middle');
    totalText.setAttribute('dominant-baseline', 'middle');
    totalText.setAttribute('fill', 'white');
    totalText.setAttribute('font-size', '14');
    totalText.setAttribute('font-weight',
