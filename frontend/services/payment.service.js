import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const paymentService = {
  async listPayments(token) {
    const response = await axios.get(`${API_BASE}/payments`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async createPayment(data, token) {
    const response = await axios.post(`${API_BASE}/payments`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getPaymentById(id, token) {
    const response = await axios.get(`${API_BASE}/payments/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async updatePaymentStatus(id, status, token) {
    const response = await axios.patch(
      `${API_BASE}/payments/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};

export default paymentService;
