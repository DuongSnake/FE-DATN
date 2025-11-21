import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_MENU_GROUP_INSERT,
  CMS_MENU_GROUP_DELETE,
  CMS_MENU_GROUP_SELECTELIST,
  CMS_MENU_GROUP_SELECT,
  CMS_MENU_GROUP_UPDATE
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    listMenuGroup: [],
    listAllMenuGroup: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListMenuGroup = createAsyncThunk('api/v1/menuGroup/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(CMS_MENU_GROUP_SELECTELIST, param);
    return response.data;
  });
  
  export const insertMenuGroup = createAsyncThunk('api/v1/menuGroup/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_MENU_GROUP_INSERT, param);
  
    return response.data;
  });
  
  export const deleteMenuGroup = createAsyncThunk('api/v1/menuGroup/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_MENU_GROUP_DELETE, param);
  
    return response.data;
  });
  
  export const selectMenuGroup = createAsyncThunk('api/v1/menuGroup/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_MENU_GROUP_SELECT, param);
  
    return response.data;
  });
  
  export const updateMenuGroup = createAsyncThunk('api/v1/menuGroup/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_MENU_GROUP_UPDATE, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const MenuGroupManagementSlice = createSlice({
  name: 'api/v1/menuGroup',
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
      .addCase(getListMenuGroup.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listMenuGroup: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListMenuGroup.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListMenuGroup.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertMenuGroup.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertMenuGroup.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertMenuGroup.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteMenuGroup.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteMenuGroup.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteMenuGroup.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectMenuGroup.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectMenuGroup.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectMenuGroup.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateMenuGroup.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateMenuGroup.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateMenuGroup.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
}
)
export const { resetDept, changeData } = MenuGroupManagementSlice.actions;

export default MenuGroupManagementSlice.reducer;