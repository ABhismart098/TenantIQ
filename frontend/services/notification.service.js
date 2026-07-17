import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const notificationService = {
  async listNotifications(token) {
    const response = await axios.get(`${API_BASE}/notifications`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async markAsRead(notificationId, token) {
    const response = await axios.patch(
      `${API_BASE}/notifications/${notificationId}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  async deleteNotification(notificationId, token) {
    const response = await axios.delete(
      `${API_BASE}/notifications/${notificationId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};

export default notificationService;
