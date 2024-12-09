import React from 'react';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

interface FundingCardProps {
  title: string;
  amount: number;
  percentage: number;
  description: string;
}

const FundingCard: React.FC<FundingCardProps> = ({ 
  title, 
  amount, 
  percentage, 
  description 
}) => (
  <Card className="bg-purple-900/50 border border-purple-600">
    <div className="flex flex-row items-center justify-between p-4 pb-2">
      <h3 className="text-xl font-medium text-teal-400">{title}</h3>
    </div>
    <div className="p-4 pt-0">
      <div className="text-3xl font-bold text-white">${amount}M</div>
      <p className="text-sm text-blue-300">{percentage}% of total</p>
      <p className="text-gray-300 mt-2">{description}</p>
    </div>
  </Card>
);

export default FundingCard;
