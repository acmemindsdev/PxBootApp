import React from 'react';
import { WrapperStyled, LogoContainer, LogoImageStyled } from './Auth.styled';
import Logo from 'src/assets/images/logo.png';
import { Image, ImageSourcePropType, View } from 'react-native';

// export const withLogoLayout = props => {
//   return <WrapperStyled></WrapperStyled>;
// };

interface IProps {
  image?: ImageSourcePropType;
}
const ImageSource = ({ image }: IProps) => {
  return image;
};

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
