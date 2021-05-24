import styled from 'styled-components/native';
import { Text, TextInput } from 'react-native-paper';
import { Text1 } from 'src/components/Typography';
import theme from 'src/theme';
import { rgba } from 'polished';

export const ContainerView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CountryCodeInput = styled(TextInput).attrs({
  theme: {
    roundness: 6,
    colors: { placeholder: rgba(theme.colors.black90, 0.4) },
  },
})`
  width: 100px;
  justify-content: center;
  background-color: ${theme.colors.gray10};
`;

export const NumberInput = styled(TextInput).attrs({
  theme: {
    roundness: 6,
    colors: { placeholder: rgba(theme.colors.black90, 0.4) },
  },
})`
  flex: 1;
  margin-left: 12px;
`;

export const CountryCodeText = styled(Text)`
  margin: auto 0px;
  font-size: 16px;
`;

export const CountryCodeView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  padding: 12px;
`;

export const ErrorText = styled(Text1)`
  margin-top: 6px;
  color: ${theme.colors.errorRed};
`;
