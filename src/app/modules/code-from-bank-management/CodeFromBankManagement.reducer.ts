import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_CODE_FROM_BANK_INSERT,
  CMS_CODE_FROM_BANK_DELETE,
  CMS_CODE_FROM_BANK_SELECTELIST,
  CMS_CODE_FROM_BANK_SELECT,
  CMS_CODE_FROM_BANK_UPDATE
} from '@/app/config/constant/api';
import { RESPONSECD_VALID_INPUT } from '@/app/config/constant/constants';

const initialState = {
  loading: false,
  loadingUpdate: false,
  loadingAdd: false,
  loadingDelete: false,
  selectedSuccess: false,
  actionChecking: false,
  listCodeFromBank: [],
  listAllAction: [],
  data: {},
  validateError: [],
  totalRecord: 0
};

export type ActionListState = Readonly<typeof initialState>;

export const getListCodeFromBank = createAsyncThunk('api/v1/codeFromBank/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(CMS_CODE_FROM_BANK_SELECTELIST, param);
  return response.data;
});

export const insertCodeFromBank = createAsyncThunk('api/v1/codeFromBank/insert', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(CMS_CODE_FROM_BANK_INSERT, param);

  return response.data;
});

export const deleteCodeFromBank = createAsyncThunk('api/v1/codeFromBank/delete', async (param: IParamCommon) => {
  const response = await apiClient.post<any>(CMS_CODE_FROM_BANK_DELETE, param);

  return response.data;
});

export const selectCodeFromBank = createAsyncThunk('api/v1/codeFromBank/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(CMS_CODE_FROM_BANK_SELECT, param);

  return response.data;
});

export const updateCodeFromBank = createAsyncThunk('api/v1/codeFromBank/update', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(CMS_CODE_FROM_BANK_UPDATE, param);

  return response.data;
});

export const CodeFromBankManagementSlice = createSlice({
  name: 'api/v1/action',
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
      .addCase(getListCodeFromBank.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listCodeFromBank: (undefined === action.payload.data) ? null :  action.payload.data.listData,
          totalRecord: (undefined === action.payload.data) ? null :  action.payload.data.totalElement
        })
      })
      .addCase(getListCodeFromBank.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListCodeFromBank.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(insertCodeFromBank.fulfilled, (state, action) => {
        const errors = action.payload.responseCd === RESPONSECD_VALID_INPUT ? action.payload.errors : [];
        return {
          ...state,
          loadingAdd: false,
          validateError: errors
        };
      })
      .addCase(insertCodeFromBank.rejected, state => ({
        ...state,
        loadingAdd: false
      }))
      .addCase(insertCodeFromBank.pending, state => ({
        ...state,
        loadingAdd: true
      }))
      .addCase(deleteCodeFromBank.fulfilled, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteCodeFromBank.rejected, state => ({
        ...state,
        loadingDelete: false
      }))
      .addCase(deleteCodeFromBank.pending, state => ({
        ...state,
        loadingDelete: true
      }))
      .addCase(selectCodeFromBank.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectCodeFromBank.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectCodeFromBank.pending, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(updateCodeFromBank.fulfilled, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateCodeFromBank.rejected, state => ({
        ...state,
        loadingUpdate: false
      }))
      .addCase(updateCodeFromBank.pending, state => ({
        ...state,
        loadingUpdate: true
      }));
  }
});

export const { resetDept, changeData } = CodeFromBankManagementSlice.actions;

export default CodeFromBankManagementSlice.reducer;