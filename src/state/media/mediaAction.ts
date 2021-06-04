import get from 'lodash/get';
import * as API from 'src/services/API_Path';
import { clientCall } from '../middleware';
import { fetchData } from 'src/services/Fetch';
import fs from 'react-native-fs';
import { decode } from 'base64-arraybuffer';

// Upload Media
export const UPLOAD_MEDIA = 'UPLOAD_MEDIA';
export const UPLOAD_MEDIA_SUCCESS = 'UPLOAD_MEDIA_SUCCESS';
export const UPLOAD_MEDIA_ERROR = 'UPLOAD_MEDIA_ERROR';

// Get Media
export const GET_MEDIA = 'GET_MEDIA';
export const GET_MEDIA_SUCCESS = 'GET_MEDIA_SUCCESS';
export const GET_MEDIA_ERROR = 'GET_MEDIA_ERROR';

export interface MediaContentProp {
  file_Info: any;
  entity_type: 'USER' | 'HOSPITAL';
  entity_id: number;
  content_type: string;
  content_title?: string;
  caption?: string;
  inline_data?: string;
  content_order?: number;
  content_tag: string;
}

// Prop to fetch media
export interface GetMediaContentProp {
  entity_type: 'USER' | 'HOSPITAL';
  entity_id: number;
  content_tag: string;
}

/**
 * @private Create File Blob for upload on server
 * @param fileSrc Information About Media Content
 */
const createFileBlob = async (fileSrc: any) => {
  // const uri = fileSrc.uri;
  // const response = await fetch(uri);
  // const fileBlob = await response.blob();
  const base64 = await fs.readFile(fileSrc.uri, 'base64');
  const arrayBuffer = decode(base64);

  return arrayBuffer;
};

/**
 * @public Get list of content media
 * @param params Information About Media Content
 * @param onSuccess Call Back Method for Success response
 * @param onError Call Back Method for Error response
 */
export const loadMedia = (
  params: GetMediaContentProp,
  onSuccess: any,
  onError: any,
) => {
  return (dispatch: any) =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: GET_MEDIA,
        SUCCESS: GET_MEDIA_SUCCESS,
        ERROR: GET_MEDIA_ERROR,
      },
      path: API.mediaContentList,
      body: params,
      method: 'GET',
      onSuccess: onSuccess,
      onError: onError,
    });
};

/**
 * @public Upload Any type of Media
 * @param params Information About Media Content
 * @param onSuccess Call Back Method for Success response
 * @param onError Call Back Method for Error response
 */
export const uploadMedia = (
  params: MediaContentProp,
  onSuccess: any,
  onError: any,
) => {
  return (dispatch: any) =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: UPLOAD_MEDIA,
        SUCCESS: UPLOAD_MEDIA_SUCCESS,
        ERROR: UPLOAD_MEDIA_ERROR,
      },
      path: API.getContent,
      body: {
        ...params,
        storage_usage_bytes: get(params.file_Info, 'fileSize', 0),
        mime_type: get(params.file_Info, 'type', 'image/jpeg'),
        filename: get(params.file_Info, 'fileName', ''),
      },
      onSuccess: (response: any) => {
        const apiUrl = get(response, 'payload.data.data.signedURL', '');
        const token = get(response, 'payload.data.data.token', '');
        // Upload Binary data on s3 bucket
        uploadBinaryDataS3Bucket(
          apiUrl,
          token,
          params.file_Info,
          dispatch,
          onSuccess,
          onError,
        );
      },
      onError: onError,
    });
};

/**
 * @private Upload Binary Data on S3 Bucket
 * @param signedUrl S3 bucket url to upload media
 * @param token reddis token
 * @param fileInfo uploaded Media metadata
 * @param dispatch Method for redux action
 * @param onSuccess Call Back Method for Success response
 * @param onError Call Back Method for Error response
 */
const uploadBinaryDataS3Bucket = (
  signedUrl: string,
  token: string,
  fileInfo: any,
  dispatch: any,
  onSuccess: any,
  onError: any,
) => {
  createFileBlob(fileInfo).then(fileBlob => {
    fetchData({
      path: signedUrl,
      body: fileBlob,
      method: 'PUT',
      noAuth: true,
      headers: {
        'Content-Type': get(fileInfo, 'type', 'image/jpeg'),
      },
    })
      .then(() => {
        // Map uploaded media to user
        mapMedia_to_user(token, dispatch, onSuccess, onError);
      })
      .catch(err => {
        console.log('error:', err);
        const error = dispatch({
          type: UPLOAD_MEDIA_ERROR,
          payload: err,
        });
        onError && onError(error);
      });
  });
};

/**
 * @private Map uploaded media to user
 * @param token reddis token
 * @param dispatch Method for redux action
 * @param onSuccess Call Back Method for Success response
 * @param onError Call Back Method for Error response
 */
const mapMedia_to_user = (
  token: string,
  dispatch: any,
  onSuccess: any,
  onError: any,
) => {
  fetchData({
    path: API.submitContent,
    body: { token: token },
    method: 'PUT',
  })
    .then(json => {
      const success = dispatch({
        type: UPLOAD_MEDIA_SUCCESS,
        payload: json,
      });
      onSuccess && onSuccess(success);
    })
    .catch(err => {
      console.log('error:', err);
      const error = dispatch({
        type: UPLOAD_MEDIA_ERROR,
        payload: err,
      });
      onError && onError(error);
    });
};
