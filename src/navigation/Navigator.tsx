import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text } from 'react-native';
import theme from 'src/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import SignIn from 'src/screens/SignIn';
import ForgotPassword from 'src/screens/ForgotPassword';
import CountryList from 'src/screens/CountryList';
import ResetPassword from 'src/screens/ResetPassword';
import ResetPasswordSuccess from 'src/screens/ResetPasswordSuccess';
import SignUpOptions from 'src/screens/SignUpOptions';

const RootStack = createStackNavigator();

// Set Navigation Enum
export const NavigationScreen = {
  signUpOptions: 'Sign Up Options',
  login: 'login',
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
          name="Forgot Password"
          options={{
            headerTitle: () => <HeaderLogo />,
            headerStyle: customHeaderStyle,
          }}
          component={ForgotPassword}
        />
        <RootStack.Screen
          name="Reset Password"
          options={{
            headerTitle: () => <HeaderLogo />,
            headerStyle: customHeaderStyle,
          }}
          component={ResetPassword}
        />
        <RootStack.Screen
          name="Reset Password Success"
          options={{ headerShown: false }}
          component={ResetPasswordSuccess}
        />
        <RootStack.Screen
          name="Select a Country"
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
