import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { scaleLinear, scaleBand } from '@visx/scale';
import { HeatmapRect } from '@visx/heatmap';
import { ParentSize } from '@visx/responsive';
import { Tooltip, useTooltip, defaultStyles } from '@visx/tooltip';

interface CompetitiveMatrixChartProps {
  className?: string;
}

interface HeatmapData {
  bin: number;
  bins: Array<{
    bin: number;
    count: number;
    feature: string;
    company: string;
  }>;
}

const features = [
  'Quantum Computing',
  'AI/ML Integration',
  'Scalability',
  'Security',
  'API Quality',
  'Documentation',
  'Customer Support',
  'Pricing Model',
];

const companies = ['QDaria', 'IBM Quantum', 'Google Quantum', 'AWS Braket', 'Azure Quantum'];

// Scores (0-100)
const matrixData: number[][] = [
  [95, 96, 92, 98, 90, 88, 92, 85], // QDaria
  [88, 75, 85, 82, 88, 90, 85, 70], // IBM
  [92, 80, 82, 85, 85, 82, 80, 75], // Google
  [78, 72, 88, 90, 80, 78, 82, 80], // AWS
  [82, 78, 80, 88, 82, 85, 88, 78], // Azure
];

const getColor = (value: number): string => {
  if (value >= 90) return '#04a3ff';
  if (value >= 80) return '#00ffd3';
  if (value >= 70) return '#65ff00';
  if (value >= 60) return '#ffaa00';
  return '#ff4444';
};

const tooltipStyles: React.CSSProperties = {
  ...defaultStyles,
  background: 'rgba(0, 2, 18, 0.95)',
  border: '1px solid #04a3ff',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: 500,
  padding: '12px 16px',
  boxShadow: '0 8px 32px rgba(4, 163, 255, 0.3)',
  backdropFilter: 'blur(10px)',
};

const ChartContent: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<{ company: string; feature: string; value: number }>();

  const heatmapData: HeatmapData[] = useMemo(() => {
    return matrixData.map((row, companyIndex) => ({
      bin: companyIndex,
      bins: row.map((value, featureIndex) => ({
        bin: featureIndex,
        count: value,
        feature: features[featureIndex],
        company: companies[companyIndex],
      })),
    }));
  }, []);

  const margin = { top: 60, right: 40, bottom: 120, left: 150 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleBand<number>({
    domain: features.map((_, i) => i),
    range: [0, innerWidth],
    padding: 0.1,
  });

  const yScale = scaleBand<number>({
    domain: companies.map((_, i) => i),
    range: [0, innerHeight],
    padding: 0.1,
  });

  const opacityScale = scaleLinear<number>({
    domain: [0, 100],
    range: [0.3, 1],
  });

  const binWidth = xScale.bandwidth();
  const binHeight = yScale.bandwidth();

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <HeatmapRect
            data={heatmapData}
            xScale={(d) => xScale(d) ?? 0}
            yScale={(d) => yScale(d) ?? 0}
            colorScale={(value) => getColor(value)}
            opacityScale={opacityScale}
            binWidth={binWidth}
            binHeight={binHeight}
            gap={2}
          >
            {(heatmap) =>
              heatmap.map((bins) =>
                bins.map((bin) => (
                  <rect
                    key={`heatmap-rect-${bin.row}-${bin.column}`}
                    x={bin.x}
                    y={bin.y}
                    width={bin.width}
                    height={bin.height}
                    fill={bin.color}
                    fillOpacity={bin.opacity}
                    rx={4}
                    onMouseMove={(event) => {
                      const coords = { x: event.clientX, y: event.clientY };
                      showTooltip({
                        tooltipLeft: coords.x,
                        tooltipTop: coords.y,
                        tooltipData: {
                          company: bin.bin.company,
                          feature: bin.bin.feature,
                          value: bin.bin.count,
                        },
                      });
                    }}
                    onMouseLeave={hideTooltip}
                    style={{ cursor: 'pointer' }}
                  />
                ))
              )
            }
          </HeatmapRect>

          {/* Y-axis labels (Companies) */}
          {companies.map((company, i) => (
            <text
              key={`company-${i}`}
              x={-10}
              y={(yScale(i) ?? 0) + binHeight / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize={13}
              fontWeight={500}
            >
              {company}
            </text>
          ))}

          {/* X-axis labels (Features) */}
          {features.map((feature, i) => (
            <text
              key={`feature-${i}`}
              x={(xScale(i) ?? 0) + binWidth / 2}
              y={innerHeight + 20}
              textAnchor="start"
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize={12}
              fontWeight={500}
              transform={`rotate(45, ${(xScale(i) ?? 0) + binWidth / 2}, ${innerHeight + 20})`}
            >
              {feature}
            </text>
          ))}
        </Group>

        {/* Legend */}
        <Group left={margin.left} top={height - 40}>
          <text x={0} y={0} fill="#ffffff" fontSize={12} fontWeight={500}>
            Score:
          </text>
          {[
            { color: '#ff4444', label: '0-59' },
            { color: '#ffaa00', label: '60-69' },
            { color: '#65ff00', label: '70-79' },
            { color: '#00ffd3', label: '80-89' },
            { color: '#04a3ff', label: '90-100' },
          ].map((item, i) => (
            <Group key={i} left={60 + i * 80}>
              <rect width={20} height={20} fill={item.color} rx={4} />
              <text x={25} y={15} fill="#ffffff" fontSize={11} fontWeight={500}>
                {item.label}
              </text>
            </Group>
          ))}
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>{tooltipData.company}</div>
          <div style={{ marginBottom: '2px' }}>{tooltipData.feature}</div>
          <div style={{ fontWeight: 700, color: getColor(tooltipData.value) }}>
            Score: {tooltipData.value}/100
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export const CompetitiveMatrixChart: React.FC<CompetitiveMatrixChartProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-full min-h-[600px] ${className}`}>
      <ParentSize>
        {({ width, height }) => <ChartContent width={width} height={Math.max(height, 600)} />}
      </ParentSize>
    </div>
  );
};

export default CompetitiveMatrixChart;
