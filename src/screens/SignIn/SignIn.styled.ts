import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'src/theme';
import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const MainView = styled.View``;

export const PasswordIcon = styled(Icon)`
  color: ${theme.colors.black90};
  opacity: 0.5;
`;

export const PasswordInput = styled(TextInput)`
  margin-top: 20px;
  margin-bottom: 20px;
`;
