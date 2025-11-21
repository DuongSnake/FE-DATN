import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_ROLE_ACTION_INSERT,
  CMS_ROLE_ACTION_DELETE,
  CMS_ROLE_ACTION_SELECTELIST,
  CMS_ROLE_ACTION_SELECT,
  CMS_ROLE_ACTION_UPDATE
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    listRoleAction: [],
    listAllRoleAction: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListRoleAction = createAsyncThunk('api/v1/roleAction/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(CMS_ROLE_ACTION_SELECTELIST, param);
    return response.data;
  });
  
  export const insertRoleAction = createAsyncThunk('api/v1/roleAction/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_ROLE_ACTION_INSERT, param);
  
    return response.data;
  });
  
  export const deleteRoleAction = createAsyncThunk('api/v1/roleAction/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_ROLE_ACTION_DELETE, param);
  
    return response.data;
  });
  
  export const selectRoleAction = createAsyncThunk('api/v1/roleAction/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_ROLE_ACTION_SELECT, param);
  
    return response.data;
  });
  
  export const updateRoleAction = createAsyncThunk('api/v1/roleAction/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_ROLE_ACTION_UPDATE, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const RoleActionManagementSlice = createSlice({
  name: 'api/v1/roleAction',
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
      .addCase(getListRoleAction.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listRoleAction: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListRoleAction.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListRoleAction.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertRoleAction.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertRoleAction.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertRoleAction.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteRoleAction.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteRoleAction.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteRoleAction.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectRoleAction.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectRoleAction.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectRoleAction.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateRoleAction.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateRoleAction.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateRoleAction.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
}
)
export const { resetDept, changeData } = RoleActionManagementSlice.actions;

export default RoleActionManagementSlice.reducer;