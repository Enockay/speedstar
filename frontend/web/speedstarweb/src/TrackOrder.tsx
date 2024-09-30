import React, { useState } from 'react';
import axios from 'axios';

interface CartItem {
  mealId: number;
  quantity: number;
  price: number;
  deliveryFee: number;
}

interface Order {
  orderId: string;
  cart: CartItem[];
  mpesaNumber: string;
  email: string;
  deliveryPoint: string;
  status: 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  totalAmount: number;
}

const dummyOrder: Order = {
  orderId: '123456',
  cart: [
    { mealId: 1, quantity: 2, price: 250, deliveryFee: 50 },
    { mealId: 2, quantity: 1, price: 180, deliveryFee: 30 },
  ],
  mpesaNumber: '0700123456',
  email: 'user@example.com',
  deliveryPoint: '123 Main St, Nairobi',
  status: 'Out for Delivery',
  totalAmount: 760,
};

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('/api/orders/track', { orderId, email });
      setOrder(response.data);
    } catch (error) {
      setErrorMessage('Unable to retrieve your order details. Displaying dummy data.');
      setOrder(dummyOrder);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim() === '' && email.trim() === '') {
      setErrorMessage('Please enter an Order ID or your Email to track your order.');
      return;
    }
    fetchOrderDetails();
  };

  const deliveryStages = ['Processing', 'Out for Delivery', 'Delivered', 'Cancelled'];

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen md:mt-20 mt-20 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Track Your Order</h2>
      <form onSubmit={handleTrackOrder} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Tracking...' : 'Track Order'}
          </button>
        </div>
      </form>

      {order && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Delivery Stages */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Delivery Status</h3>
            <div className="space-y-4">
              {deliveryStages.map((stage, index) => (
                <div key={index} className={`p-4 border rounded-md ${order.status === stage ? 'bg-blue-100' : 'bg-gray-50'}`}>
                  <span className={`${order.status === stage ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>{stage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ordered Items */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Items Ordered</h3>
            <ul className="space-y-4">
              {order.cart.map((item, index) => (
                <li key={index} className="flex items-center space-x-4 p-4 border rounded-md">
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                    {/* Placeholder for the image */}
                    <span className="text-gray-400">Image</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">Meal ID: {item.mealId}</p>
                    <p className="text-gray-500">Quantity: {item.quantity} x KES {item.price}</p>
                    <p className="text-gray-500">Delivery Fee: KES {item.deliveryFee}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <p className="text-lg font-semibold text-gray-800">Total: KES {order.totalAmount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
