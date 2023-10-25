import * as yup from 'yup';

export const optionsSchema = yup.object({
  players: yup.number().required(),
  level: yup.mixed<'amateur' | 'professional'>().required(),
});
