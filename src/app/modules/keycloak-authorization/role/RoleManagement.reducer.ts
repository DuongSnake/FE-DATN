import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_KEYCLOAK_ROLE_INSERT,
  CMS_KEYCLOAK_ROLE_DELETE,
  CMS_KEYCLOAK_ROLE_SELECTELIST,
  CMS_KEYCLOAK_ROLE_SELECT,
  CMS_KEYCLOAK_ROLE_UPDATE,
  CMS_KEYCLOAK_ROLE_MAPPING,
  CMS_KEYCLOAK_ROLE_UN_MAPPING
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    loadingRoleMapping: false,
    loadingUnRoleMapping: false,
    listRole: [],
    listAllRole: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListRole = createAsyncThunk('api/v1/keycloack/role/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_ROLE_SELECTELIST, param);
    return response.data;
  });
  
  export const insertRole = createAsyncThunk('api/v1/keycloack/role/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_ROLE_INSERT, param);
  
    return response.data;
  });
  
  export const deleteRole = createAsyncThunk('api/v1/keycloack/role/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_KEYCLOAK_ROLE_DELETE, param);
  
    return response.data;
  });
  
  export const selectRole = createAsyncThunk('api/v1/keycloack/role/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_ROLE_SELECT, param);
  
    return response.data;
  });
  
  export const updateRole = createAsyncThunk('api/v1/keycloack/role/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_ROLE_UPDATE, param);
  
    return response.data;
  });
  
  export const roleMapping = createAsyncThunk('api/v1/keycloack/role/roleMapping', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_ROLE_MAPPING, param);
  
    return response.data;
  });
  
  export const unAssignRole = createAsyncThunk('api/v1/keycloack/role/unAssignRole', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_ROLE_UN_MAPPING, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const RoleManagementSlice = createSlice({
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
      .addCase(getListRole.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listRole: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListRole.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListRole.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertRole.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertRole.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertRole.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteRole.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteRole.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteRole.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectRole.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectRole.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectRole.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateRole.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateRole.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateRole.pending, state => ({
        ...state,
        loadingUpdate: true
      }))
      
      .addCase(roleMapping.fulfilled, state => ({
        ...state,
        loadingRoleMapping: false
      }))
      .addCase(roleMapping.rejected, state => ({
        ...state,
        loadingRoleMapping: false
      }))
      .addCase(roleMapping.pending, state => ({
        ...state,
        loadingRoleMapping: true
      }))

      .addCase(unAssignRole.fulfilled, state => ({
        ...state,
        loadingUnRoleMapping: false
      }))
      .addCase(unAssignRole.rejected, state => ({
        ...state,
        loadingUnRoleMapping: false
      }))
      .addCase(unAssignRole.pending, state => ({
        ...state,
        loadingUnRoleMapping: true
      }))
      ;
  }
}
)
export const { resetDept, changeData } = RoleManagementSlice.actions;

export default RoleManagementSlice.reducer;