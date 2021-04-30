import * as yup from 'yup';
import React, { useCallback } from 'react';

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
