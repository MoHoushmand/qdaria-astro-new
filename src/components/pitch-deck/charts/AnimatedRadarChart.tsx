import React, { useState, useEffect } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface DataPoint {
  [key: string]: string | number;
}

interface AnimatedRadarChartProps {
  data: DataPoint[];
  radars: {
    dataKey: string;
    stroke: string;
    fill: string;
    fillOpacity?: number;
    name?: string;
  }[];
  height?: number;
  title?: string;
  description?: string;
  animationDuration?: number;
  angleKey: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border-2 border-cyan-400/50 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <span className="text-gray-300">{entry.name}:</span>
            <span className="font-bold" style={{ color: entry.stroke }}>
              {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AnimatedRadarChart: React.FC<AnimatedRadarChartProps> = ({
  data,
  radars,
  height = 400,
  title,
  description,
  animationDuration = 1500,
  angleKey
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        rotate: isVisible ? 0 : -5
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={data} margin={{ top: 20, right: 50, bottom: 20, left: 50 }}>
          <PolarGrid
            stroke="rgba(4, 163, 255, 0.3)"
            strokeWidth={1.5}
          />

          <PolarAngleAxis
            dataKey={angleKey}
            stroke="#94a3b8"
            fontSize={12}
            tick={{ fill: '#94a3b8' }}
          />

          <PolarRadiusAxis
            angle={30}
            stroke="#475569"
            fontSize={10}
            tick={{ fill: '#64748b' }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />

          {radars.map((radar, index) => (
            <Radar
              key={index}
              name={radar.name || radar.dataKey}
              dataKey={radar.dataKey}
              stroke={radar.stroke}
              fill={radar.fill}
              fillOpacity={radar.fillOpacity || 0.5}
              strokeWidth={2}
              animationDuration={animationDuration}
              animationEasing="ease-out"
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
