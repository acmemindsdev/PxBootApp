import get from 'lodash/get';
import * as API from 'src/services/API_Path';
import { clientCall } from '../middleware';

// Get Exceptional Care
export const GET_EXCEPTIONAL_CARE = 'GET_EXCEPTIONAL_CARE';
export const GET_EXCEPTIONAL_CARE_SUCCESS = 'GET_EXCEPTIONAL_CARE_SUCCESS';
export const GET_EXCEPTIONAL_CARE_ERROR = 'GET_EXCEPTIONAL_CARE_ERROR';

// Set Exceptional Care to user
export const SET_EXCEPTIONAL_CARE = 'SET_EXCEPTIONAL_CARE';
export const SET_EXCEPTIONAL_CARE_SUCCESS = 'SET_EXCEPTIONAL_CARE_SUCCESS';
export const SET_EXCEPTIONAL_CARE_ERROR = 'SET_EXCEPTIONAL_CARE_ERROR';

/**
 * @public Load Exceptional Care List
 * @param userID User's aws ID
 * @param onSuccess Call Back Method for Success response
 * @param onError Call Back Method for Error response
 */
export const loadExceptionalCareList = (
  userID: string,
  onSuccess: any,
  onError: any,
) => {
  return (dispatch: any) =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: GET_EXCEPTIONAL_CARE,
        SUCCESS: GET_EXCEPTIONAL_CARE_SUCCESS,
        ERROR: GET_EXCEPTIONAL_CARE_ERROR,
      },
      path: API.patient + `/${userID}/exceptionalCare`,
      method: 'GET',
      onSuccess: onSuccess,
      onError: onError,
    });
};

export type ExceptionalCareProp = {
  exceptionalCareId: number;
  setActiveStatus: 'ACTIVE' | 'DELETED';
};

/**
 * @public Map/Un-map exceptional care data to user
 * @param userID User's aws ID
 * @param dataArray User's aws ID
 * @param onSuccess Call Back Method for Success response
 * @param onError Call Back Method for Error response
 */
export const setExceptionalCare_to_user = (
  userID: string,
  dataArray: [ExceptionalCareProp] | any[],
  onSuccess: any,
  onError: any,
) => {
  return (dispatch: any) =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: SET_EXCEPTIONAL_CARE,
        SUCCESS: SET_EXCEPTIONAL_CARE_SUCCESS,
        ERROR: SET_EXCEPTIONAL_CARE_ERROR,
      },
      path: API.patient + `/${userID}/exceptionalCare`,
      body: dataArray,
      onSuccess: onSuccess,
      onError: onError,
    });
};
