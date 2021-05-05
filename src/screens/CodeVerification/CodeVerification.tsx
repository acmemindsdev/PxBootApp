import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  OTPInputsContainer,
  OtpInputsStyled,
  InputTitleText,
  CombineTextView,
  ErrorText,
  styles,
} from './CodeVerification.syled';
import { ContainedButton } from 'src/components/Button';
import { connect } from 'react-redux';
import {
  confirmRegistration,
  resendRegistrationCode,
} from 'src/state/auth/authActions';
import { getUserName } from 'src/state/auth/authReducer';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { NavigationScreen } from 'src/navigation/Navigator';
import { Controller, useForm } from 'react-hook-form';
import { OtpInputsRef } from 'react-native-otp-inputs';
import { FontWeights, Text1 } from 'src/components/Typography';
import theme from 'src/theme';
import { rgba } from 'polished';

interface IProps {
  navigation: any;
  username: string;
  confirmRegistration: any;
  resendRegistrationCode: any;
}

const CodeVerification = (props: IProps) => {
  const [code, setCode] = useState('');
  const [submitEnable, setSubmitEnable] = useState(false);
  const [fetchError, setFetchError] = useState(false);
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

  const onSubmit = () => {
    setFetchError(false);
    props.confirmRegistration(
      {
        username: props.username,
        authenticationCode: code,
      },
      () => {
        props.navigation?.push(NavigationScreen.verificationSuccess, {});
      },
      (error: any) => {
        props.navigation?.push(NavigationScreen.verificationSuccess, {});
        setFetchError(true);
        console.log('error', error);
      },
    );
  };

  const resendCode = () => {
    props.resendRegistrationCode(props.username);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <OTPInputsContainer>
          <InputTitleText>
            {'Please enter code to confirm registration'}
          </InputTitleText>
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
              setFetchError(false);
            }}
            numberOfInputs={4}
          />
          {fetchError && <ErrorText>{'Code Invalid/Expired'}</ErrorText>}
        </OTPInputsContainer>
        <CombineTextView>
          <Text1 color={rgba(theme.colors.black90, 0.6)}>
            {'Did not receive Code? '}
          </Text1>
          <TouchableOpacity onPress={resendCode}>
            <Text1 fontWeight={FontWeights.bold} color={theme.colors.primary}>
              {'Resend SMS'}
            </Text1>
          </TouchableOpacity>
        </CombineTextView>
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            disabled={code.length !== 4}
            onPress={onSubmit}>
            {'Verify'}
          </ContainedButton>
        </ActionButtonContainer>
      </MainView>
    </>
  );
};

export default connect(
  state => ({
    username: getUserName(state),
  }),
  {
    confirmRegistration,
    resendRegistrationCode,
  },
)(CodeVerification);
