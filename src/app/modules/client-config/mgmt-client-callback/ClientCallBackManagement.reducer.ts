import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_CLIENT_CALLBACK_INSERT,
  API_CLIENT_CALLBACK_DELETE,
  API_CLIENT_CALLBACK_SELECTELIST,
  API_CLIENT_CALLBACK_SELECT,
  API_CLIENT_CALLBACK_UPDATE
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    listClientCallBackManagement: [],
    listAllClientCallBackManagement: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListClientCallBackManagement = createAsyncThunk('api/v1/mgmtClientCallback/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(API_CLIENT_CALLBACK_SELECTELIST, param);
    return response.data;
  });
  
  export const insertClientCallBackManagement = createAsyncThunk('api/v1/mgmtClientCallback/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_CLIENT_CALLBACK_INSERT, param);
  
    return response.data;
  });
  
  export const deleteClientCallBackManagement = createAsyncThunk('api/v1/mgmtClientCallback/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(API_CLIENT_CALLBACK_DELETE, param);
  
    return response.data;
  });
  
  export const selectClientCallBackManagement = createAsyncThunk('api/v1/mgmtClientCallback/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_CLIENT_CALLBACK_SELECT, param);
  
    return response.data;
  });
  
  export const updateClientCallBackManagement = createAsyncThunk('api/v1/mgmtClientCallback/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_CLIENT_CALLBACK_UPDATE, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const ClientCallBackManagementSlice = createSlice({
  name: 'api/v1/mgmtClientCallback',
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
      .addCase(getListClientCallBackManagement.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listClientCallBackManagement: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListClientCallBackManagement.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListClientCallBackManagement.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertClientCallBackManagement.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertClientCallBackManagement.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertClientCallBackManagement.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteClientCallBackManagement.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteClientCallBackManagement.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteClientCallBackManagement.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectClientCallBackManagement.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectClientCallBackManagement.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectClientCallBackManagement.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateClientCallBackManagement.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateClientCallBackManagement.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateClientCallBackManagement.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
}
)
export const { resetDept, changeData } = ClientCallBackManagementSlice.actions;

export default ClientCallBackManagementSlice.reducer;