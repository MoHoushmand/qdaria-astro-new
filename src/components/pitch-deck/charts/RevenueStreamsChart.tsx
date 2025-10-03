import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface RevenueStreamsChartProps {
  className?: string;
}

export const RevenueStreamsChart: React.FC<RevenueStreamsChartProps> = ({ className = '' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const series = [
    {
      name: 'Enterprise Licenses',
      data: [
        { x: 'Q1 2024', y: 2800 },
        { x: 'Q2 2024', y: 3200 },
        { x: 'Q3 2024', y: 4100 },
        { x: 'Q4 2024', y: 5500 },
      ],
    },
    {
      name: 'Cloud Services',
      data: [
        { x: 'Q1 2024', y: 1800 },
        { x: 'Q2 2024', y: 2400 },
        { x: 'Q3 2024', y: 3300 },
        { x: 'Q4 2024', y: 4200 },
      ],
    },
    {
      name: 'API Access',
      data: [
        { x: 'Q1 2024', y: 950 },
        { x: 'Q2 2024', y: 1400 },
        { x: 'Q3 2024', y: 1900 },
        { x: 'Q4 2024', y: 2600 },
      ],
    },
    {
      name: 'Professional Services',
      data: [
        { x: 'Q1 2024', y: 650 },
        { x: 'Q2 2024', y: 850 },
        { x: 'Q3 2024', y: 1100 },
        { x: 'Q4 2024', y: 1500 },
      ],
    },
    {
      name: 'Training & Certification',
      data: [
        { x: 'Q1 2024', y: 320 },
        { x: 'Q2 2024', y: 480 },
        { x: 'Q3 2024', y: 680 },
        { x: 'Q4 2024', y: 950 },
      ],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'treemap',
      background: 'transparent',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    theme: {
      mode: 'dark',
    },
    colors: ['#04a3ff', '#00ffd3', '#65ff00', '#ff00ff', '#ffaa00'],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0, to: 1000, color: '#ffaa00' },
            { from: 1001, to: 2500, color: '#65ff00' },
            { from: 2501, to: 4000, color: '#00ffd3' },
            { from: 4001, to: 10000, color: '#04a3ff' },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 700,
        fontFamily: "'Inter', system-ui, sans-serif",
        colors: ['#ffffff'],
      },
      formatter: (text, op) => {
        const value = op.value as number;
        return [`${text}`, `$${(value / 1000).toFixed(1)}M`];
      },
      offsetY: -4,
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 500,
      fontFamily: "'Inter', system-ui, sans-serif",
      labels: {
        colors: 'rgba(229, 231, 235, 0.85)',
      },
      markers: {
        width: 16,
        height: 16,
        radius: 3,
      },
      itemMargin: {
        horizontal: 12,
        vertical: 8,
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val) => `$${(val / 1000).toFixed(2)}M`,
      },
      style: {
        fontSize: '16px',
        fontFamily: "'Inter', system-ui, sans-serif",
      },
    },
    title: {
      text: 'Revenue Distribution by Stream',
      align: 'center',
      style: {
        fontSize: '24px',
        fontWeight: 700,
        fontFamily: "'Inter', system-ui, sans-serif",
        color: '#e5e7eb',
      },
    },
  };

  if (!mounted) {
    return <div className={`w-full h-full min-h-[500px] ${className}`} />;
  }

  return (
    <div className={`w-full h-full min-h-[500px] ${className}`}>
      <ReactApexChart
        options={options}
        series={series}
        type="treemap"
        height="100%"
      />
    </div>
  );
};

export default RevenueStreamsChart;
