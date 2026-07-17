import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

const propertyService = {
  async listProperties(token) {
    const response = await axios.get(`${API_BASE}/properties`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async createProperty(data, token) {
    const response = await axios.post(`${API_BASE}/properties`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getPropertyById(id, token) {
    const response = await axios.get(`${API_BASE}/properties/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async updateProperty(id, data, token) {
    const response = await axios.patch(`${API_BASE}/properties/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getFloors(propertyId, token) {
    const response = await axios.get(`${API_BASE}/properties/${propertyId}/floors`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default propertyService;
