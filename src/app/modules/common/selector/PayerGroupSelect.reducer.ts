import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import { serializeAxiosError } from '@/app/shared/reducers/reducer.utils';
import { IParamCommon, IResponseCommon } from '@/app/shared/model/common.model';
import { API_GET_LIST_GROUP } from '@/app/config/constant/api';

const initState = {
  loading: true,
  loadingUpdate: false,
  dataPayerGroup: []
};
export type DataPayerGroup = Readonly<typeof initState>;

export const getDataPayerGroup = createAsyncThunk(
  'Payer/DataPayerGroup',
  async (param: IParamCommon) => {
    const response = await apiClient.post<IResponseCommon>(API_GET_LIST_GROUP, param);
    return response.data;
  },
  { serializeError: serializeAxiosError }
);

export const DataPayerGroupSlice = createSlice({
  name: 'DataPayerGroupSlice',
  initialState: initState as DataPayerGroup,
  reducers: {
    reset() {
      return initState;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getDataPayerGroup.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        dataPayerGroup: action.payload.list
      }))
      .addCase(getDataPayerGroup.rejected, state => ({
        ...state,
        loading: false,
        dataPayerGroup: []
      }));
  }
});
export default DataPayerGroupSlice.reducer;
