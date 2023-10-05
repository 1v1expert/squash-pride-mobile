import * as yup from 'yup';

export const registrationSchema = yup.object({
  name: yup.string().required('Заполните, чтобы продолжить'),
  email: yup.string().required('Заполните, чтобы продолжить'),
  password: yup.string().required('Заполните, чтобы продолжить'),
  age: yup.string(),
  gender: yup.string(),
  country: yup.string(),
});
