import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import theme from 'src/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  NavigationScreen,
  HeaderLogo,
  customHeaderStyle,
  HeaderBack,
} from './Navigator';

// Screens
import SignIn from 'src/screens/auth/SignIn';
import SignUp from 'src/screens/auth/SignUp';
import ForgotPassword from 'src/screens/auth/ForgotPassword';
import CountryList from 'src/screens/auth/CountryList';
import ResetPassword from 'src/screens/auth/ResetPassword';
import ResetPasswordSuccess from 'src/screens/auth/ResetPasswordSuccess';
import VerificationSuccess from 'src/screens/auth/VerificationSuccess';
import SignUpOptions from 'src/screens/auth/SignUpOptions';
import ConfirmMobileNumber from 'src/screens/auth/ConfirmMobileNumber';
import CodeVerification from 'src/screens/auth/CodeVerification';
import ContentWebView from 'src/screens/auth/ContentWebView';
import AddBirthDate from 'src/screens/auth/AddBirthDate';

const RootStack = createStackNavigator();

// Navigation Stack for Authentication Screen
const AuthNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
        headerBackImage: () => <HeaderBack />,
        headerTitle: () => <HeaderLogo />,
        headerStyle: customHeaderStyle,
        headerTintColor: 'white',
      }}>
      <RootStack.Screen
        name={NavigationScreen.login}
        component={SignIn}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name={NavigationScreen.signUp} component={SignUp} />
      <RootStack.Screen
        name={NavigationScreen.forgotPassword}
        component={ForgotPassword}
      />
      <RootStack.Screen
        name={NavigationScreen.resetPassword}
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
        component={CountryList}
      />
      <RootStack.Screen
        name={NavigationScreen.signUpOptions}
        component={SignUpOptions}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={NavigationScreen.confirmMobileNumber}
        component={ConfirmMobileNumber}
      />
      <RootStack.Screen
        name={NavigationScreen.codeVerification}
        component={CodeVerification}
      />
      <RootStack.Screen
        name={NavigationScreen.contentWebView}
        component={ContentWebView}
      />
      <RootStack.Screen
        name={NavigationScreen.addBirthDate}
        component={AddBirthDate}
      />
    </RootStack.Navigator>
  );
};

export default AuthNavigator;
