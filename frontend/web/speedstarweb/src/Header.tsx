import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./assets/whitelogo.svg";
import { FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaComments } from "react-icons/fa";

const ContactDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => setIsOpen(false); // Close on item click

  return (
    <div className="relative">
      {/* Call Us link */}
      <a
        href="#contact-us"
        className="text-white flex items-center space-x-2 hover:text-yellow-400 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span>Call Us</span>
      </a>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute mt-2 bg-white rounded-md shadow-lg py-2 w-56 z-10"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <a
            href="tel:+254 114 353111"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
            onClick={closeDropdown} // Close dropdown after clicking item
          >
            <FaPhoneAlt className="inline-block mr-2" />
            +254 114 353111
          </a>
          <a
            href="mailto:info@speedstardeliveries.com"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
            onClick={closeDropdown}
          >
            <FaEnvelope className="inline-block mr-2" />
            info@speedstardeliveries.com
          </a>
          <a
            href="#live-chat"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
            onClick={closeDropdown}
          >
            <FaComments className="inline-block mr-2" />
            Live Chat
          </a>
        </div>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header className="fixed mb-10 top-0 left-0 w-full bg-orange-900 text-white border-b-2 z-50 shadow-xl">
      <div className="container mx-auto md:px-3 px-1 py-0 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Speedstar Logo"
            className="md:w-20 md:h-20 w-20 h-20 mr-3 ml-2 transform scale-150 hover:scale-175 transition-transform duration-300 "
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <Link
            to="/"
            className={`${isActiveLink("/") ? "text-yellow-300" : "hover:text-yellow-300"} transition duration-300`}
          >
            Home
          </Link>
          <Link
            to="/Service"
            className={`${isActiveLink("/Service") ? "text-yellow-300" : "hover:text-yellow-300"} transition duration-300`}
          >
            Services
          </Link>
          <Link
            to="/AboutUs"
            className={`${isActiveLink("/AboutUs") ? "text-yellow-300" : "hover:text-yellow-300"} transition duration-300`}
          >
            About Us
          </Link>
          <Link
            to="/FAQ"
            className={`${isActiveLink("/FAQ") ? "text-yellow-300" : "hover:text-yellow-300"} transition duration-300`}
          >
            FAQ
          </Link>
          <a
            href="#contact-us"
            className="hover:text-yellow-300 transition duration-300"
          >
            <ContactDropdown />
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/track-order"
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold shadow-lg transition duration-300"
          >
            Track Order
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden mr-2">
          <button
            className="text-white focus:outline-none"
            aria-label="Mobile Menu Toggle"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-orange-800 text-white transition-all duration-500 ease-in-out">
          <nav className="px-6 py-4 space-y-4">
            <Link
              to="/"
              className={`${isActiveLink("/") ? "text-yellow-300" : "hover:text-yellow-300"} block transition duration-300`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/Service"
              className={`${isActiveLink("/Service") ? "text-yellow-300" : "hover:text-yellow-300"} block transition duration-300`}
              onClick={closeMobileMenu}
            >
              Services
            </Link>
            <Link
              to="/AboutUs"
              className={`${isActiveLink("/AboutUs") ? "text-yellow-300" : "hover:text-yellow-300"} block transition duration-300`}
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
            <Link
              to="/FAQ"
              className={`${isActiveLink("/FAQ") ? "text-yellow-300" : "hover:text-yellow-300"} block transition duration-300`}
              onClick={closeMobileMenu}
            >
              FAQ
            </Link>
            <a
              href="#contact-us"
              className="block hover:text-yellow-300 transition duration-300"
              onClick={closeMobileMenu}
            >
              <ContactDropdown />
            </a>
            <Link
              to="/track-order"
              className="block bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition duration-300"
              onClick={closeMobileMenu}
            >
              Track Order
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
