import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'src/theme';
import styled from 'styled-components/native';
import { TextInput } from 'src/components';

export const MainView = styled.View`
  flex: 1;
`;

export const BottomView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
`;

export const TextContainerView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  justify-content: center;
`;
