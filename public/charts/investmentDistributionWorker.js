// Investment Distribution Worker
// Processes data for the Investment Distribution Chart (COLUMN/BAR)

self.onmessage = function(e) {
  const { action, categories, values, colors, years, stacked } = e.data;
  
  if (action === 'prepareInvestmentData') {
    // Process the investment distribution data
    const chartData = processInvestmentData(categories, values, colors, years, stacked);
    
    // Send the processed data back to the main thread
    self.postMessage({
      action: 'investmentDataReady',
      chartData
    });
  }
};

/**
 * Process investment distribution data for visualization
 * @param {string[]} categories - Investment categories
 * @param {Object} values - Values for each category by year
 * @param {string[]} colors - Colors for each category
 * @param {string[]} years - Years to display
 * @param {boolean} stacked - Whether to use stacked bars
 * @returns {Object} Processed chart data
 */
function processInvestmentData(categories, values, colors, years, stacked) {
  // If no data is provided, use default sample data
  if (!categories || !values) {
    return getDefaultInvestmentData();
  }
  
  // Prepare series data for ApexCharts
  const series = categories.map((category, index) => {
    return {
      name: category,
      data: years.map(year => values[category]?.[year] || 0),
      color: colors?.[index] || getDefaultColor(index)
    };
  });
  
  // Calculate totals for each year
  const yearlyTotals = years.map(year => {
    return categories.reduce((total, category) => {
      return total + (values[category]?.[year] || 0);
    }, 0);
  });
  
  // Find highest investment category for each year
  const highestInvestments = years.map(year => {
    let highest = { category: '', value: 0 };
    
    categories.forEach(category => {
      const value = values[category]?.[year] || 0;
      if (value > highest.value) {
        highest = { category, value };
      }
    });
    
    return highest;
  });
  
  // Calculate growth rates between years
  const growthRates = [];
  for (let i = 1; i < yearlyTotals.length; i++) {
    const previousTotal = yearlyTotals[i - 1];
    const currentTotal = yearlyTotals[i];
    
    if (previousTotal > 0) {
      const growthRate = ((currentTotal - previousTotal) / previousTotal) * 100;
      growthRates.push({
        period: `${years[i-1]} to ${years[i]}`,
        rate: growthRate.toFixed(1)
      });
    } else {
      growthRates.push({
        period: `${years[i-1]} to ${years[i]}`,
        rate: 'N/A'
      });
    }
  }
  
  // Return processed data
  return {
    series,
    categories: years,
    colors: colors || categories.map((_, i) => getDefaultColor(i)),
    stacked: stacked || false,
    metrics: {
      yearlyTotals,
      highestInvestments,
      growthRates,
      totalInvestment: yearlyTotals.reduce((sum, total) => sum + total, 0)
    }
  };
}

/**
 * Get default color based on index
 * @param {number} index - Index of the category
 * @returns {string} Color hex code
 */
function getDefaultColor(index) {
  const colors = [
    '#04a3ff', // Primary blue
    '#00ffd3', // Teal
    '#f5b700', // Yellow
    '#ff6b6b', // Red
    '#7b61ff', // Purple
    '#00d085', // Green
    '#ff9f43', // Orange
    '#ee5253', // Pink
    '#2e86de', // Light blue
    '#8395a7'  // Gray
  ];
  
  return colors[index % colors.length];
}

/**
 * Generate default investment distribution data
 * @returns {Object} Default chart data
 */
function getDefaultInvestmentData() {
  const categories = [
    'Hardware R&D',
    'Software Development',
    'Marketing',
    'Operations',
    'Talent Acquisition'
  ];
  
  const years = ['2025', '2026', '2027', '2028', '2029'];
  
  const values = {
    'Hardware R&D': {
      '2025': 2.5,
      '2026': 4.0,
      '2027': 7.5,
      '2028': 12.0,
      '2029': 18.0
    },
    'Software Development': {
      '2025': 1.8,
      '2026': 3.5,
      '2027': 6.0,
      '2028': 9.5,
      '2029': 15.0
    },
    'Marketing': {
      '2025': 0.8,
      '2026': 2.0,
      '2027': 4.5,
      '2028': 8.0,
      '2029': 12.5
    },
    'Operations': {
      '2025': 1.2,
      '2026': 2.2,
      '2027': 3.5,
      '2028': 5.5,
      '2029': 8.0
    },
    'Talent Acquisition': {
      '2025': 0.7,
      '2026': 1.8,
      '2027': 3.0,
      '2028': 5.0,
      '2029': 7.5
    }
  };
  
  const colors = [
    '#04a3ff', // Primary blue
    '#00ffd3', // Teal
    '#f5b700', // Yellow
    '#ff6b6b', // Red
    '#7b61ff'  // Purple
  ];
  
  // Process the default data
  return processInvestmentData(categories, values, colors, years, false);
}
