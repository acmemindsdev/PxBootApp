import React, { isValidElement, useEffect } from 'react';
import { WrapperView, RowView, IconStyled } from './PasswordHint.styled';
import { Text1 } from 'src/components/Typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'src/theme';

type IProps = {
  passwordText: string;
  isValid: any;
};

type HintProp = {
  hintText: string;
  validated: boolean;
};

const PasswordHint = ({ passwordText, isValid }: IProps) => {
  const specialCharacterFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const upperCaseFormat = /[A-Z]/;
  const lowerCaseFormat = /[a-z]/;

  const validPasswordFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~A-Za-z]/;

  useEffect(() => {
    const valid =
      specialCharacterFormat.test(passwordText) &&
      upperCaseFormat.test(passwordText) &&
      lowerCaseFormat.test(passwordText) &&
      passwordText.length >= 10;

    isValid(valid);
  }, [passwordText]);

  const Hint = ({ hintText, validated }: HintProp) => {
    return validated ? (
      <RowView>
        <IconStyled color={theme.colors.successGreen} size={18} name="check" />
        <Text1 color={theme.colors.successGreen}>{hintText}</Text1>
      </RowView>
    ) : (
      <RowView>
        <IconStyled
          style={{ opacity: 0.8 }}
          color={theme.colors.black90}
          size={14}
          name="primitive-dot"
        />
        <Text1>{hintText}</Text1>
      </RowView>
    );
  };

  return (
    <WrapperView>
      <Text1 color={theme.colors.black90} style={{ marginBottom: 12 }}>
        {'The password will need to have at least:'}
      </Text1>
      <Hint hintText={'10 characters'} validated={passwordText.length >= 10} />
      <Hint
        hintText={'1 upper case character'}
        validated={upperCaseFormat.test(passwordText)}
      />
      <Hint
        hintText={'1 lower case character'}
        validated={lowerCaseFormat.test(passwordText)}
      />
      <Hint
        hintText={'1 special character'}
        validated={specialCharacterFormat.test(passwordText)}
      />
    </WrapperView>
  );
};

export default PasswordHint;
