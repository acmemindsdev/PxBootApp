import React, {Fragment} from 'react';
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

import Amplify, {Auth, Hub} from 'aws-amplify';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import awsconfig from '../../aws-exports';
import SignIn from './SignIn';
Amplify.configure(awsconfig);

const App = () => {
  return <SignIn />;
};

export default App;
