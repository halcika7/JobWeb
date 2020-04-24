import Axios from 'axios';
import store from 'store';

// actions
import { loginSuccess, getTokenRole } from 'pages/Auth/store/actions';

// utils
import { SessionStorage } from './shared/sessionStorage';

const rejectPromise = (error: any) => Promise.reject(error);

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  validateStatus: status => true,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

axios.interceptors.request.use(
  config => {
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
        if (res.data.accessToken) {
          const { accessToken } = res.data;
          const { role, token } = getTokenRole(accessToken);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;

          // dispatch refresh success
          store.dispatch(loginSuccess(true, role, token));
          SessionStorage.setValue('isAuthenticated', true);

          // return originalRequest object with Axios.
          return axios(originalRequest);
        }

        // dispatch logout
        // store.dispatch();
        SessionStorage.removeItem('isAuthenticated');

        return rejectPromise(error);
      });
    }

    return rejectPromise(error);
  }
);

export default axios;
