/**
 * Performance Metrics Plotly Example
 * Scientific charts with error bars for TechnologySlide
 */

import React from 'react';
import { PlotlyChart } from '../advanced/PlotlyChart';

export const QubitCoherenceExample: React.FC = () => {
  const coherenceData = {
    series: [
      {
        name: 'QDaria Topological Qubits',
        x: [50, 100, 150, 200, 250, 300],
        y: [10000, 12000, 15000, 18000, 22000, 28000],
        error: [500, 600, 700, 800, 1000, 1200],
        color: '#CCFF00',
      },
      {
        name: 'Superconducting Qubits (Baseline)',
        x: [50, 100, 150, 200, 250, 300],
        y: [100, 120, 140, 150, 160, 170],
        error: [10, 12, 15, 18, 20, 22],
        color: '#0066cc',
      },
      {
        name: 'Trapped Ion Qubits',
        x: [50, 100, 150, 200, 250, 300],
        y: [5000, 5500, 6000, 6500, 7000, 7500],
        error: [250, 300, 350, 400, 450, 500],
        color: '#00d4ff',
      },
    ],
  };

  return (
    <div className="w-full">
      <PlotlyChart
        type="scatter-with-error"
        data={coherenceData}
        title="Qubit Coherence Time Comparison"
        xLabel="Temperature (mK)"
        yLabel="Coherence Time (μs)"
        height={500}
        theme="dark"
      />
    </div>
  );
};

export const Algorithm3DPerformanceExample: React.FC = () => {
  const performance3D = {
    series: [
      {
        name: 'Shor\'s Algorithm',
        x: [8, 16, 32, 64, 128],
        y: [0.8, 0.85, 0.88, 0.91, 0.93],
        z: [10, 25, 80, 320, 1280],
        sizes: [8, 10, 12, 14, 16],
        color: '#CCFF00',
      },
      {
        name: 'Grover\'s Algorithm',
        x: [8, 16, 32, 64, 128],
        y: [0.75, 0.82, 0.86, 0.89, 0.91],
        z: [5, 12, 40, 160, 640],
        sizes: [8, 10, 12, 14, 16],
        color: '#00d4ff',
      },
      {
        name: 'VQE',
        x: [8, 16, 32, 64, 128],
        y: [0.7, 0.78, 0.83, 0.87, 0.89],
        z: [15, 35, 120, 480, 1920],
        sizes: [8, 10, 12, 14, 16],
        color: '#9AFF00',
      },
    ],
  };

  return (
    <div className="w-full">
      <PlotlyChart
        type="3d-scatter"
        data={performance3D}
        title="Quantum Algorithm Performance Analysis"
        xLabel="Number of Qubits"
        yLabel="Success Rate"
        zLabel="Execution Time (ms)"
        height={600}
        theme="dark"
      />
    </div>
  );
};

export const ErrorRateBoxPlotExample: React.FC = () => {
  const errorRateData = {
    series: [
      {
        name: 'QDaria (Topological)',
        data: [0.0001, 0.00012, 0.00015, 0.00018, 0.0002, 0.00022, 0.00025],
        color: '#CCFF00',
      },
      {
        name: 'IBM (Superconducting)',
        data: [0.01, 0.012, 0.015, 0.018, 0.02, 0.023, 0.025],
        color: '#0066cc',
      },
      {
        name: 'Rigetti (Superconducting)',
        data: [0.015, 0.018, 0.02, 0.023, 0.025, 0.028, 0.03],
        color: '#9AFF00',
      },
      {
        name: 'IonQ (Trapped Ion)',
        data: [0.001, 0.0012, 0.0015, 0.0018, 0.002, 0.0022, 0.0025],
        color: '#00d4ff',
      },
    ],
  };

  return (
    <div className="w-full">
      <PlotlyChart
        type="box-plot"
        data={errorRateData}
        title="Quantum Gate Error Rate Distribution"
        yLabel="Error Rate (log scale)"
        height={500}
        theme="dark"
      />
    </div>
  );
};

export default QubitCoherenceExample;
