import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface TechnologyArchitectureChartProps {
  className?: string;
}

export const TechnologyArchitectureChart: React.FC<TechnologyArchitectureChartProps> = ({
  className = '',
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstanceRef.current = echarts.init(chartRef.current, 'dark');

    const nodes = [
      // Core Platform
      { id: 'core', name: 'QDaria Core\nPlatform', symbolSize: 80, category: 0, x: 400, y: 250 },

      // Frontend Layer
      { id: 'web', name: 'Web Interface', symbolSize: 50, category: 1, x: 200, y: 100 },
      { id: 'mobile', name: 'Mobile Apps', symbolSize: 50, category: 1, x: 300, y: 80 },
      { id: 'api', name: 'REST API', symbolSize: 50, category: 1, x: 500, y: 80 },

      // AI/ML Layer
      { id: 'ml', name: 'ML Engine', symbolSize: 60, category: 2, x: 200, y: 250 },
      { id: 'quantum', name: 'Quantum\nProcessor', symbolSize: 65, category: 2, x: 150, y: 350 },
      { id: 'neural', name: 'Neural\nNetworks', symbolSize: 55, category: 2, x: 250, y: 370 },

      // Data Layer
      { id: 'db', name: 'Database', symbolSize: 55, category: 3, x: 600, y: 250 },
      { id: 'cache', name: 'Cache Layer', symbolSize: 45, category: 3, x: 650, y: 350 },
      { id: 'storage', name: 'Object Storage', symbolSize: 45, category: 3, x: 550, y: 370 },

      // Security & Infrastructure
      { id: 'auth', name: 'Auth Service', symbolSize: 50, category: 4, x: 400, y: 450 },
      { id: 'encrypt', name: 'Encryption', symbolSize: 45, category: 4, x: 300, y: 480 },
      { id: 'monitor', name: 'Monitoring', symbolSize: 45, category: 4, x: 500, y: 480 },

      // Integration Layer
      { id: 'webhook', name: 'Webhooks', symbolSize: 40, category: 5, x: 100, y: 180 },
      { id: 'plugins', name: 'Plugins', symbolSize: 40, category: 5, x: 700, y: 180 },
    ];

    const links = [
      // Frontend to Core
      { source: 'web', target: 'core' },
      { source: 'mobile', target: 'core' },
      { source: 'api', target: 'core' },

      // Core to AI/ML
      { source: 'core', target: 'ml' },
      { source: 'ml', target: 'quantum' },
      { source: 'ml', target: 'neural' },

      // Core to Data
      { source: 'core', target: 'db' },
      { source: 'core', target: 'cache' },
      { source: 'db', target: 'storage' },

      // Core to Security
      { source: 'core', target: 'auth' },
      { source: 'auth', target: 'encrypt' },
      { source: 'core', target: 'monitor' },

      // Integration
      { source: 'api', target: 'webhook' },
      { source: 'api', target: 'plugins' },

      // Cross connections
      { source: 'quantum', target: 'db' },
      { source: 'neural', target: 'cache' },
    ];

    const categories = [
      { name: 'Core Platform' },
      { name: 'Frontend' },
      { name: 'AI/ML' },
      { name: 'Data' },
      { name: 'Security' },
      { name: 'Integration' },
    ];

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(0, 2, 18, 0.95)',
        borderColor: '#04a3ff',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff',
          fontSize: 13,
        },
        formatter: (params: any) => {
          if (params.dataType === 'node') {
            return `<div style="font-weight: 600;">${params.data.name}</div>
                    <div style="margin-top: 4px; color: #00ffd3;">Category: ${categories[params.data.category].name}</div>`;
          }
          return '';
        },
      },
      legend: [
        {
          data: categories.map((cat) => cat.name),
          orient: 'horizontal',
          top: 20,
          left: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 12,
          },
          itemWidth: 20,
          itemHeight: 12,
        },
      ],
      series: [
        {
          type: 'graph',
          layout: 'none',
          data: nodes,
          links: links,
          categories: categories,
          roam: true,
          draggable: true,
          focusNodeAdjacency: true,
          label: {
            show: true,
            position: 'inside',
            fontSize: 11,
            fontWeight: 600,
            color: '#ffffff',
            formatter: '{b}',
          },
          labelLayout: {
            hideOverlap: true,
          },
          lineStyle: {
            color: 'source',
            curveness: 0.2,
            width: 2,
            opacity: 0.6,
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 4,
              opacity: 1,
            },
            itemStyle: {
              shadowBlur: 20,
              shadowColor: '#04a3ff',
            },
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: '#000212',
            shadowBlur: 10,
            shadowColor: 'rgba(4, 163, 255, 0.3)',
          },
          color: ['#04a3ff', '#00ffd3', '#65ff00', '#ff00ff', '#ffaa00', '#ff4444'],
        },
      ],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
    };

    chartInstanceRef.current.setOption(option);

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
      className={`w-full h-full min-h-[550px] ${className}`}
      style={{ minHeight: '550px' }}
    />
  );
};

export default TechnologyArchitectureChart;
