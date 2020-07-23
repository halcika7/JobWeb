import { store, Actions, axios } from '@job/redux';
import Constants from 'expo-constants';

const rejectPromise = (error: object | string) => Promise.reject(error);

const url = Constants.manifest.extra.backendURL;

axios.defaults.baseURL = url;

axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    const { status } = error.response;
    const refreshUrl = `${url}/auth/refresh`;

    if (status === 401 && originalRequest.url === refreshUrl) {
      return rejectPromise(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios.get('/auth/refresh').then(res => {
        if (res.data.accessToken) {
          const { accessToken } = res.data;
          const { role } = Actions.getTokenRole(accessToken);

          // dispatch refresh success
          store.dispatch(Actions.loginSuccess(true, role));
          // SessionStorage.setAuthenticated();

          // return originalRequest object with Axios.
          return axios(originalRequest);
        }

        store.dispatch(Actions.authReset());
        // SessionStorage.removeAuthenticated();

        return rejectPromise(error);
      });
    }

    return rejectPromise(error);
  }
);
