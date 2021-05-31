import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import theme from 'src/theme';
import { TouchableOpacity } from 'react-native';
import {
  OnboardingNavigationScreen,
  HeaderLogo,
  customHeaderStyle,
} from './Navigator';
// Main Screens
import ProfilePicture from 'src/screens/onboarding/ProfilePicture';
import ExceptionalCare from 'src/screens/onboarding/ExceptionalCare';

const RootStack = createStackNavigator();

// Navigation Stack for Main Screens
const MainNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
      }}>
      <RootStack.Screen
        name={OnboardingNavigationScreen.profilePicture}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerStyle: customHeaderStyle,
        })}
        component={ProfilePicture}
      />
      <RootStack.Screen
        name={OnboardingNavigationScreen.exceptionalCare}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerStyle: customHeaderStyle,
        })}
        component={ExceptionalCare}
      />
    </RootStack.Navigator>
  );
};

export default MainNavigator;
