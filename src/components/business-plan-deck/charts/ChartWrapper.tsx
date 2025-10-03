import React from 'react';
import '../styles/master-professional.css';

interface StatItem {
  value: string;
  label: string;
}

interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  stats?: StatItem[];
  insight?: string;
  height?: number;
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  subtitle,
  children,
  stats,
  insight,
  height = 500,
  className = ''
}) => {
  return (
    <div className={`chart-container-professional ${className}`}>
      <div className="mb-6">
        <h3 className="chart-title-professional">{title}</h3>
        {subtitle && <p className="chart-subtitle-professional">{subtitle}</p>}
      </div>

      <div style={{ height: `${height}px`, width: '100%' }}>
        {children}
      </div>

      {stats && stats.length > 0 && (
        <div className="stats-bar-professional mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="stats-item">
              <div className="stats-value">{stat.value}</div>
              <div className="stats-label">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {insight && (
        <div className="mt-4 business-plan-body-sm">
          <p>
            <strong className="text-primary-contrast">Key Insight:</strong>{' '}
            <span className="text-secondary-contrast">{insight}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ChartWrapper;
