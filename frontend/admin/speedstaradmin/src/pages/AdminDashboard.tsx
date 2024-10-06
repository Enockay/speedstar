import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
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
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Main content area with sidebar and outlet */}
      <div className="flex flex-grow min-h-[calc(100vh-100px)] overflow-y-auto max-h-screen">
        {/* Sidebar - hides on small screens */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:static lg:inset-auto lg:translate-x-0 lg:bg-transparent ${
            isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          } lg:opacity-100 lg:translate-x-0 lg:flex lg:w-64`}>
         <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </div>

        {/* Main Content */}
        <main className="flex-grow p-4 bg-gray-100 overflow-y-auto ">
          <Outlet /> {/* This will render the child components based on the nested routes */}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
