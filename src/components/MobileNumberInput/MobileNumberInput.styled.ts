import styled from 'styled-components/native';
import { TextInput, Text } from 'react-native-paper';
import theme from 'src/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  margin: auto 0px;
  font-size: 16;
`;

export const CountryCodeView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  padding: 12px;
`;
