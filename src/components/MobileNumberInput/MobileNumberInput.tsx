import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ContainerView,
  CountryCodeInput,
  NumberInput,
  CountryCodeText,
  CountryCodeView,
} from './MobileNumberInput.styled';
import { Text } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

const MobileNumberInput = ({ navigation }) => {
  const pushAction = StackActions.push('Select a Country');
  return (
    <ContainerView>
      <TouchableOpacity onPress={() => navigation.dispatch(pushAction)}>
        <CountryCodeInput
          mode={'outlined'}
          render={() => (
            <CountryCodeView>
              <CountryCodeText>+1</CountryCodeText>
              <Icon size={25} name="angle-down" />
            </CountryCodeView>
          )}
        />
      </TouchableOpacity>
      <NumberInput mode={'outlined'} label="Mobile Number" />
    </ContainerView>
  );
};

export default MobileNumberInput;
