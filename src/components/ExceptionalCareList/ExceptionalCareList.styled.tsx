import theme from 'src/theme';
import styled from 'styled-components/native';

// Style for List Item Row Container
export const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0px;
  padding: 26px 20px;
  border-radius: 4px;
  border: ${props => (props.selected ? 0 : `1px solid ${theme.colors.gray30}`)};
  background-color: ${props =>
    props.selected ? theme.colors.secondary : theme.colors.gray10};
`;
