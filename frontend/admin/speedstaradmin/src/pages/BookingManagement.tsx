import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/bookings').then((response) => {
      setBookings(response.data);
    });
  }, []);

  const updateBookingStatus = (bookingId: string, status: string) => {
    axios.post(`http://localhost:3001/api/bookings/update/${bookingId}`, { status }).then(() => {
      alert('Booking status updated');
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Booking ID</th>
            <th className="py-2">User</th>
            <th className="py-2">Service</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking: any) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.id}</td>
              <td className="border px-4 py-2">{booking.user}</td>
              <td className="border px-4 py-2">{booking.service}</td>
              <td className="border px-4 py-2">{booking.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => updateBookingStatus(booking.id, 'completed')}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => updateBookingStatus(booking.id, 'canceled')}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel Booking
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
