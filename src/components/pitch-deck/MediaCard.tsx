'use client';

import React from 'react';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

interface MediaCardProps {
  source: string;
  title: string;
  quote: string;
  date: string;
}

const MediaCard: React.FC<MediaCardProps> = ({
  source,
  title,
  quote,
  date
}) => (
  <Card className="bg-purple-900/50 border border-purple-600">
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="text-xl font-semibold text-teal-400">{source}</div>
        <div className="text-sm text-gray-400">{date}</div>
      </div>
      <h4 className="text-lg font-semibold text-blue-300 mb-3">{title}</h4>
      <p className="text-gray-300 italic">"{quote}"</p>
    </div>
  </Card>
);

export default MediaCard;
