import React from 'react';
import '../styles/cards-professional.css';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  className = ''
}) => (
  <div className={`stat-card-professional ${className}`}>
    <div className="stat-card-value">{value}</div>
    <div className="stat-card-label">{label}</div>
  </div>
);

export default StatCard;
