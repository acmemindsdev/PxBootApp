import React from 'react';
import { Title, Paragraph } from 'src/components/Typography';
import { View } from 'react-native';
import { WrapperStyled, LogoContainer, LogoImageStyled } from './Auth.styled';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface IProps {
  navigation: any;
  route: any;
}

export function withTitleLayout<P extends IProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return props => {
    let title = '';
    let description = '';
    switch (props.route.name) {
      case 'Forgot Password':
        title = 'Trouble Logging In?';
        description =
          'Enter your mobile number and we will send reset code to get back into your account.';
        break;
      case 'Reset Password':
        title = 'Reset Password';
        description =
          'A password reset code has been sent on +1 2025550143 on an SMS';
        break;
      default:
        title = 'grids';
        break;
    }
    return (
      <WrapperStyled>
        <View style={{ marginBottom: 20 }}>
          <Title>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </View>
        <WrappedComponent {...props} />
      </WrapperStyled>
    );
  };
}
