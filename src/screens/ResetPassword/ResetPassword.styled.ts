import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'src/theme';
import styled from 'styled-components/native';
import { TextInput } from 'src/components';

export const MainView = styled.View`
  flex: 1;
`;

export const ActionButtonContainer = styled.View`
  margin: 20px 0px;
`;

export const CombineTextView = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 24px;
`;

export const TextInputStyled = styled(TextInput)``;

export const ContentView = styled.View`
  margin-bottom: 16px;
`;
