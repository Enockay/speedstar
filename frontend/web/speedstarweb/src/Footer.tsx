import React from 'react';
import mangunas from "./assets/magunaslogo.png";
import khetias from "./assets/khetiaslogo.jpeg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Links Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:underline">
                Pricing
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
          <ul className="space-y-2">
            <li>Main Office: Chuka University, Chuka, Kenya</li>
            <li>Email: info@speedstardeliveries.com</li>
            <li>Phone: +254 114 353111</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <ul className="flex space-x-4">
            <li>
              <a href="https://facebook.com" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" className="hover:underline">
                Twitter
              </a>
            </li>
          </ul>
        </div>

        {/* Partner Logos Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Our Partners</h4>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={mangunas}
              alt="Magunas Supermarket"
              className="h-12"
            />
            <img
              src={khetias}
              alt="Khetias Supermarket"
              className="h-12"
            />
            {/* Add more partner logos as necessary */}
          </div>
        </div>
      </div>

      {/* Legal and Newsletter Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded bg-gray-700 text-white"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded text-white"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Legal Section */}
        <div>
          <ul className="space-y-2">
            <li>
              <a href="/terms-of-service" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; {new Date().getFullYear()} Speedstar Delivery Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
