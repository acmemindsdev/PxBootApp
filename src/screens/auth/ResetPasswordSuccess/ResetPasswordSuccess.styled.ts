import styled from 'styled-components/native';
import { Paragraph } from 'src/components/Typography';
import theme from 'src/theme';

export const MainView = styled.View`
  flex: 1;
  background-color: ${theme.colors.white};
  align-items: center;
  justify-content: center;
`;

export const ContentView = styled.View`
  margin-bottom: 18px;
  align-items: center;
`;

export const TextStyled = styled(Paragraph)`
  margin: 4px 0px;
`;
