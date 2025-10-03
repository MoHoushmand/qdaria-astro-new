/**
 * Quantum Architecture D3 Example
 * Network graph visualization for TechnologySlide
 */

import React from 'react';
import { D3Visualization } from '../advanced/D3Visualization';

export const QuantumArchitectureExample: React.FC = () => {
  const architectureData = {
    nodes: [
      { id: 'qpu', label: 'QPU Core', group: 0, value: 100 },
      { id: 'anyon', label: 'Anyon Braiding Engine', group: 1, value: 80 },
      { id: 'fibonacci', label: 'Fibonacci Encoding', group: 1, value: 70 },
      { id: 'topological', label: 'Topological Protection', group: 1, value: 75 },
      { id: 'qec', label: 'Quantum Error Correction', group: 2, value: 90 },
      { id: 'syndrome', label: 'Syndrome Extraction', group: 2, value: 60 },
      { id: 'decoder', label: 'Neural Decoder', group: 2, value: 65 },
      { id: 'compiler', label: 'Quantum Compiler', group: 3, value: 70 },
      { id: 'optimizer', label: 'Circuit Optimizer', group: 3, value: 60 },
      { id: 'api', label: 'Cloud API', group: 4, value: 50 },
      { id: 'sdk', label: 'Developer SDK', group: 4, value: 55 },
    ],
    links: [
      { source: 'qpu', target: 'anyon', value: 3, label: 'Controls' },
      { source: 'qpu', target: 'qec', value: 3, label: 'Protects' },
      { source: 'anyon', target: 'fibonacci', value: 2, label: 'Uses' },
      { source: 'anyon', target: 'topological', value: 2, label: 'Enables' },
      { source: 'qec', target: 'syndrome', value: 2, label: 'Detects' },
      { source: 'qec', target: 'decoder', value: 2, label: 'Corrects' },
      { source: 'compiler', target: 'qpu', value: 2, label: 'Compiles to' },
      { source: 'compiler', target: 'optimizer', value: 1, label: 'Optimizes' },
      { source: 'api', target: 'compiler', value: 2, label: 'Invokes' },
      { source: 'sdk', target: 'api', value: 1, label: 'Calls' },
    ],
  };

  return (
    <div className="w-full">
      <D3Visualization
        type="network-graph"
        data={architectureData}
        width={900}
        height={600}
        onNodeClick={(node) => console.log('Clicked:', node)}
        interactive={true}
      />
      <div className="mt-4 text-sm text-gray-400 text-center">
        Interactive: Drag nodes to rearrange • Click for details
      </div>
    </div>
  );
};

export const TeamOrgChartExample: React.FC = () => {
  const orgData = {
    tree: {
      name: 'Dr. Mo Saif (CEO)',
      children: [
        {
          name: 'Dr. John Smith (CTO)',
          children: [
            { name: 'Quantum Engineering', value: 12 },
            { name: 'Software Development', value: 18 },
            { name: 'DevOps & Infrastructure', value: 6 },
          ],
        },
        {
          name: 'Dr. Jane Doe (CSO)',
          children: [
            { name: 'Research & Innovation', value: 15 },
            { name: 'Scientific Advisory', value: 8 },
          ],
        },
        {
          name: 'Sarah Johnson (CFO)',
          children: [
            { name: 'Finance & Accounting', value: 5 },
            { name: 'Business Operations', value: 7 },
          ],
        },
        {
          name: 'Mike Chen (CPO)',
          children: [
            { name: 'Product Management', value: 8 },
            { name: 'UX/UI Design', value: 6 },
          ],
        },
      ],
    },
  };

  return (
    <div className="w-full">
      <D3Visualization
        type="org-chart"
        data={orgData}
        width={1000}
        height={600}
        onNodeClick={(node) => console.log('Team member:', node)}
        interactive={true}
      />
    </div>
  );
};

export default QuantumArchitectureExample;
