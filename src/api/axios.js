import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "3ef7eb18-cd63-4b8d-bccf-9137d9faaec6"
  }
});

export default axiosFetch;