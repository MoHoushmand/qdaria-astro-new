// Execution Roadmap Chart Worker
// Processes data for the execution roadmap chart to offload computation from the main thread

/**
 * Process data for the execution roadmap chart
 * @param {Object} data - The data to process
 * @param {Array} data.phases - Array of phases with name, start, end, and milestones
 * @param {Array} data.years - Array of years to display
 * @param {Array} data.colors - Array of colors for each phase
 * @returns {Object} Processed data for the chart
 */
function processData(data) {
  const { phases, years, colors } = data;
  
  // Prepare series data for ApexCharts range bar chart
  const series = phases.map((phase, index) => {
    return {
      name: phase.name,
      data: [{
        x: phase.name,
        y: [
          new Date(phase.start).getTime(),
          new Date(phase.end).getTime()
        ],
        goals: phase.milestones ? phase.milestones.map(milestone => ({
          name: milestone.name,
          value: new Date(milestone.date).getTime(),
          strokeColor: milestone.color || '#FF4560',
          strokeWidth: 2,
          strokeDashArray: 0
        })) : []
      }]
    };
  });
  
  // Calculate min and max dates for x-axis
  const allDates = [];
  phases.forEach(phase => {
    allDates.push(new Date(phase.start).getTime());
    allDates.push(new Date(phase.end).getTime());
    if (phase.milestones) {
      phase.milestones.forEach(milestone => {
        allDates.push(new Date(milestone.date).getTime());
      });
    }
  });
  
  const minDate = Math.min(...allDates);
  const maxDate = Math.max(...allDates);
  
  // Prepare milestones for annotations
  const annotations = {
    points: []
  };
  
  phases.forEach((phase, phaseIndex) => {
    if (phase.milestones) {
      phase.milestones.forEach((milestone, milestoneIndex) => {
        annotations.points.push({
          x: phase.name,
          y: new Date(milestone.date).getTime(),
          marker: {
            size: 6,
            fillColor: milestone.color || '#FF4560',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: milestone.name,
            borderColor: milestone.color || '#FF4560',
            style: {
              color: '#fff',
              background: milestone.color || '#FF4560'
            }
          }
        });
      });
    }
  });
  
  // Prepare table data
  const tableData = phases.map(phase => {
    const startDate = new Date(phase.start);
    const endDate = new Date(phase.end);
    
    return {
      phase: phase.name,
      start: startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
      end: endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
      duration: calculateDuration(startDate, endDate),
      milestones: phase.milestones ? phase.milestones.map(m => m.name).join(', ') : 'None'
    };
  });
  
  return {
    series,
    annotations,
    minDate,
    maxDate,
    tableData,
    phases,
    colors: colors || generateColors(phases.length)
  };
}

/**
 * Calculate duration between two dates in months
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {string} Duration in months
 */
function calculateDuration(start, end) {
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return `${months} months`;
}

/**
 * Generate colors for phases if not provided
 * @param {number} count - Number of colors to generate
 * @returns {Array} Array of colors
 */
function generateColors(count) {
  const baseColors = [
    '#04a3ff', // QDaria blue
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
