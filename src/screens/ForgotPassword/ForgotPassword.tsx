import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  BottomView,
} from './ForgotPassword.styled';
import { MobileNumberInput } from 'src/components';
import { ContainedButton, TextButton } from 'src/components/Button';
import { Text1, FontWeights } from 'src/components/Typography';
import theme from 'src/theme';
import { connect } from 'react-redux';
import {
  setSelectedCountry,
  requestForgotPassword,
} from 'src/state/auth/authActions';
import { getDialCode } from 'src/state/auth/authReducer';
import get from 'lodash/get';
import { NavigationScreen } from 'src/navigation/Navigator';

interface IProps {
  navigation: any;
  requestForgotPassword: any;
}

const ForgotPassword = ({ navigation, requestForgotPassword }: IProps) => {
  const [username, setUsername] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [new_password, setNew_password] = useState('');
  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');
  const [dialCode, setDialCode] = useState('');

  const handleSubmit = () => {
    const userName = `+${dialCode}${number}`;
    requestForgotPassword(userName).then(payload => {
      if (get(payload, 'type') != 'FORGOT_PASSWORD_SUCCESS') {
        console.log('tedst data', payload);
        navigation?.push(NavigationScreen.resetPassword, {});
      } else {
        console.log('tessssst data', payload);
      }
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <>
          <MobileNumberInput
            navigation={navigation}
            onChangeDialCode={code => setDialCode(code)}
            onChangeMobileNumber={number => setNumber(number)}
            error={false}
          />
          <ActionButtonContainer>
            <ContainedButton
              fullWidth
              disabled={!(dialCode && number)}
              onPress={handleSubmit}>
              {'Send Reset Code'}
            </ContainedButton>
          </ActionButtonContainer>
        </>
        <BottomView>
          <TextButton
            style={{ bottom: 0, alignSelf: 'flex-end' }}
            onPress={() => navigation?.navigate(NavigationScreen.signUp, {})}>
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

export default connect(
  state => ({
    dialCode: getDialCode(state),
  }),
  {
    requestForgotPassword,
  },
)(ForgotPassword);
