import { createSlice } from '@reduxjs/toolkit';
import { LOCALE } from '../../config/constant/constants';
import { AppThunk } from '../../config/redux/store';
import axios from 'axios';
import dayjs from 'dayjs';
import { Storage, TranslatorContext } from 'react-jhipster';

const initialState = {
  currentLocale: '',
};

export type LocaleState = Readonly<typeof initialState>;

export const setLocale: (locale: string) => AppThunk = locale => async dispatch => {
  if (!Object.keys(TranslatorContext.context.translations).includes(locale)) {
    Storage.local.set(LOCALE, locale);
    const response = await axios.get(`i18n/${locale}.json?buildTimestamp=${process.env.BUILD_TIMESTAMP}`, { baseURL: '' });
    TranslatorContext.registerTranslations(locale, response.data);
  }

  dispatch(updateLocale(locale));
};

export const LocaleSlice = createSlice({
  name: 'locale',
  initialState: initialState as LocaleState,
  reducers: {
    updateLocale(state, action) {
      const currentLocale = action.payload;

      if (state.currentLocale !== currentLocale) {
        dayjs.locale(currentLocale);
        TranslatorContext.setLocale(currentLocale);
      }

      state.currentLocale = currentLocale;
    },
  },
});

export const { updateLocale } = LocaleSlice.actions;
export default LocaleSlice.reducer;
