import React, { Fragment } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import ForgotPassword from '../ForgotPassword';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from '../../../aws-exports';
import { StackActions } from '@react-navigation/native';

//import { Button } from 'react-native-paper';
import { withLogoLayout } from 'src/containers/layouts/AuthLayout';
import SignInLayout from './SignIn';
Amplify.configure(awsconfig);

export default withLogoLayout(SignInLayout);

/*const initialState = {
  username: '',
  password: '',
  code: '',
  new_password: '',
  user: {},
  authenticationCode: '',
  email: '',
  phone_number: '',
  showConfirmationForm: false,
  showLogin: false,
  showResetPassword: false,
};
const pushAction = StackActions.push('ForgotPassword', { user: 'Wojtek' });
export default class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    code: '',
    new_password: '',
    user: {},
    authenticationCode: '',
    email: '',
    phone_number: '',
    showConfirmationForm: false,
    showLogin: false,
    faceBookLogin: false,
    googleLogin: false,
    showResetPassword: false,
  };

  constructor(props: any) {
    super(props);
    Hub.listen('auth', data => {
      const { payload } = data;
      if (payload && payload.data) {
        this.onAuthEvent(payload);
        console.log(
          'A new auth event has happened: ',
          payload.data.username + ' has ' + JSON.stringify(payload.data),
        );
      } else {
        this.setState({ faceBookLogin: false });
      }
    });
  }

  onAuthEvent(payload: any) {
    if (payload && payload.value) {
      this.setState({ faceBookLogin: true });
    } else {
      this.setState({ faceBookLogin: false });
    }
  }

  // state = initialState;
  onChangeText = (key: string, value: string) => {
    this.setState({ [key]: value });
  };
  signIn = async () => {
    const { username, password } = this.state;
    try {
      const user = await Auth.signIn(username, password);
      console.log('user successfully signed in!', user);
      this.setState({ user, showLogin: true });
    } catch (err) {
      console.log('error:', err);
    }
  };

  signUp = async () => {
    const { username, password, email, phone_number } = this.state;
    try {
      const success = await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number },
      });
      console.log('user successfully signed up!: ', success);
      this.setState({ showConfirmationForm: true });
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };
  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state;
    try {
      const user = await Auth.confirmSignUp(username, authenticationCode);
      console.log('successully signed up!', user);
      alert('User signed up successfully!');
      this.setState({ ...initialState });
    } catch (err) {
      console.log('error confirming signing up: ', err);
    }
  };

  confirmSignIn = async () => {
    const { user, authenticationCode } = this.state;
    try {
      await Auth.confirmSignIn(user, authenticationCode);
      console.log('user successfully signed in!', user);
    } catch (err) {
      console.log('error:', err);
    }
  };

  signOut = async () => {
    try {
      await Auth.signOut();
      console.log('user successfully signed out!');
      this.setState({ showLogin: false });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  forgotPassword = async () => {
    const { username } = this.state;
    try {
      await Auth.forgotPassword(username);
      console.log('Forgot Password Requested Sent');
      this.setState({ showResetPassword: true });
    } catch (err) {
      console.log('error Forgot Password Requested: ', err);
    }
  };

  forgotPasswordSubmit = async () => {
    const { username, new_password, code } = this.state;
    try {
      await Auth.forgotPasswordSubmit(username, code, new_password);
      console.log('Password Changed Successfully');
      alert('Password Changed Successfully');
      this.setState({ showResetPassword: false });
    } catch (err) {
      console.log('error Forgot Password Submit: ', err);
    }
  };

  resendVerificationCode = async () => {
    const { username } = this.state;
    try {
      await Auth.resendSignUp(username);
      console.log('Resend Code Successfully');
    } catch (err) {
      console.log('error Resend Code: ', err);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            {!this.state.showConfirmationForm && (
              <Fragment>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  onChangeText={val => this.onChangeText('password', val)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  onChangeText={val => this.onChangeText('email', val)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  onChangeText={val => this.onChangeText('phone_number', val)}
                />
                <Button title={'Sign Up'} onPress={this.signUp}></Button>
              </Fragment>
            )}
            {this.state.showConfirmationForm && (
              <Fragment>
                <TextInput
                  style={styles.input}
                  placeholder="Authentication code"
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  onChangeText={val =>
                    this.onChangeText('authenticationCode', val)
                  }
                />
                <Button title="Confirm Sign Up" onPress={this.confirmSignUp} />
              </Fragment>
            )}
            {!this.state.showLogin && (
              <Fragment>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="white"
                  onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  autoCapitalize="none"
                  // secureTextEntry={true}
                  placeholderTextColor="white"
                  onChangeText={val => this.onChangeText('password', val)}
                />
                <Button title="Sign In" onPress={this.signIn} />
              </Fragment>
            )}
            {this.state.showLogin && (
              <Fragment>
                <Text>Successful Login</Text>
                <Button title="Sign Out" onPress={this.signOut} />
              </Fragment>
            )}
            {!this.state.showResetPassword && (
              <Fragment>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="white"
                  onChangeText={val => this.onChangeText('username', val)}
                />
                <Button
                  title="Forgot Password"
                  onPress={() => {
                    this.props.navigation.dispatch(pushAction);
                  }}
                />
              </Fragment>
            )}
            {this.state.showResetPassword && (
              <Fragment>
                <TextInput
                  style={styles.input}
                  placeholder="Verification Code"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="white"
                  onChangeText={val => this.onChangeText('code', val)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  autoCapitalize="none"
                  // secureTextEntry={true}
                  placeholderTextColor="white"
                  onChangeText={val => this.onChangeText('new_password', val)}
                />
                <Button title="Submit" onPress={this.forgotPasswordSubmit} />
              </Fragment>
            )}
            <Button
              title="Resend Verification Code"
              onPress={this.resendVerificationCode}
            />
            {this.state.faceBookLogin ? (
              <Button
                title="Sign Out Facebook"
                onPress={() => Auth.signOut()}
              />
            ) : (
              <Button
                title="Sign in with Facebook"
                onPress={() =>
                  Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Facebook,
                  })
                }
              />
            )}
            {this.state.googleLogin ? (
              <Button title="Sign Out Google" onPress={() => Auth.signOut()} />
            ) : (
              <Button
                title="Sign in with Google"
                onPress={() =>
                  Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Google,
                  })
                }
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14,
  },
  container: {
    flex: 1,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
*/
