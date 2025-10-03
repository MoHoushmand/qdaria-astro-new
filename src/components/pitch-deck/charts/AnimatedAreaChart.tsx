import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface DataPoint {
  [key: string]: string | number;
}

interface AnimatedAreaChartProps {
  data: DataPoint[];
  areas: {
    dataKey: string;
    fill: string;
    stroke: string;
    name?: string;
    fillOpacity?: number;
  }[];
  xAxisKey: string;
  height?: number;
  title?: string;
  description?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  stacked?: boolean;
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
              {typeof entry.value === 'number'
                ? `€${entry.value.toLocaleString()}${entry.value > 1000 ? 'M' : 'K'}`
                : entry.value
              }
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AnimatedAreaChart: React.FC<AnimatedAreaChartProps> = ({
  data,
  areas,
  xAxisKey,
  height = 400,
  title,
  description,
  showGrid = true,
  showLegend = true,
  stacked = false,
  animationDuration = 1500
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
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
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            {areas.map((area, index) => (
              <linearGradient key={index} id={`gradient-${area.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={area.stroke} stopOpacity={area.fillOpacity || 0.8}/>
                <stop offset="95%" stopColor={area.stroke} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(4, 163, 255, 0.1)"
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
              iconType="rect"
            />
          )}

          {areas.map((area, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={area.dataKey}
              stroke={area.stroke}
              strokeWidth={3}
              fill={`url(#gradient-${area.dataKey})`}
              name={area.name || area.dataKey}
              stackId={stacked ? "1" : undefined}
              animationDuration={animationDuration}
              animationEasing="ease-in-out"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
