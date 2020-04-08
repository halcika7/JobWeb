import Axios from 'axios';
// import store from 'store/index';
import { getLocalItem, setLocalItem } from './localStorage';

const rejectPromise = (error: any) => Promise.reject(error);

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  validateStatus: status => true,
});

axios.interceptors.request.use(
  config => {
    // const token = getLocalItem('token');
    const newConfig = { ...config };

    newConfig.headers = {
      ...newConfig.headers,
      common: {
        ...newConfig.headers.common,
        Authorization: 'tokken',
      },
    };

    return newConfig;
  },
  error => rejectPromise(error)
);

axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    const { status } = error.response;
    const refreshUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/refresh`;

    if (status === 401 && originalRequest.url === refreshUrl) {
      return rejectPromise(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios.get('/auth/refresh').then(res => {
        if (res.status === 200) {
          // 1) put token to LocalStorage
          setLocalItem('token', res.data);
          // 2) Change Authorization header
          const token = getLocalItem('token');
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;

          // 3) return originalRequest object with Axios.
          return axios(originalRequest);
        }
        return rejectPromise(error);
      });
    }

    return rejectPromise(error);
  }
);

export default axios;
