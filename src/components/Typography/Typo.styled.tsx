import styled from 'styled-components/native';
import { Title, Paragraph, Text } from 'react-native-paper';
import theme from 'src/theme';
import { CustomTextProp } from './Typo';
import { StyledProps } from 'styled-components';

const TypoStyles = (props: CustomTextProp) => {
  const { colors } = theme;
  const styles: StyledProps<any> = {
    color: props.color ? props.color : theme.colors.black90,
    opacity: props.color ? 1 : 0.8,
  };

  return styles;
};

export const TitleStyled = styled(Title)<CustomTextProp>`
  font-weight: ${(props: CustomTextProp) =>
    props.fontWeight ? props.fontWeight : 700};
  color: ${(props: CustomTextProp) =>
    props.color ? props.color : theme.colors.black90};
  font-size: 24px;
  line-height: 29px;
`;

export const ParagraphStyled = styled(Paragraph)<CustomTextProp>`
  font-weight: ${(props: CustomTextProp) =>
    props.fontWeight ? props.fontWeight : 400};
  color: ${(props: CustomTextProp) =>
    props.color ? props.color : theme.colors.black90};
  opacity: ${(props: CustomTextProp) => (props.color ? 1 : 0.8)};
  font-size: 16px;
  line-height: 22px;
`;

export const Text1Styled = styled(Text)<CustomTextProp>`
  font-weight: ${(props: CustomTextProp) =>
    props.fontWeight ? props.fontWeight : 500};
  color: ${(props: CustomTextProp) =>
    props.color ? props.color : theme.colors.black90};
  opacity: ${(props: CustomTextProp) => (props.color ? 1 : 0.8)};
  font-size: 14px;
  line-height: 17px;
`;

export const Text2Styled = styled(Text)<CustomTextProp>`
  font-weight: ${(props: CustomTextProp) =>
    props.fontWeight ? props.fontWeight : 500};
  color: ${(props: CustomTextProp) =>
    props.color ? props.color : theme.colors.black90};
  opacity: ${(props: CustomTextProp) => (props.color ? 1 : 0.8)};
  font-size: 16px;
  line-height: 17px;
`;
