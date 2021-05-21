import React from 'react';
import { CountrySelection } from 'react-native-country-list';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { setSelectedCountry } from 'src/state/auth/authActions';

const CountryList = ({ navigation, setSelectedCountry }) => {
  const onCountrySelection = (item: any) => {
    setSelectedCountry(item);
    navigation?.goBack();
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <CountrySelection
          action={item => onCountrySelection(item)}
          // selected={selected}
        />
      </View>
    </>
  );
};

export default connect(state => ({}), {
  setSelectedCountry,
})(CountryList);
