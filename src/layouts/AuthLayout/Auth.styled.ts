import styled from 'styled-components/native';
import theme from 'src/theme';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

export const WrapperStyled = styled.View`
  flex: 1;
  padding: 32px;
  background-color: ${theme.colors.white};
`;

export const LogoContainer = styled.View`
  height: ${height > 820 ? 200 : 150}px;
  justify-content: center;
  align-items: center;
`;

export const LogoImageStyled = styled.Image`
  height: 76px;
  width: 100px;
`;
