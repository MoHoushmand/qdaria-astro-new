// Revenue Chart Worker
// Processes data for the revenue chart to offload computation from the main thread

/**
 * Process data for the revenue chart
 * @param {Object} data - The data to process
 * @param {Array} data.years - Array of years to display
 * @param {Object} data.revenue - Revenue data by category and year
 * @param {Array} data.categories - Revenue categories
 * @param {Array} data.colors - Array of colors for each category
 * @returns {Object} Processed data for the chart
 */
function processData(data) {
  const { years, revenue, categories, colors } = data;
  
  // Prepare series data for ApexCharts mixed chart
  const series = [];
  
  // Add total revenue as a line series
  const totalRevenueSeries = {
    name: 'Total Revenue',
    type: 'line',
    data: years.map(year => {
      // Calculate total revenue for this year across all categories
      return Object.values(revenue).reduce((total, categoryData) => {
        return total + (categoryData[year] || 0);
      }, 0);
    })
  };
  
  // Add to series
  series.push(totalRevenueSeries);
  
  // Add each revenue category as a bar series
  categories.forEach(category => {
    const categorySeries = {
      name: category,
      type: 'column',
      data: years.map(year => revenue[category]?.[year] || 0)
    };
    
    // Add to series
    series.push(categorySeries);
  });
  
  // Calculate min and max values for y-axis
  const allValues = series.flatMap(s => s.data);
  const maxValue = Math.max(...allValues) * 1.1; // Add 10% padding
  
  // Prepare annotations for $1 Trillion milestone
  const annotations = {
    yaxis: []
  };
  
  // Add $1 Trillion milestone if max value is close to or exceeds it
  if (maxValue >= 800) {
    annotations.yaxis.push({
      y: 1000,
      borderColor: '#FF6B6B',
      label: {
        text: '$1 Trillion Milestone',
        position: 'left',
        style: {
          color: '#fff',
          background: '#FF6B6B'
        }
      }
    });
  }
  
  // Prepare table data
  const tableData = years.map(year => {
    const rowData = { Year: year };
    
    // Add each category's revenue for this year
    categories.forEach(category => {
      rowData[category] = formatCurrency(revenue[category]?.[year] || 0);
    });
    
    // Add total revenue for this year
    rowData['Total'] = formatCurrency(
      categories.reduce((total, category) => {
        return total + (revenue[category]?.[year] || 0);
      }, 0)
    );
    
    return rowData;
  });
  
  return {
    series,
    categories,
    years,
    maxValue,
    annotations,
    tableData,
    colors: colors || generateColors(categories.length + 1) // +1 for total revenue
  };
}

/**
 * Format currency value
 * @param {number} value - Value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}T`;
  } else if (value >= 1) {
    return `$${value.toFixed(1)}B`;
  } else {
    return `$${(value * 1000).toFixed(0)}M`;
  }
}

/**
 * Generate colors for categories if not provided
 * @param {number} count - Number of colors to generate
 * @returns {Array} Array of colors
 */
function generateColors(count) {
  const baseColors = [
    '#04a3ff', // QDaria blue - for total revenue
    '#00FFD3', // Teal
    '#65ff00', // Green
    '#F5B700', // Yellow
    '#FF6B6B', // Red
    '#7B61FF', // Purple
    '#9D73FE', // Light purple
    '#00A4EF'  // Light blue
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
