import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './cobProgressChart.scss';
 
const CobProgressChart = () => {
  const [progressData, setProgressData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/cobProgress');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();    
 
        const extractedData = jsonData.body
          .map(item => ({
            name: item.Service,
            value: parseFloat(item.Progress.split(' ')[2])
          }));
 
        setProgressData(extractedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
 
    const intervalId = setInterval(fetchData, 7000);
 
    return () => clearInterval(intervalId);
 
  }, []);
 
 
 
  // Default ticks for the Y-axis
  const yAxisTicks = [0, 25, 50, 75, 100];
 
  return (
    <div className='parentDiv row mt-3'>
  <div className="cobProgressChart col-md-12 col-sm-12">
    <div className='header2 m-0 col-md-12 d-flex justify-content-center'>Cob Progress Chart</div>
 
    <ResponsiveContainer width="100%" height={225}>
      <BarChart
        data={progressData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        barSize={20}>
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis ticks={yAxisTicks} />
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="value" fill="#4A0575" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
  );
};
 
export default CobProgressChart;