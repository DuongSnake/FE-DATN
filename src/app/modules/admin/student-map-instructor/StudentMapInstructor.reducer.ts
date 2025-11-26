import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ADD_STUDENT_MAP_INSTRUCTOR,
  API_DELETE_STUDENT_MAP_INSTRUCTOR,
  API_GET_LIST_STUDENT_MAP_INSTRUCTOR,
  API_SELECT_STUDENT_MAP_INSTRUCTOR,
  API_UPDATE_STUDENT_MAP_INSTRUCTOR,
  API_GET_ALL_STUDENT_MAP_INSTRUCTOR_ACTIVE
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  StudentMapInstructorChecking: false,
  listStudentMapInstructor: [],
  listAllStudentMapInstructor: [],
  data: {},
  validateError: [],
  totalRecord : 0
};

export type StudentMapInstructorListState = Readonly<typeof initialState>;

export const getListStudentMapInstructor = createAsyncThunk('api/v1/studentMapInstructor/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_STUDENT_MAP_INSTRUCTOR, param);
  return response.data.data;
});

export const insertStudentMapInstructor = createAsyncThunk('api/v1/studentMapInstructor/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ADD_STUDENT_MAP_INSTRUCTOR, param);

  return response.data;
});

export const deleteStudentMapInstructor = createAsyncThunk('api/v1/studentMapInstructor/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_STUDENT_MAP_INSTRUCTOR, param);

  return response.data;
});

export const selectStudentMapInstructor = createAsyncThunk('api/v1/studentMapInstructor/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_STUDENT_MAP_INSTRUCTOR, param);

  return response.data;
});

export const updateStudentMapInstructor = createAsyncThunk('api/v1/studentMapInstructor/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_UPDATE_STUDENT_MAP_INSTRUCTOR, param);

  return response.data;
});

export const getListStudentMapInstructorAll = createAsyncThunk('api/v1/studentMapInstructor/selectListAllActive', async () => {
  const response = await apiClient.post<IResponseCommon>(API_GET_ALL_STUDENT_MAP_INSTRUCTOR_ACTIVE, null);

  return response.data;
});

export const StudentMapInstructorManagementSlice = createSlice({
  name: 'api/v1/studentMapInstructor',
  initialState: initialState as StudentMapInstructorListState,
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
      .addCase(getListStudentMapInstructor.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listStudentMapInstructor: (undefined === action.payload.data) ? null :  action.payload.data,
          totalRecord: (undefined === action.payload.totalRecord) ? null :  action.payload.totalRecord
        })
      })
      .addCase(getListStudentMapInstructor.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListStudentMapInstructor.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertStudentMapInstructor.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertStudentMapInstructor.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertStudentMapInstructor.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteStudentMapInstructor.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteStudentMapInstructor.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteStudentMapInstructor.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectStudentMapInstructor.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectStudentMapInstructor.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectStudentMapInstructor.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateStudentMapInstructor.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateStudentMapInstructor.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateStudentMapInstructor.pending, state => ({
        ...state,
        loadingUpdate: true
      }))
      .addCase(getListStudentMapInstructorAll.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listStudentMapInstructor: (undefined === action.payload.data) ? null :  action.payload.data,
          totalRecord: (undefined === action.payload.totalRecord) ? null :  action.payload.totalRecord
        })
      })
      .addCase(getListStudentMapInstructorAll.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListStudentMapInstructorAll.pending, state => ({
        ...state,
        loading: true
      }));
  }
});

export const { resetDept, changeData } = StudentMapInstructorManagementSlice.actions;

export default StudentMapInstructorManagementSlice.reducer;