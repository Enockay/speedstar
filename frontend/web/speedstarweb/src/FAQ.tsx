import React from 'react';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const FAQ: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', preferences: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className="space-y-12">
      {/* FAQ Section */}
      <section className="bg-blue-100 mt-12 py-10 px-5 animate__animated animate__fadeInUp">
        <h2 className="text-2xl  text-center font-bold mb-5 text-blue-900">We’re Here to Help</h2>
        <div className="space-y-4">
          <details className="bg-white shadow-lg p-6 rounded-md">
            <summary className="font-semibold">What areas does Speedstar cover?</summary>
            <p className="mt-2">Speedstar covers major cities in your region. For more details, check the service map.</p>
          </details>
          <details className="bg-white shadow-lg p-6 rounded-md">
            <summary className="font-semibold">How long does delivery take?</summary>
            <p className="mt-2">Delivery takes 24-48 hours, depending on your location.</p>
          </details>
          <details className="bg-white shadow-lg p-6 rounded-md">
            <summary className="font-semibold">How do I track my order?</summary>
            <p className="mt-2">You can track your order using the tracking number provided in your confirmation email.</p>
          </details>
          <details className="bg-white shadow-lg p-6 rounded-md">
            <summary className="font-semibold">What are the cancellation policies?</summary>
            <p className="mt-2">You can cancel within 24 hours of placing your order without any charges.</p>
          </details>
        </div>
      </section>

      {/* News/Blog Section */}
      <section className="bg-green-100 py-10 px-5 animate__animated animate__fadeInUp">
        <h2 className="md:text-2xl text-xl font-bold mb-5 text-green-900">Stay Updated with Speedstar</h2>
        <div className="space-y-4">
          <article className="bg-white shadow-lg p-5 rounded-md">
            <h3 className="text-xl font-semibold">New Service Areas and Delivery Partners</h3>
            <p className="mt-2">We are excited to announce expansion into new cities and partnerships with local businesses.</p>
          </article>
          <article className="bg-white shadow-lg p-5 rounded-md">
            <h3 className="text-xl font-semibold">Community Stories</h3>
            <p className="mt-2">Get insights into our partnerships and hear inspiring stories from our customers.</p>
          </article>
          <article className="bg-white shadow-lg p-5 rounded-md">
            <h3 className="text-xl font-semibold">Seasonal Offers and Discounts</h3>
            <p className="mt-2">Stay tuned for our special discounts this holiday season!</p>
          </article>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="bg-yellow-100 py-10 px-5 animate__animated animate__fadeInUp">
        <h2 className="text-xl text-center font-bold mb-5 text-yellow-900">Sign up for Exclusive Offers</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 mt-1 border border-yellow-300 rounded-md"
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
              className="w-full p-2 mt-1 border border-yellow-300 rounded-md"
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
              className="w-full p-2 mt-1 border border-yellow-300 rounded-md"
              value={formData.preferences}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-yellow-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Social Media Section */}
      <section className="bg-red-100 py-10 px-5 animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-bold mb-5 text-red-900">Stay Connected</h2>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">
            <FaFacebook size={40} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600">
            <FaInstagram size={40} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">
            <FaTwitter size={40} />
          </a>
        </div>
        {/* Simulated Social Media Feed */}
        <div className="mt-8 bg-white shadow-lg p-5 rounded-md">
          <h3 className="text-xl font-semibold">Recent Updates</h3>
          <div className="space-y-3 mt-3">
            <div className="bg-gray-100 p-3 rounded-md">
              <p><strong>Speedstar:</strong> We just launched a new feature! Check it out now.</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <p><strong>Speedstar:</strong> Exciting partnership with LocalShop! Deliveries just got faster.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
