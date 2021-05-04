import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SocialLogin } from 'src/components';
import {
  MainView,
  BottomView,
  TextContainerView,
} from './SignUpOptions.styled';
import { ContainedButton, TextButton } from 'src/components/Button';
import { Text1, FontWeights } from 'src/components/Typography';
import theme from 'src/theme';
import { NavigationScreen } from 'src/navigation/Navigator';

interface IProps {
  navigation: any;
}

const SignUpOptions = (props: IProps) => {
  const handleRegister = () => {
    props.navigation?.push(NavigationScreen.signUp, {});
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainView>
        <ContainedButton fullWidth onPress={handleRegister}>
          {'Register with Mobile Number'}
        </ContainedButton>
        <SocialLogin navigation={props.navigation} isRegister />
        <TextContainerView>
          <Text1
            style={{ marginTop: 12, opacity: 0.6 }}
            color={theme.colors.black90}>
            {'By Continuing, you agree to the '}
          </Text1>
          <Text1
            color={theme.colors.primary}
            fontWeight={FontWeights.bold}
            onPress={() => {}}
            style={{ marginTop: 12 }}>
            {'Terms & Conditions'}
          </Text1>
          <Text1
            style={{ marginTop: 12, opacity: 0.6 }}
            color={theme.colors.black90}>
            {' and '}
          </Text1>
          <Text1
            color={theme.colors.primary}
            fontWeight={FontWeights.bold}
            style={{ marginTop: 12 }}>
            {'Privacy Policy'}
          </Text1>
        </TextContainerView>
        <BottomView>
          <TextButton
            style={{ bottom: 0, alignSelf: 'flex-end' }}
            onPress={() =>
              props.navigation?.navigate(
                NavigationScreen.confirmMobileNumber,
                {},
              )
            }>
            <Text1>{'Already on PX Boost? '}</Text1>
            <Text1 color={theme.colors.primary} fontWeight={FontWeights.bold}>
              {'Log In'}
            </Text1>
          </TextButton>
        </BottomView>
      </MainView>
    </>
  );
};

export default SignUpOptions;
