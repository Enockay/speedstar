import React, { useState } from "react";
import logo from "./assets/speedstarlogo.jpg";

const Header: React.FC = () => {
  // State for mobile menu toggle
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-orange-700 text-white shadow-md z-50">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Speedstar Logo" className="w-10 h-10 mr-2" />
            <span className="text-xl font-bold">Speedstar Delivery</span>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <a href="#book" className="hover:underline hidden">Book Now</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#pricing" className="hover:underline">Pricing</a>
            <a href="#learn-more" className="hover:underline">Learn More</a>
            <a href="#about-us" className="hover:underline">About Us</a>
            <a href="#faq" className="hover:underline">FAQ</a>
          </nav>
          {/* Mobile Navigation */}
          <div className="md:hidden text-left">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-orange-700 text-white">
            <nav className="px-4 py-2 space-y-2">
              <a href="#book" className="block hover:underline">
                Book Now
              </a>
              <a href="#learn-more" className="block hover:underline">
                Learn More
              </a>
              <a href="#services" className="block hover:underline">
                Services
              </a>
              <a href="#pricing" className="block hover:underline">
                Pricing
              </a>
              <a href="#about-us" className="block hover:underline">
                About Us
              </a>
              <a href="#faq" className="block hover:underline">
                FAQ
              </a>
              <a href="#contact-us" className="block hover:underline">
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
 export default Header;
