import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to capture the serviceType from the URL
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string; // Add phone number to the FormData interface
  movingDate: string;
  fromLocation: string;
  toLocation: string;
  fromFloor: string; // New field
  toFloor: string; // New field
  fragileMaterials: string; // New field
  roomTypeFrom: string; // New field
  roomTypeTo: string; // New field
  intendedMoveTime: string; // New field
  description: string;
}

const QuoteForm = () => {
  const { serviceType } = useParams<{ serviceType: string }>(); // Use useParams to capture the service type from the URL
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '', // Initialize the phone number state
    movingDate: '',
    fromLocation: '',
    toLocation: '',
    fromFloor: '', // Initialize fromFloor
    toFloor: '', // Initialize toFloor
    fragileMaterials: '', // Initialize fragileMaterials
    roomTypeFrom: '', // Initialize roomTypeFrom
    roomTypeTo: '', // Initialize roomTypeTo
    intendedMoveTime: '', // Initialize intendedMoveTime
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    axios.post('http://localhost:3001/quotes', { // Replace with your real backend URL
      ...formData,
      serviceType,
    })
      .then(() => {
        setMessage('Your quote request has been submitted!');
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          movingDate: '',
          fromLocation: '',
          toLocation: '',
          fromFloor: '',
          toFloor: '',
          fragileMaterials: '',
          roomTypeFrom: '',
          roomTypeTo: '',
          intendedMoveTime: '',
          description: '',
        });
      })
      .catch(() => setMessage('Failed to submit. Try again later.'))
      .finally(() => setLoading(false));
  };

  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Book Your {serviceType || 'Service'}
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Fill out the form below to book your {serviceType || 'service'} with us. We will get back to you shortly.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Moving Date</label>
              <input
                type="date"
                name="movingDate"
                value={formData.movingDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">From Location</label>
              <input
                type="text"
                name="fromLocation"
                value={formData.fromLocation}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the starting location"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">To Location</label>
              <input
                type="text"
                name="toLocation"
                value={formData.toLocation}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the destination location"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">From Floor</label>
              <input
                type="text"
                name="fromFloor"
                value={formData.fromFloor}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the floor you are moving from"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">To Floor</label>
              <input
                type="text"
                name="toFloor"
                value={formData.toFloor}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the floor you are moving to"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Fragile Materials</label>
              <textarea
                name="fragileMaterials"
                value={formData.fragileMaterials}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="List any fragile materials"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Room Type Moving From</label>
              <input
                type="text"
                name="roomTypeFrom"
                value={formData.roomTypeFrom}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the room type you are moving from"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Room Type Moving To</label>
              <input
                type="text"
                name="roomTypeTo"
                value={formData.roomTypeTo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the room type you are moving to"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Intended Move Time</label>
              <input
                type="time"
                name="intendedMoveTime"
                value={formData.intendedMoveTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Additional Information</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Any additional information"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 mt-6 bg-indigo-600 text-white rounded-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Get Quote'}
            </button>
          </form>
          {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
