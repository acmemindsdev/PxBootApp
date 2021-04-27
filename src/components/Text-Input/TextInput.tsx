import React, { ReactNode } from 'react';
import { HelperText, TextInput as RNTextInput, Text } from 'react-native-paper';
import {
  ErrorTextStyled,
  TextInputStyled,
  TextInputViewStyled,
} from './TextInput.styled';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

type RNTextInputProps = React.ComponentProps<typeof RNTextInput>;

type CustomTextInput = {
  errorText?: string;
  withMask?: string;
  helperText?: string;
  rightIcon?: ReactNode;
  onIconPress: any;
};

export type ExtendedTextInputProps = CustomTextInput & RNTextInputProps;

export function TextInput(props: ExtendedTextInputProps) {
  const {
    withMask,
    errorText,
    helperText,
    rightIcon,
    style,
    ...restProps
  } = props;
  const element = <TextInputStyled.icon name={() => <Text>dfd</Text>} />;
  let Input = (
    <TextInputStyled
      mode={'outlined'}
      autoCapitalize={'none'}
      autoCorrect={false}
      right={
        <TextInputStyled.Icon
          name={() => <>{rightIcon}</>}
          onPress={props.onIconPress}
        />
      }
      {...restProps}
    />
  );

  return (
    <TextInputViewStyled style={style}>
      {Input}
      {!!helperText && (
        <HelperText type={'info'} visible={true} padding={'none'}>
          {helperText}
        </HelperText>
      )}
      {!!errorText && (
        <ErrorTextStyled type={'error'} visible={true} padding={'none'}>
          {errorText}
        </ErrorTextStyled>
      )}
    </TextInputViewStyled>
  );
}
