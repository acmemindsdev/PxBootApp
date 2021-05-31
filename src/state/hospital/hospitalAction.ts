import get from 'lodash/get';
import * as API from 'src/services/API_Path';
import { clientCall } from '../middleware';

// Get Hospital List
export const GET_HOSPITAL_LIST = 'GET_HOSPITAL_LIST';
export const GET_HOSPITAL_LIST_SUCCESS = 'GET_HOSPITAL_LIST_SUCCESS';
export const GET_HOSPITAL_LIST_ERROR = 'GET_HOSPITAL_LIST_ERROR';

export type SearchHospitalProp = {
  coordinate?: {
    lat: number;
    long: number;
  };
  name?: string;
  city?: string;
  postal_code?: string;
};

/**
 * @public Load Hospital List
 * @param params for hospital search by parameters
 * @param onSuccess Call Back Method for Success response
 * @param onError Call Back Method for Error response
 */
export const loadHospitalList = (
  params: SearchHospitalProp | null,
  onSuccess: any,
  onError: any,
) => {
  return (dispatch: any) =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: GET_HOSPITAL_LIST,
        SUCCESS: GET_HOSPITAL_LIST_SUCCESS,
        ERROR: GET_HOSPITAL_LIST_ERROR,
      },
      path: API.hospitalList,
      body: params && {
        lat_long: params?.coordinate
          ? `${params?.coordinate?.long},${params?.coordinate?.lat}`
          : null,
        ...params,
      },
      method: 'GET',
      onSuccess: onSuccess,
      onError: onError,
    });
};
