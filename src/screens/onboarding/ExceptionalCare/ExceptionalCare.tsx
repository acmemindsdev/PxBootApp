import React, { useEffect, useState } from 'react';
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
import { loadExceptionalCareList } from 'src/state/patient/patientAction';
import { UserInfo } from 'src/storage/UserData';

interface IProps {
  navigation: any;
  loadExceptionalCareList: any;
  setMobileNumber: any;
}

const ExceptionalCare = ({ navigation, loadExceptionalCareList }: IProps) => {
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [imageSrc, setImageSrc] = useState({});

  // Get User Id
  const userID = UserInfo.userID();

  useEffect(() => {
    setShowButtonLoader(true);
    loadExceptionalCareList(
      userID,
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
      () => {
        setShowButtonLoader(false);
      },
    );
  }, []);

  const onSubmit = () => {
    Keyboard.dismiss();
    setShowButtonLoader(true);

    loadExceptionalCareList(
      userID,
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
      () => {
        setShowButtonLoader(false);
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
  loadExceptionalCareList,
})(ExceptionalCare);
