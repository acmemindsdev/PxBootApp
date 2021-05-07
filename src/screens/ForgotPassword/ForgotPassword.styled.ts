import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'src/theme';
import styled from 'styled-components/native';

export const MainView = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ActionButtonContainer = styled.View`
  margin: 10px 0px;
`;

export const BottomView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
  background-color: red;
`;
