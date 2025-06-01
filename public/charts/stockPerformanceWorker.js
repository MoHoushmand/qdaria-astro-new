// Stock Performance Worker
// Processes data for the Stock Performance Chart (CANDLESTICK)

self.onmessage = function(e) {
  const { action, stockData, timeRange, companies } = e.data;
  
  if (action === 'prepareStockData') {
    // Process the stock performance data
    const chartData = processStockData(stockData, timeRange, companies);
    
    // Send the processed data back to the main thread
    self.postMessage({
      action: 'stockDataReady',
      chartData
    });
  }
};

/**
 * Process stock performance data for visualization
 * @param {Object} stockData - Stock price data for each company
 * @param {string} timeRange - Time range to display (e.g., '1M', '3M', '6M', '1Y', 'All')
 * @param {string[]} companies - List of companies to display
 * @returns {Object} Processed chart data
 */
function processStockData(stockData, timeRange, companies) {
  // If no data is provided, use default sample data
  if (!stockData || Object.keys(stockData).length === 0) {
    return getDefaultStockData(timeRange, companies);
  }
  
  // Filter data based on time range
  const filteredData = filterDataByTimeRange(stockData, timeRange);
  
  // Filter data based on selected companies
  const filteredCompanies = companies && companies.length > 0 
    ? companies 
    : Object.keys(filteredData);
  
  // Prepare series data for ApexCharts
  const series = [];
  const dates = [];
  
  filteredCompanies.forEach(company => {
    if (filteredData[company]) {
      // Extract OHLC data for the company
      const data = filteredData[company].map(item => ({
        x: new Date(item.date).getTime(),
        y: [item.open, item.high, item.low, item.close]
      }));
      
      // Add to series
      series.push({
        name: company,
        data: data
      });
      
      // Collect all dates
      filteredData[company].forEach(item => {
        if (!dates.includes(item.date)) {
          dates.push(item.date);
        }
      });
    }
  });
  
  // Sort dates chronologically
  dates.sort((a, b) => new Date(a) - new Date(b));
  
  // Calculate performance metrics
  const metrics = calculatePerformanceMetrics(filteredData, filteredCompanies);
  
  // Return processed data
  return {
    series,
    dates,
    metrics,
    timeRange
  };
}

/**
 * Filter data by time range
 * @param {Object} stockData - Stock price data for each company
 * @param {string} timeRange - Time range to display
 * @returns {Object} Filtered stock data
 */
function filterDataByTimeRange(stockData, timeRange) {
  const filteredData = {};
  const now = new Date();
  let startDate;
  
  // Calculate start date based on time range
  switch (timeRange) {
    case '1M':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      break;
    case '3M':
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      break;
    case '6M':
      startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
      break;
    case '1Y':
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      break;
    case 'All':
    default:
      // No filtering for 'All'
      return stockData;
  }
  
  // Filter data for each company
  Object.keys(stockData).forEach(company => {
    filteredData[company] = stockData[company].filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate;
    });
  });
  
  return filteredData;
}

/**
 * Calculate performance metrics for each company
 * @param {Object} stockData - Stock price data for each company
 * @param {string[]} companies - List of companies to calculate metrics for
 * @returns {Object} Performance metrics
 */
function calculatePerformanceMetrics(stockData, companies) {
  const metrics = {};
  
  companies.forEach(company => {
    if (stockData[company] && stockData[company].length > 0) {
      const data = stockData[company];
      const firstPrice = data[0].close;
      const lastPrice = data[data.length - 1].close;
      const priceChange = lastPrice - firstPrice;
      const percentChange = (priceChange / firstPrice) * 100;
      
      // Calculate volatility (standard deviation of daily returns)
      let volatility = 0;
      if (data.length > 1) {
        const dailyReturns = [];
        for (let i = 1; i < data.length; i++) {
          const dailyReturn = (data[i].close - data[i - 1].close) / data[i - 1].close;
          dailyReturns.push(dailyReturn);
        }
        
        const meanReturn = dailyReturns.reduce((sum, val) => sum + val, 0) / dailyReturns.length;
        const squaredDiffs = dailyReturns.map(val => Math.pow(val - meanReturn, 2));
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / squaredDiffs.length;
        volatility = Math.sqrt(variance) * 100; // Convert to percentage
      }
      
      // Calculate 52-week high and low
      const high52Week = Math.max(...data.map(item => item.high));
      const low52Week = Math.min(...data.map(item => item.low));
      
      // Calculate moving averages
      const ma50 = calculateMovingAverage(data, 50);
      const ma200 = calculateMovingAverage(data, 200);
      
      // Store metrics
      metrics[company] = {
        firstPrice,
        lastPrice,
        priceChange,
        percentChange,
        volatility,
        high52Week,
        low52Week,
        ma50,
        ma200
      };
    }
  });
  
  return metrics;
}

/**
 * Calculate moving average for a given period
 * @param {Object[]} data - Stock price data
 * @param {number} period - Period for moving average
 * @returns {number} Moving average
 */
function calculateMovingAverage(data, period) {
  if (data.length < period) {
    return data.reduce((sum, item) => sum + item.close, 0) / data.length;
  }
  
  const lastNPrices = data.slice(-period).map(item => item.close);
  return lastNPrices.reduce((sum, price) => sum + price, 0) / period;
}

/**
 * Get default color based on index
 * @param {number} index - Index of the company
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
 * Generate default stock performance data
 * @param {string} timeRange - Time range to display
 * @param {string[]} companies - List of companies to display
 * @returns {Object} Default chart data
 */
function getDefaultStockData(timeRange = '1Y', companies = null) {
  // Default companies
  const defaultCompanies = [
    'QDaria',
    'IBM Quantum',
    'Google Quantum',
    'Rigetti',
    'IonQ',
    'D-Wave'
  ];
  
  // Use provided companies or default ones
  const selectedCompanies = companies && companies.length > 0 
    ? companies 
    : defaultCompanies;
  
  // Generate dates for the past year (or based on timeRange)
  const dates = generateDates(timeRange);
  
  // Generate stock data for each company
  const stockData = {};
  
  selectedCompanies.forEach((company, index) => {
    // Generate base price and volatility based on company
    let basePrice, volatility;
    
    switch (company) {
      case 'QDaria':
        basePrice = 25;
        volatility = 2.5;
        break;
      case 'IBM Quantum':
        basePrice = 150;
        volatility = 1.5;
        break;
      case 'Google Quantum':
        basePrice = 200;
        volatility = 1.8;
        break;
      case 'Rigetti':
        basePrice = 40;
        volatility = 3.0;
        break;
      case 'IonQ':
        basePrice = 35;
        volatility = 3.2;
        break;
      case 'D-Wave':
        basePrice = 30;
        volatility = 2.8;
        break;
      default:
        basePrice = 50 + (index * 10);
        volatility = 2.0 + (index * 0.2);
    }
    
    // Generate OHLC data for each date
    stockData[company] = generateOHLCData(dates, basePrice, volatility);
  });
  
  // Process the generated data
  return processStockData(stockData, timeRange, selectedCompanies);
}

/**
 * Generate dates for the given time range
 * @param {string} timeRange - Time range to generate dates for
 * @returns {string[]} Array of date strings
 */
function generateDates(timeRange) {
  const dates = [];
  const now = new Date();
  let startDate;
  
  // Calculate start date based on time range
  switch (timeRange) {
    case '1M':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      break;
    case '3M':
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      break;
    case '6M':
      startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
      break;
    case '1Y':
    default:
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  }
  
  // Generate dates from start date to now (business days only)
  let currentDate = new Date(startDate);
  while (currentDate <= now) {
    // Skip weekends (0 = Sunday, 6 = Saturday)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push(currentDate.toISOString().split('T')[0]);
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}

/**
 * Generate OHLC data for the given dates
 * @param {string[]} dates - Array of date strings
 * @param {number} basePrice - Base price to start from
 * @param {number} volatility - Volatility factor
 * @returns {Object[]} Array of OHLC data objects
 */
function generateOHLCData(dates, basePrice, volatility) {
  const data = [];
  let previousClose = basePrice;
  
  // Add a trend factor to simulate overall market trends
  const trendFactor = (Math.random() * 0.2) - 0.1; // Between -0.1 and 0.1
  
  dates.forEach((date, index) => {
    // Calculate daily change based on volatility and trend
    const change = (Math.random() * 2 - 1) * volatility;
    const trendChange = index * trendFactor;
    
    // Calculate OHLC values
    const open = previousClose;
    const close = Math.max(0.1, open + change + trendChange);
    const high = Math.max(open, close) + (Math.random() * volatility);
    const low = Math.min(open, close) - (Math.random() * volatility);
    
    // Add data point
    data.push({
      date,
      open,
      high,
      low,
      close
    });
    
    // Update previous close for next iteration
    previousClose = close;
  });
  
  return data;
}
