import React from 'react';
import { MainView, GridView, TitleText } from './SocialLogin.styled';
import { Divider } from 'src/components';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';
import SocialLoginButton from './SocialLoginButton';

type IProp = {
  navigation: object;
  isRegister?: boolean;
};

export const SocialLogin = (prop: IProp) => {
  return (
    <MainView>
      <GridView>
        <Divider style={{ flex: 1 }} />
        <TitleText>
          {prop.isRegister ? 'OR Register with' : 'OR log in with'}
        </TitleText>
        <Divider style={{ flex: 1 }} />
      </GridView>
      <GridView>
        <SocialLoginButton type="fb" />
        <SocialLoginButton type="google" />
        <SocialLoginButton type="apple" />
      </GridView>
      <Divider />
    </MainView>
  );
};

const styles = StyleSheet.create({
  buttonContentStyle: {
    padding: 50,
    backgroundColor: 'blue',
    justifyContent: 'space-between',
    height: 250,
  },
});
