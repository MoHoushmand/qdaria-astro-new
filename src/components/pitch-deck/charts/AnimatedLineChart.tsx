import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface DataPoint {
  [key: string]: string | number;
}

interface AnimatedLineChartProps {
  data: DataPoint[];
  lines: {
    dataKey: string;
    stroke: string;
    strokeWidth?: number;
    name?: string;
  }[];
  xAxisKey: string;
  height?: number;
  title?: string;
  description?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  animationDuration?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border-2 border-cyan-400/50 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        <p className="text-cyan-400 font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="text-gray-300">{entry.name}:</span>
            <span className="font-bold" style={{ color: entry.color }}>
              {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AnimatedLineChart: React.FC<AnimatedLineChartProps> = ({
  data,
  lines,
  xAxisKey,
  height = 400,
  title,
  description,
  showGrid = true,
  showLegend = true,
  animationDuration = 1500
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedData, setAnimatedData] = useState<DataPoint[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // Animate data entry
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < data.length) {
        setAnimatedData(data.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, animationDuration / data.length);

    return () => clearInterval(interval);
  }, [data, animationDuration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={animatedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 212, 255, 0.1)"
              strokeOpacity={0.5}
            />
          )}

          <XAxis
            dataKey={xAxisKey}
            stroke="#94a3b8"
            fontSize={12}
            tickLine={{ stroke: '#475569' }}
          />

          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={{ stroke: '#475569' }}
          />

          <Tooltip content={<CustomTooltip />} />

          {showLegend && (
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
          )}

          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth || 3}
              name={line.name || line.dataKey}
              dot={{
                fill: line.stroke,
                strokeWidth: 2,
                r: 5,
                strokeOpacity: 0.8
              }}
              activeDot={{
                r: 8,
                strokeWidth: 2,
                stroke: line.stroke,
                fill: line.stroke
              }}
              animationDuration={animationDuration}
              animationEasing="ease-in-out"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
