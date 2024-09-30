// services/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://api.speedstarmovers.com'; // Replace with your API base URL

// Service to fetch all services
export const fetchServices = () => {
  return axios.get(`${API_BASE_URL}/services`);
};

// Service to submit a quote request
export const submitQuoteRequest = (data: any) => {
  return axios.post(`${API_BASE_URL}/quotes`, data);
};

// Service to fetch testimonials
export const fetchTestimonials = () => {
  return axios.get(`${API_BASE_URL}/testimonials`);
};
