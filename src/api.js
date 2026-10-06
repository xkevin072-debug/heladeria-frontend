import axios from 'axios';

// En Vercel toma VITE_API_URL; en local usa localhost:3000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL
});