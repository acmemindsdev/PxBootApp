import {
  GET_HOSPITAL_LIST,
  GET_HOSPITAL_LIST_SUCCESS,
  GET_HOSPITAL_LIST_ERROR,
} from './hospitalAction';
import get from 'lodash/get';

// Default State
const initialState = {
  fetchHospitals: {
    loading: false,
    fetchError: false,
    list: [],
  },
};

const hospitalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOSPITAL_LIST:
      return {
        ...state,
        fetchHospitals: {
          ...state.fetchHospitals,
          loading: true,
          fetchError: false,
          list: [],
        },
      };
    case GET_HOSPITAL_LIST_SUCCESS:
      return {
        ...state,
        fetchHospitals: {
          ...state.fetchHospitals,
          loading: false,
          fetchError: false,
          list: get(action.payload, 'data.data', []),
        },
      };
    case GET_HOSPITAL_LIST_ERROR:
      return {
        ...state,
        fetchHospitals: {
          ...state.fetchHospitals,
          loading: false,
          fetchError: true,
        },
      };
    default:
      return state;
  }
};

// Selectors

// Get Hospital List
export const getHospital = state => state.hospital.fetchHospitals;

export default hospitalReducer;
