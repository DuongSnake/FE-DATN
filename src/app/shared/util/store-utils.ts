import { ACCESS_TOKEN, USER_NAME } from '@/app/config/constant/constants';
import getStore from '@/app/config/redux/store';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Storage } from '../helpers/cms-helper';

export const getAuthToken = () => getStore().getState().authentication.accessToken || Storage.session.get(ACCESS_TOKEN);

export const getUserId = () => {
  const accessToken = getAuthToken();

  if (accessToken) {
    const jwtPayload: JwtPayload = jwtDecode(accessToken);

    return jwtPayload['userId'];
  }
};

export const getUserName = () => {
  const userName = getStore().getState().authentication.userNm || Storage.session.get(USER_NAME);

  if (userName) {
    return userName;
  }
  return '';
};
