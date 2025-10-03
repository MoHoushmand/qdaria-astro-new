import React, { useMemo, useCallback, useState } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleTime, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { Zoom } from '@visx/zoom';
import { RectClipPath } from '@visx/clip-path';

// Milestone data
const milestones = [
  {
    id: 'm1',
    product: 'Zipminator',
    start: '2025-Q1',
    end: '2028-Q3',
    milestones: [
      { date: '2025-Q3', label: 'Beta Release', type: 'development' as const },
      { date: '2026-Q4', label: 'v1.0 Launch', type: 'launch' as const },
      { date: '2027-Q2', label: 'Enterprise Adoption', type: 'growth' as const },
      { date: '2028-Q3', label: 'IPO', type: 'exit' as const }
    ],
    color: '#04a3ff'
  },
  {
    id: 'm2',
    product: 'Qm9',
    start: '2025-Q2',
    end: '2029-Q2',
    milestones: [
      { date: '2026-Q1', label: 'Alpha Launch', type: 'development' as const },
      { date: '2027-Q1', label: 'v1.0 Release', type: 'launch' as const },
      { date: '2028-Q2', label: 'Series B', type: 'funding' as const },
      { date: '2029-Q2', label: 'IPO', type: 'exit' as const }
    ],
    color: '#00ffd3'
  },
  {
    id: 'm3',
    product: 'QDiana',
    start: '2025-Q1',
    end: '2029-Q4',
    milestones: [
      { date: '2026-Q2', label: 'Pilot Program', type: 'development' as const },
      { date: '2027-Q2', label: 'Commercial Launch', type: 'launch' as const },
      { date: '2028-Q4', label: 'Enterprise Scale', type: 'growth' as const },
      { date: '2029-Q4', label: 'IPO', type: 'exit' as const }
    ],
    color: '#65ff00'
  },
  {
    id: 'm4',
    product: 'QMikeAI',
    start: '2025-Q3',
    end: '2030-Q1',
    milestones: [
      { date: '2026-Q4', label: 'Alpha Integration', type: 'development' as const },
      { date: '2027-Q4', label: 'Full Deployment', type: 'launch' as const },
      { date: '2029-Q2', label: 'Developer Adoption', type: 'growth' as const },
      { date: '2030-Q1', label: 'IPO', type: 'exit' as const }
    ],
    color: '#9b59b6'
  }
];

// Milestone type configurations
const milestoneIcons = {
  development: '◆',
  launch: '★',
  funding: '●',
  growth: '▲',
  exit: '■'
} as const;

const milestoneColors = {
  development: '#ff9800',
  launch: '#4caf50',
  funding: '#2196f3',
  growth: '#9c27b0',
  exit: '#f44336'
} as const;

// Parse quarter string to Date
function parseQuarter(quarter: string): Date {
  const [year, q] = quarter.split('-Q');
  const month = (parseInt(q) - 1) * 3;
  return new Date(parseInt(year), month, 1);
}

// Format date for display
function formatQuarter(date: Date): string {
  const year = date.getFullYear();
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `Q${quarter} ${year}`;
}

interface MilestoneGanttChartClientProps {
  width?: number;
  height?: number;
}

const MilestoneGanttChartClient: React.FC<MilestoneGanttChartClientProps> = ({
  width = 1200,
  height = 600
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip
  } = useTooltip<{
    product?: string;
    milestone?: { date: string; label: string; type: keyof typeof milestoneIcons };
    start?: string;
    end?: string;
    color?: string;
  }>();

  // Chart dimensions
  const margin = { top: 60, right: 40, bottom: 80, left: 120 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Process data
  const { timelineData, allDates, productNames } = useMemo(() => {
    const timelineData = milestones.map(m => ({
      ...m,
      startDate: parseQuarter(m.start),
      endDate: parseQuarter(m.end),
      parsedMilestones: m.milestones.map(ms => ({
        ...ms,
        date: parseQuarter(ms.date)
      }))
    }));

    const allDates = timelineData.flatMap(m => [
      m.startDate,
      m.endDate,
      ...m.parsedMilestones.map(ms => ms.date)
    ]);

    const productNames = milestones.map(m => m.product);

    return { timelineData, allDates, productNames };
  }, []);

  // Scales
  const xScale = useMemo(
    () =>
      scaleTime({
        domain: [Math.min(...allDates.map(d => d.getTime())), Math.max(...allDates.map(d => d.getTime()))],
        range: [0, innerWidth]
      }),
    [innerWidth, allDates]
  );

  const yScale = useMemo(
    () =>
      scaleBand({
        domain: productNames,
        range: [0, innerHeight],
        padding: 0.3
      }),
    [innerHeight, productNames]
  );

  // Event handlers
  const handleBarMouseMove = useCallback(
    (event: React.MouseEvent, product: typeof milestones[0]) => {
      const coords = localPoint(event.currentTarget as SVGElement, event);
      showTooltip({
        tooltipLeft: coords?.x ?? 0,
        tooltipTop: coords?.y ?? 0,
        tooltipData: {
          product: product.product,
          start: product.start,
          end: product.end,
          color: product.color
        }
      });
    },
    [showTooltip]
  );

  const handleMilestoneMouseMove = useCallback(
    (event: React.MouseEvent, product: string, milestone: typeof milestones[0]['milestones'][0], color: string) => {
      const coords = localPoint(event.currentTarget as SVGElement, event);
      showTooltip({
        tooltipLeft: coords?.x ?? 0,
        tooltipTop: coords?.y ?? 0,
        tooltipData: {
          product,
          milestone,
          color
        }
      });
    },
    [showTooltip]
  );

  const handleProductClick = useCallback((product: string) => {
    setSelectedProduct(prev => prev === product ? null : product);
  }, []);

  const barHeight = yScale.bandwidth();

  return (
    <div style={{ position: 'relative' }}>
      {/* Title */}
      <div style={{
        textAlign: 'center',
        marginBottom: '1rem',
        color: '#fff'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          background: 'linear-gradient(90deg, #04a3ff, #00ffd3, #65ff00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Product Roadmap & Milestones
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#a0a0a0' }}>
          Timeline: 2025-2030 | Interactive Gantt Chart
        </p>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        {Object.entries(milestoneIcons).map(([type, icon]) => (
          <div key={type} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#fff',
            fontSize: '0.875rem'
          }}>
            <span style={{
              color: milestoneColors[type as keyof typeof milestoneColors],
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}>
              {icon}
            </span>
            <span style={{ textTransform: 'capitalize' }}>{type}</span>
          </div>
        ))}
      </div>

      <Zoom
        width={innerWidth}
        height={innerHeight}
        scaleXMin={1}
        scaleXMax={4}
        scaleYMin={1}
        scaleYMax={1}
      >
        {(zoom) => (
          <svg width={width} height={height}>
            <RectClipPath id="zoom-clip" width={innerWidth} height={innerHeight} />

            <rect width={width} height={height} fill="#0a0a0a" rx={8} />

            <Group left={margin.left} top={margin.top}>
              {/* Background grid */}
              <Group>
                {xScale.ticks(10).map((tick, i) => (
                  <line
                    key={i}
                    x1={xScale(tick)}
                    x2={xScale(tick)}
                    y1={0}
                    y2={innerHeight}
                    stroke="#222"
                    strokeWidth={1}
                    strokeDasharray="2,2"
                  />
                ))}
              </Group>

              {/* Timeline bars */}
              <Group clipPath="url(#zoom-clip)">
                <rect
                  width={innerWidth}
                  height={innerHeight}
                  fill="transparent"
                  onTouchStart={zoom.dragStart}
                  onTouchMove={zoom.dragMove}
                  onTouchEnd={zoom.dragEnd}
                  onMouseDown={zoom.dragStart}
                  onMouseMove={zoom.dragMove}
                  onMouseUp={zoom.dragEnd}
                  onMouseLeave={() => {
                    if (zoom.isDragging) zoom.dragEnd();
                  }}
                />

                {timelineData.map((product) => {
                  const y = yScale(product.product) ?? 0;
                  const isSelected = selectedProduct === product.product;
                  const opacity = selectedProduct === null || isSelected ? 1 : 0.3;

                  return (
                    <Group key={product.id} opacity={opacity}>
                      {/* Timeline bar */}
                      <Bar
                        x={xScale(product.startDate)}
                        y={y}
                        width={xScale(product.endDate) - xScale(product.startDate)}
                        height={barHeight}
                        fill={product.color}
                        fillOpacity={0.6}
                        stroke={product.color}
                        strokeWidth={2}
                        rx={4}
                        className="timeline-bar"
                        onClick={() => handleProductClick(product.product)}
                        onMouseMove={(event) => handleBarMouseMove(event, product)}
                        onMouseLeave={hideTooltip}
                      />

                      {/* Product label */}
                      <text
                        x={xScale(product.startDate) + 10}
                        y={y + barHeight / 2}
                        dy=".33em"
                        fill="#fff"
                        fontSize={14}
                        fontWeight="bold"
                        style={{ pointerEvents: 'none' }}
                      >
                        {product.product}
                      </text>

                      {/* Milestones */}
                      {product.parsedMilestones.map((milestone, idx) => {
                        const milestoneX = xScale(milestone.date);
                        const milestoneY = y + barHeight / 2;
                        const icon = milestoneIcons[milestone.type];
                        const color = milestoneColors[milestone.type];

                        return (
                          <g
                            key={idx}
                            className="milestone-marker"
                            onMouseMove={(event) =>
                              handleMilestoneMouseMove(event, product.product, milestone, color)
                            }
                            onMouseLeave={hideTooltip}
                          >
                            {/* Milestone line */}
                            <line
                              x1={milestoneX}
                              x2={milestoneX}
                              y1={y}
                              y2={y + barHeight}
                              stroke={color}
                              strokeWidth={2}
                              strokeDasharray="4,2"
                            />

                            {/* Milestone icon */}
                            <text
                              x={milestoneX}
                              y={milestoneY}
                              dy=".33em"
                              textAnchor="middle"
                              fill={color}
                              fontSize={18}
                              fontWeight="bold"
                              style={{ cursor: 'pointer' }}
                            >
                              {icon}
                            </text>
                          </g>
                        );
                      })}
                    </Group>
                  );
                })}
              </Group>

              {/* Axes */}
              <AxisBottom
                top={innerHeight}
                scale={xScale}
                numTicks={10}
                tickFormat={(date) => formatQuarter(date as Date)}
                stroke="#333"
                tickStroke="#666"
                tickLabelProps={() => ({
                  fill: '#a0a0a0',
                  fontSize: 11,
                  textAnchor: 'middle'
                })}
              />

              <AxisLeft
                scale={yScale}
                stroke="#333"
                tickStroke="#666"
                tickLabelProps={() => ({
                  fill: '#a0a0a0',
                  fontSize: 12,
                  textAnchor: 'end',
                  dx: -4
                })}
              />
            </Group>

            {/* Zoom controls hint */}
            <text
              x={width - margin.right - 10}
              y={margin.top - 20}
              textAnchor="end"
              fill="#666"
              fontSize={10}
            >
              Click + drag to pan | Scroll to zoom
            </text>
          </svg>
        )}
      </Zoom>

      {/* Tooltip */}
      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            background: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid #333',
            color: '#fff',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        >
          {tooltipData.milestone ? (
            <div>
              <div style={{
                fontWeight: 'bold',
                marginBottom: '4px',
                color: tooltipData.color
              }}>
                {tooltipData.product}
              </div>
              <div style={{ marginBottom: '4px' }}>
                <span style={{
                  color: milestoneColors[tooltipData.milestone.type],
                  marginRight: '6px'
                }}>
                  {milestoneIcons[tooltipData.milestone.type]}
                </span>
                {tooltipData.milestone.label}
              </div>
              <div style={{ fontSize: '12px', color: '#a0a0a0' }}>
                {tooltipData.milestone.date}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#666',
                marginTop: '4px',
                textTransform: 'capitalize'
              }}>
                Type: {tooltipData.milestone.type}
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                fontWeight: 'bold',
                marginBottom: '4px',
                color: tooltipData.color
              }}>
                {tooltipData.product}
              </div>
              <div style={{ fontSize: '12px', color: '#a0a0a0' }}>
                Timeline: {tooltipData.start} → {tooltipData.end}
              </div>
            </div>
          )}
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default MilestoneGanttChartClient;
