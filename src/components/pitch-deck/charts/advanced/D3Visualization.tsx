/**
 * D3Visualization - Custom D3.js interactive visualizations
 *
 * Best for: Unique quantum algorithm visualizations, network graphs,
 * organization charts, force-directed layouts, custom interactions
 *
 * @example
 * <D3Visualization
 *   type="network-graph"
 *   data={quantumArchitectureData}
 *   width={800}
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
};

interface Node {
  id: string;
  label: string;
  group?: string | number;
  value?: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
  value?: number;
  label?: string;
}

interface TreeNode {
  name: string;
  children?: TreeNode[];
  value?: number;
}

interface SankeyNode {
  name: string;
  id?: string;
}

interface SankeyLink {
  source: number | string;
  target: number | string;
  value: number;
}

interface D3VisualizationProps {
  type: 'network-graph' | 'org-chart' | 'tree-diagram' | 'sankey' | 'force-layout';
  data: {
    nodes?: Node[];
    links?: Link[];
    tree?: TreeNode;
    sankeyNodes?: SankeyNode[];
    sankeyLinks?: SankeyLink[];
  };
  width?: number;
  height?: number;
  className?: string;
  onNodeClick?: (node: any) => void;
  interactive?: boolean;
}

/**
 * Network Graph - Force-directed network visualization
 */
const renderNetworkGraph = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: { nodes: Node[]; links: Link[] },
  width: number,
  height: number,
  onNodeClick?: (node: any) => void
) => {
  svg.selectAll('*').remove();

  const simulation = d3.forceSimulation(data.nodes as any)
    .force('link', d3.forceLink(data.links).id((d: any) => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(30));

  // Links
  const link = svg.append('g')
    .selectAll('line')
    .data(data.links)
    .join('line')
    .attr('stroke', QDARIA_COLORS.gray)
    .attr('stroke-opacity', 0.6)
    .attr('stroke-width', (d: any) => Math.sqrt(d.value || 1) * 2);

  // Link labels
  const linkLabel = svg.append('g')
    .selectAll('text')
    .data(data.links)
    .join('text')
    .text((d: any) => d.label || '')
    .attr('font-size', 14)
    .attr('font-weight', 500)
    .attr('font-family', "'Inter', system-ui, sans-serif")
    .attr('fill', QDARIA_COLORS.gray)
    .attr('text-anchor', 'middle');

  // Nodes
  const node = svg.append('g')
    .selectAll('circle')
    .data(data.nodes)
    .join('circle')
    .attr('r', (d: any) => d.value ? Math.sqrt(d.value) * 5 : 20)
    .attr('fill', (d: any) => {
      const colors = [QDARIA_COLORS.primary, QDARIA_COLORS.accent, QDARIA_COLORS.secondary, QDARIA_COLORS.tertiary];
      return colors[(d.group as number) % colors.length];
    })
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .call(d3.drag<any, any>()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended) as any);

  // Node labels
  const label = svg.append('g')
    .selectAll('text')
    .data(data.nodes)
    .join('text')
    .text((d: any) => d.label)
    .attr('font-size', 14)
    .attr('font-weight', 500)
    .attr('font-family', "'Inter', system-ui, sans-serif")
    .attr('fill', 'rgba(229, 231, 235, 0.85)')
    .attr('text-anchor', 'middle')
    .attr('dy', 4)
    .style('pointer-events', 'none')
    .style('user-select', 'none');

  if (onNodeClick) {
    node.on('click', (event, d) => onNodeClick(d));
  }

  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y);

    linkLabel
      .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
      .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

    node
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y);

    label
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y);
  });

  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: any) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
};

/**
 * Tree Diagram - Hierarchical tree layout
 */
const renderTreeDiagram = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: TreeNode,
  width: number,
  height: number,
  onNodeClick?: (node: any) => void
) => {
  svg.selectAll('*').remove();

  const root = d3.hierarchy(data);
  const treeLayout = d3.tree<TreeNode>().size([height - 100, width - 200]);
  treeLayout(root);

  const g = svg.append('g').attr('transform', 'translate(100, 50)');

  // Links
  g.selectAll('.link')
    .data(root.links())
    .join('path')
    .attr('class', 'link')
    .attr('d', d3.linkHorizontal<any, any>()
      .x((d: any) => d.y)
      .y((d: any) => d.x))
    .attr('fill', 'none')
    .attr('stroke', QDARIA_COLORS.gray)
    .attr('stroke-width', 2);

  // Nodes
  const node = g.selectAll('.node')
    .data(root.descendants())
    .join('g')
    .attr('class', 'node')
    .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
    .style('cursor', 'pointer');

  node.append('circle')
    .attr('r', 8)
    .attr('fill', (d: any) => d.children ? QDARIA_COLORS.primary : QDARIA_COLORS.accent)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);

  node.append('text')
    .attr('dy', -15)
    .attr('text-anchor', 'middle')
    .text((d: any) => d.data.name)
    .attr('font-size', 14)
    .attr('font-weight', 500)
    .attr('font-family', "'Inter', system-ui, sans-serif")
    .attr('fill', 'rgba(229, 231, 235, 0.85)');

  if (onNodeClick) {
    node.on('click', (event, d) => onNodeClick(d));
  }
};

/**
 * D3Visualization Component
 */
export const D3Visualization: React.FC<D3VisualizationProps> = ({
  type,
  data,
  width = 800,
  height = 600,
  className = '',
  onNodeClick,
  interactive = true,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('background', 'transparent');

    try {
      switch (type) {
        case 'network-graph':
        case 'force-layout':
          if (data.nodes && data.links) {
            renderNetworkGraph(svg, { nodes: data.nodes, links: data.links }, width, height, onNodeClick);
          }
          break;

        case 'tree-diagram':
        case 'org-chart':
          if (data.tree) {
            renderTreeDiagram(svg, data.tree, width, height, onNodeClick);
          }
          break;

        case 'sankey':
          // Sankey implementation would require d3-sankey plugin
          console.warn('Sankey diagram requires d3-sankey plugin');
          break;

        default:
          console.warn(`Unknown visualization type: ${type}`);
      }
      setIsRendered(true);
    } catch (error) {
      console.error('Error rendering D3 visualization:', error);
    }
  }, [type, data, width, height, onNodeClick]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`d3-visualization ${className}`}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      {!isRendered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: QDARIA_COLORS.primary }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default D3Visualization;
