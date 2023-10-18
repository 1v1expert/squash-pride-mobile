import {t} from 'i18next';
import * as yup from 'yup';

export const registrationSchema = yup.object({
  firstName: yup
    .string()
    .required(t('public.registrationScreen.requiredError')),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required(t('public.registrationScreen.requiredError')),
  password: yup.string().required(t('public.registrationScreen.requiredError')),
  age: yup.number().required(t('public.registrationScreen.requiredError')),
  gender: yup.number().required(t('public.registrationScreen.requiredError')),
  country: yup.string().required(t('public.registrationScreen.requiredError')),
});
