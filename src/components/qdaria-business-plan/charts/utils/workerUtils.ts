import { type ChartWorkerResponse } from '../../../../types/chart';

/**
 * Creates a web worker for chart data processing
 * 
 * This utility function creates a web worker to perform intensive calculations
 * off the main thread, improving performance for complex chart operations.
 */
export const createChartWorker = () => {
  // Check if web workers are supported
  if (typeof Worker === 'undefined') {
    console.warn('Web Workers are not supported in this browser. Chart calculations will run on the main thread.');
    return null;
  }
  
  try {
    // Create a worker from the worker file
    const workerUrl = new URL('../workers/chartDataWorker.ts', import.meta.url);
    const worker = new Worker(workerUrl, { type: 'module' });
    
    return worker;
  } catch (error) {
    console.error('Error creating chart web worker:', error);
    return null;
  }
};

/**
 * Process data using a web worker
 * 
 * This function sends a message to a web worker and returns a promise
 * that resolves with the worker's response.
 */
export const processDataWithWorker = <T>(
  worker: Worker | null,
  type: string,
  payload: any
): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (!worker) {
      // If worker is not available, process data on main thread
      try {
        // Fallback processing logic goes here
        // For now, just pass through the data
        resolve(payload as unknown as T);
      } catch (error) {
        reject(new Error(`Error processing data on main thread: ${error}`));
      }
      return;
    }
    
    // Set up message handler
    const handleMessage = (e: MessageEvent) => {
      // Clean up
      worker.removeEventListener('message', handleMessage);
      
      // Check for errors
      if (e.data.error) {
        reject(new Error(e.data.error));
        return;
      }
      
      // Resolve with processed data
      resolve(e.data as T);
    };
    
    // Set up error handler
    const handleError = (error: ErrorEvent) => {
      // Clean up
      worker.removeEventListener('error', handleError);
      
      // Reject with error
      reject(new Error(`Worker error: ${error.message}`));
    };
    
    // Listen for messages and errors
    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', handleError);
    
    // Send message to worker
    worker.postMessage({ type, payload });
  });
};

/**
 * Hook for using web workers with React components
 * 
 * This custom hook creates a web worker and provides methods for sending
 * messages to it and receiving responses.
 */
export const useChartWorker = () => {
  // Create worker on first use
  const worker = createChartWorker();
  
  // Function to process data with the worker
  const processData = <T>(type: string, payload: any): Promise<T> => {
    return processDataWithWorker<T>(worker, type, payload);
  };
  
  // Function to clean up the worker
  const cleanup = () => {
    if (worker) {
      worker.terminate();
    }
  };
  
  return {
    processData,
    cleanup,
    isAvailable: !!worker
  };
};

/**
 * Fallback data processing for when web workers are not available
 * 
 * This object contains functions that mirror the worker's functionality
 * but run on the main thread as a fallback.
 */
export const fallbackProcessors = {
  processMarketData: (payload: {
    years: number[];
    rawData: number[];
    smoothing?: boolean;
  }) => {
    const { years, rawData, smoothing = false } = payload;
    
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
    return {
      years,
      processedData,
      growthRates,
      totalGrowth: rawData.length > 1 
        ? ((rawData[rawData.length - 1] - rawData[0]) / rawData[0]) * 100 
        : 0
    };
  },
  
  calculateCompoundGrowth: (payload: {
    startValue: number;
    endValue: number;
    years: number;
  }) => {
    const { startValue, endValue, years } = payload;
    
    if (startValue <= 0 || years <= 0) {
      throw new Error('Invalid input: startValue must be positive and years must be greater than 0');
    }
    
    // Calculate CAGR
    const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
    
    // Return result
    return {
      cagr: cagr.toFixed(2),
      multiplier: endValue / startValue
    };
  },
  
  // Add other fallback processors as needed
};