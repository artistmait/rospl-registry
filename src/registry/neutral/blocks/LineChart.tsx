/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface LineChartDataPoint {
  [key: string]: string | number;
}

interface LineChartProps {
  data: LineChartDataPoint[];
  xKey: string;
  lineKeys: string[];
  width?: number | string;
  height?: number;
  lineColors?: string[];
  gridColor?: string;
  bgColor?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  title?: string;
  className?: string;
}

const defaultColors = ["#c0daed", "#e1e5ed", "#f2f3f5", "#D1D5DB"]; // black–grey–white shades

const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  xKey,
  lineKeys,
  width = "100%",
  height = 300,
  lineColors,
  gridColor = "#E5E7EB", // light grey
  bgColor = "#FFFFFF", // pure white
  showLegend = true,
  showTooltip = true,
  title,
  className = "",
}) => {
  const colors = useMemo(
    () => (lineColors?.length ? lineColors : defaultColors),
    [lineColors]
  );

  // Defensive: empty state
  if (!data || data.length === 0) {
    return (
      <div
        className={`rounded-2xl shadow-sm p-4 flex items-center justify-center ${className}`}
        style={{
          backgroundColor: "#FFFFFF",
          color: "#9CA3AF",
          border: "1px solid #E5E7EB",
        }}
      >
        <span className="text-sm font-medium">No data available</span>
      </div>
    );
  }

  // Use fixed height and stable layout wrapper to prevent infinite resize loops
  return (
    <div
      className={`rounded-2xl shadow-sm border border-gray-200 p-4 ${className}`}
      style={{
        backgroundColor: bgColor,
        color: "#111827",
        minHeight: height + 60, // padding + header buffer
      }}
    >
      {title && (
        <h2 className="text-lg font-semibold mb-4 text-center text-gray-200">
          {title}
        </h2>
      )}

      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data as any}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: "#FFFFFF" }}
              axisLine={{ stroke: "#D1D5DB" }}
            />
            <YAxis
              tick={{ fill: "#FFFFFF" }}
              axisLine={{ stroke: "#D1D5DB" }}
            />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  color: "#111827",
                }}
                labelStyle={{ color: "#ebedf2", fontWeight: 500 }}
                cursor={{ stroke: "#9CA3AF", strokeWidth: 1 }}
              />
            )}
            {showLegend && (
              <Legend wrapperStyle={{ color: "#4B5563", fontSize: 12 }} />
            )}

            {lineKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 3, fill: colors[index % colors.length] }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(LineChartComponent);
