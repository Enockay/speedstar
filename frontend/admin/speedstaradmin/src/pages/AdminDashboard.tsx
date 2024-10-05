// src/pages/AdminDashboard.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import Footer from '../components/Footer';

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow">
        <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

        {/* Main Content with Outlet */}
        <main className="flex-grow p-2 bg-gray-100">
          <h2 className="text-3xl font-semibold mb-4 hidden">Welcome to the Admin Dashboard</h2>
          <Outlet /> {/* This will render the child components based on the nested routes */}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
