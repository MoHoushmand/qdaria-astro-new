/**
 * Roadmap Chart Web Worker
 * 
 * This worker handles data processing for the strategic execution timeline chart
 * to avoid blocking the main UI thread.
 */

// Process roadmap data into Chart.js format
function processRoadmapData(phases, darkMode) {
  const sortedPhases = [...phases].reverse(); // Reverse to display in chronological order
  
  // Extract labels (phase names)
  const labels = sortedPhases.map(phase => `${phase.name} (${phase.period})`);
  
  // Process color schemes
  const baseColor = '#04a3ff';
  const hoverColor = '#0284c7';
  
  // Generate datasets
  const datasets = [
    {
      label: 'Execution Progress',
      data: sortedPhases.map(phase => phase.progress),
      backgroundColor: sortedPhases.map(phase => phase.color ? `${phase.color}90` : `${baseColor}90`),
      borderColor: sortedPhases.map(phase => phase.color || baseColor),
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: sortedPhases.map(phase => phase.color ? `${phase.color}b0` : `${hoverColor}b0`),
      barThickness: 20,
      maxBarThickness: 30
    }
  ];
  
  return {
    labels,
    datasets
  };
}

// Main worker message handler
self.onmessage = function(e) {
  try {
    const { phases, darkMode } = e.data;
    
    // Generate chart data
    const chartData = processRoadmapData(phases, darkMode);
    
    // Send processed data back to main thread
    self.postMessage({
      chartData
    });
  } catch (error) {
    // Send error back to main thread
    self.postMessage({ error: error.message });
  }
};