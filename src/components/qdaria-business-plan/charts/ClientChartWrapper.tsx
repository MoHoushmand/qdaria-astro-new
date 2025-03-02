import React from 'react';

interface ClientChartWrapperProps {
  children: React.ReactNode;
}

export const ClientChartWrapper: React.FC<ClientChartWrapperProps> = ({ children }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};
