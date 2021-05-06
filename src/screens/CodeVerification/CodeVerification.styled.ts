import styled from 'styled-components/native';
import OtpInputs from 'react-native-otp-inputs';
import { StyleSheet } from 'react-native';
import theme from 'src/theme';
import { rgba } from 'polished';
import { FontWeights, Text1 } from 'src/components/Typography';
import { Snackbar } from 'react-native-paper';

export const MainView = styled.View`
  flex: 1;
`;

export const ActionButtonContainer = styled.View`
  margin: 30px 0px;
`;

export const OTPInputsContainer = styled.View`
  background-color: ${rgba(theme.colors.otpGreen, 0.1)};
  border-radius: 4px;
  padding: 42px 22px;
`;

export const OtpInputsStyled = styled(OtpInputs)`
  flex-direction: row;
  justify-content: space-between;
`;

export const InputTitleText = styled(Text1)`
  width: 100%;
  text-align: center;
  margin-bottom: 18px;
`;

export const ErrorText = styled(Text1)`
  color: ${theme.colors.errorRed};
  margin-top: 8px;
`;

export const CombineTextView = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-top: 22px;
`;

export const SnackbarStyled = styled(Snackbar)`
  background-color: ${theme.colors.gray50};
`;

export const styles = StyleSheet.create({
  inputContainerStyles: {
    width: '15%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyles: {
    color: theme.colors.black90,
    backgroundColor: theme.colors.white,
    flex: 1,
    width: '100%',
    textAlign: 'center',
    fontFamily: theme.AppTheme.fonts.regular.fontFamily,
    fontSize: 24,
    fontWeight: `${FontWeights.bold}`,
    borderWidth: 1,
    borderColor: theme.colors.gray40,
    borderRadius: 6,
  },
  filled: {
    backgroundColor: theme.colors.otpGreen,
    color: theme.colors.white,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  blank: {
    backgroundColor: theme.colors.white,
  },
});
