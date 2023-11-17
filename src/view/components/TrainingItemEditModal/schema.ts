import * as yup from 'yup';

export const itemEditSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
});
