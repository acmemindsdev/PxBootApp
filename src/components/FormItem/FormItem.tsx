import React from 'react';
import { FormItemStyled } from './FormItem.styled';

type IProps = {
  children: React.ReactNode;
};

export function FormItem(props: IProps) {
  return <FormItemStyled>{props.children}</FormItemStyled>;
}
