import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import PieChart from '../../components/dashboard/PieChart';
import StatsCard from '../../components/dashboard/StatsCard';

const Analytics = () => {
  const { data: stats, loading, error } = useFetch('/cv/usage-stats');
  const { data: users } = useFetch('auth/users');
  const { data: cvs } = useFetch('/cv/all-cvs');

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
    }]
  });

  useEffect(() => {
    if (stats) {
      const labels = Object.keys(stats);
      const data = Object.values(stats);
      const backgroundColors = [
        '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', 
        '#F97316', '#F59E0B', '#10B981', '#14B8A6'
      ];
      
      setChartData({
        labels,
        datasets: [{
          data,
          backgroundColor: backgroundColors.slice(0, labels.length),
        }]
      });
    }
  }, [stats]);

  if (loading) return <div className="text-center py-8">Loading analytics...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading analytics</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Total Users" 
          value={users?.length || 0} 
          icon="👥"
          trend="up"
        />
        <StatsCard 
          title="Total CVs Created" 
          value={cvs?.length || 0} 
          icon="📄"
          trend="up"
        />
        <StatsCard 
          title="Active Features" 
          value={stats ? Object.keys(stats).length : 0} 
          icon="⚡"
          trend="up"
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Feature Usage</h2>
        <div className="h-96">
          <PieChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;