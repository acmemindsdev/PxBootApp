import styled from 'styled-components/native';
import { Paragraph } from 'src/components/Typography';
import { Divider } from 'src/components';

export const MainView = styled.View`
  flex: 1;
`;

export const ActionButtonContainer = styled.View`
  margin-top: 8px;
  width: 100%;
  justify-content: flex-end;
`;

export const SubTitle = styled(Paragraph)`
  opacity: 0.6;
  margin-bottom: 16px;
`;

export const DividerStyled = styled(Divider)`
  margin-top: 20px;
  margin-right: -30px;
  margin-left: -30px;
`;
