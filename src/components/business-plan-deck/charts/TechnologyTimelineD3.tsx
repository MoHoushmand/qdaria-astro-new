import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { qdariaBrand } from '../styles/design-tokens';

interface TimelineEvent {
  date: Date;
  title: string;
  description: string;
  type: 'milestone' | 'product' | 'achievement';
}

export const TechnologyTimelineD3 = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const events: TimelineEvent[] = [
      { date: new Date('2023-03-01'), title: 'QDaria Founded', description: 'Company inception', type: 'milestone' },
      { date: new Date('2023-06-01'), title: 'Zipminator v1.0', description: 'First product launch', type: 'product' },
      { date: new Date('2023-09-01'), title: 'First Patent Filed', description: 'Topological quantum computing', type: 'achievement' },
      { date: new Date('2023-12-01'), title: 'Qm9 Launch', description: 'Quantum Materials Simulator', type: 'product' },
      { date: new Date('2024-03-01'), title: '10 Enterprise Customers', description: 'Revenue milestone', type: 'milestone' },
      { date: new Date('2024-06-01'), title: 'Series A Close', description: '€12M funding round', type: 'milestone' },
      { date: new Date('2024-09-01'), title: 'QDiana Beta', description: 'Next-gen platform', type: 'product' },
      { date: new Date('2024-12-01'), title: '50+ Customers', description: 'Market expansion', type: 'milestone' },
      { date: new Date('2025-03-01'), title: 'QDiana Production', description: 'Full launch', type: 'product' },
      { date: new Date('2025-06-01'), title: 'Series B Target', description: '€50M+ valuation', type: 'milestone' }
    ];

    const margin = { top: 60, right: 30, bottom: 60, left: 30 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleTime()
      .domain([d3.min(events, d => d.date)!, d3.max(events, d => d.date)!])
      .range([0, width]);

    const colorScale: Record<string, string> = {
      milestone: qdariaBrand.colors.primary,
      product: qdariaBrand.colors.cyan,
      achievement: qdariaBrand.colors.green
    };

    // Draw timeline line
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', height / 2)
      .attr('y2', height / 2)
      .attr('stroke', 'rgba(4, 163, 255, 0.3)')
      .attr('stroke-width', 2);

    // Add axis
    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickFormat(d3.timeFormat('%b %Y') as any);

    svg.append('g')
      .attr('transform', `translate(0,${height / 2 + 30})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#e5e7eb')
      .style('font-size', '12px');

    svg.select('.domain').attr('stroke', 'rgba(4, 163, 255, 0.3)');
    svg.selectAll('.tick line').attr('stroke', 'rgba(4, 163, 255, 0.3)');

    // Add event nodes
    const nodes = svg.selectAll('.event-node')
      .data(events)
      .enter()
      .append('g')
      .attr('class', 'event-node')
      .attr('transform', (d, i) => {
        const x = xScale(d.date);
        const y = i % 2 === 0 ? height / 2 - 80 : height / 2 + 80;
        return `translate(${x},${y})`;
      });

    // Add circles
    nodes.append('circle')
      .attr('r', 8)
      .attr('fill', d => colorScale[d.type])
      .attr('stroke', '#000212')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 12)
          .attr('filter', 'drop-shadow(0 0 10px rgba(4, 163, 255, 0.8))');
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 8)
          .attr('filter', 'none');
      });

    // Add connecting lines to timeline
    nodes.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', (d, i) => i % 2 === 0 ? 80 : -80)
      .attr('stroke', d => colorScale[d.type])
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3')
      .attr('opacity', 0.5);

    // Add labels
    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d, i) => i % 2 === 0 ? -15 : 25)
      .attr('fill', '#e5e7eb')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => d.title);

    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d, i) => i % 2 === 0 ? -2 : 38)
      .attr('fill', 'rgba(229, 231, 235, 0.7)')
      .style('font-size', '10px')
      .text(d => d.description);

  }, []);

  return (
    <div className="business-plan-section p-8">
      <h3 className="business-plan-heading text-2xl mb-6">Technology Development Timeline</h3>
      <svg ref={svgRef} className="w-full" style={{ minHeight: '400px' }} />
      <div className="mt-6 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: qdariaBrand.colors.primary }}></div>
          <span className="text-[#e5e7eb]/80">Milestones</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: qdariaBrand.colors.cyan }}></div>
          <span className="text-[#e5e7eb]/80">Products</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: qdariaBrand.colors.green }}></div>
          <span className="text-[#e5e7eb]/80">Achievements</span>
        </div>
      </div>
    </div>
  );
};
