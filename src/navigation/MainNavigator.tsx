import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import theme from 'src/theme';
import { TouchableOpacity } from 'react-native';
import {
  MainNavigationScreen,
  HeaderLogo,
  customHeaderStyle,
} from './Navigator';
// Main Screens
import SelectHospital from 'src/screens/main/SelectHospital';

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
        name={MainNavigationScreen.selectHospital}
        options={{ headerShown: false }}
        component={SelectHospital}
      />
    </RootStack.Navigator>
  );
};

export default MainNavigator;
