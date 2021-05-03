import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  CombineTextView,
} from './SignUp.styled';
import {
  PasswordHint,
  TextInput,
  FormItem,
  MobileNumberInput,
} from 'src/components';
import { ContainedButton } from 'src/components/Button';
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

interface IProps {
  navigation: any;
  requestForgotPassword: any;
  forgotPasswordSubmit: any;
  userName: string;
}

const SignUp = (props: IProps) => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [activeNewPasswordInput, setActiveNewPasswordInput] = useState(false);

  type FormData = {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    dateOfBirth: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const resolver = useYupValidationResolver(resetPasswordSchema);
  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
    defaultValues: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data, 'data');
    props
      .forgotPasswordSubmit(
        'props.userName',
        data.firstName,
        data.confirmPassword,
      )
      .then(payload => {
        if (get(payload, 'type') != 'FORGOT_PASSWORD_SUCCESS') {
          console.log('tedst data', payload);
          props.navigation?.push('Reset Password Success', {});
        } else {
          console.log('tessssst data', payload);
        }
      });
  };

  const checkSubmitDisabled = () => {
    if (
      getValues().confirmPassword.length === 0 ||
      getValues().firstName.length === 0
    ) {
      setSubmitEnable(false);
    } else {
      setSubmitEnable(true);
    }
  };

  useEffect(() => {
    checkSubmitDisabled();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <FormItem>
          <Controller
            name="firstName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="First Name"
                onChangeText={text => {
                  onChange(text);
                  checkSubmitDisabled();
                }}
                value={value}
                error={!!errors.firstName}
                errorText={errors.firstName?.message}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Last Name"
                onChangeText={text => {
                  onChange(text);
                  checkSubmitDisabled();
                }}
                value={value}
                error={!!errors.lastName}
                errorText={errors.lastName?.message}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="mobileNumber"
            control={control}
            render={({ field: { onChange, value } }) => (
              <MobileNumberInput
                navigation={props.navigation}
                onChangeDialCode={code => {}}
                onChangeMobileNumber={number => {}}
                error={false}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Date of Birth"
                onChangeText={text => {
                  onChange(text);
                  checkSubmitDisabled();
                }}
                value={value}
                error={!!errors.dateOfBirth}
                errorText={errors.dateOfBirth?.message}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Email Address"
                onChangeText={text => {
                  onChange(text);
                  checkSubmitDisabled();
                }}
                value={value}
                error={!!errors.email}
                errorText={errors.email?.message}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  label="Password"
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
            name="confirmPassword"
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
                error={!!errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
              />
            )}
          />
        </FormItem>
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            disabled={!(submitEnable && isValidPassword)}
            onPress={handleSubmit(onSubmit)}>
            {'Register'}
          </ContainedButton>
        </ActionButtonContainer>
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
)(SignUp);
