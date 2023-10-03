import {useTranslation} from 'react-i18next';
import {defaultNamespace} from '../../../i18n';

export const useCustomTranslation = (keyPrefix: 'public' | 'private') => {
  return useTranslation(defaultNamespace, {keyPrefix: keyPrefix});
};
