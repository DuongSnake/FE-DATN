import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ADD_USER_ACCOUNT,
  API_DELETE_USER_ACCOUNT,
  API_GET_LIST_USER_ACCOUNT,
  API_SELECT_ALL_USER_ACCOUNT,
  API_SELECT_USER_ACCOUNT,
  API_UPDATE_USER_ACCOUNT
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  bankCodeChecking: false,
  listBankCode: [],
  listAllBankCode: [],
  data: {},
  validateError: []
};

export type BankCodeListState = Readonly<typeof initialState>;

export const getListBankCode = createAsyncThunk('api/v1/user/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_USER_ACCOUNT, param);
  return response.data.data;
});

export const insertBankCode = createAsyncThunk('api/v1/user/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ADD_USER_ACCOUNT, param);

  return response.data;
});

export const deleteBankCode = createAsyncThunk('api/v1/user/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_USER_ACCOUNT, param);

  return response.data;
});

export const selectBankCode = createAsyncThunk('api/v1/user/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_USER_ACCOUNT, param);

  return response.data;
});

export const updateBankCode = createAsyncThunk('api/v1/user/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_UPDATE_USER_ACCOUNT, param);

  return response.data;
});
export const selectAllBankCode = createAsyncThunk('api/v1/user/selectAll', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_ALL_USER_ACCOUNT, param);
  return response.data;
});

export const BankCodeManagementSlice = createSlice({
  name: 'api/v1/bankCode',
  initialState: initialState as BankCodeListState,
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
      .addCase(getListBankCode.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listBankCode: (undefined === action.payload.data) ? null :  action.payload.data
        })
      })
      .addCase(getListBankCode.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListBankCode.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertBankCode.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertBankCode.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertBankCode.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteBankCode.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteBankCode.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteBankCode.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectBankCode.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectBankCode.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectBankCode.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateBankCode.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateBankCode.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateBankCode.pending, state => ({
        ...state,
        loadingUpdate: true
      }))
      .addCase(selectAllBankCode.fulfilled, (state, action) => ({
        ...state,
        listAllBankCode: (undefined === action.payload.data) ? null :  action.payload.data.listData
      }));
  }
});

export const { resetDept, changeData } = BankCodeManagementSlice.actions;

export default BankCodeManagementSlice.reducer;