import React from 'react';
import Chart from 'chart.js/auto';
import type { ChartConfiguration, TooltipItem } from 'chart.js';

export const MarketSizeChart: React.FC = () => {
  React.useEffect(() => {
    const data: ChartConfiguration<'line'>['data'] = {
      labels: Array.from({ length: 11 }, (_, i) => 2025 + i),
      datasets: [{
        label: 'Market Size (Billions USD)',
        data: [2, 3.5, 5.8, 8.2, 11.5, 14.8, 15.9, 16.7, 17.4, 17.9, 18.5],
        borderColor: '#04a3ff',
        backgroundColor: 'rgba(4, 163, 255, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(2, 6, 23, 0.9)',
        pointBorderColor: '#04a3ff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4
      }]
    };

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(4, 163, 255, 0.1)'
            },
            ticks: {
              callback: function(value) {
                return `$${value}B`;
              },
              color: '#9ca3af'
            }
          },
          x: {
            grid: {
              color: 'rgba(4, 163, 255, 0.1)'
            },
            ticks: {
              color: '#9ca3af'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#9ca3af'
            }
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
              label: function(tooltipItem: TooltipItem<'line'>) {
                return `$${tooltipItem.raw}B`;
              }
            }
          }
        }
      }
    };

    const ctx = document.getElementById('marketSizeChart') as HTMLCanvasElement;
    if (ctx) {
      const chart = new Chart(ctx, config);
      return () => chart.destroy();
    }
  }, []);

  return (
    <canvas id="marketSizeChart" className="w-full h-[400px]"></canvas>
  );
};
