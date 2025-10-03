import React from 'react';
import '../styles/cards-professional.css';

interface InfoCardProps {
  type?: 'success' | 'warning' | 'info';
  title: string;
  text: string;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  type = 'info',
  title,
  text,
  className = ''
}) => (
  <div className={`info-card-${type} ${className}`}>
    <div className="info-card-title">{title}</div>
    <div className="info-card-text">{text}</div>
  </div>
);

export default InfoCard;
