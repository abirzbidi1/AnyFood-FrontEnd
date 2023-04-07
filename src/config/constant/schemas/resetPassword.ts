import * as Yup from 'yup';

export const validationSchema = Yup.object({
    password: Yup.string()
      .required('Password is required*')
      .min(8).matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required*')
  }).required();