import styled from 'styled-components/native';
import { Paragraph } from 'src/components/Typography';
import { Divider } from 'src/components';
import theme from 'src/theme';
import { Card } from 'react-native-paper';

export const MainView = styled.View`
  flex: 1;
  margin: -20px -20px 0px;
  padding: 20px;
  background-color: ${theme.colors.gray20};
`;

export const ActionButtonContainer = styled.View`
  width: 100%;
  justify-content: flex-end;
  background-color: ${theme.colors.white};
`;

export const BottomDivider = styled(Divider)`
  margin-bottom: 20px;
  margin-right: -30px;
  margin-left: -30px;
`;

export const CardInnerDivider = styled(Divider)`
  margin-top: 14px;
  margin-bottom: 14px;
  margin-right: -20px;
`;

// Style for List Item Row Container
export const ProfileRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0px;
  padding-top: 12px;
  padding-bottom: 18px;
  padding-left: 14px;
  border-radius: 4px;
  border: ${props =>
    !props.selected ? 0 : `1.5px solid ${theme.colors.secondary}`};
  background-color: ${theme.colors.white};
  box-shadow: 2px 2px 2px ${theme.colors.gray30};
`;

// Style for Card inner container
export const DetailView = styled.View`
  flex: 1;
  margin-left: 8px;
  margin-top: 6px;
`;
