import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  API_GATEWAY_API_INSERT,
  API_GATEWAY_API_DELETE,
  API_GATEWAY_API_SELECTELIST,
  API_GATEWAY_API_SELECT,
  API_GATEWAY_API_UPDATE
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    listGatewayApi: [],
    listAllGatewayApi: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListGatewayApi = createAsyncThunk('api/v1/gatewayApi/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(API_GATEWAY_API_SELECTELIST, param);
    return response.data;
  });
  
  export const insertGatewayApi = createAsyncThunk('api/v1/gatewayApi/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_GATEWAY_API_INSERT, param);
  
    return response.data;
  });
  
  export const deleteGatewayApi = createAsyncThunk('api/v1/gatewayApi/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(API_GATEWAY_API_DELETE, param);
  
    return response.data;
  });
  
  export const selectGatewayApi = createAsyncThunk('api/v1/gatewayApi/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_GATEWAY_API_SELECT, param);
  
    return response.data;
  });
  
  export const updateGatewayApi = createAsyncThunk('api/v1/gatewayApi/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_GATEWAY_API_UPDATE, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const GatewayApiManagementSlice = createSlice({
  name: 'api/v1/gatewayApi',
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
      .addCase(getListGatewayApi.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listGatewayApi: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListGatewayApi.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListGatewayApi.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertGatewayApi.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertGatewayApi.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertGatewayApi.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteGatewayApi.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteGatewayApi.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteGatewayApi.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectGatewayApi.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectGatewayApi.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectGatewayApi.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateGatewayApi.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateGatewayApi.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateGatewayApi.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
}
)
export const { resetDept, changeData } = GatewayApiManagementSlice.actions;

export default GatewayApiManagementSlice.reducer;