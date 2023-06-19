import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  availability_status: yup.boolean().required(),
  bakery_id: yup.string().nullable(),
});
