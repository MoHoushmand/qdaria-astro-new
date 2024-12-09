// components/QubitEvolutionChart.tsx
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Cpu } from 'lucide-react'

const qubitEvolutionData = [
  { year: 2015, 'Non-Abelian Anyons': 1000000, 'Superconducting': 10000, 'Trapped Ions': 50000, 'Silicon Spin': 100000, 'Other Topological': 500000, 'NV Center': 200000, 'Photonics': 300000 },
  { year: 2018, 'Non-Abelian Anyons': 500000, 'Superconducting': 5000, 'Trapped Ions': 20000, 'Silicon Spin': 50000, 'Other Topological': 200000, 'NV Center': 100000, 'Photonics': 150000 },
  { year: 2021, 'Non-Abelian Anyons': 100000, 'Superconducting': 1000, 'Trapped Ions': 5000, 'Silicon Spin': 10000, 'Other Topological': 50000, 'NV Center': 30000, 'Photonics': 40000 },
  { year: 2024, 'Non-Abelian Anyons': 10000, 'Superconducting': 500, 'Trapped Ions': 2000, 'Silicon Spin': 5000, 'Other Topological': 20000, 'NV Center': 15000, 'Photonics': 18000 },
]

const colors = {
  'Non-Abelian Anyons': '#FF6384',
  'Superconducting': '#36A2EB',
  'Trapped Ions': '#FFCE56',
  'Silicon Spin': '#4BC0C0',
  'Other Topological': '#9966FF',
  'NV Center': '#FF9F40',
  'Photonics': '#FF6384'
}

interface QubitEvolutionChartProps {
  animationKey: number;
}

const QubitEvolutionChart: React.FC<QubitEvolutionChartProps> = ({ animationKey }) => {
  return (
    <Card className="bg-gray-800 p-6 border-2 border-blue-400 mb-12 hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-300 flex items-center">
          <Cpu className="mr-3" /> Qubit Cost Evolution Over Time
        </CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={qubitEvolutionData} key={animationKey}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="white" />
            <YAxis stroke="white" scale="log" domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
            <Legend />
            {Object.entries(colors).map(([key, color]) => (
              <Line type="monotone" dataKey={key} stroke={color} key={key} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default QubitEvolutionChart