import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '../locales/en/common.json';
import esCommon from '../locales/es/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'hv_language'
    },
    resources: {
      en: { common: enCommon },
      es: { common: esCommon }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    defaultNS: 'common'
  });

export default i18n;
