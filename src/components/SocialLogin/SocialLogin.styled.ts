import styled from 'styled-components/native';
import { Text } from 'react-native-paper';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from 'src/theme';

export const MainView = styled.View`
  padding: 20px 0px;
`;

export const GridView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const TitleText = styled(Text)`
  margin: 0px 20px;
  font-size: 16px;
`;

export const ButtonContentView = styled.View`
  padding: 10px 38px 28px;
  justify-content: center;
  align-items: center;
`;
