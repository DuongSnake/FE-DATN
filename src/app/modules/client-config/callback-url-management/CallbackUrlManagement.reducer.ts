import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_CALL_BACK_URL_INSERT,
  API_CALL_BACK_URL_DELETE,
  API_CALL_BACK_URL_SELECTELIST,
  API_CALL_BACK_URL_SELECT,
  API_CALL_BACK_URL_UPDATE,
  API_GET_LIST_USER_ACCOUNT
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  bankCodeChecking: false,
  listCallbackUrl: [],
  listAllCallbackUrl: [],
  data: {},
  listBankCode: [],
  validateError: []
};

export type CallbackUrlListState = Readonly<typeof initialState>;

export const getListCallbackUrl = createAsyncThunk('api/v1/callBackUrl/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_CALL_BACK_URL_SELECTELIST, param);
  return response.data;
});

export const insertCallbackUrl = createAsyncThunk('api/v1/callBackUrl/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_CALL_BACK_URL_INSERT, param);

  return response.data;
});

export const deleteCallbackUrl = createAsyncThunk('api/v1/callBackUrl/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_CALL_BACK_URL_DELETE, param);

  return response.data;
});

export const selectCallbackUrl = createAsyncThunk('api/v1/callBackUrl/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_CALL_BACK_URL_SELECT, param);

  return response.data;
});

export const updateCallbackUrl = createAsyncThunk('api/v1/callBackUrl/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_CALL_BACK_URL_UPDATE, param);

  return response.data;
});
export const selectAllCallbackUrl = createAsyncThunk('api/v1/callBackUrl/selectAll', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_CALL_BACK_URL_SELECTELIST, param);
  return response.data;
});
export const getListBankCode = createAsyncThunk('api/v1/bankCode/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_USER_ACCOUNT, param);
  return response.data;
});

export const CallbackUrlManagementSlice = createSlice({
  name: 'api/v1/bankCode',
  initialState: initialState as CallbackUrlListState,
  reducers: {
    resetDept() {
      return initialState;
    },
    changeData(state, action) {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getListCallbackUrl.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listCallbackUrl: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListCallbackUrl.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListCallbackUrl.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertCallbackUrl.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertCallbackUrl.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertCallbackUrl.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteCallbackUrl.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteCallbackUrl.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteCallbackUrl.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectCallbackUrl.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectCallbackUrl.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectCallbackUrl.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateCallbackUrl.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateCallbackUrl.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateCallbackUrl.pending, state => ({
        ...state,
        loadingUpdate: true
      }))
      .addCase(selectAllCallbackUrl.fulfilled, (state, action) => ({
        ...state,
        listAllCallbackUrl: (undefined === action.payload.data) ? null :  action.payload.data.listData
      }))
      .addCase(getListBankCode.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listBankCode: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListBankCode.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListBankCode.pending, state => ({
        ...state,
        loading: true
      }));
  }
});

export const { resetDept, changeData } = CallbackUrlManagementSlice.actions;

export default CallbackUrlManagementSlice.reducer;