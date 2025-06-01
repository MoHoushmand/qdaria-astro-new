/**
 * financialMetricsMixedWorker.js
 * Web worker for generating data for Financial Metrics Mixed Chart
 * Enhanced for investor-grade visualization with key financial indicators
 */

self.addEventListener('message', function(e) {
  if (e.data.type === 'getData') {
    try {
      const data = generateFinancialMetricsData();
      self.postMessage({
        type: 'chartData',
        options: data
      });
    } catch (error) {
      self.postMessage({
        type: 'error',
        message: error.message
      });
    }
  }
});

function generateFinancialMetricsData() {
  // Years for the x-axis
  const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];
  
  // Revenue data (in millions USD) - Enhanced with more detailed projection
  const revenue = [0.8, 2.5, 9.0, 22.0, 55.0, 100.0, 190.0, 310.0, 490.0, 720.0, 1050.0];
  
  // Profit margin data (percentage) - Shows clear transition to profitability
  const profitMargin = [-120, -80, -30, 5, 18, 25, 28, 30, 32, 34, 35];
  
  // R&D investment (in millions USD) - Strategic scaling with growth
  const rdInvestment = [1.2, 3.0, 4.5, 6.0, 8.5, 12.0, 20.0, 32.0, 48.0, 65.0, 85.0];
  
  // Cumulative funding (in millions USD) - Key funding rounds
  const funding = [1.0, 8.0, 28.0, 80.0, 150.0, 210.0, 280.0, 350.0, 400.0, 450.0, 500.0];
  
  // Customer count (scaled down)
  const customers = [5, 15, 45, 120, 300, 650, 1200, 2100, 3400, 5200, 7800];
  
  // Customer acquisition cost (CAC) in thousands USD
  const cac = [18.0, 15.0, 12.0, 9.0, 8.0, 7.5, 7.0, 6.5, 6.0, 5.8, 5.5];
  
  // Lifetime value (LTV) in thousands USD
  const ltv = [9.0, 16.0, 30.0, 60.0, 120.0, 180.0, 210.0, 240.0, 270.0, 290.0, 310.0];
  
  // Calculate LTV to CAC ratio
  const ltvCacRatio = ltv.map((val, idx) => +(val / cac[idx]).toFixed(2));
  
  // Calculate YoY growth percentages for revenue
  const revenueGrowth = revenue.map((val, idx, arr) => {
    if (idx === 0) return 0;
    return +((val / arr[idx-1] - 1) * 100).toFixed(1);
  });
  
  // Calculate EBITDA (based on revenue and profit margin)
  const ebitda = revenue.map((val, idx) => +(val * profitMargin[idx] / 100).toFixed(1));
  
  // Key business milestones as annotations
  const annotations = {
    xaxis: [
      {
        x: '2028',
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396'
          },
          text: 'IPO & Profitability'
        }
      },
      {
        x: '2035',
        borderColor: '#FF4560',
        label: {
          borderColor: '#FF4560',
          style: {
            color: '#fff',
            background: '#FF4560'
          },
          text: '$1B+ Revenue'
        }
      }
    ],
    yaxis: [
      {
        y: 1000,
        y2: 1100,
        borderColor: '#A300E3',
        fillColor: '#A300E3',
        opacity: 0.2,
        label: {
          borderColor: '#A300E3',
          style: {
            color: '#fff',
            background: '#A300E3'
          },
          text: '$1B Revenue Milestone'
        }
      },
      {
        y: 0,
        yAxisIndex: 1,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396'
          },
          text: 'Profitability Threshold'
        }
      }
    ],
    points: [
      {
        x: '2028',
        y: 22,
        marker: {
          size: 8,
          fillColor: '#00E396',
          strokeColor: '#fff',
          radius: 2
        },
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396'
          },
          text: 'Break-even'
        }
      }
    ]
  };
  
  // Define colors that are visually distinct yet harmonious
  const colors = ['#0084ff', '#00E396', '#775DD0', '#FF4560', '#FEB019', '#00D9E9'];
  
  // Return enhanced data structure
  return {
    years: years,
    series: [
      {
        name: 'Revenue ($M)',
        type: 'column',
        data: revenue
      },
      {
        name: 'Profit Margin (%)',
        type: 'line',
        data: profitMargin
      },
      {
        name: 'R&D Investment ($M)',
        type: 'area',
        data: rdInvestment
      },
      {
        name: 'Cumulative Funding ($M)',
        type: 'line',
        data: funding
      },
      {
        name: 'LTV:CAC Ratio',
        type: 'line',
        data: ltvCacRatio
      },
      {
        name: 'YoY Growth (%)',
        type: 'line',
        data: revenueGrowth
      }
    ],
    // Additional data for the data table
    extraData: {
      customers: customers,
      cac: cac,
      ltv: ltv,
      ebitda: ebitda
    },
    annotations: annotations,
    colors: colors,
    // Marker configurations for different series
    markers: {
      size: [0, 6, 0, 6, 5, 4],
      strokeWidth: 2,
      hover: {
        size: 8
      }
    }
  };
}
