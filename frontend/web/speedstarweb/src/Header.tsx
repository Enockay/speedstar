import React, { useState } from "react";
import logo from "./assets/whitelogo.svg";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-orange-900 text-white shadow-lg z-50">
        <div className="container mx-auto md:px-6 px-3 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Speedstar Logo" className="w-12 h-12 mr-3" />
            <span className="md:text-2xl text-xl font-extrabold tracking-wide">
              Speedstar Delivery
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-lg font-medium">
            <a href="/Service" className="hover:text-yellow-300 transition duration-300">
              Services
            </a>
            <a href="#pricing" className="hover:text-yellow-300 transition duration-300">
              Pricing
            </a>
            <a href="/AboutUs" className="hover:text-yellow-300 transition duration-300">
              About Us
            </a>
            <a href="#faq" className="hover:text-yellow-300 transition duration-300">
              FAQ
            </a>
            <a href="#contact-us" className="hover:text-yellow-300 transition duration-300">
              Contact Us
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex space-x-4 items-center">
            <a
              href="#track-order"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold shadow-lg transition duration-300"
            >
              Track Order
            </a>
            <a
              href="#contact-us"
              className="text-white flex items-center space-x-2 hover:text-yellow-400 transition duration-300"
            >
              <FaPhoneAlt className="w-5 h-5" />
              <span>Call Us</span>
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
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
              <a href="/Service" className="block hover:text-yellow-300 transition duration-300">
                Services
              </a>
              <a href="#pricing" className="block hover:text-yellow-300 transition duration-300">
                Pricing
              </a>
              <a href="/AboutUs" className="block hover:text-yellow-300 transition duration-300">
                About Us
              </a>
              <a href="#faq" className="block hover:text-yellow-300 transition duration-300">
                FAQ
              </a>
              <a href="#contact-us" className="block hover:text-yellow-300 transition duration-300">
                Contact Us
              </a>
              <a href="#track-order" className="block bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition duration-300">
                Track Order
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
