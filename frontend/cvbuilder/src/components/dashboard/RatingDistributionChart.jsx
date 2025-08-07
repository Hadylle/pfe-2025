import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const RatingDistributionChart = ({ data, colors }) => {
  const ratingGroups = [0, 20, 40, 60, 80, 100].map((min, i, arr) => {
    const max = arr[i+1] || 101;
    return {
      range: `${min}-${max-1}`,
      count: data.filter(r => r.ratingValue >= min && r.ratingValue < max).length
    };
  });

  return (
    <Chart
      type='bar'
      data={{
        labels: ratingGroups.map(g => g.range),
        datasets: [{
          label: 'Number of Ratings',
          data: ratingGroups.map(g => g.count),
          backgroundColor: colors,
          borderRadius: 6
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Ratings'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Rating Range'
            }
          }
        }
      }}
    />
  );
};

export default RatingDistributionChart;