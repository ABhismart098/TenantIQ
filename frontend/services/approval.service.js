import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const approvalService = {
  async getPendingApprovals(token) {
    const response = await axios.get(`${API_BASE}/approve/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async approveUser(userId, action, reason, token) {
    const response = await axios.post(
      `${API_BASE}/approve/action`,
      { target_user_id: userId, action, reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  async rejectUser(userId, reason, token) {
    return this.approveUser(userId, 'REJECTED', reason, token);
  }
};

export default approvalService;
