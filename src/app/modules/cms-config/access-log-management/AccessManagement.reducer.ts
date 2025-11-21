import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_ACCESS_LOG_SELECTELIST,
  CMS_ACCESS_LOG_SELECT
} from '@/app/config/constant/api';

const initialState = {
  loading: false,
  selectedSuccess: false,
  actionChecking: false,
  listAccess: [],
  listAllAccess: [],
  data: {},
  validateError: [],
  totalRecord: 0
};

export type AccessListState = Readonly<typeof initialState>;

export const getListAccess = createAsyncThunk('api/v1/accessLog/selectList2', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(CMS_ACCESS_LOG_SELECTELIST, param);
  return response.data;
});

export const selectAccess = createAsyncThunk('api/v1/accessLog/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(CMS_ACCESS_LOG_SELECT, param);

  return response.data;
});

export const AccessManagementSlice = createSlice({
  name: 'api/v1/accessLog',
  initialState: initialState as AccessListState,
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
      .addCase(getListAccess.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listAccess: (undefined === action.payload.data) ? null :  action.payload.data.listData,
          totalRecord: (undefined === action.payload.data) ? null :  action.payload.data.totalElement
        })
      })
      .addCase(getListAccess.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListAccess.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(selectAccess.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectAccess.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectAccess.pending, state => ({
        ...state,
        selectedSuccess: false
      }));
  }
});

export const { resetDept, changeData } = AccessManagementSlice.actions;

export default AccessManagementSlice.reducer;