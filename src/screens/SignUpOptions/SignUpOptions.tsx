import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SocialLogin } from 'src/components';
import { MainView, BottomView } from './SignUpOptions.styled';
import { ContainedButton, TextButton } from 'src/components/Button';
import { Text1, FontWeights } from 'src/components/Typography';
import theme from 'src/theme';
import { NavigationScreen } from 'src/navigation/Navigator';

interface IProps {
  navigation: any;
}

const SignUpOptions = ({ navigation }: IProps) => {
  const handleLogin = () => {};

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainView>
        <ContainedButton fullWidth onPress={handleLogin}>
          {'Register with Mobile Number'}
        </ContainedButton>
        <SocialLogin navigation={navigation} isRegister />
        <BottomView>
          <TextButton
            style={{ bottom: 0, alignSelf: 'flex-end' }}
            onPress={() => navigation?.navigate(NavigationScreen.login, {})}>
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
