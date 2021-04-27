import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from '../../../aws-exports';
import { MobileNumberInput, SocialLogin } from 'src/components';
import {
  MainView,
  PasswordInput,
  PasswordIcon,
  BottomView,
} from './SignIn.styled';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContainedButton, TextButton } from 'src/components/Button';
import { Text1, FontWeights } from 'src/components/Typography';
import theme from 'src/theme';
import { connect } from 'react-redux';
import { setSelectedCountry } from 'src/state/auth/authActions';
import { getDialCode } from 'src/state/auth/authReducer';

Amplify.configure(awsconfig);

const SignInLayout = ({ navigation }) => {
  const [number, setNumber] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [fetchError, setFetchError] = useState('');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainView>
        <MobileNumberInput
          navigation={navigation}
          onChangeDialCode={code => setDialCode(code)}
          onChangeMobileNumber={number => setNumber(number)}
          error={false}
        />
        <PasswordInput
          label="Password"
          secureTextEntry={showPassword}
          rightIcon={<PasswordIcon size={25} name="eye-off-outline" />}
          onIconPress={() => setShowPassword(!showPassword)}
          onChangeText={text => setPassword(text)}
          errorText={''}
        />
        <TextButton
          align="right"
          onPress={() => navigation?.push('Forgot Password', {})}>
          {'Forgot Password?'}
        </TextButton>
        <ContainedButton
          fullWidth
          onPress={() => console.log('fdfd')}
          disabled={!(dialCode && number && password)}>
          {'Log In'}
        </ContainedButton>
        <SocialLogin navigation={navigation} />
        <BottomView>
          <TextButton style={{ bottom: 0, alignSelf: 'flex-end' }}>
            <Text1>{'New to PX Boost? '}</Text1>
            <Text1 color={theme.colors.primary} fontWeight={FontWeights.bold}>
              {'Register'}
            </Text1>
          </TextButton>
        </BottomView>
      </MainView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14,
  },
  container: {
    flex: 1,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(
  state => ({
    dialCode: getDialCode(state),
  }),
  {
    setSelectedCountry,
  },
)(SignInLayout);
