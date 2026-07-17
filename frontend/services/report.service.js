import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const reportService = {
  async getUserActivityReport(token) {
    const response = await axios.get(`${API_BASE}/reports/user-activity`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getComplaintReport(token) {
    const response = await axios.get(`${API_BASE}/reports/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getPropertyReport(token) {
    const response = await axios.get(`${API_BASE}/reports/properties`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async generateReport(type, params, token) {
    const response = await axios.post(
      `${API_BASE}/reports/generate`,
      { type, params },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};

export default reportService;
