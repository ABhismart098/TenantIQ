import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const permissionService = {
  async checkPermission(action, resource, token) {
    const response = await axios.post(
      `${API_BASE}/permissions/check`,
      { action, resource },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  async getUserPermissions(token) {
    const response = await axios.get(`${API_BASE}/permissions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default permissionService;
