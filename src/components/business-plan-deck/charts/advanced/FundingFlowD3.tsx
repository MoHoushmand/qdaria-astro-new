/**
 * FundingFlowD3 - Sankey diagram for funding rounds and cash flow
 *
 * Features:
 * - Sankey diagram showing fund allocation
 * - Animated flow paths with gradients
 * - Interactive nodes with details
 * - Color-coded by funding source/category
 * - Smooth transitions and hover effects
 * - Custom path rendering with bezier curves
 *
 * @example
 * <FundingFlowD3
 *   fundingData={fundingStructure}
 *   width={1200}
 *   height={700}
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
  purple: '#a855f7',
  orange: '#fb923c',
};

interface FundingNode {
  id: string;
  name: string;
  category: 'source' | 'allocation' | 'subcategory';
  color?: string;
  details?: string;
  metrics?: { label: string; value: string }[];
}

interface FundingLink {
  source: string;
  target: string;
  value: number; // Amount in millions
  label?: string;
  description?: string;
}

interface FundingFlowD3Props {
  fundingData: {
    nodes: FundingNode[];
    links: FundingLink[];
  };
  width?: number;
  height?: number;
  className?: string;
  onNodeClick?: (node: FundingNode) => void;
  onLinkClick?: (link: FundingLink) => void;
  animationDuration?: number;
  currency?: string;
}

interface SankeyNode extends FundingNode {
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  value?: number;
  sourceLinks?: SankeyLink[];
  targetLinks?: SankeyLink[];
  depth?: number;
  height?: number;
  index?: number;
}

interface SankeyLink extends FundingLink {
  source: SankeyNode;
  target: SankeyNode;
  width?: number;
  y0?: number;
  y1?: number;
}

/**
 * Custom Sankey layout implementation
 */
const computeSankeyLayout = (
  nodes: FundingNode[],
  links: FundingLink[],
  width: number,
  height: number
): { nodes: SankeyNode[]; links: SankeyLink[] } => {
  // Create node map
  const nodeMap = new Map<string, SankeyNode>();
  const sankeyNodes: SankeyNode[] = nodes.map((n, i) => ({
    ...n,
    index: i,
    sourceLinks: [],
    targetLinks: [],
    value: 0,
  }));

  sankeyNodes.forEach(node => {
    nodeMap.set(node.id, node);
  });

  // Create links with node references
  const sankeyLinks: SankeyLink[] = links.map(link => ({
    ...link,
    source: nodeMap.get(link.source)!,
    target: nodeMap.get(link.target)!,
  }));

  // Compute node values and depths
  sankeyLinks.forEach(link => {
    link.source.sourceLinks!.push(link);
    link.target.targetLinks!.push(link);
  });

  // Assign node depths (column positions)
  const computeNodeDepths = () => {
    sankeyNodes.forEach(node => {
      node.depth = node.targetLinks!.length === 0 ? 0 : undefined;
    });

    let remaining = sankeyNodes.filter(n => n.depth === undefined);
    let depth = 1;

    while (remaining.length && depth < 10) {
      remaining.forEach(node => {
        const sourcesReady = node.targetLinks!.every(
          link => link.source.depth !== undefined
        );
        if (sourcesReady) {
          node.depth = d3.max(node.targetLinks!, link => link.source.depth!)! + 1;
        }
      });
      remaining = remaining.filter(n => n.depth === undefined);
      depth++;
    }
  };

  computeNodeDepths();

  // Reverse depths (sources on left, targets on right)
  const maxDepth = d3.max(sankeyNodes, d => d.depth!) || 0;
  sankeyNodes.forEach(node => {
    node.depth = maxDepth - node.depth!;
  });

  // Compute node values
  sankeyNodes.forEach(node => {
    node.value = Math.max(
      d3.sum(node.sourceLinks!, d => d.value),
      d3.sum(node.targetLinks!, d => d.value)
    );
  });

  // Position nodes
  const nodeWidth = 20;
  const nodePadding = 20;
  const columns = d3.groups(sankeyNodes, d => d.depth);
  const x = d3.scaleLinear()
    .domain([0, maxDepth])
    .range([nodeWidth, width - nodeWidth]);

  columns.forEach(([depth, columnNodes]) => {
    const columnValue = d3.sum(columnNodes, d => d.value!);
    const scale = (height - nodePadding * (columnNodes.length - 1)) / columnValue;

    let y = 0;
    columnNodes
      .sort((a, b) => d3.descending(a.value!, b.value!))
      .forEach(node => {
        node.x0 = x(depth!);
        node.x1 = node.x0 + nodeWidth;
        node.y0 = y;
        node.height = node.value! * scale;
        node.y1 = y + node.height;
        y += node.height + nodePadding;
      });
  });

  // Position links
  sankeyLinks.forEach(link => {
    link.width = link.value * 0.5; // Scale link width
  });

  sankeyNodes.forEach(node => {
    let y0 = node.y0!;
    let y1 = node.y0!;

    node.sourceLinks!
      .sort((a, b) => d3.ascending(a.target.y0!, b.target.y0!))
      .forEach(link => {
        link.y0 = y0;
        y0 += link.width!;
      });

    node.targetLinks!
      .sort((a, b) => d3.ascending(a.source.y0!, b.source.y0!))
      .forEach(link => {
        link.y1 = y1;
        y1 += link.width!;
      });
  });

  return { nodes: sankeyNodes, links: sankeyLinks };
};

/**
 * Generate smooth path for sankey link
 */
const sankeyLinkPath = (link: SankeyLink): string => {
  const x0 = link.source.x1!;
  const x1 = link.target.x0!;
  const y0 = link.y0!;
  const y1 = link.y1!;
  const yi = d3.interpolateNumber(y0, y1);
  const y2 = yi(0.5);
  const y3 = yi(0.5);
  const curvature = 0.5;
  const xi = d3.interpolateNumber(x0, x1);
  const x2 = xi(curvature);
  const x3 = xi(1 - curvature);

  return `
    M ${x0},${y0}
    C ${x2},${y0} ${x3},${y1} ${x1},${y1}
    L ${x1},${y1 + link.width!}
    C ${x3},${y1 + link.width!} ${x2},${y0 + link.width!} ${x0},${y0 + link.width!}
    Z
  `;
};

/**
 * FundingFlowD3 Component
 */
export const FundingFlowD3: React.FC<FundingFlowD3Props> = ({
  fundingData,
  width = 1200,
  height = 700,
  className = '',
  onNodeClick,
  onLinkClick,
  animationDuration = 2000,
  currency = 'USD',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<SankeyNode | null>(null);
  const [hoveredLink, setHoveredLink] = useState<SankeyLink | null>(null);

  useEffect(() => {
    if (!svgRef.current || !fundingData.nodes.length || !fundingData.links.length) return;

    // Clear previous render
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Setup dimensions
    const margin = { top: 40, right: 200, bottom: 40, left: 200 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Compute sankey layout
    const { nodes, links } = computeSankeyLayout(
      fundingData.nodes,
      fundingData.links,
      innerWidth,
      innerHeight
    );

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create gradients for links
    const defs = svg.append('defs');

    links.forEach((link, i) => {
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${i}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', link.source.x1!)
        .attr('x2', link.target.x0!);

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', link.source.color || QDARIA_COLORS.primary)
        .attr('stop-opacity', 0.6);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', link.target.color || QDARIA_COLORS.accent)
        .attr('stop-opacity', 0.6);
    });

    // Draw links
    const linkGroup = g.append('g')
      .attr('class', 'links')
      .attr('fill', 'none');

    const linkPaths = linkGroup.selectAll('.link')
      .data(links)
      .join('path')
      .attr('class', 'link')
      .attr('d', sankeyLinkPath)
      .attr('fill', (d, i) => `url(#gradient-${i})`)
      .attr('stroke', 'none')
      .attr('opacity', 0)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        // Highlight link
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.9);

        // Dim other links
        linkGroup.selectAll('.link')
          .filter((link: any) => link !== d)
          .transition()
          .duration(200)
          .attr('opacity', 0.2);

        // Show tooltip
        if (tooltipRef.current) {
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style('opacity', 1)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 10}px`)
            .html(`
              <div class="font-bold text-[${QDARIA_COLORS.primary}] mb-2">
                ${d.source.name} → ${d.target.name}
              </div>
              <div class="text-sm text-gray-300 mb-2">
                Amount: $${d.value.toFixed(2)}M ${currency}
              </div>
              ${d.label ? `<div class="text-xs text-gray-400 mb-1">${d.label}</div>` : ''}
              ${d.description ? `<div class="text-xs text-gray-400">${d.description}</div>` : ''}
              <div class="text-xs text-gray-500 mt-2">
                ${((d.value / d.source.value!) * 100).toFixed(1)}% of ${d.source.name}
              </div>
            `);
        }

        setHoveredLink(d);
      })
      .on('mouseleave', function() {
        linkGroup.selectAll('.link')
          .transition()
          .duration(200)
          .attr('opacity', 0.5);

        if (tooltipRef.current) {
          d3.select(tooltipRef.current)
            .style('opacity', 0);
        }

        setHoveredLink(null);
      })
      .on('click', (event, d) => {
        if (onLinkClick) {
          onLinkClick(d);
        }
      });

    // Animate links
    linkPaths
      .transition()
      .delay((d, i) => i * 50)
      .duration(animationDuration)
      .attr('opacity', 0.5);

    // Draw nodes
    const nodeGroup = g.append('g')
      .attr('class', 'nodes');

    const nodeRects = nodeGroup.selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        // Highlight node
        d3.select(this)
          .select('rect')
          .transition()
          .duration(200)
          .attr('opacity', 1)
          .attr('stroke-width', 3);

        // Highlight connected links
        linkGroup.selectAll('.link')
          .transition()
          .duration(200)
          .attr('opacity', (link: any) =>
            link.source === d || link.target === d ? 0.8 : 0.15
          );

        // Show tooltip
        if (tooltipRef.current) {
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style('opacity', 1)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 10}px`)
            .html(`
              <div class="font-bold mb-2" style="color: ${d.color || QDARIA_COLORS.primary}">
                ${d.name}
              </div>
              <div class="text-sm text-gray-300 mb-2">
                Total: $${d.value!.toFixed(2)}M ${currency}
              </div>
              <div class="text-xs text-gray-400 mb-1 capitalize">
                Category: ${d.category}
              </div>
              ${d.details ? `<div class="text-xs text-gray-400 mb-2">${d.details}</div>` : ''}
              ${d.metrics && d.metrics.length > 0 ? `
                <div class="text-xs text-gray-400 mt-2 border-t border-gray-700 pt-2">
                  ${d.metrics.map(m => `<div>${m.label}: ${m.value}</div>`).join('')}
                </div>
              ` : ''}
              ${d.sourceLinks!.length > 0 ? `
                <div class="text-xs text-gray-500 mt-2">
                  Outflows: ${d.sourceLinks!.length}
                </div>
              ` : ''}
              ${d.targetLinks!.length > 0 ? `
                <div class="text-xs text-gray-500">
                  Inflows: ${d.targetLinks!.length}
                </div>
              ` : ''}
            `);
        }

        setHoveredNode(d);
      })
      .on('mouseleave', function() {
        d3.select(this)
          .select('rect')
          .transition()
          .duration(200)
          .attr('opacity', 0.9)
          .attr('stroke-width', 2);

        linkGroup.selectAll('.link')
          .transition()
          .duration(200)
          .attr('opacity', 0.5);

        if (tooltipRef.current) {
          d3.select(tooltipRef.current)
            .style('opacity', 0);
        }

        setHoveredNode(null);
      })
      .on('click', (event, d) => {
        if (onNodeClick) {
          onNodeClick(d);
        }
      });

    // Add node rectangles
    nodeRects.append('rect')
      .attr('x', d => d.x0!)
      .attr('y', d => d.y0!)
      .attr('height', 0)
      .attr('width', d => d.x1! - d.x0!)
      .attr('fill', d => d.color || QDARIA_COLORS.primary)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0.9)
      .attr('rx', 4)
      .transition()
      .delay((d, i) => animationDuration / 2 + i * 30)
      .duration(600)
      .attr('height', d => d.y1! - d.y0!);

    // Add node labels
    nodeRects.append('text')
      .attr('x', d => d.x0! < innerWidth / 2 ? d.x1! + 6 : d.x0! - 6)
      .attr('y', d => (d.y0! + d.y1!) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', d => d.x0! < innerWidth / 2 ? 'start' : 'end')
      .attr('font-size', 12)
      .attr('font-weight', '600')
      .attr('fill', '#fff')
      .attr('opacity', 0)
      .text(d => d.name)
      .transition()
      .delay((d, i) => animationDuration / 2 + i * 30 + 300)
      .duration(400)
      .attr('opacity', 1);

    // Add node values
    nodeRects.append('text')
      .attr('x', d => d.x0! < innerWidth / 2 ? d.x1! + 6 : d.x0! - 6)
      .attr('y', d => (d.y0! + d.y1!) / 2)
      .attr('dy', '1.5em')
      .attr('text-anchor', d => d.x0! < innerWidth / 2 ? 'start' : 'end')
      .attr('font-size', 10)
      .attr('fill', QDARIA_COLORS.gray)
      .attr('opacity', 0)
      .text(d => `$${d.value!.toFixed(1)}M`)
      .transition()
      .delay((d, i) => animationDuration / 2 + i * 30 + 400)
      .duration(400)
      .attr('opacity', 0.8);

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', 16)
      .attr('font-weight', 'bold')
      .attr('fill', QDARIA_COLORS.primary)
      .attr('opacity', 0)
      .text('Funding Flow & Allocation')
      .transition()
      .delay(animationDuration + 500)
      .duration(500)
      .attr('opacity', 1);

    setIsRendered(true);
  }, [fundingData, width, height, animationDuration, currency, onNodeClick, onLinkClick]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`funding-flow-d3 ${className}`}
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
        Flow width represents funding amount • Hover for details
      </div>
    </motion.div>
  );
};

export default FundingFlowD3;
