import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const LeaveTrend = () => {
  const [data, setData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ims-devsandbox.codeivy.io/api/invoice-analysis');
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Leave Trend',
        data: data.values,
        backgroundColor: '#0059FF',
        borderColor: '#0059FF',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="w-full">
        <Bar
          data={chartData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default LeaveTrend;