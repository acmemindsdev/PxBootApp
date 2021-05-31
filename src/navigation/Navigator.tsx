import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { Image, Text } from 'react-native';
import theme from 'src/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import {
  getOnboarding,
  getLoginData,
  getDialCode,
} from 'src/state/auth/authReducer';
import { setLoginResponse } from 'src/state/auth/authActions';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStore from 'src/storage/AsyncStore';
import { get, isEmpty } from 'lodash';
import MainNavigator from './MainNavigator';
import { UserInfo } from 'src/storage/UserData';

// Navigation Header Image
export const HeaderLogo = () => {
  return (
    <Image
      style={{ width: 60, height: 20 }}
      //resizeMode="center"
      source={require('src/assets/images/logo-header.png')}
    />
  );
};

// Navigation Header Bar Style
export const customHeaderStyle = {
  backgroundColor: theme.colors.secondary,
  shadowColor: theme.colors.black90,
  shadowRadius: 3,
};

// Set Auth Navigation Enum
export const NavigationScreen = {
  login: 'Login',
  signUp: 'Sign Up',
  signUpOptions: 'Sign Up Options',
  forgotPassword: 'Forgot Password',
  resetPassword: 'Reset Password',
  resetPasswordSuccess: 'Reset Password Success',
  selectCountry: 'Select a Country',
  confirmMobileNumber: 'Confirm Mobile Number',
  codeVerification: 'Code Verification',
  verificationSuccess: 'Verification Success',
  contentWebView: 'Terms and Condition',
  addBirthDate: 'Add Birth Date',
};

// Set Onboarding Navigation Enum
export const OnboardingNavigationScreen = {
  profilePicture: 'Add Profile Picture',
  exceptionalCare: 'Exceptional Care',
};

// Set Main Navigation Enum
export const MainNavigationScreen = {
  selectHospital: 'Select Hospital',
  exceptionalCare: 'Exceptional Care',
};

const Navigation = () => {
  const loginData = useSelector(state => getLoginData(state));
  const showOnboarding = useSelector(state => getOnboarding(state));
  const dial = useSelector(state => getDialCode(state));

  // Check is phone verified
  const phoneVerified = get(
    loginData,
    'signInUserSession.idToken.payload.phone_number_verified',
    false,
  );
  // check is birth date entered
  const isBirthDateAdded = !isEmpty(
    get(loginData, 'signInUserSession.idToken.payload.birthdate', ''),
  );

  // check is user have all info and its logged in
  const isUserLoggedIn = isBirthDateAdded && phoneVerified;

  const dispatch = useDispatch();

  const getInfoFromStorage = async () => {
    try {
      await AsyncStore.getItem('loginData', {}).then(data => {
        if (get(data, 'username', false)) {
          dispatch(setLoginResponse(data));
        }
        SplashScreen.hide();
      });
    } catch (error) {
      console.log('error fetching login data', error);
      SplashScreen.hide();
    }
  };

  useMemo(() => getInfoFromStorage(), []);

  // //Hide Splash screen on app load.
  useEffect(() => {
    console.log(' showOnboarding dfdf', showOnboarding, dial);
  }, [showOnboarding, dial]);

  return (
    <NavigationContainer>
      {isUserLoggedIn ? (
        showOnboarding ? (
          <OnboardingNavigator />
        ) : (
          <MainNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
