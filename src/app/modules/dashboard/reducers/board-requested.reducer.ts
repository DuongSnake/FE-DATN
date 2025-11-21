import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import { IResponseCommon } from '@/app/shared/model/common.model';
import { IPramUser } from '@/app/shared/model/setting.model';
import { serializeAxiosError } from '@/app/shared/reducers/reducer.utils';

export const initialState = {
  loadingMyRequest: false,
  loadingRequestApprove: false,
  myRequestList: [],
  requsetListApprove: []
};

export type ComponentState = Readonly<typeof initialState>;

export const searchDataMyreqThunk = createAsyncThunk(
  'Z000/getMyRequest',
  async (param: IPramUser) => {
    // const response = await apiClient.post<IResponseCommon>(API_Z000_SELECT_MYREQ, param);
    return null;
  },
  { serializeError: serializeAxiosError }
);

export const searchDataReqApproveThunk = createAsyncThunk(
  'Z000/getRequestApprove',
  async (param: IPramUser) => {
    // const response = await apiClient.post<IResponseCommon>(API_Z000_SELECT_REQAPPROVE, param);
    return null;
  },
  { serializeError: serializeAxiosError }
);

export const BoardNotificationSlice = createSlice({
  name: 'Z000',
  initialState: initialState as ComponentState,
  reducers: {
    reset() {
      return initialState;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(searchDataMyreqThunk.rejected, (state, action) => ({
        ...state,
        loading: false,
        myRequestList: []
      }))
      .addCase(searchDataMyreqThunk.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(searchDataReqApproveThunk.rejected, (state, action) => ({
        ...state,
        loading: false,
        requsetListApprove: []
      }))
      .addCase(searchDataReqApproveThunk.pending, state => ({
        ...state,
        loading: true
      }));
  }
});

export const { reset } = BoardNotificationSlice.actions;

export default BoardNotificationSlice.reducer;
