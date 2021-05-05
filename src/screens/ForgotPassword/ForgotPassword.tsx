import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  BottomView,
} from './ForgotPassword.styled';
import { MobileNumberInput, FormItem } from 'src/components';
import { ContainedButton, TextButton } from 'src/components/Button';
import { Text1, FontWeights } from 'src/components/Typography';
import theme from 'src/theme';
import { connect } from 'react-redux';
import { requestForgotPassword } from 'src/state/auth/authActions';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { NavigationScreen } from 'src/navigation/Navigator';
import { Controller, useForm } from 'react-hook-form';

interface IProps {
  navigation: any;
  requestForgotPassword: any;
}

const ForgotPassword = ({ navigation, requestForgotPassword }: IProps) => {
  const [submitEnable, setSubmitEnable] = useState(false);
  const [dialCode, setDialCode] = useState('');
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');

  type FormData = {
    mobileNumber: string;
  };

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const userName = `+${dialCode}${data.mobileNumber}`;
    requestForgotPassword(
      userName,
      () => {
        navigation?.push(NavigationScreen.resetPassword, {});
      },
      (error: any) => {
        if (get(error, 'payload.code', '') === 'UserNotFoundException') {
          setFetchErrorMessage(
            'This account does not exist. Register to create account.',
          );
        } else {
          setFetchErrorMessage('Something went wrong, Please try again later.');
        }
      },
    );
  };

  const checkSubmitDisabled = () => {
    const value = getValues();
    if (value.mobileNumber !== '') {
      setSubmitEnable(true);
    } else {
      setSubmitEnable(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <>
          <FormItem>
            <Controller
              name="mobileNumber"
              control={control}
              defaultValue=""
              rules={{
                validate: {
                  valid: v => v.length === 10,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <MobileNumberInput
                  navigation={navigation}
                  onChangeDialCode={code => setDialCode(code)}
                  onChangeMobileNumber={number => {
                    onChange(number);
                    checkSubmitDisabled();
                  }}
                  error={!!errors.mobileNumber || !isEmpty(fetchErrorMessage)}
                  errorText={
                    errors.mobileNumber?.type === 'valid'
                      ? 'Phone number invalid'
                      : fetchErrorMessage
                  }
                />
              )}
            />
          </FormItem>
          <ActionButtonContainer>
            <ContainedButton
              fullWidth
              disabled={!(dialCode && submitEnable)}
              onPress={handleSubmit(onSubmit)}>
              {'Send Reset Code'}
            </ContainedButton>
          </ActionButtonContainer>
        </>
        <BottomView>
          <TextButton
            style={{ bottom: 0, alignSelf: 'flex-end' }}
            onPress={() =>
              navigation?.navigate(NavigationScreen.signUpOptions, {})
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

export default connect(state => ({}), {
  requestForgotPassword,
})(ForgotPassword);
