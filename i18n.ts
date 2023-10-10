import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// langs
import en from './src/languages/en';
// utils
import {languageDetectorPlugin} from './src/utils/languageDetectorPlugin';

export const defaultLanguage = 'en';

export const defaultNamespace = 'translation';

export const resources = {
  en: {
    [defaultNamespace]: en,
  },
};
i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: 'v3',
    defaultNS: defaultNamespace,
    ns: [defaultNamespace],
    resources,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
export default i18n;
