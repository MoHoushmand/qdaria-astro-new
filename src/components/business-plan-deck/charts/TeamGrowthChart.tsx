import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { qdariaBrand } from '../styles/design-tokens';

const data = [
  { month: 'Now', engineering: 8, sales: 3, operations: 4, leadership: 3 },
  { month: 'M3', engineering: 12, sales: 5, operations: 5, leadership: 3 },
  { month: 'M6', engineering: 18, sales: 8, operations: 7, leadership: 4 },
  { month: 'M9', engineering: 25, sales: 12, operations: 9, leadership: 5 },
  { month: 'M12', engineering: 35, sales: 18, operations: 12, leadership: 6 },
  { month: 'M15', engineering: 48, sales: 25, operations: 16, leadership: 7 },
  { month: 'M18', engineering: 65, sales: 35, operations: 22, leadership: 8 },
];

export const TeamGrowthChart = () => (
  <div className="business-plan-section p-8">
    <h3 className="business-plan-heading text-2xl mb-6">Team Growth Trajectory</h3>
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="engineeringGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={qdariaBrand.colors.primary} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={qdariaBrand.colors.primary} stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={qdariaBrand.colors.cyan} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={qdariaBrand.colors.cyan} stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="operationsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={qdariaBrand.colors.green} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={qdariaBrand.colors.green} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(4, 163, 255, 0.1)" />
        <XAxis dataKey="month" stroke={qdariaBrand.colors.primary} />
        <YAxis stroke={qdariaBrand.colors.primary} label={{ value: 'Headcount', angle: -90 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#000212',
            border: '1px solid rgba(4, 163, 255, 0.3)',
            borderRadius: '0.5rem'
          }}
        />
        <Legend />
        <Area type="monotone" dataKey="engineering" stackId="1" stroke={qdariaBrand.colors.primary} fill="url(#engineeringGradient)" name="Engineering" />
        <Area type="monotone" dataKey="sales" stackId="1" stroke={qdariaBrand.colors.cyan} fill="url(#salesGradient)" name="Sales & Marketing" />
        <Area type="monotone" dataKey="operations" stackId="1" stroke={qdariaBrand.colors.green} fill="url(#operationsGradient)" name="Operations" />
        <Area type="monotone" dataKey="leadership" stackId="1" stroke="#8b5cf6" fill="rgba(139, 92, 246, 0.3)" name="Leadership" />
      </AreaChart>
    </ResponsiveContainer>
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center">
        <p className="text-3xl font-bold text-[#04a3ff]">65</p>
        <p className="text-sm text-[#e5e7eb]/70">Engineering (M18)</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-[#00ffd3]">35</p>
        <p className="text-sm text-[#e5e7eb]/70">Sales (M18)</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-[#65ff00]">22</p>
        <p className="text-sm text-[#e5e7eb]/70">Operations (M18)</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-[#8b5cf6]">8</p>
        <p className="text-sm text-[#e5e7eb]/70">Leadership (M18)</p>
      </div>
    </div>
  </div>
);
