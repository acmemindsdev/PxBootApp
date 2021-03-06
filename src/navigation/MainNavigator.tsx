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
  HeaderBack,
} from './Navigator';

// Main Screens
import SelectHospital from 'src/screens/main/SelectHospital';
import PatientProfileList from 'src/screens/main/PatientProfileList';

// Modal Screens
import SearchTemplate from 'src/screens/main/SearchTemplate';

// Root stack navigator
const RootStack = createStackNavigator();

// Main Screens Navigator
const MainStack = createStackNavigator();

// Navigation Stack for Main Screens
const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
        headerBackImage: () => <HeaderBack />,
        headerStyle: customHeaderStyle,
        headerTintColor: 'white',
      }}>
      <MainStack.Screen
        name={MainNavigationScreen.selectHospital}
        options={{ headerShown: false }}
        component={SelectHospital}
      />
      <MainStack.Screen
        name={MainNavigationScreen.patientProfileList}
        component={PatientProfileList}
      />
    </MainStack.Navigator>
  );
};

// Navigation Stack for Root Screens
const RootNavigator = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name={'Main'}
        options={{ headerShown: false }}
        component={MainNavigator}
      />
      <RootStack.Screen
        name={MainNavigationScreen.searchTemplate}
        options={{ headerShown: false }}
        component={SearchTemplate}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
