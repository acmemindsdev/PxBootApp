import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { MainView, ActionButtonContainer } from './ConfirmMobileNumber.styled';
import { MobileNumberInput, FormItem } from 'src/components';
import { ContainedButton } from 'src/components/Button';
import { connect } from 'react-redux';
import { requestForgotPassword } from 'src/state/auth/authActions';
import { getDialCode } from 'src/state/auth/authReducer';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { NavigationScreen } from 'src/navigation/Navigator';
import { Controller, useForm } from 'react-hook-form';

interface IProps {
  navigation: any;
  requestForgotPassword: any;
}

const ConfirmMobileNumber = ({ navigation, requestForgotPassword }: IProps) => {
  const [dialCode, setDialCode] = useState('');
  const [submitEnable, setSubmitEnable] = useState(false);
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
    requestForgotPassword(userName).then(response => {
      if (get(response, 'type') === 'FORGOT_PASSWORD_SUCCESS') {
        console.log('tedst data', response);
        navigation?.push(NavigationScreen.resetPassword, {});
      } else {
        console.log('tessssst data', response);
        if (get(response, 'payload.code', '') === 'UserNotFoundException') {
          setFetchErrorMessage(
            'This account does not exist. Register to create account.',
          );
        } else {
          setFetchErrorMessage('Something went wrong, Please try again later.');
        }
      }
    });
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
            {'Send Code'}
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
    requestForgotPassword,
  },
)(ConfirmMobileNumber);
