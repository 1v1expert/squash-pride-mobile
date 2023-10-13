import * as yup from 'yup';

export const filterSchema = yup.object({
  level: yup.number(),
  password: yup.number(),
  shot: yup.string(),
});
