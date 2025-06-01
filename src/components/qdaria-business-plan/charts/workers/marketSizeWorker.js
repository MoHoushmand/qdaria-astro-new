/**
 * Market Size Chart Web Worker
 * 
 * This worker handles calculations for market size projections to avoid
 * blocking the main UI thread.
 */

// Apply smoothing to data points using moving average
function smoothData(data, windowSize = 2) {
  if (windowSize <= 1 || data.length <= windowSize) {
    return data;
  }
  
  const result = [];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;
    
    for (let j = Math.max(0, i - windowSize); j <= Math.min(data.length - 1, i + windowSize); j++) {
      sum += data[j];
      count += 1;
    }
    
    result.push(sum / count);
  }
  
  return result;
}

// Generate quarterly data points between yearly values
function generateQuarterlyData(yearlyData) {
  if (yearlyData.length < 2) return yearlyData;
  
  const quarterlyData = [];
  
  for (let i = 0; i < yearlyData.length - 1; i++) {
    const startValue = yearlyData[i];
    const endValue = yearlyData[i + 1];
    const increment = (endValue - startValue) / 4;
    
    quarterlyData.push(startValue);
    for (let q = 1; q < 4; q++) {
      quarterlyData.push(startValue + (increment * q));
    }
  }
  
  // Add the last year's value
  quarterlyData.push(yearlyData[yearlyData.length - 1]);
  
  return quarterlyData;
}

// Generate chart data structure for market size
function generateChartData(initialData, years, smoothing, scenarios, scenariosVisible, quarterlyView, darkMode) {
  const datasets = [];
  let xLabels = years;
  
  // Process main dataset
  let mainData = initialData.slice();
  
  if (smoothing) {
    mainData = smoothData(mainData);
  }
  
  // Define colors
  const colors = {
    main: {
      color: '#3b82f6', // Blue
      hoverColor: '#60a5fa',
    },
    conservative: {
      color: '#ef4444', // Red
      hoverColor: '#f87171',
    },
    aggressive: {
      color: '#10b981', // Green
      hoverColor: '#34d399',
    }
  };
  
  // Generate labels based on view mode
  if (quarterlyView) {
    const quarterlyLabels = [];
    
    for (let year of years) {
      quarterlyLabels.push(`${year} Q1`);
      quarterlyLabels.push(`${year} Q2`);
      quarterlyLabels.push(`${year} Q3`);
      quarterlyLabels.push(`${year} Q4`);
    }
    
    xLabels = quarterlyLabels;
    
    // Convert data to quarterly
    mainData = generateQuarterlyData(mainData);
    
    // Adjust scenarios if visible
    if (scenariosVisible && scenarios) {
      if (scenarios.conservative) {
        scenarios.conservative = generateQuarterlyData(scenarios.conservative);
      }
      if (scenarios.aggressive) {
        scenarios.aggressive = generateQuarterlyData(scenarios.aggressive);
      }
    }
  }
  
  // Add main dataset
  datasets.push({
    label: 'Base Case',
    data: mainData,
    borderColor: colors.main.color,
    backgroundColor: `${colors.main.color}20`, // 20 = 12% opacity
    hoverBackgroundColor: `${colors.main.color}40`, // 40 = 25% opacity
    borderWidth: 2,
    fill: true,
    tension: 0.4,
    pointBackgroundColor: darkMode ? '#1f2937' : '#ffffff',
    pointBorderColor: colors.main.color,
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
    pointHoverBackgroundColor: colors.main.hoverColor,
    pointHoverBorderColor: darkMode ? '#1f2937' : '#ffffff',
  });
  
  // Add alternative scenarios if enabled
  if (scenariosVisible && scenarios) {
    // Conservative scenario
    if (scenarios.conservative) {
      let conservativeData = scenarios.conservative.slice();
      
      if (smoothing) {
        conservativeData = smoothData(conservativeData);
      }
      
      datasets.push({
        label: 'Conservative Case',
        data: conservativeData,
        borderColor: colors.conservative.color,
        backgroundColor: `${colors.conservative.color}10`,
        hoverBackgroundColor: `${colors.conservative.color}30`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: darkMode ? '#1f2937' : '#ffffff',
        pointBorderColor: colors.conservative.color,
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.conservative.hoverColor,
        pointHoverBorderColor: darkMode ? '#1f2937' : '#ffffff',
      });
    }
    
    // Aggressive scenario
    if (scenarios.aggressive) {
      let aggressiveData = scenarios.aggressive.slice();
      
      if (smoothing) {
        aggressiveData = smoothData(aggressiveData);
      }
      
      datasets.push({
        label: 'Aggressive Case',
        data: aggressiveData,
        borderColor: colors.aggressive.color,
        backgroundColor: `${colors.aggressive.color}10`,
        hoverBackgroundColor: `${colors.aggressive.color}30`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: darkMode ? '#1f2937' : '#ffffff',
        pointBorderColor: colors.aggressive.color,
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.aggressive.hoverColor,
        pointHoverBorderColor: darkMode ? '#1f2937' : '#ffffff',
      });
    }
  }
  
  return {
    labels: xLabels,
    datasets
  };
}

// Main worker message handler
self.onmessage = function(e) {
  try {
    const { initialData, years, smoothing, scenarios, scenariosVisible, quarterlyView, darkMode } = e.data;
    
    // Generate chart data
    const chartData = generateChartData(
      initialData, 
      years, 
      smoothing, 
      scenarios, 
      scenariosVisible, 
      quarterlyView, 
      darkMode
    );
    
    // Send processed data back to main thread
    self.postMessage({
      chartData
    });
  } catch (error) {
    // Send error back to main thread
    self.postMessage({ error: error.message });
  }
};