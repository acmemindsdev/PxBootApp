import {
  UPLOAD_MEDIA,
  UPLOAD_MEDIA_SUCCESS,
  UPLOAD_MEDIA_ERROR,
} from './mediaAction';

// Default State
const initialState = {
  loading: false,
  fetchError: false,
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
    default:
      return state;
  }
};

// Selectors

// Get is Media upload response is in progress
export const isLoading = state => state.media.loading;

// Get Media upload Error
export const fetchError = state => state.media.fetchError;

export default mediaReducer;
