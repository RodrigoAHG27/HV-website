// src/lib/http.ts
import axios from 'axios';

// If VITE_API_BASE_URL is not set, axios will use the current origin.
// So with baseURL = '', api.post('/api/leads') -> https://your-site.com/api/leads
const baseURL =
  import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim().length > 0
    ? import.meta.env.VITE_API_BASE_URL
    : '';

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: basic logging in dev
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    // eslint-disable-next-line no-console
    console.log('[HTTP] →', config.method?.toUpperCase(), config.baseURL + config.url, config.data);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      // eslint-disable-next-line no-console
      console.log('[HTTP] ←', response.status, response.config.url, response.data);
      return response;
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error('[HTTP] ✖', error.response?.status, error.config?.url, error.response?.data);
      return Promise.reject(error);
    }
  );
}
