import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ADD_PERIOD_ASSIGNMENT,
  API_DELETE_PERIOD_ASSIGNMENT,
  API_GET_LIST_PERIOD_ASSIGNMENT,
  API_SELECT_PERIOD_ASSIGNMENT,
  API_UPDATE_PERIOD_ASSIGNMENT,
  API_GET_ALL_PERIOD_ASSIGNMENT_ACITVE
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  PeriodAssignmentChecking: false,
  listPeriodAssignment: [],
  listAllPeriodAssignment: [],
  data: {},
  validateError: []
};

export type PeriodAssignmentListState = Readonly<typeof initialState>;

export const getListPeriodAssignment = createAsyncThunk('api/v1/periodAssignment/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_PERIOD_ASSIGNMENT, param);
  return response.data.data;
});

export const insertPeriodAssignment = createAsyncThunk('api/v1/periodAssignment/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ADD_PERIOD_ASSIGNMENT, param);

  return response.data;
});

export const deletePeriodAssignment = createAsyncThunk('api/v1/periodAssignment/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_PERIOD_ASSIGNMENT, param);

  return response.data;
});

export const selectPeriodAssignment = createAsyncThunk('api/v1/periodAssignment/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_PERIOD_ASSIGNMENT, param);

  return response.data;
});

export const updatePeriodAssignment = createAsyncThunk('api/v1/periodAssignment/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_UPDATE_PERIOD_ASSIGNMENT, param);

  return response.data;
});



export const getAllPeriodAssignmentActive = createAsyncThunk('api/v1/periodAssignment/selectListAllActive', async () => {
  const response = await apiClient.post<any>(API_GET_ALL_PERIOD_ASSIGNMENT_ACITVE, null);

  return response.data;
});

export const PeriodAssignmentManagementSlice = createSlice({
  name: 'api/v1/periodAssignment',
  initialState: initialState as PeriodAssignmentListState,
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
      .addCase(getListPeriodAssignment.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listPeriodAssignment: (undefined === action.payload.data) ? null :  action.payload.data
        })
      })
      .addCase(getListPeriodAssignment.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListPeriodAssignment.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertPeriodAssignment.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertPeriodAssignment.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertPeriodAssignment.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deletePeriodAssignment.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deletePeriodAssignment.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deletePeriodAssignment.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectPeriodAssignment.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectPeriodAssignment.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectPeriodAssignment.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updatePeriodAssignment.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updatePeriodAssignment.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updatePeriodAssignment.pending, state => ({
        ...state,
        loadingUpdate: true
      }))
      .addCase(getAllPeriodAssignmentActive.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listPeriodAssignment: (undefined === action.payload.data) ? null :  action.payload.data
        })
      })
      .addCase(getAllPeriodAssignmentActive.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getAllPeriodAssignmentActive.pending, state => ({
        ...state,
        loading: true
      }));
  }
});

export const { resetDept, changeData } = PeriodAssignmentManagementSlice.actions;

export default PeriodAssignmentManagementSlice.reducer;