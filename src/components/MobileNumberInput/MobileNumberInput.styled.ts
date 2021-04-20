import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const ContainerView = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export const CountryCodeInput = styled(TextInput)`
  width: 100px;
`;

export const NumberInput = styled(TextInput)`
  width: 65%;
  min-width: 100px;
`;
