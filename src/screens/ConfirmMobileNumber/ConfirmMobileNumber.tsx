import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { MainView, ActionButtonContainer } from './ConfirmMobileNumber.styled';
import { MobileNumberInput, FormItem } from 'src/components';
import { ContainedButton } from 'src/components/Button';
import { connect } from 'react-redux';
import { requestForgotPassword } from 'src/services/CognitoMethods';
import { getAuthorizeToken, getUserName } from 'src/state/auth/authReducer';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { NavigationScreen } from 'src/navigation/Navigator';
import { Controller, useForm } from 'react-hook-form';
import { fetchMobileOTP, setMobileNumber } from 'src/state/auth/authActions';

interface IProps {
  navigation: any;
  fetchMobileOTP: any;
  setMobileNumber: any;
  userName: string;
  token: string;
}

const ConfirmMobileNumber = ({
  navigation,
  fetchMobileOTP,
  setMobileNumber,
  userName,
  token,
}: IProps) => {
  const [dialCode, setDialCode] = useState('');
  const [submitEnable, setSubmitEnable] = useState(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [showButtonLoader, setShowButtonLoader] = useState(false);

  type FormData = {
    mobileNumber: string;
  };

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const mobileNumber = `+${dialCode}${data.mobileNumber}`;
    setShowButtonLoader(true);

    fetchMobileOTP(
      mobileNumber,
      token,
      response => {
        setShowButtonLoader(false);
        console.log('Payload', response);
        if (get(response, 'payload.data.otp', '') !== '') {
          setMobileNumber(mobileNumber);

          navigation?.push(NavigationScreen.codeVerification, {
            fromSocial: true,
          });
        } else {
          setError('mobileNumber', {
            type: 'manual',
            message: get(
              response,
              'payload.data.message',
              'Something went wrong, Please try again later.',
            ),
          });
        }
      },
      (error: any) => {
        setShowButtonLoader(false);
        if (get(error, 'payload.code', '') === 'UserNotFoundException') {
          setError('mobileNumber', {
            type: 'manual',
            message: 'This account does not exist. Register to create account.',
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
                error={!!errors.mobileNumber}
                errorText={
                  errors.mobileNumber?.type === 'valid'
                    ? 'Phone number invalid'
                    : errors.mobileNumber?.message
                }
              />
            )}
          />
        </FormItem>
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            loading={showButtonLoader}
            disabled={!(dialCode && submitEnable)}
            onPress={handleSubmit(onSubmit)}>
            {'Send Code'}
          </ContainedButton>
        </ActionButtonContainer>
      </MainView>
    </>
  );
};

export default connect(
  state => ({
    userName: getUserName(state),
    token: getAuthorizeToken(state),
  }),
  {
    fetchMobileOTP,
    setMobileNumber,
  },
)(ConfirmMobileNumber);
