"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

/**
 * Chart Component
 * Clean, professional data visualization
 * Design: Dune Analytics-inspired minimal charts
 */

export type ChartType = "line" | "bar" | "area" | "pie";

export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface CyberChartProps {
  data: ChartDataPoint[];
  type?: ChartType;
  dataKey?: string;
  xAxisKey?: string;
  gradient?: boolean;
  glow?: boolean;
  height?: number;
  className?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

/**
 * Clean color palette (Dune-inspired)
 */
const DEFAULT_COLORS = {
  primary: "#18181b", // Slate 900
  secondary: "#3b82f6", // Blue 500
  accent: "#22c55e", // Green 500
};

/**
 * Subtle gradients definition
 */
const ChartGradients: React.FC<{ colors: typeof DEFAULT_COLORS }> = ({
  colors,
}) => (
  <defs>
    <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={colors.primary} stopOpacity={0.15} />
      <stop offset="100%" stopColor={colors.primary} stopOpacity={0.02} />
    </linearGradient>
    <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={colors.secondary} stopOpacity={0.15} />
      <stop offset="100%" stopColor={colors.secondary} stopOpacity={0.02} />
    </linearGradient>
    <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={colors.accent} stopOpacity={0.15} />
      <stop offset="100%" stopColor={colors.accent} stopOpacity={0.02} />
    </linearGradient>
  </defs>
);

/**
 * Clean tooltip styling
 */
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: string | number;
    color?: string;
    dataKey?: string;
  }>;
  label?: string;
}

const CustomTooltip = React.memo<CustomTooltipProps>(
  ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    return (
      <div className="rounded-md border border-slate-200 bg-white p-3 shadow-lg">
        <p className="mb-2 text-sm font-medium text-slate-900">{label}</p>
        {payload.map((entry, index) => (
          <div
            key={`item-${entry.dataKey || index}`}
            className="flex items-center gap-2"
          >
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-slate-500">{entry.name}:</span>
            <span className="text-sm font-medium text-slate-900">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  },
);

// Chart axis styling
const AXIS_STYLE = {
  stroke: "#94a3b8", // Slate 400
  fontSize: "12px",
  fontFamily: "inherit",
};

const GRID_STYLE = {
  strokeDasharray: "3 3",
  stroke: "#e2e8f0", // Slate 200
};

/**
 * LineChart implementation
 */
const CleanLineChart = React.memo<
  CyberChartProps & { colors: typeof DEFAULT_COLORS }
>(
  ({
    data,
    dataKey = "value",
    xAxisKey = "name",
    colors,
    showGrid = true,
    showLegend = false,
    showTooltip = true,
    animate = true,
  }) => {
    return (
      <LineChart data={data}>
        <ChartGradients colors={colors} />
        {showGrid && <CartesianGrid {...GRID_STYLE} />}
        <XAxis
          dataKey={xAxisKey}
          {...AXIS_STYLE}
          tickLine={false}
          axisLine={false}
        />
        <YAxis {...AXIS_STYLE} tickLine={false} axisLine={false} />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={colors.secondary}
          strokeWidth={2}
          dot={{ fill: colors.secondary, r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: colors.secondary, strokeWidth: 0 }}
          isAnimationActive={animate}
        />
      </LineChart>
    );
  },
);

/**
 * BarChart implementation
 */
const CleanBarChart = React.memo<
  CyberChartProps & { colors: typeof DEFAULT_COLORS }
>(
  ({
    data,
    dataKey = "value",
    xAxisKey = "name",
    gradient,
    colors,
    showGrid = true,
    showLegend = false,
    showTooltip = true,
    animate = true,
  }) => {
    return (
      <BarChart data={data}>
        {gradient && <ChartGradients colors={colors} />}
        {showGrid && <CartesianGrid {...GRID_STYLE} />}
        <XAxis
          dataKey={xAxisKey}
          {...AXIS_STYLE}
          tickLine={false}
          axisLine={false}
        />
        <YAxis {...AXIS_STYLE} tickLine={false} axisLine={false} />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        <Bar
          dataKey={dataKey}
          fill={colors.secondary}
          radius={[4, 4, 0, 0]}
          isAnimationActive={animate}
        />
      </BarChart>
    );
  },
);

/**
 * AreaChart implementation
 */
const CleanAreaChart = React.memo<
  CyberChartProps & { colors: typeof DEFAULT_COLORS }
>(
  ({
    data,
    dataKey = "value",
    xAxisKey = "name",
    colors,
    showGrid = true,
    showLegend = false,
    showTooltip = true,
    animate = true,
  }) => {
    return (
      <AreaChart data={data}>
        <ChartGradients colors={colors} />
        {showGrid && <CartesianGrid {...GRID_STYLE} />}
        <XAxis
          dataKey={xAxisKey}
          {...AXIS_STYLE}
          tickLine={false}
          axisLine={false}
        />
        <YAxis {...AXIS_STYLE} tickLine={false} axisLine={false} />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={colors.secondary}
          strokeWidth={2}
          fill="url(#secondaryGradient)"
          isAnimationActive={animate}
        />
      </AreaChart>
    );
  },
);

/**
 * PieChart implementation
 */
const CleanPieChart = React.memo<
  CyberChartProps & { colors: typeof DEFAULT_COLORS }
>(
  ({
    data,
    dataKey = "value",
    colors,
    showLegend = true,
    showTooltip = true,
    animate = true,
  }) => {
    const COLORS = [
      colors.primary,
      colors.secondary,
      colors.accent,
      "#94a3b8",
      "#f59e0b",
    ];

    return (
      <PieChart>
        <ChartGradients colors={colors} />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          isAnimationActive={animate}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name || index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="white"
              strokeWidth={2}
            />
          ))}
        </Pie>
      </PieChart>
    );
  },
);

/**
 * Main Chart Component
 */
export const CyberChart = React.forwardRef<HTMLDivElement, CyberChartProps>(
  (
    {
      data,
      type = "line",
      dataKey = "value",
      xAxisKey = "name",
      gradient = true,
      glow = false, // Ignored in clean design
      height = 300,
      className,
      colors,
      showGrid = true,
      showLegend = false,
      showTooltip = true,
      animate = true,
    },
    ref,
  ) => {
    const [shouldAnimate, setShouldAnimate] = React.useState(true);

    React.useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setShouldAnimate(!mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setShouldAnimate(!e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const effectiveAnimate = shouldAnimate ? animate : false;

    const effectiveColors = {
      ...DEFAULT_COLORS,
      ...colors,
    };

    const renderChart = () => {
      const commonProps = {
        data,
        dataKey,
        xAxisKey,
        gradient,
        glow,
        colors: effectiveColors,
        showGrid,
        showLegend,
        showTooltip,
        animate: effectiveAnimate,
      };

      switch (type) {
        case "bar":
          return <CleanBarChart {...commonProps} />;
        case "area":
          return <CleanAreaChart {...commonProps} />;
        case "pie":
          return <CleanPieChart {...commonProps} />;
        case "line":
        default:
          return <CleanLineChart {...commonProps} />;
      }
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    );
  },
);

CyberChart.displayName = "CyberChart";

export { CyberChart as Chart };
