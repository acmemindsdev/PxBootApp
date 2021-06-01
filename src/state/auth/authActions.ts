import * as API from 'src/services/API_Path';
import { checkCurrentAuthentication } from 'src/services/CognitoMethods';
import { clientCall } from '../middleware';

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

// Get OTP on Mobile Number
export const GET_OTP = 'GET_OTP';
export const GET_OTP_SUCCESS = 'GET_OTP_SUCCESS';
export const GET_OTP_ERROR = 'GET_OTP_ERROR';

// Add Birth Date
export const ADD_BIRTH_DATE = 'ADD_BIRTH_DATE';
export const ADD_BIRTH_DATE_SUCCESS = 'ADD_BIRTH_DATE_SUCCESS';
export const ADD_BIRTH_DATE_ERROR = 'ADD_BIRTH_DATE_ERROR';

// Temporary UserName
export const USER_ID = 'USER_ID';

// Temporary Mobile Number
export const MOBILE_NUMBER = 'MOBILE_NUMBER';

// User LoggedIn Successful
export const LOGGED_IN_SUCCESS = 'LOGGED_IN_SUCCESS';

// Show Onboarding
export const ONBOARDING_SHOW = 'ONBOARDING_SHOW';

// Login Response
export const LOGIN_RESPONSE_DATA = 'LOGIN_RESPONSE_DATA';

// Redux Action to Set Selected Country object
export const setSelectedCountry = item => ({
  type: SELECTED_COUNTRY,
  payload: item,
});

// Redux Action to Set UserName on redux store
export const setUsername = item => ({
  type: USER_ID,
  payload: item,
});

// Redux Action to Set Mobile Number on redux store
export const setMobileNumber = item => ({
  type: MOBILE_NUMBER,
  payload: item,
});

// Redux Action to show onboarding when user successful logged in
export const showOnboarding = item => ({
  type: ONBOARDING_SHOW,
  payload: item,
});

// Redux Action to store User Logged in response Data
export const setLoginResponse = item => ({
  type: LOGIN_RESPONSE_DATA,
  payload: item,
});

// Get OTP on Mobile Number api action
export const fetchMobileOTP = (
  mobileNumber: string,
  onSuccess: any,
  onError: any,
) => {
  return dispatch =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: GET_OTP,
        SUCCESS: GET_OTP_SUCCESS,
        ERROR: GET_OTP_ERROR,
      },
      path: API.getMobileOTP,
      body: {
        phone: mobileNumber,
      },
      onSuccess: onSuccess,
      onError: onError,
    });
};

// Verify OTP and add mobile Number on social account
export const verifyMobileOTP = (
  code: string,
  mobileNumber: string,
  onSuccess: any,
  onError: any,
) => {
  return (dispatch: any) =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: VERIFICATION_CODE_SUBMIT,
        SUCCESS: VERIFICATION_CODE_SUBMIT_SUCCESS,
        ERROR: VERIFICATION_CODE_SUBMIT_ERROR,
      },
      path: API.verifyMobileOTP,
      body: {
        otp: code,
        phone: mobileNumber,
      },
      onSuccess: payload => {
        checkCurrentAuthentication(dispatch);
        onSuccess(payload);
      },
      onError: onError,
    });
};

/**
 * @public Add/Update Birth Date on User Info
 * @param userId LoggedIn user's Id
 * @param date_of_birth Birth Date string
 * @param onSuccess Call Back Method for Success response
 * @param onError Call Back Method for Error response
 */
export const updateDateOfBirth = (
  userId: string,
  date_of_birth: string,
  onSuccess: any,
  onError: any,
) => {
  return (dispatch: any) =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: ADD_BIRTH_DATE,
        SUCCESS: ADD_BIRTH_DATE_SUCCESS,
        ERROR: ADD_BIRTH_DATE_ERROR,
      },
      path: API.updateUser + `/${userId}`,
      body: {
        date_of_birth: date_of_birth,
      },
      onSuccess: onSuccess,
      onError: onError,
    });
};
