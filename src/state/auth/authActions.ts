export const SELECTED_COUNTRY = 'SELECTED_COUNTRY';

// Login
export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const HANDLE_LOGIN_SUCCESS = 'HANDLE_LOGIN_SUCCESS';
export const HANDLE_LOGIN_ERROR = 'HANDLE_LOGIN_ERROR';

// Social Login
export const SOCIAL_LOGIN = 'SOCIAL_LOGIN';
export const SOCIAL_LOGIN_SUCCESS = 'SOCIAL_LOGIN_SUCCESS';
export const SOCIAL_LOGIN_ERROR = 'SOCIAL_LOGIN_ERROR';

// Register User
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

// Forgot Password
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

// Forgot Password Submit
export const FORGOT_PASSWORD_SUBMIT = 'FORGOT_PASSWORD_SUBMIT';
export const FORGOT_PASSWORD_SUBMIT_SUCCESS = 'FORGOT_PASSWORD_SUBMIT_SUCCESS';
export const FORGOT_PASSWORD_SUBMIT_ERROR = 'FORGOT_PASSWORD_SUBMIT_ERROR';

// Verification Code Submit
export const VERIFICATION_CODE_SUBMIT = 'VERIFICATION_CODE_SUBMIT';
export const VERIFICATION_CODE_SUBMIT_SUCCESS =
  'VERIFICATION_CODE_SUBMIT_SUCCESS';
export const VERIFICATION_CODE_SUBMIT_ERROR = 'VERIFICATION_CODE_SUBMIT_ERROR';

// Resend Verification Code
export const RESEND_CODE = 'RESEND_CODE';
export const RESEND_CODE_SUCCESS = 'RESEND_CODE_SUCCESS';
export const RESEND_CODE_ERROR = 'RESEND_CODE_ERROR';

// Temporary UserName
export const USER_ID = 'USER_ID';
export const MOBILE_NUMBER = 'MOBILE_NUMBER';

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

Amplify.configure(awsconfig);
const busListeners = {};

export const setSelectedCountry = item => ({
  type: SELECTED_COUNTRY,
  payload: item,
});

export const setUsername = item => ({
  type: USER_ID,
  payload: item,
});
export const setMobileNumber = item => ({
  type: MOBILE_NUMBER,
  payload: item,
});

export const requestLogin = (
  username: string,
  password: string,
  onSuccess?: any,
  onError?: any,
) => {
  return dispatch => {
    dispatch({
      type: HANDLE_LOGIN,
    });

    return Auth.signIn(username, password)
      .then(json => {
        const success = dispatch({
          type: HANDLE_LOGIN_SUCCESS,
          payload: json,
        });
        onSuccess && onSuccess(success);
      })
      .catch(err => {
        console.log('error:', err);
        const error = dispatch({
          type: HANDLE_LOGIN_ERROR,
          payload: err,
        });
        onError && onError(error);
      });
  };
};

export const socialLogin = (provider: CognitoHostedUIIdentityProvider) => {
  return dispatch => {
    Auth.federatedSignIn({
      provider: provider,
    });
    return registerListener('auth', 'social', data => {
      const { payload } = data;
      console.log('auth response', JSON.stringify(payload));
      if (payload.event === 'codeFlow') {
        console.log('auth initialize');
        dispatch({
          type: SOCIAL_LOGIN,
        });
      }
      if (payload.event === 'signIn') {
        console.log('a user has signed in!');
        dispatch({
          type: SOCIAL_LOGIN_SUCCESS,
          payload: JSON.stringify(payload.data),
        });
      }
      if (payload.event === 'signOut') {
        console.log('a user has signed out!');
      }
    });
  };
};

/* Adds a listener to under the UNIQUE name, to the channel
  If a listener with the name already exists, it will be removed
  before this one is added
  @param channel
  @param name
  @param callback
 */
const registerListener = (channel, name, callback) => {
  const previousListener = busListeners[name];
  if (!!previousListener) {
    Hub.remove(channel, previousListener);
  }
  busListeners[name] = callback;
  Hub.listen(channel, busListeners[name]);
};

export const registerUser = (
  username: string, // Should be phone number with dial code
  given_name: string,
  family_name: string,
  phone_number: string,
  birthdate: string,
  email: string,
  password: string,
  onSuccess?: any,
  onError?: any,
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
        dispatch(setUsername(username));
        dispatch(setMobileNumber(phone_number));
        const success = dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: json,
        });
        onSuccess && onSuccess(success);
      })
      .catch(err => {
        console.log('error:', err);
        const error = dispatch({
          type: REGISTER_USER_ERROR,
          payload: err,
        });
        onError && onError(error);
      });
  };
};

export const requestForgotPassword = (
  username: string,
  onSuccess?: any,
  onError?: any,
) => {
  return dispatch => {
    dispatch({
      type: FORGOT_PASSWORD,
    });

    return Auth.forgotPassword(username)
      .then(json => {
        dispatch(setUsername(username));
        dispatch(setMobileNumber(username));
        const success = dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: json,
        });
        onSuccess && onSuccess(success);
      })
      .catch(err => {
        console.log('error:', err);
        const error = dispatch({
          type: FORGOT_PASSWORD_ERROR,
          payload: err,
        });
        onError && onError(error);
      });
  };
};

export const forgotPasswordSubmit = (
  username: string,
  code: string,
  password: string,
  onSuccess?: any,
  onError?: any,
) => {
  return dispatch => {
    dispatch({
      type: FORGOT_PASSWORD_SUBMIT,
    });

    return Auth.forgotPasswordSubmit(username, code, password)
      .then(json => {
        const success = dispatch({
          type: FORGOT_PASSWORD_SUBMIT_SUCCESS,
          payload: json,
        });
        onSuccess && onSuccess(success);
      })
      .catch(err => {
        console.log('error:', err);
        const error = dispatch({
          type: FORGOT_PASSWORD_SUBMIT_ERROR,
          payload: err,
        });
        onError && onError(error);
      });
  };
};

interface ConfirmRegistrationProps {
  username: string;
  authenticationCode: string;
}

export const confirmRegistration = (
  { username, authenticationCode }: ConfirmRegistrationProps,
  onSuccess?: any,
  onError?: any,
) => {
  return dispatch => {
    dispatch({
      type: VERIFICATION_CODE_SUBMIT,
    });

    return Auth.confirmSignUp(username, authenticationCode)
      .then(json => {
        const success = dispatch({
          type: VERIFICATION_CODE_SUBMIT_SUCCESS,
          payload: json,
        });
        onSuccess && onSuccess(success);
      })
      .catch(err => {
        console.log('error:', err);
        const error = dispatch({
          type: VERIFICATION_CODE_SUBMIT_ERROR,
          payload: err,
        });
        onError && onError(error);
      });
  };
};

export const resendRegistrationCode = (
  username: string,
  onSuccess?: any,
  onError?: any,
) => {
  return dispatch => {
    dispatch({
      type: RESEND_CODE,
    });

    return Auth.resendSignUp(username)
      .then(json => {
        const success = dispatch({
          type: RESEND_CODE_SUCCESS,
          payload: json,
        });
        onSuccess && onSuccess(success);
      })
      .catch(err => {
        console.log('error:', err);
        const error = dispatch({
          type: RESEND_CODE_ERROR,
          payload: err,
        });
        onError && onError(error);
      });
  };
};
