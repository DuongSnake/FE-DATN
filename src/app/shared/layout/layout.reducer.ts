import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: null,
  collapsed: false,
};

export type LayoutState = Readonly<typeof initialState>;

export const LayoutSlice = createSlice({
  name: 'layout',
  initialState: initialState as LayoutState,
  reducers: {
    reset() {
      return initialState;
    },
    changeWidth(state, action) {
      return {
        ...state,
        width: action.payload,
      };
    },
    collapsed(state, action) {
      return {
        ...state,
        collapsed: action.payload,
      };
    },
  },
});

export const { reset, changeWidth, collapsed } = LayoutSlice.actions;

export default LayoutSlice.reducer;
