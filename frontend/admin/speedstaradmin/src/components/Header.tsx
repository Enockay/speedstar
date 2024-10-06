// src/components/Header.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBell, 
  FaSearch 
} from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import user from '../assets/usericon.png';
import companyLogo from '../assets/speedstarlogo.svg';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-orange-900 text-white p-5 flex items-center justify-between relative">
      {/* Left Section: Logo and Menu Button (on small screens) */}
      <div className="flex items-center">
        {/* Menu Button for Small Screens */}
       
        {/* Logo and Company Name */}
        <div className="flex items-center">
          <img src={companyLogo} alt="Company Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-semibold">Admin</span>
        </div>
      </div>

      {/* Search Bar (Visible on md and larger screens) */}
      <div className="flex-1 mx-4 hidden md:flex justify-center">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:bg-gray-700"
          />
        </div>
      </div>

      {/* Right Section: Notification and User Profile */}
      <div className="flex items-center space-x-4">
        <button 
          className="relative focus:outline-none" 
          aria-label="Notifications"
        >
          <FaBell className="h-6 w-6" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
        </button>
        
        <button 
          className="md:hidden mr-2 focus:outline-none" 
          onClick={toggleSidebar}
          aria-label="Open Menu"
        >
          <svg 
            className="h-10 w-10 " 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hamburger Icon */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* User Avatar Dropdown */}
        <div className="relative md:block hidden" ref={dropdownRef}>
          <button 
            className="flex items-center focus:outline-none" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <img
              src={user}
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
            <MdKeyboardArrowDown className="ml-1" />
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-20"
              role="menu"
              aria-label="User Menu"
            >
              <Link to="/admin/profile" className="block px-4 py-2 hover:bg-gray-100" role="menuitem" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
              <Link to="/admin/settings" className="block px-4 py-2 hover:bg-gray-100" role="menuitem" onClick={() => setIsDropdownOpen(false)}>Settings</Link>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-100" 
                role="menuitem" 
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Add your logout logic here
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
