import React from 'react';
import { WrapperView, RowView, IconStyled } from './PasswordHint.styled';
import { Text1 } from 'src/components/Typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'src/theme';

type IProps = {
  passwordText: string;
};

const PasswordHint = ({ passwordText }: IProps) => {
  const SuccessIcon = () => {
    return (
      <IconStyled color={theme.colors.successGreen} size={18} name="check" />
    );
  };

  const DefaultIcon = () => {
    return (
      <IconStyled
        style={{ opacity: 0.8 }}
        color={theme.colors.black90}
        size={14}
        name="primitive-dot"
      />
    );
  };

  return (
    <WrapperView>
      <Text1 color={theme.colors.black90} style={{ marginBottom: 12 }}>
        {'The password will need to have at least:'}
      </Text1>
      <RowView>
        <DefaultIcon />
        <Text1>{'10 characters'}</Text1>
      </RowView>
      <RowView>
        {<SuccessIcon />}
        <Text1 color={theme.colors.successGreen}>
          {'1 upper case character'}
        </Text1>
      </RowView>
      <RowView>
        <SuccessIcon />
        <Text1 color={theme.colors.successGreen}>
          {'1 lower case character'}
        </Text1>
      </RowView>
      <RowView>
        <DefaultIcon />
        <Text1>{'1 special character'}</Text1>
      </RowView>
    </WrapperView>
  );
};

export default PasswordHint;
