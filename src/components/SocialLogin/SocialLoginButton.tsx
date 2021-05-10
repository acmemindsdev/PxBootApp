import React from 'react';
import { ButtonContentView, GridView, TitleText } from './SocialLogin.styled';
import { Divider } from 'src/components';
import { IconButton, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image } from 'react-native';
import theme from 'src/theme';
import { useDispatch } from 'react-redux';
import { socialLogin } from 'src/state/auth/authActions';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

type IProp = {
  type: 'fb' | 'google' | 'apple';
  shouldNavigate?: any;
};

const SocialLoginButton = (prop: IProp) => {
  const dispatch = useDispatch();
  return (
    <ButtonContentView>
      {prop.type === 'fb' && (
        <>
          <IconButton
            icon={{ source: 'facebook', direction: 'ltr' }}
            color={theme.colors.primary}
            size={40}
            onPress={() => {
              prop.shouldNavigate(true);
              dispatch(socialLogin(CognitoHostedUIIdentityProvider.Facebook));
            }}
          />
          <Caption style={{ marginTop: -8 }}>Facebook</Caption>
        </>
      )}
      {prop.type === 'google' && (
        <>
          <IconButton
            icon={({ size, color }) => (
              <Image
                source={require('src/assets/images/logo-google.png')}
                style={{ width: 34, height: 34 }}
              />
            )}
            size={40}
            onPress={() => {
              prop.shouldNavigate(true);
              dispatch(socialLogin(CognitoHostedUIIdentityProvider.Google));
            }}
          />
          <Caption style={{ marginTop: -8 }}>Google</Caption>
        </>
      )}
      {prop.type === 'apple' && (
        <>
          <IconButton
            icon={{ source: 'apple', direction: 'ltr' }}
            color={theme.colors.black}
            size={40}
            onPress={() => {
              prop.shouldNavigate(true);
              dispatch(socialLogin(CognitoHostedUIIdentityProvider.Apple));
            }}
          />
          <Caption style={{ marginTop: -8 }}>Apple</Caption>
        </>
      )}
    </ButtonContentView>
  );
};

const styles = StyleSheet.create({
  buttonContentStyle: {
    backgroundColor: 'blue',
    flexDirection: 'column',
    width: 250,
    height: 249,
  },
});

export default SocialLoginButton;
