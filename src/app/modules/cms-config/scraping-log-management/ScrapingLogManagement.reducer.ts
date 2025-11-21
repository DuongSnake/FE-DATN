import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_SCAPING_SELECTELIST
} from '@/app/config/constant/api';

const initialState = {
  loading: false,
  selectedSuccess: false,
  actionChecking: false,
  listScraping: [],
  listAllScraping: [],
  data: {},
  validateError: [],
  totalRecord: 0
};

export type ScrapingListState = Readonly<typeof initialState>;

export const getListScraping = createAsyncThunk('api/v1/scrapingLog/selectList', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(CMS_SCAPING_SELECTELIST, param);
  return response.data;
});

export const ScrapingManagementSlice = createSlice({
  name: 'api/v1/scrapingLog',
  initialState: initialState as ScrapingListState,
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
      .addCase(getListScraping.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listScraping: (undefined === action.payload.data) ? null :  action.payload.data.listData,
          totalRecord: (undefined === action.payload.data) ? null :  action.payload.data.totalElement
        })
      })
      .addCase(getListScraping.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListScraping.pending, state => ({
        ...state,
        loading: true
      }));
  }
});

export const { resetDept, changeData } = ScrapingManagementSlice.actions;

export default ScrapingManagementSlice.reducer;