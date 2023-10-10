import {t} from 'i18next';
import * as yup from 'yup';

export const loginSchema = yup.object({
  login: yup.string().required(t('public.loginScreen.loginRequiredError')),
  password: yup.string().required(t('public.loginScreen.passRequiredError')),
  checkbox: yup.boolean(),
});
