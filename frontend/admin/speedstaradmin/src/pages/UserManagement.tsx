import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch users from the backend
    axios.get('https://generator-long-tree-8710.fly.dev/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleBlockUser = (userId: string) => {
    // Implement block/unblock user API call
    axios.post(`https://generator-long-tree-8710.fly.dev/users/block/${userId}`).then(() => {
      alert('User status updated');
    });
  };

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: any) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleBlockUser(user.id)}
                  className={`px-4 py-2 rounded ${
                    user.status === 'blocked'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {user.status === 'blocked' ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
