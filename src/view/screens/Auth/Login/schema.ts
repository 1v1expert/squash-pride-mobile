import {t} from 'i18next';
import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string().required(t('public.loginScreen.loginRequiredError')),
  password: yup.string().required(t('public.loginScreen.passRequiredError')),
  rememberMe: yup.boolean(),
});
