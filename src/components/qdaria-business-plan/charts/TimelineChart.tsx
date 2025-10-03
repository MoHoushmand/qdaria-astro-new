import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Milestone {
  date: string;
  event: string;
  type: 'founding' | 'funding' | 'product' | 'infrastructure' | 'corporate' | 'ipo' | 'breakthrough' | 'milestone';
}

interface Phase {
  phase: string;
  start: string;
  end: string;
  milestones: Milestone[];
}

interface TimelineChartProps {
  data?: Phase[];
  width?: number;
  height?: number;
  className?: string;
}

const DEFAULT_DATA: Phase[] = [
  {
    phase: 'Phase 1: Foundation',
    start: '2024-Q1',
    end: '2025-Q4',
    milestones: [
      { date: '2024-Q1', event: 'Company Founded', type: 'founding' },
      { date: '2024-Q2', event: 'Seed Round ($12M)', type: 'funding' },
      { date: '2024-Q4', event: 'Novera QPU Deployment', type: 'product' },
      { date: '2025-Q2', event: 'Zipminator Beta', type: 'product' },
      { date: '2025-Q4', event: 'Norway Quantum Facility', type: 'infrastructure' },
    ],
  },
  {
    phase: 'Phase 2: Growth',
    start: '2026-Q1',
    end: '2027-Q4',
    milestones: [
      { date: '2026-Q2', event: 'Series A ($8M)', type: 'funding' },
      { date: '2026-Q4', event: 'Qm9 Launch', type: 'product' },
      { date: '2027-Q2', event: 'Series B ($20M)', type: 'funding' },
      { date: '2027-Q4', event: 'QDaria Holdings Formation', type: 'corporate' },
    ],
  },
  {
    phase: 'Phase 3: IPO',
    start: '2028-Q1',
    end: '2030-Q4',
    milestones: [
      { date: '2028-Q3', event: 'Zipminator IPO ($100M)', type: 'ipo' },
      { date: '2029-Q2', event: 'Qm9 IPO', type: 'ipo' },
      { date: '2029-Q4', event: 'QDiana IPO', type: 'ipo' },
      { date: '2030-Q3', event: 'QMikeAI IPO', type: 'ipo' },
    ],
  },
  {
    phase: 'Phase 4: Global Expansion',
    start: '2031-Q1',
    end: '2035-Q4',
    milestones: [
      { date: '2033-Q1', event: 'Topological QPU Launch', type: 'breakthrough' },
      { date: '2035-Q4', event: '$1B Revenue Target', type: 'milestone' },
    ],
  },
];

const TimelineChart: React.FC<TimelineChartProps> = ({
  data = DEFAULT_DATA,
  width = 1200,
  height = 600,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Dimensions and margins
    const margin = { top: 80, right: 40, bottom: 60, left: 120 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Parse date from Q format (e.g., "2024-Q1" -> Date)
    const parseQuarter = (qStr: string): Date => {
      const [year, quarter] = qStr.split('-Q');
      const month = (parseInt(quarter) - 1) * 3;
      return new Date(parseInt(year), month, 1);
    };

    // Get date range
    const allDates = data.flatMap((phase) => [
      parseQuarter(phase.start),
      parseQuarter(phase.end),
      ...phase.milestones.map((m) => parseQuarter(m.date)),
    ]);
    const minDate = d3.min(allDates) || new Date(2024, 0, 1);
    const maxDate = d3.max(allDates) || new Date(2035, 11, 31);

    // Scales
    const xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, chartWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.phase))
      .range([0, chartHeight])
      .padding(0.3);

    // Color schemes
    const phaseColors = [
      'url(#gradient-phase-1)',
      'url(#gradient-phase-2)',
      'url(#gradient-phase-3)',
      'url(#gradient-phase-4)',
    ];

    const milestoneColors: Record<Milestone['type'], string> = {
      founding: '#8b5cf6',
      funding: '#10b981',
      product: '#3b82f6',
      infrastructure: '#f59e0b',
      corporate: '#ec4899',
      ipo: '#ef4444',
      breakthrough: '#06b6d4',
      milestone: '#6366f1',
    };

    // SVG setup
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    // Gradients
    const defs = svg.append('defs');

    phaseColors.forEach((_, i) => {
      const gradient = defs
        .append('linearGradient')
        .attr('id', `gradient-phase-${i + 1}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      gradient.append('stop').attr('offset', '0%').attr('stop-color', '#8b5cf6').attr('stop-opacity', 0.8);
      gradient.append('stop').attr('offset', '100%').attr('stop-color', '#3b82f6').attr('stop-opacity', 0.6);
    });

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .translateExtent([
        [-margin.left, -margin.top],
        [width + margin.right, height + margin.bottom],
      ])
      .on('zoom', (event) => {
        chartGroup.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Main chart group
    const chartGroup = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Grid lines
    chartGroup
      .append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(xScale.ticks(d3.timeYear.every(1) || d3.timeYear))
      .join('line')
      .attr('x1', (d) => xScale(d))
      .attr('x2', (d) => xScale(d))
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('stroke', '#334155')
      .attr('stroke-opacity', 0.2)
      .attr('stroke-dasharray', '2,2');

    // X-axis
    const xAxis = d3.axisBottom(xScale).ticks(d3.timeYear.every(1)).tickFormat(d3.timeFormat('%Y') as any);

    chartGroup
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .style('font-size', '12px');

    chartGroup.selectAll('.x-axis path, .x-axis line').attr('stroke', '#475569');

    // Y-axis
    const yAxis = d3.axisLeft(yScale);

    chartGroup
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#cbd5e1')
      .style('font-size', '13px')
      .style('font-weight', '600');

    chartGroup.selectAll('.y-axis path, .y-axis line').attr('stroke', '#475569');

    // Phase bars
    chartGroup
      .selectAll('.phase-bar')
      .data(data)
      .join('rect')
      .attr('class', 'phase-bar')
      .attr('x', (d) => xScale(parseQuarter(d.start)))
      .attr('y', (d) => yScale(d.phase) || 0)
      .attr('width', (d) => xScale(parseQuarter(d.end)) - xScale(parseQuarter(d.start)))
      .attr('height', yScale.bandwidth())
      .attr('fill', (_, i) => phaseColors[i])
      .attr('rx', 8)
      .attr('stroke', '#64748b')
      .attr('stroke-width', 1)
      .style('opacity', 0.7)
      .style('cursor', 'pointer')
      .on('mouseenter', function () {
        d3.select(this).style('opacity', 0.9);
      })
      .on('mouseleave', function () {
        d3.select(this).style('opacity', 0.7);
      });

    // Milestone icons
    const milestoneIcons: Record<Milestone['type'], string> = {
      founding: '★',
      funding: '💰',
      product: '🚀',
      infrastructure: '🏗️',
      corporate: '🏢',
      ipo: '📈',
      breakthrough: '⚡',
      milestone: '🎯',
    };

    data.forEach((phase) => {
      const phaseY = yScale(phase.phase) || 0;
      const phaseMidY = phaseY + yScale.bandwidth() / 2;

      phase.milestones.forEach((milestone) => {
        const x = xScale(parseQuarter(milestone.date));

        // Milestone line
        chartGroup
          .append('line')
          .attr('x1', x)
          .attr('x2', x)
          .attr('y1', phaseY)
          .attr('y2', phaseY + yScale.bandwidth())
          .attr('stroke', milestoneColors[milestone.type])
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '4,2')
          .style('opacity', 0.5);

        // Milestone marker
        const markerGroup = chartGroup
          .append('g')
          .attr('transform', `translate(${x},${phaseMidY})`)
          .style('cursor', 'pointer');

        markerGroup
          .append('circle')
          .attr('r', 16)
          .attr('fill', milestoneColors[milestone.type])
          .attr('stroke', '#1e293b')
          .attr('stroke-width', 2)
          .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');

        markerGroup
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', '14px')
          .text(milestoneIcons[milestone.type]);

        // Hover interactions
        markerGroup
          .on('mouseenter', function (event) {
            d3.select(this).select('circle').transition().duration(200).attr('r', 20);

            setSelectedMilestone(milestone);

            if (tooltipRef.current) {
              const tooltip = d3.select(tooltipRef.current);
              tooltip
                .style('opacity', 1)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 10}px`)
                .html(
                  `
                  <div class="font-semibold text-sm mb-1">${milestone.event}</div>
                  <div class="text-xs text-gray-400">${milestone.date}</div>
                  <div class="text-xs text-gray-500 capitalize mt-1">${milestone.type}</div>
                `
                );
            }
          })
          .on('mouseleave', function () {
            d3.select(this).select('circle').transition().duration(200).attr('r', 16);

            if (tooltipRef.current) {
              d3.select(tooltipRef.current).style('opacity', 0);
            }
          });
      });
    });

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('fill', '#e2e8f0')
      .style('font-size', '20px')
      .style('font-weight', '700')
      .text('Strategic Roadmap 2024-2035');

    // Legend
    const legendData = Object.entries(milestoneIcons).map(([type, icon]) => ({
      type: type as Milestone['type'],
      icon,
      color: milestoneColors[type as Milestone['type']],
    }));

    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${margin.left},${height - 40})`);

    const legendItems = legend
      .selectAll('.legend-item')
      .data(legendData)
      .join('g')
      .attr('class', 'legend-item')
      .attr('transform', (_, i) => `translate(${i * 120},0)`);

    legendItems
      .append('circle')
      .attr('r', 8)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('fill', (d) => d.color);

    legendItems
      .append('text')
      .attr('x', 15)
      .attr('y', 4)
      .attr('fill', '#94a3b8')
      .style('font-size', '11px')
      .text((d) => `${d.icon} ${d.type}`);
  }, [data, width, height]);

  return (
    <div className={`relative ${className}`}>
      <svg ref={svgRef} className="w-full h-auto bg-slate-900 rounded-lg" />
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 shadow-xl opacity-0 transition-opacity z-50"
        style={{ maxWidth: '250px' }}
      />

      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => {
            if (svgRef.current) {
              const svg = d3.select(svgRef.current);
              svg.transition().duration(750).call(
                d3.zoom<SVGSVGElement, unknown>().transform as any,
                d3.zoomIdentity
              );
            }
          }}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded text-sm font-medium transition-colors"
        >
          Reset Zoom
        </button>
      </div>

      {/* Info panel */}
      <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-slate-300">Interactive Controls:</span> Scroll to zoom, drag to pan, hover over milestones for details
        </p>
        {selectedMilestone && (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <p className="text-sm font-semibold text-slate-200">{selectedMilestone.event}</p>
            <p className="text-xs text-slate-400 mt-1">
              {selectedMilestone.date} • {selectedMilestone.type}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineChart;
