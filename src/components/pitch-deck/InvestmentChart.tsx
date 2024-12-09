// components/InvestmentChart.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'
import dynamic from 'next/dynamic'

interface InvestmentDataPoint {
  year: number;
  public: number;
  private: number;
  total: number;
}

const investmentData: InvestmentDataPoint[] = [
  { year: 2023, public: 1.5, private: 2.0, total: 3.5 },
  { year: 2024, public: 2.3, private: 3.1, total: 5.4 },
  { year: 2025, public: 3.5, private: 4.7, total: 8.2 },
  { year: 2026, public: 5.3, private: 7.1, total: 12.4 },
  { year: 2027, public: 8.0, private: 10.7, total: 18.7 },
  { year: 2028, public: 12.1, private: 16.2, total: 28.3 },
  { year: 2029, public: 18.3, private: 24.5, total: 42.8 },
  { year: 2030, public: 27.7, private: 37.1, total: 64.8 },
]

const formatYAxis = (value: number): string => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(0)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(0)}M`
  return `${value.toFixed(0)}K`
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-800 p-4 border border-blue-400 rounded-md">
        <p className="label text-blue-300">{`Year: ${label}`}</p>
        <p className="public text-purple-400">{`Public Investment: $${payload[0].value.toFixed(1)}B`}</p>
        <p className="private text-green-400">{`Private Investment: $${payload[1].value.toFixed(1)}B`}</p>
        <p className="total text-yellow-400">{`Total Investment: $${payload[2].value.toFixed(1)}B`}</p>
      </div>
    )
  }
  return null
}

interface ChartComponentProps {
  isMobile: boolean;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ isMobile }) => {
  return (
    <ResponsiveContainer width="100%" height={isMobile ? 300 : 500}>
      <BarChart data={investmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="year" stroke="#888" />
        <YAxis tickFormatter={formatYAxis} stroke="#888" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="public" name="Public Investment" stackId="a" fill="#8884d8">
          <LabelList dataKey="public" position="inside" fill="#fff" className="text-xs md:text-sm" />
        </Bar>
        <Bar dataKey="private" name="Private Investment" stackId="a" fill="#82ca9d">
          <LabelList dataKey="private" position="inside" fill="#fff" className="text-xs md:text-sm" />
        </Bar>
        <Bar dataKey="total" name="Total Investment" fill="#ffc658">
          <LabelList dataKey="total" position="top" fill="#ffc658" className="text-xs md:text-sm" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

const LazyChartComponent = dynamic(() => Promise.resolve(ChartComponent), { ssr: false })

export function InvestmentChartComponent() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Card className="w-full bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-semibold text-blue-300">Quantum Computing Investments (USD Billions)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[500px]">
        <LazyChartComponent isMobile={isMobile} />
        <p className="text-sm text-gray-400 mt-4">
          Investments in quantum computing are projected to grow significantly, with total investments reaching $64.8 billion by 2030.
          Private sector investments are expected to outpace public funding, indicating strong commercial interest in quantum technologies.
        </p>
      </CardContent>
    </Card>
  )
}