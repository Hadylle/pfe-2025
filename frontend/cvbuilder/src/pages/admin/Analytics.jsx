import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import StatsCard from '../../components/dashboard/StatsCard';
import PieChart from '../../components/dashboard/PieChart';
import RatingDistributionChart from '../../components/dashboard/RatingDistributionChart';
import CreationChart from '../../components/dashboard/CreationChart';
import { FiUsers, FiFileText, FiActivity, FiStar } from 'react-icons/fi';

const Analytics = () => {
  const { data: stats, loading, error } = useFetch('/cv/usage-stats');
  const { data: users } = useFetch('auth/users');
  const { data: cvs } = useFetch('/cv/all-cvs');
  const { data: ratings } = useFetch('/cv/page-ratings');

  // Color palette
  const colors = {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#EC4899',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#F43F5E',
    info: '#14B8A6'
  };

  // Process rating data for charts
  const processRatingData = () => {
    if (!ratings) return { byPage: [], overTime: [] };

    // Group by page
    const pageGroups = ratings.reduce((acc, rating) => {
      const page = rating.pageContext || 'Unknown';
      if (!acc[page]) {
        acc[page] = { sum: 0, count: 0 };
      }
      acc[page].sum += rating.ratingValue;
      acc[page].count++;
      return acc;
    }, {});

    const byPage = Object.entries(pageGroups).map(([page, { sum, count }]) => ({
      page,
      average: Math.round(sum / count),
      count
    }));

    // Group by time (daily)
    const timeGroups = ratings.reduce((acc, rating) => {
      const date = new Date(rating.timestamp).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { sum: 0, count: 0 };
      }
      acc[date].sum += rating.ratingValue;
      acc[date].count++;
      return acc;
    }, {});

    const overTime = Object.entries(timeGroups)
      .map(([date, { sum, count }]) => ({
        date,
        average: Math.round(sum / count),
        count
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return { byPage, overTime };
  };

  const { byPage, overTime } = processRatingData();

  if (loading) return <div className="text-center py-8">Loading analytics...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading analytics</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg">
            Last 7 days
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
            Last 30 days
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={users?.length || 0}
          icon={<FiUsers className="text-2xl" />}
          color={colors.primary}
          trend="up"
        />
        <StatsCard
          title="CVs Created"
          value={cvs?.length || 0}
          icon={<FiFileText className="text-2xl" />}
          color={colors.secondary}
          trend="up"
        />
        <StatsCard
          title="Active Features"
          value={stats ? Object.keys(stats).length : 0}
          icon={<FiActivity className="text-2xl" />}
          color={colors.accent}
          trend="up"
        />
        <StatsCard
          title="Avg. Rating"
          value={byPage.length ? Math.round(byPage.reduce((sum, item) => sum + item.average, 0) / byPage.length) : 0}
          icon={<FiStar className="text-2xl" />}
          color={colors.success}
          trend="up"
        />
      </div>

      {/* Rating Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
          <div className="h-80">
            <RatingDistributionChart 
              data={ratings || []}
              colors={[colors.primary, colors.secondary, colors.accent]}
            />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Average Rating by Page</h2>
          <div className="h-80">
            <CreationChart 
              data={byPage.map(item => ({
                date: item.page,
                usersCreated: item.average,
                cvsCreated: item.count
              }))}
              hideCVs={true}
            />
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Rating Trend Over Time</h2>
          <div className="h-80">
            <CreationChart 
              data={overTime.map(item => ({
                date: item.date,
                usersCreated: item.average,
                cvsCreated: item.count
              }))}
            />
          </div>
        </div>
      </div>

      {/* Feature Usage */}
      {stats && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Feature Usage</h2>
          <div className="h-96">
            <PieChart
              data={{
                labels: Object.keys(stats),
                datasets: [{
                  data: Object.values(stats),
                  backgroundColor: [
                    colors.primary, 
                    colors.secondary, 
                    colors.accent, 
                    colors.success,
                    colors.warning,
                    colors.danger,
                    colors.info
                  ],
                  borderWidth: 0
                }]
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;