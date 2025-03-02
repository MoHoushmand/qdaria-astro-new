import React from 'react';
import Chart from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';

export const RiskAssessmentChart: React.FC = () => {
  React.useEffect(() => {
    const data: ChartConfiguration<'radar'>['data'] = {
      labels: ['Technical Risk', 'Market Adoption', 'Competitive Pressure', 'Financial Constraints', 'Execution/Team'],
      datasets: [{
        label: 'Risk Level (1-10)',
        data: [9, 8, 6, 8, 5],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 5,
        pointHoverRadius: 7
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
            min: 0,
            max: 10,
            ticks: {
              stepSize: 2,
              backdropColor: 'transparent',
              color: '#9ca3af'
            },
            grid: {
              color: 'rgba(4, 163, 255, 0.1)'
            },
            angleLines: {
              color: 'rgba(4, 163, 255, 0.2)'
            },
            pointLabels: {
              color: '#9ca3af',
              font: {
                size: 12,
                weight: 'bold'
              }
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
                return `Risk Level: ${context.raw}/10`;
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

    const ctx = document.getElementById('riskAssessmentChart') as HTMLCanvasElement;
    if (ctx) {
      const chart = new Chart(ctx, config);
      return () => chart.destroy();
    }
  }, []);

  return (
    <canvas id="riskAssessmentChart" className="w-full h-[400px]"></canvas>
  );
};
