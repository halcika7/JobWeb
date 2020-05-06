import Axios from 'axios';
import store from '@store/index';

import {
  loginSuccess,
  getTokenRole,
  authReset,
} from '@pages/Auth/store/actions';

import { SessionStorage } from '@shared/sessionStorage';

const rejectPromise = (error: object | string) => Promise.reject(error);

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  validateStatus: () => true,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

axios.interceptors.request.use(
  config => {
    const newConfig = { ...config };
    const { token } = store.getState().auth;

    newConfig.headers = {
      ...newConfig.headers,
      common: {
        ...newConfig.headers.common,
        Authorization: `Bearer ${token}`,
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
          SessionStorage.setAuthenticated();

          // return originalRequest object with Axios.
          return axios(originalRequest);
        }

        store.dispatch(authReset());
        SessionStorage.removeAuthenticated();

        return rejectPromise(error);
      });
    }

    return rejectPromise(error);
  }
);

export default axios;