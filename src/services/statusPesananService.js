/// src/services/statusPesananService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/statuspesanan'; // URL backend Express.js

export const getStatusPesanan = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching status pesanan:', error);
    throw error;
  }
};

export const createStatusPesanan = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data; // Mengembalikan response untuk ditampilkan di frontend
  } catch (error) {
    console.error('Error creating status pesanan:', error);
    throw error;
  }
};

export const getStatusPesananById = async (id_status) => {
  try {
    const response = await axios.get(`${API_URL}/${id_status}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching status pesanan by id:', error);
    throw error;
  }
};

export const updateStatusPesanan = async (id_status, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id_status}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating status pesanan:', error);
    throw error;
  }
};

export const deleteStatusPesanan = async (id_status) => {
  try {
    const response = await axios.delete(`${API_URL}/${id_status}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting status pesanan:', error);
    throw error;
  }
};
