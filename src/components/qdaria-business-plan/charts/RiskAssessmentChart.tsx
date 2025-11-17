import React, { useState } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/qdaria-business-plan/ui/card';
import { Button } from '@/components/qdaria-business-plan/ui/button';
import { Badge } from '@/components/qdaria-business-plan/ui/badge';
import { AlertTriangle, Shield, TrendingDown } from 'lucide-react';

// QDaria Brand Colors
const COLORS = {
  primary: '#04a3ff',
  secondary: '#00ffd3',
  tertiary: '#65ff00',
  danger: '#ff4444',
  success: '#65ff00',
  bg: '#000212',
  grid: '#1a1a2e',
  text: '#e0e0e0',
  textMuted: '#a0a0a0',
};

// Risk dimension data (0-10 scale, higher = more risk)
const riskData = [
  {
    dimension: 'Technical',
    'Current Risk': 7,
    'Mitigated Risk': 3,
    description: 'Quantum hardware complexity and error rates',
    mitigation: 'Partnership with Rigetti, hybrid classical-quantum approach, continuous error correction research',
    severity: 'medium',
  },
  {
    dimension: 'Market',
    'Current Risk': 6,
    'Mitigated Risk': 2,
    description: 'Quantum computing market still emerging',
    mitigation: 'Diversified product portfolio, early adopter partnerships, educational initiatives',
    severity: 'medium',
  },
  {
    dimension: 'Financial',
    'Current Risk': 5,
    'Mitigated Risk': 2,
    description: 'Capital intensive operations and runway management',
    mitigation: 'Staged funding strategy, multiple revenue streams, break-even path by 2028',
    severity: 'low',
  },
  {
    dimension: 'Operational',
    'Current Risk': 4,
    'Mitigated Risk': 1.5,
    description: 'Scaling team and infrastructure challenges',
    mitigation: 'Experienced management team, proven hiring pipeline, cloud-first architecture',
    severity: 'low',
  },
  {
    dimension: 'Regulatory',
    'Current Risk': 6,
    'Mitigated Risk': 2.5,
    description: 'Quantum export controls and cybersecurity standards',
    mitigation: 'EU-focused strategy, post-quantum crypto standards compliance, legal counsel',
    severity: 'medium',
  },
  {
    dimension: 'Competitive',
    'Current Risk': 7,
    'Mitigated Risk': 3,
    description: 'Competition from tech giants and quantum startups',
    mitigation: 'Topological quantum advantage, Nordic market leadership, strategic partnerships',
    severity: 'medium',
  },
];

interface MitigationPanelProps {
  dimension: typeof riskData[0] | null;
  onClose: () => void;
}

const MitigationPanel: React.FC<MitigationPanelProps> = ({ dimension, onClose }) => {
  if (!dimension) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const reduction = (
    ((dimension['Current Risk'] - dimension['Mitigated Risk']) / dimension['Current Risk']) *
    100
  ).toFixed(0);

  return (
    <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gradient-to-br from-[#000212] to-[#04a3ff]/10 border border-[#04a3ff]/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              {dimension.dimension} Risk Assessment
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Severity Badge */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Severity:</span>
            <Badge className={`${getSeverityColor(dimension.severity)} border`}>
              {dimension.severity.toUpperCase()}
            </Badge>
          </div>

          {/* Risk Scores */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-400">
                {dimension['Current Risk']}/10
              </div>
              <div className="text-xs text-gray-400 mt-1">Current Risk</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">
                {dimension['Mitigated Risk']}/10
              </div>
              <div className="text-xs text-gray-400 mt-1">Mitigated Risk</div>
            </div>
            <div className="bg-[#04a3ff]/10 border border-[#04a3ff]/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-[#04a3ff]">-{reduction}%</div>
              <div className="text-xs text-gray-400 mt-1">Risk Reduction</div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-[#04a3ff]/20 pt-4">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              Risk Description
            </h4>
            <p className="text-sm text-gray-300">{dimension.description}</p>
          </div>

          {/* Mitigation Strategy */}
          <div className="border-t border-[#04a3ff]/20 pt-4">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              Mitigation Strategy
            </h4>
            <p className="text-sm text-gray-300">{dimension.mitigation}</p>
          </div>

          {/* Progress Bar */}
          <div className="border-t border-[#04a3ff]/20 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Risk Mitigation Progress</span>
              <span className="text-xs font-semibold text-green-400">{reduction}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-[#65ff00] transition-all duration-500"
                style={{ width: `${reduction}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface RiskAssessmentChartProps {
  className?: string;
}

export const RiskAssessmentChart: React.FC<RiskAssessmentChartProps> = ({ className = '' }) => {
  const [showCurrent, setShowCurrent] = useState(true);
  const [showMitigated, setShowMitigated] = useState(true);
  const [selectedDimension, setSelectedDimension] = useState<typeof riskData[0] | null>(null);

  // Calculate overall risk scores
  const currentAvg = (
    riskData.reduce((sum, item) => sum + item['Current Risk'], 0) / riskData.length
  ).toFixed(1);
  const mitigatedAvg = (
    riskData.reduce((sum, item) => sum + item['Mitigated Risk'], 0) / riskData.length
  ).toFixed(1);
  const reduction = (((parseFloat(currentAvg) - parseFloat(mitigatedAvg)) / parseFloat(currentAvg)) * 100).toFixed(0);

  return (
    <div
      className={`relative w-full bg-gradient-to-br from-[#000212] to-[#04a3ff]/5 p-6 rounded-xl border border-[#04a3ff]/30 ${className}`}
      role="img"
      aria-label="Risk Assessment Radar Chart showing current and mitigated risks across six dimensions"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#04a3ff]" />
          Risk Assessment Matrix
        </h3>
        <p className="text-gray-400 text-sm">
          Comprehensive risk analysis across 6 critical dimensions
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
          <div className="text-3xl font-bold text-red-400">{currentAvg}</div>
          <div className="text-xs text-gray-400 mt-1">Avg Current Risk</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
          <div className="text-3xl font-bold text-green-400">{mitigatedAvg}</div>
          <div className="text-xs text-gray-400 mt-1">Avg Mitigated Risk</div>
        </div>
        <div className="bg-[#04a3ff]/10 border border-[#04a3ff]/30 rounded-lg p-3 text-center">
          <div className="text-3xl font-bold text-[#04a3ff] flex items-center justify-center gap-1">
            <TrendingDown className="w-6 h-6" />
            {reduction}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Risk Reduction</div>
        </div>
      </div>

      {/* Legend and Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => setShowCurrent(!showCurrent)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
            showCurrent
              ? 'bg-red-500/20 border border-red-500/50'
              : 'bg-gray-800/50 border border-gray-700/50'
          }`}
          aria-pressed={showCurrent}
          aria-label={`${showCurrent ? 'Hide' : 'Show'} current risk levels on radar chart`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowCurrent(!showCurrent);
            }
          }}
        >
          <div
            className={`w-3 h-3 rounded-full ${showCurrent ? 'bg-red-400' : 'bg-gray-600'}`}
          />
          <span className={`text-sm ${showCurrent ? 'text-red-400' : 'text-gray-500'}`}>
            Current Risk
          </span>
        </button>
        <button
          onClick={() => setShowMitigated(!showMitigated)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
            showMitigated
              ? 'bg-green-500/20 border border-green-500/50'
              : 'bg-gray-800/50 border border-gray-700/50'
          }`}
          aria-pressed={showMitigated}
          aria-label={`${showMitigated ? 'Hide' : 'Show'} mitigated risk levels with reduction strategies on radar chart`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowMitigated(!showMitigated);
            }
          }}
        >
          <div
            className={`w-3 h-3 rounded-full ${showMitigated ? 'bg-green-400' : 'bg-gray-600'}`}
          />
          <span className={`text-sm ${showMitigated ? 'text-green-400' : 'text-gray-500'}`}>
            Mitigated Risk
          </span>
        </button>
      </div>

      {/* Radar Chart */}
      <div
        className="h-[500px] w-full"
        role="region"
        aria-label={`Risk assessment radar showing ${showCurrent ? 'current' : ''} ${showCurrent && showMitigated ? 'and' : ''} ${showMitigated ? 'mitigated' : ''} risk levels across 6 dimensions: Technical (${riskData[0]['Current Risk']}/10), Market (${riskData[1]['Current Risk']}/10), Financial (${riskData[2]['Current Risk']}/10), Operational (${riskData[3]['Current Risk']}/10), Regulatory (${riskData[4]['Current Risk']}/10), and Competitive (${riskData[5]['Current Risk']}/10). Average risk reduced from ${currentAvg} to ${mitigatedAvg}, a ${reduction}% improvement`}
        tabIndex={0}
      >
        <ResponsiveRadar
          data={riskData}
          keys={[
            ...(showCurrent ? ['Current Risk'] : []),
            ...(showMitigated ? ['Mitigated Risk'] : []),
          ]}
          indexBy="dimension"
          title="Risk assessment across technical, market, financial, operational, regulatory, and competitive dimensions"
          maxValue={10}
          margin={{ top: 70, right: 80, bottom: 70, left: 80 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor={{ from: 'color' }}
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={16}
          enableDots={true}
          dotSize={8}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          dotBorderColor={{ from: 'color' }}
          enableDotLabel={false}
          colors={[COLORS.danger, COLORS.success]}
          fillOpacity={0.15}
          blendMode="normal"
          animate={true}
          motionConfig="gentle"
          isInteractive={true}
          theme={{
            background: 'transparent',
            text: {
              fill: COLORS.textMuted,
              fontSize: 12,
            },
            grid: {
              line: {
                stroke: COLORS.grid,
                strokeWidth: 1,
              },
            },
            dots: {
              text: {
                fill: COLORS.text,
              },
            },
          }}
          onClick={(point) => {
            const dimension = riskData.find((d) => d.dimension === point.index);
            if (dimension) setSelectedDimension(dimension);
          }}
        />
      </div>

      {/* Risk Severity Badges */}
      <div className="mt-6 border-t border-[#04a3ff]/20 pt-4">
        <h4 className="text-sm font-semibold text-white mb-3">Risk Severity by Dimension</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {riskData.map((item, index) => {
            const getSeverityBadge = (severity: string) => {
              switch (severity) {
                case 'high':
                  return 'bg-red-500/20 text-red-400 border-red-500/50';
                case 'medium':
                  return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
                case 'low':
                  return 'bg-green-500/20 text-green-400 border-green-500/50';
                default:
                  return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
              }
            };

            return (
              <button
                key={index}
                onClick={() => setSelectedDimension(item)}
                className="flex items-center justify-between p-2 rounded-lg bg-[#04a3ff]/5 border border-[#04a3ff]/20 hover:border-[#04a3ff]/50 transition-all group"
              >
                <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                  {item.dimension}
                </span>
                <Badge className={`text-xs border ${getSeverityBadge(item.severity)}`}>
                  {item.severity.toUpperCase()}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-[#04a3ff]/5 border border-[#04a3ff]/20 rounded-lg">
        <p className="text-xs text-gray-400 leading-relaxed">
          <strong className="text-white">Risk Methodology:</strong> Scores represent impact ×
          likelihood on a 0-10 scale. Mitigation strategies reduce effective risk through
          partnerships (Rigetti), diversification (8+ products), and proven execution paths. Click
          any dimension for detailed mitigation plans.
        </p>
      </div>

      {/* Mitigation Detail Panel */}
      {selectedDimension && (
        <MitigationPanel
          dimension={selectedDimension}
          onClose={() => setSelectedDimension(null)}
        />
      )}
    </div>
  );
};

export default RiskAssessmentChart;
