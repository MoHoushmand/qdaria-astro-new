/**
 * QDaria Business Plan - Unified Chart System
 * 
 * This file replaces multiple emergency fixes with a single, cohesive system for:
 * 1. Chart initialization and rendering
 * 2. Data table generation and display
 * 3. Fallback rendering when charts fail
 * 4. Interactive features and accessibility
 */

(function() {
  console.log('🚀 QDaria Unified Chart System initializing');
  
  // Store original ApexCharts constructor if available
  const OriginalApexCharts = window.ApexCharts;
  
  // Chart type configurations with sample data for fallbacks
  const chartConfigs = {
    area: {
      height: 400,
      options: {
        chart: { type: 'area', stacked: false, toolbar: { show: true } },
        stroke: { curve: 'smooth', width: 2 },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.2 } },
        markers: { size: 4, strokeWidth: 0, hover: { size: 6 } },
        tooltip: { shared: true, intersect: false },
        annotations: {
          yaxis: [{ y: 1000000000000, borderColor: '#65FF00', label: { text: '$1 Trillion Milestone' } }]
        }
      }
    },
    radar: {
      height: 450,
      options: {
        chart: { type: 'radar', toolbar: { show: true } },
        stroke: { width: 2 },
        fill: { opacity: 0.5 },
        markers: { size: 4 },
        tooltip: { enabled: true }
      }
    },
    bar: {
      height: 450,
      options: {
        chart: { type: 'bar', toolbar: { show: true } },
        plotOptions: { bar: { borderRadius: 4, horizontal: false } },
        tooltip: { shared: true, intersect: false }
      }
    },
    line: {
      height: 400,
      options: {
        chart: { type: 'line', toolbar: { show: true } },
        stroke: { curve: 'smooth', width: 2 },
        markers: { size: 4 },
        tooltip: { shared: true, intersect: false }
      }
    },
    pie: {
      height: 450,
      options: {
        chart: { type: 'pie', toolbar: { show: true } },
        labels: [],
        legend: { position: 'bottom' },
        tooltip: { enabled: true },
        dataLabels: { enabled: true }
      }
    },
    donut: {
      height: 450,
      options: {
        chart: { type: 'donut', toolbar: { show: true } },
        labels: [],
        legend: { position: 'bottom' },
        tooltip: { enabled: true },
        dataLabels: { enabled: true }
      }
    },
    scatter: {
      height: 400,
      options: {
        chart: { type: 'scatter', toolbar: { show: true } },
        markers: { size: 6, strokeWidth: 1, hover: { size: 8 } },
        tooltip: { enabled: true }
      }
    },
    heatmap: {
      height: 450,
      options: {
        chart: { type: 'heatmap', toolbar: { show: true } },
        tooltip: { enabled: true },
        dataLabels: { enabled: false }
      }
    },
    timeline: {
      height: 500,
      options: {
        chart: { type: 'rangeBar', toolbar: { show: true } },
        plotOptions: { bar: { horizontal: true } },
        tooltip: { shared: false, intersect: true }
      }
    },
    mixed: {
      height: 500,
      options: {
        chart: { type: 'line', stacked: false, toolbar: { show: true } },
        stroke: { width: [0, 2, 2, 2], curve: 'smooth' },
        plotOptions: { bar: { columnWidth: '50%' } },
        markers: { size: 4 },
        tooltip: { shared: true, intersect: false }
      }
    },
    candlestick: {
      height: 450,
      options: {
        chart: { type: 'candlestick', toolbar: { show: true } },
        tooltip: { enabled: true },
        xaxis: { type: 'datetime' }
      }
    },
    boxplot: {
      height: 450,
      options: {
        chart: { type: 'boxPlot', toolbar: { show: true } },
        tooltip: { shared: false, intersect: true }
      }
    },
    treemap: {
      height: 450,
      options: {
        chart: { type: 'treemap', toolbar: { show: true } },
        tooltip: { enabled: true },
        dataLabels: { enabled: true }
      }
    },
    rangeArea: {
      height: 450,
      options: {
        chart: { type: 'rangeArea', toolbar: { show: true } },
        stroke: { curve: 'smooth', width: 2 },
        tooltip: { shared: true, intersect: false },
        annotations: {
          yaxis: [{ y: 1000000000000, borderColor: '#65FF00', label: { text: '$1 Trillion Milestone' } }]
        }
      }
    },
    polar: {
      height: 450,
      options: {
        chart: { type: 'polarArea', toolbar: { show: true } },
        stroke: { width: 1 },
        legend: { position: 'bottom' },
        fill: { opacity: 0.8 },
        tooltip: { enabled: true }
      }
    }
  };
  
  // Ensure all chart types have the $1 Trillion milestone
  Object.keys(chartConfigs).forEach(type => {
    if (!chartConfigs[type].options.annotations) {
      chartConfigs[type].options.annotations = {
        yaxis: [{ y: 1000000000000, borderColor: '#65FF00', label: { text: '$1 Trillion Milestone' } }]
      };
    }
  });
  
  // Base sample data for different chart types
  const sampleData = {
    area: [
      { name: 'Market Size', data: [1.5, 5, 20, 45, 100, 250, 500, 750, 950] }
    ],
    radar: [
      { name: 'QDaria', data: [80, 90, 85, 95, 75, 80] },
      { name: 'Competitors', data: [65, 55, 70, 60, 50, 45] }
    ],
    bar: [
      { name: 'Revenue', data: [44, 55, 57, 56, 61, 58, 63] }
    ],
    line: [
      { name: 'Revenue', data: [30, 40, 45, 50, 49, 60, 70, 91, 125] }
    ],
    pie: [44, 55, 13, 43, 22],
    donut: [44, 55, 13, 43, 22],
    scatter: [
      { name: 'Product A', data: [[10, 40], [20, 30], [30, 40], [40, 50], [50, 60]] }
    ],
    heatmap: [
      { name: 'Series 1', data: [10, 20, 30, 40, 50, 60, 70] }
    ],
    timeline: [
      { x: 'Planning', y: [new Date('2025-01-01').getTime(), new Date('2025-03-01').getTime()] },
      { x: 'Development', y: [new Date('2025-03-01').getTime(), new Date('2025-08-01').getTime()] },
      { x: 'Testing', y: [new Date('2025-08-01').getTime(), new Date('2025-10-01').getTime()] },
      { x: 'Deployment', y: [new Date('2025-10-01').getTime(), new Date('2025-12-01').getTime()] }
    ],
    mixed: [
      { name: 'Revenue', type: 'column', data: [30, 40, 45, 50, 49, 60] },
      { name: 'Profit', type: 'line', data: [5, 10, 15, 20, 25, 30] }
    ],
    treemap: [
      { data: [{ x: 'Division A', y: 400 }, { x: 'Division B', y: 200 }, { x: 'Division C', y: 300 }] }
    ]
  };
  
  // Default categories for x-axis
  const defaultCategories = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];
  
  // Chart utility functions
  const chartUtils = {
    // Generate data table HTML from series data
    generateDataTable: function(chartId, series, categories) {
      const tableId = `${chartId}-data-table`;
      let tableHtml = `
        <table class="chart-data-table-content" id="${tableId}-content">
          <thead>
            <tr>
              <th>Category</th>
      `;
      
      // Add headers for each series
      if (Array.isArray(series)) {
        series.forEach(s => {
          tableHtml += `<th>${s.name || 'Value'}</th>`;
        });
      } else {
        tableHtml += `<th>Value</th>`;
      }
      
      tableHtml += `
            </tr>
          </thead>
          <tbody>
      `;
      
      // Add rows for each category
      if (categories && Array.isArray(categories)) {
        categories.forEach((category, i) => {
          tableHtml += `<tr><td>${category}</td>`;
          
          if (Array.isArray(series)) {
            series.forEach(s => {
              const value = s.data[i] !== undefined ? s.data[i] : '-';
              tableHtml += `<td>${typeof value === 'object' ? JSON.stringify(value) : value}</td>`;
            });
          } else if (typeof series === 'object') {
            tableHtml += `<td>${series[i] || '-'}</td>`;
          }
          
          tableHtml += `</tr>`;
        });
      } else if (Array.isArray(series)) {
        // For non-category charts (like pie/donut)
        series.forEach((item, i) => {
          if (typeof item === 'object' && item.data) {
            item.data.forEach((dataPoint, j) => {
              const category = item.name ? `${item.name} ${j+1}` : `Item ${j+1}`;
              const value = typeof dataPoint === 'object' ? JSON.stringify(dataPoint) : dataPoint;
              tableHtml += `<tr><td>${category}</td><td>${value}</td></tr>`;
            });
          } else {
            tableHtml += `<tr><td>Item ${i+1}</td><td>${item}</td></tr>`;
          }
        });
      }
      
      tableHtml += `
          </tbody>
        </table>
      `;
      
      return tableHtml;
    },
    
    // Get chart type from element or parent classes
    getChartType: function(element) {
      if (!element) return 'line';
      
      let type = 'line'; // Default
      
      // Check element's classes
      if (element.classList) {
        for (const cls of element.classList) {
          if (cls.endsWith('-chart')) {
            const candidate = cls.replace('-chart', '');
            if (chartConfigs[candidate]) {
              return candidate;
            }
          }
        }
      }
      
      // Check parent's classes
      const parent = element.parentElement;
      if (parent && parent.classList) {
        for (const cls of parent.classList) {
          if (cls.endsWith('-chart')) {
            const candidate = cls.replace('-chart', '');
            if (chartConfigs[candidate]) {
              return candidate;
            }
          }
        }
      }
      
      // Extract from ID
      if (element.id) {
        const cleanId = element.id.replace('-chart', '');
        const mapping = {
          marketGrowth: 'area',
          competitorRadar: 'radar',
          swotAnalysis: 'radar',
          executionRoadmap: 'timeline',
          revenue: 'line',
          profitability: 'area',
          riskAssessment: 'radar',
          fundingAllocation: 'donut',
          investmentDistribution: 'bar',
          roiComparison: 'scatter',
          marketPositioning: 'bubble',
          revenueDiversification: 'treemap',
          stockPerformance: 'candlestick',
          competitorStrength: 'polar',
          quantumHardwareComparison: 'bar',
          financialMetricsMixed: 'mixed',
          forecastScenariosRange: 'rangeArea',
          topologicalTimeline: 'timeline',
          marketSizeProjections: 'area',
          organizational: 'treemap',
          quantumMarketForecast: 'area'
        };
        
        for (const key in mapping) {
          if (cleanId.includes(key)) {
            return mapping[key];
          }
        }
      }
      
      return type;
    },
    
    // Create fallback visualization
    createFallbackVisualization: function(chartId, chartType) {
      const type = chartType || this.getChartType(document.getElementById(chartId)) || 'line';
      const config = chartConfigs[type] || chartConfigs.line;
      
      // Create accessible SVG fallback
      const svgContent = this.generateFallbackSVG(type);
      
      // Find container and inject SVG
      const container = document.getElementById(`${chartId}-chart`) || document.getElementById(chartId);
      if (container) {
        container.innerHTML = svgContent;
        container.style.minHeight = `${config.height}px`;
        container.setAttribute('aria-label', `${type.charAt(0).toUpperCase() + type.slice(1)} chart with data table available below`);
      }
      
      // Make data table visible
      const dataTable = document.getElementById(`${chartId}-data-table`);
      if (dataTable) {
        dataTable.style.display = 'block';
        dataTable.classList.add('visible');
      }
      
      return true;
    },
    
    // Generate fallback SVG based on chart type
    generateFallbackSVG: function(chartType) {
      const type = chartType || 'line';
      
      // Common styles for all SVGs
      const svgStyles = `
        <style>
          .title{font-family:Inter,Arial,sans-serif;font-size:18px;font-weight:bold;fill:#fff}
          .subtitle{font-family:Inter,Arial,sans-serif;font-size:14px;fill:rgba(255,255,255,0.7)}
          .axis{stroke:rgba(255,255,255,0.3);stroke-width:1}
          .grid{stroke:rgba(255,255,255,0.1);stroke-width:1;stroke-dasharray:4}
          .line{stroke:#04a3ff;stroke-width:2.5;fill:none}
          .area{fill:url(#areaGradient);fill-opacity:0.8}
          .bar{fill:#04a3ff;stroke:none}
          .dot{fill:#04a3ff;stroke:#1e293b;stroke-width:1.5}
          .milestone{stroke:rgba(101,255,0,0.9);stroke-width:1.5;stroke-dasharray:3,3}
          .milestone-text{font-family:Inter,Arial,sans-serif;font-size:10px;fill:#65ff00;font-weight:bold}
          .label{font-family:Inter,Arial,sans-serif;font-size:10px;fill:rgba(255,255,255,0.9)}
          .note{font-family:Inter,Arial,sans-serif;font-size:12px;fill:rgba(255,255,255,0.6);font-style:italic}
        </style>
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#04a3ff" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#04a3ff" stop-opacity="0.05"/>
          </linearGradient>
        </defs>
      `;
      
      let svgContent = '';
      
      // Generate SVG based on chart type
      if (type === 'area' || type === 'rangeArea') {
        svgContent = `
          <svg width="100%" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Quantum Computing Market Growth</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(50, 70)">
              <!-- $1T milestone marker -->
              <line x1="0" y1="50" x2="700" y2="50" class="milestone" />
              <text x="10" y="45" class="milestone-text">$1 Trillion Milestone</text>
              
              <!-- Grid and axes -->
              <line x1="0" y1="50" x2="700" y2="50" class="grid" />
              <line x1="0" y1="100" x2="700" y2="100" class="grid" />
              <line x1="0" y1="150" x2="700" y2="150" class="grid" />
              <line x1="0" y1="200" x2="700" y2="200" class="grid" />
              <line x1="0" y1="0" x2="0" y2="220" class="axis" />
              <line x1="0" y1="200" x2="700" y2="200" class="axis" />
              
              <!-- Area chart -->
              <path d="M0,200 L0,180 L100,165 L200,145 L300,110 L400,70 L500,40 L600,25 L700,20 L700,200 Z" class="area" />
              <path d="M0,180 L100,165 L200,145 L300,110 L400,70 L500,40 L600,25 L700,20" class="line" />
              
              <!-- Data points -->
              <circle cx="0" cy="180" r="4" class="dot" />
              <circle cx="100" cy="165" r="4" class="dot" />
              <circle cx="200" cy="145" r="4" class="dot" />
              <circle cx="300" cy="110" r="4" class="dot" />
              <circle cx="400" cy="70" r="4" class="dot" />
              <circle cx="500" cy="40" r="4" class="dot" />
              <circle cx="600" cy="25" r="4" class="dot" />
              <circle cx="700" cy="20" r="4" class="dot" />
              
              <!-- X-axis labels -->
              <text x="0" y="220" text-anchor="middle" class="label">2025</text>
              <text x="100" y="220" text-anchor="middle" class="label">2026</text>
              <text x="200" y="220" text-anchor="middle" class="label">2027</text>
              <text x="300" y="220" text-anchor="middle" class="label">2028</text>
              <text x="400" y="220" text-anchor="middle" class="label">2029</text>
              <text x="500" y="220" text-anchor="middle" class="label">2030</text>
              <text x="600" y="220" text-anchor="middle" class="label">2033</text>
              <text x="700" y="220" text-anchor="middle" class="label">2035</text>
              
              <!-- Note about data table -->
              <text x="350" y="275" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'radar') {
        svgContent = `
          <svg width="100%" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Competitive Analysis</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(400, 230)">
              <!-- Radar circles -->
              <circle cx="0" cy="0" r="50" fill="none" class="grid" />
              <circle cx="0" cy="0" r="100" fill="none" class="grid" />
              <circle cx="0" cy="0" r="150" fill="none" class="grid" />
              
              <!-- Axis lines -->
              <line x1="0" y1="-150" x2="0" y2="150" class="axis" />
              <line x1="-150" y1="0" x2="150" y2="0" class="axis" />
              <line x1="-106" y1="-106" x2="106" y2="106" class="axis" />
              <line x1="106" y1="-106" x2="-106" y2="106" class="axis" />
              <line x1="-130" y1="-75" x2="130" y2="75" class="axis" />
              <line x1="130" y1="-75" x2="-130" y2="75" class="axis" />
              
              <!-- Data polygon -->
              <polygon points="0,-120 104,-60 104,60 0,120 -104,60 -104,-60" fill="rgba(4,163,255,0.3)" stroke="#04a3ff" stroke-width="2" />
              
              <!-- Category labels -->
              <text x="0" y="-165" text-anchor="middle" class="label">Technology</text>
              <text x="165" y="0" text-anchor="start" class="label">Market Share</text>
              <text x="120" y="100" text-anchor="middle" class="label">Funding</text>
              <text x="0" y="165" text-anchor="middle" class="label">Growth</text>
              <text x="-120" y="100" text-anchor="middle" class="label">Innovation</text>
              <text x="-165" y="0" text-anchor="end" class="label">Team</text>
              
              <!-- Note about data table -->
              <text x="0" y="200" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'bar' || type === 'column') {
        svgContent = `
          <svg width="100%" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Investment Distribution</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(50, 70)">
              <!-- $1T milestone marker -->
              <line x1="0" y1="50" x2="700" y2="50" class="milestone" />
              <text x="10" y="45" class="milestone-text">$1 Trillion Milestone</text>
              
              <!-- Grid and axes -->
              <line x1="0" y1="50" x2="700" y2="50" class="grid" />
              <line x1="0" y1="100" x2="700" y2="100" class="grid" />
              <line x1="0" y1="150" x2="700" y2="150" class="grid" />
              <line x1="0" y1="200" x2="700" y2="200" class="grid" />
              <line x1="0" y1="0" x2="0" y2="220" class="axis" />
              <line x1="0" y1="200" x2="700" y2="200" class="axis" />
              
              <!-- Bars -->
              <rect x="25" y="120" width="50" height="80" class="bar" />
              <rect x="125" y="90" width="50" height="110" class="bar" />
              <rect x="225" y="60" width="50" height="140" class="bar" />
              <rect x="325" y="40" width="50" height="160" class="bar" />
              <rect x="425" y="70" width="50" height="130" class="bar" />
              <rect x="525" y="110" width="50" height="90" class="bar" />
              <rect x="625" y="140" width="50" height="60" class="bar" />
              
              <!-- X-axis labels -->
              <text x="50" y="220" text-anchor="middle" class="label">Hardware</text>
              <text x="150" y="220" text-anchor="middle" class="label">Software</text>
              <text x="250" y="220" text-anchor="middle" class="label">Research</text>
              <text x="350" y="220" text-anchor="middle" class="label">Development</text>
              <text x="450" y="220" text-anchor="middle" class="label">Operations</text>
              <text x="550" y="220" text-anchor="middle" class="label">Marketing</text>
              <text x="650" y="220" text-anchor="middle" class="label">Other</text>
              
              <!-- Note about data table -->
              <text x="350" y="275" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'donut' || type === 'pie') {
        svgContent = `
          <svg width="100%" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Funding Allocation</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(400, 200)">
              <!-- Circle segments (simplified) -->
              <path d="M0,0 L0,-120 A120,120 0 0,1 104,-60 Z" fill="#04a3ff" />
              <path d="M0,0 L104,-60 A120,120 0 0,1 104,60 Z" fill="#65ff00" />
              <path d="M0,0 L104,60 A120,120 0 0,1 0,120 Z" fill="#ff5757" />
              <path d="M0,0 L0,120 A120,120 0 0,1 -104,60 Z" fill="#ffb800" />
              <path d="M0,0 L-104,60 A120,120 0 0,1 -104,-60 Z" fill="#9d5cff" />
              <path d="M0,0 L-104,-60 A120,120 0 0,1 0,-120 Z" fill="#00d0ff" />
              
              <!-- Inner circle for donut -->
              <circle cx="0" cy="0" r="60" fill="#1e293b" />
              
              <!-- Labels -->
              <text x="80" y="-80" class="label">Hardware (30%)</text>
              <text x="100" y="0" class="label">Software (25%)</text>
              <text x="60" y="80" class="label">Research (15%)</text>
              <text x="-60" y="80" class="label">Development (12%)</text>
              <text x="-110" y="0" class="label">Operations (10%)</text>
              <text x="-80" y="-80" class="label">Other (8%)</text>
              
              <!-- Note about data table -->
              <text x="0" y="180" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'timeline') {
        svgContent = `
          <svg width="100%" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Project Timeline</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(50, 100)">
              <!-- Timeline axis -->
              <line x1="0" y1="0" x2="700" y2="0" class="axis" />
              
              <!-- Year labels -->
              <text x="0" y="-10" text-anchor="middle" class="label">2025</text>
              <text x="175" y="-10" text-anchor="middle" class="label">2026</text>
              <text x="350" y="-10" text-anchor="middle" class="label">2027</text>
              <text x="525" y="-10" text-anchor="middle" class="label">2028</text>
              <text x="700" y="-10" text-anchor="middle" class="label">2029</text>
              
              <!-- Timeline bars -->
              <rect x="0" y="20" width="150" height="40" fill="#04a3ff" rx="4" />
              <text x="75" y="45" text-anchor="middle" class="label">Planning</text>
              
              <rect x="160" y="20" width="250" height="40" fill="#65ff00" rx="4" />
              <text x="285" y="45" text-anchor="middle" class="label">Development</text>
              
              <rect x="420" y="20" width="120" height="40" fill="#ffb800" rx="4" />
              <text x="480" y="45" text-anchor="middle" class="label">Testing</text>
              
              <rect x="550" y="20" width="150" height="40" fill="#00d0ff" rx="4" />
              <text x="625" y="45" text-anchor="middle" class="label">Deployment</text>
              
              <!-- Second row -->
              <rect x="120" y="80" width="180" height="40" fill="#9d5cff" rx="4" />
              <text x="210" y="105" text-anchor="middle" class="label">Fundraising</text>
              
              <rect x="310" y="80" width="280" height="40" fill="#ff5757" rx="4" />
              <text x="450" y="105" text-anchor="middle" class="label">Market Expansion</text>
              
              <!-- $1T milestone annotation -->
              <text x="600" y="160" text-anchor="end" class="milestone-text">$1T Milestone</text>
              
              <!-- Note about data table -->
              <text x="350" y="210" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'treemap') {
        svgContent = `
          <svg width="100%" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Division Structure</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(50, 80)">
              <!-- Treemap rectangles -->
              <rect x="0" y="0" width="400" height="250" fill="#04a3ff" rx="4" />
              <text x="200" y="125" text-anchor="middle" class="label">Core Division (40%)</text>
              
              <rect x="410" y="0" width="170" height="120" fill="#65ff00" rx="4" />
              <text x="495" y="60" text-anchor="middle" class="label">Division A (17%)</text>
              
              <rect x="590" y="0" width="160" height="120" fill="#ffb800" rx="4" />
              <text x="670" y="60" text-anchor="middle" class="label">Division B (16%)</text>
              
              <rect x="410" y="130" width="200" height="120" fill="#9d5cff" rx="4" />
              <text x="510" y="190" text-anchor="middle" class="label">Division C (20%)</text>
              
              <rect x="620" y="130" width="130" height="120" fill="#ff5757" rx="4" />
              <text x="685" y="190" text-anchor="middle" class="label">Other (7%)</text>
              
              <!-- Note about data table -->
              <text x="350" y="300" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'mixed') {
        svgContent = `
          <svg width="100%" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Financial Performance</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(50, 70)">
              <!-- $1T milestone marker -->
              <line x1="0" y1="50" x2="700" y2="50" class="milestone" />
              <text x="10" y="45" class="milestone-text">$1 Trillion Milestone</text>
              
              <!-- Grid and axes -->
              <line x1="0" y1="50" x2="700" y2="50" class="grid" />
              <line x1="0" y1="100" x2="700" y2="100" class="grid" />
              <line x1="0" y1="150" x2="700" y2="150" class="grid" />
              <line x1="0" y1="200" x2="700" y2="200" class="grid" />
              <line x1="0" y1="250" x2="700" y2="250" class="grid" />
              <line x1="0" y1="300" x2="700" y2="300" class="grid" />
              <line x1="0" y1="0" x2="0" y2="300" class="axis" />
              <line x1="0" y1="300" x2="700" y2="300" class="axis" />
              
              <!-- Bars for revenue -->
              <rect x="25" y="200" width="50" height="100" fill="#04a3ff" rx="2" />
              <rect x="125" y="170" width="50" height="130" fill="#04a3ff" rx="2" />
              <rect x="225" y="150" width="50" height="150" fill="#04a3ff" rx="2" />
              <rect x="325" y="120" width="50" height="180" fill="#04a3ff" rx="2" />
              <rect x="425" y="80" width="50" height="220" fill="#04a3ff" rx="2" />
              <rect x="525" y="60" width="50" height="240" fill="#04a3ff" rx="2" />
              <rect x="625" y="30" width="50" height="270" fill="#04a3ff" rx="2" />
              
              <!-- Line for profit -->
              <path d="M50,280 L150,260 L250,240 L350,210 L450,170 L550,130 L650,100" stroke="#65ff00" stroke-width="3" fill="none" />
              
              <!-- Data points for profit line -->
              <circle cx="50" cy="280" r="4" fill="#65ff00" />
              <circle cx="150" cy="260" r="4" fill="#65ff00" />
              <circle cx="250" cy="240" r="4" fill="#65ff00" />
              <circle cx="350" cy="210" r="4" fill="#65ff00" />
              <circle cx="450" cy="170" r="4" fill="#65ff00" />
              <circle cx="550" cy="130" r="4" fill="#65ff00" />
              <circle cx="650" cy="100" r="4" fill="#65ff00" />
              
              <!-- X-axis labels -->
              <text x="50" y="320" text-anchor="middle" class="label">2025</text>
              <text x="150" y="320" text-anchor="middle" class="label">2026</text>
              <text x="250" y="320" text-anchor="middle" class="label">2027</text>
              <text x="350" y="320" text-anchor="middle" class="label">2028</text>
              <text x="450" y="320" text-anchor="middle" class="label">2029</text>
              <text x="550" y="320" text-anchor="middle" class="label">2030</text>
              <text x="650" y="320" text-anchor="middle" class="label">2031</text>
              
              <!-- Legend -->
              <rect x="550" y="20" width="15" height="15" fill="#04a3ff" />
              <text x="575" y="32" class="label">Revenue</text>
              <line x1="550" y1="50" x2="565" y2="50" stroke="#65ff00" stroke-width="3" />
              <text x="575" y="54" class="label">Profit</text>
              
              <!-- Note about data table -->
              <text x="350" y="350" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else {
        // Default chart SVG
        svgContent = `
          <svg width="100%" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">QDaria Business Intelligence</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(400, 180)">
              <circle cx="0" cy="0" r="80" fill="rgba(4,163,255,0.4)" />
              <text x="0" y="0" text-anchor="middle" font-size="16" fill="#fff" font-weight="bold">QDaria</text>
              <text x="0" y="20" text-anchor="middle" font-size="12" fill="rgba(255,255,255,0.7)">Data</text>
              
              <!-- $1T milestone annotation -->
              <text x="150" y="80" text-anchor="middle" class="milestone-text">$1 Trillion Milestone (2035)</text>
              
              <!-- Note about data table -->
              <text x="0" y="150" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      }
      
      return svgContent;
    },
    
    // Toggle data table visibility
    toggleDataTable: function(tableElement) {
      if (!tableElement) return;
      
      if (tableElement.classList.contains('visible')) {
        tableElement.classList.remove('visible');
        tableElement.style.display = 'none';
      } else {
        tableElement.classList.add('visible');
        tableElement.style.display = 'block';
      }
    },
    
    // Function to get the chart data from worker
    getChartData: function(chartId, chartType) {
      return new Promise((resolve, reject) => {
        try {
          // Try to get data from worker if available
          const workerId = chartId.replace('-chart', '') + 'Worker';
          
          if (window[workerId] && typeof window[workerId].getData === 'function') {
            window[workerId].getData().then(resolve).catch(error => {
              console.warn(`Worker data fetch failed for ${chartId}: ${error.message}`);
              resolve(this.getFallbackData(chartType));
            });
          } else {
            // Fallback to sample data
            resolve(this.getFallbackData(chartType));
          }
        } catch (error) {
          console.warn(`Error fetching chart data: ${error.message}`);
          resolve(this.getFallbackData(chartType));
        }
      });
    },
    
    // Get fallback data for chart type
    getFallbackData: function(chartType) {
      const type = chartType || 'line';
      return {
        series: sampleData[type] || sampleData.line,
        options: chartConfigs[type]?.options || chartConfigs.line.options,
        categories: defaultCategories
      };
    }
  };
  
  // Enhanced ApexCharts constructor with error handling and data tables
  class EnhancedApexCharts {
    constructor(element, options, series) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      this.options = options || {};
      this.series = series || [];
      this.chartId = this.element?.id || 'chart-' + Math.random().toString(36).substring(2, 9);
      this.chartType = chartUtils.getChartType(this.element);
      this.originalApexCharts = null;
      this.dataTableCreated = false;
      
      console.log(`Initializing enhanced chart: ${this.chartId}, type: ${this.chartType}`);
      
      // Initialize as soon as possible
      this.initialize();
    }
    
    initialize() {
      try {
        // Make sure element exists
        if (!this.element) {
          console.error('Chart element not found');
          return chartUtils.createFallbackVisualization(this.chartId, this.chartType);
        }
        
        // Make sure ApexCharts is available
        if (!window.ApexCharts) {
          console.error('ApexCharts not available');
          return chartUtils.createFallbackVisualization(this.chartId, this.chartType);
        }
        
        // Backup original ApexCharts constructor
        if (OriginalApexCharts) {
          this.originalApexCharts = new OriginalApexCharts(
            this.element,
            this.options,
            this.series
          );
          
          // Store instance globally for external access
          window[`${this.chartId}-instance`] = this.originalApexCharts;
          
          // Create data table before rendering
          this.createDataTable();
          
          // Render the chart
          this.originalApexCharts.render();
          
          return this;
        } else {
          console.error('Original ApexCharts constructor not available');
          return chartUtils.createFallbackVisualization(this.chartId, this.chartType);
        }
      } catch (error) {
        console.error(`Error initializing chart ${this.chartId}: ${error.message}`);
        return chartUtils.createFallbackVisualization(this.chartId, this.chartType);
      }
    }
    
    createDataTable() {
      try {
        if (this.dataTableCreated) return;
        
        // Get chart data
        const series = this.originalApexCharts?.w?.config?.series || this.series;
        const categories = this.originalApexCharts?.w?.config?.xaxis?.categories || defaultCategories;
        
        // Generate data table HTML
        const tableHtml = chartUtils.generateDataTable(this.chartId, series, categories);
        
        // Find or create data table container
        let tableContainer = document.getElementById(`${this.chartId}-data-table`);
        if (!tableContainer) {
          // Find chart container
          const chartContainer = document.getElementById(this.chartId);
          if (!chartContainer) return;
          
          // Create table container
          tableContainer = document.createElement('div');
          tableContainer.id = `${this.chartId}-data-table`;
          tableContainer.className = 'chart-data-table';
          tableContainer.innerHTML = `
            <div class="data-table-header">
              <span class="data-table-title">Data Table: ${this.chartId}</span>
              <button type="button" class="data-table-close-btn" aria-label="Close data table">×</button>
            </div>
            <div class="data-table-content">
              ${tableHtml}
            </div>
          `;
          
          // Insert after chart
          chartContainer.parentNode.insertBefore(tableContainer, chartContainer.nextSibling);
          
          // Create toggle button if not exists
          let toggleBtn = document.querySelector(`button[aria-controls="${tableContainer.id}"]`);
          if (!toggleBtn) {
            toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'chart-data-table-btn';
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.setAttribute('aria-controls', tableContainer.id);
            toggleBtn.textContent = 'Show Data Table';
            
            // Insert before table
            chartContainer.parentNode.insertBefore(toggleBtn, tableContainer);
            
            // Add toggle functionality
            toggleBtn.addEventListener('click', () => {
              chartUtils.toggleDataTable(tableContainer);
              toggleBtn.setAttribute(
                'aria-expanded',
                tableContainer.classList.contains('visible') ? 'true' : 'false'
              );
              toggleBtn.textContent = tableContainer.classList.contains('visible')
                ? 'Hide Data Table'
                : 'Show Data Table';
            });
          }
          
          // Close button functionality
          const closeBtn = tableContainer.querySelector('.data-table-close-btn');
          if (closeBtn) {
            closeBtn.addEventListener('click', () => {
              chartUtils.toggleDataTable(tableContainer);
              toggleBtn.setAttribute('aria-expanded', 'false');
              toggleBtn.textContent = 'Show Data Table';
            });
          }
        } else {
          // Update existing table content
          const contentDiv = tableContainer.querySelector('.data-table-content');
          if (contentDiv) {
            contentDiv.innerHTML = tableHtml;
          }
        }
        
        this.dataTableCreated = true;
      } catch (error) {
        console.error(`Error creating data table for ${this.chartId}: ${error.message}`);
      }
    }
    
    // Pass-through methods to original ApexCharts instance
    render() {
      try {
        if (this.originalApexCharts) {
          return this.originalApexCharts.render();
        }
      } catch (error) {
        console.error(`Error rendering chart ${this.chartId}: ${error.message}`);
        return chartUtils.createFallbackVisualization(this.chartId, this.chartType);
      }
    }
    
    updateOptions(options, redrawPaths, animate, updateSyncedCharts) {
      try {
        if (this.originalApexCharts) {
          return this.originalApexCharts.updateOptions(
            options,
            redrawPaths,
            animate,
            updateSyncedCharts
          );
        }
      } catch (error) {
        console.error(`Error updating options for chart ${this.chartId}: ${error.message}`);
      }
    }
    
    updateSeries(series, animate) {
      try {
        if (this.originalApexCharts) {
          // Update data table as well
          this.series = series;
          this.createDataTable();
          
          return this.originalApexCharts.updateSeries(series, animate);
        }
      } catch (error) {
        console.error(`Error updating series for chart ${this.chartId}: ${error.message}`);
      }
    }
    
    appendSeries(series, animate) {
      try {
        if (this.originalApexCharts) {
          return this.originalApexCharts.appendSeries(series, animate);
        }
      } catch (error) {
        console.error(`Error appending series for chart ${this.chartId}: ${error.message}`);
      }
    }
    
    toggleSeries(seriesName) {
      try {
        if (this.originalApexCharts) {
          return this.originalApexCharts.toggleSeries(seriesName);
        }
      } catch (error) {
        console.error(`Error toggling series for chart ${this.chartId}: ${error.message}`);
      }
    }
    
    showSeries(seriesName) {
      try {
        if (this.originalApexCharts) {
          return this.originalApexCharts.showSeries(seriesName);
        }
      } catch (error) {
        console.error(`Error showing series for chart ${this.chartId}: ${error.message}`);
      }
    }
    
    hideSeries(seriesName) {
      try {
        if (this.originalApexCharts) {
          return this.originalApexCharts.hideSeries(seriesName);
        }
      } catch (error) {
        console.error(`Error hiding series for chart ${this.chartId}: ${error.message}`);
      }
    }
    
    resetSeries(shouldUpdateChart, shouldResetZoom) {
      try {
        if (this.originalApexCharts) {
          return this.originalApexCharts.resetSeries(shouldUpdateChart, shouldResetZoom);
        }
      } catch (error) {
        console.error(`Error resetting series for chart ${this.chartId}: ${error.message}`);
      }
    }
    
    zoomX(min, max) {
      try {
        if (this.originalApexCharts) {
          return this.originalApexCharts.zoomX(min, max);
        }
      } catch (error) {
        console.error(`Error zooming chart ${this.chartId}: ${error.message}`);
      }
    }
    
    dataURI(options) {
      try {
        if (
/**
 * QDaria Business Plan - Unified Chart System
 * 
 * This file replaces multiple emergency fixes with a single, cohesive system for:
 * 1. Chart initialization and rendering
 * 2. Data table generation and display
 * 3. Fallback rendering when charts fail
 * 4. Interactive features and accessibility
 */

(function() {
  console.log('🚀 QDaria Unified Chart System initializing');
  
  // Store original ApexCharts constructor if available
  const OriginalApexCharts = window.ApexCharts;
  
  // Chart type configurations with sample data for fallbacks
  const chartConfigs = {
    area: {
      height: 400,
      options: {
        chart: { type: 'area', stacked: false, toolbar: { show: true } },
        stroke: { curve: 'smooth', width: 2 },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.2 } },
        markers: { size: 4, strokeWidth: 0, hover: { size: 6 } },
        tooltip: { shared: true, intersect: false },
        annotations: {
          yaxis: [{ y: 1000000000000, borderColor: '#65FF00', label: { text: '$1 Trillion Milestone' } }]
        }
      }
    },
    radar: {
      height: 450,
      options: {
        chart: { type: 'radar', toolbar: { show: true } },
        stroke: { width: 2 },
        fill: { opacity: 0.5 },
        markers: { size: 4 },
        tooltip: { enabled: true }
      }
    },
    bar: {
      height: 450,
      options: {
        chart: { type: 'bar', toolbar: { show: true } },
        plotOptions: { bar: { borderRadius: 4, horizontal: false } },
        tooltip: { shared: true, intersect: false }
      }
    },
    line: {
      height: 400,
      options: {
        chart: { type: 'line', toolbar: { show: true } },
        stroke: { curve: 'smooth', width: 2 },
        markers: { size: 4 },
        tooltip: { shared: true, intersect: false }
      }
    },
    pie: {
      height: 450,
      options: {
        chart: { type: 'pie', toolbar: { show: true } },
        labels: [],
        legend: { position: 'bottom' },
        tooltip: { enabled: true },
        dataLabels: { enabled: true }
      }
    },
    donut: {
      height: 450,
      options: {
        chart: { type: 'donut', toolbar: { show: true } },
        labels: [],
        legend: { position: 'bottom' },
        tooltip: { enabled: true },
        dataLabels: { enabled: true }
      }
    },
    scatter: {
      height: 400,
      options: {
        chart: { type: 'scatter', toolbar: { show: true } },
        markers: { size: 6, strokeWidth: 1, hover: { size: 8 } },
        tooltip: { enabled: true }
      }
    },
    heatmap: {
      height: 450,
      options: {
        chart: { type: 'heatmap', toolbar: { show: true } },
        tooltip: { enabled: true },
        dataLabels: { enabled: false }
      }
    },
    timeline: {
      height: 500,
      options: {
        chart: { type: 'rangeBar', toolbar: { show: true } },
        plotOptions: { bar: { horizontal: true } },
        tooltip: { shared: false, intersect: true }
      }
    },
    mixed: {
      height: 500,
      options: {
        chart: { type: 'line', stacked: false, toolbar: { show: true } },
        stroke: { width: [0, 2, 2, 2], curve: 'smooth' },
        plotOptions: { bar: { columnWidth: '50%' } },
        markers: { size: 4 },
        tooltip: { shared: true, intersect: false }
      }
    },
    candlestick: {
      height: 450,
      options: {
        chart: { type: 'candlestick', toolbar: { show: true } },
        tooltip: { enabled: true },
        xaxis: { type: 'datetime' }
      }
    },
    boxplot: {
      height: 450,
      options: {
        chart: { type: 'boxPlot', toolbar: { show: true } },
        tooltip: { shared: false, intersect: true }
      }
    },
    treemap: {
      height: 450,
      options: {
        chart: { type: 'treemap', toolbar: { show: true } },
        tooltip: { enabled: true },
        dataLabels: { enabled: true }
      }
    },
    rangeArea: {
      height: 450,
      options: {
        chart: { type: 'rangeArea', toolbar: { show: true } },
        stroke: { curve: 'smooth', width: 2 },
        tooltip: { shared: true, intersect: false },
        annotations: {
          yaxis: [{ y: 1000000000000, borderColor: '#65FF00', label: { text: '$1 Trillion Milestone' } }]
        }
      }
    },
    polar: {
      height: 450,
      options: {
        chart: { type: 'polarArea', toolbar: { show: true } },
        stroke: { width: 1 },
        legend: { position: 'bottom' },
        fill: { opacity: 0.8 },
        tooltip: { enabled: true }
      }
    }
  };
  
  // Ensure all chart types have the $1 Trillion milestone
  Object.keys(chartConfigs).forEach(type => {
    if (!chartConfigs[type].options.annotations) {
      chartConfigs[type].options.annotations = {
        yaxis: [{ y: 1000000000000, borderColor: '#65FF00', label: { text: '$1 Trillion Milestone' } }]
      };
    }
  });
  
  // Base sample data for different chart types
  const sampleData = {
    area: [
      { name: 'Market Size', data: [1.5, 5, 20, 45, 100, 250, 500, 750, 950] }
    ],
    radar: [
      { name: 'QDaria', data: [80, 90, 85, 95, 75, 80] },
      { name: 'Competitors', data: [65, 55, 70, 60, 50, 45] }
    ],
    bar: [
      { name: 'Revenue', data: [44, 55, 57, 56, 61, 58, 63] }
    ],
    line: [
      { name: 'Revenue', data: [30, 40, 45, 50, 49, 60, 70, 91, 125] }
    ],
    pie: [44, 55, 13, 43, 22],
    donut: [44, 55, 13, 43, 22],
    scatter: [
      { name: 'Product A', data: [[10, 40], [20, 30], [30, 40], [40, 50], [50, 60]] }
    ],
    heatmap: [
      { name: 'Series 1', data: [10, 20, 30, 40, 50, 60, 70] }
    ],
    timeline: [
      { x: 'Planning', y: [new Date('2025-01-01').getTime(), new Date('2025-03-01').getTime()] },
      { x: 'Development', y: [new Date('2025-03-01').getTime(), new Date('2025-08-01').getTime()] },
      { x: 'Testing', y: [new Date('2025-08-01').getTime(), new Date('2025-10-01').getTime()] },
      { x: 'Deployment', y: [new Date('2025-10-01').getTime(), new Date('2025-12-01').getTime()] }
    ],
    mixed: [
      { name: 'Revenue', type: 'column', data: [30, 40, 45, 50, 49, 60] },
      { name: 'Profit', type: 'line', data: [5, 10, 15, 20, 25, 30] }
    ],
    treemap: [
      { data: [{ x: 'Division A', y: 400 }, { x: 'Division B', y: 200 }, { x: 'Division C', y: 300 }] }
    ]
  };
  
  // Default categories for x-axis
  const defaultCategories = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];
  
  // Chart utility functions
  const chartUtils = {
    // Generate data table HTML from series data
    generateDataTable: function(chartId, series, categories) {
      const tableId = `${chartId}-data-table`;
      let tableHtml = `
        <table class="chart-data-table-content" id="${tableId}-content">
          <thead>
            <tr>
              <th>Category</th>
      `;
      
      // Add headers for each series
      if (Array.isArray(series)) {
        series.forEach(s => {
          tableHtml += `<th>${s.name || 'Value'}</th>`;
        });
      } else {
        tableHtml += `<th>Value</th>`;
      }
      
      tableHtml += `
            </tr>
          </thead>
          <tbody>
      `;
      
      // Add rows for each category
      if (categories && Array.isArray(categories)) {
        categories.forEach((category, i) => {
          tableHtml += `<tr><td>${category}</td>`;
          
          if (Array.isArray(series)) {
            series.forEach(s => {
              const value = s.data[i] !== undefined ? s.data[i] : '-';
              tableHtml += `<td>${typeof value === 'object' ? JSON.stringify(value) : value}</td>`;
            });
          } else if (typeof series === 'object') {
            tableHtml += `<td>${series[i] || '-'}</td>`;
          }
          
          tableHtml += `</tr>`;
        });
      } else if (Array.isArray(series)) {
        // For non-category charts (like pie/donut)
        series.forEach((item, i) => {
          if (typeof item === 'object' && item.data) {
            item.data.forEach((dataPoint, j) => {
              const category = item.name ? `${item.name} ${j+1}` : `Item ${j+1}`;
              const value = typeof dataPoint === 'object' ? JSON.stringify(dataPoint) : dataPoint;
              tableHtml += `<tr><td>${category}</td><td>${value}</td></tr>`;
            });
          } else {
            tableHtml += `<tr><td>Item ${i+1}</td><td>${item}</td></tr>`;
          }
        });
      }
      
      tableHtml += `
          </tbody>
        </table>
      `;
      
      return tableHtml;
    },
    
    // Get chart type from element or parent classes
    getChartType: function(element) {
      if (!element) return 'line';
      
      let type = 'line'; // Default
      
      // Check element's classes
      if (element.classList) {
        for (const cls of element.classList) {
          if (cls.endsWith('-chart')) {
            const candidate = cls.replace('-chart', '');
            if (chartConfigs[candidate]) {
              return candidate;
            }
          }
        }
      }
      
      // Check parent's classes
      const parent = element.parentElement;
      if (parent && parent.classList) {
        for (const cls of parent.classList) {
          if (cls.endsWith('-chart')) {
            const candidate = cls.replace('-chart', '');
            if (chartConfigs[candidate]) {
              return candidate;
            }
          }
        }
      }
      
      // Extract from ID
      if (element.id) {
        const cleanId = element.id.replace('-chart', '');
        const mapping = {
          marketGrowth: 'area',
          competitorRadar: 'radar',
          swotAnalysis: 'radar',
          executionRoadmap: 'timeline',
          revenue: 'line',
          profitability: 'area',
          riskAssessment: 'radar',
          fundingAllocation: 'donut',
          investmentDistribution: 'bar',
          roiComparison: 'scatter',
          marketPositioning: 'bubble',
          revenueDiversification: 'treemap',
          stockPerformance: 'candlestick',
          competitorStrength: 'polar',
          quantumHardwareComparison: 'bar',
          financialMetricsMixed: 'mixed',
          forecastScenariosRange: 'rangeArea',
          topologicalTimeline: 'timeline',
          marketSizeProjections: 'area',
          organizational: 'treemap',
          quantumMarketForecast: 'area'
        };
        
        for (const key in mapping) {
          if (cleanId.includes(key)) {
            return mapping[key];
          }
        }
      }
      
      return type;
    },
    
    // Create fallback visualization
    createFallbackVisualization: function(chartId, chartType) {
      const type = chartType || this.getChartType(document.getElementById(chartId)) || 'line';
      const config = chartConfigs[type] || chartConfigs.line;
      
      // Create accessible SVG fallback
      const svgContent = this.generateFallbackSVG(type);
      
      // Find container and inject SVG
      const container = document.getElementById(`${chartId}-chart`) || document.getElementById(chartId);
      if (container) {
        container.innerHTML = svgContent;
        container.style.minHeight = `${config.height}px`;
        container.setAttribute('aria-label', `${type.charAt(0).toUpperCase() + type.slice(1)} chart with data table available below`);
      }
      
      // Make data table visible
      const dataTable = document.getElementById(`${chartId}-data-table`);
      if (dataTable) {
        dataTable.style.display = 'block';
        dataTable.classList.add('visible');
      }
      
      return true;
    },
    
    // Generate fallback SVG based on chart type
    generateFallbackSVG: function(chartType) {
      const type = chartType || 'line';
      
      // Common styles for all SVGs
      const svgStyles = `
        <style>
          .title{font-family:Inter,Arial,sans-serif;font-size:18px;font-weight:bold;fill:#fff}
          .subtitle{font-family:Inter,Arial,sans-serif;font-size:14px;fill:rgba(255,255,255,0.7)}
          .axis{stroke:rgba(255,255,255,0.3);stroke-width:1}
          .grid{stroke:rgba(255,255,255,0.1);stroke-width:1;stroke-dasharray:4}
          .line{stroke:#04a3ff;stroke-width:2.5;fill:none}
          .area{fill:url(#areaGradient);fill-opacity:0.8}
          .bar{fill:#04a3ff;stroke:none}
          .dot{fill:#04a3ff;stroke:#1e293b;stroke-width:1.5}
          .milestone{stroke:rgba(101,255,0,0.9);stroke-width:1.5;stroke-dasharray:3,3}
          .milestone-text{font-family:Inter,Arial,sans-serif;font-size:10px;fill:#65ff00;font-weight:bold}
          .label{font-family:Inter,Arial,sans-serif;font-size:10px;fill:rgba(255,255,255,0.9)}
          .note{font-family:Inter,Arial,sans-serif;font-size:12px;fill:rgba(255,255,255,0.6);font-style:italic}
        </style>
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#04a3ff" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#04a3ff" stop-opacity="0.05"/>
          </linearGradient>
        </defs>
      `;
      
      let svgContent = '';
      
      // Generate SVG based on chart type
      if (type === 'area' || type === 'rangeArea') {
        svgContent = `
          <svg width="100%" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Quantum Computing Market Growth</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(50, 70)">
              <!-- $1T milestone marker -->
              <line x1="0" y1="50" x2="700" y2="50" class="milestone" />
              <text x="10" y="45" class="milestone-text">$1 Trillion Milestone</text>
              
              <!-- Grid and axes -->
              <line x1="0" y1="50" x2="700" y2="50" class="grid" />
              <line x1="0" y1="100" x2="700" y2="100" class="grid" />
              <line x1="0" y1="150" x2="700" y2="150" class="grid" />
              <line x1="0" y1="200" x2="700" y2="200" class="grid" />
              <line x1="0" y1="0" x2="0" y2="220" class="axis" />
              <line x1="0" y1="200" x2="700" y2="200" class="axis" />
              
              <!-- Area chart -->
              <path d="M0,200 L0,180 L100,165 L200,145 L300,110 L400,70 L500,40 L600,25 L700,20 L700,200 Z" class="area" />
              <path d="M0,180 L100,165 L200,145 L300,110 L400,70 L500,40 L600,25 L700,20" class="line" />
              
              <!-- Data points -->
              <circle cx="0" cy="180" r="4" class="dot" />
              <circle cx="100" cy="165" r="4" class="dot" />
              <circle cx="200" cy="145" r="4" class="dot" />
              <circle cx="300" cy="110" r="4" class="dot" />
              <circle cx="400" cy="70" r="4" class="dot" />
              <circle cx="500" cy="40" r="4" class="dot" />
              <circle cx="600" cy="25" r="4" class="dot" />
              <circle cx="700" cy="20" r="4" class="dot" />
              
              <!-- X-axis labels -->
              <text x="0" y="220" text-anchor="middle" class="label">2025</text>
              <text x="100" y="220" text-anchor="middle" class="label">2026</text>
              <text x="200" y="220" text-anchor="middle" class="label">2027</text>
              <text x="300" y="220" text-anchor="middle" class="label">2028</text>
              <text x="400" y="220" text-anchor="middle" class="label">2029</text>
              <text x="500" y="220" text-anchor="middle" class="label">2030</text>
              <text x="600" y="220" text-anchor="middle" class="label">2033</text>
              <text x="700" y="220" text-anchor="middle" class="label">2035</text>
              
              <!-- Note about data table -->
              <text x="350" y="275" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'radar') {
        svgContent = `
          <svg width="100%" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Competitive Analysis</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(400, 230)">
              <!-- Radar circles -->
              <circle cx="0" cy="0" r="50" fill="none" class="grid" />
              <circle cx="0" cy="0" r="100" fill="none" class="grid" />
              <circle cx="0" cy="0" r="150" fill="none" class="grid" />
              
              <!-- Axis lines -->
              <line x1="0" y1="-150" x2="0" y2="150" class="axis" />
              <line x1="-150" y1="0" x2="150" y2="0" class="axis" />
              <line x1="-106" y1="-106" x2="106" y2="106" class="axis" />
              <line x1="106" y1="-106" x2="-106" y2="106" class="axis" />
              <line x1="-130" y1="-75" x2="130" y2="75" class="axis" />
              <line x1="130" y1="-75" x2="-130" y2="75" class="axis" />
              
              <!-- Data polygon -->
              <polygon points="0,-120 104,-60 104,60 0,120 -104,60 -104,-60" fill="rgba(4,163,255,0.3)" stroke="#04a3ff" stroke-width="2" />
              
              <!-- Category labels -->
              <text x="0" y="-165" text-anchor="middle" class="label">Technology</text>
              <text x="165" y="0" text-anchor="start" class="label">Market Share</text>
              <text x="120" y="100" text-anchor="middle" class="label">Funding</text>
              <text x="0" y="165" text-anchor="middle" class="label">Growth</text>
              <text x="-120" y="100" text-anchor="middle" class="label">Innovation</text>
              <text x="-165" y="0" text-anchor="end" class="label">Team</text>
              
              <!-- Note about data table -->
              <text x="0" y="200" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'bar' || type === 'column') {
        svgContent = `
          <svg width="100%" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Investment Distribution</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(50, 70)">
              <!-- $1T milestone marker -->
              <line x1="0" y1="50" x2="700" y2="50" class="milestone" />
              <text x="10" y="45" class="milestone-text">$1 Trillion Milestone</text>
              
              <!-- Grid and axes -->
              <line x1="0" y1="50" x2="700" y2="50" class="grid" />
              <line x1="0" y1="100" x2="700" y2="100" class="grid" />
              <line x1="0" y1="150" x2="700" y2="150" class="grid" />
              <line x1="0" y1="200" x2="700" y2="200" class="grid" />
              <line x1="0" y1="0" x2="0" y2="220" class="axis" />
              <line x1="0" y1="200" x2="700" y2="200" class="axis" />
              
              <!-- Bars -->
              <rect x="25" y="120" width="50" height="80" class="bar" />
              <rect x="125" y="90" width="50" height="110" class="bar" />
              <rect x="225" y="60" width="50" height="140" class="bar" />
              <rect x="325" y="40" width="50" height="160" class="bar" />
              <rect x="425" y="70" width="50" height="130" class="bar" />
              <rect x="525" y="110" width="50" height="90" class="bar" />
              <rect x="625" y="140" width="50" height="60" class="bar" />
              
              <!-- X-axis labels -->
              <text x="50" y="220" text-anchor="middle" class="label">Hardware</text>
              <text x="150" y="220" text-anchor="middle" class="label">Software</text>
              <text x="250" y="220" text-anchor="middle" class="label">Research</text>
              <text x="350" y="220" text-anchor="middle" class="label">Development</text>
              <text x="450" y="220" text-anchor="middle" class="label">Operations</text>
              <text x="550" y="220" text-anchor="middle" class="label">Marketing</text>
              <text x="650" y="220" text-anchor="middle" class="label">Other</text>
              
              <!-- Note about data table -->
              <text x="350" y="275" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'donut' || type === 'pie') {
        svgContent = `
          <svg width="100%" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Funding Allocation</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(400, 200)">
              <!-- Circle segments (simplified) -->
              <path d="M0,0 L0,-120 A120,120 0 0,1 104,-60 Z" fill="#04a3ff" />
              <path d="M0,0 L104,-60 A120,120 0 0,1 104,60 Z" fill="#65ff00" />
              <path d="M0,0 L104,60 A120,120 0 0,1 0,120 Z" fill="#ff5757" />
              <path d="M0,0 L0,120 A120,120 0 0,1 -104,60 Z" fill="#ffb800" />
              <path d="M0,0 L-104,60 A120,120 0 0,1 -104,-60 Z" fill="#9d5cff" />
              <path d="M0,0 L-104,-60 A120,120 0 0,1 0,-120 Z" fill="#00d0ff" />
              
              <!-- Inner circle for donut -->
              <circle cx="0" cy="0" r="60" fill="#1e293b" />
              
              <!-- Labels -->
              <text x="80" y="-80" class="label">Hardware (30%)</text>
              <text x="100" y="0" class="label">Software (25%)</text>
              <text x="60" y="80" class="label">Research (15%)</text>
              <text x="-60" y="80" class="label">Development (12%)</text>
              <text x="-110" y="0" class="label">Operations (10%)</text>
              <text x="-80" y="-80" class="label">Other (8%)</text>
              
              <!-- Note about data table -->
              <text x="0" y="180" text-anchor="middle" class="note">Complete interactive data available in the table below</text>
            </g>
          </svg>
        `;
      } else if (type === 'timeline') {
        svgContent = `
          <svg width="100%" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            ${svgStyles}
            <rect width="100%" height="100%" fill="#1e293b" rx="4" />
            <text x="400" y="30" text-anchor="middle" class="title">Project Timeline</text>
            <text x="400" y="50" text-anchor="middle" class="subtitle">Interactive data available in table below</text>
            
            <g transform="translate(50, 100)">
              <!-- Timeline axis -->
              <line x1="0" y1="0" x2="700" y2="0" class="axis" />
              
              <!--
