import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ADD_ASSIGNMENT_STUDENT_REGISTER,
  API_DELETE_ASSIGNMENT_STUDENT_REGISTER,
  API_GET_LIST_ASSIGNMENT_STUDENT_REGISTER,
  API_SELECT_ASSIGNMENT_STUDENT_REGISTER,
  API_UPDATE_ASSIGNMENT_STUDENT_REGISTER
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  AssignmentStudentRegisterChecking: false,
  listAssignmentStudentRegister: [],
  listAllAssignmentStudentRegister: [],
  data: {},
  validateError: [],
  totalRecord : 0
};

export type AssignmentStudentRegisterListState = Readonly<typeof initialState>;

export const getListAssignmentStudentRegister = createAsyncThunk('api/v1/assignmentStudentRegister/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_ASSIGNMENT_STUDENT_REGISTER, param);
  return response.data.data;
});

export const insertAssignmentStudentRegister = createAsyncThunk('api/v1/assignmentStudentRegister/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ADD_ASSIGNMENT_STUDENT_REGISTER, param);

  return response.data;
});

export const deleteAssignmentStudentRegister = createAsyncThunk('api/v1/assignmentStudentRegister/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_ASSIGNMENT_STUDENT_REGISTER, param);

  return response.data;
});

export const selectAssignmentStudentRegister = createAsyncThunk('api/v1/assignmentStudentRegister/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_ASSIGNMENT_STUDENT_REGISTER, param);

  return response.data;
});

export const updateAssignmentStudentRegister = createAsyncThunk('api/v1/assignmentStudentRegister/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_UPDATE_ASSIGNMENT_STUDENT_REGISTER, param);

  return response.data;
});

export const AssignmentStudentRegisterSlice = createSlice({
  name: 'api/v1/assignmentStudentRegister',
  initialState: initialState as AssignmentStudentRegisterListState,
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
      .addCase(getListAssignmentStudentRegister.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listAssignmentStudentRegister: (undefined === action.payload.data) ? null :  action.payload.data,
          totalRecord: (undefined === action.payload.totalRecord) ? null :  action.payload.totalRecord
        })
      })
      .addCase(getListAssignmentStudentRegister.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListAssignmentStudentRegister.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertAssignmentStudentRegister.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertAssignmentStudentRegister.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertAssignmentStudentRegister.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteAssignmentStudentRegister.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteAssignmentStudentRegister.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteAssignmentStudentRegister.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectAssignmentStudentRegister.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectAssignmentStudentRegister.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectAssignmentStudentRegister.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateAssignmentStudentRegister.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateAssignmentStudentRegister.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateAssignmentStudentRegister.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
});

export const { resetDept, changeData } = AssignmentStudentRegisterSlice.actions;

export default AssignmentStudentRegisterSlice.reducer;