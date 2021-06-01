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
  SnackbarStyled,
  styles,
} from './CodeVerification.styled';
import { ContainedButton } from 'src/components/Button';
import { connect } from 'react-redux';
import {
  confirmRegistration,
  resendRegistrationCode,
} from 'src/services/CognitoMethods';
import { fetchMobileOTP, verifyMobileOTP } from 'src/state/auth/authActions';
import { getUserName, getMobileNumber } from 'src/state/auth/authReducer';
import get from 'lodash/get';
import { NavigationScreen } from 'src/navigation/Navigator';
import { OtpInputsRef } from 'react-native-otp-inputs';
import { FontWeights, Text1 } from 'src/components/Typography';
import theme from 'src/theme';
import { rgba } from 'polished';

interface IProps {
  navigation: any;
  username: string;
  mobileNumber: string;
  confirmRegistration: any;
  resendRegistrationCode: any;
  fetchMobileOTP: any;
  verifyMobileOTP: any;
}

const CodeVerification = (props: IProps) => {
  const [code, setCode] = useState('');
  const [fetchError, setFetchError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showButtonLoader, setShowButtonLoader] = useState(false);

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

  const onSubmit = () => {
    setFetchError(false);
    setShowButtonLoader(true);
    // check Code Verification for add number on social sign up
    const addMobileToSocialAccount = get(
      props,
      'route.params.fromSocial',
      false,
    );

    if (addMobileToSocialAccount) {
      // Verify OTP and Add number on social account
      props.verifyMobileOTP(
        code,
        props.mobileNumber,
        response => {
          setShowButtonLoader(false);
          if (get(response, 'payload.data.verified', false) === true) {
            props.navigation?.push(NavigationScreen.verificationSuccess, {});
          } else {
            setFetchError(true);
          }
        },
        (error: any) => {
          setShowButtonLoader(false);
          setFetchError(true);
          console.log('error', error);
        },
      );
    } else {
      // Confirm manual sign up
      props.confirmRegistration(
        {
          username: props.username,
          authenticationCode: code,
        },
        () => {
          setShowButtonLoader(false);
          props.navigation?.push(NavigationScreen.verificationSuccess, {});
        },
        (error: any) => {
          setShowButtonLoader(false);
          setFetchError(true);
          console.log('error', error);
        },
      );
    }
  };

  const resendCode = () => {
    // check Code Verification for add number on social sign up
    const addMobileToSocialAccount = get(
      props,
      'route.params.fromSocial',
      false,
    );

    if (addMobileToSocialAccount) {
      // Resend OTP on Mobile Number
      props.fetchMobileOTP(
        props.mobileNumber,
        response => {
          console.log('Payload', response);
          if (get(response, 'payload.data.otp', '') !== '') {
            setShowSnackbar(true);
            setSnackbarMessage('Code Sent Successfully');
          } else {
            setShowSnackbar(true);
            setSnackbarMessage('Something went wrong, Please Try again later');
          }
        },
        (error: any) => {
          setShowSnackbar(true);
          setSnackbarMessage('Something went wrong, Please Try again later');
        },
      );
    } else {
      // Resend Authentication Code for Confirm Sign up
      props.resendRegistrationCode(
        props.username,
        () => {
          setShowSnackbar(true);
          setSnackbarMessage('Code Sent Successfully');
        },
        () => {
          setShowSnackbar(true);
          setSnackbarMessage('Something went wrong, Please Try again later');
        },
      );
    }
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
              code.length === 6 && styles.filled,
            ]}
            handleChange={(code: string) => {
              setCode(code);
              setFetchError(false);
            }}
            numberOfInputs={6}
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
            loading={showButtonLoader}
            fullWidth
            disabled={code.length !== 6}
            onPress={onSubmit}>
            {'Verify'}
          </ContainedButton>
        </ActionButtonContainer>
        <SnackbarStyled
          visible={showSnackbar}
          duration={2000}
          onDismiss={() => setShowSnackbar(false)}>
          {snackbarMessage}
        </SnackbarStyled>
      </MainView>
    </>
  );
};

export default connect(
  state => ({
    username: getUserName(state),
    mobileNumber: getMobileNumber(state),
  }),
  {
    confirmRegistration,
    resendRegistrationCode,
    verifyMobileOTP,
    fetchMobileOTP,
  },
)(CodeVerification);
