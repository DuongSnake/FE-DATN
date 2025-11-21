import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_KEYCLOAK_PERMISSION_INSERT,
  CMS_KEYCLOAK_PERMISSION_DELETE,
  CMS_KEYCLOAK_PERMISSION_SELECTELIST,
  CMS_KEYCLOAK_PERMISSION_SELECT,
  CMS_KEYCLOAK_PERMISSION_UPDATE,
  CMS_KEYCLOAK_PERMISSION_FIND_RESOURCE,
  CMS_KEYCLOAK_PERMISSION_FIND_POLICY
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    listPermission: [],
    listAllPermission: [],
    listResourceByPermissionId: [],
    listPoliciesByPermissionId: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListPermission = createAsyncThunk('api/v1/keycloack/permission/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_PERMISSION_SELECTELIST, param);
    return response.data;
  });
  
  export const insertPermission = createAsyncThunk('api/v1/keycloack/permission/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_PERMISSION_INSERT, param);
  
    return response.data;
  });
  
  export const deletePermission = createAsyncThunk('api/v1/keycloack/permission/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_KEYCLOAK_PERMISSION_DELETE, param);
  
    return response.data;
  });
  
  export const selectPermission = createAsyncThunk('api/v1/keycloack/permission/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_PERMISSION_SELECT, param);
  
    return response.data;
  });
  
  export const updatePermission = createAsyncThunk('api/v1/keycloack/permission/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_PERMISSION_UPDATE, param);
    return response.data;
  });
  
  export const findResourceByPermissionId = createAsyncThunk('api/v1/keycloack/permission/findResourceByPermissionId', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_PERMISSION_FIND_RESOURCE, param);
    return response.data;
  });
  
  export const findAssociatedPolicies = createAsyncThunk('api/v1/keycloack/permission/findAssociatedPolicies', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_PERMISSION_FIND_POLICY, param);
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const PermissionManagementSlice = createSlice({
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
      .addCase(getListPermission.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listPermission: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListPermission.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListPermission.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertPermission.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertPermission.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertPermission.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deletePermission.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deletePermission.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deletePermission.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectPermission.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectPermission.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectPermission.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updatePermission.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updatePermission.rejected, state => ({
        ...state,
        loadingUpdate: false
      }));
  }
}
)
export const { resetDept, changeData } = PermissionManagementSlice.actions;

export default PermissionManagementSlice.reducer;