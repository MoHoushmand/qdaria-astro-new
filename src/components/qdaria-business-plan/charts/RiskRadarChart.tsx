import { ResponsiveRadar } from '@nivo/radar';

interface RiskDataPoint {
  category: string;
  current: number;
  mitigated: number;
  target: number;
  description: string;
}

const riskData: RiskDataPoint[] = [
  {
    category: 'Technical',
    current: 8,
    mitigated: 4,
    target: 2,
    description: 'Quantum scaling challenges, error rates'
  },
  {
    category: 'Market',
    current: 7,
    mitigated: 4,
    target: 3,
    description: 'Adoption rate, competition from giants'
  },
  {
    category: 'Financial',
    current: 6,
    mitigated: 3,
    target: 2,
    description: 'Funding gaps, burn rate'
  },
  {
    category: 'Operational',
    current: 6,
    mitigated: 4,
    target: 3,
    description: 'Talent acquisition, regulatory changes'
  },
  {
    category: 'Strategic',
    current: 5,
    mitigated: 3,
    target: 2,
    description: 'Partnership dependencies, technology pivot'
  },
  {
    category: 'Execution',
    current: 7,
    mitigated: 4,
    target: 3,
    description: 'Timeline delays, product-market fit'
  }
];

export default function RiskRadarChart() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ResponsiveRadar
        data={riskData}
        keys={['current', 'mitigated', 'target']}
        indexBy="category"
        maxValue={10}
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={['#e74c3c', '#f39c12', '#65ff00']}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
        isInteractive={true}
        sliceTooltip={({ index }) => {
          const point = riskData[index];
          return (
            <div
              style={{
                background: 'white',
                padding: '12px 16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              <strong style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                {point.category} Risk
              </strong>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                {point.description}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#e74c3c', borderRadius: '50%' }} />
                  <span>Current: {point.current}/10</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#f39c12', borderRadius: '50%' }} />
                  <span>Mitigated: {point.mitigated}/10</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#65ff00', borderRadius: '50%' }} />
                  <span>Target: {point.target}/10</span>
                </div>
              </div>
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #eee', fontSize: '11px', color: '#999' }}>
                Risk Reduction: {Math.round(((point.current - point.target) / point.current) * 100)}%
              </div>
            </div>
          );
        }}
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 100,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}
