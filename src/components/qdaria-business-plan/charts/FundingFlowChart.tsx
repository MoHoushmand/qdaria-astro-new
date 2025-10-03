import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import d3SankeyPkg from 'd3-sankey';
const { sankey, sankeyLinkHorizontal } = d3SankeyPkg as any;
import type { SankeyGraph, SankeyNode, SankeyLink } from 'd3-sankey';

interface FundingNode {
  id: string;
  name: string;
  value: number;
  category: 'source' | 'use';
  color?: string;
}

interface FundingLink {
  source: string;
  target: string;
  value: number;
}

interface FundingData {
  nodes: FundingNode[];
  links: FundingLink[];
}

interface TimelineRound {
  year: number;
  name: string;
  amount: number;
  data: FundingData;
}

const fundingRounds: TimelineRound[] = [
  {
    year: 2025,
    name: 'Seed Round',
    amount: 12,
    data: {
      nodes: [
        { id: 'equity', name: 'Equity Investors', value: 9.6, category: 'source', color: '#04a3ff' },
        { id: 'debt', name: 'Debt Financing', value: 1.2, category: 'source', color: '#0066cc' },
        { id: 'grants', name: 'Grants/Subsidies', value: 1.2, category: 'source', color: '#00b8d4' },
        { id: 'hardware', name: 'Hardware Acquisition', value: 3.0, category: 'use', color: '#8b5cf6' },
        { id: 'team', name: 'Team Expansion', value: 4.2, category: 'use', color: '#3b82f6' },
        { id: 'product', name: 'Product Development', value: 1.8, category: 'use', color: '#10b981' },
        { id: 'operations', name: 'Operations', value: 1.8, category: 'use', color: '#f97316' },
        { id: 'cloud', name: 'Quantum Cloud', value: 1.2, category: 'use', color: '#00ffd3' },
      ],
      links: [
        { source: 'equity', target: 'hardware', value: 2.4 },
        { source: 'equity', target: 'team', value: 3.36 },
        { source: 'equity', target: 'product', value: 1.44 },
        { source: 'equity', target: 'operations', value: 1.44 },
        { source: 'equity', target: 'cloud', value: 0.96 },
        { source: 'debt', target: 'hardware', value: 0.3 },
        { source: 'debt', target: 'operations', value: 0.24 },
        { source: 'debt', target: 'cloud', value: 0.18 },
        { source: 'grants', target: 'team', value: 0.42 },
        { source: 'grants', target: 'product', value: 0.36 },
        { source: 'grants', target: 'cloud', value: 0.06 },
      ]
    }
  },
  {
    year: 2027,
    name: 'Series B',
    amount: 25,
    data: {
      nodes: [
        { id: 'equity', name: 'Equity Investors', value: 20, category: 'source', color: '#04a3ff' },
        { id: 'debt', name: 'Debt Financing', value: 3, category: 'source', color: '#0066cc' },
        { id: 'revenue', name: 'Revenue Recycling', value: 2, category: 'source', color: '#10b981' },
        { id: 'hardware', name: 'Hardware Scale-up', value: 8, category: 'use', color: '#8b5cf6' },
        { id: 'team', name: 'Team Growth', value: 7, category: 'use', color: '#3b82f6' },
        { id: 'product', name: 'Product Enhancement', value: 4, category: 'use', color: '#10b981' },
        { id: 'operations', name: 'Global Operations', value: 3, category: 'use', color: '#f97316' },
        { id: 'cloud', name: 'Cloud Expansion', value: 3, category: 'use', color: '#00ffd3' },
      ],
      links: [
        { source: 'equity', target: 'hardware', value: 6.4 },
        { source: 'equity', target: 'team', value: 5.6 },
        { source: 'equity', target: 'product', value: 3.2 },
        { source: 'equity', target: 'operations', value: 2.4 },
        { source: 'equity', target: 'cloud', value: 2.4 },
        { source: 'debt', target: 'hardware', value: 1.2 },
        { source: 'debt', target: 'operations', value: 0.6 },
        { source: 'debt', target: 'cloud', value: 0.6 },
        { source: 'revenue', target: 'team', value: 0.7 },
        { source: 'revenue', target: 'product', value: 0.8 },
        { source: 'revenue', target: 'cloud', value: 0.3 },
      ]
    }
  },
  {
    year: 2029,
    name: 'Series C',
    amount: 50,
    data: {
      nodes: [
        { id: 'equity', name: 'Equity Investors', value: 35, category: 'source', color: '#04a3ff' },
        { id: 'debt', name: 'Debt Financing', value: 8, category: 'source', color: '#0066cc' },
        { id: 'revenue', name: 'Revenue Recycling', value: 7, category: 'source', color: '#10b981' },
        { id: 'hardware', name: 'Hardware Network', value: 15, category: 'use', color: '#8b5cf6' },
        { id: 'team', name: 'Enterprise Team', value: 12, category: 'use', color: '#3b82f6' },
        { id: 'product', name: 'Product Suite', value: 8, category: 'use', color: '#10b981' },
        { id: 'operations', name: 'International Ops', value: 7, category: 'use', color: '#f97316' },
        { id: 'cloud', name: 'Quantum-as-a-Service', value: 8, category: 'use', color: '#00ffd3' },
      ],
      links: [
        { source: 'equity', target: 'hardware', value: 10.5 },
        { source: 'equity', target: 'team', value: 8.4 },
        { source: 'equity', target: 'product', value: 5.6 },
        { source: 'equity', target: 'operations', value: 4.9 },
        { source: 'equity', target: 'cloud', value: 5.6 },
        { source: 'debt', target: 'hardware', value: 3.2 },
        { source: 'debt', target: 'operations', value: 1.6 },
        { source: 'debt', target: 'cloud', value: 1.6 },
        { source: 'revenue', target: 'team', value: 2.1 },
        { source: 'revenue', target: 'product', value: 2.4 },
        { source: 'revenue', target: 'operations', value: 0.7 },
        { source: 'revenue', target: 'cloud', value: 0.8 },
      ]
    }
  }
];

interface FundingFlowChartProps {
  className?: string;
}

export default function FundingFlowChart({ className = '' }: FundingFlowChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 600;
    const margin = { top: 20, right: 150, bottom: 20, left: 150 };

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Get current round data
    const currentData = fundingRounds[currentRound].data;

    // Create sankey generator
    const sankeyGenerator = sankey<FundingNode, FundingLink>()
      .nodeWidth(20)
      .nodePadding(20)
      .extent([[0, 0], [innerWidth, innerHeight]]);

    // Process data
    const graph: SankeyGraph<FundingNode, FundingLink> = {
      nodes: currentData.nodes.map(d => ({ ...d })),
      links: currentData.links.map(d => ({ ...d }))
    };

    sankeyGenerator(graph);

    // Create gradient definitions
    const defs = svg.append('defs');

    graph.links.forEach((link, i) => {
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${i}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', (link.source as any).x1)
        .attr('x2', (link.target as any).x0);

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', (link.source as any).color);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', (link.target as any).color);
    });

    // Draw links
    const links = g.append('g')
      .selectAll('path')
      .data(graph.links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('fill', 'none')
      .attr('stroke', (d, i) => `url(#gradient-${i})`)
      .attr('stroke-width', (d: any) => Math.max(1, d.width))
      .attr('opacity', 0.5)
      .on('mouseenter', function(event, d: any) {
        const pathId = `${d.source.id}-${d.target.id}`;
        setHoveredPath(pathId);

        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.8)
          .attr('stroke-width', (d: any) => Math.max(1, d.width) * 1.5);
      })
      .on('mouseleave', function() {
        setHoveredPath(null);

        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.5)
          .attr('stroke-width', (d: any) => Math.max(1, d.width));
      });

    // Draw nodes
    const nodes = g.append('g')
      .selectAll('rect')
      .data(graph.nodes)
      .join('rect')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('height', (d: any) => Math.max(1, d.y1 - d.y0))
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('fill', (d: any) => d.color)
      .attr('opacity', 0.9)
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('click', (event, d: any) => {
        setSelectedNode(d.id === selectedNode ? null : d.id);
      })
      .on('mouseenter', function(event, d: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 1)
          .style('filter', 'drop-shadow(0 0 10px rgba(4, 163, 255, 0.5))');
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.9)
          .style('filter', 'none');
      });

    // Add node labels
    const labels = g.append('g')
      .selectAll('text')
      .data(graph.nodes)
      .join('text')
      .attr('x', (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < innerWidth / 2 ? 'start' : 'end')
      .attr('fill', '#fff')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .text((d: any) => d.name);

    // Add value labels
    const valueLabels = g.append('g')
      .selectAll('text.value')
      .data(graph.nodes)
      .join('text')
      .attr('class', 'value')
      .attr('x', (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2 + 16)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < innerWidth / 2 ? 'start' : 'end')
      .attr('fill', '#999')
      .attr('font-size', '11px')
      .text((d: any) => `€${d.value.toFixed(1)}M`);

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      svg.attr('width', newWidth)
        .attr('viewBox', `0 0 ${newWidth} ${height}`);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [currentRound, selectedNode]);

  const exportSVG = () => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'funding-flow-diagram.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentData = fundingRounds[currentRound];
  const burnRate = currentData.data.nodes
    .filter(n => n.id === 'operations')
    .reduce((sum, n) => sum + n.value, 0);
  const monthlyBurn = burnRate / 12;
  const runway = currentData.amount / monthlyBurn;

  return (
    <div className={`relative ${className}`}>
      {/* Timeline Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          {fundingRounds.map((round, index) => (
            <button
              key={round.year}
              onClick={() => setCurrentRound(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentRound === index
                  ? 'bg-gradient-to-r from-[#04a3ff] to-[#00ffd3] text-white'
                  : 'bg-gray-800/90 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              {round.year} - {round.name}<br/>
              <span className="text-xs opacity-75">€{round.amount}M</span>
            </button>
          ))}
        </div>

        <button
          onClick={exportSVG}
          className="px-4 py-2 bg-gray-800/90 text-white rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors text-sm"
        >
          Export SVG
        </button>
      </div>

      {/* Chart Container */}
      <div
        ref={containerRef}
        className="w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {currentData.name} - Capital Allocation Flow
          </h3>
          <div className="flex gap-4 text-sm">
            <div className="text-gray-300">
              <span className="font-semibold text-white">Total:</span> €{currentData.amount}M
            </div>
            <div className="text-gray-300">
              <span className="font-semibold text-white">Runway:</span> {runway.toFixed(1)} months
            </div>
          </div>
        </div>

        <svg ref={svgRef} className="w-full" />

        {/* Burn Rate Warning */}
        {runway < 6 && (
          <div className="mt-4 p-3 bg-orange-500/20 border border-orange-500/50 rounded-lg">
            <p className="text-orange-200 text-sm">
              ⚠️ <strong>Warning:</strong> Operations allocation provides less than 6 months runway at current burn rate (€{monthlyBurn.toFixed(2)}M/month)
            </p>
          </div>
        )}
      </div>

      {/* Hover Info Panel */}
      {hoveredPath && (
        <div className="absolute top-20 right-4 bg-gray-900/95 backdrop-blur-sm p-4 rounded-xl border-2 border-[#04a3ff] max-w-xs z-20">
          <h4 className="font-semibold text-white mb-2">Flow Details</h4>
          <p className="text-sm text-gray-300">
            Hover over flows to see allocation details
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h4 className="font-semibold text-white mb-3 text-sm">Funding Sources</h4>
          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#04a3ff] rounded"></div>
              <span>Equity Investors (Primary)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#0066cc] rounded"></div>
              <span>Debt Financing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#00b8d4] rounded"></div>
              <span>Grants & Subsidies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#10b981] rounded"></div>
              <span>Revenue Recycling (2026+)</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h4 className="font-semibold text-white mb-3 text-sm">Capital Allocation</h4>
          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#8b5cf6] rounded"></div>
              <span>Hardware Acquisition (25%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#3b82f6] rounded"></div>
              <span>Team Expansion (35%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#10b981] rounded"></div>
              <span>Product Development (15%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f97316] rounded"></div>
              <span>Operations (15%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#00ffd3] rounded"></div>
              <span>Quantum Cloud (10%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Indicators */}
      <div className="mt-4 bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h4 className="font-semibold text-white mb-3 text-sm">Expected ROI by Category</h4>
        <div className="grid grid-cols-5 gap-3 text-xs">
          <div className="text-center">
            <div className="text-purple-400 font-bold text-lg">3.5x</div>
            <div className="text-gray-400">Hardware</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold text-lg">5.2x</div>
            <div className="text-gray-400">Team</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-bold text-lg">8.1x</div>
            <div className="text-gray-400">Product</div>
          </div>
          <div className="text-center">
            <div className="text-orange-400 font-bold text-lg">2.8x</div>
            <div className="text-gray-400">Operations</div>
          </div>
          <div className="text-center">
            <div className="text-cyan-400 font-bold text-lg">12.4x</div>
            <div className="text-gray-400">Cloud</div>
          </div>
        </div>
      </div>
    </div>
  );
}
