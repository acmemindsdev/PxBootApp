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
import { NavigationScreen } from 'src/navigation/Navigator';
import { Controller, useForm } from 'react-hook-form';
import { fetchMobileOTP, setMobileNumber } from 'src/state/auth/authActions';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BIRTH_DATE_FORMAT } from 'src/constant';

interface IProps {
  navigation: any;
  fetchMobileOTP: any;
  setMobileNumber: any;
}

const AddBirthDate = ({
  navigation,
  fetchMobileOTP,
  setMobileNumber,
}: IProps) => {
  const [submitEnable, setSubmitEnable] = useState(false);
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  type FormData = {
    dateOfBirth: string;
  };

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Keyboard.dismiss();
    setShowButtonLoader(true);

    fetchMobileOTP(
      data.dateOfBirth,
      response => {
        setShowButtonLoader(false);
        console.log('Payload', response);
        if (get(response, 'payload.data.data.otp', '') !== '') {
          navigation?.push(NavigationScreen.codeVerification, {
            fromSocial: true,
          });
        } else {
          setError('dateOfBirth', {
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
    const dateValue = moment(date).format(BIRTH_DATE_FORMAT);
    setValue('dateOfBirth', dateValue);
    checkSubmitDisabled();
    hideDatePicker();
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
                ? moment(getValues('dateOfBirth'), BIRTH_DATE_FORMAT).toDate()
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
  fetchMobileOTP,
  setMobileNumber,
})(AddBirthDate);
