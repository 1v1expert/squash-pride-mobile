import {t} from 'i18next';
import * as yup from 'yup';

export const registrationSchema = yup.object({
  name: yup.string().required(t('public.registrationScreen.nameRequiredError')),
  email: yup
    .string()
    .required(t('public.registrationScreen.emailRequiredError')),
  password: yup
    .string()
    .required(t('public.registrationScreen.passRequiredError')),
  age: yup.string(),
  gender: yup.string(),
  country: yup.string(),
});
