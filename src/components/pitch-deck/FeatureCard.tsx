import React from 'react';
import { Card } from './ui/card';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => (
  <Card className="bg-gray-800">
    <div className="p-4">
      <div className="flex items-center text-xl text-white mb-4">
        <Icon className="mr-2 h-6 w-6" /> {title}
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  </Card>
);
