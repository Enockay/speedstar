import React from 'react';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-2xl font-bold">1450</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">$50,000</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">User Growth</h3>
          <p className="text-2xl font-bold">120%</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
