import React from 'react';
import Chart from 'chart.js/auto';
import type { ChartConfiguration, TooltipItem } from 'chart.js';

export const SWOTChart: React.FC = () => {
  React.useEffect(() => {
    const data: ChartConfiguration<'radar'>['data'] = {
      labels: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'],
      datasets: [{
        label: 'SWOT Analysis',
        data: [90, 40, 85, 50],
        backgroundColor: 'rgba(4, 163, 255, 0.2)',
        borderColor: '#04a3ff',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(2, 6, 23, 0.9)',
        pointBorderColor: '#04a3ff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    };

    const config: ChartConfiguration<'radar'> = {
      type: 'radar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              color: '#9ca3af'
            },
            grid: {
              color: 'rgba(4, 163, 255, 0.1)'
            },
            angleLines: {
              color: 'rgba(4, 163, 255, 0.1)'
            },
            pointLabels: {
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
              label: function(tooltipItem: TooltipItem<'radar'>) {
                return `Score: ${tooltipItem.raw}%`;
              }
            }
          }
        }
      }
    };

    const ctx = document.getElementById('swotChart') as HTMLCanvasElement;
    if (ctx) {
      const chart = new Chart(ctx, config);
      return () => chart.destroy();
    }
  }, []);

  return (
    <canvas id="swotChart" className="w-full h-[400px]"></canvas>
  );
};
