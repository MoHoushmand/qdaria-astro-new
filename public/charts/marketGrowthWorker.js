// Market Growth Chart Worker
// Processes data for the market growth chart to offload computation from the main thread

/**
 * Process data for the market growth chart
 * @param {Object} data - The data to process
 * @param {Array} data.years - Array of years
 * @param {Array} data.baseCase - Array of base case values
 * @param {Array} data.conservativeCase - Array of conservative case values
 * @param {Array} data.optimisticCase - Array of optimistic case values
 * @returns {Object} Processed data for the chart
 */
function processData(data) {
  const { years, baseCase, conservativeCase, optimisticCase } = data;
  
  // Prepare series data for ApexCharts
  const series = [
    {
      name: 'Base Case',
      data: baseCase
    },
    {
      name: 'Conservative Case',
      data: conservativeCase
    },
    {
      name: 'Optimistic Case',
      data: optimisticCase
    }
  ];
  
  // Calculate year-over-year growth rates
  const calculateYoYGrowth = (values) => {
    return values.map((val, idx) => {
      if (idx === 0) return null;
      return ((val / values[idx-1] - 1) * 100).toFixed(0) + '%';
    });
  };
  
  const yoyGrowthBase = calculateYoYGrowth(baseCase);
  const yoyGrowthConservative = calculateYoYGrowth(conservativeCase);
  const yoyGrowthOptimistic = calculateYoYGrowth(optimisticCase);
  
  // Calculate CAGR (Compound Annual Growth Rate)
  const calculateCAGR = (startValue, endValue, years) => {
    return ((Math.pow(endValue / startValue, 1 / years) - 1) * 100).toFixed(1) + '%';
  };
  
  const baseCAGR = calculateCAGR(baseCase[0], baseCase[baseCase.length-1], years.length-1);
  const conservativeCAGR = calculateCAGR(conservativeCase[0], conservativeCase[conservativeCase.length-1], years.length-1);
  const optimisticCAGR = calculateCAGR(optimisticCase[0], optimisticCase[optimisticCase.length-1], years.length-1);
  
  // Prepare table data
  const tableData = years.map((year, i) => ({
    Year: year,
    Conservative: `$${conservativeCase[i]}B`,
    "Conservative Growth": yoyGrowthConservative[i] || '-',
    Base: `$${baseCase[i]}B`,
    "Base Growth": yoyGrowthBase[i] || '-',
    Optimistic: `$${optimisticCase[i]}B`,
    "Optimistic Growth": yoyGrowthOptimistic[i] || '-'
  }));
  
  // Calculate annotations for $1 trillion milestone
  const annotations = {
    yaxis: [
      {
        y: 1000,
        borderColor: '#00d085',
        borderWidth: 2,
        strokeDashArray: 5,
        label: {
          borderColor: '#00d085',
          style: {
            color: '#ffffff',
            background: 'rgba(0, 208, 133, 0.8)',
            fontSize: '12px',
            fontWeight: 'bold',
            padding: {
              left: 10,
              right: 10,
              top: 5,
              bottom: 5
            },
            borderRadius: 4
          },
          text: '$1 Trillion Milestone',
          position: 'right',
          offsetX: -15,
          offsetY: 0
        }
      }
    ]
  };
  
  // Determine key milestone points for each scenario
  // Find where each scenario crosses major thresholds (e.g., $1B, $10B, $100B, $1T)
  const findMilestoneYear = (values, threshold) => {
    for (let i = 0; i < values.length; i++) {
      if (values[i] >= threshold) {
        return {
          year: years[i],
          value: values[i],
          index: i
        };
      }
    }
    return null;
  };
  
  const milestones = {
    base: {
      billion: findMilestoneYear(baseCase, 1),
      tenBillion: findMilestoneYear(baseCase, 10),
      hundredBillion: findMilestoneYear(baseCase, 100),
      trillion: findMilestoneYear(baseCase, 1000)
    },
    conservative: {
      billion: findMilestoneYear(conservativeCase, 1),
      tenBillion: findMilestoneYear(conservativeCase, 10),
      hundredBillion: findMilestoneYear(conservativeCase, 100),
      trillion: findMilestoneYear(conservativeCase, 1000)
    },
    optimistic: {
      billion: findMilestoneYear(optimisticCase, 1),
      tenBillion: findMilestoneYear(optimisticCase, 10),
      hundredBillion: findMilestoneYear(optimisticCase, 100),
      trillion: findMilestoneYear(optimisticCase, 1000)
    }
  };
  
  return {
    series,
    categories: years,
    tableData,
    annotations,
    yoyGrowth: {
      base: yoyGrowthBase,
      conservative: yoyGrowthConservative,
      optimistic: yoyGrowthOptimistic
    },
    cagr: {
      base: baseCAGR,
      conservative: conservativeCAGR,
      optimistic: optimisticCAGR
    },
    milestones
  };
}

// Format values for display
function formatValue(value) {
  if (value >= 1000) {
    return `$${(value/1000).toFixed(1)}T`;
  } else if (value >= 1) {
    return `$${value.toFixed(1)}B`;
  } else {
    return `$${(value * 1000).toFixed(0)}M`;
  }
}

// Default data for the market growth chart
const defaultData = {
  years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035],
  baseCase: [0.2, 0.5, 1.2, 2.8, 5.7, 11.5, 24.3, 48.1, 87.6, 153.2, 269.7, 433.9, 654.8, 834.5, 962.7, 1032.8],
  conservativeCase: [0.2, 0.4, 0.9, 2.0, 3.8, 7.6, 16.3, 33.7, 65.2, 119.4, 207.5, 345.1, 515.6, 674.3, 779.8, 853.2],
  optimisticCase: [0.2, 0.6, 1.5, 3.5, 7.3, 15.2, 32.6, 64.7, 118.1, 207.6, 358.6, 575.3, 841.6, 1065.3, 1247.4, 1342.5]
};

// Handle messages from the main thread
self.onmessage = function(e) {
  try {
    const message = e.data;
    
    if (message.action === 'prepareData') {
      // Check if we have a chartId
      const chartId = message.chartId || 'marketGrowthChart';
      
      // For now, we'll use default data, but in a real app we might load different
      // data based on the chartId or fetch from an API
      const dataToProcess = {
        years: message.years || defaultData.years,
        baseCase: message.baseCase || defaultData.baseCase,
        conservativeCase: message.conservativeCase || defaultData.conservativeCase,
        optimisticCase: message.optimisticCase || defaultData.optimisticCase
      };
      
      // Process the data
      const chartData = processData(dataToProcess);
      
      // Send the result back to the main thread
      self.postMessage({
        action: 'dataReady', // Add the action field expected by the client
        id: message.id, // Pass back any message ID if using reusable worker pattern
        chartData: chartData,
        title: "Global Quantum Computing Market Growth (2020-2035)",
        description: "Projected cumulative economic impact of quantum computing technologies, showing the expected trajectory toward $1 trillion market size.",
        caption: "CAGR: Base Case " + chartData.cagr.base + " | Conservative " + chartData.cagr.conservative + " | Optimistic " + chartData.cagr.optimistic,
        tableData: chartData.tableData,
        formatters: {
          formatValue: formatValue.toString()
        }
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
