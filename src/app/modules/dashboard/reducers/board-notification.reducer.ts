import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import { IResponseCommon } from '@/app/shared/model/common.model';
import { IPramUser } from '@/app/shared/model/setting.model';
import { serializeAxiosError } from '@/app/shared/reducers/reducer.utils';

export const initialState = {
  loading: false,
  notificationList: []
};

export type ComponentState = Readonly<typeof initialState>;

export const searchDataThunk = createAsyncThunk(
  'Z000/getNoticelist',
  async (param: IPramUser) => {
    // const response = await apiClient.post<IResponseCommon>(API_Z000_SELECTENOTICELIST, param);
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
      .addCase(searchDataThunk.rejected, (state, action) => ({
        ...state,
        loading: false,
        notificationList: []
      }))
      .addCase(searchDataThunk.pending, state => ({
        ...state,
        loading: true
      }));
  }
});

export const { reset } = BoardNotificationSlice.actions;

export default BoardNotificationSlice.reducer;
