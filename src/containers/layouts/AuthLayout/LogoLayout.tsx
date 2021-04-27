import React from 'react';
import { WrapperStyled, LogoContainer, LogoImageStyled } from './Auth.styled';

export function withLogoLayout(
  WrappedComponent: React.ComponentType,
): React.FunctionComponent {
  return props => {
    return (
      <WrapperStyled>
        <LogoContainer>
          <LogoImageStyled source={require('src/assets/images/logo.png')} />
        </LogoContainer>
        <WrappedComponent {...props} />
      </WrapperStyled>
    );
  };
}
