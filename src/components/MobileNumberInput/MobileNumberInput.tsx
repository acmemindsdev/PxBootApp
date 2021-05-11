import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ContainerView,
  CountryCodeInput,
  NumberInput,
  CountryCodeText,
  CountryCodeView,
  ErrorText,
} from './MobileNumberInput.styled';
import isEmpty from 'lodash/isEmpty';
import { StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getDialCode, getCountryCode } from 'src/state/auth/authReducer';
import { NavigationScreen } from 'src/navigation/Navigator';

type IProp = {
  navigation: any;
  onChangeDialCode: any;
  onChangeMobileNumber: any;
  error?: boolean;
  errorText?: string;
};

// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const MobileNumberInput = (prop: IProp) => {
  const [number, setNumber] = useState('');
  const pushAction = StackActions.push(NavigationScreen.selectCountry);
  const dialCode = useSelector(state => getDialCode(state));
  const countryCode = useSelector(state => getCountryCode(state));

  const rawNumber =
    number.length === 10
      ? phoneUtil.parseAndKeepRawInput(number, countryCode)
      : number;

  useEffect(() => {
    prop.onChangeDialCode(dialCode);
  }, [dialCode]);

  return (
    <>
      <ContainerView>
        <TouchableOpacity onPress={() => prop.navigation.dispatch(pushAction)}>
          <CountryCodeInput
            mode={'outlined'}
            render={() => (
              <CountryCodeView>
                <CountryCodeText>
                  {'+'}
                  {dialCode}
                </CountryCodeText>
                <Icon size={25} name="angle-down" />
              </CountryCodeView>
            )}
          />
        </TouchableOpacity>
        <NumberInput
          error={prop.error}
          mode={'outlined'}
          label="Mobile Number"
          value={
            number.length === 10
              ? phoneUtil.formatInOriginalFormat(rawNumber, countryCode)
              : number
          }
          onChangeText={text => {
            setNumber(text);
            prop.onChangeMobileNumber(text.replace(/\D/g, ''));
          }}
          keyboardType="numeric"
        />
      </ContainerView>
      {!isEmpty(prop.errorText) && prop.error && (
        <ErrorText>{prop.errorText}</ErrorText>
      )}
    </>
  );
};

export default MobileNumberInput;
