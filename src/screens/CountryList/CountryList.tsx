import React from 'react';
import { CountrySelection } from 'react-native-country-list';
import { View } from 'react-native';

const CountryList = () => {
  const onCountrySelection = (item: any) => {};

  return (
    <View style={{ flex: 1 }}>
      <CountrySelection
        action={item => onCountrySelection(item)}
        // selected={selected}
      />
    </View>
  );
};

export default CountryList;
