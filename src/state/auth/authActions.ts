export const SELECTED_COUNTRY = 'SELECTED_COUNTRY';
export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const HANDLE_LOGIN_SUCCESS = 'HANDLE_LOGIN_SUCCESS';
export const HANDLE_LOGIN_ERROR = 'HANDLE_LOGIN_ERROR';
export const SOCIAL_LOGIN_SUCCESS = 'SOCIAL_LOGIN_SUCCESS';
export const SOCIAL_LOGIN_ERROR = 'SOCIAL_LOGIN_ERROR';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_SUBMIT = 'FORGOT_PASSWORD_SUBMIT';
export const FORGOT_PASSWORD_SUBMIT_SUCCESS = 'FORGOT_PASSWORD_SUBMIT_SUCCESS';
export const FORGOT_PASSWORD_SUBMIT_ERROR = 'FORGOT_PASSWORD_SUBMIT_ERROR';
export const USER_ID = 'USER_ID';

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { string } from 'yup/lib/locale';
import React from 'react';

Amplify.configure(awsconfig);

export const setSelectedCountry = item => ({
  type: SELECTED_COUNTRY,
  payload: item,
});

export const requestLogin = (username: string, password: string) => {
  return dispatch => {
    dispatch({
      type: HANDLE_LOGIN,
    });

    return Auth.signIn(username, password)
      .then(json => {
        return dispatch({
          type: HANDLE_LOGIN_SUCCESS,
          payload: json,
        });
      })
      .catch(err => {
        console.log('error Yusuf:', err);
        return dispatch({
          type: HANDLE_LOGIN_ERROR,
          payload: err,
        });
      });
  };
};

export const socialLogin = (provider: CognitoHostedUIIdentityProvider) => {
  Auth.federatedSignIn({
    provider: provider,
  });
  return dispatch => {
    return Hub.listen('auth', data => {
      const { payload } = data;

      if (payload && payload.data) {
        console.log('Yusuf1111:', JSON.stringify(payload.data));
        return dispatch({
          type: SOCIAL_LOGIN_SUCCESS,
          payload: JSON.stringify(payload.data),
        });
      } else {
        return dispatch({
          type: SOCIAL_LOGIN_ERROR,
          payload: JSON.stringify(payload.data),
        });
      }
    });
  };
};

export const registerUser = (
  username: string, // Should be phone number with dial code
  given_name: string,
  family_name: string,
  phone_number: string,
  birthdate: string,
  email: string,
  password: string,
) => {
  return dispatch => {
    dispatch({
      type: REGISTER_USER,
    });

    return Auth.signUp({
      username,
      password,
      attributes: { given_name, family_name, phone_number, birthdate, email },
    })
      .then(json => {
        console.log('success Yusuf:', json);
        return dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: json,
        });
      })
      .catch(err => {
        console.log('error Yusuf:', err);
        return dispatch({
          type: REGISTER_USER_ERROR,
          payload: err,
        });
      });
  };
};

export const requestForgotPassword = (username: string) => {
  return dispatch => {
    dispatch({
      type: FORGOT_PASSWORD,
    });

    return Auth.forgotPassword(username)
      .then(json => {
        console.log('success Yusuf:', json);
        dispatch({
          type: USER_ID,
          payload: username,
        });
        return dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: json,
        });
      })
      .catch(err => {
        console.log('error Yusuf:', err);
        return dispatch({
          type: FORGOT_PASSWORD_ERROR,
          payload: err,
        });
      });
  };
};

export const forgotPasswordSubmit = (
  username: string,
  code: string,
  password: string,
) => {
  return dispatch => {
    dispatch({
      type: FORGOT_PASSWORD_SUBMIT,
    });

    return Auth.forgotPasswordSubmit(username, code, password)
      .then(json => {
        console.log('success', json);
        return dispatch({
          type: FORGOT_PASSWORD_SUBMIT_SUCCESS,
          payload: json,
        });
      })
      .catch(err => {
        console.log('error Yusuf:', err);
        return dispatch({
          type: FORGOT_PASSWORD_SUBMIT_ERROR,
          payload: err,
        });
      });
  };
};
