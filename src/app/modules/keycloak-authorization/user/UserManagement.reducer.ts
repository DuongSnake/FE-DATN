import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_KEYCLOAK_USER_INSERT,
  CMS_KEYCLOAK_USER_DELETE,
  CMS_KEYCLOAK_USER_SELECTELIST,
  CMS_KEYCLOAK_USER_SELECT,
  CMS_KEYCLOAK_USER_UPDATE,
  CMS_KEYCLOAK_USER_BY_USER_ID,
  CMS_KEYCLOAK_USER_RESET_PASSWORD
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    selectListByUserIdSuccess: false,
    listUser: [],
    listAllUser: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListUser = createAsyncThunk('api/v1/keycloack/user/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_SELECTELIST, param);
    return response.data;
  });
  
  export const insertUser = createAsyncThunk('api/v1/keycloack/user/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_INSERT, param);
  
    return response.data;
  });
  
  export const deleteUser = createAsyncThunk('api/v1/keycloack/user/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_KEYCLOAK_USER_DELETE, param);
  
    return response.data;
  });
  
  export const selectUser = createAsyncThunk('api/v1/keycloack/user/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_SELECT, param);
  
    return response.data;
  });
  
  export const updateUser = createAsyncThunk('api/v1/keycloack/user/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_UPDATE, param);
  
    return response.data;
  });
  
  export const selectListByUserId = createAsyncThunk('api/v1/keycloack/role/selectListByUserId', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_BY_USER_ID, param);
  
    return response.data;
  });
  
  export const resetPassword = createAsyncThunk('api/v1/keycloack/user/resetPassword', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_USER_RESET_PASSWORD, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const UserManagementSlice = createSlice({
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
      .addCase(getListUser.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listUser: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListUser.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListUser.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertUser.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertUser.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertUser.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteUser.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteUser.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteUser.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectUser.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectUser.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectUser.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateUser.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateUser.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(selectListByUserId.fulfilled, (state, action) => ({
        ...state,
        selectListByUserIdSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectListByUserId.rejected, state => ({
        ...state,
        selectListByUserIdSuccess: false
      }))
      .addCase(selectListByUserId.pending, state => ({
        ...state,
        selectListByUserIdSuccess: false
      }));
  }
}
)
export const { resetDept, changeData } = UserManagementSlice.actions;

export default UserManagementSlice.reducer;