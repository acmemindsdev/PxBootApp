import React from 'react';
import {
  Title,
  Paragraph,
  Text1,
  FontWeights,
} from 'src/components/Typography';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { WrapperStyled, LogoContainer, LogoImageStyled } from './Auth.styled';
import get from 'lodash/get';
import { StackNavigationProp } from '@react-navigation/stack';
import { getMobileNumber } from 'src/state/auth/authReducer';
import { useSelector } from 'react-redux';
import { NavigationScreen } from 'src/navigation/Navigator';
import isEmpty from 'lodash/isEmpty';
import theme from 'src/theme';

interface IProps {
  navigation: any;
  route: any;
  getUserName: any;
}

export function withTitleLayout<P extends IProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return props => {
    const mobileNumber = useSelector(state => getMobileNumber(state));
    const Title_Description = () => {
      switch (get(props.route, 'name', '')) {
        case NavigationScreen.forgotPassword:
          return (
            <>
              <Title>{'Trouble Logging In?'}</Title>
              <Paragraph>
                {
                  'Enter your mobile number and we will send reset code to get back into your account.'
                }
              </Paragraph>
            </>
          );
        case NavigationScreen.resetPassword:
          return (
            <>
              <Title>{'Reset Password'}</Title>
              <Paragraph>
                {'A password reset code has been sent on '}
                <Paragraph
                  fontWeight={FontWeights.bold}
                  color={theme.colors.black90}>
                  {mobileNumber}
                </Paragraph>
                {' on an SMS'}
              </Paragraph>
            </>
          );
        case NavigationScreen.signUp:
          return <Title>{'Register'}</Title>;
        case NavigationScreen.confirmMobileNumber:
          return (
            <>
              <Title>{'Confirm Mobile Number'}</Title>
              <Paragraph>
                {'A verification code will be sent to your mobile number'}
              </Paragraph>
            </>
          );
        case NavigationScreen.codeVerification:
          return (
            <>
              <Title>{'Mobile Number Verification'}</Title>
              <Paragraph>
                {'A verification code has been sent to your mobile number '}
                <Paragraph
                  fontWeight={FontWeights.bold}
                  color={theme.colors.black90}>
                  {mobileNumber}
                </Paragraph>
              </Paragraph>
            </>
          );
        case NavigationScreen.addBirthDate:
          return <Title>{'Enter Date of Birth'}</Title>;
        default:
          return null;
      }
    };

    return (
      <WrapperStyled>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            //  onContentSizeChange={this.onContentSizeChange}
          >
            <View style={{ marginBottom: 20 }}>{Title_Description()}</View>
            <WrappedComponent {...props} />
          </ScrollView>
        </KeyboardAvoidingView>
      </WrapperStyled>
    );
  };
}
