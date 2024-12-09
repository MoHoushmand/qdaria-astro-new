// components/ErrorRateChart.tsx
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle } from 'lucide-react'

const errorRateData = [
  { qubits: 5, errorRate: 0.05 },
  { qubits: 10, errorRate: 0.1 },
  { qubits: 20, errorRate: 0.2 },
  { qubits: 50, errorRate: 0.4 },
  { qubits: 100, errorRate: 0.8 },
]

interface ErrorRateChartProps {
  animationKey: number;
}

const ErrorRateChart: React.FC<ErrorRateChartProps> = ({ animationKey }) => {
  return (
    <Card className="bg-gray-800 p-6 border-2 border-blue-400 mb-12 hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-300 flex items-center">
          <AlertTriangle className="mr-3" /> Error Rates Increase with More Qubits
        </CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={errorRateData} key={animationKey}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="qubits" stroke="white" label={{ value: 'Number of Qubits', position: 'insideBottom', offset: -10, fill: 'white' }} />
            <YAxis stroke="white" label={{ value: 'Error Rate', angle: -90, position: 'insideLeft', offset: 10, fill: 'white' }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
            <Line type="monotone" dataKey="errorRate" stroke="#FF6384" strokeWidth={2} dot={{ fill: '#FF6384' }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default ErrorRateChart