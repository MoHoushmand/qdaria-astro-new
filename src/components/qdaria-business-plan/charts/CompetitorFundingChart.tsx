import React from 'react';
import Chart from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';

export const CompetitorFundingChart: React.FC = () => {
  React.useEffect(() => {
    const data: ChartConfiguration<'bar'>['data'] = {
      labels: ['IonQ', 'Rigetti', 'D-Wave', 'PsiQuantum', 'QDaria'],
      datasets: [{
        label: 'Total Funding Raised ($ Millions)',
        data: [84, 198, 300, 665, 1],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',   // IonQ - blue
          'rgba(75, 192, 192, 0.7)',   // Rigetti - teal
          'rgba(153, 102, 255, 0.7)',  // D-Wave - purple
          'rgba(201, 203, 207, 0.7)',  // PsiQuantum - gray
          'rgba(255, 99, 132, 0.8)'    // QDaria - red (highlight)
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 2,
        borderRadius: 6,
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff'
      }]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(4, 163, 255, 0.1)'
            },
            ticks: {
              callback: function(value) {
                return `$${value}M`;
              },
              color: '#9ca3af'
            },
            title: {
              display: true,
              text: 'Funding ($ Millions)',
              color: '#9ca3af',
              font: {
                size: 14,
                weight: 'bold'
              }
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
            display: true,
            labels: {
              color: '#9ca3af',
              font: {
                size: 12
              }
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
              label: function(context) {
                return `$${context.raw}M`;
              }
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    };

    const ctx = document.getElementById('competitorFundingChart') as HTMLCanvasElement;
    if (ctx) {
      const chart = new Chart(ctx, config);
      return () => chart.destroy();
    }
  }, []);

  return (
    <canvas id="competitorFundingChart" className="w-full h-[400px]"></canvas>
  );
};
