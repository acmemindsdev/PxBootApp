import styled from 'styled-components/native';
import { Snackbar } from 'react-native-paper';
import theme from 'src/theme';

export const MainView = styled.View`
  flex: 1;
`;

export const ActionButtonContainer = styled.View`
  margin: 20px 0px;
`;

export const CombineTextView = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 24px;
`;

export const SnackbarStyled = styled(Snackbar)`
  background-color: ${theme.colors.gray50};
  font-size: 50px;
`;
