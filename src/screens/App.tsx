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

Amplify.configure(awsconfig);

const App = () => {
  return (
    <PaperProvider theme={theme.AppTheme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
