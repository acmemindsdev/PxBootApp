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
import { FontWeights, Text1 } from 'src/components/Typography';

// Onboarding Screens
import ProfilePicture from 'src/screens/onboarding/ProfilePicture';
import ExceptionalCare from 'src/screens/onboarding/ExceptionalCare';

const RootStack = createStackNavigator();

// Navigation Stack for Onboarding Screen
const OnboardingNavigator = () => {
  // Header Skip Button
  const SkipButton = ({ onPress }) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 22, padding: 8 }}
        onPress={onPress}>
        <Text1 fontWeight={FontWeights.bold} color={theme.colors.white}>
          SKIP
        </Text1>
      </TouchableOpacity>
    );
  };

  return (
    <RootStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
        headerLeft: () => null,
      }}>
      <RootStack.Screen
        name={OnboardingNavigationScreen.profilePicture}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerStyle: customHeaderStyle,
          headerRight: () => (
            <SkipButton
              onPress={() =>
                navigation.navigate(OnboardingNavigationScreen.exceptionalCare)
              }
            />
          ),
        })}
        component={ProfilePicture}
      />
      <RootStack.Screen
        name={OnboardingNavigationScreen.exceptionalCare}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerStyle: customHeaderStyle,
          headerRight: () => (
            <SkipButton
              onPress={() =>
                navigation.navigate(OnboardingNavigationScreen.exceptionalCare)
              }
            />
          ),
        })}
        component={ExceptionalCare}
      />
    </RootStack.Navigator>
  );
};

export default OnboardingNavigator;
