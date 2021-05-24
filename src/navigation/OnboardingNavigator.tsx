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

// Onboarding Screens
import ProfilePicture from 'src/screens/onboarding/ProfilePicture';
import { Text } from 'react-native';
import { TextButton } from 'src/components/Button';
import { FontWeights, Text1 } from 'src/components/Typography';

const RootStack = createStackNavigator();

// Navigation Stack for Onboarding Screen
const OnboardingNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 22, padding: 8 }}>
            <Text1 fontWeight={FontWeights.bold} color={theme.colors.white}>
              SKIP
            </Text1>
          </TouchableOpacity>
        ),
      }}>
      <RootStack.Screen
        name={OnboardingNavigationScreen.profilePicture}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerStyle: customHeaderStyle,
        }}
        component={ProfilePicture}
      />
    </RootStack.Navigator>
  );
};

export default OnboardingNavigator;
