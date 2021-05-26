import React, { useEffect } from 'react';
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
import { getOnboarding } from 'src/state/auth/authReducer';
import { useSelector } from 'react-redux';

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

const Navigation = () => {
  const showOnboarding = useSelector(state => getOnboarding(state));

  //Hide Splash screen on app load.
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      {!showOnboarding ? <AuthNavigator /> : <OnboardingNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
