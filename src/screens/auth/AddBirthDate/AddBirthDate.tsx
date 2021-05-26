import React, { useState } from 'react';
import { StatusBar, Keyboard, TouchableOpacity } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  IconStyled,
} from './AddBirthDate.styled';
import { FormItem, TextInput } from 'src/components';
import { ContainedButton } from 'src/components/Button';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { getSocialLoginData } from 'src/state/auth/authReducer';
import { Controller, useForm } from 'react-hook-form';
import { updateDateOfBirth, showOnboarding } from 'src/state/auth/authActions';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { DATE_FORMAT, DATE_FORMAT_SERVER } from 'src/constant';
import { UserInfo } from 'src/storage/UserData';
import { useSelector } from 'react-redux';
import { NavigationScreen } from 'src/navigation/Navigator';

interface IProps {
  navigation: any;
  updateDateOfBirth: any;
  showOnboarding: any;
}

const AddBirthDate = (prop: IProps) => {
  const [submitEnable, setSubmitEnable] = useState(false);
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const socialResponseData = useSelector(state => getSocialLoginData(state));

  // User Id
  const userId = UserInfo.userID();

  type FormData = {
    dateOfBirth: string;
  };

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Keyboard.dismiss();
    setShowButtonLoader(true);

    prop.updateDateOfBirth(
      userId,
      moment(data.dateOfBirth, DATE_FORMAT).format(DATE_FORMAT_SERVER),
      () => {
        setShowButtonLoader(false);
        const phoneVerified = get(
          socialResponseData,
          'signInUserSession.idToken.payload.phone_number_verified',
          false,
        );
        if (!phoneVerified) {
          // Check if phone number not verified then navigate to confirm mobile number screen
          prop.navigation?.push(NavigationScreen.confirmMobileNumber, {});
        } else {
          // Navigate to onboarding screen
          prop.showOnboarding(true);
        }
      },
      (error: any) => {
        setShowButtonLoader(false);
        if (get(error, 'payload.code', '') === 'UserNotFoundException') {
          setError('dateOfBirth', {
            type: 'manual',
            message: 'This account does not exist. Register to create account.',
          });
        } else {
          setError('dateOfBirth', {
            type: 'manual',
            message: 'Something went wrong, Please try again later.',
          });
        }
      },
    );
  };

  const checkSubmitDisabled = () => {
    const value = getValues();
    if (value.dateOfBirth !== '') {
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
    const dateValue = moment(date).format(DATE_FORMAT);
    setValue('dateOfBirth', dateValue);
    checkSubmitDisabled();
    hideDatePicker();
    clearErrors('dateOfBirth');
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
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
                ? moment(getValues('dateOfBirth'), DATE_FORMAT).toDate()
                : new Date()
            }
            mode="date"
            maximumDate={moment().subtract(2, 'years').toDate()}
            headerTextIOS="Select Birth Date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
        </FormItem>
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            loading={showButtonLoader}
            disabled={!submitEnable}
            onPress={handleSubmit(onSubmit)}>
            {'Next'}
          </ContainedButton>
        </ActionButtonContainer>
      </MainView>
    </>
  );
};

export default connect(() => ({}), {
  updateDateOfBirth,
  showOnboarding,
})(AddBirthDate);
