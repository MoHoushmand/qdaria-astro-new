import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface RevenueProjectionsChartProps {
  className?: string;
}

export const RevenueProjectionsChart: React.FC<RevenueProjectionsChartProps> = ({ className = '' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const series = [
    {
      name: 'Revenue',
      type: 'column',
      data: [2.5, 5.8, 12.4, 28.5, 62.3, 125.7, 245.8],
    },
    {
      name: 'Profit',
      type: 'column',
      data: [0.5, 1.2, 3.8, 10.2, 24.8, 56.3, 118.5],
    },
    {
      name: 'Growth Rate (%)',
      type: 'line',
      data: [0, 132, 114, 130, 119, 102, 95],
    },
  ];

  const options: ApexOptions = {
    chart: {
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
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    theme: {
      mode: 'dark',
    },
    colors: ['#04a3ff', '#00ffd3', '#65ff00'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [2],
      formatter: (val) => `${val}%`,
      style: {
        fontSize: '11px',
        fontWeight: 600,
        colors: ['#65ff00'],
      },
      background: {
        enabled: true,
        foreColor: '#000212',
        borderRadius: 4,
        padding: 4,
        opacity: 0.9,
        borderWidth: 1,
        borderColor: '#65ff00',
      },
    },
    stroke: {
      width: [0, 0, 3],
      curve: 'smooth',
    },
    xaxis: {
      categories: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      labels: {
        style: {
          colors: '#ffffff',
          fontSize: '12px',
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
      axisTicks: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
    },
    yaxis: [
      {
        title: {
          text: 'Revenue & Profit ($M)',
          style: {
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 500,
          },
        },
        labels: {
          formatter: (val) => `$${val.toFixed(1)}M`,
          style: {
            colors: '#ffffff',
            fontSize: '12px',
          },
        },
        axisBorder: {
          show: true,
          color: '#04a3ff',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Growth Rate (%)',
          style: {
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 500,
          },
        },
        labels: {
          formatter: (val) => `${val.toFixed(0)}%`,
          style: {
            colors: '#ffffff',
            fontSize: '12px',
          },
        },
        axisBorder: {
          show: true,
          color: '#65ff00',
        },
      },
    ],
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      offsetY: 10,
      labels: {
        colors: '#ffffff',
      },
      markers: {
        width: 12,
        height: 12,
        radius: 3,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
        formatter: (val, { seriesIndex }) => {
          if (seriesIndex === 2) return `${val}%`;
          return `$${val}M`;
        },
      },
      style: {
        fontSize: '13px',
      },
      marker: {
        show: true,
      },
    },
    fill: {
      type: ['gradient', 'gradient', 'solid'],
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#00ffd3', '#65ff00'],
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100],
      },
    },
  };

  if (!mounted) {
    return <div className={`w-full h-full min-h-[450px] ${className}`} />;
  }

  return (
    <div className={`w-full h-full min-h-[450px] ${className}`}>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="100%"
      />
    </div>
  );
};

export default RevenueProjectionsChart;
