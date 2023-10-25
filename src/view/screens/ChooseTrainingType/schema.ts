import * as yup from 'yup';

export const chooseTrainingTypeSchema = yup.object({
  group: yup.array<string[]>().required(),
});
