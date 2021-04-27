import React from 'react';
import { CountrySelection } from 'react-native-country-list';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { setSelectedCountry } from 'src/state/auth/authActions';
import { getDialCode } from 'src/state/auth/authReducer';

const CountryList = ({ navigation, setSelectedCountry, dialCode }) => {
  const onCountrySelection = (item: any) => {
    setSelectedCountry(item);
    navigation?.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <CountrySelection
        action={item => onCountrySelection(item)}
        // selected={selected}
      />
    </View>
  );
};

export default connect(
  state => ({
    dialCode: getDialCode(state),
  }),
  {
    setSelectedCountry,
  },
)(CountryList);
