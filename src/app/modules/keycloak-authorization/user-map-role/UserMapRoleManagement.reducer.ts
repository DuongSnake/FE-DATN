import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_KEYCLOAK_USER_INSERT,
  CMS_KEYCLOAK_USER_DELETE,
  CMS_KEYCLOAK_USER_SELECTELIST,
  CMS_KEYCLOAK_USER_SELECT,
  CMS_KEYCLOAK_USER_UPDATE,
  CMS_KEYCLOAK_USER_BY_USER_ID
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    selectListByUserMapRoleIdSuccess: false,
    listUserMapRole: [],
    listAllUserMapRole: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListUserMapRole = createAsyncThunk('api/v1/keycloack/user/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_SELECTELIST, param);
    return response.data;
  });
  
  export const insertUserMapRole = createAsyncThunk('api/v1/keycloack/user/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_INSERT, param);
  
    return response.data;
  });
  
  export const deleteUserMapRole = createAsyncThunk('api/v1/keycloack/user/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_KEYCLOAK_USER_DELETE, param);
  
    return response.data;
  });
  
  export const selectUserMapRole = createAsyncThunk('api/v1/keycloack/user/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_SELECT, param);
  
    return response.data;
  });
  
  export const updateUserMapRole = createAsyncThunk('api/v1/keycloack/user/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_UPDATE, param);
  
    return response.data;
  });
  
  export const selectListByUserMapRoleId = createAsyncThunk('api/v1/keycloack/role/selectListByUserMapRoleId', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_BY_USER_ID, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const UserMapRoleManagementSlice = createSlice({
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
      .addCase(getListUserMapRole.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listUserMapRole: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListUserMapRole.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListUserMapRole.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertUserMapRole.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertUserMapRole.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertUserMapRole.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteUserMapRole.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteUserMapRole.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteUserMapRole.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectUserMapRole.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectUserMapRole.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectUserMapRole.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateUserMapRole.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateUserMapRole.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))


      .addCase(selectListByUserMapRoleId.fulfilled, (state, action) => ({
        ...state,
        selectListByUserMapRoleIdSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectListByUserMapRoleId.rejected, state => ({
        ...state,
        selectListByUserMapRoleIdSuccess: false
      }))
      .addCase(selectListByUserMapRoleId.pending, state => ({
        ...state,
        selectListByUserMapRoleIdSuccess: false
      }));
  }
}
)
export const { resetDept, changeData } = UserMapRoleManagementSlice.actions;

export default UserMapRoleManagementSlice.reducer;