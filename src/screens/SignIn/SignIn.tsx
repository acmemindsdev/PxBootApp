import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from '../../../aws-exports';
import MobileNumberInput from 'src/components/MobileNumberInput';
import { MainView, PasswordInput, PasswordIcon } from './SignIn.styled';

Amplify.configure(awsconfig);

const SignInLayout = () => {
  const [username, setUsername] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [new_password, setNew_password] = useState('');
  const [code, setCode] = useState('');

  // state = initialState;
  const onChangeText = (key: string, value: string) => {
    if (key === 'username') {
      setUsername(value);
    }
    if (key === 'new_password') {
      setNew_password(value);
    }
    if (key === 'code') {
      setCode(value);
    }
  };

  const forgotPassword = async () => {
    try {
      await Auth.forgotPassword(username);
      console.log('Forgot Password Requested Sent');
      setShowResetPassword(true);
    } catch (err) {
      console.log('error Forgot Password Requested: ', err);
    }
  };

  const forgotPasswordSubmit = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, code, new_password);
      console.log('Password Changed Successfully');
      alert('Password Changed Successfully');
      setShowResetPassword(false);
    } catch (err) {
      console.log('error Forgot Password Submit: ', err);
    }
  };

  const resendVerificationCode = async () => {
    try {
      await Auth.resendSignUp(username);
      console.log('Resend Code Successfully');
    } catch (err) {
      console.log('error Resend Code: ', err);
    }
  };

  return (
    <MainView>
      <MobileNumberInput />
      <PasswordInput
        mode={'outlined'}
        label="Password"
        right={
          <PasswordInput.Icon
            name={() => <PasswordIcon size={25} name="eye-off-outline" />}
          />
        }
      />
      <View style={styles.container}>
        {!showResetPassword && (
          <Fragment>
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="white"
              onChangeText={val => onChangeText('username', val)}
            />
            <Button title="Forgot Password" onPress={forgotPassword} />
          </Fragment>
        )}
        {showResetPassword && (
          <Fragment>
            <TextInput
              style={styles.input}
              placeholder="Verification Code"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="white"
              onChangeText={val => onChangeText('code', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              autoCapitalize="none"
              // secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={val => onChangeText('new_password', val)}
            />
            <Button title="Submit" onPress={forgotPasswordSubmit} />
          </Fragment>
        )}
        <Button
          title="Resend Verification Code"
          onPress={resendVerificationCode}
        />
      </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  input: {
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

export default SignInLayout;
