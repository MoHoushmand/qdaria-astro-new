import React from 'react';
import '../styles/cards-professional.css';

interface FeatureCardProps {
  icon: string | React.ReactNode;
  title: string;
  text: string;
  subtitle?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  text,
  subtitle,
  className = ''
}) => (
  <div className={`feature-card-professional ${className}`}>
    <div className="feature-card-icon">
      {typeof icon === 'string' ? icon : icon}
    </div>
    <div className="feature-card-content">
      {subtitle && <div className="feature-card-subtitle">{subtitle}</div>}
      <div className="feature-card-title">{title}</div>
      <div className="feature-card-text">{text}</div>
    </div>
  </div>
);

export default FeatureCard;
