import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import {
  UPLOAD_MEDIA,
  UPLOAD_MEDIA_SUCCESS,
  UPLOAD_MEDIA_ERROR,
  GET_MEDIA,
  GET_MEDIA_SUCCESS,
  GET_MEDIA_ERROR,
} from './mediaAction';

// Default State
const initialState = {
  loading: false,
  fetchError: false,
  mediaList: '',
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_MEDIA:
      return {
        ...state,
        loading: true,
        fetchError: false,
      };
    case UPLOAD_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
      };
    case UPLOAD_MEDIA_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    case GET_MEDIA:
      return {
        ...state,
        loading: true,
        fetchError: false,
      };
    case GET_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        mediaList: action.payload,
      };
    case GET_MEDIA_ERROR:
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

// Get is Media load/upload response is in progress
export const mediaLoading = state => state.media.loading;

// Get Media load/upload Error
export const mediaError = state => state.media.fetchError;

// Get Media Data
export const fetchMediaData = state => {
  const mediaArray = get(state.media.mediaList, 'data.data', []);
  const sortedArray = orderBy(mediaArray, ['contentId'], ['desc']);
  return sortedArray.length > 0 ? sortedArray[0] : {};
};

export default mediaReducer;
