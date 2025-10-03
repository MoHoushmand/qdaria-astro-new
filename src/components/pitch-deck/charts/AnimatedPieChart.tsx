import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import { motion } from 'framer-motion';

interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface AnimatedPieChartProps {
  data: DataPoint[];
  height?: number;
  title?: string;
  description?: string;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  animationDuration?: number;
  showPercentage?: boolean;
}

const COLORS = ['#CCFF00', '#9AFF00', '#66FF00', '#04a3ff', '#0284c7', '#38bdf8'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900/95 border-2 border-cyan-400/50 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        <p className="text-white font-semibold mb-1">{data.name}</p>
        <p className="text-cyan-400 font-bold">
          {typeof data.value === 'number' ? data.value.toLocaleString() : data.value}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {data.payload.percent ? `${(data.payload.percent * 100).toFixed(1)}%` : ''}
        </p>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
        opacity={0.8}
      />
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fill="#fff"
        fontSize={16}
        fontWeight="bold"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 15}
        textAnchor="middle"
        fill="#CCFF00"
        fontSize={20}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

export const AnimatedPieChart: React.FC<AnimatedPieChartProps> = ({
  data,
  height = 400,
  title,
  description,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 120,
  animationDuration = 1500,
  showPercentage = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
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
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={showPercentage}
            label={showPercentage ? (entry) => `${entry.name}: ${entry.value}` : false}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={animationDuration}
            animationEasing="ease-out"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
                opacity={activeIndex === undefined || activeIndex === index ? 1 : 0.6}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          {showLegend && (
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
