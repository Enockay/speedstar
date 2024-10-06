// src/components/Sidebar.tsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaUsers,
  FaHandshake,
  FaBook,
  FaDollarSign,
  FaChartBar,
  FaFileAlt,
  FaCog,
  FaHome
} from 'react-icons/fa';
import { MdKeyboardArrowDown ,MdHotel } from 'react-icons/md';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, closeSidebar }) => {
  const [isUserMgmtOpen, setIsUserMgmtOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Function to handle link click
  const handleLinkClick = () => {
    // Only close Sidebar on small screens
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black opacity-50" 
            onClick={closeSidebar}
          ></div>

          {/* Sidebar */}
          <aside className="relative w-64 bg-orange-950 text-white">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 focus:outline-none" 
              onClick={closeSidebar}
              aria-label="Close Menu"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Close Icon */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav className="p-6 mt-10">
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded hover:bg-gray-700 ${
                        isActive ? 'bg-gray-700' : ''
                      }`
                    }
                    onClick={handleLinkClick}
                  >
                    <FaHome className="mr-3" />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => setIsUserMgmtOpen(!isUserMgmtOpen)}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
                  >
                    <FaUsers className="mr-3" />
                    User Management
                    <MdKeyboardArrowDown className={`ml-auto transition-transform ${isUserMgmtOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {isUserMgmtOpen && (
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>
                        <NavLink
                          to="/admin/users"
                          className={({ isActive }) =>
                            `flex items-center p-2 rounded hover:bg-gray-700 ${
                              isActive ? 'bg-gray-700' : ''
                            }`
                          }
                          onClick={handleLinkClick}
                        >
                          All Users
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/users/create"
                          className={({ isActive }) =>
                            `flex items-center p-2 rounded hover:bg-gray-700 ${
                              isActive ? 'bg-gray-700' : ''
                            }`
                          }
                          onClick={handleLinkClick}
                        >
                          Add User
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                {/* Add other navigation items similarly */}
                <li>
                  <NavLink
                    to="/admin/partners"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded hover:bg-gray-700 ${
                        isActive ? 'bg-gray-700' : ''
                      }`
                    }
                    onClick={handleLinkClick}
                  >
                    <FaHandshake className="mr-3" />
                    Partner Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/bookings"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded hover:bg-gray-700 ${
                        isActive ? 'bg-gray-700' : ''
                      }`
                    }
                    onClick={handleLinkClick}
                  >
                    <FaBook className="mr-3" />
                    Booking Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/payments"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded hover:bg-gray-700 ${
                        isActive ? 'bg-gray-700' : ''
                      }`
                    }
                    onClick={handleLinkClick}
                  >
                    <FaDollarSign className="mr-3" />
                    Payment Management
                  </NavLink>
                </li>
                <li>
              <NavLink
                to="/admin/hotel"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                <MdHotel className="mr-3" />
               Hotel Management
              </NavLink>
            </li>
                <li>
                  <NavLink
                    to="/admin/reviews-reports"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded hover:bg-gray-700 ${
                        isActive ? 'bg-gray-700' : ''
                      }`
                    }
                    onClick={handleLinkClick}
                  >
                    <FaFileAlt className="mr-3" />
                    Reviews & Reports
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/analytics"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded hover:bg-gray-700 ${
                        isActive ? 'bg-gray-700' : ''
                      }`
                    }
                    onClick={handleLinkClick}
                  >
                    <FaChartBar className="mr-3" />
                    Analytics Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/logs"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded hover:bg-gray-700 ${
                        isActive ? 'bg-gray-700' : ''
                      }`
                    }
                    onClick={handleLinkClick}
                  >
                    <FaFileAlt className="mr-3" />
                    Admin Logs
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
                  >
                    <FaCog className="mr-3" />
                    Settings
                    <MdKeyboardArrowDown className={`ml-auto transition-transform ${isSettingsOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {isSettingsOpen && (
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>
                        <NavLink
                          to="/admin/settings/profile"
                          className={({ isActive }) =>
                            `flex items-center p-2 rounded hover:bg-gray-700 ${
                              isActive ? 'bg-gray-700' : ''
                            }`
                          }
                          onClick={handleLinkClick}
                        >
                          Profile Settings
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/settings/system"
                          className={({ isActive }) =>
                            `flex items-center p-2 rounded hover:bg-gray-700 ${
                              isActive ? 'bg-gray-700' : ''
                            }`
                          }
                          onClick={handleLinkClick}
                        >
                          System Settings
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Static Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-orange-950 text-white">
        <nav className="p-6">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                <FaHome className="mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setIsUserMgmtOpen(!isUserMgmtOpen)}
                className="flex items-center w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
              >
                <FaUsers className="mr-3" />
                User Management
                <MdKeyboardArrowDown className={`ml-auto transition-transform ${isUserMgmtOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isUserMgmtOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li>
                    <NavLink
                      to="/admin/users"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded hover:bg-gray-700 ${
                          isActive ? 'bg-gray-700' : ''
                        }`
                      }
                    >
                      All Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/users/create"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded hover:bg-gray-700 ${
                          isActive ? 'bg-gray-700' : ''
                        }`
                      }
                    >
                      Add User
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            {/* Add other navigation items similarly */}
            <li>
              <NavLink
                to="/admin/partners"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                <FaHandshake className="mr-3" />
                Partner Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/bookings"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                <FaBook className="mr-3" />
                Booking Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/payments"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                <FaDollarSign className="mr-3" />
                Payment Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/hotel"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                <MdHotel className="mr-3" />
               Hotel Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reviews-reports"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                <FaFileAlt className="mr-3" />
                Reviews & Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/analytics"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                <FaChartBar className="mr-3" />
                Analytics Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/logs"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                <FaFileAlt className="mr-3" />
                Admin Logs
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
              >
                <FaCog className="mr-3" />
                Settings
                <MdKeyboardArrowDown className={`ml-auto transition-transform ${isSettingsOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isSettingsOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li>
                    <NavLink
                      to="/admin/settings/profile"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded hover:bg-gray-700 ${
                          isActive ? 'bg-gray-700' : ''
                        }`
                      }
                    >
                      Profile Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/settings/system"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded hover:bg-gray-700 ${
                          isActive ? 'bg-gray-700' : ''
                        }`
                      }
                    >
                      System Settings
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
