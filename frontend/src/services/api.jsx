import axios from 'axios';

const API_BASE_URL = ['http://localhost:3000', 'https://ai-code-reviewer-kxp2.onrender.com']; // Backend server URLs

const api = axios.create({
  baseURL: API_BASE_URL[0], // You can implement load balancing if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export const reviewCode = async (code) => {
  try {
    const response = await api.post('/api/ai/review-code', { code });
    return response.data;
  } catch (error) {
    console.error('Error reviewing code:', error);
    throw error;
  }
};

export default api;
