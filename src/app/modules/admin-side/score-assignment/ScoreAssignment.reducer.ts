import axios from 'axios';
import queryString from 'query-string';
import i18next from '@/i18n/i18n';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_ADD_SCORE_ASSIGNMENT,
  API_DELETE_SCORE_ASSIGNMENT,
  API_GET_LIST_SCORE_ASSIGNMENT,
  API_SELECT_SCORE_ASSIGNMENT,
  API_UPDATE_SCORE_ASSIGNMENT
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
import { stringify } from 'querystring';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  ScoreAssigmentChecking: false,
  listScoreAssigment: [],
  listAllScoreAssigment: [],
  data: {},
  validateError: []
};

export type ScoreAssigmentListState = Readonly<typeof initialState>;

export const getListScoreAssigment = createAsyncThunk('api/v1/scoreAssignment/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_GET_LIST_SCORE_ASSIGNMENT, param);
  return response.data.data;
});

export const insertScoreAssigment = createAsyncThunk('api/v1/scoreAssignment/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_ADD_SCORE_ASSIGNMENT, param);

  return response.data;
});

export const deleteScoreAssigment = createAsyncThunk('api/v1/scoreAssignment/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_DELETE_SCORE_ASSIGNMENT, param);

  return response.data;
});

export const selectScoreAssigment = createAsyncThunk('api/v1/scoreAssignment/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_SELECT_SCORE_ASSIGNMENT, param);

  return response.data;
});

export const updateScoreAssigment = createAsyncThunk('api/v1/scoreAssignment/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_UPDATE_SCORE_ASSIGNMENT, param);

  return response.data;
});

export const ScoreAssigmentManagementSlice = createSlice({
  name: 'api/v1/scoreAssignment',
  initialState: initialState as ScoreAssigmentListState,
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
      .addCase(getListScoreAssigment.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listAllScoreAssigment: (undefined === action.payload.data) ? null :  action.payload.data
        })
      })
      .addCase(getListScoreAssigment.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListScoreAssigment.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertScoreAssigment.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertScoreAssigment.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertScoreAssigment.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteScoreAssigment.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteScoreAssigment.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteScoreAssigment.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectScoreAssigment.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectScoreAssigment.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectScoreAssigment.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateScoreAssigment.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateScoreAssigment.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateScoreAssigment.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
});

export const { resetDept, changeData } = ScoreAssigmentManagementSlice.actions;

export default ScoreAssigmentManagementSlice.reducer;