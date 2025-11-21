import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_CLIENT_GATEWAY_MAP_INSERT,
  API_CLIENT_GATEWAY_MAP_DELETE,
  API_CLIENT_GATEWAY_MAP_SELECTELIST,
  API_CLIENT_GATEWAY_MAP_SELECT,
  API_CLIENT_GATEWAY_MAP_UPDATE
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    listClientGatewayMap: [],
    listAllClientGatewayMap: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListClientGatewayMap = createAsyncThunk('api/v1/clientGwMap/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(API_CLIENT_GATEWAY_MAP_SELECTELIST, param);
    return response.data;
  });
  
  export const insertClientGatewayMap = createAsyncThunk('api/v1/clientGwMap/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_CLIENT_GATEWAY_MAP_INSERT, param);
  
    return response.data;
  });
  
  export const deleteClientGatewayMap = createAsyncThunk('api/v1/clientGwMap/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(API_CLIENT_GATEWAY_MAP_DELETE, param);
  
    return response.data;
  });
  
  export const selectClientGatewayMap = createAsyncThunk('api/v1/clientGwMap/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_CLIENT_GATEWAY_MAP_SELECT, param);
  
    return response.data;
  });
  
  export const updateClientGatewayMap = createAsyncThunk('api/v1/clientGwMap/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_CLIENT_GATEWAY_MAP_UPDATE, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const ClientGatewayMapManagementSlice = createSlice({
  name: 'api/v1/clientGwMap',
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
      .addCase(getListClientGatewayMap.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listClientGatewayMap: action.payload.data.listData
        })
      })
      .addCase(getListClientGatewayMap.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListClientGatewayMap.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertClientGatewayMap.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertClientGatewayMap.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertClientGatewayMap.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteClientGatewayMap.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteClientGatewayMap.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteClientGatewayMap.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectClientGatewayMap.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: action.payload.data
      }))
      .addCase(selectClientGatewayMap.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectClientGatewayMap.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateClientGatewayMap.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateClientGatewayMap.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateClientGatewayMap.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
}
)
export const { resetDept, changeData } = ClientGatewayMapManagementSlice.actions;

export default ClientGatewayMapManagementSlice.reducer;