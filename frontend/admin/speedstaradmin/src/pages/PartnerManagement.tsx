import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  serviceType: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  deals: { description: string; discount: number }[];
}

const PartnerManagement: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [newPartner, setNewPartner] = useState<Partner>({
    id: '',
    name: '',
    logoUrl: '',
    serviceType: 'hotel',
    contactInfo: { phone: '', email: '', address: '' },
    deals: [{ description: '', discount: 0 }],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get('http://localhost:3001/partners');
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPartner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPartner((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value,
      },
    }));
  };

  const handleDealChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDeals = [...newPartner.deals];
    updatedDeals[index] = { ...updatedDeals[index], [name]: value };
    setNewPartner((prev) => ({ ...prev, deals: updatedDeals }));
  };

  const addPartner = async () => {
    try {
      await axios.post('http://localhost:3001/partners', newPartner);
      fetchPartners(); // Refresh the list
      setNewPartner({
        id: '',
        name: '',
        logoUrl: '',
        serviceType: 'hotel',
        contactInfo: { phone: '', email: '', address: '' },
        deals: [{ description: '', discount: 0 }],
      });
    } catch (error) {
      console.error('Error adding partner:', error);
    }
  };

  const editPartner = (partner: Partner) => {
    setNewPartner(partner);
    setIsEditing(true);
  };

  const updatePartner = async () => {
    try {
      await axios.put(`http://localhost:3001/partners/${newPartner.id}`, newPartner);
      fetchPartners();
      setIsEditing(false);
      setNewPartner({
        id: '',
        name: '',
        logoUrl: '',
        serviceType: 'hotel',
        contactInfo: { phone: '', email: '', address: '' },
        deals: [{ description: '', discount: 0 }],
      });
    } catch (error) {
      console.error('Error updating partner:', error);
    }
  };

  const deletePartner = async (partnerId: string) => {
    try {
      await axios.delete(`http://localhost:3001/partners/${partnerId}`);
      fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Partner Management</h2>

      {/* Form to add or edit a partner */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl mb-2">{isEditing ? 'Edit Partner' : 'Add New Partner'}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Partner Name"
            value={newPartner.name}
            onChange={handleInputChange}
            className="border p-2 mb-2"
          />
          <input
            type="text"
            name="logoUrl"
            placeholder="Logo URL"
            value={newPartner.logoUrl}
            onChange={handleInputChange}
            className="border p-2 mb-2"
          />
          <select
            name="serviceType"
            value={newPartner.serviceType}
            onChange={handleInputChange}
            className="border p-2 mb-2"
          >
            <option value="hotel">Hotel</option>
            <option value="supermarket">Supermarket</option>
            <option value="mover">Mover</option>
            <option value="parcel">Parcel</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={newPartner.contactInfo.phone}
            onChange={handleContactInfoChange}
            className="border p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newPartner.contactInfo.email}
            onChange={handleContactInfoChange}
            className="border p-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newPartner.contactInfo.address}
            onChange={handleContactInfoChange}
            className="border p-2"
          />
        </div>

        <h4 className="text-lg mb-2">Deals</h4>
        {newPartner.deals.map((deal, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={deal.description}
              onChange={(e) => handleDealChange(index, e)}
              className="border p-2 w-full"
            />
            <input
              type="number"
              name="discount"
              placeholder="Discount"
              value={deal.discount}
              onChange={(e) => handleDealChange(index, e)}
              className="border p-2 w-full"
            />
          </div>
        ))}

        <button
          onClick={isEditing ? updatePartner : addPartner}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full sm:w-auto"
        >
          {isEditing ? 'Update Partner' : 'Add Partner'}
        </button>
      </div>

      {/* Partner List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Partner Name</th>
              <th className="py-2 px-4 border">Service Type</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id}>
                <td className="border px-4 py-2">{partner.name}</td>
                <td className="border px-4 py-2">{partner.serviceType}</td>
                <td className="border px-4 py-2">{partner.contactInfo.phone}</td>
                <td className="border px-4 py-2">{partner.contactInfo.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => editPartner(partner)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePartner(partner.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartnerManagement;
