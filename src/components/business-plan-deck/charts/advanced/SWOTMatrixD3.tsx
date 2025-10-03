/**
 * SWOTMatrixD3 - Interactive SWOT analysis matrix visualization
 *
 * Features:
 * - 2x2 matrix layout with quadrants
 * - Interactive bubbles sized by importance
 * - Color-coded categories
 * - Smooth animations and transitions
 * - Hover tooltips with details
 * - Force simulation for optimal spacing
 *
 * @example
 * <SWOTMatrixD3
 *   swotData={swotAnalysis}
 *   width={900}
 *   height={800}
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
  danger: '#ff3366',
};

interface SWOTItem {
  id: string;
  category: 'strength' | 'weakness' | 'opportunity' | 'threat';
  title: string;
  description: string;
  importance: number; // 1-10 scale
  impact?: string;
  actionItems?: string[];
  metrics?: { label: string; value: string }[];
}

interface SWOTMatrixD3Props {
  swotData: SWOTItem[];
  width?: number;
  height?: number;
  className?: string;
  onItemClick?: (item: SWOTItem) => void;
  showLabels?: boolean;
  animationDuration?: number;
}

interface SimulationNode extends d3.SimulationNodeDatum {
  id: string;
  category: 'strength' | 'weakness' | 'opportunity' | 'threat';
  title: string;
  description: string;
  importance: number;
  radius: number;
  targetX: number;
  targetY: number;
  data: SWOTItem;
}

/**
 * SWOTMatrixD3 Component
 */
export const SWOTMatrixD3: React.FC<SWOTMatrixD3Props> = ({
  swotData,
  width = 900,
  height = 800,
  className = '',
  onItemClick,
  showLabels = true,
  animationDuration = 1500,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SWOTItem | null>(null);

  useEffect(() => {
    if (!svgRef.current || !swotData.length) return;

    // Clear previous render
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Setup dimensions
    const margin = { top: 60, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define quadrants
    const quadrantWidth = innerWidth / 2;
    const quadrantHeight = innerHeight / 2;

    const quadrants = [
      {
        category: 'strength' as const,
        x: 0,
        y: 0,
        color: QDARIA_COLORS.success,
        label: 'STRENGTHS',
        subtitle: 'Internal • Positive'
      },
      {
        category: 'weakness' as const,
        x: quadrantWidth,
        y: 0,
        color: QDARIA_COLORS.warning,
        label: 'WEAKNESSES',
        subtitle: 'Internal • Negative'
      },
      {
        category: 'opportunity' as const,
        x: 0,
        y: quadrantHeight,
        color: QDARIA_COLORS.accent,
        label: 'OPPORTUNITIES',
        subtitle: 'External • Positive'
      },
      {
        category: 'threat' as const,
        x: quadrantWidth,
        y: quadrantHeight,
        color: QDARIA_COLORS.danger,
        label: 'THREATS',
        subtitle: 'External • Negative'
      },
    ];

    // Draw quadrant backgrounds
    const quadrantGroups = g.selectAll('.quadrant')
      .data(quadrants)
      .join('g')
      .attr('class', 'quadrant')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    quadrantGroups.append('rect')
      .attr('width', quadrantWidth)
      .attr('height', quadrantHeight)
      .attr('fill', d => d.color)
      .attr('opacity', 0)
      .transition()
      .duration(animationDuration / 3)
      .attr('opacity', 0.08)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.3);

    // Add quadrant labels
    quadrantGroups.append('text')
      .attr('x', quadrantWidth / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', 18)
      .attr('font-weight', 'bold')
      .attr('fill', d => d.color)
      .attr('opacity', 0)
      .text(d => d.label)
      .transition()
      .delay(animationDuration / 3)
      .duration(500)
      .attr('opacity', 1);

    // Add quadrant subtitles
    quadrantGroups.append('text')
      .attr('x', quadrantWidth / 2)
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .attr('font-size', 11)
      .attr('fill', QDARIA_COLORS.gray)
      .attr('opacity', 0)
      .text(d => d.subtitle)
      .transition()
      .delay(animationDuration / 3 + 200)
      .duration(500)
      .attr('opacity', 0.7);

    // Draw center lines
    g.append('line')
      .attr('x1', quadrantWidth)
      .attr('y1', 0)
      .attr('x2', quadrantWidth)
      .attr('y2', 0)
      .attr('stroke', QDARIA_COLORS.primary)
      .attr('stroke-width', 2)
      .attr('opacity', 0.5)
      .transition()
      .duration(animationDuration / 2)
      .attr('y2', innerHeight);

    g.append('line')
      .attr('x1', 0)
      .attr('y1', quadrantHeight)
      .attr('x2', 0)
      .attr('y2', quadrantHeight)
      .attr('stroke', QDARIA_COLORS.primary)
      .attr('stroke-width', 2)
      .attr('opacity', 0.5)
      .transition()
      .duration(animationDuration / 2)
      .attr('x2', innerWidth);

    // Prepare simulation nodes
    const nodes: SimulationNode[] = swotData.map(item => {
      const quadrant = quadrants.find(q => q.category === item.category)!;
      const centerX = quadrant.x + quadrantWidth / 2;
      const centerY = quadrant.y + quadrantHeight / 2 + 40; // Offset for label
      const radius = Math.sqrt(item.importance) * 8 + 10;

      return {
        id: item.id,
        category: item.category,
        title: item.title,
        description: item.description,
        importance: item.importance,
        radius,
        targetX: centerX,
        targetY: centerY,
        x: centerX,
        y: centerY,
        data: item,
      };
    });

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('x', d3.forceX((d: SimulationNode) => d.targetX).strength(0.15))
      .force('y', d3.forceY((d: SimulationNode) => d.targetY).strength(0.15))
      .force('collision', d3.forceCollide().radius((d: SimulationNode) => d.radius + 4))
      .force('charge', d3.forceManyBody().strength(-50))
      .alphaDecay(0.02)
      .stop();

    // Run simulation in advance
    for (let i = 0; i < 200; i++) {
      simulation.tick();
    }

    // Draw SWOT items as bubbles
    const itemGroups = g.selectAll('.swot-item')
      .data(nodes)
      .join('g')
      .attr('class', 'swot-item')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        // Highlight bubble
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', d.radius * 1.2)
          .attr('stroke-width', 4);

        d3.select(this)
          .select('.item-label')
          .transition()
          .duration(200)
          .attr('opacity', 1);

        // Show tooltip
        if (tooltipRef.current) {
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style('opacity', 1)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 10}px`)
            .html(`
              <div class="font-bold mb-2" style="color: ${
                quadrants.find(q => q.category === d.category)?.color
              }">${d.title}</div>
              <div class="text-sm text-gray-300 mb-2">${d.description}</div>
              <div class="text-xs text-gray-400 mb-1">
                Importance: ${d.importance}/10
              </div>
              ${d.data.impact ? `
                <div class="text-xs text-gray-400 mb-1">
                  Impact: ${d.data.impact}
                </div>
              ` : ''}
              ${d.data.actionItems && d.data.actionItems.length > 0 ? `
                <div class="text-xs text-gray-400 mt-2">
                  <strong>Action Items:</strong>
                  <ul class="list-disc list-inside">
                    ${d.data.actionItems.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              ${d.data.metrics && d.data.metrics.length > 0 ? `
                <div class="text-xs text-gray-400 mt-2">
                  <strong>Metrics:</strong>
                  ${d.data.metrics.map(m => `<div>${m.label}: ${m.value}</div>`).join('')}
                </div>
              ` : ''}
            `);
        }

        setSelectedItem(d.data);
      })
      .on('mouseleave', function() {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', (d: SimulationNode) => d.radius)
          .attr('stroke-width', 3);

        d3.select(this)
          .select('.item-label')
          .transition()
          .duration(200)
          .attr('opacity', showLabels ? 0.9 : 0);

        if (tooltipRef.current) {
          d3.select(tooltipRef.current)
            .style('opacity', 0);
        }

        setSelectedItem(null);
      })
      .on('click', (event, d) => {
        if (onItemClick) {
          onItemClick(d.data);
        }
      });

    // Add circles
    itemGroups.append('circle')
      .attr('r', 0)
      .attr('fill', d => {
        const quadrant = quadrants.find(q => q.category === d.category)!;
        return quadrant.color;
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('opacity', 0.85)
      .transition()
      .delay((d, i) => animationDuration / 2 + i * 50)
      .duration(600)
      .attr('r', d => d.radius);

    // Add importance indicators (inner circles)
    itemGroups.append('circle')
      .attr('r', 0)
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0.3)
      .transition()
      .delay((d, i) => animationDuration / 2 + i * 50 + 300)
      .duration(400)
      .attr('r', d => d.radius * 0.6);

    // Add importance text
    itemGroups.append('text')
      .attr('class', 'importance-text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('font-size', d => Math.max(10, d.radius * 0.4))
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .attr('opacity', 0)
      .text(d => d.importance)
      .transition()
      .delay((d, i) => animationDuration / 2 + i * 50 + 600)
      .duration(400)
      .attr('opacity', 1);

    // Add item labels
    itemGroups.append('text')
      .attr('class', 'item-label')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.radius + 16)
      .attr('font-size', 10)
      .attr('font-weight', '600')
      .attr('fill', '#fff')
      .attr('opacity', 0)
      .text(d => {
        const maxLength = 25;
        return d.title.length > maxLength
          ? d.title.substring(0, maxLength) + '...'
          : d.title;
      })
      .transition()
      .delay((d, i) => animationDuration / 2 + i * 50 + 800)
      .duration(400)
      .attr('opacity', showLabels ? 0.9 : 0);

    // Add count badges
    quadrants.forEach(quadrant => {
      const count = swotData.filter(item => item.category === quadrant.category).length;
      const avgImportance = d3.mean(
        swotData.filter(item => item.category === quadrant.category),
        d => d.importance
      ) || 0;

      const badge = g.append('g')
        .attr('transform', `translate(${quadrant.x + quadrantWidth - 30},${quadrant.y + 30})`);

      badge.append('circle')
        .attr('r', 20)
        .attr('fill', quadrant.color)
        .attr('opacity', 0.9);

      badge.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', -3)
        .attr('font-size', 14)
        .attr('font-weight', 'bold')
        .attr('fill', '#1a1a1a')
        .text(count);

      badge.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', 10)
        .attr('font-size', 8)
        .attr('fill', '#1a1a1a')
        .text(`Avg: ${avgImportance.toFixed(1)}`);
    });

    setIsRendered(true);
  }, [swotData, width, height, showLabels, animationDuration, onItemClick]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`swot-matrix-d3 ${className}`}
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
          maxWidth: '320px',
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
      <div className="text-center mt-4 text-xs text-gray-400">
        Bubble size represents importance level (1-10 scale)
      </div>
    </motion.div>
  );
};

export default SWOTMatrixD3;
