import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  BottomView,
} from './ForgotPassword.styled';
import { MobileNumberInput, SocialLogin } from 'src/components';
import { ContainedButton, TextButton } from 'src/components/Button';
import { Text1, FontWeights } from 'src/components/Typography';
import theme from 'src/theme';
import { connect } from 'react-redux';
import { setSelectedCountry } from 'src/state/auth/authActions';
import { getDialCode } from 'src/state/auth/authReducer';

import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from '../../../aws-exports';

Amplify.configure(awsconfig);

const ForgotPassword = ({ navigation }) => {
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
      <StatusBar barStyle="light-content" />
      <MobileNumberInput navigation={navigation} />
      <ActionButtonContainer>
        <ContainedButton
          fullWidth
          align="right"
          onPress={() => console.log('fdfd')}>
          {'Send Reset Code'}
        </ContainedButton>
      </ActionButtonContainer>
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

export default connect(
  state => ({
    dialCode: getDialCode(state),
  }),
  {
    setSelectedCountry,
  },
)(ForgotPassword);
