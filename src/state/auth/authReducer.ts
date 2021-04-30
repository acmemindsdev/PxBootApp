import {
  SELECTED_COUNTRY,
  HANDLE_LOGIN,
  HANDLE_LOGIN_SUCCESS,
  HANDLE_LOGIN_ERROR,
  USER_ID,
  FORGOT_PASSWORD,
} from './authActions';
import get from 'lodash/get';

const errorMessage = errorCode => {
  switch (errorCode) {
    case 'UserNotFoundException':
      return 'Incorrect Mobile Number/Password. Try again';
    default:
      return 'Error';
      break;
  }
};

const initialState = {
  dialCode: '1',
  loading: false,
  fetchError: false,
  errorMessage: '',
  loginData: {},
  userName: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_COUNTRY:
      return {
        ...state,
        dialCode: get(action.payload, 'callingCode'),
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
        errorMessage: errorMessage(get(action.payload, 'code')),
        loading: false,
        fetchError: true,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case USER_ID:
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};

// Selectors
export const getDialCode = state => state.auth.dialCode;
export const getLoginData = state => state.auth.loginData;
export const isLoading = state => state.auth.loading;
export const fetchError = state => state.auth.fetchError;
export const fetchErrorMessage = state => state.auth.errorMessage;
export const getUserName = state => state.auth.userName;

export default authReducer;
