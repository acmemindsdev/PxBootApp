import React from 'react';
import { WrapperStyled, LogoContainer, LogoImageStyled } from './Auth.styled';

interface IProps {
  navigation?: any;
}

export function withLogoLayout<P extends IProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return props => {
    return (
      <WrapperStyled>
        <LogoContainer>
          <LogoImageStyled
            source={require('src/assets/images/logo.png')}
            resizeMode="contain"
          />
        </LogoContainer>
        <WrappedComponent {...props} />
      </WrapperStyled>
    );
  };
}
