import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  CombineTextView,
  TextInputStyled,
  ContentView,
} from './ResetPassword.styled';
import { PasswordHint, TextInput } from 'src/components';
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

interface IProps {
  navigation: any;
}

const ResetPassword = ({ navigation }: IProps) => {
  const [username, setUsername] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [new_password, setNew_password] = useState('');
  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');
  const [dialCode, setDialCode] = useState('');

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
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <CombineTextView>
          <Text1>{'Did not receive Code? '}</Text1>
          <TouchableOpacity>
            <Text1 fontWeight={FontWeights.bold} color={theme.colors.primary}>
              {'Resend SMS'}
            </Text1>
          </TouchableOpacity>
        </CombineTextView>
        <ContentView>
          <TextInput
            label="Password Reset Code"
            onChangeText={() => {}}
            error={false}
            errorText={''}
          />
        </ContentView>
        <ContentView>
          <TextInput
            label="New Password"
            secureTextEntry={true}
            onChangeText={() => {}}
            error={false}
            errorText={''}
          />
          <PasswordHint passwordText={new_password} />
        </ContentView>
        <ContentView>
          <TextInput
            label="Confirm Password"
            secureTextEntry={true}
            onChangeText={() => {}}
            error={false}
            errorText={''}
          />
        </ContentView>
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            disabled={!(dialCode && number)}
            onPress={() => console.log('fdfd')}>
            {'Reset'}
          </ContainedButton>
        </ActionButtonContainer>
      </MainView>
    </>
  );
};

export default connect(
  state => ({
    dialCode: getDialCode(state),
  }),
  {
    setSelectedCountry,
  },
)(ResetPassword);
