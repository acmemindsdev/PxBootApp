import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { WrapperStyled } from './Main.styled';

interface IProps {
  navigation: any;
  route: any;
  getUserName: any;
}

export function withMainLayout<P extends IProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return props => {
    return (
      <WrapperStyled>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}>
            <WrappedComponent {...props} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </WrapperStyled>
    );
  };
}
