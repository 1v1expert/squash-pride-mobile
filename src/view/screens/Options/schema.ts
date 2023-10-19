import * as yup from 'yup';

export const optionsSchema = yup.object({
  people: yup.number().required(),
  level: yup.mixed<'amateur' | 'professional'>().required(),
});
