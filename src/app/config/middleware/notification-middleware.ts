import { IErrorResponse } from '@/app/shared/model/dto.model';
import { isFulfilledAction, isRejectedAction } from '@/app/shared/reducers/reducer.utils';
import { openNotification, openNotificationAction } from '@/app/shared/util/entity-utils';
import { ERRORS, NOTIFICATION } from '../constant/enum';
import CmsStatusCode from '@/app/config/constant/cms-status-code';
import HttpStatusCode from '@/app/config/constant/http-status-code';

const URL_NOT_ALERT_NOTIFICATION = ['/auth/v1/login'];

export const notificationError = (responseCode, msg) => {
  openNotification(NOTIFICATION.ERROR, `error.http.${responseCode}`, '', msg);
};

export const notificationErrorAction = (responseCode, msg) => {
  openNotificationAction(NOTIFICATION.ERROR, `error.http.${responseCode}`, '', msg);
};

export const notificationSuccessAction = (responseCode, msg) => {
  let type = 'success';

  if (responseCode === '200000') {
    type = 'updated';
  } else if (responseCode === '300000') {
    type = 'deleted';
  }

  openNotificationAction(NOTIFICATION.SUCCESS, `success.${type}`, '', msg);
};

export const notificationMiddleware = () => next => action => {
  if (!action) return;

  const { error, payload } = action;

  if (isFulfilledAction(action) && payload) {
    const listStatusErrorCodeSystem = [
      CmsStatusCode.NOT_FOUND_DATA,
      CmsStatusCode.PROCESSING_FAIL,
      CmsStatusCode.UNDEFINED_ERROR,
      CmsStatusCode.INVALID_INPUT,
      CmsStatusCode.INVALID_METHOD,
      CmsStatusCode.UNDEFINED_PARAMETER,
      CmsStatusCode.INVALID_TYPE,
      CmsStatusCode.DUPLICATE_DATA,
      CmsStatusCode.PASSWORD_NOT_MATCH,
      CmsStatusCode.PAYER_NOT_EXISTED,
      CmsStatusCode.CHECK_INQUIRY_DATE,
      CmsStatusCode.INQUIRY_PERIOD_90_DAYS,
      CmsStatusCode.ID_PASS_NOT_MATH,
      CmsStatusCode.NEED_PERMISSION,
      CmsStatusCode.NEED_LOGIN,
      CmsStatusCode.NEED_EXTEND_SESSION,
      CmsStatusCode.SESSION_TIMEOUT,
      CmsStatusCode.INVALID_SESSION,
      CmsStatusCode.LINK_IS_NOT_VALID,
      CmsStatusCode.GW_CONNECT_EXCEPTION,
      CmsStatusCode.READ_RESPONSE_EXCEPTION,
      CmsStatusCode.GENERATE_FEE_DENY,
      CmsStatusCode.CAN_NOT_SEND_EMAIL_VALID,
    ];

    if (listStatusErrorCodeSystem.some(item => item === payload.responseCd)) {
      notificationError(payload.responseCd, payload.message);
    }

    if (listStatusErrorCodeSystem.some(item => item === payload.code)) {
      notificationError(payload.responseCd, payload.message);
    }
  }

  if (isFulfilledAction(action) && payload && payload.responseCd) {
    const listStatusErrorCodeAction = [
      CmsStatusCode.DELETE_FAIL_FOR_CONTRACT_REASON,
      CmsStatusCode.EMAIL_EXISTS,
      CmsStatusCode.EMAIL_SEND_FAIL,
      CmsStatusCode.TRANSGRESS_ACTION,
      CmsStatusCode.STAFF_CODE_EXISTS,
      CmsStatusCode.STAFF_CODE_DOESNT_EXISTS,
      CmsStatusCode.STAFF_CODE_EXISTS_IN_CONTRACT,
      CmsStatusCode.FEE_CLOSE_CONFLICT_FAIL,
      CmsStatusCode.FEE_GENERATE_CONFLICT_FAIL,
      CmsStatusCode.FEE_NOT_CHARGE,
      CmsStatusCode.EXPIRED_TOKEN,
      CmsStatusCode.CURRENT_PASSWORD_NOT_MATCH,
      CmsStatusCode.UNKNOWN_END_CUSTOMER,
      CmsStatusCode.IB_MASTER_ID_NOT_FOUND,
      CmsStatusCode.FAIL_TO_CHANGE_IB_MASTER_ID,
      CmsStatusCode.DELETE_DEPT_FAIL,
      CmsStatusCode.INVALID_DATA_FORMAT,
      CmsStatusCode.INVALID_AMOUNT,
      CmsStatusCode.INVALID_DATE,
      CmsStatusCode.INVALID_CURRENCY_CODE,
      CmsStatusCode.INVALID_ACCOUNT,
      CmsStatusCode.BAD_PROCESSING_CODE,
      CmsStatusCode.INVALID_BANK_OPERATION_CODE,
      CmsStatusCode.INSUFFICIENT_FUNDS,
      CmsStatusCode.AMOUNT_EXCEED_LIMIT,
      CmsStatusCode.CLOSED_ACCOUNT_NUMBER,
      CmsStatusCode.UNAUTHORIZED_USER,
      CmsStatusCode.UNAUTHORIZED_VAB,
      CmsStatusCode.ACCOUNT_TYPE_INVALID,
      CmsStatusCode.DUPLICATE_TRANSACTION,
      CmsStatusCode.TRANSACTION_NOT_PERMITTED,
      CmsStatusCode.ACCOUNT_IN_BLACKLIST,
      CmsStatusCode.AUTHENTICATION_FAILED,
      CmsStatusCode.AUTHORISATION_WAITING,
      CmsStatusCode.AUTHORISED_AND_CANCELLED,
      CmsStatusCode.PROCESSOR_SYSTEM_ERROR,
      CmsStatusCode.CUT_OFF_TIME,
      CmsStatusCode.TRANSACTION_DECLINED,
      CmsStatusCode.SUSPECTED_FRAUD,
      CmsStatusCode.BANK_NOT_SUPPORTED,
      CmsStatusCode.UNKNOWN_REASON,
      CmsStatusCode.HTTP_ERROR,
      CmsStatusCode.TECHNICAL_PROBLEM,
      CmsStatusCode.TIME_OUT,
      CmsStatusCode.MANY_ATTEMPTS,
      CmsStatusCode.REFER_MAP_EXISTS,
      CmsStatusCode.PASSWORD_NOT_MATCH_HISTORY,
      CmsStatusCode.LOGIN_OVER_5_TIME,
    ];
    const listStatusSuccessCodeAction = [CmsStatusCode.DELETE_SUCCESS, CmsStatusCode.INSERT_SUCCESS, CmsStatusCode.UPDATE_SUCCESS];

    if (listStatusErrorCodeAction.some(item => item === payload.responseCd)) {
      notificationErrorAction(payload.responseCd, payload.responseMsg);
    } else if (listStatusSuccessCodeAction.some(item => item === payload.responseCd)) {
      notificationSuccessAction(payload.responseCd, payload.responseMsg);
    } else if (payload.responseCd !== CmsStatusCode.SUCCESS) {
      notificationErrorAction(payload.responseCd, payload.responseMsg);
    }
  }

  if (isRejectedAction(action) && error && error.isAxiosError) {
    if (error.response) {
      const response = error.response;
      const data = response.result;
      const config = response.config;

      if (response.status !== HttpStatusCode.FORBIDDEN && config && config.url && !URL_NOT_ALERT_NOTIFICATION.includes(config.url)) {
        switch (response.status) {
          case 0:
            openNotification(NOTIFICATION.ERROR, 'error.server.not.reachable', '', 'Server not reachable');
            break;

          case HttpStatusCode.EXPECTATION_FAILED:
          case HttpStatusCode.BAD_REQUEST: {
            const errorResponse: IErrorResponse = response?.data;

            if (errorResponse?.responseCd && ERRORS[errorResponse.responseCd]) {
              openNotification(NOTIFICATION.ERROR, ERRORS[errorResponse.responseCd]);
            } else {
              openNotification(NOTIFICATION.ERROR, 'error.http.400', '', errorResponse.responseMsg);
            }
            break;
          }

          case HttpStatusCode.FORBIDDEN:
            openNotification(NOTIFICATION.ERROR, 'error.http.403');
            break;

          case HttpStatusCode.NOT_FOUND:
            openNotification(NOTIFICATION.ERROR, 'error.http.404', '', 'Not found');
            break;

          case HttpStatusCode.INTERNAL_SERVER_ERROR:
            openNotification(NOTIFICATION.ERROR, 'error.http.500');
            break;

          default:
            if (typeof data.message === 'string' && data.message !== '') {
              openNotification(NOTIFICATION.ERROR, '', '', data.message);
            } else {
              openNotification(NOTIFICATION.ERROR, '', '', data?.message || data?.error || data?.title || 'Unknown error!');
            }
        }
      }
    } else {
      openNotification(NOTIFICATION.ERROR, '', '', error.message);
    }
  } else if (error) {
    openNotification(NOTIFICATION.ERROR, '', '', error.message);
  }

  return next(action);
};
