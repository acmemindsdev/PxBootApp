import {
  SELECTED_COUNTRY,
  HANDLE_LOGIN,
  HANDLE_LOGIN_SUCCESS,
  HANDLE_LOGIN_ERROR,
  USER_ID,
  FORGOT_PASSWORD,
  SOCIAL_LOGIN,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_ERROR,
  MOBILE_NUMBER,
  LOGGED_IN_SUCCESS,
  ONBOARDING_SHOW,
  LOGIN_RESPONSE_DATA,
} from './authActions';
import get from 'lodash/get';

const initialState = {
  countryObj: {},
  dialCode: '1',
  countryCode: 'US',
  loading: false,
  fetchError: false,
  errorMessage: '',
  loginData: {},
  userName: '',
  mobileNumber: '',
  jwtToken: '',
  loggedIn: false,
  showOnboarding: false,
  socialLogin: {
    responseData: {},
    error: false,
    loading: false,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_COUNTRY:
      return {
        ...state,
        countryObj: action.payload,
        dialCode: get(action.payload, 'callingCode'),
        countryCode: get(action.payload, 'code'),
      };
    case HANDLE_LOGIN:
      return {
        ...state,
        loading: true,
        fetchError: false,
        errorMessage: '',
      };
    case HANDLE_LOGIN_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
        loading: false,
        fetchError: false,
        errorMessage: '',
      };
    case HANDLE_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    case SOCIAL_LOGIN:
      return {
        ...state,
        socialLogin: {
          ...state.socialLogin,
          loading: true,
          error: false,
        },
        userName: '',
      };
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        socialLogin: {
          ...state.socialLogin,
          responseData: JSON.parse(action.payload),
          loading: false,
          error: false,
        },
        jwtToken: get(
          JSON.parse(action.payload),
          'signInUserSession.idToken.jwtToken',
        ),
        userName: get(action.payload, 'username', ''),
      };
    case SOCIAL_LOGIN_ERROR:
      return {
        ...state,
        socialLogin: {
          ...state.socialLogin,
          loading: false,
          error: true,
        },
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
      };
    case USER_ID:
      return {
        ...state,
        userName: action.payload,
      };
    case MOBILE_NUMBER:
      return {
        ...state,
        mobileNumber: action.payload,
      };
    case LOGGED_IN_SUCCESS:
      return {
        ...state,
        loggedIn: JSON.parse(action.payload),
      };
    case ONBOARDING_SHOW:
      return {
        ...state,
        showOnboarding: action.payload,
      };
    case LOGIN_RESPONSE_DATA:
      return {
        ...state,
        loginData: action.payload,
      };
    default:
      return state;
  }
};

// Selectors

// Get Selected Country Object
export const getCountryObj = state => state.auth.countryObj;

// Get Selected Dial Code
export const getDialCode = state => state.auth.dialCode;

// Get Selected Country Code
export const getCountryCode = state => state.auth.countryCode;

// Get Login Response Data
export const getLoginData = state => state.auth.loginData;

// Get is Login response is in progress
export const isLoading = state => state.auth.loading;

// Get Login Error
export const fetchError = state => state.auth.fetchError;

// Get Error Message
export const fetchErrorMessage = state => state.auth.errorMessage;

// Get Temporary User Name
export const getUserName = state => state.auth.userName;

// Get Temporary Mobile Number
export const getMobileNumber = state => state.auth.mobileNumber;

// Get is Social Login Response is in progress
export const isSocialLoginResponseLoading = state =>
  get(state, 'auth.socialLogin.loading');

// Get Social Login Response Data
export const getSocialLoginData = state =>
  get(state, 'auth.socialLogin.responseData');

// Get Social Login Error
export const fetchSocialLoginError = state =>
  get(state, 'auth.socialLogin.error');

// Get Authorize Token
export const getAuthorizeToken = state => get(state, 'auth.jwtToken');

// Get flag : isUser Successful Logged in
export const getOnboarding = state => get(state, 'auth.showOnboarding');

export default authReducer;
