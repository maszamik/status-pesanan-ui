import React, { useState, useEffect } from 'react';
import { getStatusPesananById, updateStatusPesanan } from '../services/statusPesananService';

const StatusPesananUpdate = ({ id_status, onClose }) => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // State for message type (success or error)

  // Fetch status by ID when component mounts or id_status changes
  useEffect(() => {
    const fetchStatusPesanan = async () => {
      try {
        const data = await getStatusPesananById(id_status);
        setStatus(data.data.nama_status);
      } catch (error) {
        setMessage('Gagal memuat data status pesanan');
        setMessageType('danger');
      }
    };

    fetchStatusPesanan();
  }, [id_status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedStatusPesanan = { nama_status: status };
      const response = await updateStatusPesanan(id_status, updatedStatusPesanan);

      if (response.success) {
        setMessage('Status pesanan berhasil diperbarui');
        setMessageType('success'); // Set message as success
      } else {
        setMessage('Gagal memperbarui status pesanan');
        setMessageType('danger'); // Set message as danger (error)
      }

      // Don't close form immediately after updating, let the user see the message
      setTimeout(() => {
        onClose(); // Close the form after a short delay
      }, 2000); // Adjust the timeout duration (2 seconds) to allow the alert to show

    } catch (error) {
      setMessage('Gagal memperbarui status pesanan');
      setMessageType('danger');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Perbarui Status Pesanan</h2>

      {/* Show alert message */}
      {message && (
        <div className={`alert alert-${messageType} mt-4`}>
          <p className="text-center text-sm">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status Pesanan
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan status pesanan"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Perbarui Status
        </button>
      </form>
    </div>
  );
};

export default StatusPesananUpdate;
