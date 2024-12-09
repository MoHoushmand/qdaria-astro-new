'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Cpu } from 'lucide-react'

const scalabilityData = [
  { year: 2024, qubits: 100 },
  { year: 2026, qubits: 500 },
  { year: 2028, qubits: 1000 },
  { year: 2030, qubits: 5000 },
  { year: 2032, qubits: 10000 },
]

interface ScalabilityChartProps {
  animationKey: number;
}

const ScalabilityChart: React.FC<ScalabilityChartProps> = ({ animationKey }) => {
  return (
    <Card className="bg-gray-800 p-6 border-2 border-blue-400 hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-300 flex items-center">
          <Cpu className="mr-3" /> Scalability Challenges
        </CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={scalabilityData} key={animationKey}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
            <Area type="monotone" dataKey="qubits" stroke="#8884d8" fill="url(#colorQubits)" />
            <defs>
              <linearGradient id="colorQubits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default ScalabilityChart