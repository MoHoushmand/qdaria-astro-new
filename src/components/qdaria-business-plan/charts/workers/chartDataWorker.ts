/**
 * Chart Data Worker
 * 
 * This worker handles complex calculations for charts to avoid blocking the main thread.
 * It processes data and sends the results back to the main thread.
 */

// Define the message types that this worker can handle
type WorkerMessageType = 
  | 'processMarketData'
  | 'calculateCompoundGrowth'
  | 'processCompetitiveMatrix'
  | 'calculateTAMSAMSOM'
  | 'processTimeSeriesData';

interface WorkerMessage {
  type: WorkerMessageType;
  payload: any;
}

// Main worker handler
self.onmessage = function(e: MessageEvent) {
  const { type, payload } = e.data as WorkerMessage;
  
  switch (type) {
    case 'processMarketData':
      processMarketData(payload);
      break;
    case 'calculateCompoundGrowth':
      calculateCompoundGrowth(payload);
      break;
    case 'processCompetitiveMatrix':
      processCompetitiveMatrix(payload);
      break;
    case 'calculateTAMSAMSOM':
      calculateTAMSAMSOM(payload);
      break;
    case 'processTimeSeriesData':
      processTimeSeriesData(payload);
      break;
    default:
      self.postMessage({
        error: `Unknown message type: ${type}`
      });
  }
};

/**
 * Process market data for visualization
 * This function processes raw market data to prepare it for visualization
 */
function processMarketData(payload: {
  years: number[];
  rawData: number[];
  smoothing?: boolean;
}) {
  const { years, rawData, smoothing = false } = payload;
  
  try {
    // Apply data processing logic
    let processedData = [...rawData];
    
    // Apply smoothing if requested (simple moving average)
    if (smoothing && rawData.length > 2) {
      processedData = rawData.map((value, index) => {
        if (index === 0 || index === rawData.length - 1) {
          return value;
        }
        return (rawData[index - 1] + value + rawData[index + 1]) / 3;
      });
    }
    
    // Calculate year-over-year growth rates
    const growthRates = rawData.slice(1).map((value, index) => {
      const prevValue = rawData[index];
      return prevValue > 0 ? ((value - prevValue) / prevValue) * 100 : 0;
    });
    
    // Return processed data
    self.postMessage({
      years,
      processedData,
      growthRates,
      totalGrowth: rawData.length > 1 
        ? ((rawData[rawData.length - 1] - rawData[0]) / rawData[0]) * 100 
        : 0
    });
  } catch (error) {
    self.postMessage({
      error: `Error processing market data: ${error}`
    });
  }
}

/**
 * Calculate compound annual growth rate
 */
function calculateCompoundGrowth(payload: {
  startValue: number;
  endValue: number;
  years: number;
}) {
  const { startValue, endValue, years } = payload;
  
  try {
    if (startValue <= 0 || years <= 0) {
      throw new Error('Invalid input: startValue must be positive and years must be greater than 0');
    }
    
    // Calculate CAGR
    const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
    
    // Return result
    self.postMessage({
      cagr: cagr.toFixed(2),
      multiplier: endValue / startValue
    });
  } catch (error) {
    self.postMessage({
      error: `Error calculating compound growth: ${error}`
    });
  }
}

/**
 * Process competitive matrix data
 */
function processCompetitiveMatrix(payload: {
  companies: string[];
  metrics: { name: string, weight: number }[];
  scores: number[][];
}) {
  const { companies, metrics, scores } = payload;
  
  try {
    // Calculate weighted scores
    const weightedScores = scores.map((companyScores) => {
      return companyScores.map((score, index) => {
        return score * metrics[index].weight;
      });
    });
    
    // Calculate total scores for each company
    const totalScores = weightedScores.map((companyWeightedScores) => {
      return companyWeightedScores.reduce((sum, score) => sum + score, 0);
    });
    
    // Normalize scores (0-100 scale)
    const totalWeight = metrics.reduce((sum, metric) => sum + metric.weight, 0);
    const normalizedTotalScores = totalScores.map(score => (score / totalWeight) * 100);
    
    // Return processed data
    self.postMessage({
      companies,
      metrics,
      weightedScores,
      totalScores,
      normalizedTotalScores
    });
  } catch (error) {
    self.postMessage({
      error: `Error processing competitive matrix: ${error}`
    });
  }
}

/**
 * Calculate TAM/SAM/SOM decomposition
 */
function calculateTAMSAMSOM(payload: {
  tam: number;
  samPercentage: number;
  somPercentage: number;
  years: number[];
  growthRate: number;
}) {
  const { tam, samPercentage, somPercentage, years, growthRate } = payload;
  
  try {
    // Calculate SAM and SOM based on percentages
    const sam = tam * (samPercentage / 100);
    const som = sam * (somPercentage / 100);
    
    // Calculate growth over years
    const tamProjection = years.map((year, index) => {
      return tam * Math.pow(1 + (growthRate / 100), index);
    });
    
    const samProjection = tamProjection.map(value => value * (samPercentage / 100));
    const somProjection = samProjection.map(value => value * (somPercentage / 100));
    
    // Return calculated values
    self.postMessage({
      tam,
      sam,
      som,
      tamProjection,
      samProjection,
      somProjection,
      years
    });
  } catch (error) {
    self.postMessage({
      error: `Error calculating TAM/SAM/SOM: ${error}`
    });
  }
}

/**
 * Process time series data for various visualizations
 */
function processTimeSeriesData(payload: {
  timeSeries: { date: string, value: number }[];
  interval?: 'day' | 'week' | 'month' | 'quarter' | 'year';
  smoothing?: boolean;
}) {
  const { timeSeries, interval = 'month', smoothing = false } = payload;
  
  try {
    // Sort time series by date
    const sortedSeries = [...timeSeries].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    // Aggregate data based on interval
    let aggregatedData: { date: string, value: number }[] = [];
    
    if (interval === 'day') {
      aggregatedData = sortedSeries;
    } else {
      // Group data by interval
      const groupedData = sortedSeries.reduce((groups, item) => {
        const date = new Date(item.date);
        let key: string;
        
        switch (interval) {
          case 'week':
            // Get the week number
            const weekNum = Math.floor((date.getDate() - 1) / 7) + 1;
            key = `${date.getFullYear()}-W${weekNum}`;
            break;
          case 'month':
            key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            break;
          case 'quarter':
            const quarter = Math.floor(date.getMonth() / 3) + 1;
            key = `${date.getFullYear()}-Q${quarter}`;
            break;
          case 'year':
            key = `${date.getFullYear()}`;
            break;
          default:
            key = item.date;
        }
        
        if (!groups[key]) {
          groups[key] = [];
        }
        
        groups[key].push(item);
        
        return groups;
      }, {} as Record<string, typeof timeSeries>);
      
      // Calculate average for each group
      aggregatedData = Object.entries(groupedData).map(([key, group]) => {
        const sum = group.reduce((total, item) => total + item.value, 0);
        const average = sum / group.length;
        
        return {
          date: key,
          value: average
        };
      });
      
      // Sort again by date
      aggregatedData.sort((a, b) => {
        // Sort by the first component of the key (year) first
        const aYear = parseInt(a.date.split('-')[0]);
        const bYear = parseInt(b.date.split('-')[0]);
        
        if (aYear !== bYear) {
          return aYear - bYear;
        }
        
        // If years are the same, sort by the second component
        const aSecondPart = a.date.split('-')[1];
        const bSecondPart = b.date.split('-')[1];
        
        if (aSecondPart && bSecondPart) {
          // Handle quarter notation (Q1, Q2, etc.)
          if (aSecondPart.startsWith('Q') && bSecondPart.startsWith('Q')) {
            return parseInt(aSecondPart.substring(1)) - parseInt(bSecondPart.substring(1));
          }
          
          // Handle week notation (W1, W2, etc.)
          if (aSecondPart.startsWith('W') && bSecondPart.startsWith('W')) {
            return parseInt(aSecondPart.substring(1)) - parseInt(bSecondPart.substring(1));
          }
          
          // Handle month as number
          return parseInt(aSecondPart) - parseInt(bSecondPart);
        }
        
        return 0;
      });
    }
    
    // Apply smoothing if requested (simple moving average)
    let processedData = [...aggregatedData];
    if (smoothing && aggregatedData.length > 2) {
      processedData = aggregatedData.map((item, index) => {
        if (index === 0 || index === aggregatedData.length - 1) {
          return item;
        }
        
        const prevValue = aggregatedData[index - 1].value;
        const nextValue = aggregatedData[index + 1].value;
        const smoothedValue = (prevValue + item.value + nextValue) / 3;
        
        return {
          date: item.date,
          value: smoothedValue
        };
      });
    }
    
    // Calculate growth rates
    const growthRates = aggregatedData.slice(1).map((item, index) => {
      const prevValue = aggregatedData[index].value;
      return prevValue > 0 ? ((item.value - prevValue) / prevValue) * 100 : 0;
    });
    
    // Return processed data
    self.postMessage({
      processedData,
      labels: processedData.map(item => item.date),
      values: processedData.map(item => item.value),
      growthRates,
      interval
    });
  } catch (error) {
    self.postMessage({
      error: `Error processing time series data: ${error}`
    });
  }
}

// Helper to create a Web Worker instance
export const createWorkerInstance = () => {
  // Convert the worker code to a Blob URL
  const code = `(${workerCode.toString()})()`;
  const blob = new Blob([code], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(blob);
  
  // Create and return the worker
  const worker = new Worker(workerUrl);
  
  // Clean up the URL
  URL.revokeObjectURL(workerUrl);
  
  return worker;
};

// Define the worker code as a string to be loaded
function workerCode() {
  // Code will be injected here during build
  // This is a workaround to create a worker from a string in TypeScript
}