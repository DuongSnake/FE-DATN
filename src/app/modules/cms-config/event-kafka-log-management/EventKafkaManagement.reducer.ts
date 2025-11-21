import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParamCommon, IResponseCommon, IParamCommonDuong } from '@/app/shared/model/common.model';
import { apiClient } from '@/app/config/interceptor/axios-interceptor';
import {
  CMS_EVENT_KAFKA_SELECTELIST,
  CMS_EVENT_KAFKA_SELECT,
  CMS_EVENT_KAFKA_RE_SEND_MESSAGE_FAIL
} from '@/app/config/constant/api';

const initialState = {
  loading: false,
  selectedSuccess: false,
  actionChecking: false,
  listEventKafka: [],
  listAllEventKafka: [],
  data: {},
  validateError: [],
  totalRecord: 0
};

export type EventKafkaListState = Readonly<typeof initialState>;

export const getListEventKafka = createAsyncThunk('api/v1/eventKafka/selectList2', async (param: IParamCommonDuong) => {
  const response = await apiClient.post<IResponseCommon>(CMS_EVENT_KAFKA_SELECTELIST, param);
  return response.data;
});

export const selectEventKafka = createAsyncThunk('api/v1/eventKafka/select', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(CMS_EVENT_KAFKA_SELECT, param);
  return response.data;
});

export const reSendMessageFail = createAsyncThunk('api/v1/eventKafka/reSendMessageFail', async (param: IParamCommon) => {
  const response = await apiClient.post<IResponseCommon>(CMS_EVENT_KAFKA_RE_SEND_MESSAGE_FAIL, param);
  return response.data;
});

export const EventKafkaManagementSlice = createSlice({
  name: 'api/v1/eventKafka',
  initialState: initialState as EventKafkaListState,
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
      .addCase(getListEventKafka.fulfilled, (state, action) => {
        return ({
          ...state,
          loading: false,
          listEventKafka: (undefined === action.payload.data) ? null :  action.payload.data.listData,
          totalRecord: (undefined === action.payload.data) ? null :  action.payload.data.totalElement
        })
      })
      .addCase(getListEventKafka.rejected, state => ({
        ...state,
        loading: false
      }))
      .addCase(getListEventKafka.pending, state => ({
        ...state,
        loading: true
      }))
      .addCase(selectEventKafka.fulfilled, (state, action) => ({
        ...state,
        selectedSuccess: true,
        data: (undefined === action.payload.data) ? null :  action.payload.data
      }))
      .addCase(selectEventKafka.rejected, state => ({
        ...state,
        selectedSuccess: false
      }))
      .addCase(selectEventKafka.pending, state => ({
        ...state,
        selectedSuccess: false
      }));
  }
});

export const { resetDept, changeData } = EventKafkaManagementSlice.actions;

export default EventKafkaManagementSlice.reducer;