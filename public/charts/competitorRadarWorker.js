// Competitor Radar Chart Worker
// Processes data for the radar chart to offload computation from the main thread

/**
 * Process data for the competitor radar chart
 * @param {Object} data - The data to process
 * @param {Array} data.companies - Array of company objects with name and color
 * @param {Array} data.criteria - Array of criteria objects with name and description
 * @param {Object} data.scores - Object mapping company names to score arrays
 * @returns {Object} Processed data for the chart
 */
function processData(data) {
  const { companies, criteria, scores } = data;
  
  // Prepare series data for ApexCharts
  const series = companies.map(company => ({
    name: company.name,
    data: scores[company.name]
  }));
  
  // Prepare categories (criteria names)
  const categories = criteria.map(criterion => criterion.name);
  
  // Prepare table data
  const tableData = criteria.map((criterion, i) => {
    const row = { criterion: criterion.name };
    companies.forEach(company => {
      row[company.name] = scores[company.name][i].toFixed(1);
    });
    return row;
  });
  
  return {
    series,
    categories,
    tableData,
    companies,
    criteria
  };
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
