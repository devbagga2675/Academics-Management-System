// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'BASE_URL', // Replace with actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;