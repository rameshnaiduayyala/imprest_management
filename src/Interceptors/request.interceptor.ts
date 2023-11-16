import axios from 'axios'
import LocalStorageService from '../services/localStorage.svc'

const axiosInstance = axios.create({});
const localStorageService = LocalStorageService.getInstance();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorageService.getItem("token")
    if (token) {
      config.headers['auth_header'] = token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
);

export default axiosInstance;