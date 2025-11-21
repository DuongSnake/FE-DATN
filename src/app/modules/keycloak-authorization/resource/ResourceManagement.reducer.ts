import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_KEYCLOAK_RESOURCE_INSERT,
  CMS_KEYCLOAK_RESOURCE_DELETE,
  CMS_KEYCLOAK_RESOURCE_SELECTELIST,
  CMS_KEYCLOAK_RESOURCE_SELECT,
  CMS_KEYCLOAK_RESOURCE_UPDATE
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    selectListByResourceIdSuccess: false,
    listResource: [],
    listAllResource: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListResource = createAsyncThunk('api/v1/keycloack/resource/selectList', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_RESOURCE_SELECTELIST, param);
    return response.data;
  });
  
  export const insertResource = createAsyncThunk('api/v1/keycloack/resource/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_RESOURCE_INSERT, param);
  
    return response.data;
  });
  
  export const deleteResource = createAsyncThunk('api/v1/keycloack/resource/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_KEYCLOAK_RESOURCE_DELETE, param);
  
    return response.data;
  });
  
  export const selectResource = createAsyncThunk('api/v1/keycloack/resource/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_RESOURCE_SELECT, param);
  
    return response.data;
  });
  
  export const updateResource = createAsyncThunk('api/v1/keycloack/resource/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_RESOURCE_UPDATE, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const ResourceManagementSlice = createSlice({
  name: 'api/v1/role',
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
      .addCase(getListResource.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listResource: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListResource.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListResource.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertResource.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertResource.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertResource.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteResource.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteResource.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteResource.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectResource.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectResource.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectResource.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateResource.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateResource.rejected, state => ({
        ...state,
        loadingUpdate: false
      }));
  }
}
)
export const { resetDept, changeData } = ResourceManagementSlice.actions;

export default ResourceManagementSlice.reducer;