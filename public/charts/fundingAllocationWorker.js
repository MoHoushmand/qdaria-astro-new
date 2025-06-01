// Funding Allocation Worker
// This worker processes data for the Funding Allocation Pie/Donut Chart

self.addEventListener('message', function(e) {
  const { action } = e.data;
  
  if (action === 'prepareFundingData') {
    const fundingData = processFundingData(e.data);
    self.postMessage({
      action: 'fundingDataReady',
      chartData: fundingData
    });
  }
});

function processFundingData({ categories, allocations, colors, totalFunding }) {
  // If no data provided, generate sample data
  if (!categories || !allocations) {
    return generateSampleFundingData();
  }
  
  // Process provided data
  return {
    series: allocations,
    labels: categories,
    colors: colors || generateColors(categories.length),
    totalFunding: totalFunding || allocations.reduce((sum, val) => sum + val, 0),
    metrics: calculateMetrics(categories, allocations)
  };
}

function generateSampleFundingData() {
  const categories = [
    'Hardware R&D',
    'Software Development',
    'Marketing & Sales',
    'Operations',
    'Talent Acquisition',
    'Partnerships & Ecosystem'
  ];
  
  const allocations = [
    42,  // Hardware R&D (42%)
    25,  // Software Development (25%)
    15,  // Marketing & Sales (15%)
    8,   // Operations (8%)
    6,   // Talent Acquisition (6%)
    4    // Partnerships & Ecosystem (4%)
  ];
  
  const colors = [
    '#04a3ff', // Primary blue
    '#00FFD3', // Teal
    '#F5B700', // Yellow
    '#FF6B6B', // Red
    '#7B61FF', // Purple
    '#65ff00'  // Green
  ];
  
  const totalFunding = 50; // $50M total funding
  
  return {
    series: allocations,
    labels: categories,
    colors: colors,
    totalFunding: totalFunding,
    metrics: calculateMetrics(categories, allocations)
  };
}

function calculateMetrics(categories, allocations) {
  // Find largest and smallest allocations
  let maxIndex = 0;
  let minIndex = 0;
  
  for (let i = 1; i < allocations.length; i++) {
    if (allocations[i] > allocations[maxIndex]) {
      maxIndex = i;
    }
    if (allocations[i] < allocations[minIndex]) {
      minIndex = i;
    }
  }
  
  // Calculate ratio between largest and smallest
  const ratio = allocations[maxIndex] / allocations[minIndex];
  
  return {
    largestAllocation: {
      category: categories[maxIndex],
      percentage: allocations[maxIndex]
    },
    smallestAllocation: {
      category: categories[minIndex],
      percentage: allocations[minIndex]
    },
    ratio: parseFloat(ratio.toFixed(1))
  };
}

function generateColors(count) {
  // Generate colors if not provided
  const baseColors = [
    '#04a3ff', // Primary blue
    '#00FFD3', // Teal
    '#F5B700', // Yellow
    '#FF6B6B', // Red
    '#7B61FF', // Purple
    '#65ff00'  // Green
  ];
  
  // If we have enough base colors, use them
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }
  
  // Otherwise, generate additional colors
  const colors = [...baseColors];
  
  for (let i = baseColors.length; i < count; i++) {
    // Generate a random color with good contrast
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
    const lightness = 45 + Math.floor(Math.random() * 10);  // 45-55%
    
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  
  return colors;
}
