// SWOT Analysis Chart Worker
// Processes data for the SWOT analysis chart to offload computation from the main thread

/**
 * Process data for the SWOT analysis chart
 * @param {Object} data - The data to process
 * @param {Array} data.strengths - Array of strength items
 * @param {Array} data.weaknesses - Array of weakness items
 * @param {Array} data.opportunities - Array of opportunity items
 * @param {Array} data.threats - Array of threat items
 * @param {Array} data.colors - Array of colors for each SWOT category
 * @returns {Object} Processed data for the chart
 */
function processData(data) {
  const { strengths, weaknesses, opportunities, threats, colors } = data;
  
  // Calculate the maximum number of items in any category for radar chart scaling
  const maxItems = Math.max(
    strengths.length,
    weaknesses.length,
    opportunities.length,
    threats.length
  );
  
  // Prepare series data for ApexCharts radar chart
  const series = [
    {
      name: 'Strengths',
      data: calculateCategoryScores(strengths, maxItems)
    },
    {
      name: 'Weaknesses',
      data: calculateCategoryScores(weaknesses, maxItems)
    },
    {
      name: 'Opportunities',
      data: calculateCategoryScores(opportunities, maxItems)
    },
    {
      name: 'Threats',
      data: calculateCategoryScores(threats, maxItems)
    }
  ];
  
  // Prepare categories for the radar chart (using item titles)
  const categories = [
    'Strategic Positioning',
    'Technology',
    'Market Position',
    'Team Capabilities',
    'Financial Resources',
    'Competitive Advantage',
    'Scalability',
    'Innovation'
  ];
  
  // Prepare data for the quadrant view
  const quadrantData = {
    strengths: strengths.map(item => ({
      title: item.title,
      description: item.description,
      impact: item.impact || 'Medium',
      category: item.category || 'General'
    })),
    weaknesses: weaknesses.map(item => ({
      title: item.title,
      description: item.description,
      impact: item.impact || 'Medium',
      category: item.category || 'General'
    })),
    opportunities: opportunities.map(item => ({
      title: item.title,
      description: item.description,
      impact: item.impact || 'Medium',
      category: item.category || 'General'
    })),
    threats: threats.map(item => ({
      title: item.title,
      description: item.description,
      impact: item.impact || 'Medium',
      category: item.category || 'General'
    }))
  };
  
  // Prepare table data
  const tableData = [];
  
  // Add strengths to table data
  strengths.forEach(item => {
    tableData.push({
      category: 'Strengths',
      title: item.title,
      description: item.description,
      impact: item.impact || 'Medium'
    });
  });
  
  // Add weaknesses to table data
  weaknesses.forEach(item => {
    tableData.push({
      category: 'Weaknesses',
      title: item.title,
      description: item.description,
      impact: item.impact || 'Medium'
    });
  });
  
  // Add opportunities to table data
  opportunities.forEach(item => {
    tableData.push({
      category: 'Opportunities',
      title: item.title,
      description: item.description,
      impact: item.impact || 'Medium'
    });
  });
  
  // Add threats to table data
  threats.forEach(item => {
    tableData.push({
      category: 'Threats',
      title: item.title,
      description: item.description,
      impact: item.impact || 'Medium'
    });
  });
  
  return {
    series,
    categories,
    quadrantData,
    tableData,
    colors: colors || ['#04a3ff', '#FF6B6B', '#00FFD3', '#F5B700']
  };
}

/**
 * Calculate scores for each category based on items
 * @param {Array} items - Array of items in the category
 * @param {number} maxItems - Maximum number of items in any category
 * @returns {Array} Array of scores for the category
 */
function calculateCategoryScores(items, maxItems) {
  // Create a mapping of categories to their indices
  const categoryIndices = {
    'Strategic Positioning': 0,
    'Technology': 1,
    'Market Position': 2,
    'Team Capabilities': 3,
    'Financial Resources': 4,
    'Competitive Advantage': 5,
    'Scalability': 6,
    'Innovation': 7
  };
  
  // Initialize scores array with zeros
  const scores = Array(8).fill(0);
  
  // Calculate scores based on items
  items.forEach(item => {
    const category = item.category || 'General';
    const impact = item.impact || 'Medium';
    
    // Get the index for this category
    let index = categoryIndices[category];
    
    // If category doesn't match any predefined categories, distribute evenly
    if (index === undefined) {
      // Find the index with the lowest score to distribute evenly
      index = scores.indexOf(Math.min(...scores));
    }
    
    // Add score based on impact
    if (impact === 'High') {
      scores[index] += 3;
    } else if (impact === 'Medium') {
      scores[index] += 2;
    } else {
      scores[index] += 1;
    }
  });
  
  // Normalize scores to be between 0 and 10
  const maxPossibleScore = maxItems * 3; // Assuming all items could be high impact
  return scores.map(score => (score / maxPossibleScore) * 10);
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
