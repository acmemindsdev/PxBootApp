import React, { useEffect, useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  SubTitle,
  DividerStyled,
} from './PatientProfileList.styled';
import { ExceptionalCareList, SkeletonLoader } from 'src/components';
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

  const isLoading = get(exceptionalCare, 'loading', false);
  const exceptionalCareList = get(exceptionalCare, 'list', []);

  useEffect(() => {
    // Load Exceptional Care data
    loadExceptionalCareList(userID);
  }, []);

  /**
   * Create Array of object to map/un-map exceptional care to user
   * @param allExceptionalCare All Exceptional Care list
   * @param selectedExceptionalCare Selected Exceptional Care list
   * @param onSuccess Call Back Method for Success response
   * @param onError Call Back Method for Error response
   */
  const exceptionalCareData = (
    allExceptionalCare: [],
    selectedExceptionalCare: any[],
  ) => {
    let returnData: [ExceptionalCareProp] | any[] = [];
    allExceptionalCare.map(data => {
      const isExist = includes(selectedExceptionalCare, data);
      const isAlreadyMapped = get(data, 'ispatientmapped', false);
      const needToRemove = isAlreadyMapped && !isExist;
      if (isExist) {
        const dataObj: ExceptionalCareProp = {
          exceptionalCareId: get(data, 'id', 0),
          setActiveStatus: 'ACTIVE',
        };
        returnData.push(dataObj);
      } else if (needToRemove) {
        const dataObj: ExceptionalCareProp = {
          exceptionalCareId: get(data, 'id', 0),
          setActiveStatus: 'DELETED',
          existingId: get(data, 'existingpatientexceptioncareid', 0),
        };
        returnData.push(dataObj);
      }
    });
    return returnData;
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    setShowButtonLoader(true);
    console.log(
      'selected data is',
      exceptionalCareData(exceptionalCareList, selectedExceptionCareData),
    );
    setExceptionalCare_to_user(
      userID,
      exceptionalCareData(exceptionalCareList, selectedExceptionCareData),
      () => {
        setShowButtonLoader(false);
        showOnboarding(false);
      },
      () => {
        setShowButtonLoader(false);
      },
    );
  };

  const isSubmitButtonDisable = isEmpty(
    exceptionalCareData(exceptionalCareList, selectedExceptionCareData),
  );

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        {isLoading ? (
          <SkeletonLoader height={30} width={200} />
        ) : (
          <SubTitle>Select one or multiple options</SubTitle>
        )}
        <ExceptionalCareList
          data={exceptionalCareList}
          selectedData={(dataList: []) => {
            setSelectedExceptionCareData(dataList);
          }}
          loading={isLoading}
        />
        <DividerStyled />
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            loading={showButtonLoader}
            disabled={isSubmitButtonDisable}
            onPress={onSubmit}>
            {'Done'}
          </ContainedButton>
        </ActionButtonContainer>
      </MainView>
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
