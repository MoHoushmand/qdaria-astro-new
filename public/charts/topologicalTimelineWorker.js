/**
 * Topological Timeline Chart Worker
 * Processes data for the Topological Timeline Chart
 */

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  const { data, type } = event.data;
  
  if (type === 'process') {
    try {
      const processedData = processTimelineData(data);
      self.postMessage({
        type: 'success',
        data: processedData
      });
    } catch (error) {
      self.postMessage({
        type: 'error',
        error: error.message
      });
    }
  }
});

/**
 * Process timeline data for ApexCharts
 * @param {Object} data - Raw timeline data
 * @returns {Object} - Processed data for ApexCharts
 */
function processTimelineData(data) {
  // Extract timeline events
  const events = data.events || [];
  
  // Process events into ApexCharts timeline format
  const series = processEvents(events);
  
  // Generate milestone annotations
  const annotations = generateAnnotations(events);
  
  // Calculate optimal timeline layout
  const layout = calculateLayout(events);
  
  return {
    series,
    annotations,
    layout
  };
}

/**
 * Process events into ApexCharts timeline format
 * @param {Array} events - Timeline events
 * @returns {Array} - Series data for ApexCharts
 */
function processEvents(events) {
  // Group events by phase
  const phases = {};
  
  events.forEach(event => {
    const phase = event.phase || 'Default';
    if (!phases[phase]) {
      phases[phase] = [];
    }
    
    // Format dates
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate || event.startDate);
    
    // Add event to phase
    phases[phase].push({
      x: event.name,
      y: [
        startDate.getTime(),
        endDate.getTime()
      ],
      fillColor: event.color || getPhaseColor(phase),
      description: event.description || '',
      status: event.status || 'Planned',
      milestone: event.milestone || false
    });
  });
  
  // Convert phases to series
  return Object.keys(phases).map(phase => ({
    name: phase,
    data: phases[phase]
  }));
}

/**
 * Generate milestone annotations
 * @param {Array} events - Timeline events
 * @returns {Object} - Annotations for ApexCharts
 */
function generateAnnotations(events) {
  const milestones = events.filter(event => event.milestone);
  const trillionMilestone = events.find(event => 
    event.name && event.name.toLowerCase().includes('trillion') || 
    event.description && event.description.toLowerCase().includes('trillion')
  );
  
  const xAxisAnnotations = milestones.map(milestone => ({
    x: new Date(milestone.date || milestone.startDate).getTime(),
    borderColor: '#775DD0',
    label: {
      style: {
        color: '#fff',
        background: '#775DD0'
      },
      text: milestone.name
    }
  }));
  
  // Add $1 Trillion milestone annotation if found
  if (trillionMilestone) {
    xAxisAnnotations.push({
      x: new Date(trillionMilestone.date || trillionMilestone.startDate).getTime(),
      borderColor: '#00E396',
      label: {
        style: {
          color: '#fff',
          background: '#00E396'
        },
        text: '$1 Trillion Milestone'
      }
    });
  }
  
  return {
    xaxis: xAxisAnnotations
  };
}

/**
 * Calculate optimal timeline layout
 * @param {Array} events - Timeline events
 * @returns {Object} - Layout configuration for ApexCharts
 */
function calculateLayout(events) {
  // Find earliest and latest dates
  let minDate = new Date();
  let maxDate = new Date();
  
  if (events.length > 0) {
    // Initialize with first event
    minDate = new Date(events[0].startDate);
    maxDate = new Date(events[0].endDate || events[0].startDate);
    
    // Find min and max dates
    events.forEach(event => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate || event.startDate);
      
      if (startDate < minDate) minDate = startDate;
      if (endDate > maxDate) maxDate = endDate;
    });
  }
  
  // Add padding to date range
  minDate.setMonth(minDate.getMonth() - 1);
  maxDate.setMonth(maxDate.getMonth() + 1);
  
  return {
    minDate: minDate.getTime(),
    maxDate: maxDate.getTime()
  };
}

/**
 * Get color for a phase
 * @param {string} phase - Phase name
 * @returns {string} - Color for the phase
 */
function getPhaseColor(phase) {
  const colors = {
    'Research': '#008FFB',
    'Development': '#00E396',
    'Testing': '#FEB019',
    'Deployment': '#FF4560',
    'Scaling': '#775DD0',
    'Default': '#008FFB'
  };
  
  return colors[phase] || colors['Default'];
}
