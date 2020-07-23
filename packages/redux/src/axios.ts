import Axios from 'axios';

const ax = Axios.create({
  withCredentials: true,
  validateStatus: () => true,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

export const axios = ax;
