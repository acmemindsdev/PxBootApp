import styled from 'styled-components/native';
import { Title, Paragraph } from 'src/components/Typography';
import { Card } from 'react-native-paper';

export const MainView = styled.View`
  flex: 1;
`;

export const ActionButtonContainer = styled.View`
  margin-top: 16px;
  width: 85%;
  justify-content: flex-end;
`;

export const TopContainerView = styled.View`
  margin-top: 8px;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CardContent = styled(Card.Content)`
  padding: 20px;
  justify-content: center;
  text-align: center;
`;

export const HospitalName = styled(Title)`
  text-align: center;
  margin-bottom: 8px;
  margin-top: 4px;
`;

export const Address = styled(Paragraph)`
  text-align: center;
  margin-bottom: 28px;
`;

export const BottomContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
