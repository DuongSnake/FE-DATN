import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ADD_ADMISSION_PERIOD,
  API_DELETE_ADMISSION_PERIOD,
  API_GET_LIST_ADMISSION_PERIOD,
  API_SELECT_ADMISSION_PERIOD,
  API_UPDATE_ADMISSION_PERIOD,
  API_GET_ALL_SELECT_ADMISSION_PERIOD_ACITVE
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  AdmissionPeriodChecking: false,
  listAdmissionPeriod: [],
  listAllAdmissionPeriod: [],
  data: {},
  validateError: []
};

export type AdmissionPeriodListState = Readonly<typeof initialState>;

export const getListAdmissionPeriod = createAsyncThunk('api/v1/admissionPeriod/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_ADMISSION_PERIOD, param);
  return response.data.data;
});

export const insertAdmissionPeriod = createAsyncThunk('api/v1/admissionPeriod/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ADD_ADMISSION_PERIOD, param);

  return response.data;
});

export const deleteAdmissionPeriod = createAsyncThunk('api/v1/admissionPeriod/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_ADMISSION_PERIOD, param);

  return response.data;
});

export const selectAdmissionPeriod = createAsyncThunk('api/v1/admissionPeriod/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_ADMISSION_PERIOD, param);

  return response.data;
});

export const updateAdmissionPeriod = createAsyncThunk('api/v1/admissionPeriod/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_UPDATE_ADMISSION_PERIOD, param);

  return response.data;
});

export const getAllAdmissionPeriodActive = createAsyncThunk('api/v1/admissionPeriod/selectListAllActive', async () => {
  const response = await apiClient.post<IResponseCommon>(API_GET_ALL_SELECT_ADMISSION_PERIOD_ACITVE, null);

  return response.data;
});

export const AdmissionPeriodManagementSlice = createSlice({
  name: 'api/v1/admissionPeriod',
  initialState: initialState as AdmissionPeriodListState,
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
      .addCase(getListAdmissionPeriod.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listAdmissionPeriod: (undefined === action.payload.data) ? null :  action.payload.data
        })
      })
      .addCase(getListAdmissionPeriod.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListAdmissionPeriod.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertAdmissionPeriod.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertAdmissionPeriod.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertAdmissionPeriod.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteAdmissionPeriod.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteAdmissionPeriod.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteAdmissionPeriod.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectAdmissionPeriod.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectAdmissionPeriod.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectAdmissionPeriod.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateAdmissionPeriod.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateAdmissionPeriod.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateAdmissionPeriod.pending, state => ({
        ...state,
        loadingUpdate: true
      }))
      
      
      .addCase(getAllAdmissionPeriodActive.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listAdmissionPeriod: (undefined === action.payload.data) ? null :  action.payload.data
        })
      })
      .addCase(getAllAdmissionPeriodActive.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getAllAdmissionPeriodActive.pending, state => ({
        ...state,
        loading: true
      }));
  }
});

export const { resetDept, changeData } = AdmissionPeriodManagementSlice.actions;

export default AdmissionPeriodManagementSlice.reducer;