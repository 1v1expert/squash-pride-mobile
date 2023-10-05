import * as yup from 'yup';

export const optionsSchema = yup.object({
  peopleCount: yup.string().required(),
  level: yup.string(),
});
