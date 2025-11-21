import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_MENU_INSERT,
  CMS_MENU_DELETE,
  CMS_MENU_SELECTELIST,
  CMS_MENU_SELECT,
  CMS_MENU_UPDATE
} from '@/app/config/constant/api';

const initialState = {
    loading: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    selectedSuccess: false,
    actionChecking: false,
    listMenu: [],
    listAllMenu: [],
    data: {},
    validateError: []
  };
  
  export type ActionListState = Readonly<typeof initialState>;
  
  export const getListMenu = createAsyncThunk('api/v1/menu/selectList', async (param: IParamCommonDuong) => {
    const response = await apiClient.post<IResponseCommon>(CMS_MENU_SELECTELIST, param);
    return response.data;
  });
  
  export const insertMenu = createAsyncThunk('api/v1/menu/insert', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_MENU_INSERT, param);
  
    return response.data;
  });
  
  export const deleteMenu = createAsyncThunk('api/v1/menu/delete', async (param: IParamCommon) => {
    const response = await apiClient.post<any>(CMS_MENU_DELETE, param);
  
    return response.data;
  });
  
  export const selectMenu = createAsyncThunk('api/v1/menu/select', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_MENU_SELECT, param);
  
    return response.data;
  });
  
  export const updateMenu = createAsyncThunk('api/v1/menu/update', async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(CMS_MENU_UPDATE, param);
  
    return response.data;
  });
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';
export const MenuManagementSlice = createSlice({
  name: 'api/v1/menu',
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
      .addCase(getListMenu.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listMenu: (undefined === action.payload.data) ? null :  action.payload.data.listData
        })
      })
      .addCase(getListMenu.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListMenu.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertMenu.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertMenu.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertMenu.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteMenu.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteMenu.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteMenu.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectMenu.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectMenu.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectMenu.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateMenu.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateMenu.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateMenu.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
}
)
export const { resetDept, changeData } = MenuManagementSlice.actions;

export default MenuManagementSlice.reducer;