import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SignIn from 'src/screens/SignIn';
import ForgotPassword from 'src/screens/ForgotPassword';
import CountryList from 'src/screens/CountryList';

const RootStack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <RootStack.Screen name="Select a Country" component={CountryList} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
