import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
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
import { connect } from 'react-redux';
import {
  registerUser,
  forgotPasswordSubmit,
  REGISTER_USER_SUCCESS,
} from 'src/state/auth/authActions';
import { getUserName } from 'src/state/auth/authReducer';
import { Controller, useForm } from 'react-hook-form';
import useYupValidationResolver from 'src/validation/resolver';
import { signUpSchema } from 'src/validation/authValidation';
import get from 'lodash/get';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

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
    // Phone number and also username
    const phoneNumber = `+${dialCode}${data.mobileNumber}`;
    props
      .registerUser(
        phoneNumber,
        data.firstName,
        data.lastName,
        phoneNumber,
        data.dateOfBirth,
        data.email,
        data.confirmPassword,
      )
      .then(payload => {
        if (get(payload, 'type') === REGISTER_USER_SUCCESS) {
          console.log('tedst data', payload);
          props.navigation?.push('Reset Password Success', {});
        } else {
          console.log('tessssst data', payload);
        }
      });
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
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    console.log('A date has been picked: ', date);
    const dateValue = moment(date).format('DD/MM/YYYY');
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
              <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                  label="Date of Birth"
                  onChangeText={text => {
                    onChange(text);
                    checkSubmitDisabled();
                  }}
                  value={value}
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
                ? moment(getValues('dateOfBirth'), 'DD/MM/YYYY').toDate()
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
    registerUser,
    forgotPasswordSubmit,
  },
)(SignUp);
