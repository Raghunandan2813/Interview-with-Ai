"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

interface ProgressChartProps {
  data: { date: string; score: number }[];
}

const ProgressChart = ({ data }: ProgressChartProps) => {
  const formattedData = data
    .map((item) => ({
      ...item,
      displayDate: dayjs(item.date).format("MMM D"),
    }))
    .reverse(); // Ensure chronological order if data is sorted desc

  if (!formattedData.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-dark-200/50">
        <p className="text-light-400">Not enough data to display progress.</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full rounded-xl border border-white/10 bg-dark-200 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-light-100">Performance Over Time</h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis
            dataKey="displayDate"
            stroke="#888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            stroke="#888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1C1C22", // dark-200
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fff",
            }}
            itemStyle={{ color: "#E4E7EB" }} // light-100
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1" // Indigo generic color for the line (adjust to theme if needed)
            strokeWidth={3}
            dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
