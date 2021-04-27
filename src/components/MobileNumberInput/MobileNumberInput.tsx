import React, { useEffect } from 'react';
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
import { TextInput } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getDialCode } from 'src/state/auth/authReducer';

type IProp = {
  navigation: any;
  onChangeDialCode: any;
  onChangeMobileNumber: any;
  error?: boolean;
  errorText?: string;
};

const MobileNumberInput = (prop: IProp) => {
  const pushAction = StackActions.push('Select a Country');
  const dialCode = useSelector(state => getDialCode(state));

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
          onChangeText={text => prop.onChangeMobileNumber(text)}
          keyboardType="numeric"
        />
      </ContainerView>
      {prop.errorText && prop.error && <ErrorText>{prop.errorText}</ErrorText>}
    </>
  );
};

export default MobileNumberInput;
