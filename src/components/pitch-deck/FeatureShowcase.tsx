// components/FeatureShowcase.tsx
'use client';

import React, { useState } from 'react';

const features = [
  {
    icon: '🛡️',
    title: "Topological Protection",
    description: "Our qubits are safeguarded by the system's topology, significantly reducing errors and enhancing stability."
  },
  {
    icon: '⚖️',
    title: "Unprecedented Scalability",
    description: "Our architecture scales seamlessly, enabling thousands of qubits for practical quantum applications."
  },
  {
    icon: '💻',
    title: "Efficient Operation",
    description: "Optimized for performance, reducing infrastructure costs and complexity."
  },
  {
    icon: '⚡',
    title: "Universal Quantum Gates",
    description: "Implement any quantum algorithm, unlocking limitless application potential."
  }
];

export const FeatureShowcase: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-4">{features[currentFeature].icon}</span>
          <h3 className="text-xl font-semibold">{features[currentFeature].title}</h3>
        </div>
        <p className="text-gray-200">{features[currentFeature].description}</p>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentFeature((prev) => (prev + 1) % features.length)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};