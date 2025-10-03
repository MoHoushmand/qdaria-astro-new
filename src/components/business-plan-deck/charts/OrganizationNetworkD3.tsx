import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { qdariaBrand } from '../styles/design-tokens';

interface NetworkNode {
  id: string;
  name: string;
  role: string;
  type: 'leadership' | 'team' | 'advisor';
}

interface NetworkLink {
  source: string;
  target: string;
  relationship: string;
}

export const OrganizationNetworkD3 = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const nodes: NetworkNode[] = [
      { id: 'ceo', name: 'Mo Sharif', role: 'CEO & Co-Founder', type: 'leadership' },
      { id: 'cto', name: 'Daria Sharif', role: 'CTO & Co-Founder', type: 'leadership' },
      { id: 'cso', name: 'Dr. Gaspar Ramalho', role: 'CSO', type: 'leadership' },
      { id: 'eng1', name: 'Engineering Team', role: '8 PhDs', type: 'team' },
      { id: 'research', name: 'Research Team', role: 'Quantum AI', type: 'team' },
      { id: 'sales', name: 'Sales Team', role: 'Enterprise', type: 'team' },
      { id: 'ops', name: 'Operations', role: 'Support', type: 'team' },
      { id: 'advisor1', name: 'Prof. John Smith', role: 'Quantum Physics', type: 'advisor' },
      { id: 'advisor2', name: 'Jane Doe', role: 'AI/ML', type: 'advisor' },
      { id: 'advisor3', name: 'Dr. Bob Johnson', role: 'Business', type: 'advisor' }
    ];

    const links: NetworkLink[] = [
      { source: 'ceo', target: 'cto', relationship: 'Co-Founders' },
      { source: 'ceo', target: 'cso', relationship: 'Reports To' },
      { source: 'cto', target: 'eng1', relationship: 'Manages' },
      { source: 'cto', target: 'research', relationship: 'Manages' },
      { source: 'ceo', target: 'sales', relationship: 'Manages' },
      { source: 'ceo', target: 'ops', relationship: 'Manages' },
      { source: 'cso', target: 'research', relationship: 'Collaborates' },
      { source: 'ceo', target: 'advisor1', relationship: 'Advises' },
      { source: 'cto', target: 'advisor2', relationship: 'Advises' },
      { source: 'ceo', target: 'advisor3', relationship: 'Advises' }
    ];

    const width = svgRef.current.clientWidth;
    const height = 500;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const colorScale: Record<string, string> = {
      leadership: qdariaBrand.colors.primary,
      team: qdariaBrand.colors.cyan,
      advisor: qdariaBrand.colors.green
    };

    const sizeScale: Record<string, number> = {
      leadership: 40,
      team: 30,
      advisor: 25
    };

    // Create force simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    // Add links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'rgba(4, 163, 255, 0.3)')
      .attr('stroke-width', 2);

    // Add link labels
    const linkLabel = svg.append('g')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(229, 231, 235, 0.5)')
      .style('font-size', '10px')
      .text(d => d.relationship);

    // Add nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .style('cursor', 'pointer')
      .call(d3.drag<any, any>()
        .on('start', (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event: any, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Add circles
    node.append('circle')
      .attr('r', d => sizeScale[d.type])
      .attr('fill', d => colorScale[d.type])
      .attr('stroke', '#000212')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 0 8px rgba(4, 163, 255, 0.4))');

    // Add labels
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', d => sizeScale[d.type] + 20)
      .attr('fill', '#e5e7eb')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => d.name);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', d => sizeScale[d.type] + 33)
      .attr('fill', 'rgba(229, 231, 235, 0.7)')
      .style('font-size', '10px')
      .text(d => d.role);

    // Update positions on tick
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
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

  }, []);

  return (
    <div className="business-plan-section p-8">
      <h3 className="business-plan-heading text-2xl mb-6">Organization Structure & Relationships</h3>
      <svg ref={svgRef} className="w-full" style={{ minHeight: '500px' }} />
      <div className="mt-6 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: qdariaBrand.colors.primary }}></div>
          <span className="text-[#e5e7eb]/80">Leadership</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: qdariaBrand.colors.cyan }}></div>
          <span className="text-[#e5e7eb]/80">Teams</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: qdariaBrand.colors.green }}></div>
          <span className="text-[#e5e7eb]/80">Advisors</span>
        </div>
      </div>
    </div>
  );
};
