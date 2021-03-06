import React, { useEffect, useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import get from 'lodash/get';
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
import { requestLogin } from 'src/services/CognitoMethods';
import { setUsername } from 'src/state/auth/authActions';
import {
  isLoading,
  fetchError,
  getLoginData,
  fetchErrorMessage,
} from 'src/state/auth/authReducer';
import { NavigationScreen } from 'src/navigation/Navigator';
import { Controller, useForm } from 'react-hook-form';

interface IProps {
  navigation?: any;
  requestLogin?: any;
  responseData?: any;
  fetchError?: boolean;
  errorMessage?: string;
  loading?: boolean;
  setUsername?: any;
}

const SignInLayout = ({
  navigation,
  requestLogin,
  responseData,
  setUsername,
  loading,
}: IProps) => {
  const [dialCode, setDialCode] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loginEnable, setLoginEnable] = useState(false);

  type FormData = {
    mobileNumber: string;
    password: string;
  };

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin = (data: FormData) => {
    Keyboard.dismiss();
    const userName = `+${dialCode}${data.mobileNumber}`;
    requestLogin(
      userName,
      data.password,
      () => {
        console.log('Login Successful');
      },
      (error: any) => {
        if (
          get(error, 'payload.code', '') === 'UserNotFoundException' ||
          get(error, 'payload.code', '') === 'NotAuthorizedException'
        ) {
          setError('mobileNumber', {
            type: 'manual',
            message: 'Incorrect Mobile Number/Password. Try again',
          });
        } else if (
          get(error, 'payload.code', '') === 'UserNotConfirmedException'
        ) {
          // set user name to confirm sign up
          setUsername(userName);
          // Navigate to confirm verification code screen to confirm sign up
          navigation?.push(NavigationScreen.codeVerification, {
            needConfirmSignUp: true,
            password: data.password,
          });
        } else {
          setError('mobileNumber', {
            type: 'manual',
            message: 'Something went wrong, Please try again later.',
          });
        }
      },
    );
  };

  const checkLoginDisabled = () => {
    const value = getValues();
    if (value.mobileNumber !== '' && value.password !== '') {
      setLoginEnable(true);
    } else {
      setLoginEnable(false);
    }
  };

  useEffect(() => {
    console.log('data is', JSON.stringify(responseData));
  }, [responseData]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainView>
        <Controller
          name="mobileNumber"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <MobileNumberInput
              navigation={navigation}
              onChangeDialCode={code => {
                clearErrors('mobileNumber');
                setDialCode(code);
              }}
              onChangeMobileNumber={number => {
                onChange(number);
                checkLoginDisabled();
              }}
              error={!!errors.mobileNumber}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              testID="PasswordInputID"
              label="Password"
              secureTextEntry={showPassword}
              rightIcon={<PasswordIcon size={25} name="eye-off-outline" />}
              onIconPress={() => setShowPassword(!showPassword)}
              onChangeText={text => {
                clearErrors('mobileNumber');
                onChange(text);
                checkLoginDisabled();
              }}
              error={!!errors.mobileNumber}
              errorText={errors.mobileNumber?.message}
            />
          )}
        />
        <TextButton
          align="right"
          onPress={() => navigation?.push(NavigationScreen.forgotPassword, {})}>
          {'Forgot Password?'}
        </TextButton>
        <ContainedButton
          fullWidth
          loading={loading}
          onPress={handleSubmit(handleLogin)}
          disabled={!loginEnable}>
          {'Log In'}
        </ContainedButton>
        <SocialLogin navigation={navigation} />
        <BottomView>
          <TextButton
            style={{ bottom: 0, alignSelf: 'flex-end' }}
            onPress={() => {
              navigation?.push(NavigationScreen.signUpOptions, {});
            }}>
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

export default connect(
  state => ({
    responseData: getLoginData(state),
    loading: isLoading(state),
    fetchError: fetchError(state),
    errorMessage: fetchErrorMessage(state),
  }),
  {
    setUsername,
    requestLogin,
  },
)(SignInLayout);
