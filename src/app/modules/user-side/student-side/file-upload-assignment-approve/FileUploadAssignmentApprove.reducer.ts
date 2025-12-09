import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_GET_LIST_ASSIGNMENT_APPROVE,
  API_GET_LIST_FILE_ASSIGNMENT_APPROVE,
  API_ADD_LIST_FILE_ASSIGNMENT_APPROVE,
  API_UPDATE_LIST_FILE_ASSIGNMENT_APPROVE
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  FileUploadAssignmentApproveChecking: false,
  listFileUploadAssignmentApprove: [],
  listAllFileUploadAssignmentApprove: [],
  data: {},
  validateError: [],
  totalRecord : 0
};

export type FileUploadAssignmentApproveListState = Readonly<typeof initialState>;

export const getListFileUploadAssignmentApprove = createAsyncThunk('api/v1/assignmentRegister/selectListAssApprove', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_ASSIGNMENT_APPROVE, param);
  return response.data.data;
});

export const selectFileUploadAssignmentApprove = createAsyncThunk('api/v1/assignmentRegister/selectListFileAss', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_FILE_ASSIGNMENT_APPROVE, param);

  return response.data;
});

export const updateFileUploadAssignmentApprove = createAsyncThunk(
  'api/v1/assignmentRegister/updateListFileAssignment',
  async (params: any) => {
    const response = await apiClient.post<any>(API_UPDATE_LIST_FILE_ASSIGNMENT_APPROVE, params, {
      headers: {
        lang: 'vi',
      },
    });

    return response.data;
  },
);

export const insertFileUploadAssignmentApprove = createAsyncThunk(
  'api/v1/FileUploadAssignmentApprove/insertListFileAssignment',
  async (params: any) => {
    const response = await apiClient.post<any>(API_ADD_LIST_FILE_ASSIGNMENT_APPROVE, params, {
      headers: {
        lang: 'vi',
      },
    });

    return response.data;
  },
);

export const FileUploadAssignmentApproveSlice = createSlice({
  name: 'api/v1/FileUploadAssignmentApprove',
  initialState: initialState as FileUploadAssignmentApproveListState,
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
      .addCase(getListFileUploadAssignmentApprove.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listFileUploadAssignmentApprove: (undefined === action.payload.data) ? null :  action.payload.data,
          totalRecord: (undefined === action.payload.totalRecord) ? null :  action.payload.totalRecord
        })
      })
      .addCase(getListFileUploadAssignmentApprove.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListFileUploadAssignmentApprove.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertFileUploadAssignmentApprove.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertFileUploadAssignmentApprove.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertFileUploadAssignmentApprove.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(selectFileUploadAssignmentApprove.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectFileUploadAssignmentApprove.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectFileUploadAssignmentApprove.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateFileUploadAssignmentApprove.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateFileUploadAssignmentApprove.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateFileUploadAssignmentApprove.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
});

export const { resetDept, changeData } = FileUploadAssignmentApproveSlice.actions;

export default FileUploadAssignmentApproveSlice.reducer;