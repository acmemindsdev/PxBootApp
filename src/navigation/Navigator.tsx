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

// Screens
import SignIn from 'src/screens/SignIn';
import SignUp from 'src/screens/SignUp';
import ForgotPassword from 'src/screens/ForgotPassword';
import CountryList from 'src/screens/CountryList';
import ResetPassword from 'src/screens/ResetPassword';
import ResetPasswordSuccess from 'src/screens/ResetPasswordSuccess';
import VerificationSuccess from 'src/screens/VerificationSuccess';
import SignUpOptions from 'src/screens/SignUpOptions';
import ConfirmMobileNumber from 'src/screens/ConfirmMobileNumber';
import CodeVerification from 'src/screens/CodeVerification';
import ContentWebView from 'src/screens/ContentWebView';

const RootStack = createStackNavigator();

// Set Navigation Enum
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
};

const Navigation = () => {
  //Hide Splash screen on app load.
  useEffect(() => {
    SplashScreen.hide();
  });
  const HeaderLogo = () => {
    return (
      <Image
        style={{ width: 60, height: 20 }}
        //resizeMode="center"
        source={require('src/assets/images/logo-header.png')}
      />
    );
  };

  const customHeaderStyle = {
    backgroundColor: theme.colors.secondary,
    shadowColor: theme.colors.black90,
    shadowRadius: 3,
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Icon
              style={{ marginLeft: 16 }}
              color={theme.colors.white}
              size={28}
              name="arrow-back"
            />
          ),
        }}>
        <RootStack.Screen
          name={NavigationScreen.login}
          component={SignIn}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={NavigationScreen.signUp}
          options={{
            headerTitle: () => <HeaderLogo />,
            headerStyle: customHeaderStyle,
          }}
          component={SignUp}
        />
        <RootStack.Screen
          name={NavigationScreen.forgotPassword}
          options={{
            headerTitle: () => <HeaderLogo />,
            headerStyle: customHeaderStyle,
          }}
          component={ForgotPassword}
        />
        <RootStack.Screen
          name={NavigationScreen.resetPassword}
          options={{
            headerTitle: () => <HeaderLogo />,
            headerStyle: customHeaderStyle,
          }}
          component={ResetPassword}
        />
        <RootStack.Screen
          name={NavigationScreen.resetPasswordSuccess}
          options={{ headerShown: false }}
          component={ResetPasswordSuccess}
        />
        <RootStack.Screen
          name={NavigationScreen.verificationSuccess}
          options={{ headerShown: false }}
          component={VerificationSuccess}
        />
        <RootStack.Screen
          name={NavigationScreen.selectCountry}
          options={{
            headerStyle: customHeaderStyle,
            headerTintColor: 'white',
          }}
          component={CountryList}
        />
        <RootStack.Screen
          name={NavigationScreen.signUpOptions}
          component={SignUpOptions}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={NavigationScreen.confirmMobileNumber}
          options={{
            headerTitle: () => <HeaderLogo />,
            headerStyle: customHeaderStyle,
          }}
          component={ConfirmMobileNumber}
        />
        <RootStack.Screen
          name={NavigationScreen.codeVerification}
          options={{
            headerTitle: () => <HeaderLogo />,
            headerStyle: customHeaderStyle,
          }}
          component={CodeVerification}
        />
        <RootStack.Screen
          name={NavigationScreen.contentWebView}
          options={{
            headerStyle: customHeaderStyle,
            headerTintColor: 'white',
          }}
          component={ContentWebView}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
