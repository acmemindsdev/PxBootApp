import React from 'react';
import { Divider as RNDivider } from 'react-native-paper';
import { DividerStyled } from './Divider.styled';

type RNDividerProps = React.ComponentProps<typeof RNDivider>;

type CustomDivider = {};

type IProps = CustomDivider & RNDividerProps;

export function Divider(props: IProps) {
  return <DividerStyled {...props} />;
}
