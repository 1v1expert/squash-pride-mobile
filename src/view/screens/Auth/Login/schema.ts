import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .email('Please enter a valid email address')
    .required('public.loginScreen.requiredError'),
  password: yup.string().required('public.loginScreen.requiredError'),
  rememberMe: yup.boolean(),
});
