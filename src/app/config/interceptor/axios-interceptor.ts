import { getAuthToken } from '@/app/shared/util/store-utils';
import { SERVER_API_URL } from '../constant/api';
import axios from 'axios';
import CmsStatusCode from '@/app/config/constant/cms-status-code';

export const apiClient = axios.create({
  baseURL: SERVER_API_URL,
  timeout: 15000,
  withCredentials: true,
});
const setupAxiosInterceptors = (onUnauthenticated, revokeToken, apiClient) => {
  const onRequestSuccess = config => {
    const token = getAuthToken();

    if (token) {
      config.headers.token = `${token}`;
      config.headers.lang = 'vi';
    }

    return config;
  };

  const onResponseSuccess = response => {
    const { data } = response;

    if (data) {
      // if (
      //   data.responseCd === CmsStatusCode.NEED_EXTEND_SESSION ||
      //   data.responseCd === CmsStatusCode.NEED_LOGIN ||
      //   data.responseCd === CmsStatusCode.SESSION_TIMEOUT ||
      //   data.responseCd === CmsStatusCode.INVALID_SESSION ||
      //   data.code === CmsStatusCode.NEED_EXTEND_SESSION ||
      //   data.code === CmsStatusCode.NEED_LOGIN ||
      //   data.code === CmsStatusCode.SESSION_TIMEOUT ||
      //   data.code === CmsStatusCode.INVALID_SESSION
      // ) {
      //   onUnauthenticated();
      //   revokeToken();
      // }
      return response;
    }
  };

  const onResponseError = err => {
    return Promise.reject(err);
  };

  apiClient.interceptors.request.use(onRequestSuccess);
  apiClient.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
