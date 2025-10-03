/**
 * TimelineD3Chart - Interactive timeline visualization for strategic roadmap
 *
 * Features:
 * - Horizontal timeline with milestones
 * - Phase grouping with color coding
 * - Interactive hover with details
 * - Smooth animations and transitions
 * - Dependencies between milestones
 * - Responsive SVG with viewBox
 *
 * @example
 * <TimelineD3Chart
 *   milestones={strategicMilestones}
 *   width={1200}
 *   height={600}
 * />
 */

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

// QDaria brand colors
const QDARIA_COLORS = {
  primary: '#CCFF00',
  secondary: '#9AFF00',
  tertiary: '#66FF00',
  accent: '#00d4ff',
  dark: '#1a1a1a',
  gray: '#666666',
  success: '#00ff88',
  warning: '#ffaa00',
};

interface Milestone {
  id: string;
  title: string;
  date: Date | string;
  phase: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  dependencies?: string[];
  deliverables?: string[];
  budget?: number;
  team?: string[];
}

interface TimelinePhase {
  name: string;
  color: string;
  startDate: Date;
  endDate: Date;
}

interface TimelineD3ChartProps {
  milestones: Milestone[];
  phases?: TimelinePhase[];
  width?: number;
  height?: number;
  className?: string;
  onMilestoneClick?: (milestone: Milestone) => void;
  showDependencies?: boolean;
  animationDuration?: number;
}

/**
 * TimelineD3Chart Component
 */
export const TimelineD3Chart: React.FC<TimelineD3ChartProps> = ({
  milestones,
  phases,
  width = 1200,
  height = 600,
  className = '',
  onMilestoneClick,
  showDependencies = true,
  animationDuration = 1000,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    if (!svgRef.current || !milestones.length) return;

    // Clear previous render
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Parse dates
    const parsedMilestones = milestones.map(m => ({
      ...m,
      date: typeof m.date === 'string' ? new Date(m.date) : m.date,
    }));

    // Setup dimensions
    const margin = { top: 80, right: 60, bottom: 80, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const dates = parsedMilestones.map(m => m.date as Date);
    const xScale = d3.scaleTime()
      .domain([d3.min(dates)!, d3.max(dates)!])
      .range([0, innerWidth]);

    // Group milestones by phase
    const phaseGroups = d3.group(parsedMilestones, d => d.phase);
    const phaseNames = Array.from(phaseGroups.keys());
    const yScale = d3.scaleBand()
      .domain(phaseNames)
      .range([0, innerHeight])
      .padding(0.3);

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add phase backgrounds
    if (phases && phases.length > 0) {
      g.selectAll('.phase-bg')
        .data(phases)
        .join('rect')
        .attr('class', 'phase-bg')
        .attr('x', d => xScale(d.startDate))
        .attr('y', 0)
        .attr('width', d => xScale(d.endDate) - xScale(d.startDate))
        .attr('height', innerHeight)
        .attr('fill', d => d.color)
        .attr('opacity', 0)
        .transition()
        .duration(animationDuration / 2)
        .attr('opacity', 0.1);
    }

    // Add timeline axis
    const timelineY = innerHeight / 2;
    g.append('line')
      .attr('class', 'timeline-axis')
      .attr('x1', 0)
      .attr('y1', timelineY)
      .attr('x2', 0)
      .attr('y2', timelineY)
      .attr('stroke', QDARIA_COLORS.primary)
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round')
      .transition()
      .duration(animationDuration)
      .attr('x2', innerWidth);

    // Add dependencies if enabled
    if (showDependencies) {
      const dependencyLinks: { source: Milestone; target: Milestone }[] = [];
      parsedMilestones.forEach(milestone => {
        if (milestone.dependencies) {
          milestone.dependencies.forEach(depId => {
            const dep = parsedMilestones.find(m => m.id === depId);
            if (dep) {
              dependencyLinks.push({ source: dep, target: milestone });
            }
          });
        }
      });

      const linkGroup = g.append('g').attr('class', 'dependencies');

      linkGroup.selectAll('.dependency-line')
        .data(dependencyLinks)
        .join('path')
        .attr('class', 'dependency-line')
        .attr('d', d => {
          const x1 = xScale(d.source.date as Date);
          const x2 = xScale(d.target.date as Date);
          const y1 = (yScale(d.source.phase) || 0) + (yScale.bandwidth() / 2);
          const y2 = (yScale(d.target.phase) || 0) + (yScale.bandwidth() / 2);
          const midX = (x1 + x2) / 2;
          return `M ${x1} ${y1} Q ${midX} ${y1}, ${midX} ${(y1 + y2) / 2} Q ${midX} ${y2}, ${x2} ${y2}`;
        })
        .attr('fill', 'none')
        .attr('stroke', QDARIA_COLORS.gray)
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0)
        .transition()
        .delay(animationDuration / 2)
        .duration(animationDuration / 2)
        .attr('opacity', 0.4);
    }

    // Add milestones
    const milestoneGroups = g.selectAll('.milestone')
      .data(parsedMilestones)
      .join('g')
      .attr('class', 'milestone')
      .attr('transform', d => {
        const x = xScale(d.date as Date);
        const y = (yScale(d.phase) || 0) + (yScale.bandwidth() / 2);
        return `translate(${x},${y})`;
      })
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        // Highlight milestone
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', 16)
          .attr('stroke-width', 4);

        // Show tooltip
        if (tooltipRef.current) {
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style('opacity', 1)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 10}px`)
            .html(`
              <div class="font-bold text-[${QDARIA_COLORS.primary}] mb-2">${d.title}</div>
              <div class="text-sm text-gray-300 mb-2">${d.description}</div>
              <div class="text-xs text-gray-400 mb-1">
                Date: ${(d.date as Date).toLocaleDateString()}
              </div>
              <div class="text-xs text-gray-400 mb-1">
                Phase: ${d.phase}
              </div>
              <div class="text-xs text-gray-400">
                Status: <span class="capitalize">${d.status.replace('-', ' ')}</span>
              </div>
              ${d.deliverables ? `
                <div class="text-xs text-gray-400 mt-2">
                  <strong>Deliverables:</strong>
                  <ul class="list-disc list-inside">
                    ${d.deliverables.map(del => `<li>${del}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            `);
        }

        setSelectedMilestone(d);
      })
      .on('mouseleave', function() {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', 12)
          .attr('stroke-width', 3);

        if (tooltipRef.current) {
          d3.select(tooltipRef.current)
            .style('opacity', 0);
        }

        setSelectedMilestone(null);
      })
      .on('click', (event, d) => {
        if (onMilestoneClick) {
          onMilestoneClick(d);
        }
      });

    // Add milestone circles
    milestoneGroups.append('circle')
      .attr('r', 0)
      .attr('fill', d => {
        switch (d.status) {
          case 'completed': return QDARIA_COLORS.success;
          case 'in-progress': return QDARIA_COLORS.accent;
          case 'planned': return QDARIA_COLORS.primary;
          default: return QDARIA_COLORS.gray;
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .transition()
      .delay((d, i) => i * 100)
      .duration(500)
      .attr('r', 12);

    // Add milestone icons based on status
    milestoneGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('font-size', 10)
      .attr('fill', '#fff')
      .attr('font-weight', 'bold')
      .attr('opacity', 0)
      .text(d => {
        switch (d.status) {
          case 'completed': return '✓';
          case 'in-progress': return '◐';
          case 'planned': return '○';
          default: return '?';
        }
      })
      .transition()
      .delay((d, i) => i * 100 + 300)
      .duration(300)
      .attr('opacity', 1);

    // Add milestone labels
    milestoneGroups.append('text')
      .attr('class', 'milestone-label')
      .attr('text-anchor', 'middle')
      .attr('dy', -20)
      .attr('font-size', 11)
      .attr('fill', '#fff')
      .attr('font-weight', 600)
      .attr('opacity', 0)
      .text(d => d.title)
      .transition()
      .delay((d, i) => i * 100 + 400)
      .duration(300)
      .attr('opacity', 1);

    // Add date labels
    milestoneGroups.append('text')
      .attr('class', 'date-label')
      .attr('text-anchor', 'middle')
      .attr('dy', 30)
      .attr('font-size', 10)
      .attr('fill', QDARIA_COLORS.gray)
      .attr('opacity', 0)
      .text(d => (d.date as Date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))
      .transition()
      .delay((d, i) => i * 100 + 500)
      .duration(300)
      .attr('opacity', 0.8);

    // Add phase labels
    g.selectAll('.phase-label')
      .data(phaseNames)
      .join('text')
      .attr('class', 'phase-label')
      .attr('x', -10)
      .attr('y', d => (yScale(d) || 0) + (yScale.bandwidth() / 2))
      .attr('text-anchor', 'end')
      .attr('dy', 5)
      .attr('font-size', 12)
      .attr('fill', QDARIA_COLORS.primary)
      .attr('font-weight', 'bold')
      .attr('opacity', 0)
      .text(d => d)
      .transition()
      .delay(animationDuration / 2)
      .duration(500)
      .attr('opacity', 1);

    // Add time axis at bottom
    const xAxis = d3.axisBottom(xScale)
      .ticks(8)
      .tickFormat(d => (d as Date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight + 20})`)
      .call(xAxis)
      .attr('opacity', 0)
      .transition()
      .delay(animationDuration)
      .duration(500)
      .attr('opacity', 1)
      .selectAll('text')
      .attr('fill', QDARIA_COLORS.gray)
      .attr('font-size', 10);

    g.select('.x-axis')
      .selectAll('line, path')
      .attr('stroke', QDARIA_COLORS.gray)
      .attr('opacity', 0.3);

    setIsRendered(true);
  }, [milestones, phases, width, height, showDependencies, animationDuration, onMilestoneClick]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`timeline-d3-chart ${className}`}
      style={{ width: '100%', position: 'relative' }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        style={{ maxWidth: '100%', background: 'transparent' }}
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none transition-opacity duration-200"
        style={{
          opacity: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          border: `2px solid ${QDARIA_COLORS.primary}`,
          borderRadius: '8px',
          padding: '12px',
          maxWidth: '300px',
          zIndex: 1000,
          boxShadow: `0 4px 20px rgba(204, 255, 0, 0.3)`,
        }}
      />

      {/* Loading indicator */}
      {!isRendered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: QDARIA_COLORS.primary }}
          />
        </div>
      )}

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: QDARIA_COLORS.success }}
          />
          <span className="text-xs text-gray-400">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: QDARIA_COLORS.accent }}
          />
          <span className="text-xs text-gray-400">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: QDARIA_COLORS.primary }}
          />
          <span className="text-xs text-gray-400">Planned</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineD3Chart;
