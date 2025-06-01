// ROI Comparison Worker
// Processes data for the ROI Comparison Chart (SCATTER)

self.onmessage = function(e) {
  const { action, projects, metrics, colors, categories } = e.data;
  
  if (action === 'prepareROIData') {
    // Process the ROI comparison data
    const chartData = processROIData(projects, metrics, colors, categories);
    
    // Send the processed data back to the main thread
    self.postMessage({
      action: 'roiDataReady',
      chartData
    });
  }
};

/**
 * Process ROI comparison data for visualization
 * @param {Object[]} projects - Project data points
 * @param {string[]} metrics - Metrics to compare (x and y axis)
 * @param {string[]} colors - Colors for each category
 * @param {string[]} categories - Project categories
 * @returns {Object} Processed chart data
 */
function processROIData(projects, metrics, colors, categories) {
  // If no data is provided, use default sample data
  if (!projects || projects.length === 0) {
    return getDefaultROIData();
  }
  
  // Extract metrics from the data
  const xMetric = metrics?.[0] || 'Investment';
  const yMetric = metrics?.[1] || 'Return';
  
  // Group projects by category
  const seriesData = {};
  
  // Initialize series for each category
  if (categories && categories.length > 0) {
    categories.forEach(category => {
      seriesData[category] = [];
    });
  }
  
  // Process each project
  projects.forEach(project => {
    const category = project.category || 'Uncategorized';
    
    // Create the category if it doesn't exist
    if (!seriesData[category]) {
      seriesData[category] = [];
    }
    
    // Add the project data point
    seriesData[category].push({
      x: project[xMetric] || 0,
      y: project[yMetric] || 0,
      name: project.name || 'Unnamed Project',
      description: project.description || '',
      roi: calculateROI(project[xMetric], project[yMetric]),
      timeline: project.timeline || '',
      risk: project.risk || 'Medium'
    });
  });
  
  // Convert to series array format for ApexCharts
  const series = Object.keys(seriesData).map((category, index) => {
    return {
      name: category,
      data: seriesData[category],
      color: colors?.[index] || getDefaultColor(index)
    };
  });
  
  // Calculate quadrant boundaries
  const allX = projects.map(p => p[xMetric] || 0);
  const allY = projects.map(p => p[yMetric] || 0);
  
  const xAvg = allX.reduce((sum, val) => sum + val, 0) / allX.length;
  const yAvg = allY.reduce((sum, val) => sum + val, 0) / allY.length;
  
  const xMax = Math.max(...allX) * 1.1;
  const yMax = Math.max(...allY) * 1.1;
  
  // Calculate top performers (high ROI)
  const projectsWithROI = projects.map(project => ({
    ...project,
    roi: calculateROI(project[xMetric], project[yMetric])
  }));
  
  // Sort by ROI descending
  projectsWithROI.sort((a, b) => b.roi - a.roi);
  
  // Get top 3 performers
  const topPerformers = projectsWithROI.slice(0, 3);
  
  // Calculate average ROI
  const avgROI = projectsWithROI.reduce((sum, project) => sum + project.roi, 0) / projectsWithROI.length;
  
  // Return processed data
  return {
    series,
    xMetric,
    yMetric,
    quadrants: {
      xCenter: xAvg,
      yCenter: yAvg,
      xMax,
      yMax
    },
    metrics: {
      topPerformers,
      avgROI,
      totalProjects: projects.length,
      categoryCounts: Object.keys(seriesData).reduce((counts, category) => {
        counts[category] = seriesData[category].length;
        return counts;
      }, {})
    }
  };
}

/**
 * Calculate ROI (Return on Investment)
 * @param {number} investment - Investment amount
 * @param {number} returns - Return amount
 * @returns {number} ROI percentage
 */
function calculateROI(investment, returns) {
  if (!investment || investment === 0) return 0;
  return ((returns - investment) / investment) * 100;
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
 * Generate default ROI comparison data
 * @returns {Object} Default chart data
 */
function getDefaultROIData() {
  const projects = [
    {
      name: 'Quantum Hardware R&D',
      category: 'Hardware',
      Investment: 12.5,
      Return: 45.0,
      description: 'Development of proprietary quantum hardware components',
      timeline: '2025-2027',
      risk: 'High'
    },
    {
      name: 'Quantum Software Platform',
      category: 'Software',
      Investment: 8.2,
      Return: 32.8,
      description: 'Quantum software development platform for enterprise clients',
      timeline: '2025-2026',
      risk: 'Medium'
    },
    {
      name: 'AI Integration Services',
      category: 'AI',
      Investment: 6.5,
      Return: 29.3,
      description: 'AI services integrated with quantum computing capabilities',
      timeline: '2025-2026',
      risk: 'Medium'
    },
    {
      name: 'Quantum Education Program',
      category: 'Education',
      Investment: 3.2,
      Return: 8.5,
      description: 'Educational programs for quantum computing skills development',
      timeline: '2025-2028',
      risk: 'Low'
    },
    {
      name: 'Quantum Cloud Services',
      category: 'Cloud',
      Investment: 9.8,
      Return: 36.2,
      description: 'Cloud-based quantum computing services for enterprise clients',
      timeline: '2026-2028',
      risk: 'Medium'
    },
    {
      name: 'Quantum Security Solutions',
      category: 'Security',
      Investment: 7.3,
      Return: 31.5,
      description: 'Quantum-resistant security solutions for enterprise clients',
      timeline: '2026-2027',
      risk: 'Medium'
    },
    {
      name: 'Quantum Consulting',
      category: 'Services',
      Investment: 4.1,
      Return: 12.3,
      description: 'Consulting services for quantum computing adoption',
      timeline: '2025-2027',
      risk: 'Low'
    },
    {
      name: 'Quantum Research Partnerships',
      category: 'Research',
      Investment: 5.6,
      Return: 16.8,
      description: 'Research partnerships with academic institutions',
      timeline: '2025-2029',
      risk: 'Medium'
    },
    {
      name: 'Quantum Healthcare Solutions',
      category: 'Healthcare',
      Investment: 8.9,
      Return: 40.1,
      description: 'Quantum computing solutions for healthcare industry',
      timeline: '2026-2028',
      risk: 'High'
    },
    {
      name: 'Quantum Financial Services',
      category: 'Finance',
      Investment: 10.2,
      Return: 42.8,
      description: 'Quantum computing solutions for financial services industry',
      timeline: '2026-2028',
      risk: 'Medium'
    },
    {
      name: 'Quantum Gaming Platform',
      category: 'Entertainment',
      Investment: 6.8,
      Return: 20.4,
      description: 'Quantum-powered gaming and entertainment platform',
      timeline: '2027-2029',
      risk: 'High'
    },
    {
      name: 'Quantum IoT Integration',
      category: 'IoT',
      Investment: 7.5,
      Return: 26.3,
      description: 'Integration of quantum computing with IoT devices',
      timeline: '2027-2029',
      risk: 'Medium'
    }
  ];
  
  const metrics = ['Investment', 'Return'];
  
  const categories = [
    'Hardware',
    'Software',
    'AI',
    'Education',
    'Cloud',
    'Security',
    'Services',
    'Research',
    'Healthcare',
    'Finance',
    'Entertainment',
    'IoT'
  ];
  
  const colors = categories.map((_, i) => getDefaultColor(i));
  
  // Process the default data
  return processROIData(projects, metrics, colors, categories);
}
