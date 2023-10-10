import {useTranslation} from 'react-i18next';
import {defaultNamespace} from '../../../i18n';

// type KeyPrefixType = 'public' | 'private';

export const useCustomTranslation = () => {
  return useTranslation(defaultNamespace);
};
