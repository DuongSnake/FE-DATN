import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_CHANGE_LOGIN_PASSWORD,
  API_CHANGE_PASSWORD,
  API_CHECK_RESET_CODE,
  API_EXTEND_TOKEN,
  API_FORGOT_PASSWORD,
  API_POST_EXPIRE_PASSWORD,
  API_RESET_PASSWORD,
  APT_POST_MENULIST,
  APT_POST_SIGNIN,
} from '@/app/config/constant/api';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_NAME, USER_TYPE, EXPIRES_TIME } from '@/app/config/constant/constants';
import { AppThunk } from '@/app/config/redux/store';
import { AxiosResponse } from 'axios';
import { serializeAxiosError } from './reducer.utils';
import { reset } from '../layout/tab/tabs.reducer';
import { IParamCodeCheck, IParamCommon, IParamForgotPassword, IParamResetPassword, IResponseCommon } from '../model/common.model';
import { IAuthParams, IExtendParams, IListMenu, IUserRecovery } from '@/app/shared/model/authentication.model';
import { Storage } from '../helpers/cms-helper';

export const initialState = {
  isOldPassword: false,
  loading: false,
  loadingReset: false,
  loadingChangePass: false,
  loadingChangeLoginPass: false,
  resetData: {} as IUserRecovery,
  isFirstLogin: 'N',
  isAuthenticated: false,
  sessionHasBeenFetched: false,
  isChangePasswordSuccess: false,
  accessToken: '',
  refreshIdx: '',
  userNm: '',
  userType: '',
  listMenu: [] as IListMenu[],
};

export type AuthenticationState = Readonly<typeof initialState>;

export const revokeToken = () => {
  logout();
};

export const validatePassword = createAsyncThunk(
  'validateExpiredPassword',
  async (params: { userId: string }) => {
    // const response = await apiClient.post<any>(API_POST_EXPIRE_PASSWORD, params);

    return null;
  },
  { serializeError: serializeAxiosError },
);

export const authenticate = createAsyncThunk(
  'authentication/login',
  async (authRequest: IAuthParams) => {
    const response = await apiClient.post<any>(APT_POST_SIGNIN, authRequest);

    return response.data;
  },
  { serializeError: serializeAxiosError },
);

// export const extendToken = createAsyncThunk(
//   'authentication/extend',
//   async (authRequest: IExtendParams) => {
//     const response = await apiClient.post<any>(API_EXTEND_TOKEN, authRequest);

//     return response.data;
//   },
//   { serializeError: serializeAxiosError },
// );

export const getMenuThunk = createAsyncThunk(
  'authentication/getMenuThunk',
  async (authRequest: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(APT_POST_MENULIST, authRequest);
    return response.data;
  },
  { serializeError: serializeAxiosError },
);

export const changePassword = createAsyncThunk('authentication/change-password', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_CHANGE_PASSWORD, param);
  return response.data;
});

export const changeLoginPassword = createAsyncThunk('authentication/change-login-password', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_CHANGE_LOGIN_PASSWORD, param);
  return response.data;
});

export const forgotPassword = createAsyncThunk('authentication/forgot-password', async (param: IParamForgotPassword) => {
  const response = await apiClient.post<any>(API_FORGOT_PASSWORD, param);
  return response.data;
});

export const checkResetCode = createAsyncThunk('authentication/checkResetCode', async (param: IParamCodeCheck) => {
  const response = await apiClient.post<any>(API_CHECK_RESET_CODE, param);
  return response.data;
});

export const resetPassword = createAsyncThunk('authentication/resetPassword', async (param: IParamResetPassword) => {
  const response = await apiClient.post<any>(API_RESET_PASSWORD, param);
  return response.data;
});

export const login: (userName: string, password: string, isRemember: string) => AppThunk =
  (userName, password) => async dispatch => {
    const auth = await dispatch(authenticate({ userName, password}));
    const payload = auth.payload as AxiosResponse;
    if (payload?.data) {
      console.log("payload.data:"+payload.data);
      const { token, username } = payload.data;
      Storage.session.set(ACCESS_TOKEN, token);
      // Storage.session.set(REFRESH_TOKEN, username);
      // Storage.session.set(EXPIRES_TIME, expiresIn);
      Storage.session.set(USER_NAME, username);
      Storage.session.set(USER_TYPE, "S");
    }
  };

// export const extend: (refreshToken: string) => AppThunk = refreshToken => async dispatch => {
//   const auth = await dispatch(extendToken({ refreshToken }));
//   const payload = auth.payload as AxiosResponse;

//   if (payload?.data) {
//     const { token, refreshToken: refreshToken, expiresIn } = payload.data;
//     Storage.session.set(ACCESS_TOKEN, token);
//     Storage.session.set(REFRESH_TOKEN, refreshToken);
//     Storage.session.set(EXPIRES_TIME, expiresIn);
//   }
// };

export const clearAuthToken = () => {
  if (Storage.session.get(ACCESS_TOKEN)) {
    Storage.session.remove(ACCESS_TOKEN);
  }
  if (Storage.session.get(REFRESH_TOKEN)) {
    Storage.session.remove(REFRESH_TOKEN);
  }
  if (Storage.session.get(USER_NAME)) {
    Storage.session.remove(USER_NAME);
  }
  if (Storage.session.get(USER_TYPE)) {
    Storage.session.remove(USER_TYPE);
  }
};

export const logout: () => AppThunk = () => dispatch => {
  dispatch(reset());
  clearAuthToken();
  dispatch(logoutSession());
};

export const clearAuthentication = messageKey => dispatch => {
  dispatch(reset());
  clearAuthToken();
  dispatch(clearAuth());
  dispatch(logoutSession());
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState as AuthenticationState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
      };
    },
    authError(state, action) {
      return {
        ...state,
        redirectMessage: action.payload,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isFirstLogin: 'N',
      };
    },
    checkHasAuth(state) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        sessionHasBeenFetched: true,
        isFirstLogin: 'N',
      };
    },
    resetNeedChangePass(state) {
      return {
        ...state,
        isOldPassword: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        const checkAuthenticated = action?.payload?.data && action?.payload?.data?.accessToken !== '';

        return {
          ...state,
          isAuthenticated: checkAuthenticated,
          accessToken: !!action.payload.data && action.payload.data.token,
          refreshToken: !!action.payload.data && action.payload.data.refreshToken,
          sessionHasBeenFetched: true,
          userNm: !!action.payload.data && action.payload.data.userNm,
          userType: !!action.payload.data && action.payload.data.userType,
          isFirstLogin: !!action.payload.data && action.payload.data.isFirstLogin,
          loading: false,
        };
      })
      .addCase(authenticate.rejected, (state, action) => {
        return {
          ...initialState,
          errorMessage: action.error.message,
        };
      })
      .addCase(checkResetCode.fulfilled, (state, action) => ({
        ...state,
        resetData: action.payload.data,
      }))
      .addCase(authenticate.pending, state => {
        state.loading = true;
      })
      .addCase(forgotPassword.pending, state => {
        state.loadingReset = true;
      })
      .addCase(forgotPassword.fulfilled, state => {
        state.loadingReset = false;
      })
      .addCase(forgotPassword.rejected, state => {
        state.loadingReset = false;
      })
      .addCase(resetPassword.pending, state => {
        state.loadingChangePass = true;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loadingChangePass = false;
      })
      .addCase(resetPassword.rejected, state => {
        state.loadingChangePass = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => ({
        ...state,
        isChangePasswordSuccess: true,
        isFirstLogin: 'N',
      }))
      .addCase(changePassword.rejected, state => ({
        ...state,
        isChangePasswordSuccess: false,
      }))
      .addCase(changePassword.pending, state => ({
        ...state,
        isChangePasswordSuccess: false,
      }))
      .addCase(getMenuThunk.rejected, state => ({
        ...state,
        listMenu: [],
      }))
      .addCase(getMenuThunk.pending, state => ({
        ...state,
        listMenu: [],
      }))
      .addCase(changeLoginPassword.fulfilled, (state, action) => ({
        ...state,
        loadingChangeLoginPass: false,
      }))
      .addCase(changeLoginPassword.rejected, state => ({
        ...state,
        loadingChangeLoginPass: false,
      }))
      .addCase(changeLoginPassword.pending, state => ({
        ...state,
        loadingChangeLoginPass: true,
      }));
  },
});

export const { logoutSession, authError, clearAuth, checkHasAuth, resetNeedChangePass } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
