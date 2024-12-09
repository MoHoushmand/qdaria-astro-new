'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { Card } from './ui/card';
import { cn } from '../../lib/utils';

const ProductSlide: React.FC = () => {
  const { activeSlide } = useSlide();
  const isActive = activeSlide === 5;

  const products = [
    {
      name: "QDaria Quantum Platform",
      features: [
        "Topologically protected qubits using Fibonacci anyons",
        "Scalable architecture supporting 100+ logical qubits",
        "Advanced error correction through braiding operations",
        "Higher temperature operation (4K vs. 15mK)"
      ]
    },
    {
      name: "Quantum Development Kit",
      features: [
        "High-level quantum programming language",
        "Advanced simulation and debugging tools",
        "Comprehensive API documentation",
        "Pre-built quantum algorithms library"
      ]
    }
  ];

  const applications = [
    {
      category: "Drug Discovery",
      description: "Molecular simulation and protein folding",
      impact: "10x faster drug development cycles"
    },
    {
      category: "Financial Modeling",
      description: "Portfolio optimization and risk analysis",
      impact: "100x improvement in modeling accuracy"
    },
    {
      category: "Machine Learning",
      description: "Quantum neural networks and optimization",
      impact: "1000x speedup in training large models"
    },
    {
      category: "Cryptography",
      description: "Post-quantum security solutions",
      impact: "Future-proof encryption methods"
    }
  ];

  return (
    <Card className={cn(
      'w-full h-full bg-gray-900 text-white absolute top-0 left-0',
      'transition-opacity duration-500',
      isActive ? 'opacity-100' : 'opacity-0'
    )}>
      <div className="flex flex-col items-center justify-start min-h-screen p-8 relative">
        <motion.h2
          className="text-4xl font-bold text-teal-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
          transition={{ duration: 0.8 }}
        >
          Our Products
        </motion.h2>

        {/* Product Offerings */}
        <div className="grid grid-cols-2 gap-8 w-full max-w-6xl mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="bg-purple-900/50 p-6 rounded-lg border border-purple-600"
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : (index === 0 ? -20 : 20) }}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.2) }}
            >
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">{product.name}</h3>
              <ul className="space-y-3">
                {product.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                    transition={{ duration: 0.5, delay: 0.4 + (featureIndex * 0.1) }}
                  >
                    <span className="text-teal-400 mr-2">•</span>
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Applications */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">Key Applications</h3>
          <div className="grid grid-cols-4 gap-6">
            {applications.map((app, index) => (
              <motion.div
                key={app.category}
                className="bg-purple-900/50 p-4 rounded-lg border border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1 + (index * 0.1) }}
              >
                <h4 className="text-xl font-semibold text-teal-400 mb-2">{app.category}</h4>
                <p className="text-gray-300 text-sm mb-2">{app.description}</p>
                <div className="text-blue-300 text-sm font-semibold">{app.impact}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cloud Integration */}
        <motion.div
          className="mt-8 text-center max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <p className="text-xl text-gray-300">
            All products are available through our secure cloud platform, enabling seamless integration with existing workflows and infrastructure.
          </p>
        </motion.div>
      </div>
    </Card>
  );
};

export default ProductSlide;
