import styled from 'styled-components/native';
import { TextInput, Text } from 'react-native-paper';
import theme from 'src/theme';

export const ContainerView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CountryCodeInput = styled(TextInput)`
  width: 90px;
  justify-content: center;
`;

export const NumberInput = styled(TextInput)`
  flex: 1;
  margin-left: 12px;
`;

export const CountryCodeText = styled(Text)`
  margin-left: 12px;
  margin: auto 12px;
  font-size: 16;
`;
