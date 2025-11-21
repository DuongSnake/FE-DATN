import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_KEYCLOAK_POLICY_INSERT,
  CMS_KEYCLOAK_POLICY_DELETE,
  CMS_KEYCLOAK_POLICY_SELECTELIST,
  CMS_KEYCLOAK_POLICY_SELECT,
  CMS_KEYCLOAK_POLICY_UPDATE
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    selectListByPolicyIdSuccess: false,
    listPolicy: [],
    listAllPolicy: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListPolicy = createAsyncThunk('api/v1/keycloack/policy/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_POLICY_SELECTELIST, param);
    return response.data;
  });
  
  export const insertPolicy = createAsyncThunk('api/v1/keycloack/policy/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_POLICY_INSERT, param);
  
    return response.data;
  });
  
  export const deletePolicy = createAsyncThunk('api/v1/keycloack/policy/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_KEYCLOAK_POLICY_DELETE, param);
  
    return response.data;
  });
  
  export const selectPolicy = createAsyncThunk('api/v1/keycloack/policy/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_POLICY_SELECT, param);
  
    return response.data;
  });
  
  export const updatePolicy = createAsyncThunk('api/v1/keycloack/policy/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_KEYCLOAK_POLICY_UPDATE, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const PolicyManagementSlice = createSlice({
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
      .addCase(getListPolicy.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listPolicy: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListPolicy.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListPolicy.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertPolicy.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertPolicy.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertPolicy.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deletePolicy.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deletePolicy.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deletePolicy.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectPolicy.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectPolicy.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectPolicy.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updatePolicy.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updatePolicy.rejected, state => ({
        ...state,
        loadingUpdate: false
      }));
  }
}
)
export const { resetDept, changeData } = PolicyManagementSlice.actions;

export default PolicyManagementSlice.reducer;