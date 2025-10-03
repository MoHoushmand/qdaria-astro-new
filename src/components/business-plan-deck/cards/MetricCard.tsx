import React from 'react';
import '../styles/cards-professional.css';

interface MetricCardProps {
  value: string;
  label: string;
  description?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  description,
  trend,
  trendValue,
  className = ''
}) => (
  <div className={`metric-card-professional ${className}`}>
    <div className="metric-card-value">{value}</div>
    <div className="metric-card-label">{label}</div>
    {description && <div className="metric-card-description">{description}</div>}
    {trend && trendValue && (
      <div className={`metric-card-trend trend-${trend}`}>
        {trend === 'up' ? '↑' : '↓'} {trendValue}
      </div>
    )}
  </div>
);

export default MetricCard;
