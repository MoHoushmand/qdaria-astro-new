import React, { useState } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/qdaria-business-plan/ui/card';
import { Badge } from '@/components/qdaria-business-plan/ui/badge';

interface SWOTItem {
  category: string;
  score: number;
  item: string;
}

interface SWOTData {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
}

const swotData: SWOTData = {
  strengths: [
    { category: 'Technology', score: 9, item: 'Fibonacci anyon technology' },
    { category: 'Partnerships', score: 8, item: 'Rigetti collaboration' },
    { category: 'Market Position', score: 7, item: 'First-mover Nordic' },
    { category: 'Team', score: 8, item: 'Quantum PhDs + AI experts' },
    { category: 'Product Portfolio', score: 9, item: '7 venture products' },
  ],
  weaknesses: [
    { category: 'Scale', score: 3, item: 'Startup size' },
    { category: 'Unproven Tech', score: 4, item: 'Topological qubits' },
    { category: 'Capital', score: 5, item: 'Limited funding vs. IBM' },
  ],
  opportunities: [
    { category: 'Market Growth', score: 10, item: '$1.3T by 2035' },
    { category: 'First-Mover', score: 9, item: 'Nordic quantum leader' },
    { category: 'AI Synergy', score: 8, item: 'Q+AI convergence' },
  ],
  threats: [
    { category: 'Competition', score: 7, item: 'IBM, Google entry' },
    { category: 'Technical Risk', score: 6, item: 'Scaling challenges' },
    { category: 'Market Risk', score: 5, item: 'Adoption timeline' },
  ],
};

export const SWOTChart: React.FC = () => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<keyof SWOTData | null>(null);

  // Transform data for radar chart
  const radarData = [
    {
      metric: 'Technology',
      Strengths: swotData.strengths.find(s => s.category === 'Technology')?.score || 0,
      Weaknesses: 10 - (swotData.weaknesses.find(w => w.category === 'Unproven Tech')?.score || 0),
      Opportunities: swotData.opportunities.find(o => o.category === 'AI Synergy')?.score || 0,
      Threats: 10 - (swotData.threats.find(t => t.category === 'Technical Risk')?.score || 0),
    },
    {
      metric: 'Market',
      Strengths: swotData.strengths.find(s => s.category === 'Market Position')?.score || 0,
      Weaknesses: 10 - (swotData.weaknesses.find(w => w.category === 'Capital')?.score || 0),
      Opportunities: swotData.opportunities.find(o => o.category === 'Market Growth')?.score || 0,
      Threats: 10 - (swotData.threats.find(t => t.category === 'Market Risk')?.score || 0),
    },
    {
      metric: 'Competition',
      Strengths: swotData.strengths.find(s => s.category === 'Partnerships')?.score || 0,
      Weaknesses: 10 - (swotData.weaknesses.find(w => w.category === 'Scale')?.score || 0),
      Opportunities: swotData.opportunities.find(o => o.category === 'First-Mover')?.score || 0,
      Threats: 10 - (swotData.threats.find(t => t.category === 'Competition')?.score || 0),
    },
    {
      metric: 'Resources',
      Strengths: swotData.strengths.find(s => s.category === 'Team')?.score || 0,
      Weaknesses: 10 - (swotData.weaknesses.find(w => w.category === 'Capital')?.score || 0),
      Opportunities: swotData.opportunities.find(o => o.category === 'AI Synergy')?.score || 0,
      Threats: 10 - (swotData.threats.find(t => t.category === 'Competition')?.score || 0),
    },
    {
      metric: 'Innovation',
      Strengths: swotData.strengths.find(s => s.category === 'Product Portfolio')?.score || 0,
      Weaknesses: 10 - (swotData.weaknesses.find(w => w.category === 'Unproven Tech')?.score || 0),
      Opportunities: swotData.opportunities.find(o => o.category === 'Market Growth')?.score || 0,
      Threats: 10 - (swotData.threats.find(t => t.category === 'Technical Risk')?.score || 0),
    },
  ];

  const quadrantColors = {
    strengths: { bg: 'bg-emerald-500/10', border: 'border-emerald-500', text: 'text-emerald-400', badge: 'bg-emerald-500' },
    weaknesses: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-400', badge: 'bg-red-500' },
    opportunities: { bg: 'bg-blue-500/10', border: 'border-blue-500', text: 'text-blue-400', badge: 'bg-blue-500' },
    threats: { bg: 'bg-amber-500/10', border: 'border-amber-500', text: 'text-amber-400', badge: 'bg-amber-500' },
  };

  const QuadrantCard: React.FC<{
    title: string;
    items: SWOTItem[];
    quadrant: keyof SWOTData;
    icon: string;
  }> = ({ title, items, quadrant, icon }) => {
    const colors = quadrantColors[quadrant];
    const isSelected = selectedQuadrant === quadrant;

    return (
      <Card
        className={`relative cursor-pointer transition-all duration-300 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 ${colors.border} ${
          isSelected ? 'ring-4 ring-white/20 scale-105' : 'hover:scale-102'
        }`}
        onClick={() => setSelectedQuadrant(isSelected ? null : quadrant)}
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        aria-label={`${title} quadrant with ${items.length} items. ${items.map(i => `${i.category}: ${i.item} (${i.score}/10)`).join(', ')}. Click to ${isSelected ? 'collapse' : 'expand'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedQuadrant(isSelected ? null : quadrant);
          }
        }}
      >
        <CardHeader className="pb-3">
          <CardTitle className={`flex items-center gap-2 text-lg ${colors.text}`}>
            <span className="text-2xl">{icon}</span>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${colors.border} ${colors.bg} transition-all hover:bg-white/5`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-white text-sm">{item.category}</span>
                <Badge className={`${colors.badge} text-white text-xs`}>
                  {item.score}/10
                </Badge>
              </div>
              <p className="text-xs text-gray-400">{item.item}</p>

              {/* Score bar */}
              <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.badge} transition-all duration-500`}
                  style={{ width: `${item.score * 10}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* Radar Chart */}
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">📊</span>
            SWOT Analysis Radar
          </CardTitle>
          <p className="text-sm text-gray-400 mt-2">
            Interactive visualization of QDaria's strategic position across key dimensions
          </p>
        </CardHeader>
        <CardContent>
          <div
            className="h-[500px] w-full"
            role="region"
            aria-label="SWOT analysis radar chart showing QDaria's strategic position across 5 metrics: Technology, Market, Competition, Resources, and Innovation. Strengths: Fibonacci anyon technology (9/10), 7 venture products (9/10), Rigetti collaboration (8/10). Opportunities: $1.3T market by 2035 (10/10), Nordic first-mover (9/10). Weaknesses: Startup scale (3/10), unproven topological qubits (4/10). Threats: IBM/Google competition (7/10), technical scaling risk (6/10)"
            tabIndex={0}
          >
            <ResponsiveRadar
              data={radarData}
              keys={['Strengths', 'Opportunities', 'Weaknesses', 'Threats']}
              indexBy="metric"
              title="SWOT analysis across technology, market, competition, resources, and innovation"
              maxValue={10}
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              curve="linearClosed"
              borderWidth={2}
              borderColor={{ from: 'color' }}
              gridLevels={5}
              gridShape="circular"
              gridLabelOffset={20}
              enableDots={true}
              dotSize={8}
              dotColor={{ theme: 'background' }}
              dotBorderWidth={2}
              dotBorderColor={{ from: 'color' }}
              enableDotLabel={true}
              dotLabel="value"
              dotLabelYOffset={-12}
              colors={['#10b981', '#3b82f6', '#ef4444', '#f59e0b']}
              fillOpacity={0.25}
              blendMode="multiply"
              animate={true}
              motionConfig="gentle"
              isInteractive={true}
              theme={{
                background: 'transparent',
                text: {
                  fill: '#e5e7eb',
                  fontSize: 12,
                  fontFamily: 'Inter, system-ui, sans-serif',
                },
                grid: {
                  line: {
                    stroke: '#374151',
                    strokeWidth: 1,
                  },
                },
                tooltip: {
                  container: {
                    background: '#1f2937',
                    color: '#e5e7eb',
                    fontSize: '13px',
                    borderRadius: '8px',
                    border: '1px solid #4b5563',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  },
                },
              }}
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: '#e5e7eb',
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#fff',
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* 4-Quadrant Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuadrantCard
          title="Strengths"
          items={swotData.strengths}
          quadrant="strengths"
          icon="💪"
        />
        <QuadrantCard
          title="Weaknesses"
          items={swotData.weaknesses}
          quadrant="weaknesses"
          icon="⚠️"
        />
        <QuadrantCard
          title="Opportunities"
          items={swotData.opportunities}
          quadrant="opportunities"
          icon="🚀"
        />
        <QuadrantCard
          title="Threats"
          items={swotData.threats}
          quadrant="threats"
          icon="🛡️"
        />
      </div>

      {/* Strategic Insights Summary */}
      <Card className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Strategic Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <h4 className="font-semibold text-emerald-400 mb-2">Leverage Strengths</h4>
              <p className="text-sm text-gray-300">
                Capitalize on Fibonacci anyon technology and 7-product portfolio to accelerate Nordic market penetration.
              </p>
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Seize Opportunities</h4>
              <p className="text-sm text-gray-300">
                $1.3T market by 2035 + first-mover advantage = capture 5-10% Nordic quantum computing market share.
              </p>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">Address Weaknesses</h4>
              <p className="text-sm text-gray-300">
                Secure Series A funding to scale team and validate topological qubit technology through Rigetti partnership.
              </p>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <h4 className="font-semibold text-amber-400 mb-2">Mitigate Threats</h4>
              <p className="text-sm text-gray-300">
                Differentiate through Nordic focus and Q+AI synergy before IBM/Google establish regional presence.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
