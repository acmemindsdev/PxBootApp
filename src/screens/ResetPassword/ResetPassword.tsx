import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, Keyboard } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  CombineTextView,
  SnackbarStyled,
} from './ResetPassword.styled';
import { PasswordHint, TextInput, FormItem } from 'src/components';
import { ContainedButton, TextButton } from 'src/components/Button';
import { Text1, FontWeights } from 'src/components/Typography';
import theme from 'src/theme';
import { connect } from 'react-redux';
import {
  requestForgotPassword,
  forgotPasswordSubmit,
} from 'src/state/auth/authActions';
import { getUserName } from 'src/state/auth/authReducer';
import { Controller, useForm } from 'react-hook-form';
import useYupValidationResolver from 'src/validation/resolver';
import { resetPasswordSchema } from 'src/validation/authValidation';
import get from 'lodash/get';
import { NavigationScreen } from 'src/navigation/Navigator';

interface IProps {
  navigation: any;
  requestForgotPassword: any;
  forgotPasswordSubmit: any;
  userName: string;
}

const ResetPassword = (props: IProps) => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [activeNewPasswordInput, setActiveNewPasswordInput] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showButtonLoader, setShowButtonLoader] = useState(false);

  type FormData = {
    code: string;
    new_password: string;
    confirm_password: string;
  };

  const resolver = useYupValidationResolver(resetPasswordSchema);
  const {
    getValues,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
    defaultValues: {
      code: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data, 'data');
    setShowButtonLoader(true);
    props.forgotPasswordSubmit(
      props.userName,
      data.code,
      data.confirm_password,
      () => {
        props.navigation?.push(NavigationScreen.resetPasswordSuccess, {});
        setShowButtonLoader(false);
      },
      (error: any) => {
        setShowButtonLoader(false);
        if (
          get(error, 'payload.code', '') === 'ExpiredCodeException' ||
          get(error, 'payload.code', '') === 'CodeMismatchException'
        ) {
          setError('code', {
            type: 'manual',
            message: 'Incorrect code',
          });
        }
        console.log('tessssst data', error);
      },
    );
  };

  const checkSubmitDisabled = () => {
    if (
      getValues().confirm_password.length === 0 ||
      getValues().code.length === 0
    ) {
      setSubmitEnable(false);
    } else {
      setSubmitEnable(true);
    }
  };

  const resendCode = () => {
    Keyboard.dismiss();

    props.requestForgotPassword(
      props.userName,
      () => {
        setShowSnackbar(true);
        setSnackbarMessage('Code Sent Successfully');
      },
      () => {
        setShowSnackbar(true);
        setSnackbarMessage('Something went wrong, Please Try again later');
      },
    );
  };

  useEffect(() => {
    checkSubmitDisabled();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <CombineTextView>
          <Text1 style={{ opacity: 0.6 }} color={theme.colors.black90}>
            {'Did not receive Code? '}
          </Text1>
          <TouchableOpacity onPress={resendCode}>
            <Text1 fontWeight={FontWeights.bold} color={theme.colors.primary}>
              {'Resend SMS'}
            </Text1>
          </TouchableOpacity>
        </CombineTextView>
        <FormItem>
          <Controller
            name="code"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password Reset Code"
                onChangeText={text => {
                  onChange(text);
                  checkSubmitDisabled();
                }}
                value={value}
                error={!!errors.code}
                errorText={errors.code?.message}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="new_password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  label="New Password"
                  secureTextEntry={true}
                  onChangeText={text => {
                    onChange(text);
                  }}
                  value={value}
                  textContentType={'oneTimeCode'}
                  onFocus={() => setActiveNewPasswordInput(true)}
                  onBlur={() => setActiveNewPasswordInput(false)}
                  error={false}
                  errorText={''}
                />
                {activeNewPasswordInput && (
                  <PasswordHint
                    passwordText={value}
                    isValid={(value: boolean) => {
                      setIsValidPassword(value);
                      checkSubmitDisabled();
                    }}
                  />
                )}
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="confirm_password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Confirm Password"
                secureTextEntry={true}
                onChangeText={text => {
                  onChange(text);
                  checkSubmitDisabled();
                }}
                value={value}
                textContentType={'oneTimeCode'}
                error={!!errors.confirm_password}
                errorText={errors.confirm_password?.message}
              />
            )}
          />
        </FormItem>
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            loading={showButtonLoader}
            disabled={!(submitEnable && isValidPassword)}
            onPress={handleSubmit(onSubmit)}>
            {'Reset'}
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
    userName: getUserName(state),
  }),
  {
    requestForgotPassword,
    forgotPasswordSubmit,
  },
)(ResetPassword);
