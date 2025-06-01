// Profitability Chart Worker
// Processes data for the profitability chart to offload computation from the main thread

/**
 * Process data for the profitability chart
 * @param {Object} data - The data to process
 * @param {Array} data.years - Array of years to display
 * @param {Array} data.ebitda - EBITDA values by year
 * @param {Array} data.revenue - Revenue values by year
 * @param {Array} data.costs - Costs values by year
 * @param {Array} data.colors - Array of colors for each series
 * @returns {Object} Processed data for the chart
 */
function processData(data) {
  const { years, ebitda, revenue, costs, colors } = data;
  
  // Prepare series data for ApexCharts mixed chart
  const series = [];
  
  // Add EBITDA as a line series
  const ebitdaSeries = {
    name: 'EBITDA',
    type: 'line',
    data: ebitda || []
  };
  
  // Add to series
  series.push(ebitdaSeries);
  
  // Add Revenue as a line series if provided
  if (revenue && revenue.length > 0) {
    const revenueSeries = {
      name: 'Revenue',
      type: 'line',
      data: revenue
    };
    
    // Add to series
    series.push(revenueSeries);
  }
  
  // Add Costs as a line series if provided
  if (costs && costs.length > 0) {
    const costsSeries = {
      name: 'Costs',
      type: 'line',
      data: costs
    };
    
    // Add to series
    series.push(costsSeries);
  }
  
  // Calculate min and max values for y-axis
  const allValues = series.flatMap(s => s.data);
  const minValue = Math.min(...allValues) * 1.1; // Add 10% padding
  const maxValue = Math.max(...allValues) * 1.1; // Add 10% padding
  
  // Prepare annotations
  const annotations = {
    yaxis: [],
    xaxis: []
  };
  
  // Add breakeven point annotation if EBITDA crosses zero
  let breakevenYear = null;
  let breakevenIndex = -1;
  
  for (let i = 0; i < ebitda.length - 1; i++) {
    if ((ebitda[i] <= 0 && ebitda[i + 1] > 0) || (ebitda[i] < 0 && ebitda[i + 1] >= 0)) {
      breakevenYear = years[i + 1];
      breakevenIndex = i + 1;
      break;
    }
  }
  
  if (breakevenYear) {
    // Add vertical line at breakeven year
    annotations.xaxis.push({
      x: breakevenYear,
      strokeDashArray: 0,
      borderColor: '#00FFD3',
      label: {
        text: 'Breakeven Point',
        orientation: 'horizontal',
        position: 'top',
        style: {
          color: '#fff',
          background: '#00FFD3'
        }
      }
    });
  }
  
  // Add zero line if we have negative values
  if (minValue < 0) {
    annotations.yaxis.push({
      y: 0,
      strokeDashArray: 5,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      label: {
        text: 'Breakeven',
        position: 'left',
        style: {
          color: '#fff',
          background: 'rgba(0, 0, 0, 0.5)'
        }
      }
    });
  }
  
  // Calculate key metrics
  const metrics = calculateMetrics(years, ebitda, breakevenYear);
  
  // Prepare table data
  const tableData = years.map((year, index) => {
    const rowData = { Year: year };
    
    // Add EBITDA for this year
    rowData['EBITDA'] = formatCurrency(ebitda[index] || 0);
    
    // Add Revenue for this year if provided
    if (revenue && revenue.length > 0) {
      rowData['Revenue'] = formatCurrency(revenue[index] || 0);
    }
    
    // Add Costs for this year if provided
    if (costs && costs.length > 0) {
      rowData['Costs'] = formatCurrency(costs[index] || 0);
    }
    
    // Add EBITDA Margin if revenue is provided
    if (revenue && revenue.length > 0 && revenue[index] > 0) {
      const margin = ((ebitda[index] || 0) / revenue[index]) * 100;
      rowData['EBITDA Margin'] = `${margin.toFixed(1)}%`;
    }
    
    return rowData;
  });
  
  return {
    series,
    years,
    minValue,
    maxValue,
    annotations,
    tableData,
    metrics,
    colors: colors || generateColors(series.length)
  };
}

/**
 * Calculate key metrics for the profitability chart
 * @param {Array} years - Array of years
 * @param {Array} ebitda - EBITDA values by year
 * @param {number|null} breakevenYear - Year when EBITDA becomes positive
 * @returns {Object} Key metrics
 */
function calculateMetrics(years, ebitda, breakevenYear) {
  // Get the last year's EBITDA
  const finalEbitda = ebitda[ebitda.length - 1];
  
  // Calculate CAGR if we have at least 2 years of data and first year is not zero or positive
  let cagr = null;
  if (ebitda.length >= 2 && ebitda[0] !== 0) {
    // If first year is negative, we can't calculate traditional CAGR
    // Instead, calculate average annual growth rate
    if (ebitda[0] < 0) {
      // Calculate average annual change
      const totalChange = finalEbitda - ebitda[0];
      const years = ebitda.length - 1;
      cagr = totalChange / years;
    } else {
      // Traditional CAGR calculation
      const years = ebitda.length - 1;
      cagr = (Math.pow(finalEbitda / ebitda[0], 1 / years) - 1) * 100;
    }
  }
  
  // Find peak EBITDA
  const peakEbitda = Math.max(...ebitda);
  
  return {
    finalEbitda,
    cagr,
    breakevenYear,
    peakEbitda
  };
}

/**
 * Format currency value
 * @param {number} value - Value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '+';
  
  if (absValue >= 1000) {
    return `${sign}$${(absValue / 1000).toFixed(1)}B`;
  } else if (absValue >= 1) {
    return `${sign}$${absValue.toFixed(1)}M`;
  } else {
    return `${sign}$${(absValue * 1000).toFixed(0)}K`;
  }
}

/**
 * Generate colors for series if not provided
 * @param {number} count - Number of colors to generate
 * @returns {Array} Array of colors
 */
function generateColors(count) {
  const baseColors = [
    '#04a3ff', // QDaria blue - for EBITDA
    '#00FFD3', // Teal - for Revenue
    '#FF6B6B', // Red - for Costs
    '#F5B700', // Yellow
    '#7B61FF', // Purple
    '#9D73FE'  // Light purple
  ];
  
  // If we have enough base colors, use them
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }
  
  // Otherwise, generate additional colors
  const colors = [...baseColors];
  for (let i = baseColors.length; i < count; i++) {
    const hue = (i * 137.5) % 360; // Golden angle approximation for even distribution
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  
  return colors;
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
        chartData
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
