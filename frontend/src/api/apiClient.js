import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export function getAuthToken() {
  return localStorage.getItem('skillmate_token');
}

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

client.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
