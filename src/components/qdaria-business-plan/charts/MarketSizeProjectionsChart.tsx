import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Scale
} from 'chart.js';
import type { CoreScaleOptions, Tick } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
const marketSize = [2, 3.5, 5.5, 8, 11, 14, 15.5, 16.5, 17, 17.5, 18];

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#fff',
        font: {
          size: 14
        }
      }
    },
    title: {
      display: true,
      text: 'Global Quantum Computing Market Size Projections',
      color: '#00ffd3',
      font: {
        size: 20,
        weight: 'bold' as const
      }
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#00ffd3',
      bodyColor: '#fff',
      borderColor: '#04a3ff',
      borderWidth: 1,
      callbacks: {
        label: function(context: any) {
          return `Market Size: $${context.parsed.y}B`;
        }
      }
    }
  },
  scales: {
    x: {
      type: 'category' as const,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      }
    },
    y: {
      type: 'linear' as const,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff',
        callback: function(this: Scale<CoreScaleOptions>, tickValue: string | number) {
          return `$${tickValue}B`;
        }
      },
      title: {
        display: true,
        text: 'Market Size (Billions USD)',
        color: '#fff'
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
};

const data = {
  labels: years,
  datasets: [
    {
      label: 'Market Size (Billions USD)',
      data: marketSize,
      borderColor: '#04a3ff',
      backgroundColor: 'rgba(4, 163, 255, 0.1)',
      borderWidth: 3,
      pointBackgroundColor: '#00ffd3',
      pointBorderColor: '#04a3ff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#04a3ff',
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true,
      tension: 0.4
    }
  ]
};

export function MarketSizeProjectionsChart() {
  return (
    <div style={{ height: '400px' }}>
      <Line options={options} data={data} />
    </div>
  );
}
