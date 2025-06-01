// Revenue Diversification Worker
// Processes data for the Revenue Diversification Chart (TREEMAP)

self.onmessage = function(e) {
  const { action, revenueData, year, colors } = e.data;
  
  if (action === 'prepareRevenueData') {
    // Process the revenue diversification data
    const chartData = processRevenueData(revenueData, year, colors);
    
    // Send the processed data back to the main thread
    self.postMessage({
      action: 'revenueDataReady',
      chartData
    });
  }
};

/**
 * Process revenue diversification data for visualization
 * @param {Object} revenueData - Revenue data by category and subcategory
 * @param {number|string} year - Year to display data for
 * @param {string[]} colors - Colors for each category
 * @returns {Object} Processed chart data
 */
function processRevenueData(revenueData, year, colors) {
  // If no data is provided, use default sample data
  if (!revenueData || Object.keys(revenueData).length === 0) {
    return getDefaultRevenueData(year);
  }
  
  // Filter data for the selected year
  const yearData = revenueData[year] || {};
  
  // Prepare series data for ApexCharts
  const series = [];
  const labels = [];
  const colorMap = {};
  
  // Process each category
  Object.keys(yearData).forEach((category, categoryIndex) => {
    const categoryData = yearData[category];
    const categoryColor = colors?.[categoryIndex] || getDefaultColor(categoryIndex);
    
    // Store category color
    colorMap[category] = categoryColor;
    
    // If category data is a number, add it as a top-level item
    if (typeof categoryData === 'number') {
      series.push({
        name: category,
        value: categoryData,
        color: categoryColor
      });
      labels.push(category);
    } 
    // If category data is an object, process subcategories
    else if (typeof categoryData === 'object') {
      // Add category as a parent item
      const categoryTotal = Object.values(categoryData).reduce((sum, value) => sum + (typeof value === 'number' ? value : 0), 0);
      
      series.push({
        name: category,
        value: categoryTotal,
        color: categoryColor
      });
      labels.push(category);
      
      // Add subcategories
      Object.keys(categoryData).forEach((subcategory, subcategoryIndex) => {
        const subcategoryValue = categoryData[subcategory];
        if (typeof subcategoryValue === 'number') {
          // Generate a lighter shade of the category color for subcategories
          const subcategoryColor = lightenColor(categoryColor, 0.2 * (subcategoryIndex + 1));
          
          series.push({
            name: subcategory,
            parent: category,
            value: subcategoryValue,
            color: subcategoryColor
          });
          labels.push(subcategory);
          
          // Store subcategory color
          colorMap[subcategory] = subcategoryColor;
        }
      });
    }
  });
  
  // Calculate total revenue
  const totalRevenue = series
    .filter(item => !item.parent)
    .reduce((sum, item) => sum + item.value, 0);
  
  // Calculate percentages
  const percentages = {};
  series.forEach(item => {
    if (!item.parent) {
      percentages[item.name] = (item.value / totalRevenue) * 100;
    } else {
      const parentTotal = series.find(s => s.name === item.parent)?.value || 0;
      percentages[item.name] = parentTotal > 0 ? (item.value / parentTotal) * 100 : 0;
    }
  });
  
  // Find top categories and subcategories
  const topCategories = [...series]
    .filter(item => !item.parent)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map(item => ({
      name: item.name,
      value: item.value,
      percentage: percentages[item.name]
    }));
  
  const topSubcategories = [...series]
    .filter(item => item.parent)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map(item => ({
      name: item.name,
      parent: item.parent,
      value: item.value,
      percentage: percentages[item.name]
    }));
  
  // Calculate growth metrics if previous year data is available
  const growthMetrics = {};
  
  if (revenueData[year - 1]) {
    const prevYearData = revenueData[year - 1];
    
    // Calculate growth for each category
    Object.keys(yearData).forEach(category => {
      const currentValue = typeof yearData[category] === 'number' 
        ? yearData[category] 
        : Object.values(yearData[category]).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
      
      const prevValue = typeof prevYearData[category] === 'number'
        ? prevYearData[category]
        : prevYearData[category] 
          ? Object.values(prevYearData[category]).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0)
          : 0;
      
      if (prevValue > 0) {
        growthMetrics[category] = {
          growth: currentValue - prevValue,
          growthPercentage: ((currentValue - prevValue) / prevValue) * 100
        };
      }
    });
  }
  
  // Return processed data
  return {
    series,
    labels,
    colorMap,
    totalRevenue,
    percentages,
    topCategories,
    topSubcategories,
    growthMetrics,
    year
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
 * Lighten a color by a given amount
 * @param {string} color - Hex color code
 * @param {number} amount - Amount to lighten (0-1)
 * @returns {string} Lightened color hex code
 */
function lightenColor(color, amount) {
  // Remove # if present
  color = color.replace('#', '');
  
  // Parse the color
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);
  
  // Lighten the color
  r = Math.min(255, Math.round(r + (255 - r) * amount));
  g = Math.min(255, Math.round(g + (255 - g) * amount));
  b = Math.min(255, Math.round(b + (255 - b) * amount));
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Generate default revenue diversification data
 * @param {number|string} year - Year to generate data for
 * @returns {Object} Default chart data
 */
function getDefaultRevenueData(year = 2030) {
  // Convert year to number if it's a string
  const yearNum = typeof year === 'string' ? parseInt(year, 10) : year;
  
  // Generate sample data for the selected year and previous year
  const revenueData = {};
  
  // Previous year data (for growth calculations)
  revenueData[yearNum - 1] = {
    'Quantum Hardware': {
      'QPU Sales': 12.5,
      'Hardware Licensing': 8.2,
      'Maintenance Contracts': 5.1
    },
    'Quantum Software': {
      'QDaria OS': 15.3,
      'Development Tools': 7.8,
      'Application Licensing': 9.2
    },
    'Quantum Services': {
      'Cloud Access': 18.7,
      'Consulting': 6.4,
      'Training & Education': 4.9
    },
    'Quantum AI': {
      'AI Models': 11.2,
      'Algorithm Licensing': 7.5,
      'Custom Solutions': 5.8
    },
    'Research Partnerships': 14.6,
    'Government Contracts': 9.8
  };
  
  // Current year data (with growth)
  revenueData[yearNum] = {
    'Quantum Hardware': {
      'QPU Sales': 18.7,
      'Hardware Licensing': 12.3,
      'Maintenance Contracts': 7.6
    },
    'Quantum Software': {
      'QDaria OS': 22.9,
      'Development Tools': 11.7,
      'Application Licensing': 13.8
    },
    'Quantum Services': {
      'Cloud Access': 28.1,
      'Consulting': 9.6,
      'Training & Education': 7.4
    },
    'Quantum AI': {
      'AI Models': 16.8,
      'Algorithm Licensing': 11.3,
      'Custom Solutions': 8.7
    },
    'Research Partnerships': 21.9,
    'Government Contracts': 14.7
  };
  
  // Define colors for each category
  const colors = [
    '#04a3ff', // Quantum Hardware
    '#00ffd3', // Quantum Software
    '#f5b700', // Quantum Services
    '#7b61ff', // Quantum AI
    '#00d085', // Research Partnerships
    '#ff6b6b'  // Government Contracts
  ];
  
  // Process the data
  return processRevenueData(revenueData, yearNum, colors);
}
