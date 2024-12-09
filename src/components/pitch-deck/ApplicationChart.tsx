'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts'
import dynamic from 'next/dynamic'

interface ApplicationDataPoint {
  name: string;
  value: number;
  description: string;
}

const applicationData: ApplicationDataPoint[] = [
  { name: 'Financial Services', value: 30, description: "Portfolio optimization, risk analysis, fraud detection" },
  { name: 'Healthcare & Pharmaceuticals', value: 25, description: "Drug discovery, protein folding, personalized medicine" },
  { name: 'Cybersecurity', value: 20, description: "Quantum-resistant cryptography, secure communications" },
  { name: 'Logistics & Supply Chain', value: 15, description: "Route optimization, inventory management" },
  { name: 'Energy & Climate', value: 10, description: "Material science for batteries, climate modeling" },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

interface RenderActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: ApplicationDataPoint;
  percent: number;
  value: number;
}

const renderActiveShape = (props: RenderActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm md:text-base">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs md:text-sm">{`${value}%`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs md:text-sm">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="#999" className="text-xs md:text-sm">
        {payload.description}
      </text>
    </g>
  );
};

interface ChartComponentProps {
  isMobile: boolean;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ isMobile }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 300 : 500}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          // @ts-expect-error: The type definition for activeShape in recharts is too strict
          activeShape={renderActiveShape}
          data={applicationData}
          cx="50%"
          cy="50%"
          innerRadius={isMobile ? 40 : 60}
          outerRadius={isMobile ? 60 : 80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {applicationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {!isMobile && <Legend />}
      </PieChart>
    </ResponsiveContainer>
  );
};

const LazyChartComponent = dynamic(() => Promise.resolve(ChartComponent), { ssr: false })

export function ApplicationChartComponent() {
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
        <CardTitle className="text-xl md:text-2xl font-semibold text-blue-300">Quantum Computing Applications by Industry</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[500px]">
        <LazyChartComponent isMobile={isMobile} />
      </CardContent>
    </Card>
  )
}
