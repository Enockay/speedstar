// src/components/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-orange-900 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Company Information */}
        <div className="mb-4 md:mb-0">
          <p>&copy; 2024 SPEEDSTAR DELIVERIES. All Rights Reserved.</p>
        </div>

        {/* Footer Links */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaLinkedinIn />
          </a>
          {/* Add more social icons as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
