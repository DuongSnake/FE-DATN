import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_CLIENT_GATEWAY_INSERT,
  API_CLIENT_GATEWAY_DELETE,
  API_CLIENT_GATEWAY_SELECTELIST,
  API_CLIENT_GATEWAY_SELECT,
  API_CLIENT_GATEWAY_UPDATE
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  actionChecking: false,
  listClientGateway: [],
  listAllClientGateway: [],
  data: {},
  validateError: []
};

export type ActionListState = Readonly<typeof initialState>;

export const getListClientGateway = createAsyncThunk('api/v1/clientGw/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(API_CLIENT_GATEWAY_SELECTELIST, param);
  return response.data;
});

export const insertClientGateway = createAsyncThunk('api/v1/clientGw/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_CLIENT_GATEWAY_INSERT, param);

  return response.data;
});

export const deleteClientGateway = createAsyncThunk('api/v1/clientGw/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(API_CLIENT_GATEWAY_DELETE, param);

  return response.data;
});

export const selectClientGateway = createAsyncThunk('api/v1/clientGw/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_CLIENT_GATEWAY_SELECT, param);

  return response.data;
});

export const updateClientGateway = createAsyncThunk('api/v1/clientGw/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(API_CLIENT_GATEWAY_UPDATE, param);

  return response.data;
});

export const generateClientKey = createAsyncThunk('api/v1/clientGwMap/generate-client-key', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>('api/v1/clientGwMap/generate-client-key', param);

  return response.data;
});

export const ClientGatewayManagementSlice = createSlice({
  name: 'api/v1/clientGw',
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
      .addCase(getListClientGateway.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listClientGateway: action.payload.data.listData
        })
      })
      .addCase(getListClientGateway.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListClientGateway.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertClientGateway.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertClientGateway.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertClientGateway.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteClientGateway.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteClientGateway.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteClientGateway.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectClientGateway.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: action.payload.data
      }))
      .addCase(selectClientGateway.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectClientGateway.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateClientGateway.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateClientGateway.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateClientGateway.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
});

export const { resetDept, changeData } = ClientGatewayManagementSlice.actions;

export default ClientGatewayManagementSlice.reducer;