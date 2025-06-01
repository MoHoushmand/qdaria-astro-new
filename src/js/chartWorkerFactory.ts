/**
 * chartWorkerFactory.ts
 * Factory for creating and managing web workers for chart data processing
 */

// Define worker message types
export interface WorkerMessage {
  action: string;
  [key: string]: any;
}

// Define worker response types
export interface WorkerResponse {
  action: string;
  [key: string]: any;
}

/**
 * Create a worker for chart data processing
 * @param workerPath Path to the worker script
 * @returns A promise that resolves with the worker instance
 */
export const createChartWorker = (workerPath: string): Worker => {
  return new Worker(workerPath);
};

/**
 * Send a message to a worker and get a response
 * @param worker Worker instance
 * @param message Message to send to the worker
 * @returns A promise that resolves with the worker response
 */
export const sendWorkerMessage = <T extends WorkerResponse>(
  worker: Worker,
  message: WorkerMessage
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const messageHandler = (event: MessageEvent) => {
      worker.removeEventListener('message', messageHandler);
      resolve(event.data as T);
    };

    const errorHandler = (error: ErrorEvent) => {
      worker.removeEventListener('error', errorHandler);
      reject(error);
    };

    worker.addEventListener('message', messageHandler);
    worker.addEventListener('error', errorHandler);
    worker.postMessage(message);
  });
};

/**
 * Process chart data using a worker
 * @param workerPath Path to the worker script
 * @param message Message to send to the worker
 * @returns A promise that resolves with the worker response
 */
export const processChartData = async <T extends WorkerResponse>(
  workerPath: string,
  message: WorkerMessage
): Promise<T> => {
  const worker = createChartWorker(workerPath);
  try {
    const response = await sendWorkerMessage<T>(worker, message);
    return response;
  } catch (error) {
    console.error('Error processing chart data:', error);
    throw error;
  } finally {
    // Terminate the worker when done
    worker.terminate();
  }
};

/**
 * Create a reusable worker for chart data processing
 * @param workerPath Path to the worker script
 * @returns An object with methods to interact with the worker
 */
export const createReusableChartWorker = (workerPath: string) => {
  const worker = createChartWorker(workerPath);
  let messageId = 0;
  const pendingMessages = new Map<
    number,
    { resolve: (value: any) => void; reject: (reason: any) => void }
  >();

  worker.addEventListener('message', (event) => {
    const { id, data, error } = event.data;
    const pending = pendingMessages.get(id);
    
    if (pending) {
      pendingMessages.delete(id);
      if (error) {
        pending.reject(error);
      } else {
        pending.resolve(data);
      }
    }
  });

  worker.addEventListener('error', (error) => {
    console.error('Worker error:', error);
    // Reject all pending messages
    pendingMessages.forEach((pending) => {
      pending.reject(error);
    });
    pendingMessages.clear();
  });

  return {
    /**
     * Send a message to the worker and get a response
     * @param message Message to send to the worker
     * @returns A promise that resolves with the worker response
     */
    sendMessage: <T>(message: WorkerMessage): Promise<T> => {
      const id = messageId++;
      return new Promise((resolve, reject) => {
        pendingMessages.set(id, { resolve, reject });
        worker.postMessage({ id, ...message });
      });
    },

    /**
     * Terminate the worker
     */
    terminate: () => {
      worker.terminate();
      pendingMessages.clear();
    }
  };
};

/**
 * Create a worker for processing competitor radar chart data
 * @returns A reusable worker for competitor radar chart data
 */
export const createCompetitorRadarWorker = () => {
  return createReusableChartWorker('/charts/competitorRadarWorker.js');
};

/**
 * Create a worker for processing market size chart data
 * @returns A reusable worker for market size chart data
 */
export const createMarketSizeWorker = () => {
  return createReusableChartWorker('/charts/marketSizeWorker.js');
};

/**
 * Create a worker for processing SWOT analysis chart data
 * @returns A reusable worker for SWOT analysis chart data
 */
export const createSWOTAnalysisWorker = () => {
  return createReusableChartWorker('/charts/swotAnalysisWorker.js');
};

/**
 * Create a worker for processing execution roadmap chart data
 * @returns A reusable worker for execution roadmap chart data
 */
export const createExecutionRoadmapWorker = () => {
  return createReusableChartWorker('/charts/executionRoadmapWorker.js');
};

/**
 * Create a worker for processing revenue chart data
 * @returns A reusable worker for revenue chart data
 */
export const createRevenueWorker = () => {
  return createReusableChartWorker('/charts/revenueWorker.js');
};

/**
 * Create a worker for processing profitability chart data
 * @returns A reusable worker for profitability chart data
 */
export const createProfitabilityWorker = () => {
  return createReusableChartWorker('/charts/profitabilityWorker.js');
};

/**
 * Create a worker for processing risk assessment chart data
 * @returns A reusable worker for risk assessment chart data
 */
export const createRiskAssessmentWorker = () => {
  return createReusableChartWorker('/charts/riskAssessmentWorker.js');
};

/**
 * Create a worker for processing topological timeline chart data
 * @returns A reusable worker for topological timeline chart data
 */
export const createTopologicalTimelineWorker = () => {
  return createReusableChartWorker('/charts/topologicalTimelineWorker.js');
};

/**
 * Create a worker for processing funding allocation chart data
 * @returns A reusable worker for funding allocation chart data
 */
export const createFundingAllocationWorker = () => {
  return createReusableChartWorker('/charts/fundingAllocationWorker.js');
};

/**
 * Create a worker for processing market growth chart data
 * @returns A reusable worker for market growth chart data
 */
export const createMarketGrowthWorker = () => {
  return createReusableChartWorker('/charts/marketGrowthWorker.js');
};

/**
 * Create a worker for processing investment distribution chart data
 * @returns A reusable worker for investment distribution chart data
 */
export const createInvestmentDistributionWorker = () => {
  return createReusableChartWorker('/charts/investmentDistributionWorker.js');
};

/**
 * Create a worker for processing ROI comparison chart data
 * @returns A reusable worker for ROI comparison chart data
 */
export const createROIComparisonWorker = () => {
  return createReusableChartWorker('/charts/roiComparisonWorker.js');
};

/**
 * Create a worker for processing market positioning chart data
 * @returns A reusable worker for market positioning chart data
 */
export const createMarketPositioningWorker = () => {
  return createReusableChartWorker('/charts/marketPositioningWorker.js');
};

/**
 * Create a worker for processing revenue diversification chart data
 * @returns A reusable worker for revenue diversification chart data
 */
export const createRevenueDiversificationWorker = () => {
  return createReusableChartWorker('/charts/revenueDiversificationWorker.js');
};

/**
 * Create a worker for processing stock performance chart data
 * @returns A reusable worker for stock performance chart data
 */
export const createStockPerformanceWorker = () => {
  return createReusableChartWorker('/charts/stockPerformanceWorker.js');
};

/**
 * Create a worker for processing competitor strength chart data
 * @returns A reusable worker for competitor strength chart data
 */
export const createCompetitorStrengthWorker = () => {
  return createReusableChartWorker('/charts/competitorStrengthWorker.js');
};

/**
 * Create a worker for processing organizational chart data
 * @returns A reusable worker for organizational chart data
 */
export const createOrganizationalChartWorker = () => {
  return createReusableChartWorker('/charts/organizationalChartWorker.js');
};

/**
 * Create a worker for processing quantum hardware comparison chart data
 * @returns A reusable worker for quantum hardware comparison chart data
 */
export const createQuantumHardwareComparisonWorker = () => {
  return createReusableChartWorker('/charts/quantumHardwareComparisonWorker.js');
};

/**
 * Create a worker for processing financial metrics mixed chart data
 * @returns A reusable worker for financial metrics mixed chart data
 */
export const createFinancialMetricsMixedWorker = () => {
  return createReusableChartWorker('/charts/financialMetricsMixedWorker.js');
};

/**
 * Create a worker for processing forecast scenarios range chart data
 * @returns A reusable worker for forecast scenarios range chart data
 */
export const createForecastScenariosRangeWorker = () => {
  return createReusableChartWorker('/charts/forecastScenariosRangeWorker.js');
};

// Define worker wrapper interface
export interface ChartWorkerWrapper {
  sendMessage: <T>(message: WorkerMessage) => Promise<T>;
  terminate: () => void;
  postMessage: (message: any) => void;
  onmessage?: ((this: Worker, ev: MessageEvent) => any) | null;
}

/**
 * Factory for creating chart workers
 */
export const chartWorkerFactory = {
  createChartWorker: (type: string): ChartWorkerWrapper => {
    const workerMap: { [key: string]: () => ChartWorkerWrapper } = {
      'competitorRadar': createCompetitorRadarWorker,
      'marketSize': createMarketSizeWorker,
      'swotAnalysis': createSWOTAnalysisWorker,
      'executionRoadmap': createExecutionRoadmapWorker,
      'revenue': createRevenueWorker,
      'profitability': createProfitabilityWorker,
      'riskAssessment': createRiskAssessmentWorker,
      'topologicalTimeline': createTopologicalTimelineWorker,
      'fundingAllocation': createFundingAllocationWorker,
      'marketGrowth': createMarketGrowthWorker,
      'investmentDistribution': createInvestmentDistributionWorker,
      'roiComparison': createROIComparisonWorker,
      'marketPositioning': createMarketPositioningWorker,
      'revenueDiversification': createRevenueDiversificationWorker,
      'stockPerformance': createStockPerformanceWorker,
      'competitorStrength': createCompetitorStrengthWorker,
      'organizationalChart': createOrganizationalChartWorker,
      'quantumHardwareComparison': createQuantumHardwareComparisonWorker,
      'financialMetricsMixed': createFinancialMetricsMixedWorker,
      'forecastScenariosRange': createForecastScenariosRangeWorker
    };

    if (workerMap[type]) {
      return workerMap[type]();
    } else {
      console.error(`No worker found for type: ${type}`);
      throw new Error(`No worker found for type: ${type}`);
    }
  }
};
