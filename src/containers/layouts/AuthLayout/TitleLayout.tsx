import React from 'react';
import { Title, Paragraph } from 'src/components/Typography';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { WrapperStyled, LogoContainer, LogoImageStyled } from './Auth.styled';
import get from 'lodash/get';
import { StackNavigationProp } from '@react-navigation/stack';
import { getUserName } from 'src/state/auth/authReducer';
import { useSelector } from 'react-redux';

interface IProps {
  navigation: any;
  route: any;
  getUserName: any;
}

export function withTitleLayout<P extends IProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return props => {
    const userName = useSelector(state => getUserName(state));
    let title = '';
    let description = '';
    switch (get(props.route, 'name', '')) {
      case 'Forgot Password':
        title = 'Trouble Logging In?';
        description =
          'Enter your mobile number and we will send reset code to get back into your account.';
        break;
      case 'Reset Password':
        title = 'Reset Password';
        description = `A password reset code has been sent on ${userName} on an SMS`;
        break;
      default:
        break;
    }

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
            //  onContentSizeChange={this.onContentSizeChange}
          >
            <View style={{ marginBottom: 20 }}>
              <Title>{title}</Title>
              <Paragraph>{description}</Paragraph>
            </View>
            <WrappedComponent {...props} />
          </ScrollView>
        </KeyboardAvoidingView>
      </WrapperStyled>
    );
  };
}
