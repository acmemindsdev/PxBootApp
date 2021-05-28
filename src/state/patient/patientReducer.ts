import {
  GET_EXCEPTIONAL_CARE,
  GET_EXCEPTIONAL_CARE_SUCCESS,
  GET_EXCEPTIONAL_CARE_ERROR,
} from './patientAction';
import get from 'lodash/get';

// Default State
const initialState = {
  exceptionalCare: {
    loading: false,
    fetchError: false,
    list: [],
  },
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXCEPTIONAL_CARE:
      return {
        ...state,
        exceptionalCare: {
          ...state.exceptionalCare,
          loading: true,
          fetchError: false,
          list: [],
        },
      };
    case GET_EXCEPTIONAL_CARE_SUCCESS:
      return {
        ...state,
        exceptionalCare: {
          ...state.exceptionalCare,
          loading: false,
          fetchError: false,
          list: get(action.payload, 'data.data', []),
        },
      };
    case GET_EXCEPTIONAL_CARE_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    default:
      return state;
  }
};

// Selectors

// Get Exceptional Care Data
export const getExceptionalCare = state => state.patient.exceptionalCare;

export default patientReducer;
