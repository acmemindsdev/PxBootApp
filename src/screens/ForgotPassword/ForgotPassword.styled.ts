import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'src/theme';
import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const MainView = styled.View`
  flex: 1;
`;

export const ActionButtonContainer = styled.View`
  margin: 20px 0px;
`;

export const BottomView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
  margin-bottom: 40px;
`;
