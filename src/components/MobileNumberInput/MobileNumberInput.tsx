import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import {
  ContainerView,
  CountryCodeInput,
  NumberInput,
} from './MobileNumberInput.styled';

const MobileNumberInput = () => {
  return (
    <ContainerView>
      <TouchableOpacity onPress={() => console.log('yusuf')}>
        <CountryCodeInput
          mode={'outlined'}
          label={'+91'}
          render={() => <View />}
          right={
            <CountryCodeInput.Icon
              name={() => (
                <Image source={require('src/assets/images/logo.png')} />
              )}
            />
          }
        />
      </TouchableOpacity>
      <NumberInput mode={'outlined'} label="Phone number" />
    </ContainerView>
  );
};

export default MobileNumberInput;
