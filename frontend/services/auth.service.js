import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const authService = {
  async register(data) {
    const response = await axios.post(`${API_BASE}/auth/register`, data);
    return response.data;
  },

  async login(email, password) {
    const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
    if (response.data.data?.token) {
      await this._storeToken(response.data.data.token);
    }
    return response.data;
  },

  async forgotPassword(email) {
    const response = await axios.post(`${API_BASE}/auth/forgot-password`, { email });
    return response.data;
  },

  async resetPassword(token, password) {
    const response = await axios.post(`${API_BASE}/auth/reset-password`, { token, password });
    return response.data;
  },

  async logout() {
    await this._clearToken();
  },

  async _storeToken(token) {
    global.authToken = token;
  },

  async _clearToken() {
    global.authToken = null;
  },

  getToken() {
    return global.authToken || null;
  }
};

export default authService;
