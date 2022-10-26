/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
import axios from 'axios';

const { CancelToken } = axios;
const source = CancelToken.source();

const dashboardInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 25000,
  cancelToken: source.token,
});
const res = function (response) {
  return response.data;
};
const error = function (err) {
  return Promise.reject(err);
};

dashboardInstance.interceptors.response.use(res, error);

export { dashboardInstance };
