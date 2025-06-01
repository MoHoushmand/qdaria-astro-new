/**
 * TAM/SAM/SOM Chart Web Worker
 * 
 * This worker handles calculations for Total Addressable Market (TAM),
 * Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM)
 * projections to avoid blocking the main UI thread.
 */

// Calculate growth over time using compound annual growth rate (CAGR)
function calculateGrowth(initialValue, growthRate, years) {
  return years.map((year, index) => {
    // Apply compound growth: initialValue * (1 + growthRate)^years
    return parseFloat((initialValue * Math.pow(1 + growthRate / 100, index)).toFixed(1));
  });
}

// Generate dataset for TAM/SAM/SOM in absolute values (billions USD)
function generateAbsoluteData(tam, samPercentage, somPercentage, years, growthRate) {
  // Calculate SAM and SOM base values
  const samBase = tam * samPercentage / 100;
  const somBase = samBase * somPercentage / 100;
  
  // Calculate growth for each segment
  const tamValues = calculateGrowth(tam, growthRate, years);
  const samValues = calculateGrowth(samBase, growthRate * 1.1, years); // SAM grows slightly faster than TAM
  const somValues = calculateGrowth(somBase, growthRate * 1.2, years);  // SOM grows faster than SAM
  
  // Create datasets for chart.js
  return {
    labels: years,
    datasets: [
      {
        label: 'TAM (Rest)',
        data: tamValues.map((tam, i) => parseFloat((tam - samValues[i]).toFixed(1))),
        backgroundColor: 'rgba(14, 165, 233, 0.7)', // Sky blue
        borderColor: 'rgba(14, 165, 233, 0.85)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(14, 165, 233, 0.9)'
      },
      {
        label: 'SAM (Rest)',
        data: samValues.map((sam, i) => parseFloat((sam - somValues[i]).toFixed(1))),
        backgroundColor: 'rgba(79, 70, 229, 0.7)', // Indigo
        borderColor: 'rgba(79, 70, 229, 0.85)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(79, 70, 229, 0.9)'
      },
      {
        label: 'SOM',
        data: somValues,
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // Emerald
        borderColor: 'rgba(16, 185, 129, 0.85)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(16, 185, 129, 0.9)'
      }
    ]
  };
}

// Generate dataset for TAM/SAM/SOM in percentage values
function generatePercentageData(tam, samPercentage, somPercentage, years, growthRate) {
  // Calculate absolute values first
  const tamValues = calculateGrowth(tam, growthRate, years);
  const samBase = tam * samPercentage / 100;
  const somBase = samBase * somPercentage / 100;
  const samValues = calculateGrowth(samBase, growthRate * 1.1, years);
  const somValues = calculateGrowth(somBase, growthRate * 1.2, years);
  
  // Convert to percentages
  const tamPercentages = tamValues.map(() => 100); // TAM is always 100%
  const samPercentages = samValues.map((sam, i) => parseFloat((sam / tamValues[i] * 100).toFixed(1)));
  const somPercentages = somValues.map((som, i) => parseFloat((som / tamValues[i] * 100).toFixed(1)));
  
  // Create datasets for stacked percentage chart
  return {
    labels: years,
    datasets: [
      {
        label: 'TAM (Rest)',
        data: tamPercentages.map((tam, i) => parseFloat((tam - samPercentages[i]).toFixed(1))),
        backgroundColor: 'rgba(14, 165, 233, 0.7)', // Sky blue
        borderColor: 'rgba(14, 165, 233, 0.85)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(14, 165, 233, 0.9)'
      },
      {
        label: 'SAM (Rest)',
        data: samPercentages.map((sam, i) => parseFloat((sam - somPercentages[i]).toFixed(1))),
        backgroundColor: 'rgba(79, 70, 229, 0.7)', // Indigo
        borderColor: 'rgba(79, 70, 229, 0.85)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(79, 70, 229, 0.9)'
      },
      {
        label: 'SOM',
        data: somPercentages,
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // Emerald
        borderColor: 'rgba(16, 185, 129, 0.85)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(16, 185, 129, 0.9)'
      }
    ]
  };
}

// Calculate detailed market metrics
function calculateMarketMetrics(tam, samPercentage, somPercentage, years, growthRate) {
  const initialTam = tam;
  const initialSam = tam * samPercentage / 100;
  const initialSom = initialSam * somPercentage / 100;
  
  // Calculate final year values
  const finalYearIndex = years.length - 1;
  const finalTam = parseFloat((initialTam * Math.pow(1 + growthRate / 100, finalYearIndex)).toFixed(1));
  const finalSam = parseFloat((initialSam * Math.pow(1 + growthRate * 1.1 / 100, finalYearIndex)).toFixed(1));
  const finalSom = parseFloat((initialSom * Math.pow(1 + growthRate * 1.2 / 100, finalYearIndex)).toFixed(1));
  
  // Calculate CAGR for each segment
  const tamCAGR = parseFloat(((Math.pow(finalTam / initialTam, 1 / finalYearIndex) - 1) * 100).toFixed(1));
  const samCAGR = parseFloat(((Math.pow(finalSam / initialSam, 1 / finalYearIndex) - 1) * 100).toFixed(1));
  const somCAGR = parseFloat(((Math.pow(finalSom / initialSom, 1 / finalYearIndex) - 1) * 100).toFixed(1));
  
  return {
    initialValues: {
      tam: initialTam,
      sam: initialSam,
      som: initialSom
    },
    finalValues: {
      tam: finalTam,
      sam: finalSam,
      som: finalSom
    },
    cagr: {
      tam: tamCAGR,
      sam: samCAGR,
      som: somCAGR
    },
    // Calculate market penetration at end of forecast
    finalPenetration: {
      samOfTam: parseFloat((finalSam / finalTam * 100).toFixed(1)),
      somOfSam: parseFloat((finalSom / finalSam * 100).toFixed(1)),
      somOfTam: parseFloat((finalSom / finalTam * 100).toFixed(1))
    }
  };
}

// Main worker message handler
self.onmessage = function(e) {
  try {
    const { 
      tam, 
      samPercentage, 
      somPercentage, 
      years, 
      growthRate, 
      viewMode, 
      darkMode 
    } = e.data;
    
    // Generate chart data based on view mode
    const chartData = viewMode === 'absolute'
      ? generateAbsoluteData(tam, samPercentage, somPercentage, years, growthRate)
      : generatePercentageData(tam, samPercentage, somPercentage, years, growthRate);
    
    // Calculate additional market metrics
    const metrics = calculateMarketMetrics(
      tam, 
      samPercentage, 
      somPercentage, 
      years, 
      growthRate
    );
    
    // Send processed data back to main thread
    self.postMessage({
      chartData,
      metrics
    });
  } catch (error) {
    // Send error back to main thread
    self.postMessage({ error: error.message });
  }
};