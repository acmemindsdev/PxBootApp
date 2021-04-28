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

const RootStack = createStackNavigator();

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
          name="Home"
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
          name="Select a Country"
          options={{
            headerStyle: customHeaderStyle,
            headerTintColor: 'white',
          }}
          component={CountryList}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
