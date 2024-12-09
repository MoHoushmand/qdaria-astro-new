// components/ImpactMetric.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ImpactMetricProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const ImpactMetric: React.FC<ImpactMetricProps> = ({ icon, title, value }) => (
  <motion.div className="flex flex-col items-center p-4 bg-opacity-20 bg-white rounded-lg" whileHover={{ scale: 1.05 }}>
    <div className="text-3xl mb-2" aria-label={title}>
      {icon}
    </div>
    <h4 className="text-lg font-semibold mb-1">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </motion.div>
);