import React, { useEffect, useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  BottomDivider,
} from './PatientProfileList.styled';
import { SkeletonLoader } from 'src/components';
import ProfileList from './components/ProfileList';
import { ContainedButton } from 'src/components/Button';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { showOnboarding } from 'src/state/auth/authActions';
import {
  loadExceptionalCareList,
  setExceptionalCare_to_user,
  ExceptionalCareProp,
} from 'src/state/patient/patientAction';
import { getExceptionalCare } from 'src/state/patient/patientReducer';
import { UserInfo } from 'src/storage/UserData';
import { includes } from 'lodash';

interface IProps {
  navigation: any;
  loadExceptionalCareList: any;
  setExceptionalCare_to_user: any;
  exceptionalCare: any;
  showOnboarding: any;
}

const PatientProfileList = ({
  navigation,
  loadExceptionalCareList,
  setExceptionalCare_to_user,
  exceptionalCare,
  showOnboarding,
}: IProps) => {
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [selectedExceptionCareData, setSelectedExceptionCareData] = useState(
    [],
  );

  // Get User Id
  const userID = UserInfo.userID();

  const isLoading = false;
  const exceptionalCareList = get(exceptionalCare, 'list', []);

  useEffect(() => {
    // Load Exceptional Care data
    //  loadExceptionalCareList(userID);
  }, []);

  const onSubmit = () => {
    Keyboard.dismiss();
    setShowButtonLoader(true);
  };

  const isSubmitButtonDisable = false;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <ProfileList
          data={['1', '2', '3']}
          selectedData={(dataList: []) => {
            setSelectedExceptionCareData(dataList);
          }}
          loading={isLoading}
        />
      </MainView>
      <ActionButtonContainer>
        <BottomDivider />
        <ContainedButton
          fullWidth
          loading={showButtonLoader}
          disabled={isSubmitButtonDisable}
          onPress={onSubmit}>
          {'Confirm'}
        </ContainedButton>
      </ActionButtonContainer>
    </>
  );
};

export default connect(
  state => ({ exceptionalCare: getExceptionalCare(state) }),
  {
    loadExceptionalCareList,
    setExceptionalCare_to_user,
    showOnboarding,
  },
)(PatientProfileList);
