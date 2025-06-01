/**
 * Web Worker for Quantum Hardware Comparison Chart
 * Processes data for visualization in the QuantumHardwareComparisonChartApex component
 */

// Handle messages from the main thread
self.onmessage = function(e) {
  try {
    // Process the data
    const result = processData(e.data);
    
    // Send the processed data back to the main thread
    self.postMessage({
      success: true,
      ...result
    });
  } catch (error) {
    // Send error message back to the main thread
    self.postMessage({
      success: false,
      error: error.toString()
    });
  }
};

/**
 * Process the chart data
 * @param {Object} data - The data from the main thread
 * @returns {Object} The processed data for the chart
 */
function processData(data) {
  // Default hardware comparison data if not provided
  const hardwareData = data.hardwareData || getDefaultHardwareData();
  
  // Normalize and process the data for the chart
  return transformDataForChart(hardwareData);
}

/**
 * Get default hardware comparison data
 * @returns {Object} The default hardware data
 */
function getDefaultHardwareData() {
  return {
    // Companies to compare
    categories: ['IBM', 'Google', 'Microsoft', 'Quantinuum', 'Rigetti', 'IonQ', 'D-Wave', 'QDaria'],
    
    // Metrics with values for each company
    metrics: [
      {
        name: 'Qubit Count (2025)',
        values: [433, 72, 150, 65, 80, 32, 5000, null], // QDaria is hardware-agnostic
        qdariaText: 'Multi-vendor access',
        unit: ''
      },
      {
        name: 'Error Rate (%)',
        values: [0.5, 0.6, 0.5, 0.4, 0.7, 0.3, 3.0, null], // QDaria is hardware-agnostic
        qdariaText: 'Hardware-agnostic',
        unit: '%',
        lowerIsBetter: true
      },
      {
        name: 'Gate Fidelity (%)',
        values: [99.5, 99.3, 99.5, 99.6, 99.1, 99.8, 90.0, null], // QDaria is hardware-agnostic
        qdariaText: 'Multiple architectures',
        unit: '%'
      },
      {
        name: 'Coherence Time (μs)',
        values: [100, 80, 90, 120, 70, 250, 20, null], // QDaria is hardware-agnostic
        qdariaText: 'Varied by partner',
        unit: 'μs'
      },
      {
        name: 'CLOPS Score',
        values: [2500, 2100, 2300, 2250, 1400, 1800, 2300, null], // QDaria is hardware-agnostic
        qdariaText: 'Access to all',
        unit: ''
      }
    ]
  };
}

/**
 * Transform the data for chart visualization
 * @param {Object} data - The input data
 * @returns {Object} - The transformed data for the chart
 */
function transformDataForChart(data) {
  const { categories, metrics } = data;
  
  // Create series data structure for ApexCharts
  const series = metrics.map(metric => {
    // Special handling for any normalization needs
    let values = [...metric.values];
    
    // For D-Wave with extremely high qubit count, normalize for better visualization
    if (metric.name === 'Qubit Count (2025)') {
      // Copy original values for the table data
      const originalValues = [...values];
      
      // Scale down D-Wave value for visualization if it's too high
      const dWaveIndex = categories.indexOf('D-Wave');
      if (dWaveIndex >= 0 && values[dWaveIndex] > 1000) {
        values[dWaveIndex] = 1000; // Scale for better visualization
      }
      
      // Handle QDaria special case
      const qdariaIndex = categories.indexOf('QDaria');
      if (qdariaIndex >= 0) {
        values[qdariaIndex] = 500; // Reasonable height for visualization
      }
      
      // Save original values for tooltip/table display
      return {
        name: metric.name,
        data: values,
        originalValues: originalValues,
        qdariaText: metric.qdariaText,
        unit: metric.unit,
        lowerIsBetter: metric.lowerIsBetter
      };
    }
    
    // For other metrics
    return {
      name: metric.name,
      data: values,
      qdariaText: metric.qdariaText,
      unit: metric.unit,
      lowerIsBetter: metric.lowerIsBetter
    };
  });
  
  // Generate table data for display
  const tableData = metrics.map(metric => {
    return {
      name: metric.name,
      values: metric.values.map((val, i) => {
        // Special handling for QDaria
        if (i === categories.indexOf('QDaria')) {
          return metric.qdariaText;
        }
        
        // Format values based on metric type
        if (metric.unit === '%') {
          return val + metric.unit;
        } else if (metric.name === 'CLOPS Score') {
          return val.toLocaleString();
        } else {
          return val;
        }
      })
    };
  });
  
  // Generate colors for the chart
  const colors = generateChartColors(metrics.length);
  
  // Generate annotations for the chart (e.g., $1 Trillion milestone)
  const annotations = generateAnnotations();
  
  return {
    series,
    categories,
    annotations,
    colors,
    tableData
  };
}

/**
 * Generate colors for the chart series
 * @param {number} count - Number of colors to generate
 * @returns {Array} Array of color hex codes
 */
function generateChartColors(count) {
  // QDaria brand colors
  const primaryColors = [
    '#017acd', // Primary blue
    '#00d085', // Primary green
    '#7b61ff', // Primary purple
    '#04a3ff', // Secondary blue
    '#00ffd3', // Secondary cyan
  ];
  
  // For additional colors, generate variations
  const colors = [...primaryColors];
  
  // If we need more colors than available in the primary palette
  while (colors.length < count) {
    // Add variations of existing colors
    const baseColor = primaryColors[colors.length % primaryColors.length];
    // Adjust saturation slightly for variation
    colors.push(adjustColor(baseColor, colors.length));
  }
  
  return colors;
}

/**
 * Adjust a color to create variations
 * @param {string} color - The base color in hex
 * @param {number} index - The index for variation
 * @returns {string} The adjusted color
 */
function adjustColor(color, index) {
  // Simple adjustment - not a full HSL conversion but enough for variation
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  // Adjust based on index
  const factor = 0.8 + (index % 3) * 0.1; // Slight variation
  
  // Ensure values stay in 0-255 range
  const newR = Math.min(255, Math.max(0, Math.round(r * factor)));
  const newG = Math.min(255, Math.max(0, Math.round(g * factor)));
  const newB = Math.min(255, Math.max(0, Math.round(b * factor)));
  
  // Convert back to hex
  return '#' + 
    newR.toString(16).padStart(2, '0') + 
    newG.toString(16).padStart(2, '0') + 
    newB.toString(16).padStart(2, '0');
}

/**
 * Generate annotations for the chart (e.g., $1 Trillion milestone)
 * @returns {Object} Annotations configuration
 */
function generateAnnotations() {
  return {
    yaxis: [
      {
        y: 0,
        y2: 100,
        borderColor: '#00ffd3',
        fillColor: 'rgba(0, 255, 211, 0.1)',
        opacity: 0.1,
        label: {
          borderColor: '#00ffd3',
          style: {
            color: '#fff',
            background: 'rgba(0, 255, 211, 0.7)'
          },
          text: '$1 Trillion Market Milestone'
        }
      }
    ],
    points: [
      {
        x: 'QDaria',
        y: 500,
        marker: {
          size: 8,
          fillColor: '#00ffd3',
          strokeColor: '#fff',
          strokeWidth: 2,
          radius: 2
        },
        label: {
          borderColor: '#00ffd3',
          style: {
            color: '#fff',
            background: 'rgba(0, 255, 211, 0.7)'
          },
          text: 'Hardware-agnostic approach'
        }
      }
    ]
  };
}
