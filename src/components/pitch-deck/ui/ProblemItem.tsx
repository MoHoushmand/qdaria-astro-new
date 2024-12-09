import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Card } from './card';

interface ProblemItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const ProblemItem: React.FC<ProblemItemProps> = ({ title, description, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-gray-800/60 backdrop-blur-sm p-4 border border-blue-400/20 hover:border-blue-400/40 transition-colors cursor-pointer">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">{title}</h3>
            <p className="text-sm text-gray-300">{description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
