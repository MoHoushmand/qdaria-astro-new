// components/QuantumNeuralNetwork.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const QuantumNeuralNetwork: React.FC = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {[0, 1, 2].map((layer) => (
        <g key={layer}>
          {[0, 1, 2, 3].map((node) => (
            <motion.circle
              key={`${layer}-${node}`}
              cx={50 + layer * 50}
              cy={40 + node * 40}
              r={5}
              fill="#00FFFF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}
        </g>
      ))}

      {[0, 1, 2].map((layer) => (
        <g key={`connections-${layer}`}>
          {[0, 1, 2, 3].map((node) => (
            <g key={`connections-${layer}-${node}`}>
              {[0, 1, 2, 3].map((nextNode) => (
                <motion.path
                  key={`connection-${layer}-${node}-${nextNode}`}
                  d={`M${55 + layer * 50},${40 + node * 40} Q${75 + layer * 50},${40 + (node + nextNode) * 20} ${95 + layer * 50},${40 + nextNode * 40}`}
                  stroke="#FF00FF"
                  strokeWidth={0.5}
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              ))}
            </g>
          ))}
        </g>
      ))}

      {[0, 1, 2].map((layer) => (
        <g key={`quantum-${layer}`}>
          {[0, 1, 2, 3].map((node) => (
            <motion.text
              key={`quantum-${layer}-${node}`}
              x={50 + layer * 50}
              y={45 + node * 40}
              fontSize="8"
              fill="#FFFF00"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              Ψ
            </motion.text>
          ))}
        </g>
      ))}
    </svg>
  );
};