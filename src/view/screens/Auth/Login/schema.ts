import * as yup from 'yup';

export const loginSchema = yup.object({
  login: yup.string().required('Заполните, чтобы продолжить'),
  password: yup.string().required('Заполните, чтобы продолжить'),
  checkbox: yup.boolean(),
});
