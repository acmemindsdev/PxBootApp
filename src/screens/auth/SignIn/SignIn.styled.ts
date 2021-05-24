import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'src/theme';
import styled from 'styled-components/native';
import { TextInput } from 'src/components';

export const MainView = styled.View`
  flex: 1;
`;

export const PasswordIcon = styled(Icon)`
  color: ${theme.colors.black90};
  opacity: 0.5;
`;

export const PasswordInput = styled(TextInput)`
  margin-top: 20px;
  margin-bottom: 16px;
`;
export const BottomView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  /* bottom: 20px; */
  flex: 1;
`;
