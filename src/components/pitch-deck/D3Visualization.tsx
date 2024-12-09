'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';

interface D3VisualizationProps {
  className?: string;
}

const D3Visualization: React.FC<D3VisualizationProps> = ({ className }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Create/update visualization
  useEffect(() => {
    if (!ref.current || dimensions.width === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear previous content

    // Set SVG dimensions
    svg
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('viewBox', [0, 0, dimensions.width, dimensions.height].join(' '));

    // Create gradient
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'quantum-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6') // blue-500
      .attr('stop-opacity', 0.8);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8b5cf6') // purple-500
      .attr('stop-opacity', 0.8);

    // Create quantum circuit visualization
    const circuitGroup = svg
      .append('g')
      .attr('transform', `translate(${dimensions.width / 2}, ${dimensions.height / 2})`);

    // Add quantum gates
    const gateRadius = Math.min(dimensions.width, dimensions.height) * 0.1;
    const gates = [-2, -1, 0, 1, 2];

    gates.forEach((x, i) => {
      circuitGroup
        .append('circle')
        .attr('cx', x * gateRadius * 2)
        .attr('cy', 0)
        .attr('r', gateRadius)
        .attr('fill', 'url(#quantum-gradient)')
        .attr('stroke', '#60a5fa') // blue-400
        .attr('stroke-width', 2)
        .attr('opacity', 0)
        .transition()
        .delay(i * 200)
        .duration(500)
        .attr('opacity', 1);

      // Add connecting lines
      if (i < gates.length - 1) {
        circuitGroup
          .append('line')
          .attr('x1', x * gateRadius * 2 + gateRadius)
          .attr('y1', 0)
          .attr('x2', (x + 1) * gateRadius * 2 - gateRadius)
          .attr('y2', 0)
          .attr('stroke', '#60a5fa') // blue-400
          .attr('stroke-width', 2)
          .attr('opacity', 0)
          .transition()
          .delay(i * 200 + 100)
          .duration(500)
          .attr('opacity', 1);
      }
    });

    // Add pulsing animation
    function pulse() {
      circuitGroup
        .selectAll('circle')
        .transition()
        .duration(1500)
        .attr('r', gateRadius * 1.1)
        .transition()
        .duration(1500)
        .attr('r', gateRadius)
        .on('end', pulse);
    }

    pulse();

  }, [dimensions]);

  return (
    <div 
      ref={containerRef} 
      className={cn("w-full h-full min-h-[200px]", className)}
    >
      <svg 
        ref={ref}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default D3Visualization;
