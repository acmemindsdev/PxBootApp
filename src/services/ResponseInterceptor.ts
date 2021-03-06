import axios, { AxiosError, AxiosResponse } from 'axios';
import getEnvVars from 'src/environment';

/** Successful response. */
export class FetchResponse<T = any> {
  public data: T;

  constructor(axiosResponse: AxiosResponse) {
    this.data = axiosResponse.data;
  }
}

export class ErrorResponse {
  title: string;
  detail: string;

  asString(): string {
    return this.detail ? ` Details: ${this.detail}` : this.title;
  }

  constructor(title: string, detail: string) {
    this.title = title;
    this.detail = detail;
  }
}

type ErrorType = 'httpError' | 'networkError';

export class FetchError {
  static HTTP_ERROR: ErrorType = 'httpError';
  static NETWORK_ERROR: ErrorType = 'networkError';

  isFetchError: boolean = true;

  errorDetails: AxiosError;

  errorType: ErrorType;

  errorResponse: ErrorResponse;

  get message(): string {
    return this.errorDetails.message;
  }

  get isHttpError(): boolean {
    return this.errorType === FetchError.HTTP_ERROR;
  }
  get isNetworkError(): boolean {
    return this.errorType === FetchError.NETWORK_ERROR;
  }

  get httpStatus(): number {
    return this.errorDetails.response?.status
      ? this.errorDetails.response.status
      : -1;
  }

  asString(): string {
    return this.errorResponse.asString();
  }
}

const httpStatusToTitle = (status: number): string => {
  switch (status) {
    case 401:
      return 'Not authenticated';
    case 403:
      return 'Not authorized';
    case 404:
      return 'Not found';
    case 407:
      return 'Not authorized (proxy)';
    case 413:
      return 'Request too large';
    case 503:
      return 'Temporarily unavailable';
    case 504:
      return 'Timeout';
    default:
      break;
  }
  if (Math.floor(status / 100) === 5) {
    return 'Server error';
  } else if (Math.floor(status / 100) === 4) {
    return 'Invalid request';
  } else {
    return 'Unhandled Error';
  }
};

/** Error response. */
export class HttpError extends FetchError {
  constructor(errorDetails: AxiosError) {
    super();

    this.errorType = FetchError.HTTP_ERROR;

    const { response } = errorDetails;
    if (response) {
      this.errorResponse = new ErrorResponse(
        httpStatusToTitle(response.status),
        response.data,
      );
    }
  }
}

export class NetworkError extends FetchError {
  constructor(errorDetails: AxiosError) {
    super();

    this.errorDetails = errorDetails;
    this.errorType = FetchError.NETWORK_ERROR;

    this.errorResponse = new ErrorResponse(
      'Network Error',
      `Please check your connection or contact support`,
    );
  }
}

export const responseInterceptorOnSuccess = (response: AxiosResponse): any => {
  return new FetchResponse(response);
};

export const responseInterceptorOnError = (error: AxiosError) => {
  if (axios.isCancel(error)) {
    return Promise.reject({
      response: {
        data: error,
      },
    });
  }

  if (error.isAxiosError) {
    // No response object means that it is a network error
    if (!error.response) {
      const errorObj = new NetworkError(error);
      return Promise.reject(errorObj);
    }

    // UnAuthorized
    if (401 === error.response.status) {
      // getStore().dispatch(commonOp.logout());
      return Promise.reject(new HttpError(error));
    }
    return Promise.reject(new HttpError(error));
  } else {
    const { isDevelopment } = getEnvVars();
    /**
     * @NOTE: This kind of errors not possible, because axios config created manually
     * But we cover this case, to order to avoid future code changes in `try` block
     */
    if (isDevelopment) {
      console.error('Please review Axios configs, actual Error: ', error);
    }
    console.log(error);

    return Promise.reject(error);
  }
};
