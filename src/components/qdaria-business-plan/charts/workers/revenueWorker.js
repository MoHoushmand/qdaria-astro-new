/**
 * Revenue Chart Web Worker
 * 
 * This worker handles calculations for revenue projections to avoid
 * blocking the main UI thread.
 */

// Calculate cumulative values from yearly data
function calculateCumulative(data) {
  const result = [...data];
  
  for (let i = 1; i < data.length; i++) {
    result[i] = result[i] + result[i-1];
  }
  
  return result;
}

// Generate chart data structure for revenue
function generateChartData(revenueData, years, viewMode, darkMode) {
  const datasets = [];
  const colors = {
    'Service Revenue': {
      color: '#3b82f6', // Blue
      hoverColor: '#60a5fa',
    },
    'Product Revenue': {
      color: '#10b981', // Green 
      hoverColor: '#34d399',
    },
    'Licensing Revenue': { 
      color: '#8b5cf6', // Purple
      hoverColor: '#a78bfa',
    },
    'Consulting Revenue': {
      color: '#f59e0b', // Amber
      hoverColor: '#fbbf24',
    },
    'Training Revenue': {
      color: '#ec4899', // Pink
      hoverColor: '#f472b6',
    }
  };
  
  // Create datasets from revenue data
  Object.entries(revenueData).forEach(([name, values], index) => {
    // Use predefined colors or fallback to a default color
    const colorInfo = colors[name] || {
      color: `hsla(${index * 50}, 70%, 50%, 0.8)`,
      hoverColor: `hsla(${index * 50}, 70%, 60%, 0.9)`,
    };
    
    // If cumulative mode, transform the data
    const dataValues = viewMode === 'cumulative' 
      ? calculateCumulative(values)
      : values;
    
    datasets.push({
      label: name,
      data: dataValues,
      borderColor: colorInfo.color,
      backgroundColor: `${colorInfo.color}20`, // 20 = 12% opacity
      hoverBackgroundColor: `${colorInfo.color}40`, // 40 = 25% opacity
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: darkMode ? '#1f2937' : '#ffffff',
      pointBorderColor: colorInfo.color,
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: colorInfo.hoverColor,
      pointHoverBorderColor: darkMode ? '#1f2937' : '#ffffff',
    });
  });
  
  // Order datasets by value for better visual hierarchy
  if (datasets.length > 1) {
    datasets.sort((a, b) => {
      const aSum = a.data.reduce((sum, val) => sum + val, 0);
      const bSum = b.data.reduce((sum, val) => sum + val, 0);
      return bSum - aSum; // Descending order
    });
  }
  
  return {
    labels: years,
    datasets
  };
}

// Calculate yearly growth rates
function calculateGrowthRates(data) {
  const rates = [];
  
  for (let i = 1; i < data.length; i++) {
    const previousValue = data[i-1];
    const currentValue = data[i];
    
    // Avoid division by zero
    if (previousValue === 0) {
      rates.push(currentValue > 0 ? 100 : 0); // If previous is 0, and current is positive, that's 100% growth
    } else {
      const growthRate = ((currentValue - previousValue) / previousValue) * 100;
      rates.push(parseFloat(growthRate.toFixed(1)));
    }
  }
  
  return rates;
}

// Calculate insights and key metrics about the revenue data
function calculateMetrics(revenueData, years) {
  // Total revenue over time
  const totalRevenue = years.map((_, yearIndex) => {
    return Object.values(revenueData).reduce((total, values) => {
      return total + values[yearIndex];
    }, 0);
  });
  
  // Cumulative revenue
  const cumulativeRevenue = calculateCumulative(totalRevenue);
  
  // Growth rates
  const yearlyGrowthRates = calculateGrowthRates(totalRevenue);
  
  // Compound Annual Growth Rate (CAGR)
  const firstYear = totalRevenue[0];
  const lastYear = totalRevenue[totalRevenue.length - 1];
  const numberOfYears = totalRevenue.length - 1;
  let cagr = 0;
  
  if (firstYear > 0 && numberOfYears > 0) {
    cagr = Math.pow(lastYear / firstYear, 1 / numberOfYears) - 1;
    cagr = parseFloat((cagr * 100).toFixed(1));
  }
  
  // Breakdown by revenue stream at final year
  const finalYearBreakdown = {};
  Object.entries(revenueData).forEach(([name, values]) => {
    const finalValue = values[values.length - 1];
    finalYearBreakdown[name] = {
      value: finalValue,
      percentage: parseFloat(((finalValue / lastYear) * 100).toFixed(1))
    };
  });
  
  return {
    totalRevenue,
    cumulativeRevenue,
    yearlyGrowthRates,
    cagr,
    finalYearBreakdown,
    finalYearTotal: lastYear,
    averageAnnualRevenue: parseFloat((totalRevenue.reduce((sum, val) => sum + val, 0) / totalRevenue.length).toFixed(1))
  };
}

// Main worker message handler
self.onmessage = function(e) {
  try {
    const { revenueData, years, viewMode, darkMode } = e.data;
    
    // Generate chart data
    const chartData = generateChartData(revenueData, years, viewMode, darkMode);
    
    // Calculate metrics
    const metrics = calculateMetrics(revenueData, years);
    
    // Send processed data back to main thread
    self.postMessage({
      chartData,
      metrics
    });
  } catch (error) {
    // Send error back to main thread
    self.postMessage({ error: error.message });
  }
};