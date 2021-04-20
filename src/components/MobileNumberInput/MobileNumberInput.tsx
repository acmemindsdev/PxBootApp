import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ContainerView,
  CountryCodeInput,
  NumberInput,
  CountryCodeText,
} from './MobileNumberInput.styled';
import { Text } from 'react-native-paper';

const MobileNumberInput = () => {
  return (
    <ContainerView>
      <TouchableOpacity onPress={() => console.log('yusuf')}>
        <CountryCodeInput
          mode={'outlined'}
          render={() => <CountryCodeText>+1</CountryCodeText>}
          right={
            <CountryCodeInput.Icon
              name={() => <Icon size={25} name="angle-down" />}
            />
          }
        />
      </TouchableOpacity>
      <NumberInput mode={'outlined'} label="Mobile Number" />
    </ContainerView>
  );
};

export default MobileNumberInput;
