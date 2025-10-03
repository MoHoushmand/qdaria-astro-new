import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { qdariaBrand } from '../styles/design-tokens';

export const FundingAllocationChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      backgroundColor: 'transparent',
      title: {
        text: '€12M Series A Funding Allocation',
        textStyle: {
          color: qdariaBrand.colors.primary,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: '#000212',
        borderColor: 'rgba(4, 163, 255, 0.3)',
        textStyle: { color: '#e5e7eb' },
        formatter: (params: any) => {
          return `<strong>${params.name}</strong><br/>€${params.value}M (${params.percent}%)`;
        }
      },
      series: {
        type: 'sunburst',
        data: [
          {
            name: 'R&D',
            value: 5.4,
            itemStyle: { color: qdariaBrand.colors.primary },
            children: [
              {
                name: 'Quantum Algorithm Development',
                value: 2.2,
                itemStyle: { color: '#0080ff' }
              },
              {
                name: 'Hardware Integration',
                value: 1.8,
                itemStyle: { color: '#0066cc' }
              },
              {
                name: 'AI/ML Research',
                value: 1.4,
                itemStyle: { color: '#004d99' }
              }
            ]
          },
          {
            name: 'Sales & Marketing',
            value: 3.0,
            itemStyle: { color: qdariaBrand.colors.cyan },
            children: [
              {
                name: 'Enterprise Sales Team',
                value: 1.5,
                itemStyle: { color: '#00ccaa' }
              },
              {
                name: 'Marketing & Events',
                value: 0.9,
                itemStyle: { color: '#00aa88' }
              },
              {
                name: 'Partnerships',
                value: 0.6,
                itemStyle: { color: '#008866' }
              }
            ]
          },
          {
            name: 'Operations',
            value: 2.1,
            itemStyle: { color: qdariaBrand.colors.green },
            children: [
              {
                name: 'Infrastructure & Cloud',
                value: 0.9,
                itemStyle: { color: '#55cc00' }
              },
              {
                name: 'Legal & Compliance',
                value: 0.6,
                itemStyle: { color: '#44aa00' }
              },
              {
                name: 'Office & Facilities',
                value: 0.6,
                itemStyle: { color: '#338800' }
              }
            ]
          },
          {
            name: 'Product Development',
            value: 1.5,
            itemStyle: { color: '#8b5cf6' },
            children: [
              {
                name: 'Zipminator Enhancement',
                value: 0.6,
                itemStyle: { color: '#7c3aed' }
              },
              {
                name: 'QDiana Launch',
                value: 0.5,
                itemStyle: { color: '#6d28d9' }
              },
              {
                name: 'New Products',
                value: 0.4,
                itemStyle: { color: '#5b21b6' }
              }
            ]
          }
        ],
        radius: [0, '90%'],
        label: {
          rotate: 'radial',
          color: '#e5e7eb'
        },
        emphasis: {
          focus: 'ancestor'
        },
        levels: [
          {},
          {
            r0: '0%',
            r: '40%',
            label: {
              rotate: 0,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          {
            r0: '40%',
            r: '75%',
            label: {
              rotate: 'tangential',
              fontSize: 11
            }
          }
        ]
      }
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <div className="business-plan-section p-8">
      <div ref={chartRef} style={{ width: '100%', height: '600px' }} />
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#04a3ff]">€5.4M</div>
          <div className="text-[#e5e7eb]/70">R&D (45%)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#00ffd3]">€3.0M</div>
          <div className="text-[#e5e7eb]/70">Sales & Marketing (25%)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#65ff00]">€2.1M</div>
          <div className="text-[#e5e7eb]/70">Operations (17.5%)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#8b5cf6]">€1.5M</div>
          <div className="text-[#e5e7eb]/70">Product Dev (12.5%)</div>
        </div>
      </div>
    </div>
  );
};
