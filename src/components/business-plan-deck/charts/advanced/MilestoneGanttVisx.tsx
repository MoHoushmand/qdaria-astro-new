/**
 * MilestoneGanttVisx - Gantt chart for project milestones using Visx
 *
 * Features:
 * - Timeline visualization with start/end dates
 * - Progress indicators for each milestone
 * - Dependencies between tasks
 * - Interactive tooltips with detailed information
 * - Responsive scaling
 * - Business plan theme styling
 */

import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleTime, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { Text } from '@visx/text';
import { motion } from 'framer-motion';

// Business plan brand colors
const COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  accent: '#00d4ff',
  success: '#00ff88',
  warning: '#ffd700',
  danger: '#ff4444',
  dark: '#1a1a1a',
  gray: '#666666',
  lightGray: '#cccccc',
};

export interface Milestone {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  category: string;
  dependencies?: string[]; // IDs of dependent milestones
  owner: string;
  budget?: number;
  description?: string;
}

interface MilestoneGanttVisxProps {
  data: Milestone[];
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
  showGrid?: boolean;
  showDependencies?: boolean;
  className?: string;
  onMilestoneClick?: (milestone: Milestone) => void;
}

const margin = { top: 60, right: 120, bottom: 80, left: 200 };

const getStatusColor = (status: Milestone['status']): string => {
  switch (status) {
    case 'completed':
      return COLORS.success;
    case 'in-progress':
      return COLORS.accent;
    case 'delayed':
      return COLORS.danger;
    case 'not-started':
      return COLORS.gray;
    default:
      return COLORS.gray;
  }
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    development: COLORS.accent,
    research: COLORS.primary,
    marketing: COLORS.secondary,
    operations: '#ff8c00',
    finance: '#9b59b6',
  };
  return colors[category.toLowerCase()] || COLORS.primary;
};

export const MilestoneGanttVisx: React.FC<MilestoneGanttVisxProps> = ({
  data,
  width = 1000,
  height = 600,
  theme = 'dark',
  showGrid = true,
  showDependencies = true,
  className = '',
  onMilestoneClick,
}) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<Milestone>();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const bgColor = isDark ? COLORS.dark : '#ffffff';

  // Calculate dimensions
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const timeScale = useMemo(() => {
    const allDates = data.flatMap(d => [d.startDate, d.endDate]);
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

    // Add padding
    const padding = (maxDate.getTime() - minDate.getTime()) * 0.05;

    return scaleTime({
      domain: [
        new Date(minDate.getTime() - padding),
        new Date(maxDate.getTime() + padding)
      ],
      range: [0, xMax],
    });
  }, [data, xMax]);

  const milestoneScale = useMemo(
    () =>
      scaleBand<string>({
        domain: data.map(d => d.name),
        range: [0, yMax],
        padding: 0.3,
      }),
    [data, yMax]
  );

  const barHeight = milestoneScale.bandwidth();

  // Find dependencies for rendering lines
  const dependencies = useMemo(() => {
    if (!showDependencies) return [];

    const deps: Array<{ from: Milestone; to: Milestone }> = [];
    data.forEach(milestone => {
      milestone.dependencies?.forEach(depId => {
        const depMilestone = data.find(m => m.id === depId);
        if (depMilestone) {
          deps.push({ from: depMilestone, to: milestone });
        }
      });
    });
    return deps;
  }, [data, showDependencies]);

  // Calculate milestone positions
  const getMilestonePosition = (milestone: Milestone) => {
    const y = milestoneScale(milestone.name)!;
    const x1 = timeScale(milestone.startDate);
    const x2 = timeScale(milestone.endDate);
    return { x: x1, y, width: x2 - x1, height: barHeight };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <div style={{ position: 'relative', background: bgColor, borderRadius: '8px', padding: '20px' }}>
        <svg width={width} height={height}>
          {/* Gradients */}
          <LinearGradient id="progress-gradient" from={COLORS.primary} to={COLORS.accent} />

          <Group left={margin.left} top={margin.top}>
            {/* Grid */}
            {showGrid && (
              <>
                <GridRows
                  scale={milestoneScale}
                  width={xMax}
                  stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                />
                <GridColumns
                  scale={timeScale}
                  height={yMax}
                  stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                  numTicks={6}
                />
              </>
            )}

            {/* Dependencies */}
            {showDependencies && dependencies.map((dep, i) => {
              const fromPos = getMilestonePosition(dep.from);
              const toPos = getMilestonePosition(dep.to);

              const x1 = fromPos.x + fromPos.width;
              const y1 = fromPos.y + fromPos.height / 2;
              const x2 = toPos.x;
              const y2 = toPos.y + toPos.height / 2;

              return (
                <g key={`dep-${i}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={COLORS.gray}
                    strokeWidth={1}
                    strokeDasharray="4,4"
                    opacity={0.4}
                  />
                  {/* Arrow head */}
                  <polygon
                    points={`${x2},${y2} ${x2-8},${y2-4} ${x2-8},${y2+4}`}
                    fill={COLORS.gray}
                    opacity={0.4}
                  />
                </g>
              );
            })}

            {/* Milestone bars */}
            {data.map((milestone, i) => {
              const pos = getMilestonePosition(milestone);
              const categoryColor = getCategoryColor(milestone.category);
              const statusColor = getStatusColor(milestone.status);

              return (
                <Group key={`milestone-${i}`}>
                  {/* Background bar */}
                  <Bar
                    x={pos.x}
                    y={pos.y}
                    width={pos.width}
                    height={pos.height}
                    fill={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                    rx={4}
                  />

                  {/* Progress bar */}
                  <motion.rect
                    initial={{ width: 0 }}
                    animate={{ width: pos.width * (milestone.progress / 100) }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    x={pos.x}
                    y={pos.y}
                    height={pos.height}
                    fill={categoryColor}
                    opacity={0.8}
                    rx={4}
                  />

                  {/* Border */}
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={pos.width}
                    height={pos.height}
                    fill="none"
                    stroke={statusColor}
                    strokeWidth={2}
                    rx={4}
                  />

                  {/* Status indicator */}
                  <circle
                    cx={pos.x + pos.width + 10}
                    cy={pos.y + pos.height / 2}
                    r={6}
                    fill={statusColor}
                    stroke="#fff"
                    strokeWidth={2}
                  />

                  {/* Progress percentage */}
                  {pos.width > 60 && (
                    <Text
                      x={pos.x + pos.width / 2}
                      y={pos.y + pos.height / 2}
                      fontSize={12}
                      fill="#fff"
                      textAnchor="middle"
                      verticalAnchor="middle"
                      fontWeight="bold"
                    >
                      {`${milestone.progress}%`}
                    </Text>
                  )}

                  {/* Interactive overlay */}
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={pos.width}
                    height={pos.height}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseMove={(event) => {
                      const point = localPoint(event);
                      if (point) {
                        showTooltip({
                          tooltipData: milestone,
                          tooltipLeft: point.x,
                          tooltipTop: point.y,
                        });
                      }
                    }}
                    onMouseLeave={hideTooltip}
                    onClick={() => onMilestoneClick?.(milestone)}
                  />
                </Group>
              );
            })}

            {/* Axes */}
            <AxisBottom
              top={yMax}
              scale={timeScale}
              stroke={textColor}
              tickStroke={textColor}
              numTicks={6}
              tickLabelProps={() => ({
                fill: textColor,
                fontSize: 11,
                textAnchor: 'middle',
              })}
              tickFormat={(date) => {
                const d = date as Date;
                return `${d.getMonth() + 1}/${d.getDate()}` as string;
              }}
            />

            <AxisLeft
              scale={milestoneScale}
              stroke={textColor}
              tickStroke={textColor}
              tickLabelProps={() => ({
                fill: textColor,
                fontSize: 12,
                textAnchor: 'end',
                dx: '-0.5em',
                dy: '0.25em',
              })}
            />
          </Group>

          {/* Legend */}
          <Group left={width - margin.right + 30} top={margin.top}>
            <Text fontSize={14} fontWeight="bold" fill={textColor}>
              Status
            </Text>
            {[
              { label: 'Completed', color: COLORS.success },
              { label: 'In Progress', color: COLORS.accent },
              { label: 'Delayed', color: COLORS.danger },
              { label: 'Not Started', color: COLORS.gray },
            ].map((item, i) => (
              <Group key={i} top={25 + i * 25}>
                <circle cx={0} cy={0} r={6} fill={item.color} />
                <Text x={15} y={0} fontSize={11} fill={textColor} verticalAnchor="middle">
                  {item.label}
                </Text>
              </Group>
            ))}
          </Group>

          {/* Title */}
          <Text
            x={width / 2}
            y={25}
            fontSize={20}
            fontWeight="bold"
            fill={textColor}
            textAnchor="middle"
          >
            Project Milestones Timeline
          </Text>
        </svg>

        {/* Tooltip */}
        {tooltipOpen && tooltipData && (
          <TooltipWithBounds
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              color: textColor,
              border: `2px solid ${getStatusColor(tooltipData.status)}`,
              borderRadius: '8px',
              padding: '12px 16px',
              minWidth: '250px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ fontSize: '16px', color: getCategoryColor(tooltipData.category) }}>
                {tooltipData.name}
              </strong>
            </div>
            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
              <strong>Status:</strong>{' '}
              <span style={{ color: getStatusColor(tooltipData.status) }}>
                {tooltipData.status}
              </span>
            </div>
            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
              <strong>Progress:</strong> {tooltipData.progress}%
            </div>
            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
              <strong>Timeline:</strong>{' '}
              {tooltipData.startDate.toLocaleDateString()} - {tooltipData.endDate.toLocaleDateString()}
            </div>
            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
              <strong>Owner:</strong> {tooltipData.owner}
            </div>
            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
              <strong>Category:</strong> {tooltipData.category}
            </div>
            {tooltipData.budget && (
              <div style={{ fontSize: '13px', marginBottom: '4px' }}>
                <strong>Budget:</strong> ${tooltipData.budget.toLocaleString()}
              </div>
            )}
            {tooltipData.description && (
              <div style={{ fontSize: '12px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                {tooltipData.description}
              </div>
            )}
          </TooltipWithBounds>
        )}
      </div>
    </motion.div>
  );
};

export default MilestoneGanttVisx;
