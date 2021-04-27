import { SELECTED_COUNTRY } from './authActions';
import get from 'lodash/get';

const initialState = {
  dialCode: '1',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_COUNTRY:
      return {
        ...state,
        dialCode: get(action.payload, 'callingCode'),
      };

    default:
      return state;
  }
};

export const getDialCode = state => state.auth.dialCode;

export default authReducer;
