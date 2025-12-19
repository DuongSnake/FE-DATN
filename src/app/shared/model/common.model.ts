import { getDateTimeNow } from '../util/date-utils';
import { LOCALE } from '@/app/config/constant/constants';
import { getUserId } from '../util/store-utils';
import { Storage } from '../helpers/cms-helper';

const language = Storage.local.get(LOCALE);

export interface IParamCommon {
  userId: string;
  requestTs: string;
  lang: string;
  data?: any;
  list?: any;
  page?: any;
}

export interface IParamCommonDuong {
  data?: any;
}

export interface IParamCommonListDuong {
  list?: any;
}

export interface IResponseCommon {
  responseCd: string;
  responseMsg: string;
  responseTs: string;
  data?: any;
  data2?: any;
  errors?: any;
  list?: any;
  totalAcolAmt?: number;
  totalAcolTransactions?: number;
  totalEcolAmt?: number;
  totalEcolTransactions?: number;
  transAmt?: number;
  transNumber?: number;
  totalRecord?: number;
  totalSuccessRecord?: number;
  totalWaitingRecord?: number;
  totalFailRecord?: number;
  totalAmount?: number;
}

export const createCommonIParams = (data?: any): IParamCommon => {
  return {
    userId: getUserId(),
    requestTs: getDateTimeNow(),
    lang: language || 'vi',
    data,
  };
};

export const createCommonIParamsDuong = (data?: any): IParamCommon => {
  return data;
};

export const createCommonIParamsDataPage = (data?, page?: IPaging): IParamCommon => {
  return {
    userId: getUserId(),
    requestTs: getDateTimeNow(),
    lang: language || 'vi',
    data,
    page,
  };
};

export interface IPaging {
  pageNum: number;
  pageSize: number;
}

export const createCommonIParamsList = (list?: any): IParamCommon => {
  return {
    userId: getUserId(),
    requestTs: getDateTimeNow(),
    lang: language || 'vi',
    list,
  };
};

export const createCommonIParamsListDuong = (list?: any): IParamCommon => {
  return list;
};

export interface IParamForgotPassword {
  email: string;
}

export interface IParamCodeCheck {
  code: string;
}

export interface IParamReset {
  userId: string;
}

export interface IParamResetPassword {
  userId: string;
  newPassword: string;
}
