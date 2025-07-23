const StatsCard = ({ title, value, icon, trend }) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  };

  const trendIcons = {
    up: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12 7a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L12 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 7z" clipRule="evenodd" />
      </svg>
    ),
    down: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12 13a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L12 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0112 13z" clipRule="evenodd" />
      </svg>
    ),
    neutral: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 13a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 10.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 13z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${trendColors[trend]} bg-opacity-20`}>
          {trendIcons[trend]}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm ${trendColors[trend]} flex items-center`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} 
          {trend !== 'neutral' && ' 5%'}
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last week</span>
      </div>
    </div>
  );
};

export default StatsCard;