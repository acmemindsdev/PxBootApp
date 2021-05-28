import styled from 'styled-components/native';
import { Divider } from 'react-native-paper';
import theme from 'src/theme';
import { rgba } from 'polished';

export const DividerStyled = styled(Divider)`
  height: 1px;
  background: ${rgba(theme.colors.black, 0.1)};
`;
