import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Strategic Execution Timeline',
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
          return milestones[context.dataIndex];
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
        font: {
          size: 14
        }
      }
    }
  }
};

const phases = [
  'Phase 4 (2031-35)',
  'Phase 3 (2028-30)',
  'Phase 2 (2026-27)',
  'Phase 1 (2024-25)'
];

const milestones = [
  'Global expansion and diversification post-IPO, market leadership solidified',
  'Market leadership with 100+ qubit systems, full enterprise solutions, IPO events',
  'Growth by scaling to 50+ qubits, expanding services and partnerships',
  'Market entry with 9-qubit prototype, initial product launches and pilot programs'
];

const progressData = [100, 75, 50, 25];

const data = {
  labels: phases,
  datasets: [
    {
      data: progressData,
      backgroundColor: [
        'rgba(4, 163, 255, 0.8)',
        'rgba(4, 163, 255, 0.6)',
        'rgba(4, 163, 255, 0.4)',
        'rgba(4, 163, 255, 0.2)'
      ],
      borderColor: [
        '#04a3ff',
        '#04a3ff',
        '#04a3ff',
        '#04a3ff'
      ],
      borderWidth: 2,
      borderRadius: 5,
      barThickness: 40
    }
  ]
};

export function ExecutionRoadmapChart() {
  return (
    <div style={{ height: '400px' }}>
      <Bar options={options} data={data} />
    </div>
  );
}
