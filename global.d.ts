import 'i18next';
import {resources, defaultNamespace} from './i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNamespace;
    resources: (typeof resources)['en'];
  }
}
