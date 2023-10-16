import * as yup from 'yup';

export const filterSchema = yup.object({
  level: yup.number(),
  people: yup.number(),
  shot: yup.array(),
});
