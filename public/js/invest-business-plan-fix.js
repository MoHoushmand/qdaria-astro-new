/**
 * EMERGENCY FIX SPECIFICALLY FOR /invest/business-plan PATH
 * This script detects and fixes the business plan charts
 */

(function() {
  console.log('🚨 INVEST BUSINESS PLAN FIX SCRIPT ACTIVATED');
  
  // Function to check if we're on the business plan page
  function isInvestBusinessPlanPage() {
    return window.location.pathname.includes('/invest/business-plan') || 
           (window.location.pathname.includes('/business-plan') && document.title.includes('QDaria Business Plan'));
  }
  
  // If not on the right page, exit early
  if (!isInvestBusinessPlanPage()) {
    console.log('Not on /invest/business-plan page, skipping fix');
    return;
  }
  
  console.log('📊 Detected /invest/business-plan page, applying special fix');
  
  // Chart definitions for the business plan page
  const businessPlanCharts = [
    {
      id: "marketGrowthChart",
      title: "Quantum Computing Market Growth",
      description: "Projected increase in quantum computing market value (2025-2035)",
      type: "area",
      workerPath: "/charts/marketGrowthWorker.js"
    },
    {
      id: "forecastScenariosRangeChart",
      title: "Quantum Computing Market Scenarios",
      description: "Conservative, expected, and optimistic growth scenarios (2025-2035)",
      type: "rangeArea",
      workerPath: "/charts/forecastScenariosRangeWorker.js"
    },
    {
      id: "quantumMarketForecastChart",
      title: "Quantum Market Forecast",
      description: "Market size projections for quantum computing",
      type: "line",
      workerPath: "/charts/quantumMarketForecastWorker.js"
    },
    {
      id: "marketSizeProjectionsChart",
      title: "Market Size Projections",
      description: "Quantum computing market size projections (2025-2035)",
      type: "area",
      workerPath: "/charts/marketSizeWorker.js"
    },
    {
      id: "quantumHardwareComparisonChart",
      title: "Quantum Hardware Comparison",
      description: "Comparison of quantum computing hardware platforms",
      type: "column",
      workerPath: "/charts/quantumHardwareComparisonWorker.js"
    },
    {
      id: "competitorRadarChart",
      title: "Competitor Analysis",
      description: "Competitor funding and capabilities",
      type: "radar",
      workerPath: "/charts/competitorRadarWorker.js"
    },
    {
      id: "organizationalChart",
      title: "QDaria Organizational Structure",
      description: "Planned organizational structure with subsidiaries",
      type: "treemap",
      workerPath: "/charts/organizationalChartWorker.js"
    },
    {
      id: "executionRoadmapChart",
      title: "Execution Roadmap",
      description: "Strategic timeline for QDaria's growth and IPO events",
      type: "timeline",
      workerPath: "/charts/executionRoadmapWorker.js"
    },
    {
      id: "financialMetricsMixedChart",
      title: "Financial Projections",
      description: "Revenue and profitability projections (2025-2030)",
      type: "mixed",
      workerPath: "/charts/financialMetricsMixedWorker.js"
    },
    {
      id: "riskAssessmentChart",
      title: "Risk Assessment",
      description: "Analysis of key risk factors and mitigation strategies",
      type: "radar",
      workerPath: "/charts/riskAssessmentWorker.js"
    }
  ];
  
  // Function to check if a chart needs fixing/recreation
  function needsFixing(id) {
    const el = document.getElementById(id);
    
    // Missing chart container completely
    if (!el) return true;
    
    // Empty chart container 
    if (el.children.length === 0) return true;
    
    // Contains only "Loading chart..." text
    if (el.innerText.trim() === "Loading chart...") return true;
    
    // No actual chart container inside
    if (!document.getElementById(`${id}-chart`)) return true;
    
    // Chart container is empty
    const chartContainer = document.getElementById(`${id}-chart`);
    if (chartContainer && chartContainer.children.length === 0) return true;
    
    // Otherwise, chart seems OK
    return false;
  }
  
  // Function to create a completely new chart container
  function createChartContainer(chart) {
    console.log(`🔨 Creating new chart container for ${chart.id}`);
    
    const container = document.createElement('div');
    container.id = chart.id;
    container.className = 'apex-chart-container chart-placeholder';
    
    container.innerHTML = `
      <h3 class="chart-title selectable">${chart.title}</h3>
      <p class="chart-description selectable">${chart.description}</p>
      
      <div class="chart-content">
        <div id="${chart.id}-chart" class="chart-container" tabindex="0" 
             role="img" aria-label="${chart.title}" style="min-height: 300px;"></div>
      </div>
      
      <div id="${chart.id}-data-table" class="chart-data-table visible" aria-hidden="false" style="display: block !important; visibility: visible !important;">
        <div class="data-table-header">
          <span class="data-table-title">Data Table: ${chart.title}</span>
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
              <tr>
                <td>2025</td>
                <td>1.5B</td>
              </tr>
              <tr>
                <td>2030</td>
                <td>65B</td>
              </tr>
              <tr>
                <td>2035</td>
                <td>952B</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
    
    return container;
  }
  
  // Function to inject chart worker script
  function injectChartScript(chart) {
    console.log(`📊 Loading worker script for ${chart.id}: ${chart.workerPath}`);
    
    // First check if script is already loaded
    const existingScript = document.querySelector(`script[src="${chart.workerPath}"]`);
    if (existingScript) {
      console.log(`⚠️ Script already loaded for ${chart.id}, skipping`);
      return;
    }
    
    // Create and inject the script
    const script = document.createElement('script');
    script.src = chart.workerPath;
    script.async = true;
    script.onload = function() {
      console.log(`✅ Worker script loaded for ${chart.id}`);
    };
    script.onerror = function() {
      console.error(`❌ Failed to load worker script for ${chart.id}`);
    };
    
    document.head.appendChild(script);
  }
  
  // Main function to fix all charts
  function fixAllCharts() {
    console.log('🔧 Running fix for all business plan charts');
    
    businessPlanCharts.forEach(chart => {
      try {
        // Check if chart needs fixing
        if (!needsFixing(chart.id)) {
          console.log(`✅ Chart ${chart.id} looks good, no need to fix`);
          return;
        }
        
        console.log(`🔧 Fixing chart: ${chart.id}`);
        
        // Find existing chart container
        let chartContainer = document.getElementById(chart.id);
        let mustReplace = false;
        
        // If no container exists, find placeholder to replace
        if (!chartContainer) {
          chartContainer = document.querySelector(`.chart-placeholder[id="${chart.id}"]`);
          if (!chartContainer) {
            console.log(`❌ Could not find chart container for ${chart.id}`);
            return;
          }
          mustReplace = true;
        }
        
        // Create a brand new chart container
        const newContainer = createChartContainer(chart);
        
        // Replace or update the existing container
        if (mustReplace) {
          chartContainer.parentNode.replaceChild(newContainer, chartContainer);
        } else {
          // Empty existing container and fill with new content
          chartContainer.innerHTML = newContainer.innerHTML;
        }
        
        console.log(`✅ Chart container fixed for ${chart.id}`);
        
        // Inject the worker script
        injectChartScript(chart);
        
      } catch (error) {
        console.error(`❌ Error fixing chart ${chart.id}:`, error);
      }
    });
    
    // Initialize charts if global function exists
    if (window.initializeQdariaCharts && typeof window.initializeQdariaCharts === 'function') {
      console.log('🔄 Calling initializeQdariaCharts()');
      try {
        window.initializeQdariaCharts();
      } catch (error) {
        console.error('❌ Error initializing charts:', error);
      }
    } else {
      console.log('⚠️ No global initialize function found');
    }
  }
  
  // Run the fix with delay to ensure DOM is ready
  setTimeout(function() {
    console.log('🔄 Running business plan chart fix');
    fixAllCharts();
  }, 500);
  
  // Run again after a longer delay for safety
  setTimeout(function() {
    console.log('🔄 Running business plan chart fix (second pass)');
    fixAllCharts();
  }, 2000);
  
  // Also run on window load
  window.addEventListener('load', function() {
    console.log('🔄 Window loaded - Running business plan chart fix');
    fixAllCharts();
  });
  
  // Watch for DOM changes to catch dynamically added content
  const observer = new MutationObserver(function(mutations) {
    let shouldFix = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if any of the added nodes are chart containers or placeholders
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node;
            if (el.id && businessPlanCharts.some(chart => chart.id === el.id)) {
              shouldFix = true;
              break;
            }
            
            if (el.className && (el.className.includes('chart-placeholder') || el.className.includes('apex-chart-container'))) {
              shouldFix = true;
              break;
            }
          }
        }
      }
    });
    
    if (shouldFix) {
      console.log('🔄 DOM changes detected, re-running fix');
      fixAllCharts();
    }
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log('✅ Business plan chart fix setup complete');
})();
