import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'src/theme';

export const MainView = styled.View`
  flex: 1;
  align-items: center;
`;

export const ActionButtonContainer = styled.View`
  margin: 20px 0px;
  width: 65%;
`;

export const IconStyled = styled(Icon)`
  color: ${theme.colors.black90};
  opacity: 0.6;
`;
