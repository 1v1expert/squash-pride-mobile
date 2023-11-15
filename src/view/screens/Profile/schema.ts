import * as yup from 'yup';

export const profileSchema = yup.object({
  firstName: yup.string().required('public.registrationScreen.requiredError'),
  username: yup.string().required('public.registrationScreen.requiredError'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('public.registrationScreen.requiredError'),
  // password: yup.string().required('public.registrationScreen.requiredError'),
  age: yup.number().required('public.registrationScreen.requiredError'),
  gender: yup.string().required('public.registrationScreen.requiredError'),
  country: yup.string().required('public.registrationScreen.requiredError'),
});
