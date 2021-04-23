import styled from 'styled-components/native';
import { Divider } from 'react-native-paper';
import theme from 'src/theme';

export const DividerStyled = styled(Divider)`
  height: 1px;
  background: ${theme.colors.black};
  opacity: 0.1;
`;
