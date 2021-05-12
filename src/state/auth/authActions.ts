import * as API from 'src/services/API_Path';
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

// Temporary UserName
export const USER_ID = 'USER_ID';
export const MOBILE_NUMBER = 'MOBILE_NUMBER';

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

// Get OTP on Mobile Number api action
export const fetchMobileOTP = (
  mobileNumber: string,
  token: string,
  onSuccess,
  onError,
) => {
  return dispatch =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: GET_OTP,
        SUCCESS: GET_OTP_SUCCESS,
        ERROR: GET_OTP_ERROR,
      },
      apiPath: API.getMobileOTP,
      params: {
        phone: mobileNumber,
      },
      token: token,
      onSuccess: onSuccess,
      onError: onError,
    });
};

// Verify OTP and add mobile Number on social account
export const verifyMobileOTP = (
  code: string,
  mobileNumber: string,
  token: string,
  onSuccess,
  onError,
) => {
  return dispatch =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: VERIFICATION_CODE_SUBMIT,
        SUCCESS: VERIFICATION_CODE_SUBMIT_SUCCESS,
        ERROR: VERIFICATION_CODE_SUBMIT_ERROR,
      },
      apiPath: API.verifyMobileOTP,
      params: {
        otp: code,
        phone: mobileNumber,
      },
      token: token,
      onSuccess: onSuccess,
      onError: onError,
    });
};
