export const SELECTED_COUNTRY = 'SELECTED_COUNTRY';
export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const HANDLE_LOGIN_SUCCESS = 'HANDLE_LOGIN_SUCCESS';
export const HANDLE_LOGIN_ERROR = 'HANDLE_LOGIN_ERROR';
export const SOCIAL_LOGIN_SUCCESS = 'SOCIAL_LOGIN_SUCCESS';
export const SOCIAL_LOGIN_ERROR = 'SOCIAL_LOGIN_ERROR';

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

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
