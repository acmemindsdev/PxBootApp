import get from 'lodash/get';
import * as API from 'src/services/API_Path';
import { clientCall } from '../middleware';

// Get Content
export const UPLOAD_MEDIA = 'UPLOAD_MEDIA';
export const UPLOAD_MEDIA_SUCCESS = 'UPLOAD_MEDIA_SUCCESS';
export const UPLOAD_MEDIA_ERROR = 'UPLOAD_MEDIA_SUCCESS_ERROR';

export interface MediaContentProp {
  file_Info: any;
  entity_type: string;
  entity_id: number;
  content_type: string;
  content_title?: string;
  caption?: string;
  inline_data?: string;
  content_order?: number;
  content_tag: string;
}

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
  console.log('media data is');
  return (dispatch: any) =>
    clientCall({
      dispatch: dispatch,
      types: {
        ACTION: UPLOAD_MEDIA,
        SUCCESS: UPLOAD_MEDIA_SUCCESS,
        ERROR: UPLOAD_MEDIA_ERROR,
      },
      apiPath: API.getContent,
      params: {
        entity_type: params.entity_type,
        entity_id: params.entity_id,
        content_type: params.content_type,
        content_title: params.content_title,
        storage_usage_bytes: get(params.file_Info, 'fileSize', 0),
        mime_type: get(params.file_Info, 'type', ''),
        filename: get(params.file_Info, 'fileName', ''),
        caption: params.caption,
        inline_data: params.inline_data,
        content_order: params.content_order,
        content_tag: params.content_tag,
      },
      onSuccess: onSuccess,
      onError: onError,
    });
};
