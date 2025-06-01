/**
 * SWOT Chart Web Worker
 * 
 * This worker handles data processing for SWOT (Strengths, Weaknesses, Opportunities, Threats) 
 * analysis charts to avoid blocking the main UI thread.
 */

// Generate chart data for radar chart visualization
function generateChartData(strengths, weaknesses, opportunities, threats, darkMode) {
  // Extract scores for radar chart
  const scores = [
    strengths.score,
    weaknesses.score,
    opportunities.score,
    threats.score
  ];
  
  // Chart datasets configuration
  const datasets = [
    {
      label: 'SWOT Analysis',
      data: scores,
      fill: true,
      backgroundColor: darkMode 
        ? 'rgba(4, 163, 255, 0.2)' 
        : 'rgba(4, 163, 255, 0.15)',
      borderColor: darkMode 
        ? 'rgba(4, 163, 255, 0.8)' 
        : 'rgba(4, 163, 255, 0.7)',
      pointBackgroundColor: [
        'rgba(16, 185, 129, 0.8)',  // Green for Strengths
        'rgba(239, 68, 68, 0.8)',   // Red for Weaknesses
        'rgba(59, 130, 246, 0.8)',  // Blue for Opportunities
        'rgba(245, 158, 11, 0.8)'   // Amber for Threats
      ],
      pointBorderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(245, 158, 11, 1)'
      ],
      pointHoverBackgroundColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(245, 158, 11, 1)'
      ],
      pointHoverBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }
  ];
  
  // Return formatted chart data
  return {
    labels: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'],
    datasets: datasets
  };
}

// Process SWOT data to generate visual indicators
function processSwotIndicators(strengths, weaknesses, opportunities, threats) {
  // Calculate overall SWOT balance
  const positiveFactors = (strengths.score + opportunities.score) / 2;
  const negativeFactors = (weaknesses.score + threats.score) / 2;
  const netBalance = positiveFactors - negativeFactors;
  
  // Determine strategic position
  let strategicPosition;
  if (netBalance > 30) {
    strategicPosition = 'Strongly Favorable';
  } else if (netBalance > 15) {
    strategicPosition = 'Favorable';
  } else if (netBalance > 0) {
    strategicPosition = 'Slightly Favorable';
  } else if (netBalance > -15) {
    strategicPosition = 'Slightly Challenging';
  } else if (netBalance > -30) {
    strategicPosition = 'Challenging';
  } else {
    strategicPosition = 'Highly Challenging';
  }
  
  // Generate recommendations based on SWOT profile
  const recommendations = [];
  
  if (strengths.score > 70 && opportunities.score > 70) {
    recommendations.push('Leverage strong position to pursue new opportunities');
  }
  
  if (weaknesses.score > 60 && threats.score > 60) {
    recommendations.push('Focus on addressing key weaknesses to mitigate threats');
  }
  
  if (strengths.score > 60 && threats.score > 60) {
    recommendations.push('Use strengths to defend against external threats');
  }
  
  if (weaknesses.score > 60 && opportunities.score > 60) {
    recommendations.push('Improve internal capabilities to capture identified opportunities');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Maintain balanced approach across all SWOT dimensions');
  }
  
  return {
    strategicPosition,
    netBalance,
    recommendations
  };
}

// Main worker message handler
self.onmessage = function(e) {
  try {
    const { strengths, weaknesses, opportunities, threats, darkMode } = e.data;
    
    // Generate chart data
    const chartData = generateChartData(
      strengths, 
      weaknesses, 
      opportunities, 
      threats, 
      darkMode
    );
    
    // Process strategic indicators
    const indicators = processSwotIndicators(
      strengths, 
      weaknesses, 
      opportunities, 
      threats
    );
    
    // Send processed data back to main thread
    self.postMessage({
      chartData,
      indicators
    });
  } catch (error) {
    // Send error back to main thread
    self.postMessage({ error: error.message });
  }
};