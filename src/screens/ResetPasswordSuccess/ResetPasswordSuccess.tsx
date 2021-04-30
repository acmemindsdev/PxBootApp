import React from 'react';
import {
  MainView,
  ContentView,
  TextStyled,
} from './ResetPasswordSuccess.styled';
import { Image, StatusBar } from 'react-native';
import { Subheading } from 'src/components/Typography';
import { ContainedButton } from 'src/components/Button';

type IProps = {
  navigation: any;
};
const ResetPasswordSuccess = ({ navigation }: IProps) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainView>
        <ContentView>
          <Image source={require('src/assets/images/verified-mobile.png')} />
        </ContentView>
        <ContentView>
          <Subheading>{'Password Reset'}</Subheading>
          <TextStyled>{'Your password has been reset successfully'}</TextStyled>
        </ContentView>
        <ContentView>
          <ContainedButton
            large
            onPress={() => navigation?.navigate('Home', {})}>
            {'Log In'}
          </ContainedButton>
        </ContentView>
      </MainView>
    </>
  );
};

export default ResetPasswordSuccess;
