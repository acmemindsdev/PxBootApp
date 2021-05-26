import styled from 'styled-components/native';
import { Paragraph } from 'src/components/Typography';

export const MainView = styled.View`
  flex: 1;
`;

export const ActionButtonContainer = styled.View`
  margin-top: 20px;
  flex: 1;
  width: 100%;
  justify-content: flex-end;
`;

export const SubTitle = styled(Paragraph)`
  opacity: 0.6;
  margin-bottom: 16px;
`;
