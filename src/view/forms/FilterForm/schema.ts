import * as yup from 'yup';

export const filterSchemaWithGroup = yup.object().shape({
  players: yup.number().required(),
  // level: yup.mixed<'amateur' | 'professional'>().required(),
  level: yup.mixed<'amateur' | 'professional'>(),
  group: yup.array().min(1),
});

export const filterSchema = yup.object({
  players: yup.number(),
  level: yup.mixed<'amateur' | 'professional'>(),
  // group: yup.array(),
});
