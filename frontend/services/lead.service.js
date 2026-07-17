import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const leadService = {
  async listLeads(token) {
    const response = await axios.get(`${API_BASE}/leads`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async createLead(data, token) {
    const response = await axios.post(`${API_BASE}/leads`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getLeadById(id, token) {
    const response = await axios.get(`${API_BASE}/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async updateLead(id, data, token) {
    const response = await axios.patch(`${API_BASE}/leads/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async deleteLead(id, token) {
    const response = await axios.delete(`${API_BASE}/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default leadService;
