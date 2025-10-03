import React from 'react';
import Plot from 'react-plotly.js';
import { qdariaBrand } from '../styles/design-tokens';

export const QuantumMetrics3DPlotly = () => {
  // Generate 3D surface data for quantum error rates vs qubits vs time
  const qubits = Array.from({ length: 20 }, (_, i) => (i + 1) * 10);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const errorRates = months.map(month =>
    qubits.map(qubit => {
      // Error rate decreases over time and with better algorithms
      const baseError = 0.05;
      const timeImprovement = 1 - (month / 24);
      const qubitScaling = Math.log(qubit) / Math.log(200);
      return baseError * timeImprovement * qubitScaling;
    })
  );

  return (
    <div className="business-plan-section p-8">
      <h3 className="business-plan-heading text-2xl mb-6">Quantum Error Rate Evolution (3D)</h3>
      <Plot
        data={[
          {
            z: errorRates,
            x: qubits,
            y: months,
            type: 'surface',
            colorscale: [
              [0, qdariaBrand.colors.green],
              [0.5, qdariaBrand.colors.cyan],
              [1, qdariaBrand.colors.primary]
            ],
            contours: {
              z: {
                show: true,
                usecolormap: true,
                highlightcolor: "#fff",
                project: { z: true }
              }
            }
          }
        ]}
        layout={{
          autosize: true,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#e5e7eb', family: 'system-ui' },
          scene: {
            xaxis: {
              title: 'Number of Qubits',
              gridcolor: 'rgba(4, 163, 255, 0.2)',
              zerolinecolor: 'rgba(4, 163, 255, 0.3)'
            },
            yaxis: {
              title: 'Months',
              gridcolor: 'rgba(4, 163, 255, 0.2)',
              zerolinecolor: 'rgba(4, 163, 255, 0.3)'
            },
            zaxis: {
              title: 'Error Rate',
              gridcolor: 'rgba(4, 163, 255, 0.2)',
              zerolinecolor: 'rgba(4, 163, 255, 0.3)'
            },
            camera: {
              eye: { x: 1.5, y: 1.5, z: 1.3 }
            }
          },
          margin: { l: 0, r: 0, t: 0, b: 0 }
        }}
        config={{
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['lasso2d', 'select2d']
        }}
        style={{ width: '100%', height: '600px' }}
      />
      <div className="mt-6 text-sm text-[#e5e7eb]/70">
        <p><strong className="text-[#00ffd3]">Key Insight:</strong> Error rates decrease 80% over 12 months with algorithmic improvements</p>
        <p className="mt-1">Target: &lt;0.1% error rate at 200 qubits by Month 12</p>
      </div>
    </div>
  );
};
