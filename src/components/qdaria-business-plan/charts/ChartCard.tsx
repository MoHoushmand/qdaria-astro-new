import React from 'react';

interface ChartCardProps {
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ children }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      className="chart-card relative rounded-xl p-6 mb-8 transition-all duration-500"
      onMouseMove={handleMouseMove}
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(4, 163, 255, 0.3)',
        boxShadow: '0 0 25px rgba(4, 163, 255, 0.4)',
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{
          background: 'radial-gradient(800px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(4, 163, 255, 0.15), transparent 40%)',
        }}
      />
      {children}
    </div>
  );
};

export default ChartCard;
