import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface MarketSizeChartProps {
  className?: string;
}

export const MarketSizeChart: React.FC<MarketSizeChartProps> = ({ className = '' }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    chartInstanceRef.current = echarts.init(chartRef.current, 'dark');

    // Market size data (in billions USD)
    const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];
    const totalMarket = [125, 180, 265, 380, 540, 750, 1000];
    const tamData = [100, 150, 220, 320, 460, 650, 850];
    const samData = [60, 90, 135, 200, 290, 410, 550];
    const somData = [25, 40, 65, 100, 150, 220, 310];

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 2, 18, 0.95)',
        borderColor: '#04a3ff',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff',
          fontSize: 14,
        },
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#04a3ff',
          },
        },
        formatter: (params: any) => {
          let tooltip = `<div style="font-weight: 600; margin-bottom: 8px;">${params[0].axisValue}</div>`;
          params.forEach((param: any) => {
            tooltip += `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span>${param.marker} ${param.seriesName}</span>
                <span style="font-weight: 600; margin-left: 20px;">$${param.value}B</span>
              </div>
            `;
          });
          return tooltip;
        },
      },
      legend: {
        data: ['Total Market', 'TAM', 'SAM', 'SOM'],
        top: '5%',
        textStyle: {
          color: '#ffffff',
          fontSize: 13,
        },
        itemWidth: 25,
        itemHeight: 14,
      },
      xAxis: {
        type: 'category',
        data: years,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: 12,
          fontWeight: 500,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Market Size ($B)',
        nameTextStyle: {
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 500,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: 12,
          formatter: '${value}B',
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)',
            type: 'dashed',
          },
        },
      },
      series: [
        {
          name: 'Total Market',
          type: 'line',
          data: totalMarket,
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#04a3ff',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(4, 163, 255, 0.4)' },
              { offset: 1, color: 'rgba(4, 163, 255, 0.05)' },
            ]),
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 4,
            },
          },
        },
        {
          name: 'TAM',
          type: 'line',
          data: tamData,
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#00ffd3',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 255, 211, 0.35)' },
              { offset: 1, color: 'rgba(0, 255, 211, 0.05)' },
            ]),
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 4,
            },
          },
        },
        {
          name: 'SAM',
          type: 'line',
          data: samData,
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#65ff00',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(101, 255, 0, 0.3)' },
              { offset: 1, color: 'rgba(101, 255, 0, 0.05)' },
            ]),
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 4,
            },
          },
        },
        {
          name: 'SOM',
          type: 'line',
          data: somData,
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#ff00ff',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(255, 0, 255, 0.25)' },
              { offset: 1, color: 'rgba(255, 0, 255, 0.05)' },
            ]),
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 4,
            },
          },
        },
      ],
      animationDuration: 2000,
      animationEasing: 'cubicOut',
    };

    chartInstanceRef.current.setOption(option);

    // Handle resize
    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstanceRef.current?.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className={`w-full h-full min-h-[400px] ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
};

export default MarketSizeChart;
