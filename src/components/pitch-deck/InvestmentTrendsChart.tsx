'use client'

import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

const InvestmentTrendsChart: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      stacked: true,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      }
    },
    colors: ['#14b8a6', '#a855f7'],
    xaxis: {
      categories: [
        '2023',
        '2024',
        '2025',
        '2026',
        '2027',
        '2028',
        '2029',
        '2030',
      ],
      labels: {
        style: {
          colors: Array(8).fill('#ffffff'),
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
        },
        formatter: (value) => `$${value}B`,
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `$${value} Billion`,
      },
    },
    legend: {
      labels: {
        colors: '#ffffff',
      },
    },
    grid: {
      borderColor: '#52525b',
      strokeDashArray: 4,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '70%',
      }
    }
  };

  const series = [
    {
      name: 'Public Investment',
      data: [1.5, 2.3, 3.5, 5.3, 8.0, 12.1, 18.3, 27.7],
    },
    {
      name: 'Private Investment',
      data: [2.0, 3.1, 4.7, 7.1, 10.7, 16.2, 24.5, 37.1],
    },
  ];

  if (!mounted) {
    return (
      <Card className={cn(
        "bg-purple-800/80 backdrop-blur-sm text-white",
        "border-2 border-purple-600"
      )}>
        <div className="p-6">
          <h2 className="text-3xl font-bold text-teal-400 mb-4">
            Investment Trends
          </h2>
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading chart...</div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "bg-purple-800/80 backdrop-blur-sm text-white",
      "border-2 border-purple-600"
    )}>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-teal-400 mb-4">
          Investment Trends
        </h2>
        <div className="h-96">
          <ReactApexChart 
            options={options} 
            series={series} 
            type="bar" 
            height="100%" 
          />
        </div>
        <p className={cn(
          "mt-6 text-gray-300",
          "border-t border-purple-600/50 pt-4"
        )}>
          Investments in quantum computing are projected to grow significantly, with total investments reaching{' '}
          <span className="text-teal-300 font-semibold">$64.8 billion</span> by 2030. 
          Private sector investments are expected to outpace public funding, indicating strong commercial interest in quantum technologies.
        </p>
      </div>
    </Card>
  );
};

export { InvestmentTrendsChart }
export default InvestmentTrendsChart;
