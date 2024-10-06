import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Payment {
  id: string;
  mpesaNumber: string;
  amount: number;
  email: string;
  deliveryPoint: string;
  transactionId: string;
  status: 'Pending' | 'Confirmed';
}

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null); // For handling payment details in a modal

  useEffect(() => {
    axios.get('http://localhost:3001/payments').then((response) => {
      const fetchedPayments = response.data.map((payment: any) => ({
        ...payment,
        status: payment.status === 'Pending' || payment.status === 'Confirmed' ? payment.status : 'Pending', // Ensure valid status
      }));
      setPayments(fetchedPayments);
    });
  }, []);

  const handlePaymentClick = (payment: Payment) => {
    setSelectedPayment(payment); // Set selected payment for the modal
  };

  const handleStatusUpdate = (id: string, newStatus: 'Pending' | 'Confirmed') => {
    axios.patch(`http://localhost:3001/payments/${id}`, { status: newStatus })
      .then(() => {
        setPayments(payments.map(payment => 
          payment.id === id ? { ...payment, status: newStatus } : payment
        ));
      })
      .catch(error => {
        console.error("Error updating payment status", error);
      });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Payment Management</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2">Payment ID</th>
            <th className="py-2">M-Pesa Number</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Email</th>
            <th className="py-2">Delivery Point</th>
            <th className="py-2">Transaction ID</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="border px-4 py-2">{payment.id}</td>
              <td className="border px-4 py-2">{payment.mpesaNumber}</td>
              <td className="border px-4 py-2">{payment.amount}</td>
              <td className="border px-4 py-2">{payment.email}</td>
              <td className="border px-4 py-2">{payment.deliveryPoint}</td>
              <td className="border px-4 py-2">{payment.transactionId}</td>
              <td className={`border px-4 py-2 ${payment.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'}`}>
                {payment.status}
              </td>
              <td className="border px-4 py-2">
                <button 
                  className="text-blue-500 mr-2" 
                  onClick={() => handlePaymentClick(payment)}
                >
                  Details
                </button>
                {payment.status === 'Pending' && (
                  <button 
                    className="text-green-500" 
                    onClick={() => handleStatusUpdate(payment.id, 'Confirmed')}
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying detailed payment info */}
      {selectedPayment && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Payment Details</h3>
            <p><strong>Payment ID:</strong> {selectedPayment.id}</p>
            <p><strong>M-Pesa Number:</strong> {selectedPayment.mpesaNumber}</p>
            <p><strong>Amount:</strong> {selectedPayment.amount}</p>
            <p><strong>Email:</strong> {selectedPayment.email}</p>
            <p><strong>Delivery Point:</strong> {selectedPayment.deliveryPoint}</p>
            <p><strong>Transaction ID:</strong> {selectedPayment.transactionId}</p>
            <p><strong>Status:</strong> {selectedPayment.status}</p>
            <button 
              className="mt-4 text-red-500"
              onClick={() => setSelectedPayment(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
