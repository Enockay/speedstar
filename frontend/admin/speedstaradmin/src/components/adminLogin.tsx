import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in both fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://generator-long-tree-8710.fly.dev/users/login', { email, password });

      // Handle successful login
      const { token } = response.data;
      localStorage.setItem('authToken', token); // Store token in local storage
      navigate('/admin/dashboard'); // Redirect to admin dashboard
    } catch (error) {
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>

        <form onSubmit={handleLogin}>
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
              placeholder="admin@speedstar.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center mt-5">
              {error}
            </div>
          )}
        </form>

        <div className="flex justify-between items-center mt-6">
          <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700 text-sm">
            Forgot Password?
          </Link>
          <Link to="/register" className="text-blue-500 hover:text-blue-700 text-sm">
            Register
          </Link>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          © 2024 Speedstar System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
