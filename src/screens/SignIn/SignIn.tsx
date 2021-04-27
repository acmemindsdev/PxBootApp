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
import { MobileNumberInput, SocialLogin } from 'src/components';
import {
  MainView,
  PasswordInput,
  PasswordIcon,
  BottomView,
} from './SignIn.styled';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContainedButton, TextButton } from 'src/components/Button';
import { Text1, FontWeights } from 'src/components/Typography';
import theme from 'src/theme';

Amplify.configure(awsconfig);

const SignInLayout = ({ navigation }) => {
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
  const pushAction = StackActions.push('Select a Country');
  return (
    <MainView>
      <StatusBar barStyle="dark-content" />
      <MobileNumberInput navigation={navigation} />
      <PasswordInput
        mode={'outlined'}
        label="Password"
        right={
          <PasswordInput.Icon
            name={() => <PasswordIcon size={25} name="eye-off-outline" />}
          />
        }
      />
      <TextButton
        align="right"
        onPress={() => navigation?.push('Forgot Password', {})}>
        {'Forgot Password?'}
      </TextButton>
      <ContainedButton fullWidth onPress={() => console.log('fdfd')}>
        {'Log In'}
      </ContainedButton>
      <SocialLogin navigation={navigation} />
      <BottomView>
        <TextButton style={{ bottom: 0, alignSelf: 'flex-end' }}>
          <Text1>{'New to PX Boost? '}</Text1>
          <Text1 color={theme.colors.primary} fontWeight={FontWeights.bold}>
            {'Register'}
          </Text1>
        </TextButton>
      </BottomView>
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
