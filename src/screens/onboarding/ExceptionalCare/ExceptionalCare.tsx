import React, { useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  SubTitle,
} from './ExceptionalCare.styled';
import { ExceptionalCareList } from 'src/components';
import { ContainedButton } from 'src/components/Button';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { NavigationScreen } from 'src/navigation/Navigator';
import { fetchMobileOTP, setMobileNumber } from 'src/state/auth/authActions';

interface IProps {
  navigation: any;
  fetchMobileOTP: any;
  setMobileNumber: any;
}

const ExceptionalCare = ({ navigation, fetchMobileOTP }: IProps) => {
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [imageSrc, setImageSrc] = useState({});

  const onSubmit = () => {
    Keyboard.dismiss();
    setShowButtonLoader(true);

    fetchMobileOTP(
      'data.dateOfBirth',
      response => {
        setShowButtonLoader(false);
        console.log('Payload', response);
        if (get(response, 'payload.data.data.otp', '') !== '') {
          navigation?.push(NavigationScreen.codeVerification, {
            fromSocial: true,
          });
        } else {
        }
      },
      (error: any) => {
        setShowButtonLoader(false);
        if (get(error, 'payload.code', '') === 'UserNotFoundException') {
        } else {
        }
      },
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <SubTitle>Select one or multiple options</SubTitle>
        <ExceptionalCareList
          data={['1', '2', '3']}
          selectedData={(dataList: []) => {
            console.log('array is', dataList);
          }}
        />
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            loading={showButtonLoader}
            disabled={isEmpty(imageSrc)}
            onPress={onSubmit}>
            {'Done'}
          </ContainedButton>
        </ActionButtonContainer>
      </MainView>
    </>
  );
};

export default connect(() => ({}), {
  fetchMobileOTP,
  setMobileNumber,
})(ExceptionalCare);
