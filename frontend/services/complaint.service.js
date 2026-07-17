import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const complaintService = {
  async listComplaints(token) {
    const response = await axios.get(`${API_BASE}/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async createComplaint(data, token) {
    const response = await axios.post(`${API_BASE}/complaints`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getComplaintById(id, token) {
    const response = await axios.get(`${API_BASE}/complaints/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async updateComplaint(id, data, token) {
    const response = await axios.patch(`${API_BASE}/complaints/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async addComment(complaintId, comment, token) {
    const response = await axios.post(
      `${API_BASE}/complaints/${complaintId}/comments`,
      { comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};

export default complaintService;
