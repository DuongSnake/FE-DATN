import { SERVER_API_URL } from '@/app/config/constant/api';
import { IParamCommon } from '../model/common.model';
import { getAuthToken } from './store-utils';
import queryString from 'query-string';
import axios from 'axios';
import { checkSuccessDownload } from './global-function';
import i18next from 'i18next';
import moment from 'moment';
import { NOTIFICATION } from '@/app/config/constant/enum';
import { openNotification, openNotificationAction } from './entity-utils';
import { APP_DATE_FORMAT, FORMAT_DATE_OUTPUT } from '@/app/config/constant/constants';

export const downloadFileWithAxios = (urlApi: string, query: IParamCommon, fileName: string) => {
  const token = getAuthToken();
  const newQuery = {
    userId: query.userId,
    requestTs: query.requestTs,
    lang: query.lang,
    ...query.data,
  };

  const queryUrl = queryString.stringify(newQuery);
  const requestUrl = `${SERVER_API_URL}${urlApi}?${queryUrl}`;

  axios({
    url: requestUrl,
    method: 'GET',
    responseType: 'blob',
    headers: {
      token,
    },
  })
    .then(response => {
      if (checkSuccessDownload(response)) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${i18next.t(fileName)}${moment().format(APP_DATE_FORMAT)}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        openNotificationAction(NOTIFICATION.ERROR, 'message.download-error', '', response.data.responseMsg);
      }
    })
    .catch(error => {
      openNotification(NOTIFICATION.ERROR, '', '', error.message);
    });
};

export const downloadFileWithAxiosLoading = (urlApi: string, query: IParamCommon, fileName: string, action?: any) => {
  const token = getAuthToken();
  const newQuery = {
    userId: query.userId,
    requestTs: query.requestTs,
    lang: query.lang,
    ...query.data,
  };

  const queryUrl = queryString.stringify(newQuery);
  const requestUrl = `${SERVER_API_URL}${urlApi}?${queryUrl}`;

  axios({
    url: requestUrl,
    method: 'GET',
    responseType: 'blob',
    headers: {
      token,
    },
  })
    .then(response => {
      if (checkSuccessDownload(response)) {
        if (action) {
          action(false);
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${i18next.t(fileName)}${moment().format(FORMAT_DATE_OUTPUT)}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        if (action) {
          action(false);
        }
        openNotificationAction(NOTIFICATION.ERROR, 'message.download-error', '', response.data.responseMsg);
      }
    })
    .catch(error => {
      if (action) {
        action(false);
      }
      openNotification(NOTIFICATION.ERROR, '', '', error.message);
    });
};
