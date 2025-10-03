import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface DataPoint {
  [key: string]: string | number;
}

interface AnimatedBarChartProps {
  data: DataPoint[];
  bars: {
    dataKey: string;
    fill: string;
    name?: string;
  }[];
  xAxisKey: string;
  height?: number;
  title?: string;
  description?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  horizontal?: boolean;
  animationDuration?: number;
  colorByValue?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border-2 border-cyan-400/50 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        <p className="text-cyan-400 font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="text-gray-300">{entry.name}:</span>
            <span className="font-bold" style={{ color: entry.fill }}>
              {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const getGradientColor = (value: number, maxValue: number) => {
  const percentage = (value / maxValue) * 100;
  if (percentage >= 80) return '#CCFF00';
  if (percentage >= 60) return '#9AFF00';
  if (percentage >= 40) return '#66FF00';
  if (percentage >= 20) return '#04a3ff';
  return '#0284c7';
};

export const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  data,
  bars,
  xAxisKey,
  height = 400,
  title,
  description,
  showGrid = true,
  showLegend = true,
  horizontal = false,
  animationDuration = 1500,
  colorByValue = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ChartComponent = horizontal ? BarChart : BarChart;
  const maxValue = colorByValue
    ? Math.max(...data.map(d => Math.max(...bars.map(b => Number(d[b.dataKey]) || 0))))
    : 0;

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
        <ChartComponent
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(4, 163, 255, 0.1)"
              strokeOpacity={0.5}
            />
          )}

          <XAxis
            type={horizontal ? 'number' : 'category'}
            dataKey={horizontal ? undefined : xAxisKey}
            stroke="#94a3b8"
            fontSize={12}
            tickLine={{ stroke: '#475569' }}
          />

          <YAxis
            type={horizontal ? 'category' : 'number'}
            dataKey={horizontal ? xAxisKey : undefined}
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

          {bars.map((bar, index) => (
            <Bar
              key={index}
              dataKey={bar.dataKey}
              fill={bar.fill}
              name={bar.name || bar.dataKey}
              animationDuration={animationDuration}
              animationEasing="ease-out"
              animationBegin={index * 100}
              onMouseEnter={(_, idx) => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              radius={[8, 8, 0, 0]}
            >
              {colorByValue && data.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={getGradientColor(Number(entry[bar.dataKey]) || 0, maxValue)}
                  opacity={hoveredIndex === null || hoveredIndex === idx ? 1 : 0.6}
                />
              ))}
            </Bar>
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    </motion.div>
  );
};
