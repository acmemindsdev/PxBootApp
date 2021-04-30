import styled from 'styled-components/native';
import { HelperText, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import theme from 'src/theme';
import { FontWeights } from '../Typography';

export const TextInputViewStyled = styled(View)``;

export const TextInputStyled = styled(TextInput).attrs({
  theme: {
    roundness: 6,
  },
})``;

export const ErrorTextStyled = styled(HelperText)`
  font-weight: ${FontWeights.medium};
  font-size: 14px;
  color: ${theme.colors.errorRed};
`;
