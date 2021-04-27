import React, { Fragment } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from '../../aws-exports';
import Navigation from 'src/navigation/Navigator';
import theme from 'src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StateProvider } from 'react-redux';
import store from 'src/state/store';

Amplify.configure(awsconfig);

const App = () => {
  return (
    <StateProvider store={store}>
      <PaperProvider theme={theme.AppTheme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PaperProvider>
    </StateProvider>
  );
};

export default App;
