import type { Chart as ChartJS } from 'chart.js';

declare global {
  interface Window {
    Chart: typeof ChartJS;
    initMarketSizeChart: () => void;
    initSWOTChart: () => void;
    initRoadmapChart: () => void;
    initRevenueChart: () => void;
    initProfitabilityChart: () => void;
  }

  interface HTMLCanvasElement {
    chart?: ChartJS;
  }
}

export {};
