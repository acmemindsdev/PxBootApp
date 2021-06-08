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
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,
  setUsername,
  setMobileNumber,
  showOnboarding,
  setLoginResponse,
} from 'src/state/auth/authActions';
import { fillLoginData } from 'src/storage/UserData';
import get from 'lodash/get';
import TokenBridge from 'src/storage/Token.bridge';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import AsyncStore from 'src/storage/AsyncStore';

const busListeners = {};

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.close();
  console.log('urls ', url, redirectUrl);
  if (redirectUrl === undefined) {
    return;
  }
  const result = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: true,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: true,
    forceCloseOnRedirection: true,
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
      // console.log('auth response', JSON.stringify(payload));
      if (payload.event === 'codeFlow') {
        console.log('auth initialize');
        dispatch({
          type: SOCIAL_LOGIN,
        });
      }
      if (payload.event === 'signIn') {
        // store on redux for temporary
        dispatch({
          type: SOCIAL_LOGIN_SUCCESS,
          payload: JSON.stringify(payload.data),
        });
        // Check is phone verified
        const phoneVerified = get(
          payload.data,
          'signInUserSession.idToken.payload.phone_number_verified',
          false,
        );
        // check is birth date entered
        const isBirthDateAdded = !isEmpty(
          get(payload.data, 'signInUserSession.idToken.payload.birthdate', ''),
        );
        if (phoneVerified && isBirthDateAdded) {
          // dispatch(showOnboarding(true));
          // Store Login Data on app storage
          fillLoginData(payload.data);
          dispatch(setLoginResponse(payload.data));
        }
        // checkCurrentAuthentication(dispatch);
      }
      if (payload.event === 'signOut') {
        console.log('a user has signed out!');
      }
    });
  };
};

/**
 * @public Check Current Authentication Status and save to Async Storage
 * @param dispatch function to redux action
 */
export const checkCurrentAuthentication = (dispatch: any) => {
  Auth.currentAuthenticatedUser({ bypassCache: true })
    .then(user => {
      // Check is phone verified
      const phoneVerified = get(
        user,
        'signInUserSession.idToken.payload.phone_number_verified',
        false,
      );
      // check is birth date entered
      const isBirthDateAdded = !isEmpty(
        get(user, 'signInUserSession.idToken.payload.birthdate', ''),
      );
      console.log('is verified', phoneVerified, isBirthDateAdded, user);
      if (phoneVerified && isBirthDateAdded) {
        // dispatch(showOnboarding(true));
        // Store Login Data on app storage
        fillLoginData(user);
        dispatch(setLoginResponse(user));
      }
    })
    .catch(error => {
      // get error on current authentication user
      console.log('error fetch', error);
    });
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
  password: string;
  authenticationCode: string;
}

export const confirmRegistration = (
  { username, password, authenticationCode }: ConfirmRegistrationProps,
  onSuccess?: any,
  onError?: any,
) => {
  return dispatch => {
    dispatch({
      type: VERIFICATION_CODE_SUBMIT,
    });

    return Auth.confirmSignUp(username, authenticationCode)
      .then(json => {
        dispatch({
          type: VERIFICATION_CODE_SUBMIT_SUCCESS,
          payload: json,
        });
        dispatch(showOnboarding(true));

        dispatch(
          requestLogin(
            username,
            password,
            response => {
              const payload = get(response, 'payload', {});
              fillLoginData(payload);
              dispatch(setLoginResponse(payload));
              onSuccess && onSuccess(response);
            },
            error => {
              console.log('error while sign in', error);
              onError && onError(error);
            },
          ),
        );
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

export const signOut = (onSuccess?: any, onError?: any) => {
  return dispatch => {
    dispatch({
      type: LOG_OUT,
    });

    return Auth.signOut({ global: true })
      .then(json => {
        console.log('user successfully signed out!');
        dispatch(setLoginResponse({}));
        AsyncStore.removeItem('loginData');
        const success = dispatch({
          type: LOG_OUT_SUCCESS,
          payload: json,
        });
        onSuccess && onSuccess(success);
      })
      .catch(err => {
        console.log('error signing out: ', err);
        const error = dispatch({
          type: LOG_OUT_ERROR,
          payload: err,
        });
        onError && onError(error);
      });
  };
};
