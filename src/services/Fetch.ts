import axios, { AxiosRequestConfig, Method } from 'axios';
import { requestInterceptor } from './RequestInterceptor';
import {
  FetchResponse,
  responseInterceptorOnError,
  responseInterceptorOnSuccess,
} from './ResponseInterceptor';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import TokenBridge from 'src/storage/Token.bridge';
import { checkTokenValidity } from './CognitoMethods';

interface IFetchOptions {
  path: string;
  method?: Method;
  body?: any;
  headers?: any;
  noAuth?: boolean;
}

// Add a request interceptor
axios.interceptors.request.use(requestInterceptor);

// Add a response interceptor
axios.interceptors.response.use(
  responseInterceptorOnSuccess,
  responseInterceptorOnError,
);

/**
 * @public
 * @param url
 * @param body   The body of the request. In case of a GET request, these are the query parameters.
 * @param method
 * @param headers
 * @param params the URL parameters to be sent with the request
 */
export const fetchData = async <T = any>({
  path,
  body,
  method = 'POST',
  noAuth = false,
  headers = {},
}: IFetchOptions): Promise<FetchResponse<T> | never> => {
  const curToken = axios.CancelToken.source();
  const cToken = curToken.token;
  // const token = useSelector(state => getAuthorizeToken(state));

  let config: AxiosRequestConfig = {
    method,
    url: path,
    cancelToken: cToken,
  };

  if (noAuth === false) {
    try {
      await checkTokenValidity().then(token => {
        headers.Authorization = token;
      });
    } catch (e) {
      console.log('Unable to refresh Token', e);
    }
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    };

    // const tokens = await TokenBridge.getTokens();
    // headers.Authorization = get(tokens, 'id_token', '');
  } else {
    config.headers = {
      Accept: '*/*',
      ...headers,
    };
  }

  if (method === 'GET') {
    config.params = body;
  } else {
    config.data = body;
  }

  try {
    return await axios(config);
  } catch (e) {
    throw e;
  }
};
