import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StatusBar } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  OTPInputsContainer,
  OtpInputsStyled,
  styles,
} from './CodeVerification.syled';
import { Title } from 'src/components/Typography';
import { ContainedButton } from 'src/components/Button';
import { connect } from 'react-redux';
import { requestForgotPassword } from 'src/state/auth/authActions';
import { getDialCode } from 'src/state/auth/authReducer';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { NavigationScreen } from 'src/navigation/Navigator';
import { Controller, useForm } from 'react-hook-form';
import { OtpInputsRef } from 'react-native-otp-inputs';

interface IProps {
  navigation: any;
  requestForgotPassword: any;
}

type RNPTitleProps = React.ComponentProps<typeof Title>;

const CodeVerification = ({ navigation, requestForgotPassword }: IProps) => {
  const [code, setCode] = useState('');
  const [submitEnable, setSubmitEnable] = useState(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');

  const otpRef = useRef<OtpInputsRef>();

  const focusOTP = useCallback(() => {
    otpRef.current?.focus();
  }, []);

  const resetOTP = useCallback(() => {
    otpRef.current?.reset();
  }, []);

  useEffect(() => {
    console.log('ref is', JSON.stringify(otpRef));
  }, [otpRef]);

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
    // const userName = `+${dialCode}${data.mobileNumber}`;
    // requestForgotPassword(userName).then(response => {
    //   if (get(response, 'type') === 'FORGOT_PASSWORD_SUCCESS') {
    //     console.log('tedst data', response);
    //     navigation?.push(NavigationScreen.resetPassword, {});
    //   } else {
    //     console.log('tessssst data', response);
    //     if (get(response, 'payload.code', '') === 'UserNotFoundException') {
    //       setFetchErrorMessage(
    //         'This account does not exist. Register to create account.',
    //       );
    //     } else {
    //       setFetchErrorMessage('Something went wrong, Please try again later.');
    //     }
    //   }
    // });
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
        <OTPInputsContainer>
          <OtpInputsStyled
            ref={otpRef}
            autofillFromClipboard={true}
            clearTextOnFocus={true}
            selectTextOnFocus={false}
            inputContainerStyles={styles.inputContainerStyles}
            inputStyles={[
              styles.inputStyles,
              code.length === 4 && styles.filled,
            ]}
            handleChange={code => {
              setCode(code);
              console.log(code);
            }}
            numberOfInputs={4}
          />
        </OTPInputsContainer>
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            disabled={false}
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
)(CodeVerification);
