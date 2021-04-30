import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  CombineTextView,
  TextInputStyled,
} from './ResetPassword.styled';
import { PasswordHint, TextInput, FormItem } from 'src/components';
import { ContainedButton, TextButton } from 'src/components/Button';
import { Text1, FontWeights } from 'src/components/Typography';
import theme from 'src/theme';
import { connect } from 'react-redux';
import { requestForgotPassword } from 'src/state/auth/authActions';
import { getUserName } from 'src/state/auth/authReducer';
import {
  Controller,
  useForm,
  FieldErrors,
  useFormContext,
} from 'react-hook-form';

interface IProps {
  navigation: any;
  requestForgotPassword: any;
  userName: string;
}

const ResetPassword = (props: IProps) => {
  const [new_password, setNew_password] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [number, setNumber] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [activeNewPasswordInput, setActiveNewPasswordInput] = useState(false);

  type FormData = {
    code: string;
    new_password: string;
    confirm_password: string;
  };
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = data => {
    console.log(data, 'data');
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <CombineTextView>
          <Text1>{'Did not receive Code? '}</Text1>
          <TouchableOpacity
            onPress={() => props.requestForgotPassword(props.userName)}>
            <Text1 fontWeight={FontWeights.bold} color={theme.colors.primary}>
              {'Resend SMS'}
            </Text1>
          </TouchableOpacity>
        </CombineTextView>
        <FormItem>
          <Controller
            name="code"
            control={control}
            defaultValue=""
            rules={{
              validate: {
                positive: value => parseInt(value) > 0,
                lessThanTen: value => parseInt(value) < 10,
              },
              required: { value: true, message: 'dfdf' },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password Reset Code"
                onChangeText={text => onChange(text)}
                value={value}
                error={!!errors.code}
                errorText={errors.code?.message}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="new_password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  label="New Password"
                  secureTextEntry={true}
                  onChangeText={text => onChange(text)}
                  value={value}
                  textContentType={'oneTimeCode'}
                  onFocus={() => setActiveNewPasswordInput(true)}
                  onBlur={() => setActiveNewPasswordInput(false)}
                  error={false}
                  errorText={''}
                />
                {activeNewPasswordInput && (
                  <PasswordHint passwordText={value} />
                )}
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <Controller
            name="confirm_password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Confirm Password"
                secureTextEntry={true}
                onChangeText={text => onChange(text)}
                value={value}
                textContentType={'oneTimeCode'}
                error={false}
                errorText={''}
              />
            )}
          />
        </FormItem>
        <ActionButtonContainer>
          <ContainedButton
            fullWidth
            disabled={false}
            onPress={handleSubmit(onSubmit)}>
            {'Reset'}
          </ContainedButton>
        </ActionButtonContainer>
      </MainView>
    </>
  );
};

export default connect(
  state => ({
    userName: getUserName(state),
  }),
  {
    requestForgotPassword,
  },
)(ResetPassword);
