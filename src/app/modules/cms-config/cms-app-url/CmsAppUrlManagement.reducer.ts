import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_APP_URL_INSERT,
  CMS_APP_URL_DELETE,
  API_CMS_APP_URL_SELECTELIST,
  CMS_APP_URL_SELECT,
  CMS_APP_URL_UPDATE
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    listCmsAppUrl: [],
    listAllCmsAppUrl: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListCmsAppUrl = createAsyncThunk('api/v1/cmsAppUrl/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(API_CMS_APP_URL_SELECTELIST, param);
    return response.data;
  });
  
  export const insertCmsAppUrl = createAsyncThunk('api/v1/cmsAppUrl/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_APP_URL_INSERT, param);
  
    return response.data;
  });
  
  export const deleteCmsAppUrl = createAsyncThunk('api/v1/cmsAppUrl/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_APP_URL_DELETE, param);
  
    return response.data;
  });
  
  export const selectCmsAppUrl = createAsyncThunk('api/v1/cmsAppUrl/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_APP_URL_SELECT, param);
  
    return response.data;
  });
  
  export const updateCmsAppUrl = createAsyncThunk('api/v1/cmsAppUrl/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_APP_URL_UPDATE, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const CmsAppUrlManagementSlice = createSlice({
  name: 'api/v1/cmsAppUrl',
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
      .addCase(getListCmsAppUrl.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listCmsAppUrl: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListCmsAppUrl.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListCmsAppUrl.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertCmsAppUrl.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertCmsAppUrl.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertCmsAppUrl.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteCmsAppUrl.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteCmsAppUrl.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteCmsAppUrl.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectCmsAppUrl.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectCmsAppUrl.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectCmsAppUrl.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateCmsAppUrl.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateCmsAppUrl.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateCmsAppUrl.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
}
)
export const { resetDept, changeData } = CmsAppUrlManagementSlice.actions;

export default CmsAppUrlManagementSlice.reducer;