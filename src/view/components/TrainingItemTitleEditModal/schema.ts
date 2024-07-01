import * as yup from 'yup';

export const itemEditSchema = yup.object({
  name: yup.string(),
});
