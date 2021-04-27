import styled from 'styled-components/native';
import { HelperText, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import theme from 'src/theme';

export const TextInputViewStyled = styled(View)``;

export const TextInputStyled = styled(TextInput).attrs({
  theme: {
    roundness: 6,
  },
})``;

export const ErrorTextStyled = styled(HelperText)`
  color: ${theme.colors.primary};
`;
