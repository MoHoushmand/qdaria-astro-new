/**
 * Shared tooltip component for consistent styling across all charts
 *
 * @module charts/SharedTooltip
 */

import React from 'react';
import { CustomTooltipProps, ChartTooltipPayload } from './types';
import { formatCurrency, formatPercentage } from './utils';

const defaultStyle: React.CSSProperties = {
  backgroundColor: 'rgba(0, 2, 18, 0.95)',
  border: '1px solid rgba(4, 163, 255, 0.3)',
  borderRadius: '8px',
  padding: '12px 16px',
  boxShadow: '0 0 20px rgba(4, 163, 255, 0.3)',
  minWidth: '200px',
  backdropFilter: 'blur(4px)',
};

/**
 * Standard tooltip component with QDaria branding
 *
 * @component
 * @param props - Recharts tooltip props with custom extensions
 * @returns Styled tooltip element or null
 */
export const StandardTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  formatCurrency: customFormatCurrency,
  formatPercentage: customFormatPercentage,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const currencyFormatter = customFormatCurrency || formatCurrency;
  const percentageFormatter = customFormatPercentage || formatPercentage;

  return (
    <div style={defaultStyle}>
      {label && (
        <p
          style={{
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: '8px',
            fontSize: '14px',
          }}
        >
          {label}
        </p>
      )}
      <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
        {payload.map((entry, index) => {
          const value = entry.value as number;
          let formattedValue: string;

          // Auto-detect currency values (> 100 typically indicates currency)
          if (typeof value === 'number') {
            if (Math.abs(value) >= 100 || entry.name?.toLowerCase().includes('revenue')) {
              formattedValue = currencyFormatter(value);
            } else if (entry.name?.toLowerCase().includes('percent') || entry.name?.toLowerCase().includes('%')) {
              formattedValue = percentageFormatter(value);
            } else {
              formattedValue = value.toLocaleString();
            }
          } else {
            formattedValue = String(value);
          }

          return (
            <div
              key={`tooltip-item-${index}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '4px',
              }}
            >
              <span style={{ color: '#9ca3af' }}>{entry.name}:</span>
              <span
                style={{
                  color: entry.color || '#fff',
                  fontWeight: 'bold',
                }}
              >
                {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Tooltip with custom render function for complex data
 *
 * @component
 * @param props - Tooltip props with custom renderer
 * @returns Custom tooltip element or null
 */
interface CustomRenderTooltipProps extends CustomTooltipProps {
  renderContent: (payload: ChartTooltipPayload[], label?: string) => React.ReactNode;
}

export const CustomRenderTooltip: React.FC<CustomRenderTooltipProps> = ({
  active,
  payload,
  label,
  renderContent,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div style={defaultStyle}>
      {renderContent(payload as ChartTooltipPayload[], label as string)}
    </div>
  );
};

export default StandardTooltip;
