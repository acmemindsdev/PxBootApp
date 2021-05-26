import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from 'src/aws-exports';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import {
  HANDLE_LOGIN,
  HANDLE_LOGIN_SUCCESS,
  HANDLE_LOGIN_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  SOCIAL_LOGIN,
  SOCIAL_LOGIN_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  FORGOT_PASSWORD_SUBMIT,
  FORGOT_PASSWORD_SUBMIT_SUCCESS,
  FORGOT_PASSWORD_SUBMIT_ERROR,
  VERIFICATION_CODE_SUBMIT,
  VERIFICATION_CODE_SUBMIT_SUCCESS,
  VERIFICATION_CODE_SUBMIT_ERROR,
  RESEND_CODE,
  RESEND_CODE_SUCCESS,
  RESEND_CODE_ERROR,
  setUsername,
  setMobileNumber,
} from 'src/state/auth/authActions';
import { fillLoginData } from 'src/storage/UserData';
import get from 'lodash/get';
import TokenBridge from 'src/storage/Token.bridge';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';

const busListeners = {};

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  const result = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: true,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (result.type === 'success') {
    Linking.openURL(result.url);
  }
}

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
        // Store Login Data on app storage
        fillLoginData(payload.data);
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

export const checkTokenValidity = async () => {
  return new Promise((resolve, reject) => {
    Auth.currentSession()
      .then(session => {
        var idTokenExpire = session.getIdToken().getExpiration();
        var refreshToken = session.getRefreshToken();
        var currentTimeSeconds = Math.round(+new Date() / 1000);
        if (idTokenExpire < currentTimeSeconds) {
          Auth.currentAuthenticatedUser().then(res => {
            res.refreshSession(refreshToken, (err, data) => {
              if (err) {
                Auth.signOut();
              } else {
                const token = data.getIdToken().getJwtToken();
                resolve(token);
              }
            });
          });
        } else {
          const token = session.getIdToken().getJwtToken();
          resolve(token);
        }
      })
      .catch(() => {
        // No logged-in user: don't set auth header
        reject();
      });
  });
};

export const signOut = async () => {
  try {
    await Auth.signOut().then(data => console.log(data));
    console.log('user successfully signed out!');
  } catch (error) {
    console.log('error signing out: ', error);
  }
};
