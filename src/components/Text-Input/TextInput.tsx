import React from 'react';
import { HelperText, TextInput as RNTextInput } from 'react-native-paper';
import {
  ErrorTextStyled,
  TextInputStyled,
  TextInputViewStyled,
} from './TextInput.styled';

type RNTextInputProps = React.ComponentProps<typeof RNTextInput>;

type CustomTextInput = {
  errorText?: string;
  withMask?: string;
  helperText?: string;
};

export type ExtendedTextInputProps = CustomTextInput & RNTextInputProps;

export function TextInput(props: ExtendedTextInputProps) {
  const { withMask, errorText, helperText, ...restProps } = props;
  let Input = (
    <TextInputStyled
      mode={'outlined'}
      autoCapitalize={'none'}
      autoCorrect={false}
      {...restProps}
    />
  );

  return (
    <TextInputViewStyled>
      {Input}
      {!!helperText && (
        <HelperText type={'info'} visible={true} padding={'none'}>
          {helperText}
        </HelperText>
      )}
      {errorText && (
        <ErrorTextStyled type={'error'} visible={true} padding={'none'}>
          {errorText}
        </ErrorTextStyled>
      )}
    </TextInputViewStyled>
  );
}
