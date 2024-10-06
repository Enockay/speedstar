import React from 'react';

const DashboardHome: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">Welcome to the Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">Manage your account, view analytics, and explore more tools</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
          <ul className="space-y-3">
            <li>
              <a href="/profile" className="text-blue-500 hover:underline">Manage Profile</a>
            </li>
            <li>
              <a href="/settings" className="text-blue-500 hover:underline">Account Settings</a>
            </li>
            <li>
              <a href="/analytics" className="text-blue-500 hover:underline">View Analytics</a>
            </li>
            <li>
              <a href="/support" className="text-blue-500 hover:underline">Support</a>
            </li>
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            <li className="text-gray-700">✔️ You updated your profile</li>
            <li className="text-gray-700">✔️ New message from support</li>
            <li className="text-gray-700">✔️ You uploaded a document</li>
            <li className="text-gray-700">✔️ Your last payment was successful</li>
          </ul>
        </div>

        {/* Analytics Overview */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics Overview</h2>
          <div className="text-gray-700">
            <p className="mb-2">Total Views: <span className="font-bold">12,345</span></p>
            <p className="mb-2">Impressions: <span className="font-bold">8,765</span></p>
            <p className="mb-2">Engagements: <span className="font-bold">5,432</span></p>
            <p className="mb-2">Total Earnings: <span className="font-bold">$2,345</span></p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Take Action</h2>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">Create New Post</button>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600 transition-colors">Analyze Performance</button>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
          <p className="text-gray-700">You have 3 unread notifications</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
