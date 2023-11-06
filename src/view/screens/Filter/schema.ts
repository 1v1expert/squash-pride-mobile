import * as yup from 'yup';

export const filterSchemaWithGroup = yup.object().shape({
  players: yup.number().required(),
  level: yup.mixed<'amateur' | 'professional'>().required(),
  group: yup.array().min(1).required(),
});
