import React, { ReactNode } from 'react';
import { ButtonStyled, TextButtonStyled } from './Button.styled';
import { Button as RNPButton } from 'react-native-paper';

type RNPButtonProps = React.ComponentProps<typeof RNPButton>;

type CustomProps = {
  // material design indicator
  children: ReactNode;
  md?: boolean;
  large?: boolean;
  small?: boolean;
  fullWidth?: boolean;
  affirmative?: boolean;
  align?: 'right' | 'left';
};

export type CustomButtonPaper = CustomProps & RNPButtonProps;

export const ContainedButton = (props: CustomButtonPaper) => {
  return (
    <ButtonStyled {...props} mode={'contained'}>
      {props.children}
    </ButtonStyled>
  );
};

export const OutlineButton = (props: CustomButtonPaper) => {
  return (
    <ButtonStyled {...props} mode={'outlined'}>
      {props.children}
    </ButtonStyled>
  );
};

export const TextButton = (props: CustomButtonPaper) => {
  return (
    <TextButtonStyled {...props} mode={'text'}>
      {props.children}
    </TextButtonStyled>
  );
};
