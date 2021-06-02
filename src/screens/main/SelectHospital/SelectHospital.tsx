import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Keyboard,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  TopContainerView,
  CardContent,
  HospitalName,
  Address,
  BottomContainerView,
} from './SelectHospital.styled';
import { ContainedButton, OutlineButton } from 'src/components/Button';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { showOnboarding } from 'src/state/auth/authActions';
import {
  loadHospitalList,
  SearchHospitalProp,
} from 'src/state/hospital/hospitalAction';
import { getHospital } from 'src/state/hospital/hospitalReducer';
import { Title, Subheading } from 'src/components/Typography';
import { IconButton, Card } from 'react-native-paper';
import { rgba } from 'polished';
import theme from 'src/theme';
import Geolocation from 'react-native-geolocation-service';
import { setLoginResponse } from 'src/state/auth/authActions';
import { SkeletonLoader } from 'src/components';
import AsyncStore from 'src/storage/AsyncStore';

interface IProps {
  navigation: any;
  loadHospitalList: any;
  fetchHospital: any;
  setLoginResponse: any;
}

const SelectHospital = ({
  navigation,
  loadHospitalList,
  fetchHospital,
  setLoginResponse,
}: IProps) => {
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hospitalLoading = get(fetchHospital, 'loading', false);
  const nearestHospital = get(fetchHospital, 'list.[0]', {});
  const hospitalName = get(nearestHospital, 'name', '');
  const hospitalAddress = get(nearestHospital, 'formatted_address', '');

  useEffect(() => {
    setIsLoading(hospitalLoading);
  }, [hospitalLoading]);

  const getLocationPermission = async () => {
    const hasLocationPermission =
      Platform.OS === 'ios'
        ? await Geolocation.requestAuthorization('always')
        : await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
    console.log('Permission is ', hasLocationPermission);
    if (hasLocationPermission === 'granted') {
      getLocation();
    } else {
      // Load Hospital List without lat long
      loadHospitalList();
    }
  };

  // Get Location and find near by hospital
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Location data is ', position);
        // Get nearest hospital by lat long
        const params: SearchHospitalProp = {
          coordinate: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
        };
        // Load Hospital List
        loadHospitalList(params);
      },
      error => {
        // Load Hospital List
        loadHospitalList();
        setIsLoading(false);
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        showLocationDialog: true,
        forceRequestLocation: true,
      },
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getLocationPermission();

    //30.31351593174034, 78.04782280120017
  }, []);

  const onSubmit = () => {
    Keyboard.dismiss();
    // setShowButtonLoader(true);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainView>
        {isLoading ? (
          <SkeletonLoader width="60%" height={30} />
        ) : (
          <TopContainerView>
            <Title>Hospital</Title>
            <IconButton
              icon="close"
              onPress={() => {
                AsyncStore.removeItem('loginData').then(() => {
                  setLoginResponse({});
                });
              }}
            />
          </TopContainerView>
        )}
        <Card style={{ elevation: 4 }}>
          {isLoading ? (
            <SkeletonLoader height={200} />
          ) : (
            <Card.Cover
              source={{
                uri: !isLoading ? 'https://picsum.photos/700' : undefined,
              }}
            />
          )}
          <CardContent>
            {isLoading ? (
              <>
                <SkeletonLoader height={34} />
                <SkeletonLoader height={16} marginTop={12} />
                <SkeletonLoader width={120} height={16} alignSelf="center" />
                <SkeletonLoader height={46} marginTop={12} />
              </>
            ) : (
              <>
                <HospitalName>{hospitalName}</HospitalName>
                <Address>{hospitalAddress}</Address>
                <ContainedButton fullWidth onPress={onSubmit}>
                  {'This is my Hospital'}
                </ContainedButton>
              </>
            )}
          </CardContent>
        </Card>
        {isLoading ? (
          <>
            <SkeletonLoader
              height={30}
              width={'50%'}
              marginTop={50}
              alignSelf="center"
            />
            <SkeletonLoader height={46} width={'80%'} alignSelf="center" />
          </>
        ) : (
          <BottomContainerView>
            <SkeletonLoader height={16} />
            {isLoading ? (
              <>
                <SkeletonLoader height={16} marginTop={12} />
              </>
            ) : (
              <>
                <Subheading color={rgba(theme.colors.black90, 0.8)}>
                  {'Not your Hospital?'}
                </Subheading>
                <ActionButtonContainer>
                  <OutlineButton
                    fullWidth
                    loading={showButtonLoader}
                    onPress={() => {}}>
                    {'Search'}
                  </OutlineButton>
                </ActionButtonContainer>
              </>
            )}
          </BottomContainerView>
        )}
      </MainView>
    </>
  );
};

export default connect(state => ({ fetchHospital: getHospital(state) }), {
  loadHospitalList,
  showOnboarding,
  setLoginResponse,
})(SelectHospital);
