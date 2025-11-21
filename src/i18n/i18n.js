import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ENGLISH_TRANSLATIONS } from './en';
import { VIETNAMESE_TRANSLATIONS } from './vi';
import { Storage } from '@/app/shared/helpers/cms-helper';
import { DEFAULT_LOCALE, LOCALE } from '@/app/config/constant/constants';

const language = Storage.local.get(LOCALE);
if (!language) {
  Storage.local.set(LOCALE, DEFAULT_LOCALE);
}
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: ENGLISH_TRANSLATIONS,
  },
  vi: {
    translation: VIETNAMESE_TRANSLATIONS,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Storage.local.get(LOCALE), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
