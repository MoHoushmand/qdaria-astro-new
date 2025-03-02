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
import type { ChartData, ChartOptions, CoreScaleOptions, Tick } from 'chart.js';
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

const years = [2025, 2026, 2027, 2028, 2029, 2030];
const ebitda = [-20, -15, -5, 25, 60, 100];

interface TooltipContext {
  parsed: {
    y: number;
  };
}

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#fff',
        font: {
          size: 14
        }
      }
    },
    title: {
      display: true,
      text: 'EBITDA Projections (2025-2030)',
      color: '#00ffd3',
      font: {
        size: 20,
        weight: 'bold'
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#00ffd3',
      bodyColor: '#fff',
      borderColor: '#04a3ff',
      borderWidth: 1,
      callbacks: {
        label: function(context: TooltipContext) {
          const value = context.parsed.y;
          const sign = value >= 0 ? '+' : '';
          return `EBITDA: ${sign}$${value}M`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff',
        callback: function(tickValue: string | number, index: number, ticks: Tick[]) {
          const value = Number(tickValue);
          const sign = value >= 0 ? '+' : '';
          return `${sign}$${value}M`;
        }
      },
      title: {
        display: true,
        text: 'EBITDA (Millions USD)',
        color: '#fff'
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
};

const data: ChartData<'line'> = {
  labels: years,
  datasets: [
    {
      label: 'EBITDA',
      data: ebitda,
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

export function ProfitabilityChart() {
  return (
    <div style={{ height: '400px' }}>
      <Line options={options} data={data} />
    </div>
  );
}
