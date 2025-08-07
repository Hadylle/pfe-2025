import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CreationChart = ({ data, hideCVs = false }) => {
  return (
    <div className="w-full h-72 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {hideCVs ? 'Average Ratings' : 'Creation Over Time'}
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        {hideCVs ? (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="usersCreated"
              fill="#4F46E5"
              name="Average Rating"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="usersCreated"
              stroke="#4F46E5"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              animationDuration={800}
              name={hideCVs ? 'Rating' : 'Users Created'}
            />
            {!hideCVs && (
              <Line
                type="monotone"
                dataKey="cvsCreated"
                stroke="#730217"
                strokeWidth={3}
                animationDuration={800}
                name="CVs Created"
              />
            )}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default CreationChart;