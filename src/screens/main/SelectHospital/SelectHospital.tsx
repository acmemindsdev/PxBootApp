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

  const isLoading = get(fetchHospital, 'loading', false);
  const nearestHospital = get(fetchHospital, 'list.[0]', {});
  const hospitalName = get(nearestHospital, 'name', '');
  const hospitalAddress = get(nearestHospital, 'formatted_address', '');

  useEffect(() => {
    //30.31351593174034, 78.04782280120017
    // Get nearest hospital by lat long
    const params: SearchHospitalProp = {
      coordinate: { lat: 30.765, long: 76.775 },
    };
    // Load Hospital List
    loadHospitalList(params);
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
