import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLogs: React.FC = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('/api/admin-logs').then((response) => {
      setLogs(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Logs</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Admin</th>
            <th className="py-2">Action</th>
            <th className="py-2">Timestamp</th>
            <th className="py-2">Entity Affected</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log: any) => (
            <tr key={log.id}>
              <td className="border px-4 py-2">{log.admin}</td>
              <td className="border px-4 py-2">{log.action}</td>
              <td className="border px-4 py-2">{log.timestamp}</td>
              <td className="border px-4 py-2">{log.entity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLogs;
