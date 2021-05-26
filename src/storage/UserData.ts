import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import AsyncStore from './AsyncStore';
import TokenBridge from './Token.bridge';
import { useSelector } from 'react-redux';
import { getLoginData } from 'src/state/auth/authReducer';

/**
 * Store User information after login
 * @param loginDetail : Object of login information
 */
export const fillLoginData = async (loginDetail: any) => {
  const jsonString = JSON.stringify(loginDetail);
  const loginData = JSON.parse(jsonString);
  if (!isEmpty(loginData)) {
    await TokenBridge.setTokens({
      id_token: get(loginData, 'signInUserSession.idToken.jwtToken', ''),
      access_token: get(
        loginData,
        'signInUserSession.accessToken.jwtToken',
        '',
      ),
      refresh_token: get(loginData, 'signInUserSession.refreshToken.token', ''),
    });
    await AsyncStore.setItem('loginData', loginData);
    console.log('Token store successfully');
  } else {
    console.log('login information is empty');
  }
};

/**
 * Get User information after login
 */
export const UserInfo = {
  userID: () => {
    const dataObj = useSelector(state => getLoginData(state));
    return get(dataObj, 'username', '');
  },
};
