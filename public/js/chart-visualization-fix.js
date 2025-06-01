/**
 * EMERGENCY SVG FALLBACK FOR CHARTS
 * Replaces "chart visualization unavailable" with simple SVG charts
 */

(function() {
  console.log('🎨 CHART VISUALIZATION FALLBACK ACTIVATED');
  
  // Checks if we're on the business plan page
  function isBusinessPlanPage() {
    return window.location.pathname.includes('/business-plan') || 
           window.location.pathname.includes('/invest/business-plan') ||
           document.title.includes('QDaria Business Plan');
  }
  
  // If not on the business plan page, exit early
  if (!isBusinessPlanPage()) {
    console.log('Not on business plan page, skipping visualization fix');
    return;
  }
  
  // SVG templates for different chart types
  const svgTemplates = {
    area: (id, title) => `
      <svg width="100%" height="350" viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
        <title>${title}</title>
        <style>
          .axis { stroke: rgba(255,255,255,0.2); stroke-width: 1; }
          .grid { stroke: rgba(255,255,255,0.1); stroke-width: 1; stroke-dasharray: 4 4; }
          .area { fill: url(#areaGradient); fill-opacity: 0.8; }
          .line { stroke: #04a3ff; stroke-width: 3; fill: none; }
          .dot { fill: #04a3ff; stroke: #1e293b; stroke-width: 2; }
          .annotation { fill: #65ff00; stroke: #1e293b; stroke-width: 1; }
          .annotation-line { stroke: rgba(101, 255, 0, 0.6); stroke-width: 1; stroke-dasharray: 4 4; }
          .label { font-family: 'Inter', Arial, sans-serif; font-size: 11px; fill: rgba(255,255,255,0.8); }
          .title { font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: bold; fill: #fff; }
          .value-label { font-family: 'Inter', Arial, sans-serif; font-size: 10px; fill: #04a3ff; font-weight: bold; }
        </style>
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#04a3ff" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#04a3ff" stop-opacity="0.1"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="#1e293b" />
        <text x="400" y="30" text-anchor="middle" class="title">${title}</text>
        <g transform="translate(50, 50)">
          <!-- Y-axis -->
          <line x1="0" y1="0" x2="0" y2="200" class="axis" />
          <!-- X-axis -->
          <line x1="0" y1="200" x2="700" y2="200" class="axis" />
          
          <!-- Area chart -->
          <path d="M0,200 L0,150 L140,130 L280,100 L420,70 L560,30 L700,10 L700,200 Z" class="area" />
          <path d="M0,150 L140,130 L280,100 L420,70 L560,30 L700,10" class="line" />
          
          <!-- Data points -->
          <circle cx="0" cy="150" r="4" class="dot" />
          <circle cx="140" cy="130" r="4" class="dot" />
          <circle cx="280" cy="100" r="4" class="dot" />
          <circle cx="420" cy="70" r="4" class="dot" />
          <circle cx="560" cy="30" r="4" class="dot" />
          <circle cx="700" cy="10" r="4" class="dot" />
          
          <!-- X-axis labels -->
          <text x="0" y="220" text-anchor="middle" class="label">2025</text>
          <text x="140" y="220" text-anchor="middle" class="label">2026</text>
          <text x="280" y="220" text-anchor="middle" class="label">2027</text>
          <text x="420" y="220" text-anchor="middle" class="label">2028</text>
          <text x="560" y="220" text-anchor="middle" class="label">2030</text>
          <text x="700" y="220" text-anchor="middle" class="label">2035</text>
          
          <!-- Y-axis labels -->
          <text x="-10" y="200" text-anchor="end" class="label">$0</text>
          <text x="-10" y="150" text-anchor="end" class="label">$200M</text>
          <text x="-10" y="100" text-anchor="end" class="label">$400M</text>
          <text x="-10" y="50" text-anchor="end" class="label">$800M</text>
          <text x="-10" y="10" text-anchor="end" class="label">$1T</text>
        </g>
      </svg>
    `,
    
    rangeArea: (id, title) => `
      <svg width="100%" height="350" viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
        <title>${title}</title>
        <style>
          .axis { stroke: rgba(255,255,255,0.2); stroke-width: 1; }
          .grid { stroke: rgba(255,255,255,0.1); stroke-width: 1; stroke-dasharray: 4 4; }
          .optimistic { fill: rgba(4, 163, 255, 0.2); stroke: rgba(4, 163, 255, 0.8); stroke-width: 1; }
          .expected { fill: rgba(4, 163, 255, 0.5); stroke: rgba(4, 163, 255, 0.9); stroke-width: 1; }
          .conservative { fill: rgba(4, 163, 255, 0.8); stroke: rgba(4, 163, 255, 1); stroke-width: 1; }
          .line { stroke: #04a3ff; stroke-width: 2; fill: none; }
          .line-optimistic { stroke: #65ff00; stroke-width: 2; fill: none; }
          .line-conservative { stroke: #00ffd3; stroke-width: 2; fill: none; }
          .dot { fill: #04a3ff; stroke: #1e293b; stroke-width: 1; }
          .label { font-family: 'Inter', Arial, sans-serif; font-size: 11px; fill: rgba(255,255,255,0.8); }
          .scenario-label { font-family: 'Inter', Arial, sans-serif; font-size: 10px; fill: #fff; }
          .title { font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: bold; fill: #fff; }
        </style>
        <rect width="100%" height="100%" fill="#1e293b" />
        <text x="400" y="30" text-anchor="middle" class="title">${title}</text>
        <g transform="translate(50, 50)">
          <!-- Y-axis -->
          <line x1="0" y1="0" x2="0" y2="200" class="axis" />
          <!-- X-axis -->
          <line x1="0" y1="200" x2="700" y2="200" class="axis" />
          
          <!-- Range areas -->
          <path d="M0,200 L0,170 L140,160 L280,140 L420,120 L560,90 L700,50 L700,200 Z" class="conservative" />
          <path d="M0,170 L140,160 L280,140 L420,120 L560,90 L700,50" class="line" />
          
          <path d="M0,200 L0,170 L140,150 L280,120 L420,80 L560,40 L700,10 L700,50 L560,90 L420,120 L280,140 L140,160 L0,170 Z" class="expected" />
          <path d="M0,170 L140,150 L280,120 L420,80 L560,40 L700,10" class="line" />
          
          <path d="M0,170 L140,150 L280,120 L420,80 L560,40 L700,10 L700,5 L560,20 L420,50 L280,90 L140,130 L0,150 Z" class="optimistic" />
          <path d="M0,150 L140,130 L280,90 L420,50 L560,20 L700,5" class="line" />
          
          <!-- X-axis labels -->
          <text x="0" y="220" text-anchor="middle" class="label">2025</text>
          <text x="140" y="220" text-anchor="middle" class="label">2026</text>
          <text x="280" y="220" text-anchor="middle" class="label">2027</text>
          <text x="420" y="220" text-anchor="middle" class="label">2028</text>
          <text x="560" y="220" text-anchor="middle" class="label">2030</text>
          <text x="700" y="220" text-anchor="middle" class="label">2035</text>
          
          <!-- Y-axis labels -->
          <text x="-10" y="200" text-anchor="end" class="label">$0</text>
          <text x="-10" y="150" text-anchor="end" class="label">$200M</text>
          <text x="-10" y="100" text-anchor="end" class="label">$400M</text>
          <text x="-10" y="50" text-anchor="end" class="label">$800M</text>
          <text x="-10" y="10" text-anchor="end" class="label">$1T</text>
        </g>
      </svg>
    `,
    
    radar: (id, title) => `
      <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <title>${title}</title>
        <style>
          .axis { stroke: #ccc; stroke-width: 1; }
          .radar { fill: #04a3ff; fill-opacity: 0.4; stroke: #04a3ff; stroke-width: 2; }
          .label { font-family: Arial; font-size: 12px; fill: #fff; }
          .title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #fff; }
        </style>
        <rect width="100%" height="100%" fill="#1e293b" />
        <text x="400" y="30" text-anchor="middle" class="title">${title}</text>
        <g transform="translate(400, 150)">
          <!-- Radar circles -->
          <circle cx="0" cy="0" r="40" fill="none" stroke="#ccc" stroke-width="1" />
          <circle cx="0" cy="0" r="80" fill="none" stroke="#ccc" stroke-width="1" />
          <circle cx="0" cy="0" r="120" fill="none" stroke="#ccc" stroke-width="1" />
          
          <!-- Radar axes -->
          <line x1="0" y1="-120" x2="0" y2="120" class="axis" />
          <line x1="-120" y1="0" x2="120" y2="0" class="axis" />
          <line x1="-85" y1="-85" x2="85" y2="85" class="axis" />
          <line x1="85" y1="-85" x2="-85" y2="85" class="axis" />
          
          <!-- Radar polygon -->
          <polygon points="0,-100 86,-50 86,50 0,100 -86,50 -86,-50" class="radar" />
          
          <!-- Labels -->
          <text x="0" y="-130" text-anchor="middle" class="label">Performance</text>
          <text x="130" y="0" text-anchor="start" class="label">Funding</text>
          <text x="90" y="90" text-anchor="middle" class="label">Technology</text>
          <text x="0" y="130" text-anchor="middle" class="label">Market Share</text>
          <text x="-90" y="90" text-anchor="middle" class="label">Talent</text>
          <text x="-130" y="0" text-anchor="end" class="label">Strategy</text>
        </g>
      </svg>
    `,
    
    column: (id, title) => `
      <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <title>${title}</title>
        <style>
          .axis { stroke: #ccc; stroke-width: 1; }
          .bar1 { fill: #04a3ff; }
          .bar2 { fill: #00ffd3; }
          .bar3 { fill: #65ff00; }
          .label { font-family: Arial; font-size: 12px; fill: #fff; }
          .title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #fff; }
        </style>
        <rect width="100%" height="100%" fill="#1e293b" />
        <text x="400" y="30" text-anchor="middle" class="title">${title}</text>
        <g transform="translate(50, 50)">
          <!-- Y-axis -->
          <line x1="0" y1="0" x2="0" y2="200" class="axis" />
          <!-- X-axis -->
          <line x1="0" y1="200" x2="700" y2="200" class="axis" />
          
          <!-- Bars -->
          <rect x="50" y="50" width="60" height="150" class="bar1" />
          <rect x="120" y="100" width="60" height="100" class="bar2" />
          <rect x="190" y="120" width="60" height="80" class="bar3" />
          
          <rect x="300" y="30" width="60" height="170" class="bar1" />
          <rect x="370" y="70" width="60" height="130" class="bar2" />
          <rect x="440" y="110" width="60" height="90" class="bar3" />
          
          <rect x="550" y="10" width="60" height="190" class="bar1" />
          <rect x="620" y="60" width="60" height="140" class="bar2" />
          <rect x="690" y="90" width="60" height="110" class="bar3" />
          
          <!-- X-axis labels -->
          <text x="120" y="220" text-anchor="middle" class="label">IBM</text>
          <text x="370" y="220" text-anchor="middle" class="label">Google</text>
          <text x="620" y="220" text-anchor="middle" class="label">QDaria</text>
          
          <!-- Y-axis labels -->
          <text x="-10" y="200" text-anchor="end" class="label">0</text>
          <text x="-10" y="150" text-anchor="end" class="label">25</text>
          <text x="-10" y="100" text-anchor="end" class="label">50</text>
          <text x="-10" y="50" text-anchor="end" class="label">75</text>
          <text x="-10" y="10" text-anchor="end" class="label">100</text>
        </g>
      </svg>
    `,
    
    timeline: (id, title) => `
      <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <title>${title}</title>
        <style>
          .axis { stroke: #ccc; stroke-width: 1; }
          .milestone { fill: #04a3ff; }
          .timeline { stroke: #ccc; stroke-width: 2; stroke-dasharray: 4; }
          .label { font-family: Arial; font-size: 12px; fill: #fff; }
          .title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #fff; }
        </style>
        <rect width="100%" height="100%" fill="#1e293b" />
        <text x="400" y="30" text-anchor="middle" class="title">${title}</text>
        <g transform="translate(50, 50)">
          <!-- Timeline -->
          <line x1="0" y1="100" x2="700" y2="100" class="timeline" />
          
          <!-- Milestones -->
          <circle cx="50" cy="100" r="8" class="milestone" />
          <text x="50" y="130" text-anchor="middle" class="label">2025</text>
          <text x="50" y="85" text-anchor="middle" class="label">Founded</text>
          
          <circle cx="175" cy="100" r="8" class="milestone" />
          <text x="175" y="130" text-anchor="middle" class="label">2026</text>
          <text x="175" y="85" text-anchor="middle" class="label">Series A</text>
          
          <circle cx="300" cy="100" r="8" class="milestone" />
          <text x="300" y="130" text-anchor="middle" class="label">2027</text>
          <text x="300" y="85" text-anchor="middle" class="label">Series B</text>
          
          <circle cx="425" cy="100" r="8" class="milestone" />
          <text x="425" y="130" text-anchor="middle" class="label">2028</text>
          <text x="425" y="85" text-anchor="middle" class="label">First IPO</text>
          
          <circle cx="550" cy="100" r="8" class="milestone" />
          <text x="550" y="130" text-anchor="middle" class="label">2029</text>
          <text x="550" y="85" text-anchor="middle" class="label">Multiple IPOs</text>
          
          <circle cx="675" cy="100" r="8" class="milestone" />
          <text x="675" y="130" text-anchor="middle" class="label">2030</text>
          <text x="675" y="85" text-anchor="middle" class="label">Final IPO</text>
        </g>
      </svg>
    `,
    
    mixed: (id, title) => `
      <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <title>${title}</title>
        <style>
          .axis { stroke: #ccc; stroke-width: 1; }
          .revenue { stroke: #04a3ff; stroke-width: 3; fill: none; }
          .profit { stroke: #00ffd3; stroke-width: 3; fill: none; }
          .investment { fill: #65ff00; fill-opacity: 0.5; }
          .dot { fill: #04a3ff; }
          .label { font-family: Arial; font-size: 12px; fill: #fff; }
          .title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #fff; }
        </style>
        <rect width="100%" height="100%" fill="#1e293b" />
        <text x="400" y="30" text-anchor="middle" class="title">${title}</text>
        <g transform="translate(50, 50)">
          <!-- Y-axis -->
          <line x1="0" y1="0" x2="0" y2="200" class="axis" />
          <!-- X-axis -->
          <line x1="0" y1="200" x2="700" y2="200" class="axis" />
          
          <!-- Revenue line -->
          <path d="M0,190 L140,180 L280,160 L420,130 L560,80 L700,20" class="revenue" />
          
          <!-- Profit/Loss line -->
          <path d="M0,200 L140,210 L280,205 L420,190 L560,150 L700,70" class="profit" />
          
          <!-- Investment bars -->
          <rect x="0" y="170" width="30" height="30" class="investment" />
          <rect x="140" y="150" width="30" height="50" class="investment" />
          <rect x="280" y="130" width="30" height="70" class="investment" />
          <rect x="420" y="110" width="30" height="80" class="investment" />
          <rect x="560" y="70" width="30" height="80" class="investment" />
          
          <!-- Data points -->
          <circle cx="0" cy="190" r="4" class="dot" />
          <circle cx="140" cy="180" r="4" class="dot" />
          <circle cx="280" cy="160" r="4" class="dot" />
          <circle cx="420" cy="130" r="4" class="dot" />
          <circle cx="560" cy="80" r="4" class="dot" />
          <circle cx="700" cy="20" r="4" class="dot" />
          
          <!-- X-axis labels -->
          <text x="0" y="220" text-anchor="middle" class="label">2025</text>
          <text x="140" y="220" text-anchor="middle" class="label">2026</text>
          <text x="280" y="220" text-anchor="middle" class="label">2027</text>
          <text x="420" y="220" text-anchor="middle" class="label">2028</text>
          <text x="560" y="220" text-anchor="middle" class="label">2029</text>
          <text x="700" y="220" text-anchor="middle" class="label">2030</text>
          
          <!-- Y-axis labels -->
          <text x="-10" y="200" text-anchor="end" class="label">$0</text>
          <text x="-10" y="150" text-anchor="end" class="label">$10M</text>
          <text x="-10" y="100" text-anchor="end" class="label">$25M</text>
          <text x="-10" y="50" text-anchor="end" class="label">$50M</text>
          <text x="-10" y="10" text-anchor="end" class="label">$100M</text>
        </g>
      </svg>
    `,
    
    treemap: (id, title) => `
      <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <title>${title}</title>
        <style>
          .box1 { fill: #04a3ff; }
          .box2 { fill: #00ffd3; }
          .box3 { fill: #65ff00; }
          .box4 { fill: #9945FF; }
          .label { font-family: Arial; font-size: 14px; fill: #fff; font-weight: bold; }
          .title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #fff; }
        </style>
        <rect width="100%" height="100%" fill="#1e293b" />
        <text x="400" y="30" text-anchor="middle" class="title">${title}</text>
        <g transform="translate(50, 50)">
          <!-- Treemap -->
          <rect x="0" y="0" width="400" height="200" class="box1" />
          <text x="200" y="100" text-anchor="middle" class="label">QDaria Holdings</text>
          
          <rect x="410" y="0" width="140" height="95" class="box2" />
          <text x="480" y="50" text-anchor="middle" class="label">Zipminator</text>
          
          <rect x="410" y="105" width="140" height="95" class="box2" />
          <text x="480" y="150" text-anchor="middle" class="label">Qm9</text>
          
          <rect x="560" y="0" width="140" height="95" class="box3" />
          <text x="630" y="50" text-anchor="middle" class="label">QDiana</text>
          
          <rect x="560" y="105" width="140" height="95" class="box4" />
          <text x="630" y="150" text-anchor="middle" class="label">QMikeAI</text>
        </g>
      </svg>
    `,
    
    default: (id, title) => `
      <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <title>${title}</title>
        <style>
          .title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #fff; }
          .subtitle { font-family: Arial; font-size: 14px; fill: #ccc; }
        </style>
        <rect width="100%" height="100%" fill="#1e293b" />
        <text x="400" y="130" text-anchor="middle" class="title">${title}</text>
        <text x="400" y="160" text-anchor="middle" class="subtitle">Chart visualization placeholder</text>
      </svg>
    `
  };
  
  // Function to get the SVG template based on chart type
  function getSvgTemplate(id, type, title) {
    // Default to area chart if type is unknown
    if (!svgTemplates[type]) {
      return svgTemplates.default(id, title);
    }
    
    return svgTemplates[type](id, title);
  }
  
  // Chart definitions
  const chartDefinitions = [
    { id: 'marketGrowthChart', type: 'area', title: 'Quantum Computing Market Growth' },
    { id: 'forecastScenariosRangeChart', type: 'rangeArea', title: 'Quantum Computing Market Scenarios' },
    { id: 'quantumMarketForecastChart', type: 'area', title: 'Quantum Market Forecast' },
    { id: 'marketSizeProjectionsChart', type: 'area', title: 'Market Size Projections' },
    { id: 'quantumHardwareComparisonChart', type: 'column', title: 'Quantum Hardware Comparison' },
    { id: 'competitorRadarChart', type: 'radar', title: 'Competitor Analysis' },
    { id: 'organizationalChart', type: 'treemap', title: 'QDaria Organizational Structure' },
    { id: 'executionRoadmapChart', type: 'timeline', title: 'Execution Roadmap' },
    { id: 'financialMetricsMixedChart', type: 'mixed', title: 'Financial Projections' },
    { id: 'riskAssessmentChart', type: 'radar', title: 'Risk Assessment' },
    { id: 'fundingAllocationChart', type: 'treemap', title: 'Funding Allocation' },
    { id: 'investmentDistributionChart', type: 'column', title: 'Investment Distribution' },
    { id: 'roiComparisonChart', type: 'area', title: 'ROI Comparison' },
    { id: 'marketPositioningChart', type: 'radar', title: 'Market Positioning' },
    { id: 'revenueDiversificationChart', type: 'treemap', title: 'Revenue Diversification' },
    { id: 'stockPerformanceChart', type: 'area', title: 'Stock Performance' }
  ];
  
  // Function to replace "chart visualization unavailable" with SVG
  function fixChartVisualizations() {
    chartDefinitions.forEach(chart => {
      // Find the chart container
      const mainContainer = document.getElementById(chart.id);
      if (!mainContainer) return;
      
      // Find the chart element inside the container
      const chartElement = document.getElementById(`${chart.id}-chart`);
      if (!chartElement) return;
      
      // Check if it contains "unavailable" text
      const hasUnavailableText = 
        chartElement.textContent?.includes('unavailable') ||
        chartElement.textContent?.includes('visualization unavailable') ||
        chartElement.innerHTML?.includes('unavailable') ||
        chartElement.childNodes.length === 0 ||
        chartElement.innerHTML?.trim() === '';
      
      if (hasUnavailableText) {
        console.log(`🔄 Replacing unavailable visualization for ${chart.id}`);
        
        // Generate SVG fallback
        const svgFallback = getSvgTemplate(chart.id, chart.type, chart.title);
        
        // Replace the content
        chartElement.innerHTML = svgFallback;
        
        // Add success class
        chartElement.classList.add('svg-fallback-applied');
        
        console.log(`✅ Applied SVG fallback for ${chart.id}`);
      }
    });
  }
  
  // Watch for DOM changes that might contain "chart visualization unavailable" messages
  function setupMutationObserver() {
    const observer = new MutationObserver(mutations => {
      let shouldFix = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === Node.TEXT_NODE) {
              // Check if text node contains "unavailable"
              if (node.textContent && node.textContent.includes('unavailable')) {
                shouldFix = true;
                break;
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if element or its children contain "unavailable"
              if (node.textContent && node.textContent.includes('unavailable')) {
                shouldFix = true;
                break;
              }
            }
          }
        } else if (mutation.type === 'characterData') {
          // Text content has changed, check if it contains "unavailable"
          if (mutation.target.textContent && mutation.target.textContent.includes('unavailable')) {
            shouldFix = true;
          }
        }
      });
      
      if (shouldFix) {
        console.log('🔄 Found "unavailable" text, applying SVG fallbacks');
        fixChartVisualizations();
      }
    });
    
    // Start observing the document
    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true
    });
    
    console.log('👀 Mutation observer set up for unavailable visualizations');
  }
  
  // Run the fix after a slight delay to ensure the page has loaded
  setTimeout(fixChartVisualizations, 1000);
  
  // Run again after a longer delay to catch late-loading content
  setTimeout(fixChartVisualizations, 3000);
  
  // Also run on window load
  window.addEventListener('load', () => {
    console.log('🔄 Window loaded, applying SVG fallbacks');
    fixChartVisualizations();
    
    // Set up the mutation observer
    setupMutationObserver();
  });
  
  console.log('✅ Chart visualization fallback script setup complete');
})();
