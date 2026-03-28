import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// 10.0.2.2 is the special IP that allows Android emulators to access your computer's "localhost"
// Note: If your backend runs on a port other than 3000, change it below.
export const API_URL = __DEV__ ? 'http://10.0.2.2:3000' : 'https://api.tapifi.in';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // Increased to 30s to allow slow SMTP dispatcher responses
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token to headers
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('jwt_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token from SecureStore', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
