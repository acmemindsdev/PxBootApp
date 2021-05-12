import { fetchData } from 'src/services/Fetch';

interface IProps {
  dispatch: any;
  types: any;
  apiPath: string;
  params: object;
  token: string;
  onSuccess: any;
  onError: any;
}

// Client API Calll
export const clientCall = ({
  dispatch,
  types,
  apiPath,
  params,
  token,
  onSuccess,
  onError,
}: IProps) => {
  const { ACTION, SUCCESS, ERROR } = types;
  console.log('Types', ACTION, SUCCESS, ERROR);
  dispatch({
    type: ACTION,
  });

  return fetchData({
    path: apiPath,
    body: params,
    headers: { Authorization: token },
  })
    .then(json => {
      console.log('success:', json);
      const success = dispatch({
        type: SUCCESS,
        payload: json,
      });
      onSuccess && onSuccess(success);
    })
    .catch(err => {
      console.log('error:', err);
      const error = dispatch({
        type: ERROR,
        payload: err,
      });
      onError && onError(error);
    });
};
