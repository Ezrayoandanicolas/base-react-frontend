import Axios from 'axios';

// Buat instance Axios dengan konfigurasi khusus
const axios = Axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000/api/', // Ganti dengan URL base API Anda
  timeout: 5000, // Timeout maksimum permintaan (dalam milidetik)
  headers: {
    'Content-Type': 'application/json', // Header yang digunakan dalam setiap permintaan
  },
});

// Fungsi untuk mengatur token bearer dalam header
const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default { axios, setAuthToken }