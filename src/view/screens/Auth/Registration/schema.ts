import {t} from 'i18next';
import * as yup from 'yup';

export const registrationSchema = yup.object({
  firstName: yup
    .string()
    .required(t('public.registrationScreen.nameRequiredError')),
  lastName: yup
    .string()
    .required(t('public.registrationScreen.nameRequiredError')),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required(t('public.registrationScreen.emailRequiredError')),
  password: yup
    .string()
    .required(t('public.registrationScreen.passRequiredError')),
  passwordConfirmation: yup
    .string()
    .required(t('public.registrationScreen.passRequiredError'))
    .oneOf([yup.ref('password')], 'Passwords must match'),
  age: yup.string(),
  gender: yup.string(),
  country: yup.string(),
});
