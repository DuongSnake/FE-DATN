import {
  APP_DATE_FORMAT,
  FORMAT_DATE_MM_OUTPUT,
  FORMAT_DATE_SLASH,
  FORMAT_DATE_WITHOUT_DASH,
  FORMAT_DD_MM_YYYY_HHMMSS,
  FORMAT_FULL_DATE_TIME_OUTPUT,
  FORMAT_TIME,
  FORMAT_YYYYMM,
  FORMAT_YYYYMMDD,
  RESPONSE_DATE_FORMAT,
  RESPONSE_FULL_DATE_TIME_FORMAT,
  RESPONSE_FULL_TIME_FORMAT,
} from '@/app/config/constant/constants';
import moment from 'moment';

export const getDateTimeNow = () => {
  return moment(new Date()).format(FORMAT_DD_MM_YYYY_HHMMSS);
};

export const convertStringToDate = string => {
  return moment(string, RESPONSE_DATE_FORMAT).format(APP_DATE_FORMAT);
};

export const convertMomentToString = date => {
  return date ? date.format(FORMAT_YYYYMMDD) : null;
};

export const convertMomentToTimeString = time => {
  return time ? time.format(RESPONSE_FULL_TIME_FORMAT) : null;
};

export const convertMomentToMonthly = date => {
  return date ? date.format(FORMAT_YYYYMM) : null;
};

export const convertStringToMomentMonthly = string => {
  return moment(string, FORMAT_YYYYMM).format(FORMAT_DATE_MM_OUTPUT);
};

export const getDateNow = () => {
  return moment(new Date()).format(FORMAT_DATE_SLASH);
};

export const getDateNowWithoutDash = () => {
  return moment(new Date()).format(FORMAT_DATE_WITHOUT_DASH);
};

export const getTimeNow = () => {
  return moment(new Date()).format(FORMAT_TIME);
};

export const convertStringToDateSlash = string => {
  return moment(string, RESPONSE_DATE_FORMAT).format(APP_DATE_FORMAT);
};

export const convertStringToDateStringSlash = dString => {
  if (dString) {
    return moment(dString, 'DD/MM/YYYY').format('YYYYMMDD');
  } else {
    return null;
  }
};

export const convertStringToTimeVN = tString => {
  if (tString) {
    return moment(tString, 'hhmmss').format('hh:mm:ss');
  } else {
    return null;
  }
};

export const convertDataRowFullDateTime = val => {
  if (!val || !moment(val, RESPONSE_FULL_DATE_TIME_FORMAT).isValid()) return '';

  return moment(val, RESPONSE_FULL_DATE_TIME_FORMAT).format(FORMAT_FULL_DATE_TIME_OUTPUT);
};
