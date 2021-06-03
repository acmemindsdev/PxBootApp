import React from 'react';
import { MainView, ContentView, TextStyled } from './SearchTemplate.styled';
import { Image, StatusBar } from 'react-native';
import { Subheading } from 'src/components/Typography';

type IProps = {
  navigation: any;
};
const SearchTemplate = ({ navigation }: IProps) => {
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
      </MainView>
    </>
  );
};

export default SearchTemplate;
