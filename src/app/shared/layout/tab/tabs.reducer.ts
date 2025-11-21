import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  tabs: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      panelComponent: 'Dashboard',
    },
  ],
  tabActive: 'dashboard',
  tabIsEditing: false,
};

export type TabsState = Readonly<typeof initialState>;

export const TabsSlice = createSlice({
  name: 'tabs',
  initialState: initialState as TabsState,
  reducers: {
    reset() {
      return initialState;
    },
    addTab(state, action) {
      const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];
      const newArr = _.uniqBy(insert(state.tabs, 1, action.payload), 'id');

      return {
        ...state,
        tabs: newArr,
      };
    },
    removeTab(state, action) {
      const anotherTab = state.tabs.filter(item => item.id !== action.payload);

      return {
        ...state,
        tabs: [...anotherTab],
      };
    },
    changeTabActive(state, action) {
      return {
        ...state,
        tabActive: action.payload,
      };
    },
    sortAgainTab(state, action) {
      const tabsDep = state.tabs;
      const anotherArray = tabsDep.filter(item => item.id !== tabsDep[action.payload.index2].id);
      const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];
      const newArr = _.uniqBy(insert(anotherArray, 1, tabsDep[action.payload.index2]), 'id');

      return {
        ...state,
        tabs: newArr,
      };
    },
    updateTabIsEditing(state, action) {
      return {
        ...state,
        tabIsEditing: action.payload,
      };
    },
  },
});

export const { reset, addTab, removeTab, changeTabActive, updateTabIsEditing, sortAgainTab } = TabsSlice.actions;

export default TabsSlice.reducer;
