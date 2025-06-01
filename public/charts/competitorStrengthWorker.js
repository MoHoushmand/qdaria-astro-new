// Competitor Strength Worker
// Processes data for the Competitor Strength Chart (POLAR AREA)

self.onmessage = function(e) {
  const { action, competitors, categories, colors } = e.data;
  
  if (action === 'prepareCompetitorData') {
    // Process the competitor strength data
    const chartData = processCompetitorData(competitors, categories, colors);
    
    // Send the processed data back to the main thread
    self.postMessage({
      action: 'competitorDataReady',
      chartData
    });
  }
};

/**
 * Process competitor strength data for visualization
 * @param {Object[]} competitors - Competitor data
 * @param {string[]} categories - Strength categories
 * @param {string[]} colors - Colors for each competitor
 * @returns {Object} Processed chart data
 */
function processCompetitorData(competitors, categories, colors) {
  // If no data is provided, use default sample data
  if (!competitors || competitors.length === 0) {
    return getDefaultCompetitorData();
  }
  
  // Prepare series data for ApexCharts
  const series = [];
  const labels = categories || [];
  
  // Process each competitor
  competitors.forEach((competitor, index) => {
    // Get scores for each category
    const scores = [];
    
    if (categories && categories.length > 0) {
      categories.forEach(category => {
        scores.push(competitor.scores?.[category] || 0);
      });
    } else if (competitor.scores) {
      // If no categories provided, use the scores directly
      Object.values(competitor.scores).forEach(score => {
        scores.push(score);
      });
    }
    
    // Add to series
    series.push({
      name: competitor.name,
      data: scores,
      color: competitor.color || colors?.[index] || getDefaultColor(index)
    });
  });
  
  // Calculate average scores for each category
  const avgScores = [];
  
  if (labels.length > 0) {
    labels.forEach((category, categoryIndex) => {
      let sum = 0;
      let count = 0;
      
      competitors.forEach(competitor => {
        if (competitor.scores?.[category]) {
          sum += competitor.scores[category];
          count++;
        }
      });
      
      avgScores.push(count > 0 ? sum / count : 0);
    });
  }
  
  // Calculate overall strength for each competitor
  const overallStrengths = competitors.map(competitor => {
    if (!competitor.scores) return 0;
    
    const scores = Object.values(competitor.scores);
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  });
  
  // Find strongest competitor overall
  const strongestIndex = overallStrengths.indexOf(Math.max(...overallStrengths));
  const strongestCompetitor = competitors[strongestIndex];
  
  // Find strongest competitor in each category
  const categoryLeaders = {};
  
  if (labels.length > 0) {
    labels.forEach(category => {
      let maxScore = -1;
      let leader = null;
      
      competitors.forEach(competitor => {
        if (competitor.scores?.[category] && competitor.scores[category] > maxScore) {
          maxScore = competitor.scores[category];
          leader = competitor.name;
        }
      });
      
      categoryLeaders[category] = { leader, score: maxScore };
    });
  }
  
  // Return processed data
  return {
    series,
    labels,
    avgScores,
    overallStrengths,
    strongestCompetitor,
    categoryLeaders
  };
}

/**
 * Get default color based on index
 * @param {number} index - Index of the competitor
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
 * Generate default competitor strength data
 * @returns {Object} Default chart data
 */
function getDefaultCompetitorData() {
  const competitors = [
    {
      name: 'QDaria',
      scores: {
        'Hardware Innovation': 8.5,
        'Software Ecosystem': 9.0,
        'Market Presence': 6.5,
        'Research Output': 8.0,
        'Talent Acquisition': 7.5,
        'Funding Strength': 7.0,
        'Strategic Partnerships': 8.5,
        'IP Portfolio': 7.0
      },
      color: '#04a3ff'
    },
    {
      name: 'IBM Quantum',
      scores: {
        'Hardware Innovation': 9.0,
        'Software Ecosystem': 8.5,
        'Market Presence': 9.5,
        'Research Output': 9.0,
        'Talent Acquisition': 8.5,
        'Funding Strength': 9.0,
        'Strategic Partnerships': 9.0,
        'IP Portfolio': 9.5
      },
      color: '#ff6b6b'
    },
    {
      name: 'Google Quantum',
      scores: {
        'Hardware Innovation': 9.5,
        'Software Ecosystem': 8.0,
        'Market Presence': 9.0,
        'Research Output': 9.5,
        'Talent Acquisition': 9.0,
        'Funding Strength': 9.5,
        'Strategic Partnerships': 8.5,
        'IP Portfolio': 9.0
      },
      color: '#f5b700'
    },
    {
      name: 'Microsoft Quantum',
      scores: {
        'Hardware Innovation': 8.0,
        'Software Ecosystem': 9.2,
        'Market Presence': 9.0,
        'Research Output': 8.8,
        'Talent Acquisition': 9.0,
        'Funding Strength': 9.3,
        'Strategic Partnerships': 9.0,
        'IP Portfolio': 9.2
      },
      color: '#00d085'
    },
    {
      name: 'Quantinuum',
      scores: {
        'Hardware Innovation': 8.7,
        'Software Ecosystem': 8.0,
        'Market Presence': 7.5,
        'Research Output': 8.3,
        'Talent Acquisition': 8.0,
        'Funding Strength': 8.4,
        'Strategic Partnerships': 8.0,
        'IP Portfolio': 8.3
      },
      color: '#7b61ff'
    },
    {
      name: 'Rigetti',
      scores: {
        'Hardware Innovation': 8.0,
        'Software Ecosystem': 7.0,
        'Market Presence': 6.0,
        'Research Output': 7.5,
        'Talent Acquisition': 7.0,
        'Funding Strength': 7.5,
        'Strategic Partnerships': 6.5,
        'IP Portfolio': 7.0
      },
      color: '#00ffd3'
    },
    {
      name: 'IonQ',
      scores: {
        'Hardware Innovation': 8.5,
        'Software Ecosystem': 7.0,
        'Market Presence': 7.0,
        'Research Output': 8.0,
        'Talent Acquisition': 7.5,
        'Funding Strength': 8.0,
        'Strategic Partnerships': 7.0,
        'IP Portfolio': 7.5
      },
      color: '#ffcc00'
    },
    {
      name: 'D-Wave',
      scores: {
        'Hardware Innovation': 8.2,
        'Software Ecosystem': 7.5,
        'Market Presence': 7.8,
        'Research Output': 7.8,
        'Talent Acquisition': 7.0,
        'Funding Strength': 7.8,
        'Strategic Partnerships': 7.5,
        'IP Portfolio': 8.0
      },
      color: '#ff9f43'
    },
    {
      name: 'Continuum',
      scores: {
        'Hardware Innovation': 7.8,
        'Software Ecosystem': 7.0,
        'Market Presence': 5.5,
        'Research Output': 7.0,
        'Talent Acquisition': 6.5,
        'Funding Strength': 6.0,
        'Strategic Partnerships': 6.0,
        'IP Portfolio': 6.5
      },
      color: '#ee5253'
    }
  ];
  
  const categories = [
    'Hardware Innovation',
    'Software Ecosystem',
    'Market Presence',
    'Research Output',
    'Talent Acquisition',
    'Funding Strength',
    'Strategic Partnerships',
    'IP Portfolio'
  ];
  
  const colors = competitors.map(competitor => competitor.color);
  
  // Process the default data
  return processCompetitorData(competitors, categories, colors);
}
