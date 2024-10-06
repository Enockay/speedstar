import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/payments').then((response) => {
      setPayments(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Payment ID</th>
            <th className="py-2">User</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment: any) => (
            <tr key={payment.id}>
              <td className="border px-4 py-2">{payment.id}</td>
              <td className="border px-4 py-2">{payment.user}</td>
              <td className="border px-4 py-2">{payment.amount}</td>
              <td className="border px-4 py-2">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagement;
