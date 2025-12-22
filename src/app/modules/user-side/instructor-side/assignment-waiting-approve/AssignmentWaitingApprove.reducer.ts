import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ADD_ASSIGNMENT_STUDENT_USER_SIDE,
  API_DELETE_ASSIGNMENT_STUDENT_USER_SIDE,
  API_GET_LIST_ASSIGNMENT_WAITING_APPROVE,
  API_SELECT_ASSIGNMENT_STUDENT_USER_SIDE,
  API_UPDATE_ASSIGNMENT_STUDENT_USER_SIDE,
  API_SEND_REQUEST_ASSIGNMENT_STUDENT_USER_SIDE
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  AssignmentWaitingApproveChecking: false,
  listAssignmentWaitingApprove: [],
  listAllAssignmentWaitingApprove: [],
  data: {},
  validateError: [],
  totalRecord : 0
};

export type AssignmentWaitingApproveListState = Readonly<typeof initialState>;

export const getListAssignmentWaitingApprove = createAsyncThunk('api/v1/assignmentRegister/selectListWaitingSend', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_ASSIGNMENT_WAITING_APPROVE, param);
  return response.data.data;
});

export const deleteAssignmentWaitingApprove = createAsyncThunk('api/v1/assignmentRegister/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_ASSIGNMENT_STUDENT_USER_SIDE, param);

  return response.data;
});

export const selectAssignmentWaitingApprove = createAsyncThunk('api/v1/assignmentRegister/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_ASSIGNMENT_STUDENT_USER_SIDE, param);

  return response.data;
});

export const sendRequestAssignmentStudent = createAsyncThunk('api/v1/sendRequestAssignment/sendRequestAssignment', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_SEND_REQUEST_ASSIGNMENT_STUDENT_USER_SIDE, param);

  return response.data;
});
export const updateAssignmentWaitingApprove = createAsyncThunk(
  'api/v1/assignmentRegister/update',
  async (params: any) => {
    const response = await apiClient.post<any>(API_UPDATE_ASSIGNMENT_STUDENT_USER_SIDE, params, {
      headers: {
        lang: 'vi',
      },
    });

    return response.data;
  },
);

export const insertAssignmentWaitingApprove = createAsyncThunk(
  'api/v1/AssignmentWaitingApprove/insert',
  async (params: any) => {
    const response = await apiClient.post<any>(API_ADD_ASSIGNMENT_STUDENT_USER_SIDE, params, {
      headers: {
        lang: 'vi',
      },
    });

    return response.data;
  },
);

export const AssignmentWaitingApproveSlice = createSlice({
  name: 'api/v1/AssignmentWaitingApprove',
  initialState: initialState as AssignmentWaitingApproveListState,
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
      .addCase(getListAssignmentWaitingApprove.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listAssignmentWaitingApprove: (undefined === action.payload.data) ? null :  action.payload.data,
          totalRecord: (undefined === action.payload.totalRecord) ? null :  action.payload.totalRecord
        })
      })
      .addCase(getListAssignmentWaitingApprove.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListAssignmentWaitingApprove.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertAssignmentWaitingApprove.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertAssignmentWaitingApprove.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertAssignmentWaitingApprove.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteAssignmentWaitingApprove.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteAssignmentWaitingApprove.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteAssignmentWaitingApprove.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectAssignmentWaitingApprove.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectAssignmentWaitingApprove.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectAssignmentWaitingApprove.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateAssignmentWaitingApprove.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateAssignmentWaitingApprove.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateAssignmentWaitingApprove.pending, state => ({
        ...state,
        loadingUpdate: true
      }))
      .addCase(sendRequestAssignmentStudent.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(sendRequestAssignmentStudent.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(sendRequestAssignmentStudent.pending, state => ({
        ...state,
        loadingDelete: true
      }));
  }
});

export const { resetDept, changeData } = AssignmentWaitingApproveSlice.actions;

export default AssignmentWaitingApproveSlice.reducer;