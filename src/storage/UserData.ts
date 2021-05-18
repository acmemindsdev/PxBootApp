import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import TokenBridge from './Token.bridge';

/**
 * Store User information after login
 * @params : Object of login information
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
    console.log('Token store successfully');
  } else {
    console.log('login information is empty');
  }
};
