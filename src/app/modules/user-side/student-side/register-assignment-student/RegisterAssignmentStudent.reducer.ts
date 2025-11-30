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
  registerAssignmentStudentChecking: false,
  listRegisterAssignmentStudent: [],
  listAllRegisterAssignmentStudent: [],
  data: {},
  validateError: [],
  totalRecord : 0
};

export type RegisterAssignmentStudentListState = Readonly<typeof initialState>;

export const getListRegisterAssignmentStudent = createAsyncThunk('api/v1/registerAssignmentStudent/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_ASSIGNMENT_STUDENT_REGISTER, param);
  return response.data.data;
});

export const deleteRegisterAssignmentStudent = createAsyncThunk('api/v1/registerAssignmentStudent/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_ASSIGNMENT_STUDENT_REGISTER, param);

  return response.data;
});

export const selectRegisterAssignmentStudent = createAsyncThunk('api/v1/registerAssignmentStudent/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_ASSIGNMENT_STUDENT_REGISTER, param);

  return response.data;
});
export const updateRegisterAssignmentStudent = createAsyncThunk(
  'api/v1/registerAssignmentStudent/update',
  async (params: any) => {
    const response = await apiClient.post<any>(API_UPDATE_ASSIGNMENT_STUDENT_REGISTER, params, {
      headers: {
        lang: 'vi',
      },
    });

    return response.data;
  },
);

export const insertRegisterAssignmentStudent = createAsyncThunk(
  'api/v1/registerAssignmentStudent/insert',
  async (params: any) => {
    const response = await apiClient.post<any>(API_ADD_ASSIGNMENT_STUDENT_REGISTER, params, {
      headers: {
        lang: 'vi',
      },
    });

    return response.data;
  },
);

export const RegisterAssignmentStudentSlice = createSlice({
  name: 'api/v1/RegisterAssignmentStudent',
  initialState: initialState as RegisterAssignmentStudentListState,
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
      .addCase(getListRegisterAssignmentStudent.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listRegisterAssignmentStudent: (undefined === action.payload.data) ? null :  action.payload.data,
          totalRecord: (undefined === action.payload.totalRecord) ? null :  action.payload.totalRecord
        })
      })
      .addCase(getListRegisterAssignmentStudent.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListRegisterAssignmentStudent.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertRegisterAssignmentStudent.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertRegisterAssignmentStudent.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertRegisterAssignmentStudent.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteRegisterAssignmentStudent.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteRegisterAssignmentStudent.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteRegisterAssignmentStudent.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectRegisterAssignmentStudent.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectRegisterAssignmentStudent.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectRegisterAssignmentStudent.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateRegisterAssignmentStudent.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateRegisterAssignmentStudent.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateRegisterAssignmentStudent.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
});

export const { resetDept, changeData } = RegisterAssignmentStudentSlice.actions;

export default RegisterAssignmentStudentSlice.reducer;