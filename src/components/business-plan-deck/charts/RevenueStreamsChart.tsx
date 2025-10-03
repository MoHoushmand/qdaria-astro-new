import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { qdariaBrand } from '../styles/design-tokens';

const data = [
  { stream: 'Zipminator', y1: 1.2, y2: 3.8, y3: 8.5 },
  { stream: 'Qm9', y1: 0.8, y2: 2.4, y3: 5.2 },
  { stream: 'QDiana', y1: 0.5, y2: 1.9, y3: 4.1 },
  { stream: 'QMikeAI', y1: 0.3, y2: 1.2, y3: 3.2 },
  { stream: 'QNilaya', y1: 0.2, y2: 0.9, y3: 2.3 },
  { stream: 'TeHaA', y1: 0.4, y2: 1.5, y3: 3.8 },
  { stream: 'Consulting', y1: 0.6, y2: 1.8, y3: 3.1 },
];

export const RevenueStreamsChart = () => {
  const [year, setYear] = useState('y3');

  return (
    <div className="business-plan-section p-8">
      <h3 className="business-plan-heading text-2xl mb-4">Revenue Streams by Product</h3>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setYear('y1')} className={`business-plan-button ${year === 'y1' ? 'opacity-100' : 'opacity-50'}`}>Year 1</button>
        <button onClick={() => setYear('y2')} className={`business-plan-button ${year === 'y2' ? 'opacity-100' : 'opacity-50'}`}>Year 2</button>
        <button onClick={() => setYear('y3')} className={`business-plan-button ${year === 'y3' ? 'opacity-100' : 'opacity-50'}`}>Year 3</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(4, 163, 255, 0.1)" />
          <XAxis dataKey="stream" stroke={qdariaBrand.colors.primary} angle={-45} textAnchor="end" height={100} />
          <YAxis stroke={qdariaBrand.colors.primary} label={{ value: 'Revenue ($M)', angle: -90 }} />
          <Tooltip contentStyle={{ backgroundColor: '#000212', border: '1px solid rgba(4, 163, 255, 0.3)' }} />
          <Bar dataKey={year} fill={qdariaBrand.colors.cyan} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
