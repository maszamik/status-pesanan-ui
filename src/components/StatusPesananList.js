import React, { useEffect, useState, useCallback } from 'react';
import { getStatusPesanan, deleteStatusPesanan } from '../services/statusPesananService';
import StatusPesananUpdate from './StatusPesananUpdate';

const StatusPesananList = () => {
  const [statusPesanan, setStatusPesanan] = useState([]);
  const [filteredStatusPesanan, setFilteredStatusPesanan] = useState([]);
  const [message, setMessage] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');  // State untuk pencarian
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data status pesanan
  const fetchStatusPesanan = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getStatusPesanan();
      setStatusPesanan(data.data);
      setFilteredStatusPesanan(data.data);  // Set default filter ke semua status pesanan
      setIsLoading(false);
    } catch (error) {
      setMessage('Gagal mengambil status pesanan');
      setIsLoading(false);
    }
  }, []);

  // Call fetchStatusPesanan ketika komponen pertama kali mount
  useEffect(() => {
    fetchStatusPesanan();
  }, [fetchStatusPesanan]);

  // Fungsi untuk menghapus status pesanan
  const handleDelete = async (id_status) => {
    try {
      await deleteStatusPesanan(id_status);
      setStatusPesanan(statusPesanan.filter((item) => item.id_status !== id_status));
      setMessage('Status pesanan berhasil dihapus');
    } catch (error) {
      setMessage('Gagal menghapus status pesanan');
    }
  };

  // Fungsi untuk update status pesanan
  const handleUpdate = (id_status) => {
    setUpdateId(id_status);
    setIsUpdateMode(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateMode(false);
    setUpdateId(null);
  };

  // Fungsi untuk mencari berdasarkan nama status
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredStatusPesanan(statusPesanan); // Jika pencarian kosong, tampilkan semua status pesanan
    } else {
      const filtered = statusPesanan.filter((item) =>
        item.nama_status.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStatusPesanan(filtered);
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Daftar Status Pesanan</h2>
      
      {/* Pesan jika ada error */}
      {message && <p className="text-center text-red-500">{message}</p>}

      {/* Pencarian */}
      <div className="mb-4 flex items-center justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Cari status pesanan..."
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Cari
        </button>
      </div>

      {/* Tabel Status Pesanan */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center text-gray-500">Memuat data...</div>
        ) : (
          <table className="table table-striped table-bordered w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Status Pesanan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredStatusPesanan.length > 0 ? (
                filteredStatusPesanan.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.nama_status}</td>
                    <td>
                      <button
                        onClick={() => handleUpdate(item.id_status)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item.id_status)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">Data tidak ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isUpdateMode && <StatusPesananUpdate id_status={updateId} onClose={closeUpdateForm} />}
    </div>
  );
};

export default StatusPesananList;
