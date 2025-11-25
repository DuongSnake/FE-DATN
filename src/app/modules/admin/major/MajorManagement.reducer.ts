import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ADD_MAJOR,
  API_DELETE_MAJOR,
  API_GET_LIST_MAJOR,
  API_SELECT_MAJOR,
  API_UPDATE_MAJOR,
  API_GET_ALL_SELECT_MAJOR_ACITVE
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  MajorChecking: false,
  listMajor: [],
  listAllMajor: [],
  data: {},
  validateError: []
};

export type MajorListState = Readonly<typeof initialState>;

export const getListMajor = createAsyncThunk('api/v1/major/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_MAJOR, param);
  return response.data.data;
});

export const insertMajor = createAsyncThunk('api/v1/major/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ADD_MAJOR, param);

  return response.data;
});

export const deleteMajor = createAsyncThunk('api/v1/major/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_MAJOR, param);

  return response.data;
});

export const selectMajor = createAsyncThunk('api/v1/major/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_MAJOR, param);

  return response.data;
});

export const updateMajor = createAsyncThunk('api/v1/major/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_UPDATE_MAJOR, param);

  return response.data;
});

export const getAllMajorActive = createAsyncThunk('api/v1/major/selectListAllActive', async () => {
  const response = await apiClient.post<IResponseCommon>(API_GET_ALL_SELECT_MAJOR_ACITVE, null);

  return response.data;
});

export const MajorManagementSlice = createSlice({
  name: 'api/v1/major',
  initialState: initialState as MajorListState,
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
      .addCase(getListMajor.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listMajor: (undefined === action.payload.data) ? null :  action.payload.data
        })
      })
      .addCase(getListMajor.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListMajor.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertMajor.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertMajor.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertMajor.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteMajor.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteMajor.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteMajor.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectMajor.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectMajor.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectMajor.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateMajor.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateMajor.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateMajor.pending, state => ({
        ...state,
        loadingUpdate: true
      }))
      .addCase(getAllMajorActive.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listMajor: (undefined === action.payload.data) ? null :  action.payload.data
        })
      })
      .addCase(getAllMajorActive.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getAllMajorActive.pending, state => ({
        ...state,
        loading: true
      }));
  }
});

export const { resetDept, changeData } = MajorManagementSlice.actions;

export default MajorManagementSlice.reducer;