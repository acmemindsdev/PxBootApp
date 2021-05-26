import React, { useEffect, useState } from 'react';
import {
  MainView,
  GridView,
  TitleText,
  ActivityIndicatorView,
} from './SocialLogin.styled';
import { Divider } from 'src/components';
import { StyleSheet, ActivityIndicator } from 'react-native';
import SocialLoginButton from './SocialLoginButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSocialLoginData,
  isSocialLoginResponseLoading,
} from 'src/state/auth/authReducer';
import { showOnboarding } from 'src/state/auth/authActions';
import { NavigationScreen } from 'src/navigation/Navigator';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import theme from 'src/theme';

type IProp = {
  navigation: any;
  isRegister?: boolean;
  isLoading?: boolean;
  responseData?: any;
};

const SocialLogin = (prop: IProp) => {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const isLoading = useSelector(state => isSocialLoginResponseLoading(state));
  const responseData = useSelector(state => getSocialLoginData(state));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(get(responseData, 'username', '')) && shouldNavigate) {
      const phoneVerified = get(
        responseData,
        'signInUserSession.idToken.payload.phone_number_verified',
        false,
      );
      const isBirthDateAdded = get(
        responseData,
        'signInUserSession.idToken.payload.birthdate',
        '',
      );

      if (isEmpty(isBirthDateAdded)) {
        // Check if Birth Date is not added then navigate to Add Birth Date screen
        prop.navigation?.push(NavigationScreen.addBirthDate, {});
      } else if (!phoneVerified) {
        // Check if phone number not verified then navigate to confirm mobile number screen
        prop.navigation?.push(NavigationScreen.confirmMobileNumber, {});
      } else {
        // Navigate to onboarding screen
        dispatch(showOnboarding(true));
      }
    }
  }, [responseData]);

  return (
    <MainView>
      <GridView>
        <Divider style={{ flex: 1 }} />
        <TitleText>
          {prop.isRegister ? 'OR Register with' : 'OR log in with'}
        </TitleText>
        <Divider style={{ flex: 1 }} />
      </GridView>
      <GridView style={{ opacity: isLoading ? 0.2 : 1 }}>
        <SocialLoginButton
          type="fb"
          shouldNavigate={value => setShouldNavigate(value)}
        />
        <SocialLoginButton
          type="google"
          shouldNavigate={value => setShouldNavigate(value)}
        />
        <SocialLoginButton
          type="apple"
          shouldNavigate={value => setShouldNavigate(value)}
        />
      </GridView>
      <Divider />
      {isLoading && (
        <ActivityIndicatorView>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </ActivityIndicatorView>
      )}
    </MainView>
  );
};

const styles = StyleSheet.create({
  buttonContentStyle: {
    padding: 50,
    backgroundColor: 'blue',
    justifyContent: 'space-between',
    height: 250,
  },
});

export default SocialLogin;
