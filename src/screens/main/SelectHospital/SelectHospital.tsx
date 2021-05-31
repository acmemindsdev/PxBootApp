import React, { useEffect, useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
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

interface IProps {
  navigation: any;
  loadHospitalList: any;
  fetchHospital: any;
}

const SelectHospital = ({
  navigation,
  loadHospitalList,
  fetchHospital,
}: IProps) => {
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  const isLoading = get(fetchHospital, 'loading', false);
  const nearestHospital = get(fetchHospital, 'list.[0]', {});
  const hospitalName = get(nearestHospital, 'name', '');
  const hospitalAddress = get(nearestHospital, 'formatted_address', '');

  const getLocationPermission = async () => {
    const hasLocationPermission = await Geolocation.requestAuthorization(
      'always',
    );
    console.log('Permission is ', hasLocationPermission);
    if (hasLocationPermission === 'granted') {
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
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  useEffect(() => {
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
        <TopContainerView>
          <Title>Hospital</Title>
          <IconButton icon="close" onPress={() => {}} />
        </TopContainerView>
        <Card style={{ elevation: 4 }}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <CardContent>
            <HospitalName>{hospitalName}</HospitalName>
            <Address>{hospitalAddress}</Address>
            <ContainedButton fullWidth onPress={onSubmit}>
              {'This is my Hospital'}
            </ContainedButton>
          </CardContent>
        </Card>
        <BottomContainerView>
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
        </BottomContainerView>
      </MainView>
    </>
  );
};

export default connect(state => ({ fetchHospital: getHospital(state) }), {
  loadHospitalList,
  showOnboarding,
})(SelectHospital);
