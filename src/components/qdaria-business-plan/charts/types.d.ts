declare module 'recharts' {
  import { FC, ReactElement } from 'react';

  interface ResponsiveContainerProps {
    width?: string | number;
    height?: string | number;
    children?: ReactElement;
  }

  interface LineChartProps {
    data?: any[];
    margin?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
  }

  interface LineProps {
    type?: string;
    dataKey: string;
    stroke?: string;
    strokeWidth?: number;
    name?: string;
    dot?: any;
    activeDot?: any;
  }

  interface AxisProps {
    dataKey?: string;
    stroke?: string;
    tick?: any;
    label?: any;
    type?: 'number' | 'category';
    domain?: [number, number];
    width?: number;
    tickFormatter?: (value: any) => string;
  }

  interface CartesianGridProps {
    strokeDasharray?: string;
    stroke?: string;
  }

  interface TooltipProps {
    contentStyle?: any;
    labelStyle?: any;
    itemStyle?: any;
    formatter?: (value: any, name: string, props: any) => any;
  }

  interface BarChartProps {
    data?: any[];
    layout?: 'horizontal' | 'vertical';
    margin?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
  }

  interface BarProps {
    dataKey: string;
    name?: string;
    fill?: string;
    radius?: number | [number, number, number, number];
  }

  interface LegendProps {
    wrapperStyle?: any;
  }

  interface RadarChartProps {
    cx?: string;
    cy?: string;
    outerRadius?: string;
    data?: any[];
  }

  interface RadarProps {
    name?: string;
    dataKey: string;
    stroke?: string;
    fill?: string;
    fillOpacity?: number;
  }

  interface PolarGridProps {
    stroke?: string;
  }

  interface PolarAngleAxisProps {
    dataKey: string;
    tick?: any;
  }

  interface PolarRadiusAxisProps {
    angle?: number;
    domain?: [number, number];
    tick?: any;
  }

  export const ResponsiveContainer: FC<ResponsiveContainerProps>;
  export const LineChart: FC<LineChartProps>;
  export const Line: FC<LineProps>;
  export const BarChart: FC<BarChartProps>;
  export const Bar: FC<BarProps>;
  export const XAxis: FC<AxisProps>;
  export const YAxis: FC<AxisProps>;
  export const CartesianGrid: FC<CartesianGridProps>;
  export const Tooltip: FC<TooltipProps>;
  export const Legend: FC<LegendProps>;
  export const RadarChart: FC<RadarChartProps>;
  export const Radar: FC<RadarProps>;
  export const PolarGrid: FC<PolarGridProps>;
  export const PolarAngleAxis: FC<PolarAngleAxisProps>;
  export const PolarRadiusAxis: FC<PolarRadiusAxisProps>;
}
