// src/utils/axios.js
import axios from "@/utils/axios"; 

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // your backend API URL
  withCredentials: true,
});

export default axiosInstance;
