import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ACTION_INSERT,
  API_ACTION_DELETE,
  API_ACTION_SELECTELIST,
  API_ACTION_SELECT,
  API_ACTION_UPDATE
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  actionChecking: false,
  listAction: [],
  listAllAction: [],
  data: {},
  validateError: []
};

export type ActionListState = Readonly<typeof initialState>;

export const getListAction = createAsyncThunk('api/v1/action/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_ACTION_SELECTELIST, param);
  return response.data;
});

export const insertAction = createAsyncThunk('api/v1/action/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ACTION_INSERT, param);

  return response.data;
});

export const deleteAction = createAsyncThunk('api/v1/action/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_ACTION_DELETE, param);

  return response.data;
});

export const selectAction = createAsyncThunk('api/v1/action/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ACTION_SELECT, param);

  return response.data;
});

export const updateAction = createAsyncThunk('api/v1/action/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ACTION_UPDATE, param);

  return response.data;
});

export const ActionManagementSlice = createSlice({
  name: 'api/v1/action',
  initialState: initialState as ActionListState,
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
      .addCase(getListAction.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listAction: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListAction.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListAction.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertAction.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertAction.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertAction.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteAction.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteAction.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteAction.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectAction.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: action.payload.data
      }))
      .addCase(selectAction.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectAction.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateAction.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateAction.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateAction.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
});

export const { resetDept, changeData } = ActionManagementSlice.actions;

export default ActionManagementSlice.reducer;