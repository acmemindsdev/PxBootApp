import React from 'react';
import {
  Title,
  Paragraph,
  Text1,
  FontWeights,
} from 'src/components/Typography';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { WrapperStyled } from './Onboarding.styled';
import get from 'lodash/get';
import { OnboardingNavigationScreen } from 'src/navigation/Navigator';

interface IProps {
  navigation: any;
  route: any;
  getUserName: any;
}

export function withTitleLayout<P extends IProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return props => {
    const Title_Description = () => {
      switch (get(props.route, 'name', '')) {
        case OnboardingNavigationScreen.profilePicture:
          return (
            <Title style={{ textAlign: 'center' }}>{'Profile Picture'}</Title>
          );
        case OnboardingNavigationScreen.exceptionalCare:
          return <Title>{'Select what exceptional care looks to you'}</Title>;

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
          <View style={{ marginBottom: 20 }}>{Title_Description()}</View>
          <WrappedComponent {...props} />
        </KeyboardAvoidingView>
      </WrapperStyled>
    );
  };
}
