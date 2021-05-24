import React from 'react';
import {
  MainView,
  ContentView,
  TextStyled,
} from './VerificationSuccess.styled';
import { Image, StatusBar } from 'react-native';
import { Subheading } from 'src/components/Typography';
import { ContainedButton } from 'src/components/Button';
import { NavigationScreen } from 'src/navigation/Navigator';

type IProps = {
  navigation: any;
};
const VerificationSuccess = ({ navigation }: IProps) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainView>
        <ContentView>
          <Image source={require('src/assets/images/verified-user.png')} />
        </ContentView>
        <ContentView>
          <Subheading>{'Verification Successful'}</Subheading>
          <TextStyled>
            {'You have successfully verified your account.'}
          </TextStyled>
        </ContentView>
        <ContentView>
          <ContainedButton
            large
            onPress={() => navigation?.navigate(NavigationScreen.login, {})}>
            {'Log In'}
          </ContainedButton>
        </ContentView>
      </MainView>
    </>
  );
};

export default VerificationSuccess;
