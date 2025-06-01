// Market Size Projections Chart Worker
// Processes data for the market size projections chart to offload computation from the main thread

/**
 * Process data for the market size projections chart
 * @param {Object} data - The data to process
 * @param {Array} data.years - Array of years for the x-axis
 * @param {Object} data.scenarios - Object containing different scenarios with their values
 * @param {Array} data.scenarioColors - Array of colors for each scenario
 * @returns {Object} Processed data for the chart
 */
function processData(data) {
  const { years, scenarios, scenarioColors } = data;
  
  // Prepare series data for ApexCharts
  const series = Object.keys(scenarios).map((scenarioName, index) => ({
    name: scenarioName,
    data: scenarios[scenarioName],
    color: scenarioColors ? scenarioColors[index] : undefined
  }));
  
  // Calculate year-over-year growth rates for each scenario
  const yoyGrowth = {};
  Object.keys(scenarios).forEach(scenarioName => {
    yoyGrowth[scenarioName] = scenarios[scenarioName].map((value, index) => {
      if (index === 0) return null;
      return ((value / scenarios[scenarioName][index - 1]) - 1) * 100;
    });
  });
  
  // Calculate CAGR (Compound Annual Growth Rate) for each scenario
  const cagr = {};
  Object.keys(scenarios).forEach(scenarioName => {
    const values = scenarios[scenarioName];
    const startValue = values[0];
    const endValue = values[values.length - 1];
    const numberOfYears = years.length - 1;
    
    // CAGR formula: (End Value / Start Value) ^ (1 / Number of Years) - 1
    cagr[scenarioName] = ((Math.pow(endValue / startValue, 1 / numberOfYears)) - 1) * 100;
  });
  
  // Determine key milestone points for each scenario (e.g., when it crosses $1T)
  const milestones = {};
  Object.keys(scenarios).forEach(scenarioName => {
    milestones[scenarioName] = {
      trillion: findMilestoneYear(scenarios[scenarioName], years, 1000) // Find when it reaches $1T
    };
  });
  
  // Prepare enhanced table data with growth rates
  const tableData = years.map((year, i) => {
    const row = { year };
    
    Object.keys(scenarios).forEach(scenarioName => {
      // Add the value for this scenario
      row[scenarioName] = scenarios[scenarioName][i];
      
      // Add YoY growth rate if not the first year
      if (i > 0) {
        row[`${scenarioName}_growth`] = yoyGrowth[scenarioName][i];
      }
    });
    
    return row;
  });
  
  // Calculate appropriate y-axis intervals based on data range
  const allValues = Object.values(scenarios).flat();
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  
  // Define logarithmic scale ticks for better visualization
  const logTicks = [0.1, 1, 10, 100, 1000, 10000].filter(
    tick => tick >= minValue * 0.1 && tick <= maxValue * 10
  );
  
  // Create annotations for important milestones
  const annotations = {
    yaxis: [
      {
        y: 1000,
        borderColor: '#00E396',
        strokeDashArray: 5,
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
            padding: {
              left: 10,
              right: 10,
              top: 5,
              bottom: 5
            },
            fontSize: '12px'
          },
          text: '$1 Trillion Milestone'
        }
      }
    ]
  };
  
  return {
    series,
    xaxis: { categories: years },
    yaxis: { 
      min: Math.max(0.1, minValue * 0.5), 
      max: maxValue * 1.1,
      logTicks
    },
    annotations,
    tableData,
    years,
    scenarios: Object.keys(scenarios),
    yoyGrowth,
    cagr,
    milestones
  };
}

/**
 * Find the year when a scenario crosses a specific threshold
 * @param {Array} values - Array of values for a scenario
 * @param {Array} years - Array of years corresponding to values
 * @param {number} threshold - The threshold to find (e.g., 1000 for $1T)
 * @returns {Object|null} Object with year and value, or null if threshold not reached
 */
function findMilestoneYear(values, years, threshold) {
  for (let i = 0; i < values.length; i++) {
    if (values[i] >= threshold) {
      return {
        year: years[i],
        value: values[i],
        index: i
      };
    }
  }
  return null;
}

/**
 * Format currency values for display
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(1)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  } else {
    return `$${value.toFixed(0)}`;
  }
}

/**
 * Format percentage values for display
 * @param {number} value - The percentage value to format
 * @returns {string} Formatted percentage string
 */
function formatPercentage(value) {
  if (value === null || value === undefined) return '-';
  return `${value.toFixed(1)}%`;
}

// Handle messages from the main thread
self.onmessage = function(e) {
  try {
    const message = e.data;
    
    if (message.action === 'prepareData') {
      // Process the data
      const chartData = processData(message);
      
      // Send the result back to the main thread
      self.postMessage({
        action: 'dataReady',
        chartData,
        formatters: {
          formatCurrency: formatCurrency.toString(),
          formatPercentage: formatPercentage.toString()
        }
      });
    }
  } catch (error) {
    // Send error back to main thread
    self.postMessage({
      action: 'error',
      error: error.message
    });
  }
};
