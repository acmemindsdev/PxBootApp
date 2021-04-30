import React from 'react';
import { Title as RNTitle } from 'react-native-paper';
import {
  TitleStyled,
  SubheadingStyled,
  ParagraphStyled,
  Text1Styled,
  Text2Styled,
} from './Typo.styled';

type RNTitleProps = React.ComponentProps<typeof RNTitle>;

export const FontWeights = {
  bold: 700,
  semiBold: 600,
  medium: 500,
  regular: 400,
};

export type CustomTextProp = {
  fontWeight?: string | number;
  color?: string;
};

type IProps = CustomTextProp & RNTitleProps;

export function Title(props: IProps) {
  return <TitleStyled {...props} />;
}

export function Subheading(props: IProps) {
  return <SubheadingStyled {...props} />;
}

export function Paragraph(props: IProps) {
  return <ParagraphStyled {...props} />;
}

export function Text1(props: IProps) {
  return <Text1Styled {...props} />;
}

export function Text2(props: IProps) {
  return <Text2Styled {...props} />;
}
