import React from 'react';

interface PayloadItem {
  name: string;
  value: number | string;
  color?: string;
  dataKey?: string;
  payload?: any;
}

interface TooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
  formatter?: (value: number | string) => string;
  labelFormatter?: (label: string) => string;
}

export const ProfessionalTooltip: React.FC<TooltipProps> = ({
  active,
  payload,
  label,
  formatter,
  labelFormatter
}) => {
  if (!active || !payload || !payload.length) return null;

  const defaultFormatter = (value: number | string): string => {
    if (typeof value === 'string') return value;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      notation: value >= 1000000 ? 'compact' : 'standard',
      compactDisplay: 'short'
    }).format(value);
  };

  const formatValue = formatter || defaultFormatter;
  const formatLabel = labelFormatter || ((l: string) => l);

  return (
    <div className="chart-tooltip-professional">
      {label && (
        <div className="chart-tooltip-label">{formatLabel(label)}</div>
      )}
      {payload.map((entry, index) => (
        <div key={index} className="chart-tooltip-item">
          <span
            className="chart-tooltip-name"
            style={{ color: entry.color }}
          >
            {entry.name}:
          </span>
          <span className="chart-tooltip-value">
            {formatValue(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalTooltip;
