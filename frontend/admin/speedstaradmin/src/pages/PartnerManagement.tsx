import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PartnerManagement: React.FC = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/partners').then((response) => {
      setPartners(response.data);
    });
  }, []);

  const approveService = (partnerId: string) => {
    axios.post(`http://localhost:3001/api/partners/approve/${partnerId}`).then(() => {
      alert('Service Approved');
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Partner Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Partner Name</th>
            <th className="py-2">Service Type</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner: any) => (
            <tr key={partner.id}>
              <td className="border px-4 py-2">{partner.name}</td>
              <td className="border px-4 py-2">{partner.serviceType}</td>
              <td className="border px-4 py-2">{partner.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => approveService(partner.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerManagement;
