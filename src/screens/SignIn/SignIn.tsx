import React, { useEffect, useState } from 'react';
import {
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
import { connect } from 'react-redux';
import {
  setSelectedCountry,
  requestLogin,
  socialLogin,
} from 'src/state/auth/authActions';
import {
  getDialCode,
  isLoading,
  fetchError,
  getLoginData,
  fetchErrorMessage,
} from 'src/state/auth/authReducer';
import { NavigationScreen } from 'src/navigation/Navigator';
// import { requestLogin } from 'src/services/cognitoMethods';

Amplify.configure(awsconfig);

interface IProps {
  navigation?: any;
  requestLogin?: any;
  responseData?: any;
  fetchError?: boolean;
  errorMessage?: string;
}

const SignInLayout = ({
  navigation,
  requestLogin,
  responseData,
  fetchError,
  errorMessage,
}: IProps) => {
  const [number, setNumber] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = () => {
    const userName = `+${dialCode}${number}`;
    requestLogin(userName, password);
  };

  useEffect(() => {
    console.log('data is', responseData);
  }, [responseData]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainView>
        <MobileNumberInput
          navigation={navigation}
          onChangeDialCode={code => setDialCode(code)}
          onChangeMobileNumber={number => setNumber(number)}
          error={fetchError}
        />
        <PasswordInput
          label="Password"
          secureTextEntry={showPassword}
          rightIcon={<PasswordIcon size={25} name="eye-off-outline" />}
          onIconPress={() => setShowPassword(!showPassword)}
          onChangeText={text => setPassword(text)}
          error={fetchError}
          errorText={errorMessage}
        />
        <TextButton
          align="right"
          onPress={() => navigation?.push('Forgot Password', {})}>
          {'Forgot Password?'}
        </TextButton>
        <ContainedButton
          fullWidth
          onPress={handleLogin}
          disabled={!(dialCode && number && password)}>
          {'Log In'}
        </ContainedButton>
        <SocialLogin navigation={navigation} />
        <BottomView>
          <TextButton
            style={{ bottom: 0, alignSelf: 'flex-end' }}
            onPress={() =>
              navigation?.push(NavigationScreen.signUpOptions, {})
            }>
            <Text1>{'New to PX Boost? '}</Text1>
            <Text1 color={theme.colors.primary} fontWeight={FontWeights.bold}>
              {'Register'}
            </Text1>
          </TextButton>
        </BottomView>
      </MainView>
    </>
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

export default connect(
  state => ({
    dialCode: getDialCode(state),
    responseData: getLoginData(state),
    loading: isLoading(state),
    fetchError: fetchError(state),
    errorMessage: fetchErrorMessage(state),
  }),
  {
    setSelectedCountry,
    requestLogin,
  },
)(SignInLayout);
