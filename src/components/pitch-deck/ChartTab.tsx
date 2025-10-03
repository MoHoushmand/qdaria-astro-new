import React from 'react';
import { Card } from '@/components/pitch-deck/ui/card';

interface ChartTabProps {
  title: string;
  icon?: React.ReactNode;
  data?: any[];
  dataColumns?: Array<{ key: string; label: string }>;
  children?: React.ReactNode;
}

const ChartTab: React.FC<ChartTabProps> = ({ title, icon, children }) => {
  return (
    <Card className="qdaria-card p-6 border-2">
      <div className="flex items-center gap-3 mb-6">
        {icon && <div className="text-cyan-400">{icon}</div>}
        <h3 className="text-2xl font-bold qdaria-gradient-text">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </Card>
  );
};

export default ChartTab;