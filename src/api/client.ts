import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// 192.168.20.102 is your computer's local Wi-Fi IP address for your connected phone
// Note: If your backend runs on a port other than 3000, change it below.
export const API_URL = __DEV__ ? 'http://192.168.20.102:3000' : 'https://www.tapifi.in';

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
