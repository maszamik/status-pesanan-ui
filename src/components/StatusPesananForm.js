import React, { useState } from 'react';
import { createStatusPesanan } from '../services/statusPesananService';

const StatusPesananForm = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');  // new state for message type

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newStatusPesanan = { nama_status: status };
      const response = await createStatusPesanan(newStatusPesanan);

      if (response.success) {
        setMessage(response.message);
        setMessageType('success');  // Set message type to success
        setStatus('');
      } else {
        setMessage('Gagal menambahkan status pesanan');
        setMessageType('danger');  // Set message type to danger (error)
      }
    } catch (error) {
      setMessage('Gagal menambahkan status pesanan');
      setMessageType('danger');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Status Pesanan</h2>
      {/* Alert message */}
      {message && (
        <div className={`alert alert-${messageType} mt-4`}>
          <p className="text-center text-sm">{message}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Nama Status Pesanan
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan Status Pesanan"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Tambah Status
        </button>
      </form>
      
      
    </div>
  );
};

export default StatusPesananForm;
