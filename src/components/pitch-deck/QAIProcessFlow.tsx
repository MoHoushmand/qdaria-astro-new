import React from 'react';
import { motion } from 'framer-motion';

interface ProcessNode {
  id: string;
  label: string;
}

interface ProcessEdge {
  id: string;
  source: string;
  target: string;
}

interface QAIProcessFlowProps {
  nodes: ProcessNode[];
  edges: ProcessEdge[];
}

const QAIProcessFlow: React.FC<QAIProcessFlowProps> = ({ nodes, edges }) => {
  return (
    <div className="relative h-[400px] mb-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="bg-gray-700/50 p-4 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-sm font-medium text-blue-300">{node.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full">
            {edges.map((edge) => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;
              
              const sourceIndex = nodes.indexOf(sourceNode);
              const targetIndex = nodes.indexOf(targetNode);
              
              return (
                <motion.path
                  key={edge.id}
                  d={`M ${sourceIndex * 200 + 100} 200 L ${targetIndex * 200 + 100} 200`}
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: Math.min(sourceIndex, targetIndex) * 0.1 }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default QAIProcessFlow;
