'use client'

import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

const GrowthTrajectoryChart: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options: ApexOptions = {
    chart: {
      background: 'transparent',
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
    colors: ['#14b8a6'],
    dataLabels: {
      enabled: false,
    },
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
        formatter: (value) => `$${value}B`,
      },
    },
    grid: {
      borderColor: '#52525b',
      strokeDashArray: 4,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    stroke: {
      curve: 'smooth' as const
    }
  };

  const series = [
    {
      name: 'Market Size',
      data: [0.9, 1.8, 3.6, 7.2, 14.4, 28.8, 57.6, 115.2],
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
            Market Growth Trajectory
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
          Market Growth Trajectory
        </h2>
        <div className="h-96">
          <ReactApexChart 
            options={options} 
            series={series} 
            type="area" 
            height="100%" 
          />
        </div>
      </div>
    </Card>
  );
};

export { GrowthTrajectoryChart }
export default GrowthTrajectoryChart;
