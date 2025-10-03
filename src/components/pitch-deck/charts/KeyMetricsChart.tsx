import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface KeyMetricsChartProps {
  className?: string;
}

export const KeyMetricsChart: React.FC<KeyMetricsChartProps> = ({ className = '' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Multiple radial gauges for key metrics
  const series = [85, 92, 78, 88, 94, 82];
  const labels = [
    'Customer Satisfaction',
    'Product Quality',
    'Market Position',
    'Team Performance',
    'Innovation Index',
    'Financial Health',
  ];

  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1200,
        animateGradually: {
          enabled: true,
          delay: 200,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 450,
        },
      },
    },
    theme: {
      mode: 'dark',
    },
    colors: ['#04a3ff', '#00ffd3', '#65ff00', '#ff00ff', '#ffaa00', '#ff4444'],
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
        },
        track: {
          show: true,
          background: 'rgba(255, 255, 255, 0.1)',
          strokeWidth: '97%',
          opacity: 1,
          margin: 5,
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: "'Inter', system-ui, sans-serif",
            color: 'rgba(229, 231, 235, 0.85)',
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: '20px',
            fontWeight: 700,
            fontFamily: "'Inter', system-ui, sans-serif",
            color: '#e5e7eb',
            offsetY: -5,
            formatter: (val) => `${val}`,
          },
          total: {
            show: true,
            label: 'Overall Score',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: "'Inter', system-ui, sans-serif",
            color: '#e5e7eb',
            formatter: function (w) {
              const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
              const avg = Math.round(total / w.globals.seriesTotals.length);
              return `${avg}%`;
            },
          },
        },
      },
    },
    labels: labels,
    legend: {
      show: true,
      floating: true,
      fontSize: '14px',
      fontFamily: "'Inter', system-ui, sans-serif",
      position: 'left',
      offsetX: 0,
      offsetY: 15,
      labels: {
        colors: 'rgba(229, 231, 235, 0.85)',
        useSeriesColors: false,
      },
      markers: {
        width: 14,
        height: 14,
        radius: 3,
      },
      formatter: function (seriesName, opts) {
        return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}%`;
      },
      itemMargin: {
        horizontal: 3,
        vertical: 8,
      },
    },
    stroke: {
      lineCap: 'round',
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '16px',
        fontFamily: "'Inter', system-ui, sans-serif",
      },
      y: {
        formatter: (val) => `${val}%`,
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
        type="radialBar"
        height="100%"
      />
    </div>
  );
};

export default KeyMetricsChart;
