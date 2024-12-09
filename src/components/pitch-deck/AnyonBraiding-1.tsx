// components/AnyonBraiding-1.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AnyonBraiding: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M10,50 Q50,0 90,50 T10,50"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M10,50 Q50,100 90,50 T10,50"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, delay: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};

export default AnyonBraiding;