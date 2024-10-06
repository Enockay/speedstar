import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users/forgot-password', { email });

      if (response.status === 200) {
        setSuccess('Password reset email sent. Please check your inbox.');
      }
    } catch (error: any) {
      setError('User not found or server error.');
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Forgot Password</h2>
        
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center mt-5">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-2 mb-4 rounded text-center mt-5">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
