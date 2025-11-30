import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ADD_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT,
  API_DELETE_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT,
  API_GET_LIST_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT,
  API_SELECT_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT,
  API_UPDATE_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT,
  API_INSERT_LIST_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  InstructorMapPeriodAssignmentChecking: false,
  listInstructorMapPeriodAssignment: [],
  listAllInstructorMapPeriodAssignment: [],
  data: {},
  validateError: [],
  totalRecord : 0
};

export type InstructorMapPeriodAssignmentListState = Readonly<typeof initialState>;

export const getListInstructorMapPeriodAssignment = createAsyncThunk('api/v1/instructorMapPeriodAssignment/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT, param);
  return response.data.data;
});

export const insertInstructorMapPeriodAssignment = createAsyncThunk('api/v1/instructorMapPeriodAssignment/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ADD_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT, param);

  return response.data;
});

export const deleteInstructorMapPeriodAssignment = createAsyncThunk('api/v1/instructorMapPeriodAssignment/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT, param);

  return response.data;
});

export const selectInstructorMapPeriodAssignment = createAsyncThunk('api/v1/instructorMapPeriodAssignment/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT, param);

  return response.data;
});

export const updateInstructorMapPeriodAssignment = createAsyncThunk('api/v1/instructorMapPeriodAssignment/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_UPDATE_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT, param);

  return response.data;
});

export const InstructorMapPeriodAssignmentManagementSlice = createSlice({
  name: 'api/v1/instructorMapPeriodAssignment',
  initialState: initialState as InstructorMapPeriodAssignmentListState,
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
      .addCase(getListInstructorMapPeriodAssignment.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listInstructorMapPeriodAssignment: (undefined === action.payload.data) ? null :  action.payload.data,
          totalRecord: (undefined === action.payload.totalRecord) ? null :  action.payload.totalRecord
        })
      })
      .addCase(getListInstructorMapPeriodAssignment.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListInstructorMapPeriodAssignment.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertInstructorMapPeriodAssignment.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertInstructorMapPeriodAssignment.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertInstructorMapPeriodAssignment.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteInstructorMapPeriodAssignment.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteInstructorMapPeriodAssignment.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteInstructorMapPeriodAssignment.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectInstructorMapPeriodAssignment.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectInstructorMapPeriodAssignment.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectInstructorMapPeriodAssignment.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateInstructorMapPeriodAssignment.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateInstructorMapPeriodAssignment.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateInstructorMapPeriodAssignment.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
});

export const { resetDept, changeData } = InstructorMapPeriodAssignmentManagementSlice.actions;

export default InstructorMapPeriodAssignmentManagementSlice.reducer;