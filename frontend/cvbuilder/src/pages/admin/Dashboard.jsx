import StatsCard from '../../components/dashboard/StatsCard';
import useFetch from '../../api/hooks/useFetch';
import Analytics from './Analytics';
import PieChart from '../../components/dashboard/PieChart';
import Lottie from "lottie-react";
import robotAnimation from '../../assets/robot3.json';  // Adjust path as needed
import { useEffect, useState } from 'react';
import { useTypewriter } from '../../components/features/UseTypeWriter';
import LottieRobot from "../../components/dashboard/LottieRobot";
import CreationChart from "../../components/dashboard/CreationChart";

const Dashboard = () => {
  const { data: rawUsers } = useFetch('auth/users');
const { data: rawCvs } = useFetch('/cv/all-cvs');
const { data: stats } = useFetch('/cv/usage-stats');

  // Fallback date generator from UUID
const fallbackCreatedAt = (uuid) => {
  if (typeof uuid !== 'string') {
    console.warn('Invalid UUID for fallbackCreatedAt:', uuid);
    return new Date().toISOString();
  }

  const start = new Date(2025, 0, 1);
  const offset = parseInt(uuid.replace(/-/g, '').slice(0, 8), 16) % 180;
  const date = new Date(start);
  date.setDate(start.getDate() + offset);
  return date.toISOString();
};


  const users = rawUsers?.map(user => ({
  ...user,
  createdAt: user.createdAt || fallbackCreatedAt(user.id || user.uuid),
})) || [];

const cvs = rawCvs?.map(cv => ({
  ...cv,
  createdAt: cv.createdAt || fallbackCreatedAt(cv.id || cv.uuid),
})) || [];

  // Recent users count in last 7 days
  const recentUsers = users?.filter(user => 
    new Date(user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  )?.length || 0;


  // Defensive grouping function by date (YYYY-MM-DD)
  const groupByDate = (items, dateField) => {
    if (!items) return [];

    const grouped = items.reduce((acc, item) => {
      const dateValue = item[dateField];
      if (!dateValue) {
        console.warn(`Missing date for item:`, item);
        return acc;
      }
      
      const dateObj = new Date(dateValue);
      if (isNaN(dateObj.getTime())) {
        console.warn(`Invalid date "${dateValue}" for item:`, item);
        return acc;
      }

      const date = dateObj.toISOString().slice(0, 10);
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Get counts grouped by date for users and cvs
  const userCreationData = groupByDate(users, "createdAt");
  const cvCreationData = groupByDate(cvs, "createdAt");

  // Create a sorted list of all unique dates from both data sets
  const dates = Array.from(
    new Set([
      ...userCreationData.map((d) => d.date),
      ...cvCreationData.map((d) => d.date),
    ])
  ).sort();

  // Combine counts for each date (usersCreated, cvsCreated)
  const combinedData = dates.map((date) => {
    const userEntry = userCreationData.find((d) => d.date === date);
    const cvEntry = cvCreationData.find((d) => d.date === date);
    return {
      date,
      usersCreated: userEntry ? userEntry.count : 0,
      cvsCreated: cvEntry ? cvEntry.count : 0,
    };
  });

  return (
    <div>

      <div className="flex gap-6 items-center mb-8">
        <div className="flex-1 max-w-sm">
          <LottieRobot />
        </div>

        <div className="flex-1">
          <CreationChart data={combinedData} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Users" 
          value={users?.length || 0} 
          icon="👥"
          trend="up"
        />
        <StatsCard 
          title="CVs Created" 
          value={cvs?.length || 0} 
          icon="📄"
          trend="up"
        />
        <StatsCard 
          title="Recent Users" 
          value={recentUsers} 
          icon="🆕"
          trend={recentUsers > 0 ? "up" : "neutral"}
        />
        <StatsCard 
          title="Active Features" 
          value={stats ? Object.keys(stats).length : 0} 
          icon="⚡"
          trend="up"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {users?.slice(0, 5).map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
