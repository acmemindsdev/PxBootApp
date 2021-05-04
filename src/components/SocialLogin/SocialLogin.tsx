import React, { useEffect } from 'react';
import {
  MainView,
  GridView,
  TitleText,
  ActivityIndicatorView,
} from './SocialLogin.styled';
import { Divider } from 'src/components';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, ActivityIndicator } from 'react-native';
import SocialLoginButton from './SocialLoginButton';
import { connect, useSelector } from 'react-redux';
import {
  getSocialLoginData,
  isSocialLoginResponseLoading,
} from 'src/state/auth/authReducer';
import { NavigationScreen } from 'src/navigation/Navigator';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import theme from 'src/theme';

type IProp = {
  navigation: any;
  isRegister?: boolean;
  isLoading?: boolean;
  responseData?: any;
};

const SocialLogin = (prop: IProp) => {
  const isLoading = useSelector(state => isSocialLoginResponseLoading(state));
  const responseData = useSelector(state => getSocialLoginData(state));

  useEffect(() => {
    if (!isEmpty(get(responseData, 'username', ''))) {
      prop.navigation?.push(NavigationScreen.confirmMobileNumber, {});
    }
  }, [responseData]);

  return (
    <MainView>
      <GridView>
        <Divider style={{ flex: 1 }} />
        <TitleText>
          {prop.isRegister ? 'OR Register with' : 'OR log in with'}
        </TitleText>
        <Divider style={{ flex: 1 }} />
      </GridView>
      <GridView style={{ opacity: isLoading ? 0.2 : 1 }}>
        <SocialLoginButton type="fb" />
        <SocialLoginButton type="google" />
        <SocialLoginButton type="apple" />
      </GridView>
      <Divider />
      {isLoading && (
        <ActivityIndicatorView>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </ActivityIndicatorView>
      )}
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

export default SocialLogin;
