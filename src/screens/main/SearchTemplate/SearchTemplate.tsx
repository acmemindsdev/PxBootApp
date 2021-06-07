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
          <Image
            style={{ height: 128 }}
            resizeMode="center"
            source={require('src/assets/images/search-patient.png')}
          />
        </ContentView>
        <ContentView>
          <TextStyled>
            {'Please wait while we fetch your patient record'}
          </TextStyled>
        </ContentView>
      </MainView>
    </>
  );
};

export default SearchTemplate;
