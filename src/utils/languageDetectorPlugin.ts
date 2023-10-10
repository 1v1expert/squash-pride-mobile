import AsyncStorage from '@react-native-async-storage/async-storage';
import {LanguageDetectorModule} from 'i18next';
import {NativeModules, Platform} from 'react-native';
import {defaultLanguage} from '../../i18n';

export const STORE_LANGUAGE_KEY = 'settings.lang';
export const languageDetectorPlugin: LanguageDetectorModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
        const supportedLanguages = ['en', 'ru'];
        const locale =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager?.settings?.AppleLocale ||
              NativeModules.SettingsManager?.settings?.AppleLanguages[0] ||
              ''
            : NativeModules.I18nManager?.localeIdentifier || '';

        const [lowerCaseLocale] = locale.split('_');

        if (language) {
          return callback(language);
        } else {
          return supportedLanguages.includes(lowerCaseLocale)
            ? callback(lowerCaseLocale)
            : callback(defaultLanguage);
        }
      });
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};
