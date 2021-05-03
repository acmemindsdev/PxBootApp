import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  mobileNumber: yup.string().required(),
  dateOfBirth: yup.string().required(),
  email: yup.string().required().email('This email is invalid'),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .test('confirmPassword', 'Passwords do not match', function (val) {
      return val === this.parent.password;
    }),
});

export const resetPasswordSchema = yup.object().shape({
  code: yup.string().required(),
  new_password: yup.string().required(),
  confirm_password: yup
    .string()
    .required()
    .test('confirm_password', 'Passwords do not match', function (val) {
      return val === this.parent.new_password;
    }),
});
