import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text } from 'react-native';
import theme from 'src/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import SignIn from 'src/screens/SignIn';
import SignUp from 'src/screens/SignUp';
import ForgotPassword from 'src/screens/ForgotPassword';
import CountryList from 'src/screens/CountryList';
import ResetPassword from 'src/screens/ResetPassword';
import ResetPasswordSuccess from 'src/screens/ResetPasswordSuccess';
import SignUpOptions from 'src/screens/SignUpOptions';
import ConfirmMobileNumber from 'src/screens/ConfirmMobileNumber';
import CodeVerification from 'src/screens/CodeVerification';

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
};

const Navigation = () => {
  const HeaderLogo = () => {
    return <Image source={require('src/assets/images/logo-header.png')} />;
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
