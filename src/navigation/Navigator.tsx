import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SignIn from 'src/screens/SignIn';
import ForgotPassword from 'src/screens/ForgotPassword';

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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
