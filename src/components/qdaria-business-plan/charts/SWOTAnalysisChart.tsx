import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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
      text: 'QDaria SWOT Analysis',
      color: '#00ffd3',
      font: {
        size: 20,
        weight: 'bold' as const
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#00ffd3',
      bodyColor: '#fff',
      borderColor: '#04a3ff',
      borderWidth: 1,
      callbacks: {
        label: function(context: any) {
          return `${context.dataset.label}: ${context.parsed.r}`;
        }
      }
    }
  },
  scales: {
    r: {
      min: 0,
      max: 10,
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      angleLines: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      pointLabels: {
        color: '#fff',
        font: {
          size: 14
        }
      },
      ticks: {
        color: '#fff',
        backdropColor: 'transparent'
      }
    }
  }
};

const data = {
  labels: [
    'Unique Technology',
    'Market Position',
    'Team Expertise',
    'Financial Resources',
    'Product Portfolio',
    'Growth Potential'
  ],
  datasets: [
    {
      label: 'Strengths',
      data: [9, 8, 9, 6, 8, 9],
      backgroundColor: 'rgba(4, 163, 255, 0.2)',
      borderColor: '#04a3ff',
      borderWidth: 2,
      pointBackgroundColor: '#00ffd3',
      pointBorderColor: '#04a3ff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#04a3ff'
    },
    {
      label: 'Opportunities',
      data: [8, 9, 7, 8, 9, 9],
      backgroundColor: 'rgba(0, 255, 211, 0.2)',
      borderColor: '#00ffd3',
      borderWidth: 2,
      pointBackgroundColor: '#04a3ff',
      pointBorderColor: '#00ffd3',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00ffd3'
    }
  ]
};

export function SWOTAnalysisChart() {
  return (
    <div style={{ height: '400px' }}>
      <Radar data={data} options={options} />
    </div>
  );
}
