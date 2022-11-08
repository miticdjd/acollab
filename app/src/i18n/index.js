import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './translations/en.json';

const resources = {
  en: {
    translation: enTranslation,
  }
};

const currentTranslation = () =>
  localStorage.getItem('translation')
    ? localStorage.getItem('translation')
    : localStorage.setItem('translation', 'en');

i18n.use(initReactI18next).init({
  resources,
  lng: currentTranslation(),
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;