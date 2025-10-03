import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { qdariaBrand } from '../styles/design-tokens';

interface MarketData {
  region: string;
  x: number;
  y: number;
  revenue: number;
  customers: number;
  growth: number;
}

export const GeographicMarketD3 = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const markets: MarketData[] = [
      { region: 'Norway', x: 300, y: 180, revenue: 4.2, customers: 12, growth: 95 },
      { region: 'Germany', x: 350, y: 220, revenue: 3.8, customers: 10, growth: 88 },
      { region: 'UK', x: 280, y: 210, revenue: 3.5, customers: 9, growth: 82 },
      { region: 'France', x: 320, y: 250, revenue: 2.9, customers: 7, growth: 75 },
      { region: 'Benelux', x: 330, y: 200, revenue: 2.1, customers: 5, growth: 68 },
      { region: 'Nordics', x: 350, y: 150, revenue: 1.8, customers: 4, growth: 72 },
      { region: 'USA', x: 120, y: 230, revenue: 2.5, customers: 6, growth: 85 },
      { region: 'Canada', x: 100, y: 180, revenue: 0.9, customers: 2, growth: 55 }
    ];

    const width = svgRef.current.clientWidth;
    const height = 500;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Scale for bubble size
    const radiusScale = d3.scaleSqrt()
      .domain([0, d3.max(markets, d => d.revenue)!])
      .range([20, 80]);

    // Color scale based on growth
    const colorScale = d3.scaleLinear<string>()
      .domain([50, 75, 100])
      .range(['#f59e0b', qdariaBrand.colors.cyan, qdariaBrand.colors.green]);

    // Add bubbles
    const bubbles = svg.selectAll('.market-bubble')
      .data(markets)
      .enter()
      .append('g')
      .attr('class', 'market-bubble')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer');

    // Add circles with glow effect
    bubbles.append('circle')
      .attr('r', d => radiusScale(d.revenue))
      .attr('fill', d => colorScale(d.growth))
      .attr('fill-opacity', 0.6)
      .attr('stroke', d => colorScale(d.growth))
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 0 12px rgba(4, 163, 255, 0.5))')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', radiusScale(d.revenue) * 1.15)
          .attr('fill-opacity', 0.8)
          .style('filter', 'drop-shadow(0 0 20px rgba(4, 163, 255, 0.8))');
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', radiusScale(d.revenue))
          .attr('fill-opacity', 0.6)
          .style('filter', 'drop-shadow(0 0 12px rgba(4, 163, 255, 0.5))');
      });

    // Add region labels
    bubbles.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .attr('fill', '#e5e7eb')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(d => d.region);

    // Add revenue labels
    bubbles.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 12)
      .attr('fill', 'rgba(229, 231, 235, 0.9)')
      .style('font-size', '12px')
      .text(d => `€${d.revenue}M`);

    // Add customer count
    bubbles.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 26)
      .attr('fill', 'rgba(229, 231, 235, 0.7)')
      .style('font-size', '10px')
      .text(d => `${d.customers} customers`);

  }, []);

  return (
    <div className="business-plan-section p-8">
      <h3 className="business-plan-heading text-2xl mb-6">Geographic Market Distribution (Year 3)</h3>
      <svg ref={svgRef} className="w-full" style={{ minHeight: '500px' }} />
      <div className="mt-6 text-sm text-[#e5e7eb]/70">
        <p><strong className="text-[#00ffd3]">Market Insights:</strong> Bubble size = revenue, Color intensity = growth rate</p>
        <p className="mt-2">Primary focus: European markets (Norway, Germany, UK) with expansion to North America</p>
      </div>
    </div>
  );
};
