import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
//import 'animate.css'; // Import animate.css for predefined animations

const FAQ: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', preferences: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="space-y-12">
      {/* FAQ Section */}
      <section className="bg-blue-100 mt-12 py-10 px-5 animate__animated animate__fadeInLeft animate__slower">
        <h2 className="text-2xl p-4 text-center font-bold mb-5 text-blue-900 shadow-lg animate__animated animate__pulse">
          We’re Here to Help
        </h2>
        <div className="space-y-4">
          <details className="bg-white shadow-2xl p-6 rounded-md hover:shadow-blue-500/50 transition-shadow duration-300">
            <summary className="font-semibold cursor-pointer">What areas does Speedstar cover?</summary>
            <p className="mt-2">Speedstar covers major cities in your region. For more details, check the service map.</p>
          </details>
          <details className="bg-white shadow-2xl p-6 rounded-md hover:shadow-blue-500/50 transition-shadow duration-300">
            <summary className="font-semibold cursor-pointer">How long does delivery take?</summary>
            <p className="mt-2">Delivery takes 24-48 hours, depending on your location.</p>
          </details>
          <details className="bg-white shadow-2xl p-6 rounded-md hover:shadow-blue-500/50 transition-shadow duration-300">
            <summary className="font-semibold cursor-pointer">How do I track my order?</summary>
            <p className="mt-2">You can track your order using the tracking number provided in your confirmation email.</p>
          </details>
          <details className="bg-white shadow-2xl p-6 rounded-md hover:shadow-blue-500/50 transition-shadow duration-300">
            <summary className="font-semibold cursor-pointer">What are the cancellation policies?</summary>
            <p className="mt-2">You can cancel within 24 hours of placing your order without any charges.</p>
          </details>
        </div>
      </section>

      {/* News/Blog Section */}
      <section className="bg-green-100 py-10 px-5 animate__animated animate__fadeInRight animate__slower">
        <h2 className="md:text-2xl p-4 text-xl font-bold mb-5 text-green-900 shadow-lg animate__animated animate__pulse">Stay Updated with Speedstar</h2>
        <div className="space-y-4">
          <article className="bg-white shadow-2xl p-5 rounded-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold">New Service Areas and Delivery Partners</h3>
            <p className="mt-2">We are excited to announce expansion into new cities and partnerships with local businesses.</p>
          </article>
          <article className="bg-white shadow-2xl p-5 rounded-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold">Community Stories</h3>
            <p className="mt-2">Get insights into our partnerships and hear inspiring stories from our customers.</p>
          </article>
          <article className="bg-white shadow-2xl p-5 rounded-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold">Seasonal Offers and Discounts</h3>
            <p className="mt-2">Stay tuned for our special discounts this holiday season!</p>
          </article>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="bg-yellow-100 py-10 px-5 animate__animated animate__fadeInUp animate__slower">
        <h2 className="text-xl text-center font-bold mb-5 text-yellow-900 shadow-lg animate__animated animate__pulse">Sign up for Exclusive Offers</h2>
        <form onSubmit={handleSubmit} className="space-y-4 animate__animated animate__zoomIn">
          <div>
            <label className="block text-lg font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 mt-1 border border-yellow-300 rounded-md focus:ring focus:ring-yellow-500 transition-all"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 mt-1 border border-yellow-300 rounded-md focus:ring focus:ring-yellow-500 transition-all"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold">Service Preferences</label>
            <input
              type="text"
              name="preferences"
              className="w-full p-2 mt-1 border border-yellow-300 rounded-md focus:ring focus:ring-yellow-500 transition-all"
              value={formData.preferences}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-yellow-700 transition-colors transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Social Media Section */}
      <section className="bg-red-100 py-10 px-5 animate__animated animate__fadeInDown animate__slower">
        <h2 className="text-3xl font-bold mb-5 text-red-900 shadow-lg animate__animated animate__pulse">Stay Connected</h2>
        <div className="flex space-x-4 justify-center">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 transform hover:scale-110 transition-transform">
            <FaFacebook size={40} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 transform hover:scale-110 transition-transform">
            <FaInstagram size={40} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 transform hover:scale-110 transition-transform">
            <FaTwitter size={40} />
          </a>
        </div>
        {/* Simulated Social Media Feed */}
        <div className="mt-8 bg-white shadow-2xl p-5 rounded-md transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold">Recent Updates</h3>
          <div className="space-y-3 mt-3">
            <div className="bg-gray-100 p-3 rounded-md shadow-sm">
              <p><strong>Speedstar:</strong> We just launched a new feature! Check it out now.</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-md shadow-sm">
              <p><strong>Speedstar:</strong> Exciting partnership with LocalShop! Deliveries just got faster.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
