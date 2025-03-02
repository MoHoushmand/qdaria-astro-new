import React from 'react';
import Chart from 'chart.js/auto';
import type { ChartConfiguration, TooltipItem } from 'chart.js';

export const RoadmapChart: React.FC = () => {
  React.useEffect(() => {
    const labels = [
      'Phase 4 (2031-35)',
      'Phase 3 (2028-30)',
      'Phase 2 (2026-27)',
      'Phase 1 (2024-25)'
    ];

    const descriptions = {
      'Phase 4 (2031-35)': 'Global expansion',
      'Phase 3 (2028-30)': '100+ qubit systems, IPO',
      'Phase 2 (2026-27)': 'Scale to 50+ qubits',
      'Phase 1 (2024-25)': 'Market entry, 9-qubit prototype'
    };

    const data: ChartConfiguration<'bar'>['data'] = {
      labels,
      datasets: [{
        label: 'Execution Progress',
        data: [25, 50, 75, 100],
        backgroundColor: 'rgba(4, 163, 255, 0.6)',
        borderColor: '#04a3ff',
        borderWidth: 1,
        borderRadius: 4
      }]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(4, 163, 255, 0.1)'
            },
            ticks: {
              callback: function(value) {
                return `${value}%`;
              },
              color: '#9ca3af'
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              color: '#9ca3af',
              font: {
                size: 12
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(2, 6, 23, 0.9)',
            borderColor: 'rgba(4, 163, 255, 0.3)',
            borderWidth: 1,
            titleColor: '#9ca3af',
            bodyColor: '#9ca3af',
            cornerRadius: 8,
            boxPadding: 6,
            callbacks: {
              label: function(tooltipItem: TooltipItem<'bar'>) {
                const phase = tooltipItem.label as keyof typeof descriptions;
                return [
                  `Progress: ${tooltipItem.raw}%`,
                  `Details: ${descriptions[phase]}`
                ];
              }
            }
          }
        }
      }
    };

    const ctx = document.getElementById('roadmapChart') as HTMLCanvasElement;
    if (ctx) {
      const chart = new Chart(ctx, config);
      return () => chart.destroy();
    }
  }, []);

  return (
    <canvas id="roadmapChart" className="w-full h-[400px]"></canvas>
  );
};
