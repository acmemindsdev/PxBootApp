import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomAvatarProp } from './ProfileAvatar';
import { rgba } from 'polished';
import theme from 'src/theme';

export const ContainerView = styled.View`
  justify-content: center;
`;

export const ImageStyled = styled.Image`
  width: ${(props: CustomAvatarProp) => props.size}px;
  height: ${(props: CustomAvatarProp) => props.size}px;
  border-radius: ${(props: CustomAvatarProp) => (props.size ? props.size : 0)};
  background-color: ${rgba(theme.colors.primary, 0.1)};
`;

export const IconStyled = styled(Icon)`
  position: absolute;
  align-self: center;
`;
