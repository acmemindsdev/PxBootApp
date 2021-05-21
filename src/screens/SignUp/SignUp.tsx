import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, Keyboard } from 'react-native';
import { MainView, ActionButtonContainer, IconStyled } from './SignUp.styled';
import {
  PasswordHint,
  TextInput,
  FormItem,
  MobileNumberInput,
} from 'src/components';
import { ContainedButton } from 'src/components/Button';
import { connect } from 'react-redux';
import {
  registerUser,
  forgotPasswordSubmit,
} from 'src/services/CognitoMethods';
import { getUserName } from 'src/state/auth/authReducer';
import { Controller, useForm } from 'react-hook-form';
import useYupValidationResolver from 'src/validation/resolver';
import { signUpSchema } from 'src/validation/authValidation';
import get from 'lodash/get';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { NavigationScreen } from 'src/navigation/Navigator';

interface IProps {
  navigation: any;
  registerUser: any;
  forgotPasswordSubmit: any;
  userName: string;
}

const SignUp = (props: IProps) => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [activeNewPasswordInput, setActiveNewPasswordInput] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dialCode, setDialCode] = useState('');
  const [showButtonLoader, setShowButtonLoader] = useState(false);

  type FormData = {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    dateOfBirth: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const resolver = useYupValidationResolver(signUpSchema);
  const {
    getValues,
    setValue,
    handleSubmit,
    control,
    setError,
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
    Keyboard.dismiss();
    // Phone number and also username
    const phoneNumber = `+${dialCode}${data.mobileNumber}`;
    setShowButtonLoader(true);
    props.registerUser(
      phoneNumber,
      data.firstName,
      data.lastName,
      phoneNumber,
      data.dateOfBirth,
      data.email,
      data.confirmPassword,
      () => {
        alert('Authentication Code successfully sent on your number');
        // props.navigation?.push(NavigationScreen.codeVerification, {});
        setShowButtonLoader(false);
      },
      (error: any) => {
        setShowButtonLoader(false);
        if (get(error, 'payload.code', '') === 'UsernameExistsException') {
          setError('mobileNumber', {
            type: 'manual',
            message: 'The account already exists. Login to continue',
          });
        }
      },
    );
  };

  const checkSubmitDisabled = () => {
    const value = getValues();
    if (
      value.firstName !== '' &&
      value.lastName !== '' &&
      value.mobileNumber !== '' &&
      value.dateOfBirth !== '' &&
      value.email !== '' &&
      value.confirmPassword !== ''
    ) {
      setSubmitEnable(true);
    } else {
      setSubmitEnable(false);
    }
  };

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    console.log('A date has been picked: ', date);
    const dateValue = moment(date).format('MM/DD/YYYY');
    setValue('dateOfBirth', dateValue);
    hideDatePicker();
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
                onChangeDialCode={code => setDialCode(code)}
                onChangeMobileNumber={number => onChange(number)}
                error={!!errors.mobileNumber}
                errorText={errors.mobileNumber?.message}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                  label="Date of Birth"
                  onChangeText={text => {
                    onChange(text);
                    checkSubmitDisabled();
                  }}
                  value={value}
                  rightIcon={
                    <IconStyled size={25} name="calendar-range-outline" />
                  }
                  onIconPress={showDatePicker}
                  error={!!errors.dateOfBirth}
                  errorText={errors.dateOfBirth?.message}
                  pointerEvents="none"
                  focusable={false}
                  editable={false}
                />
              </TouchableOpacity>
            )}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            date={
              !isEmpty(getValues('dateOfBirth'))
                ? moment(getValues('dateOfBirth'), 'MM/DD/YYYY').toDate()
                : new Date()
            }
            mode="date"
            maximumDate={moment().subtract(2, 'years').toDate()}
            headerTextIOS="Select Birth Date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
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
                  onChange(text.trim());
                  checkSubmitDisabled();
                }}
                value={value.trim()}
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
                  autoCorrect={false}
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
                autoCorrect={false}
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
            loading={showButtonLoader}
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
    registerUser,
    forgotPasswordSubmit,
  },
)(SignUp);
