import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

export const requestLogin = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log('user successfully signed in!', user);
  } catch (err) {
    console.log('error:', err);
  }
};
