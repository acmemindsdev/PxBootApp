import axios, { AxiosRequestConfig, Method } from 'axios';
import { requestInterceptor } from './RequestInterceptor';
import {
  FetchResponse,
  responseInterceptorOnError,
  responseInterceptorOnSuccess,
} from './ResponseInterceptor';
import { getAuthorizeToken } from 'src/state/auth/authReducer';
import { useSelector } from 'react-redux';

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

  //   if (noAuth === false) {
  //     headers.Authorization = token;
  //   }

  config.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };

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
