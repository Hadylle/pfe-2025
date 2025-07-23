

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CreationChart = ({ data }) => {
  console.log('chart data:', data);

  return (
    <div className="w-full h-72 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center text-red-900">
        User & CV Creation Over Time
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="usersCreated"
            stroke="#4F46E5" // Indigo
            strokeWidth={3}
            activeDot={{ r: 8 }}
            animationDuration={800}
            name="Users Created"
          />
          <Line
            type="monotone"
            dataKey="cvsCreated"
            stroke="#730217" // Emerald
            strokeWidth={3}
            animationDuration={800}
            name="CVs Created"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CreationChart;
