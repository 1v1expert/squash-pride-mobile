import * as yup from 'yup';

export const itemEditSchema = yup.object({
  title: yup.string().required('public.loginScreen.requiredError'),
  description: yup.string().required('public.loginScreen.requiredError'),
});
