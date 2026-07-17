import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const userService = {
  async getCurrentUser(token) {
    const response = await axios.get(`${API_BASE}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async updateUserStatus(userId, action, reason, token) {
    const response = await axios.patch(
      `${API_BASE}/users/${userId}/status`,
      { action, reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  async getAdminDashboard(token) {
    const response = await axios.get(`${API_BASE}/users/admin-dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async listUsers(token) {
    const response = await axios.get(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default userService;
